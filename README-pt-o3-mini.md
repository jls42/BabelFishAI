# Babel Fish AI - Extensão de Transcrição Vocal e Tradução com IA

Babel Fish AI é uma extensão do Chrome inovadora, concebida originalmente para oferecer uma transcrição vocal poderosa. Transforme sua voz em texto com uma precisão notável graças à API Whisper da OpenAI, e usufrua, opcionalmente, de uma tradução automática em tempo real. Você pode usar o Babel Fish AI exclusivamente para transcrição ou ativar a tradução em tempo real conforme sua necessidade.

## 🌟 Funcionalidades

- **Transcrição Vocal Avançada**
  - Captura de áudio de alta qualidade via o microfone do seu dispositivo.
  - Transcrição precisa realizada pela API Whisper da OpenAI.
  - Suporte multilíngue para o processamento da voz e exibição do texto, permitindo transcrever entradas vocais em diferentes idiomas e exibir os resultados no idioma de sua escolha.
  - Inserção automática do texto no campo ativo ou exibição em uma caixa de diálogo dedicada.

- **Tradução Automática Integrada (Opcional)**
  - Tradução imediata das transcrições para diversos idiomas, a ser ativada se necessário.
  - Uso de um modelo de IA avançado para assegurar uma tradução fiel ao sentido original.
  - Escolha livre de usar exclusivamente a transcrição ou combinar transcrição e tradução.

- **Interface do Usuário Intuitiva e Personalizável**
  - Modo de exibição flexível: área de digitação ativa ou janela de diálogo flutuante.
  - Barra de status configurável com opções de cores, opacidade e duração de exibição.
  - Atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac) para iniciar/parar a gravação.
  - Ícone personalizado, integrando um microfone e o número “42”, para reconhecimento imediato.

- **Opções Avançadas**
  - Modo expert para configurações detalhadas (URLs das APIs, configuração por domínio, etc.).
  - Possibilidade de personalizar os modelos de transcrição e tradução.
  - Gestão completa da internacionalização graças aos arquivos de idioma (_locales), oferecendo uma interface e suporte vocal em vários idiomas.

## 🌐 Idiomas Suportados

- Árabe
- Alemão
- Inglês
- Espanhol
- Francês
- Hindi
- Italiano
- Japonês
- Coreano
- Holandês
- Polonês
- Português
- Romeno
- Sueco
- Chinês

## 🚀 Instalação

1. **Download e Instalação:**
   - Clone este repositório a partir do GitHub ou baixe manualmente a pasta da extensão.
   - Abra o Chrome e acesse `chrome://extensions/`.
   - Ative o “Modo Desenvolvedor” no canto superior direito.
   - Clique em “Carregar extensão não empacotada” e selecione a pasta do Babel Fish AI.

2. **Verificação:**
   - Certifique-se de que a extensão aparece na barra de ferramentas do Chrome com o ícone personalizado.

## ⚙️ Configuração

1. **Chave API da OpenAI:**
   - Clique no ícone da extensão para acessar as opções.
   - Digite sua chave API da OpenAI (disponível em [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Personalização das Opções:**
   - Escolha o modo de exibição (área ativa ou caixa de diálogo).
   - Configure a cor, opacidade e duração de exibição da barra de status.
   - Selecione os idiomas para a transcrição (entrada vocal) e para a exibição do texto.
   - Ative ou desative a funcionalidade de tradução conforme sua necessidade.

## 🛠️ Funcionamento Técnico

- **Arquitetura da Extensão:**
  - **Manifest V3:** O arquivo `manifest.json` define os scripts de conteúdo, o service worker (`background.js`) e as permissões necessárias.
  - **Scripts de Fundo e de Conteúdo:** O arquivo `background.js` gerencia a lógica em segundo plano e a comunicação com as APIs, enquanto `content.js` cuida da interação com a página web ativa.
  - **Utilitários e Internacionalização:** A pasta `src/utils` contém módulos para gerenciar a API, a interface do usuário, a tradução e a internacionalização através de arquivos de idioma na pasta `_locales`.

- **Processo de Transcrição e Tradução:**
  1. **Início da Gravação:** A extensão capta sua voz através do microfone quando você clica no ícone ou usa o atalho de teclado.
  2. **Transcrição:** O áudio é enviado para a API Whisper da OpenAI para ser convertido em texto, com suporte para múltiplos idiomas de entrada.
  3. **Tradução (Opcional):** Se ativada, a transcrição é automaticamente traduzida para o idioma de destino selecionado, mantendo o sentido e o contexto.
  4. **Exibição:** O texto transcrito (e eventualmente traduzido) é inserido no campo ativo ou exibido em uma janela de diálogo personalizada.

## 🛡️ Segurança e Privacidade

- **Proteção de Dados:**
  - A chave API é armazenada de forma segura no Chrome.
  - A extensão não conserva seus dados de áudio; todos os processamentos são realizados em tempo real.
  - A comunicação com as APIs é realizada através de conexões HTTPS seguras.

## 🔧 Solução de Problemas

- **Problemas com o Microfone:**
  - Verifique as permissões de acesso ao microfone no Chrome.
  - Certifique-se de que nenhum outro aplicativo está usando o microfone simultaneamente.

- **Erros de Transcrição/Tradução:**
  - Verifique se a chave API é válida e está ativa.
  - Certifique-se de possuir uma conexão de internet estável.
  - Consulte o console do Chrome para obter logs detalhados em caso de erro.

## 🤝 Contribuição

Contribuições e sugestões são bem-vindas. Para contribuir:
- Reporte bugs através da seção Issues no GitHub.
- Sugira melhorias ou novas funcionalidades.
- Envie seus pull requests.

## 📄 Licença

Esta extensão é distribuída sob a licença GNU Affero General Public License v3.0 (AGPL-3.0). Consulte o arquivo LICENSE para mais detalhes.

## 💝 Apoio

Se você aprecia esta extensão, pode apoiar seu desenvolvimento fazendo uma doação via [PayPal](https://paypal.me/jls).

---
Desenvolvido por jls42.org com paixão e inovação, o Babel Fish AI impulsiona a transcrição e a tradução para novos horizontes graças à inteligência artificial de ponta.

**Este documento foi traduzido da versão fr para a língua pt usando o modelo o3-mini. Para mais informações sobre o processo de tradução, consulte https://gitlab.com/jls42/ai-powered-markdown-translator**

