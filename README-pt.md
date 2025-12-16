# Babel Fish AI - Extensão de Transcrição de Voz e Tradução com IA

<img src="images/icon128.png" alt="Babel Fish AI Icon" width="128" height="128">

**Site oficial: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

**Para usar a extensão, você precisará de uma chave de API de um dos provedores suportados:**

| Provedor | Obter uma chave de API |
|:--------:|:-----------------------|
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) |
| <img src="images/openai-logo.png" alt="OpenAI" height="30"> | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
| 🚅 | **Custom/LiteLLM**: Para usar seus próprios endpoints de API |

Babel Fish AI é uma extensão Chrome inovadora projetada para oferecer uma poderosa transcrição de voz com suporte a vários provedores. Transforme sua voz em texto com precisão notável graças às APIs de transcrição da Mistral AI (Voxtral) ou OpenAI (Whisper), e beneficie-se opcionalmente de uma tradução automática em tempo real. Você pode usar a Babel Fish AI exclusivamente para transcrição ou ativar a tradução instantânea conforme suas necessidades.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funcionalidades

- **Transcrição de Voz Avançada**
  - Captura de áudio de alta qualidade através do microfone do seu dispositivo.
  - Transcrição precisa através das APIs Voxtral (Mistral AI) ou Whisper (OpenAI).
  - Suporte a múltiplos provedores: escolha livremente entre Mistral AI, OpenAI ou um endpoint personalizado.
  - Suporte multilíngue para reconhecimento de voz e exibição de texto, permitindo transcrever entradas de voz em diferentes idiomas e exibir resultados (transcrição e tradução, se ativada) no idioma de sua escolha.
  - Inserção automática de texto no campo ativo ou exibição em uma caixa de diálogo dedicada.

- **Tradução e Reformulação Inteligentes**
  - Tradução imediata das transcrições para vários idiomas, ativável se necessário.
  - Reformulação de texto para melhorar seu estilo e clareza.
  - Uso de um modelo de IA avançado para garantir uma tradução fiel ao sentido original.
  - Livre escolha de usar exclusivamente a transcrição ou combinar transcrição e tradução.

- **Menu de Contexto Poderoso**
  - Opção "Reformular seleção" para melhorar instantaneamente seus textos selecionados.
  - Opção "Traduzir seleção" com submenu de todos os idiomas disponíveis.
  - Opção "Corrigir ortografia" para corrigir erros de ortografia, gramática e pontuação.
  - Substituição direta do texto selecionado por sua versão traduzida, reformulada ou corrigida.
  - Integração perfeita na interface de usuário nativa do Chrome.

- **Interface de Usuário Intuitiva e Personalizável**
  - Modo de exibição flexível: área de entrada ativa ou janela de diálogo flutuante.
  - Banner de status configurável com escolha de cores, opacidade e duração de exibição.
  - Atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac) para iniciar/parar a gravação.
  - Opção "Manter aberto" para controlar a duração de exibição dos resultados.
  - Ícone personalizado, integrando um microfone e o número "42", para reconhecimento imediato.

- **Opções Avançadas**
    - Suporte a múltiplos provedores: Mistral AI, OpenAI e Custom/LiteLLM para máxima flexibilidade.
    - Capacidade de personalizar modelos de transcrição e tradução por provedor.
    - Seleção independente do provedor para transcrição e tradução/reformulação.
    - Compatibilidade com LiteLLM Proxy através do provedor Custom para conectar a modelos alternativos.
    - Gerenciamento completo de internacionalização através de arquivos de idioma (_locales), oferecendo uma interface e suporte de voz em vários idiomas.

## 🌐 Idiomas Suportados

Aqui está a lista de idiomas suportados pela Babel Fish AI, com links para vídeos de demonstração:

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

### Chrome

1.  **Download e Instalação:**
    - Clone este repositório do GitHub ou baixe a pasta da extensão manualmente.
    - **Ou instale a extensão diretamente da [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    - Abra o Chrome e vá para `chrome://extensions/`.
    - Ative o "Modo desenvolvedor" no canto superior direito.
    - Clique em "Carregar sem compactação" e selecione a pasta da Babel Fish AI.

2.  **Verificação:**
    - Certifique-se de que a extensão aparece na barra de ferramentas do Chrome com o ícone personalizado.

### Firefox

1.  **Instalação da loja:**
    - A extensão estará em breve disponível no [Firefox Add-ons](https://addons.mozilla.org/).

2.  **Instalação temporária (desenvolvimento):**
    - Abra o Firefox e vá para `about:debugging#/runtime/this-firefox`.
    - Clique em "Carregar extensão temporária...".
    - Selecione o arquivo `manifest.firefox.json` na raiz do projeto.

## ⚙️ Configuração

1.  **Configuração do Provedor de IA:**
    *   Clique no ícone da extensão para acessar as opções.
    *   Selecione seu provedor no menu suspenso (Mistral AI, OpenAI ou Custom/LiteLLM).
    *   Insira sua chave de API:
        - **Mistral AI**: disponível em [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        - **OpenAI**: disponível em [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    *   Ative o provedor com a alternância ao lado do menu suspenso.

2.  **Personalização de Opções:**
    *   Escolha o modo de exibição (área ativa ou caixa de diálogo).
    *   Configure a cor, opacidade e duração de exibição do banner de status.
    *   Selecione os idiomas para transcrição (entrada de voz) e exibição de texto.
    *   Ative ou desative o recurso de tradução conforme necessário.

3.  **(Opcional) Configuração avançada de modelos:**
    *   Nas opções de cada provedor, clique em "Configuração de modelos" para personalizar os modelos usados.
    *   Você pode adicionar modelos personalizados para transcrição e tradução/reformulação.
    *   Se vários provedores estiverem ativados, você poderá escolher qual usar para cada serviço (transcrição e tradução).

## 🚀 Uso com LiteLLM Proxy ou Endpoints Personalizados

Babel Fish AI é compatível com [LiteLLM Proxy](https://litellm.ai/) e outros proxies de API compatíveis com OpenAI, permitindo o uso de modelos de linguagem alternativos.

### Configuração

1.  **Instale e configure seu proxy:** Siga as instruções do serviço que você está usando (LiteLLM, etc.).
2.  **Configure a extensão Babel Fish AI:**
    *   Nas opções da extensão, selecione o provedor **Custom/LiteLLM** no menu suspenso.
    *   Insira sua chave de API (se necessário).
    *   Configure as URLs da API:
        - **URL Transcrição**: por exemplo `http://localhost:4000/v1/audio/transcriptions`
        - **URL Chat**: por exemplo `http://localhost:4000/v1/chat/completions`
    *   Ative o provedor com a alternância.
    *   Marque a opção **"NoLog"** se desejar desativar o registro de solicitações pelo LiteLLM.

**Importante:** A opção "NoLog" está disponível **apenas** no provedor Custom/LiteLLM. Não é compatível com as APIs oficiais da OpenAI ou Mistral AI.

## 🛠️ Funcionamento Técnico

### Arquitetura da Extensão

A extensão é composta por vários arquivos JavaScript que interagem entre si:

#### Arquivos Principais

*   **`manifest.json`:** O arquivo de configuração principal da extensão. Define permissões, scripts, recursos acessíveis, etc. Usa o Manifesto V3 e declara permissões `activeTab`, `storage`, `commands`, `scripting` e `contextMenus`.
*   **`background.js`:** O service worker que é executado em segundo plano. Gerencia eventos (clique no ícone, atalhos de teclado, menu de contexto), injeta o `content script` se necessário e se comunica com o `content script`.
*   **`content.js`:** O script principal que é injetado nas páginas da web. Coordena os vários módulos utilitários e gerencia o fluxo global da extensão.
*   **`src/constants.js`:** Define constantes para configuração, estados, ações, etc.

#### Módulos Utilitários

A extensão usa uma arquitetura modular com vários arquivos utilitários especializados:

##### Gerenciamento de Provedores e API

*   **`src/utils/providers.js`:** Registro de provedores de IA (Mistral AI, OpenAI, Custom/LiteLLM) com suas configurações, modelos e URLs padrão.
*   **`src/utils/api-utils.js`:** Funções para interação com APIs externas, resolução de configuração de vários provedores e transcrição de áudio.
*   **`src/utils/text-processing.js`:** Funções de processamento de texto: tradução, reformulação, correção ortográfica.

##### Interface de Usuário e Interação

*   **`src/utils/ui.js`:** Funções utilitárias gerais para a interface do usuário.
*   **`src/utils/banner-utils.js`:** Gerencia o banner de status, seus controles e o seletor de idioma.
*   **`src/utils/focus-utils.js`:** Gerencia o salvamento e a restauração do foco e da seleção de texto.
*   **`src/utils/transcription-display.js`:** Gerencia a exibição dos resultados da transcrição.
*   **`src/utils/error-utils.js`:** Gerencia a exibição e o tratamento de erros.
*   **`src/styles/content.css`:** Estilos CSS para a interface de usuário injetada nas páginas da web.

##### Gravação e Eventos

*   **`src/utils/recording-utils.js`:** Gerencia a gravação de áudio via microfone e processamento de dados de áudio.
*   **`src/utils/event-handlers.js`:** Contém manipuladores de eventos para interações do usuário.

##### Internacionalização e Idiomas

*   **`src/utils/languages.js`:** Define os idiomas suportados pela extensão.
*   **`src/utils/languages-shared.js`:** Define a lista de idiomas suportados para o contexto da página da web.
*   **`src/utils/languages-data.js`:** Define a lista de idiomas suportados para o service worker.
*   **`src/utils/i18n.js`:** Gerencia a internacionalização para a interface do usuário.

##### Página de Opções

*   **`src/pages/options/`:** Contém arquivos para a página de opções da extensão (HTML, CSS, JavaScript).

### Processo de Transcrição e Tradução

#### Funcionalidade principal de transcrição de voz

1.  **Início da Gravação:** O usuário inicia a gravação clicando no ícone da extensão ou usando o atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac). O `background script` envia uma mensagem para o `content script` para iniciar a gravação.
2.  **Captura de Áudio:** O `content script` usa a API `navigator.mediaDevices.getUserMedia` para acessar o microfone e gravar áudio via API MediaRecorder.
3.  **Transcrição:** O `content script` usa a função `transcribeAudio` (`src/utils/api-utils.js`) para enviar áudio para a API de transcrição do provedor configurado (Voxtral para Mistral AI, Whisper para OpenAI). A API retorna o texto transcrito.
4.  **Tradução ou Reformulação (Opcional):**
   - Se a opção de tradução estiver ativada, o `content script` usa a função `translateText` (`src/utils/text-processing.js`) para enviar o texto transcrito para a API de bate-papo do provedor configurado.
   - Se a opção de reformulação estiver ativada, a função `rephraseText` é usada para melhorar o texto transcrito.
5.  **Exibição:** O `content script` exibe o texto processado no elemento ativo da página (se for um campo de texto ou elemento editável) ou em uma caixa de diálogo personalizada.

#### Funcionalidade de menu de contexto

1. **Seleção de Texto:** O usuário seleciona texto em uma página da web.
2. **Menu de Contexto:** Um clique com o botão direito exibe as opções:
   - "Reformular seleção" para melhorar o estilo e a clareza
   - "Traduzir seleção" com um submenu de idiomas disponíveis
   - "Corrigir ortografia" para corrigir erros
3. **Processamento:** Dependendo da opção escolhida:
   - O texto é enviado para reformulação através da função `rephraseText`
   - O texto é enviado para tradução através da função `translateText` com o idioma de destino selecionado
   - O texto é enviado para correção através da função `correctText`
4. **Exibição:** O resultado substitui a seleção original no elemento onde o texto selecionado está localizado.

### Comunicação

A comunicação entre o `background script` e o `content script` é feita através da API de mensagens do Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Armazenamento de Dados

A extensão usa `chrome.storage.sync` para armazenar:

*   Configuração do provedor de IA (chaves de API, modelos selecionados, URLs personalizados).
*   Opções da extensão (exibição, tradução, cores do banner, etc.).
*   Preferências de idioma para tradução.

Esses dados são armazenados localmente no seu computador, no armazenamento da extensão do Chrome.

### Tratamento de Erros
Possíveis erros (chave de API ausente, erro de transcrição, etc.) são definidos no arquivo `constants.js`. As funções `api-utils.js` e `text-processing.js` tratam possíveis erros de chamada de API com mensagens aprimoradas com base no código HTTP. O `content.js` exibe mensagens de erro ao usuário através de um banner na parte inferior da página.


## 🛡️ Segurança e Privacidade

- **Proteção de Dados:**
  - A chave de API é armazenada com segurança no Chrome.
  - A extensão não mantém seus dados de áudio; todo o processamento é feito em tempo real.
  - A comunicação com as APIs é feita através de conexões HTTPS seguras.

Para informações completas sobre como a BabelFishAI gerencia seus dados, consulte nossa [Política de Privacidade](PRIVACY.md).

## 🔧 Solução de Problemas

- **Problemas de Microfone:**
  - Verifique as permissões de acesso ao microfone no Chrome.
  - Certifique-se de que nenhum outro aplicativo esteja usando o microfone simultaneamente.

- **Erros de Transcrição/Tradução:**
  - Verifique se a chave de API é válida e ativa.
  - Certifique-se de ter uma conexão de internet estável.
  - Consulte o console do Chrome para obter logs detalhados em caso de erros.

## 🤝 Contribuição

Contribuições e sugestões são bem-vindas. Para contribuir:
- Relate bugs através da seção Issues no GitHub.
- Proponha melhorias ou novos recursos.
- Envie seus pull requests.

## 📄 Licença

Esta extensão é distribuída sob a licença GNU Affero General Public License v3.0 (AGPL-3.0). Consulte o arquivo LICENSE para mais detalhes.

## 💝 Apoio

Se você aprecia esta extensão, pode apoiar seu desenvolvimento fazendo uma doação via [PayPal](https://paypal.me/jls).
---
Desenvolvido por jls42.org com paixão e inovação, Babel Fish AI impulsiona a transcrição e a tradução para novos horizontes graças à inteligência artificial de ponta.
