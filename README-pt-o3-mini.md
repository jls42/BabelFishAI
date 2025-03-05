# Babel Fish AI - Extensão de Transcrição Vocal e Tradução com IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Para usar a extensão, você precisará de uma chave API OpenAI (ou de um provedor de terceiros se estiver usando LiteLLM Proxy). Você pode gerar uma chave API OpenAI aqui: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)**

Babel Fish AI é uma extensão Chrome inovadora, originalmente projetada para oferecer uma transcrição vocal poderosa. Transforme sua voz em texto com uma precisão notável graças à API Whisper da OpenAI e desfrute, opcionalmente, de uma tradução automática em tempo real. Você pode usar o Babel Fish AI exclusivamente para a transcrição ou ativar a tradução dinâmica conforme suas necessidades.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai)

## 🌟 Funcionalidades

- **Transcrição Vocal Avançada**
  - Captura de áudio de alta qualidade através do microfone do seu dispositivo.
  - Transcrição precisa realizada pela API Whisper da OpenAI.
  - Suporte multilíngue para o reconhecimento vocal e exibição do texto, permitindo transcrever entradas de voz em diferentes idiomas e exibir os resultados (transcrição e tradução, se ativada) no idioma da sua escolha.
  - Inserção automática do texto no campo ativo ou exibição em uma caixa de diálogo dedicada.

- **Tradução Automática Integrada (Opcional)**
  - Tradução imediata das transcrições para vários idiomas, a ser ativada conforme necessário.
  - Utilização de um modelo de IA avançado para garantir uma tradução fiel ao sentido original.
  - Livre escolha de usar exclusivamente a transcrição ou combinar transcrição e tradução.

- **Interface do Usuário Intuitiva e Personalizável**
  - Modo de exibição flexível: área de entrada ativa ou janela de diálogo flutuante.
  - Faixa de status configurável com escolha de cores, opacidade e duração de exibição.
  - Atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac) para iniciar/pausar a gravação.
  - Ícone personalizado, integrando um microfone e o número “42”, para um reconhecimento imediato.

- **Opções Avançadas**
    - Modo expert para configurações detalhadas (URLs das API, configuração por domínio, etc.).
    - Possibilidade de personalizar os modelos de transcrição e tradução.
    - Compatibilidade com LiteLLM Proxy para conectar a modelos de linguagem alternativos e desativar o registro de requisições.
    - Gerenciamento completo da internacionalização por meio dos arquivos de idioma (_locales), oferecendo uma interface e suporte vocal em vários idiomas.

## 🌐 Idiomas Suportados

Aqui está a lista de idiomas suportados pelo Babel Fish AI, com links para vídeos de demonstração:

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
    - Clone este repositório no GitHub ou baixe manualmente a pasta da extensão.
    - **Ou instale diretamente a extensão a partir do [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Abra o Chrome e acesse `chrome://extensions/`.
    - Ative o “Modo de desenvolvedor” no canto superior direito.
    - Clique em “Carregar extensão sem empacotar” e selecione a pasta do Babel Fish AI.

2.  **Verificação:**
    - Certifique-se de que a extensão aparece na barra de ferramentas do Chrome com o ícone personalizado.

## ⚙️ Configuração

1.  **Chave API OpenAI:**
    *   Clique no ícone da extensão para acessar as opções.
    *   Insira sua chave API OpenAI (disponível em [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)).

2.  **Personalização das Opções:**
    *   Escolha o modo de exibição (área ativa ou caixa de diálogo).
    *   Configure a cor, a opacidade e a duração de exibição da faixa de status.
    *   Selecione os idiomas para a transcrição (entrada vocal) e para a exibição do texto.
    *   Ative ou desative a funcionalidade de tradução conforme suas necessidades.

3.  **(Opcional) Uso com LiteLLM Proxy:**
    *   Ative o "Modo Expert" nas opções.
    *   Na seção "Configuração Avançada", modifique **as duas URLs** das API (Whisper e Tradução) para apontar para sua instância do LiteLLM Proxy. **Utilize a mesma URL base para as duas.**
    *   Marque a opção "NoLog (LiteLLM somente)" se desejar desativar o registro de requisições pelo LiteLLM.

## 🚀 Uso com LiteLLM Proxy

Se você deseja utilizar modelos de linguagem além do OpenAI, pode usar o LiteLLM Proxy. Veja como configurá-lo:

Babel Fish AI é compatível com o [LiteLLM Proxy](https://litellm.ai/), que permite o uso de modelos de linguagem alternativos com uma API compatível com a do OpenAI.

### Configuração

1.  **Instale e configure o LiteLLM Proxy:** Siga as instruções no site do LiteLLM.
2.  **Configure a extensão Babel Fish AI:**
    *   Nas opções da extensão (clique com o botão direito no ícone > Opções), ative o "Modo Expert".
    *   Na seção "Configuração Avançada", modifique **as duas URLs** das API (Whisper e Tradução) para apontar para sua instância do LiteLLM Proxy (por exemplo, `http://localhost:4000/v1/audio/transcriptions` e `http://localhost:4000/v1/chat/completions`). **Utilize a mesma URL base para as duas.**
    *   Marque a opção "NoLog (LiteLLM somente)" se desejar desativar o registro de requisições pelo LiteLLM.

**Importante:** A opção "NoLog" foi projetada **exclusivamente** para ser usada com o LiteLLM Proxy. **Não a ative** se estiver utilizando a API oficial do OpenAI, pois isso gerará um erro e impedirá o funcionamento da tradução.

## 🛠️ Funcionamento Técnico

### Arquitetura da Extensão

A extensão é composta por vários arquivos JavaScript que interagem entre si:

*   **`manifest.json`:** O arquivo principal de configuração da extensão. Ele define as permissões, scripts, recursos acessíveis, etc. Utiliza a versão 3 do manifesto e declara as permissões `activeTab`, `storage`, `commands` e `scripting`. Os `content_scripts` são injetados em todas as URLs e executados ao final do carregamento do documento.
*   **`background.js`:** O service worker que roda em segundo plano. Gerencia os eventos (clique no ícone, atalhos de teclado), injeta o `content script` se necessário e comunica-se com o `content script`.
*   **`content.js`:** O script que é injetado nas páginas web. Interage diretamente com o DOM, captura o áudio do microfone, chama as APIs de transcrição e tradução, e exibe os resultados.
*   **`src/utils/api.js`:** Contém a função `transcribeAudio` para chamar a API Whisper da OpenAI (transcrição).
*   **`src/utils/translation.js`:** Contém a função `translateText` para chamar a API GPT da OpenAI (tradução).
*   **`src/utils/ui.js`:** Contém funções utilitárias para gerenciar a interface do usuário (banner, caixa de diálogo, botão de cópia).
*   **`src/constants.js`:** Define constantes para a configuração, estados, ações, etc.
*   **`src/pages/options/`:** Contém os arquivos para a página de opções da extensão (HTML, CSS, JavaScript).

### Processo de Transcrição e Tradução

1.  **Início da Gravação:** O usuário inicia a gravação clicando no ícone da extensão ou utilizando o atalho de teclado. O `background script` envia uma mensagem para o `content script` para iniciar a gravação.
2.  **Captura de Áudio:** O `content script` usa a API `navigator.mediaDevices.getUserMedia` para acessar o microfone e gravar o áudio.
3.  **Transcrição:** O `content script` utiliza a função `transcribeAudio` (`src/utils/api.js`) para enviar o áudio para a API Whisper da OpenAI. A API retorna o texto transcrito.
4.  **Tradução (Opcional):** Se a opção de tradução estiver ativada, o `content script` utiliza a função `translateText` (`src/utils/translation.js`) para enviar o texto transcrito para a API GPT da OpenAI. A API retorna o texto traduzido.
5.  **Exibição:** O `content script` exibe o texto transcrito (e, eventualmente, traduzido) seja no elemento ativo da página (se for um campo de texto ou elemento editável), ou em uma caixa de diálogo.

### Comunicação

A comunicação entre o `background script` e o `content script` é feita através da API de mensagens do Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Armazenamento de Dados

A extensão utiliza `chrome.storage.sync` para armazenar:

*   A chave API OpenAI (`apiKey`).
*   As opções da extensão (exibição, tradução, cores do banner, etc.).

Esses dados são armazenados localmente no seu computador, no armazenamento da extensão Chrome.

### Gerenciamento de Erros

Erros possíveis (chave API ausente, erro de transcrição, etc.) são definidos no arquivo `constants.js`. As funções em `api.js` e `translation.js` gerenciam os erros potenciais das chamadas de API. O `content.js` exibe mensagens de erro ao usuário via um banner na parte superior da página.

## 🛡️ Segurança e Privacidade

- **Proteção dos Dados:**
  - A chave API é armazenada de maneira segura no Chrome.
  - A extensão não retém seus dados de áudio; todo o processamento é feito em tempo real.
  - A comunicação com as APIs é realizada por conexões HTTPS seguras.

Para informações completas sobre como o BabelFishAI gerencia seus dados, consulte nossa [Política de Privacidade](PRIVACY.md).

## 🔧 Solução de Problemas

- **Problemas com o Microfone:**
  - Verifique as permissões de acesso ao microfone no Chrome.
  - Certifique-se de que nenhum outro aplicativo esteja utilizando o microfone simultaneamente.

- **Erros de Transcrição/Tradução:**
  - Verifique se a chave API é válida e está ativa.
  - Assegure uma conexão de internet estável.
  - Consulte o console do Chrome para obter logs detalhados em caso de erro.

## 🤝 Contribuição

Contribuições e sugestões são bem-vindas. Para contribuir:
- Reporte bugs via a seção Issues no GitHub.
- Proponha melhorias ou novas funcionalidades.
- Envie seus pull requests.

## 📄 Licença

Esta extensão é distribuída sob a licença GNU Affero General Public License v3.0 (AGPL-3.0). Consulte o arquivo LICENSE para mais detalhes.

## 💝 Apoio

Se você aprecia esta extensão, pode apoiar seu desenvolvimento fazendo uma doação via [PayPal](https://paypal.me/jls).
---
Desenvolvido por jls42.org com paixão e inovação, o Babel Fish AI impulsiona a transcrição e a tradução para novos horizontes graças à inteligência artificial de ponta.

**Este documento foi traduzido da versão fr para o idioma pt usando o modelo o3-mini. Para mais informações sobre o processo de tradução, consulte https://gitlab.com/jls42/ai-powered-markdown-translator**

