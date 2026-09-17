#!/usr/bin/env python3
"""Serveur OpenAI-compatible factice pour tester le provider Custom/LiteLLM de BabelFishAI.

Implémente /v1/audio/transcriptions et /v1/chat/completions, répond instantanément et
journalise ce que l'extension envoie réellement (champs multipart, entêtes, corps JSON).
Les réponses sont constantes : rien de ce qui est reçu n'est renvoyé au navigateur, pour
qu'une entrée ne puisse pas ressortir dans la réponse. Le journal sert de preuve.
Usage : python3 scripts/mock-openai-server.py [port]   (défaut : 8765)
"""

import json
import re
import sys
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765

TRANSCRIPTION_TEXT = "Bonjour, ceci est une transcription renvoyée par le serveur local de test."
CHAT_TEXT = "[serveur local] réponse de test du provider Custom."


def log(*parts):
    """Affiche une ligne horodatée sur la sortie standard."""
    print(f"[{time.strftime('%H:%M:%S')}]", *parts, flush=True)


def parse_multipart(body, boundary):
    """Découpe un corps multipart en tuples (nom, nom_de_fichier, taille, apercu_valeur)."""
    fields = []
    sep = b"--" + boundary
    for chunk in body.split(sep):
        if not chunk.strip() or chunk.strip() == b"--":
            continue
        head, _, data = chunk.partition(b"\r\n\r\n")
        head_text = head.decode("utf-8", "replace")
        name = re.search(r'name="([^"]*)"', head_text)
        filename = re.search(r'filename="([^"]*)"', head_text)
        data = data.rstrip(b"\r\n")
        preview = "" if filename else data.decode("utf-8", "replace")[:120]
        fields.append(
            (
                name.group(1) if name else "?",
                filename.group(1) if filename else None,
                len(data),
                preview,
            )
        )
    return fields


class Handler(BaseHTTPRequestHandler):
    """Répond aux deux routes OpenAI utilisées par l'extension."""

    protocol_version = "HTTP/1.1"

    def log_message(self, *args):
        """Neutralise le journal par défaut de http.server, trop verbeux."""

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")

    def _send(self, payload, status=200):
        """Envoie une réponse JSON constante, construite par le serveur seul."""
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self._cors_headers()
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        """Répond au préflight CORS."""
        log("OPTIONS", self.path, "(préflight CORS)")
        self.send_response(204)
        self._cors_headers()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def _handle_transcription(self, body, ctype):
        """Journalise le multipart audio reçu et renvoie une transcription fixe."""
        boundary = re.search(r"boundary=([^;]+)", ctype)
        if boundary:
            for name, filename, size, preview in parse_multipart(
                body, boundary.group(1).strip().encode()
            ):
                if filename:
                    log(f"    champ {name!r} : fichier {filename!r}, {size} octets")
                else:
                    log(f"    champ {name!r} : {preview!r}")
        else:
            log("    corps non multipart,", len(body), "octets")
        self._send({"text": TRANSCRIPTION_TEXT})

    def _handle_chat(self, body):
        """Journalise le payload de chat reçu et renvoie une réponse fixe."""
        try:
            data = json.loads(body)
        except json.JSONDecodeError:
            log("    corps JSON illisible")
            self._send({"error": {"message": "invalid JSON"}}, 400)
            return
        log(
            "    modèle:",
            data.get("model"),
            "| temperature:",
            data.get("temperature", "(absente)"),
        )
        for message in data.get("messages", []):
            log(f"    message {message.get('role')!r} : {str(message.get('content'))[:160]!r}")
        self._send(
            {
                "id": "chatcmpl-mock",
                "object": "chat.completion",
                "model": "mock-model",
                "choices": [
                    {
                        "index": 0,
                        "message": {"role": "assistant", "content": CHAT_TEXT},
                        "finish_reason": "stop",
                    }
                ],
                "usage": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0},
            }
        )

    def do_POST(self):
        """Aiguille vers la transcription ou le chat selon la route appelée."""
        body = self.rfile.read(int(self.headers.get("Content-Length") or 0))
        ctype = self.headers.get("Content-Type", "")
        auth = self.headers.get("Authorization", "(absente)")
        log(
            "POST",
            self.path,
            "| Content-Type:",
            ctype.split(";")[0],
            "| Authorization:",
            "Bearer ***" if auth.startswith("Bearer ") else auth,
        )

        if self.path.endswith("/audio/transcriptions"):
            self._handle_transcription(body, ctype)
        elif self.path.endswith("/chat/completions"):
            self._handle_chat(body)
        else:
            log("    route inconnue")
            self._send({"error": {"message": "unknown route"}}, 404)


if __name__ == "__main__":
    # HTTP en clair assumé : outil de test qui n'écoute que sur la boucle locale, et que
    # l'extension n'accepte d'ailleurs en HTTP que sur localhost (providers.js:isValidUrl)
    BASE_URL = f"http://localhost:{PORT}"  # NOSONAR python:S5332 - boucle locale uniquement
    log(f"serveur factice à l'écoute sur {BASE_URL}")
    log(f"  chat          : {BASE_URL}/v1/chat/completions")
    log(f"  transcription : {BASE_URL}/v1/audio/transcriptions")
    server = ThreadingHTTPServer(  # NOSONAR python:S5332 - écoute liée à 127.0.0.1, pas au réseau
        ("127.0.0.1", PORT), Handler
    )
    server.serve_forever()
