# Babel Fish AI - Extensão de Transcrição de Voz e Tradução com IA

Babel Fish AI é uma extensão inovadora do Chrome projetada originalmente para oferecer uma poderosa transcrição de voz. Transforme sua voz em texto com uma precisão notável graças à API Whisper da OpenAI, e usufrua, opcionalmente, de uma tradução automática em tempo real. Você pode usar o Babel Fish AI exclusivamente para a transcrição ou ativar a tradução instantânea conforme suas necessidades.

## 🌟 Funcionalidades

- **Transcrição de Voz Avançada**
  - Captura de áudio de alta qualidade através do microfone do seu dispositivo.
  - Transcrição precisa realizada pela API Whisper da OpenAI.
  - Suporte multilíngue para o processamento da voz e exibição do texto, permitindo transcrever entradas de voz em diferentes idiomas e exibir os resultados no idioma de sua escolha.
  - Inserção automática do texto no campo ativo ou exibição em uma caixa de diálogo dedicada.

- **Tradução Automática Integrada (Opcional)**
  - Tradução imediata das transcrições para diversos idiomas, a ser ativada se necessário.
  - Utilização de um modelo de IA avançado para garantir uma tradução fiel ao sentido original.
  - Escolha livre de usar exclusivamente a transcrição ou combinar transcrição e tradução.

- **Interface de Usuário Intuitiva e Personalizável**
  - Modo de exibição flexível: área de entrada ativa ou janela de diálogo flutuante.
  - Faixa de status configurável com escolha de cores, opacidade e duração de exibição.
  - Atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac) para iniciar/parar a gravação.
  - Ícone personalizado, integrando um microfone e o número “42”, para um reconhecimento imediato.

- **Opções Avançadas**
  - Modo especialista para configurações detalhadas (URLs das APIs, configuração por domínio, etc.).
  - Possibilidade de personalizar os modelos de transcrição e tradução.
  - Gestão completa da internacionalização graças aos arquivos de idioma (_locales), oferecendo uma interface e suporte de voz em vários idiomas.

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
   - Ative o “Modo desenvolvedor” no canto superior direito.
   - Clique em “Carregar extensão sem empacotar” e selecione a pasta do Babel Fish AI.

2. **Verificação:**
   - Certifique-se de que a extensão aparece na barra de ferramentas do Chrome com o ícone personalizado.

## ⚙️ Configuração

1. **Chave API OpenAI:**
   - Clique no ícone da extensão para acessar as opções.
   - Insira sua chave API OpenAI (disponível em [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2. **Personalização das Opções:**
   - Escolha o modo de exibição (área ativa ou caixa de diálogo).
   - Configure a cor, a opacidade e a duração de exibição da faixa de status.
   - Selecione os idiomas para a transcrição (entrada de voz) e para a exibição do texto.
   - Ative ou desative a funcionalidade de tradução conforme suas necessidades.

## 🛠️ Funcionamento Técnico

### Arquitetura da Extensão

A extensão é composta por vários arquivos JavaScript que interagem entre si:

*   **`manifest.json`:** O arquivo de configuração principal da extensão. Define as permissões, os scripts, os recursos acessíveis, etc. Utiliza a versão 3 do manifesto e declara as permissões `activeTab`, `storage`, `commands` e `scripting`. Os `content_scripts` são injetados em todas as URLs e executados ao final do carregamento do documento.
*   **`background.js`:** O service worker que roda em segundo plano. Gerencia os eventos (clique no ícone, atalhos de teclado), injeta o `content script` se necessário e se comunica com o `content script`.
*   **`content.js`:** O script que é injetado nas páginas web. Interage diretamente com o DOM, captura o áudio do microfone, chama as APIs de transcrição e tradução, e exibe os resultados.
*   **`src/utils/api.js`:** Contém a função `transcribeAudio` para chamar a API Whisper da OpenAI (transcrição).
*   **`src/utils/translation.js`:** Contém a função `translateText` para chamar a API GPT da OpenAI (tradução).
*   **`src/utils/ui.js`:** Contém funções utilitárias para gerenciar a interface do usuário (banner, caixa de diálogo, botão de cópia).
*   **`src/constants.js`:** Define constantes para a configuração, estados, ações, etc.
*   **`src/pages/options/`:** Contém os arquivos para a página de opções da extensão (HTML, CSS, JavaScript).

### Processo de Transcrição e Tradução

1.  **Início da Gravação:** O usuário inicia a gravação clicando no ícone da extensão ou utilizando o atalho de teclado. O `background script` envia uma mensagem para o `content script` para iniciar a gravação.
2.  **Captura de Áudio:** O `content script` utiliza a API `navigator.mediaDevices.getUserMedia` para acessar o microfone e gravar o áudio.
3.  **Transcrição:** O `content script` utiliza a função `transcribeAudio` (`src/utils/api.js`) para enviar o áudio para a API Whisper da OpenAI. A API retorna o texto transcrito.
4.  **Tradução (Opcional):** Se a opção de tradução estiver ativada, o `content script` utiliza a função `translateText` (`src/utils/translation.js`) para enviar o texto transcrito para a API GPT da OpenAI. A API retorna o texto traduzido.
5.  **Exibição:** O `content script` exibe o texto transcrito (e, se aplicável, traduzido) seja no elemento ativo da página (se for um campo de texto ou elemento editável), seja em uma caixa de diálogo.

### Comunicação

A comunicação entre o `background script` e o `content script` é feita através da API de mensagens do Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Armazenamento dos Dados

A extensão utiliza `chrome.storage.sync` para armazenar:

*   A chave API OpenAI (`apiKey`).
*   As opções da extensão (exibição, tradução, cores do banner, etc.).

### Gestão de Erros
Os possíveis erros (chave API ausente, erro de transcrição, etc.) são definidos no arquivo `constants.js`. As funções em `api.js` e `translation.js` gerenciam os erros potenciais das chamadas às APIs. O `content.js` exibe as mensagens de erro para o usuário através de um banner no topo da página.

## 🛡️ Segurança e Privacidade

- **Proteção dos Dados:**
  - A chave API é armazenada de maneira segura no Chrome.
  - A extensão não retém seus dados de áudio; todos os processos são efetuados em tempo real.
  - A comunicação com as APIs é feita via conexões HTTPS seguras.

## 🔧 Solução de Problemas

- **Problemas com o Microfone:**
  - Verifique as permissões de acesso ao microfone no Chrome.
  - Certifique-se de que nenhuma outra aplicação está usando o microfone simultaneamente.

- **Erros de Transcrição/Tradução:**
  - Verifique se a chave API é válida e está ativa.
  - Certifique-se de ter uma conexão de internet estável.
  - Consulte o console do Chrome para obter logs detalhados em caso de erro.

## 🤝 Contribuição

Contribuições e sugestões são muito bem-vindas. Para contribuir:
- Informe os bugs através da seção Issues no GitHub.
- Proponha melhorias ou novas funcionalidades.
- Envie seus pull requests.

## 📄 Licença

Esta extensão é distribuída sob a licença GNU Affero General Public License v3.0 (AGPL-3.0). Consulte o arquivo LICENSE para mais detalhes.

## 💝 Apoio

Se você aprecia esta extensão, pode apoiar seu desenvolvimento fazendo uma doação via [PayPal](https://paypal.me/jls).

---
Desenvolvido por jls42.org com paixão e inovação, o Babel Fish AI impulsiona a transcrição e a tradução para novos horizontes graças à inteligência artificial de ponta.

**Este documento foi traduzido da versão fr para a língua pt utilizando o modelo o3-mini. Para mais informações sobre o processo de tradução, consulte https://gitlab.com/jls42/ai-powered-markdown-translator**

