# Babel Fish AI - Extensão de Transcrição Vocal e Tradução com IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Para utilizar a extensão, você precisará de uma chave de API OpenAI (ou de um fornecedor terceirizado se utilizar o LiteLLM Proxy). Você pode gerar uma chave de API OpenAI aqui: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI é uma extensão Chrome inovadora projetada originalmente para oferecer uma transcrição vocal poderosa. Transforme sua voz em texto com uma precisão notável graças à API Whisper da OpenAI, e desfrute opcionalmente de uma tradução automática em tempo real. Você pode usar o Babel Fish AI exclusivamente para a transcrição ou ativar a tradução em tempo real conforme suas necessidades.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## 🌟 Funcionalidades

- **Transcrição Vocal Avançada**
  - Captura de áudio de alta qualidade através do microfone do seu dispositivo.
  - Transcrição precisa realizada pela API Whisper da OpenAI.
  - Suporte multilíngue para o reconhecimento vocal e visualização do texto, permitindo transcrever entradas vocais em diferentes idiomas e exibir os resultados (transcrição e tradução, se ativada) no idioma de sua escolha.
  - Inserção automática do texto no campo ativo ou exibição em uma caixa de diálogo dedicada.

- **Tradução e Reformulação Inteligentes**
  - Tradução imediata das transcrições para vários idiomas, a ser ativada se necessário.
  - Reformulação do texto para melhorar seu estilo e clareza.
  - Utilização de um modelo de IA avançado para garantir uma tradução fiel ao sentido original.
  - Livre escolha de usar exclusivamente a transcrição ou combinar transcrição e tradução.

- **Menu Contextual Poderoso**
  - Opção "Reformular a seleção" para melhorar instantaneamente os seus textos selecionados.
  - Opção "Traduzir a seleção" com submenu de todos os idiomas disponíveis.
  - Substituição direta do texto selecionado pela versao traduzida ou reformulada.
  - Integração perfeita com a interface nativa do Chrome.

- **Interface do Usuário Intuitiva e Personalizável**
  - Modo de exibição flexível: área de entrada ativa ou janela de diálogo flutuante.
  - Faixa de status configurável com escolha das cores, da opacidade e da duração de exibição.
  - Atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac) para iniciar/parar a gravação.
  - Opção "Manter aberto" para controlar a duração de exibição dos resultados.
  - Ícone personalizado, integrando um microfone e o número "42", para um reconhecimento imediato.

- **Opções Avançadas**
    - Modo especialista para configurações detalhadas (URLs das APIs, configuração por domínio, etc.).
    - Possibilidade de personalizar os modelos de transcrição e de tradução.
    - Compatibilidade com LiteLLM Proxy para se conectar a modelos de linguagem alternativos e desativar o registro de requisições.
    - Gestão completa da internacionalização por meio dos arquivos de idioma (_locales), oferecendo uma interface e suporte de voz em vários idiomas.

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
    - Clone este repositório do GitHub ou baixe manualmente a pasta da extensão.
    - **Ou instale diretamente a extensão através da [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Abra o Chrome e acesse `chrome://extensions/`.
    - Ative o “Modo de desenvolvedor” no canto superior direito.
    - Clique em “Carregar extensão sem empacotar” e selecione a pasta do Babel Fish AI.

2.  **Verificação:**
    - Certifique-se de que a extensão apareça na barra de ferramentas do Chrome com o ícone personalizado.

## ⚙️ Configuração

1.  **Chave de API OpenAI:**
    *   Clique no ícone da extensão para acessar as opções.
    *   Insira sua chave de API OpenAI (disponível em [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalização das Opções:**
    *   Escolha o modo de exibição (área ativa ou caixa de diálogo).
    *   Configure a cor, a opacidade e a duração de exibição da faixa de status.
    *   Selecione os idiomas para a transcrição (entrada de voz) e para a exibição do texto.
    *   Ative ou desative a funcionalidade de tradução conforme necessário.

3.  **(Opcional) Utilização com LiteLLM Proxy:**
    *   Ative o "Modo Especialista" nas opções.
    *   Na seção "Configuração Avançada", modifique **os dois URLs** das APIs (Whisper e Tradução) para apontar para sua instância do LiteLLM Proxy. **Utilize a mesma URL base para ambos.**
    *   Marque a opção "NoLog (LiteLLM apenas)" se desejar desativar o registro das requisições pelo LiteLLM.

## 🚀 Utilização com LiteLLM Proxy

Se você deseja utilizar modelos de linguagem além do OpenAI, pode usar o LiteLLM Proxy. Veja como configurá-lo:

Babel Fish AI é compatível com [LiteLLM Proxy](https://litellm.ai/), que permite utilizar modelos de linguagem alternativos com uma API compatível com a do OpenAI.

### Configuração

1.  **Instale e configure o LiteLLM Proxy:** Siga as instruções no site do LiteLLM.
2.  **Configure a extensão Babel Fish AI:**
    *   Nas opções da extensão (clique com o botão direito no ícone > Opções), ative o "Modo Especialista".
    *   Na seção "Configuração Avançada", modifique **os dois URLs** das APIs (Whisper e Tradução) para apontar para sua instância do LiteLLM Proxy (por exemplo, `http://localhost:4000/v1/audio/transcriptions` e `http://localhost:4000/v1/chat/completions`). **Utilize a mesma URL base para ambos.**
    *   Marque a opção "NoLog (LiteLLM apenas)" se desejar desativar o registro das requisições pelo LiteLLM.

**Importante:** A opção "NoLog" é projetada **exclusivamente** para ser utilizada com o LiteLLM Proxy. **Não a ative** se estiver utilizando a API oficial do OpenAI, pois isso causará um erro e impedirá o funcionamento da tradução.

## 🛠️ Funcionamento Técnico

### Arquitetura da Extensão

A extensão é composta por vários arquivos JavaScript que interagem entre si:

*   **`manifest.json`:** O arquivo de configuração principal da extensão. Ele define as permissões, os scripts, os recursos acessíveis, etc. Utiliza a versão 3 do manifesto e declara as permissões `activeTab`, `storage`, `commands`, `scripting` e `contextMenus`. Os `web_accessible_resources` permitem o acesso aos recursos da extensão nos diferentes contextos de execução.
*   **`background.js`:** O service worker que é executado em segundo plano. Gerencia os eventos (clique no ícone, atalhos de teclado, menu contextual), injeta o `content script`, se necessário, e se comunica com o `content script`.
*   **`content.js`:** O script que é injetado nas páginas web. Interage diretamente com o DOM, capta o áudio do microfone, chama as APIs de transcrição e tradução e exibe os resultados.
*   **`src/utils/api.js`:** Contém as funções que permitem interagir com as APIs, nomeadamente `transcribeAudio` para chamar a API Whisper da OpenAI (transcrição) e funções utilitárias para gerenciar o armazenamento.
*   **`src/utils/translation.js`:** Contém as funções `translateText` e `rephraseText` para chamar a API GPT da OpenAI (tradução e reformulação).
*   **`src/utils/ui.js`:** Contém funções utilitárias para gerenciar a interface do usuário (faixa, caixa de diálogo, botão de cópia).
*   **`src/utils/languages-shared.js` e `src/utils/languages-data.js`:** Definem a lista centralizada dos idiomas suportados, respectivamente para o contexto da página web e para o service worker.
*   **`src/utils/i18n.js`:** Gerencia a internacionalização para a interface do usuário.
*   **`src/constants.js`:** Define constantes para a configuração, os estados, as ações, etc.
*   **`src/pages/options/`:** Contém os arquivos para a página de opções da extensão (HTML, CSS, JavaScript).

### Processo de Transcrição e Tradução

#### Funcionalidade principal de transcrição vocal

1.  **Início da Gravação:** O usuário inicia a gravação clicando no ícone da extensão ou utilizando o atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac). O `background script` envia uma mensagem para o `content script` para iniciar a gravação.
2.  **Captura de Áudio:** O `content script` utiliza a API `navigator.mediaDevices.getUserMedia` para acessar o microfone e gravar o áudio através da API MediaRecorder.
3.  **Transcrição:** O `content script` utiliza a função `transcribeAudio` (`src/utils/api.js`) para enviar o áudio à API Whisper da OpenAI. A API retorna o texto transcrito.
4.  **Tradução ou Reformulação (Opcional):** 
   - Se a opção de tradução estiver ativada, o `content script` utiliza a função `translateText` (`src/utils/translation.js`) para enviar o texto transcrito à API GPT da OpenAI.
   - Se a opção de reformulação estiver ativada, a função `rephraseText` é utilizada para melhorar o texto transcrito.
5.  **Exibição:** O `content script` exibe o texto processado, seja no elemento ativo da página (se for um campo de texto ou elemento editável) ou em uma caixa de diálogo personalizada.

#### Funcionalidade de menu contextual

1. **Seleção de Texto:** O usuário seleciona um texto em uma página web.
2. **Menu Contextual:** Um clique direito exibe as opções "Reformular a seleção" ou "Traduzir a seleção" com um submenu de idiomas disponíveis.
3. **Processamento:** Conforme a opção escolhida:
   - O texto é enviado para reformulação através da função `rephraseText`
   - O texto é enviado para tradução através da função `translateText` com o idioma de destino selecionado
4. **Exibição:** O resultado substitui a seleção original no elemento onde o texto foi selecionado.

### Comunicação

A comunicação entre o `background script` e o `content script` é realizada via API de mensagens do Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Armazenamento de Dados

A extensão utiliza `chrome.storage.sync` para armazenar:

*   A chave de API OpenAI (`apiKey`).
*   As opções da extensão (exibição, tradução, cores da faixa, etc.).
*   As preferências de idioma para a tradução.

Esses dados são armazenados localmente em seu computador, no armazenamento da extensão do Chrome.

### Gerenciamento de Erros
Os erros possíveis (chave de API ausente, erro de transcrição, etc.) são definidos no arquivo `constants.js`. As funções `api.js` e `translation.js` gerenciam os erros potenciais das chamadas às APIs. O `content.js` exibe as mensagens de erro ao usuário através de uma faixa na parte superior da página.

## 🛡️ Segurança e Privacidade

- **Proteção dos Dados:**
  - A chave de API é armazenada de forma segura no Chrome.
  - A extensão não mantém os seus dados de áudio; todos os processamentos são realizados em tempo real.
  - A comunicação com as APIs é feita por meio de conexões HTTPS seguras.

Para informações completas sobre como o BabelFishAI gerencia seus dados, consulte nossa [Política de Privacidade](PRIVACY.md).

## 🔧 Solução de Problemas

- **Problemas com o Microfone:**
  - Verifique as permissões de acesso ao microfone no Chrome.
  - Certifique-se de que nenhum outro aplicativo está usando o microfone simultaneamente.

- **Erros de Transcrição/Tradução:**
  - Verifique se a chave de API é válida e está ativa.
  - Certifique-se de ter uma conexão à internet estável.
  - Consulte o console do Chrome para obter logs detalhados em caso de erro.

## 🤝 Contribuição

Contribuições e sugestões são bem-vindas. Para contribuir:
- Reporte bugs através da seção Issues no GitHub.
- Proponha melhorias ou novas funcionalidades.
- Envie seus pull requests.

## 📄 Licença

Esta extensão é distribuída sob a licença GNU Affero General Public License v3.0 (AGPL-3.0). Consulte o arquivo LICENSE para mais detalhes.

## 💝 Apoio

Se você aprecia esta extensão, pode apoiar seu desenvolvimento fazendo uma doação através do [PayPal](https://paypal.me/jls).
---
Desenvolvido por jls42.org com paixão e inovação, o Babel Fish AI impulsiona a transcrição e a tradução para novos horizontes graças à inteligência artificial de ponta.

**Este documento foi traduzido da versão fr para o idioma pt utilizando o modelo o3-mini. Para mais informações sobre o processo de tradução, consulte https://gitlab.com/jls42/ai-powered-markdown-translator**

