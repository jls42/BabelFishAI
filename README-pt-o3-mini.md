# Babel Fish AI - Extensão de Transcrição de Voz e Tradução com IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Para usar a extensão, você precisará de uma chave API da OpenAI (ou de um provedor terceiro se estiver utilizando o LiteLLM Proxy). Você pode gerar uma chave API da OpenAI aqui: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI é uma extensão inovadora para o Chrome, originalmente criada para oferecer uma poderosa transcrição de voz. Transforme sua voz em texto com precisão notável graças à API Whisper da OpenAI, e, se desejar, aproveite uma tradução automática em tempo real. Você pode usar o Babel Fish AI exclusivamente para transcrição ou ativar a tradução simultânea conforme sua necessidade.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funcionalidades

- **Transcrição de Voz Avançada**
  - Captura de áudio de alta qualidade através do microfone do seu dispositivo.
  - Transcrição precisa realizada pela API Whisper da OpenAI.
  - Suporte multilíngue para reconhecimento de voz e exibição do texto, permitindo transcrever entradas de voz em diferentes idiomas e exibir os resultados (transcrição e tradução, se ativada) no idioma de sua escolha.
  - Inserção automática do texto no campo ativo ou exibição em uma caixa de diálogo dedicada.

- **Tradução e Reformulação Inteligente**
  - Tradução imediata das transcrições para diversos idiomas, para ser ativada conforme necessário.
  - Reformulação do texto para melhorar seu estilo e clareza.
  - Uso de um modelo de IA avançado para garantir uma tradução fiel ao sentido original.
  - Livre escolha para usar exclusivamente a transcrição ou combinar transcrição e tradução.

- **Menu Contextual Poderoso**
  - Opção "Reformular a seleção" para melhorar instantaneamente os textos selecionados.
  - Opção "Traduzir a seleção" com submenu de todos os idiomas disponíveis.
  - Substituição direta do texto selecionado por sua versão traduzida ou reformulada.
  - Perfeita integração na interface nativa do Chrome.

- **Interface de Usuário Intuitiva e Personalizável**
  - Modo de exibição flexível: área de digitação ativa ou janela de diálogo flutuante.
  - Barra de status configurável com escolha de cores, opacidade e duração de exibição.
  - Atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac) para iniciar/parar a gravação.
  - Opção "Manter aberto" para controlar a duração de exibição dos resultados.
  - Ícone personalizado, integrando um microfone e o número "42", para reconhecimento imediato.

- **Opções Avançadas**
    - Modo especialista para configurações detalhadas (URLs das APIs, configuração por domínio, etc.).
    - Possibilidade de personalizar os modelos de transcrição e de tradução.
    - Compatibilidade com LiteLLM Proxy para conectar a modelos de linguagem alternativos e desativar a gravação de logs das requisições.
    - Gerenciamento completo da internacionalização através dos arquivos de idioma (_locales), oferecendo uma interface e suporte de voz em vários idiomas.

## 🌐 Idiomas Suportados

Segue a lista dos idiomas suportados pelo Babel Fish AI, com links para vídeos de demonstração:

- [Árabe](https://www.youtube.com/watch?v=onzOGx7nbUE)
- [Alemão](https://www.youtube.com/watch?v=G1QVF1NTQYE)
- [Inglês](https://www.youtube.com/watch?v=QC8WiIszn3Q)
- [Espanhol](https://www.youtube.com/watch?v=nA93pis4vDQ)
- [Francês](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
- [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
- [Italiano](https://www.youtube.com/watch?v=QgYZt8myods)
- [Japonês](https://www.youtube.com/watch?v=noHEJCnocH8)
- [Coreano](https://www.youtube.com/watch?v=YrYN75YSH3w)
- [Holandês](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
- [Polonês](https://www.youtube.com/watch?v=E5AVNjZYOxM)
- [Português](https://www.youtube.com/watch?v=st0XwCV1tvo)
- [Romeno](https://www.youtube.com/watch?v=H2IMpU5_Hew)
- [Sueco](https://www.youtube.com/watch?v=HMMzGyW8000)
- [Chinês](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Instalação

1.  **Download e Instalação:**
    - Clone este repositório a partir do GitHub ou baixe manualmente a pasta da extensão.
    - **Ou instale diretamente a extensão a partir da [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Abra o Chrome e acesse `chrome://extensions/`.
    - Ative o "Modo de Desenvolvedor" no canto superior direito.
    - Clique em "Carregar sem compactação" e selecione a pasta do Babel Fish AI.

2.  **Verificação:**
    - Certifique-se de que a extensão aparece na barra de ferramentas do Chrome com o ícone personalizado.

## ⚙️ Configuração

1.  **Chave API OpenAI:**
    *   Clique no ícone da extensão para acessar as opções.
    *   Insira sua chave API OpenAI (disponível em [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalização das Opções:**
    *   Escolha o modo de exibição (área ativa ou caixa de diálogo).
    *   Configure a cor, a opacidade e a duração de exibição da barra de status.
    *   Selecione os idiomas para a transcrição (entrada de voz) e para a exibição do texto.
    *   Ative ou desative a funcionalidade de tradução conforme necessário.

3.  **(Opcional) Uso com LiteLLM Proxy:**
    *   Ative o "Modo Especialista" nas opções.
    *   Na seção "Configuração Avançada", modifique **as duas URLs** das APIs (Whisper e Tradução) para apontar para sua instância do LiteLLM Proxy. **Use a mesma URL base para ambas.**
    *   Marque a opção "NoLog (LiteLLM somente)" se desejar desativar o registro de logs das requisições pelo LiteLLM.

## 🚀 Uso com LiteLLM Proxy

Se desejar utilizar modelos de linguagem que não sejam da OpenAI, você pode usar o LiteLLM Proxy. Veja como configurá-lo:

Babel Fish AI é compatível com o [LiteLLM Proxy](https://litellm.ai/), que permite utilizar modelos de linguagem alternativos com uma API compatível com a da OpenAI.

### Configuração

1.  **Instale e configure o LiteLLM Proxy:** Siga as instruções no site do LiteLLM.
2.  **Configure a extensão Babel Fish AI:**
    *   Nas opções da extensão (clique com o botão direito no ícone > Opções), ative o "Modo Especialista".
    *   Na seção "Configuração Avançada", modifique **as duas URLs** das APIs (Whisper e Tradução) para apontar para sua instância do LiteLLM Proxy (por exemplo, `http://localhost:4000/v1/audio/transcriptions` e `http://localhost:4000/v1/chat/completions`). **Use a mesma URL base para ambas.**
    *   Marque a opção "NoLog (LiteLLM somente)" se desejar desativar o registro de logs das requisições pelo LiteLLM.

**Importante:** A opção "NoLog" foi criada **exclusivamente** para ser utilizada com o LiteLLM Proxy. **Não a ative** se estiver utilizando a API oficial da OpenAI, pois isso causará um erro e impedirá o funcionamento da tradução.

## 🛠️ Funcionamento Técnico

### Arquitetura da Extensão

A extensão é composta por vários arquivos JavaScript que interagem entre si:

#### Arquivos Principais

*   **`manifest.json`:** O arquivo de configuração principal da extensão. Define as permissões, os scripts, os recursos acessíveis, etc. Utiliza a versão 3 do manifesto e declara as permissões `activeTab`, `storage`, `commands`, `scripting` e `contextMenus`.
*   **`background.js`:** O service worker que roda em segundo plano. Gerencia os eventos (clique no ícone, atalhos de teclado, menu contextual), injeta o `content script` se necessário e se comunica com o `content script`.
*   **`content.js`:** O script principal que é injetado nas páginas web. Coordena os diferentes módulos utilitários e gerencia o fluxo global da extensão.
*   **`src/constants.js`:** Define constantes para a configuração, estados, ações, etc.

#### Módulos Utilitários

A extensão utiliza uma arquitetura modular com diversos arquivos utilitários especializados:

##### Gerenciamento das APIs e Processamento de Dados

*   **`src/utils/api.js`:** Contém as funções que permitem interagir com as APIs, notadamente a `transcribeAudio` para chamar a API Whisper da OpenAI.
*   **`src/utils/api-utils.js`:** Funções avançadas para a interação com APIs externas.
*   **`src/utils/translation.js`:** Contém as funções `translateText` e `rephraseText` para chamar a API GPT da OpenAI.
*   **`src/utils/text-translation.js`:** Funções especializadas para tradução e reformulação de texto.
*   **`src/utils/text-processing.js`:** Funções gerais de processamento de texto.

##### Interface de Usuário e Interação

*   **`src/utils/ui.js`:** Funções utilitárias gerais para a interface de usuário.
*   **`src/utils/banner-utils.js`:** Gerencia a barra de status, seus controles e o seletor de idioma.
*   **`src/utils/focus-utils.js`:** Gerencia a preservação e restauração do foco e da seleção de texto.
*   **`src/utils/transcription-display.js`:** Gerencia a exibição dos resultados da transcrição.
*   **`src/utils/error-utils.js`:** Gerencia a exibição e o tratamento de erros.
*   **`src/styles/content.css`:** Estilos CSS para a interface de usuário injetada nas páginas web.

##### Gravação e Eventos

*   **`src/utils/recording-utils.js`:** Gerencia a gravação de áudio através do microfone e o processamento dos dados de áudio.
*   **`src/utils/event-handlers.js`:** Contém os manipuladores de eventos para as interações do usuário.

##### Internacionalização e Idiomas

*   **`src/utils/languages.js`:** Define os idiomas suportados pela extensão.
*   **`src/utils/languages-shared.js`:** Define a lista de idiomas suportados para o contexto da página web.
*   **`src/utils/languages-data.js`:** Define a lista de idiomas suportados para o service worker.
*   **`src/utils/i18n.js`:** Gerencia a internacionalização para a interface de usuário.

##### Página de Opções

*   **`src/pages/options/`:** Contém os arquivos para a página de opções da extensão (HTML, CSS, JavaScript).

### Processo de Transcrição e Tradução

#### Funcionalidade principal de transcrição de voz

1.  **Início da Gravação:** O usuário inicia a gravação clicando no ícone da extensão ou utilizando o atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac). O `background script` envia uma mensagem ao `content script` para iniciar a gravação.
2.  **Captura de Áudio:** O `content script` utiliza a API `navigator.mediaDevices.getUserMedia` para acessar o microfone e gravar o áudio através da API MediaRecorder.
3.  **Transcrição:** O `content script` utiliza a função `transcribeAudio` (`src/utils/api.js`) para enviar o áudio para a API Whisper da OpenAI. A API retorna o texto transcrito.
4.  **Tradução ou Reformulação (Opcional):**
   - Se a opção de tradução estiver ativada, o `content script` utiliza a função `translateText` (`src/utils/translation.js`) para enviar o texto transcrito para a API GPT da OpenAI.
   - Se a opção de reformulação estiver ativada, a função `rephraseText` é utilizada para aprimorar o texto transcrito.
5.  **Exibição:** O `content script` exibe o texto processado, seja no elemento ativo da página (se for um campo de texto ou elemento editável) ou em uma caixa de diálogo personalizada.

#### Funcionalidade do menu contextual

1. **Seleção de Texto:** O usuário seleciona um texto em uma página web.
2. **Menu Contextual:** Um clique com o botão direito exibe as opções "Reformular a seleção" ou "Traduzir a seleção" com um submenu dos idiomas disponíveis.
3. **Processamento:** Dependendo da opção escolhida:
   - O texto é enviado para reformulação através da função `rephraseText`.
   - O texto é enviado para tradução através da função `translateText` com o idioma de destino selecionado.
4. **Exibição:** O resultado substitui a seleção original no elemento onde o texto estava selecionado.

### Comunicação

A comunicação entre o `background script` e o `content script` ocorre através da API de mensagens do Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Armazenamento de Dados

A extensão utiliza `chrome.storage.sync` para armazenar:

*   A chave API da OpenAI (`apiKey`).
*   As opções da extensão (exibição, tradução, cores da barra de status, etc.).
*   As preferências de idioma para a tradução.

Esses dados são armazenados localmente no seu computador, no armazenamento da extensão do Chrome.

### Gerenciamento de Erros

Os erros possíveis (chave API ausente, erro de transcrição, etc.) são definidos no arquivo `constants.js`. As funções em `api.js` e `translation.js` gerenciam os erros potenciais das requisições à API. O `content.js` exibe as mensagens de erro para o usuário por meio de uma barra no topo da página.

## 🛡️ Segurança e Privacidade

- **Proteção de Dados:**
  - A chave API é armazenada de forma segura no Chrome.
  - A extensão não mantém seus dados de áudio; todos os processos ocorrem em tempo real.
  - A comunicação com as APIs é realizada via conexões HTTPS seguras.

Para informações completas sobre como o BabelFishAI gerencia seus dados, consulte nossa [Política de Privacidade](PRIVACY.md).

## 🔧 Solução de Problemas

- **Problemas com o Microfone:**
  - Verifique as permissões de acesso ao microfone no Chrome.
  - Certifique-se de que nenhum outro aplicativo está utilizando o microfone simultaneamente.

- **Erros de Transcrição/Tradução:**
  - Verifique se a chave API é válida e está ativa.
  - Certifique-se de que possui uma conexão estável com a Internet.
  - Consulte o console do Chrome para obter logs detalhados em caso de erro.

## 🤝 Contribuição

Contribuições e sugestões são bem-vindas. Para contribuir:
- Relate bugs através da seção Issues no GitHub.
- Proponha melhorias ou novas funcionalidades.
- Submeta seus pull requests.

## 📄 Licença

Esta extensão é distribuída sob a licença GNU Affero General Public License v3.0 (AGPL-3.0). Consulte o arquivo LICENSE para mais detalhes.

## 💝 Apoio

Se você aprecia esta extensão, pode apoiar seu desenvolvimento fazendo uma doação via [PayPal](https://paypal.me/jls).
---
Desenvolvido por jls42.org com paixão e inovação, o Babel Fish AI impulsiona a transcrição e a tradução para novos horizontes graças à inteligência artificial de ponta.

**Este documento foi traduzido da versão fr para a língua pt utilizando o modelo o3-mini. Para mais informações sobre o processo de tradução, consulte https://gitlab.com/jls42/ai-powered-markdown-translator**

