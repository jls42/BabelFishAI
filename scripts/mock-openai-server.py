#!/usr/bin/env python3
"""Serveur OpenAI-compatible factice pour tester le provider Custom/LiteLLM de BabelFishAI.

Implémente /v1/audio/transcriptions et /v1/chat/completions, répond instantanément et
journalise ce que l'extension envoie réellement (champs multipart, entêtes, corps JSON).
Usage : python3 mock_openai_server.py [port]   (défaut : 8765)
"""

import json
import re
import sys
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765

TRANSCRIPTION_TEXT = "Bonjour, ceci est une transcription renvoyée par le serveur local de test."


def log(*parts):
    print(f"[{time.strftime('%H:%M:%S')}]", *parts, flush=True)


def parse_multipart(body, boundary):
    """Découpe un corps multipart en (nom, nom_de_fichier, taille, apercu_valeur)."""
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
    protocol_version = "HTTP/1.1"

    def log_message(self, *args):  # silence le log par défaut, trop verbeux
        pass

    def _send(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        log("OPTIONS", self.path, "(préflight CORS)")
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_POST(self):
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length)
        ctype = self.headers.get("Content-Type", "")
        auth = self.headers.get("Authorization", "(absente)")
        auth_shown = "Bearer ***" if auth.startswith("Bearer ") else auth
        log("POST", self.path, "| Content-Type:", ctype.split(";")[0], "| Authorization:", auth_shown)

        if self.path.endswith("/audio/transcriptions"):
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
            return

        if self.path.endswith("/chat/completions"):
            try:
                data = json.loads(body)
            except json.JSONDecodeError:
                log("    corps JSON illisible")
                self._send({"error": {"message": "invalid JSON"}}, 400)
                return
            messages = data.get("messages", [])
            log("    modèle:", data.get("model"), "| temperature:", data.get("temperature", "(absente)"))
            for message in messages:
                content = str(message.get("content"))[:160]
                log(f"    message {message.get('role')!r} : {content!r}")
            last_user = next(
                (m.get("content") for m in reversed(messages) if m.get("role") == "user"), ""
            )
            reply = f"[serveur local] {str(last_user)[:300]}"
            self._send(
                {
                    "id": "chatcmpl-mock",
                    "object": "chat.completion",
                    "model": data.get("model", "mock-model"),
                    "choices": [
                        {
                            "index": 0,
                            "message": {"role": "assistant", "content": reply},
                            "finish_reason": "stop",
                        }
                    ],
                    "usage": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0},
                }
            )
            return

        log("    route inconnue")
        self._send({"error": {"message": f"unknown route {self.path}"}}, 404)


if __name__ == "__main__":
    log(f"serveur factice à l'écoute sur http://localhost:{PORT}")
    log(f"  chat          : http://localhost:{PORT}/v1/chat/completions")
    log(f"  transcription : http://localhost:{PORT}/v1/audio/transcriptions")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
