**Artigo traduzido do francês para o português com o gpt-5.6-sol.**

# Babel Fish AI - Extensão de Transcrição por Voz e Tradução com IA

<img src="images/icon128.png" alt="Ícone do Babel Fish AI" width="128" height="128">

**Site oficial: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Para utilizar a extensão, precisará de uma chave API de um dos providers suportados:**

|                             Provider                             | Obter uma chave API                                                                               |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
|   <img src="images/gemini-logo.png" alt="Gemini" height="30">    | **Gemini (Google)**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)            |
|                                🚅                                | **Custom/LiteLLM**: Para utilizar os seus próprios endpoints API                                      |

O Babel Fish AI é uma extensão de navegador inovadora, concebida para oferecer uma poderosa transcrição por voz com suporte multi-provider. Transforme a sua voz em texto com uma precisão extraordinária graças às APIs de transcrição da Mistral AI (Voxtral), OpenAI (gpt-transcribe, Whisper) ou Gemini (Gemini 3.5 Transcribe) e beneficie, opcionalmente, de tradução automática em tempo real. Pode utilizar o Babel Fish AI exclusivamente para transcrição ou ativar a tradução instantânea conforme as suas necessidades.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Emblema Codacy](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Estado do Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Classificação de segurança](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Classificação de manutenibilidade](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilidades](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Dívida técnica](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Linhas de código](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funcionalidades

-   **Transcrição por Voz Avançada**

    -   Captura de áudio de alta qualidade através do microfone do seu dispositivo.
    -   Transcrição precisa através das APIs Voxtral (Mistral AI), gpt-transcribe e Whisper (OpenAI) ou Gemini 3.5 Transcribe (Google).
    -   Suporte multi-provider: escolha livremente entre Mistral AI, OpenAI, Gemini ou um endpoint personalizado.
    -   Suporte multilingue para reconhecimento de voz e apresentação de texto, permitindo transcrever entradas de voz em diferentes idiomas e apresentar os resultados (transcrição e tradução, se ativada) no idioma da sua preferência.
    -   Inserção automática do texto no campo ativo ou apresentação numa caixa de diálogo dedicada.

-   **Tradução e Reformulação Inteligentes**

    -   Tradução imediata das transcrições para vários idiomas, a ativar se necessário.
    -   Reformulação do texto para melhorar o seu estilo e clareza.
    -   Utilização de um modelo de IA avançado para garantir uma tradução fiel ao sentido original.
    -   Liberdade para utilizar exclusivamente a transcrição ou combinar transcrição e tradução.

-   **Menu de Contexto Poderoso**

    -   Opção "Reformular a seleção" para melhorar instantaneamente os textos selecionados.
    -   Opção "Traduzir a seleção" com um submenu de todos os idiomas disponíveis.
    -   Opção "Corrigir a ortografia" para corrigir erros ortográficos, gramaticais e de pontuação.
    -   Substituição direta do texto selecionado pela sua versão traduzida, reformulada ou corrigida.
    -   Integração perfeita com a interface de utilizador nativa do navegador.

-   **Interface de Utilizador Intuitiva e Personalizável**

    -   Modo de apresentação flexível: campo de introdução ativo ou janela de diálogo flutuante.
    -   Faixa de estado configurável, com escolha de cores, opacidade e duração de apresentação.
    -   Atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac) para iniciar/parar a gravação.
    -   No Firefox, «atalho prioritário» para sites cujo editor de página interceta a combinação (ChatGPT, Notion…): ativo desde a instalação e desativável nas opções (consulte [PRIVACY.md](PRIVACY.md)).
    -   Opção "Manter aberto" para controlar a duração de apresentação dos resultados.
    -   Ícone personalizado, que integra um microfone e o número "42", para reconhecimento imediato.

-   **Opções Avançadas**
    -   Suporte multi-provider: Mistral AI, OpenAI, Gemini e Custom/LiteLLM para máxima flexibilidade.
    -   Possibilidade de personalizar os modelos de transcrição e tradução por provider.
    -   Modelos OpenAI disponíveis: GPT-4o mini (predefinido), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** e **GPT-5.6 (luna/terra/sol)**. Transcrição: **gpt-transcribe** (predefinido), whisper-1, gpt-4o-mini-transcribe e gpt-4o-transcribe. A OpenAI irá remover estes três últimos da sua API em 26/02/2027; um modelo já selecionado nas opções continuará a ser utilizado até essa data.
    -   Modelos Mistral disponíveis: Mistral Small (predefinido), Mistral Medium, Mistral Large, Codestral e **Ministral 3 (3B/8B/14B)**. Transcrição: Voxtral Mini. As respostas dos modelos Mistral que raciocinam (blocos de reflexão) são suportadas.
    -   Modelos Gemini disponíveis: **Gemini 3.8 Flash** (predefinido, com raciocínio reduzido para responder em um a dois segundos) e **Gemini 3.5 Flash-Lite** (o mais rápido). Transcrição: **Gemini 3.5 Transcribe**, através da API Interactions da Google, sem guardar os ditados no histórico desta API (`store: false`, consulte [docs/providers/gemini.md](docs/providers/gemini.md)).
    -   As configurações que utilizavam gpt-4.1-nano (descontinuação da API OpenAI em 23/10/2026) ou gpt-4o passam automaticamente para gpt-5.6-luna e gpt-4.1 durante a atualização.
    -   Seleção independente do provider para transcrição e tradução/reformulação.
    -   Compatibilidade com LiteLLM Proxy através do provider Custom para estabelecer ligação a modelos alternativos.
    -   Gestão completa da internacionalização graças aos ficheiros de idioma (\_locales), oferecendo uma interface e suporte de voz em vários idiomas.

## 🌐 Idiomas Suportados

Esta é a lista de idiomas suportados pelo Babel Fish AI, com ligações para vídeos de demonstração:

-   [Árabe](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [Alemão](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [Inglês](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [Espanhol](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [Francês](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [Hindi](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [Italiano](https://www.youtube.com/watch?v=QgYZt8myods)
-   [Japonês](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [Coreano](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [Neerlandês](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [Polaco](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [Português](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [Romeno](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [Sueco](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [Chinês](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Instalação

### Chrome

1.  **Transferência e Instalação:**

    -   Clone este repositório a partir do GitHub ou transfira manualmente a pasta da extensão.
    -   **Ou instale diretamente a extensão a partir da [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Abra o Chrome e aceda a `chrome://extensions/`.
    -   Ative o «Modo de programador» no canto superior direito.
    -   Clique em «Carregar extensão não compactada» e selecione a pasta do Babel Fish AI.

2.  **Verificação:**
    -   Certifique-se de que a extensão aparece na barra de ferramentas do navegador com o ícone personalizado.

### Firefox

1.  **Transferência e Instalação:**

    -   É necessário o **Firefox 140 ou posterior** (computador) desde a versão 1.2.0. Durante a instalação e a atualização para a versão 1.2.0, o Firefox apresenta os dados que a extensão transmite ao provider configurado: a sua voz, o texto selecionado ou ditado e a sua chave API (consulte [PRIVACY.md](PRIVACY.md)).
    -   **Instale diretamente a extensão a partir dos [Extras do Firefox](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   Ou, para a instalação manual: clone este repositório a partir do GitHub e, em seguida, execute `./scripts/build.sh firefox`, que prepara `dist/firefox/` com o manifest do Firefox renomeado como `manifest.json`.
    -   Abra o Firefox e aceda a `about:debugging#/runtime/this-firefox` (e não a «Instalar suplemento a partir de um ficheiro» em `about:addons`, reservada às extensões assinadas).
    -   Clique em «Carregar suplemento temporário...».
    -   Selecione o ficheiro `dist/firefox/manifest.json`.

2.  **Verificação:**
    -   Certifique-se de que a extensão aparece na barra de ferramentas do Firefox com o ícone personalizado.

## ⚙️ Configuração

1.  **Configuração do Provider de IA:**

    -   Clique no ícone da extensão para aceder às opções.
    -   Selecione o seu provider no menu pendente (Mistral AI, OpenAI, Gemini ou Custom/LiteLLM).
    -   Introduza a sua chave API:
        -   **Mistral AI**: disponível em [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: disponível em [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
        -   **Gemini**: disponível em [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Prefira uma chave de um projeto com faturação: com uma chave gratuita, se estiver fora do Espaço Económico Europeu, da Suíça e do Reino Unido, a Google poderá utilizar os seus ditados e os textos enviados para melhorar os seus produtos, com possível revisão humana; não envie quaisquer informações pessoais, sensíveis ou confidenciais. Restrinja a chave à API Gemini (configuração predefinida das novas chaves), nunca a sites Web: no Chrome, os pedidos partem da página onde está a ditar.
    -   Ative o provider com o botão de alternância ao lado do menu pendente.

2.  **Personalização das Opções:**

    -   Escolha o modo de apresentação (campo ativo ou caixa de diálogo).
    -   Configure a cor, a opacidade e a duração de apresentação da faixa de estado.
    -   Selecione os idiomas para a transcrição (entrada de voz) e para a apresentação do texto.
    -   Ative ou desative a funcionalidade de tradução conforme as suas necessidades.

3.  **(Opcional) Configuração avançada dos modelos:**

    -   Nas opções de cada provider, clique em "Configuração dos modelos" para personalizar os modelos utilizados.
    -   Pode adicionar modelos personalizados para transcrição e tradução/reformulação.
    -   Se estiverem ativos vários providers, pode escolher qual utilizar para cada serviço (transcrição e tradução).

4.  **Vários dispositivos sincronizados:**
    -   Atualize a extensão em todos os seus dispositivos. Uma versão anterior à 1.2.0 não reconhece o Gemini: se o Gemini estiver selecionado, essa versão utiliza um provider antigo que tenha ativado ou não envia nada.
    -   Se uma versão mais recente da extensão tiver guardado um provider que a sua versão ainda não reconhece, a página de opções assinala-o na secção «Providers de uma versão mais recente», com um botão para apagar as respetivas configurações de todos os seus dispositivos.
    -   Se o navegador recusar guardar as suas opções (por exemplo, devido a um valor demasiado longo), a página apresenta o erro em vez de «Opções guardadas!» e não guarda nada.

## 🚀 Utilização com LiteLLM Proxy ou Endpoints Personalizados

O Babel Fish AI é compatível com o [LiteLLM Proxy](https://litellm.ai/) e outros proxies API compatíveis com a OpenAI, permitindo utilizar modelos de linguagem alternativos.

### Configuração

1.  **Instale e configure o seu proxy:** Siga as instruções do serviço que utiliza (LiteLLM, etc.).
2.  **Configure a extensão Babel Fish AI:**
    -   Nas opções da extensão, selecione o provider **Custom/LiteLLM** no menu pendente.
    -   Introduza a sua chave API (se necessário).
    -   Configure os URLs das APIs:
        -   **URL de Transcrição**: por exemplo, `http://localhost:4000/v1/audio/transcriptions`
        -   **URL de Chat**: por exemplo, `http://localhost:4000/v1/chat/completions`
    -   Ative o provider com o botão de alternância.
    -   Marque a opção **"NoLog"** se pretender desativar o registo dos pedidos pelo LiteLLM.

**Importante:** A opção "NoLog" está disponível **apenas** no provider Custom/LiteLLM. Não é compatível com as APIs oficiais da OpenAI, Mistral AI ou Gemini.

## 🛠️ Funcionamento Técnico

### Arquitetura da Extensão

A extensão é composta por vários ficheiros JavaScript que interagem entre si:

#### Ficheiros Principais

-   **`manifest.json`:** O ficheiro de configuração principal da extensão. Define as permissões, os scripts, os recursos acessíveis, etc. Utiliza a versão 3 do manifest e declara as permissões `activeTab`, `storage`, `commands`, `scripting` e `contextMenus`.
-   **`background.js`:** O service worker executado em segundo plano. Gere os eventos (clique no ícone, atalhos de teclado, menu de contexto), injeta o `content script` se necessário e comunica com o `content script`.
-   **`content.js`:** O script principal que é injetado nas páginas Web. Coordena os diferentes módulos utilitários e gere o fluxo global da extensão.
-   **`src/constants.js`:** Define constantes para a configuração, os estados, as ações, etc.

#### Módulos Utilitários

A extensão utiliza uma arquitetura modular com vários ficheiros utilitários especializados:

##### Gestão dos Providers e das APIs

-   **`src/utils/providers.js`:** Registo dos providers de IA (Mistral AI, OpenAI, Gemini, Custom/LiteLLM) com as respetivas configurações, modelos e URLs predefinidos.
-   **`src/utils/provider-store.js`:** Leitura das configurações dos providers no armazenamento e verificação de que uma chave API é enviada apenas para os endereços do respetivo provider.
-   **`src/utils/provider-adapters.js`:** Formatos das APIs dos providers: autenticação, corpo dos pedidos, leitura das respostas e dos erros.
-   **`src/utils/api-utils.js`:** Funções para interação com APIs externas, resolução da configuração multi-provider e transcrição de áudio.
-   **`src/utils/text-processing.js`:** Funções de processamento de texto: tradução, reformulação e correção ortográfica.

##### Interface de Utilizador e Interação

-   **`src/utils/ui.js`:** Funções utilitárias gerais para a interface de utilizador.
-   **`src/utils/banner-utils.js`:** Gere a faixa de estado, os respetivos controlos e o seletor de idioma.
-   **`src/utils/focus-utils.js`:** Gere a cópia de segurança e o restauro do foco e da seleção de texto.
-   **`src/utils/transcription-display.js`:** Gere a apresentação dos resultados da transcrição.
-   **`src/utils/error-utils.js`:** Gere a apresentação e o tratamento de erros.
-   **`src/styles/content.css`:** Estilos CSS para a interface de utilizador injetada nas páginas Web.

##### Gravação e Eventos

-   **`src/utils/recording-utils.js`:** Gere a gravação de áudio através do microfone e o processamento dos dados de áudio.
-   **`src/utils/event-handlers.js`:** Contém os gestores de eventos para as interações do utilizador.

##### Internacionalização e Idiomas

-   **`src/utils/languages.js`:** Define os idiomas suportados pela extensão.
-   **`src/utils/languages-shared.js`:** Define a lista de idiomas suportados para o contexto da página Web.
-   **`src/utils/languages-data.js`:** Define a lista de idiomas suportados para o service worker.
-   **`src/utils/i18n.js`:** Gere a internacionalização da interface de utilizador.

##### Página de Opções

-   **`src/pages/options/`:** Contém os ficheiros da página de opções da extensão (HTML, CSS, JavaScript).
### Processo de Transcrição e Tradução

#### Funcionalidade principal de transcrição de voz

1.  **Início da Gravação:** O usuário inicia a gravação clicando no ícone da extensão ou usando o atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac). O `background script` envia uma mensagem ao `content script` para iniciar a gravação.
2.  **Captura de Áudio:** O `content script` usa a API `navigator.mediaDevices.getUserMedia` para acessar o microfone e gravar o áudio por meio da API MediaRecorder.
3.  **Transcrição:** O `content script` usa a função `transcribeAudio` (`src/utils/api-utils.js`) para enviar o áudio à API de transcrição do provider configurado (Voxtral para Mistral AI, gpt-transcribe ou Whisper para OpenAI, Gemini 3.5 Transcribe para Gemini). A API retorna o texto transcrito.
4.  **Tradução ou Reformulação (Opcional):**

-   Se a opção de tradução estiver ativada, o `content script` usa a função `translateText` (`src/utils/text-processing.js`) para enviar o texto transcrito à API de chat do provider configurado.
-   Se a opção de reformulação estiver ativada, a função `rephraseText` é usada para aprimorar o texto transcrito.

5.  **Exibição:** O `content script` exibe o texto processado no elemento ativo da página (se for um campo de texto ou um elemento editável) ou em uma caixa de diálogo personalizada.

#### Funcionalidade do menu de contexto

1. **Seleção de Texto:** O usuário seleciona um texto em uma página web.
2. **Menu de Contexto:** Um clique com o botão direito exibe as opções:
    - "Reformular a seleção" para melhorar o estilo e a clareza
    - "Traduzir a seleção" com um submenu dos idiomas disponíveis
    - "Corrigir a ortografia" para corrigir os erros
3. **Processamento:** Conforme a opção escolhida:
    - O texto é enviado para reformulação por meio da função `rephraseText`
    - O texto é enviado para tradução por meio da função `translateText` com o idioma de destino selecionado
    - O texto é enviado para correção por meio da função `correctText`
4. **Exibição:** O resultado substitui a seleção original no elemento em que se encontra o texto selecionado.

### Comunicação

A comunicação entre o `background script` e o `content script` ocorre por meio da API de mensagens do Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Armazenamento de Dados

A extensão usa `chrome.storage.sync` para armazenar:

-   A configuração dos providers de IA (chaves de API, modelos selecionados, URLs personalizadas). O Gemini, adicionado na versão 1.2.0, tem sua própria chave de armazenamento (`extraProvider.gemini`), que as versões anteriores ignoram.
-   As opções da extensão (exibição, tradução, cores do banner etc.).
-   As preferências de idioma para a tradução.

Esses dados são armazenados localmente no seu computador, no armazenamento da extensão do navegador.

### Gerenciamento de Erros

Os possíveis erros (chave de API ausente, erro de transcrição etc.) são definidos no arquivo `constants.js`. As funções `api-utils.js` e `text-processing.js` tratam os possíveis erros das chamadas à API com mensagens aprimoradas de acordo com o código HTTP. O `content.js` exibe as mensagens de erro ao usuário por meio de um banner na parte inferior da página.

## 🛡️ Segurança e Privacidade

-   **Proteção de Dados:**
    -   A chave de API é armazenada de forma segura no navegador.
    -   A extensão não armazena seus dados de áudio; todo o processamento ocorre em tempo real.
    -   A comunicação com as APIs ocorre por meio de conexões HTTPS seguras.

Para obter informações completas sobre como o BabelFishAI gerencia seus dados, consulte nossa [Política de Privacidade](PRIVACY.md).

## 🔧 Solução de Problemas

-   **Problemas com o Microfone:**

    -   Verifique as permissões de acesso ao microfone no seu navegador.
    -   Certifique-se de que nenhum outro aplicativo esteja usando o microfone simultaneamente.

-   **Erros de Transcrição/Tradução:**
    -   Verifique se a chave de API é válida e está ativa.
    -   Certifique-se de ter uma conexão estável com a internet.
    -   Consulte o console do navegador para obter logs detalhados em caso de erro.

## 🤝 Contribuição

Contribuições e sugestões são bem-vindas. Para contribuir:

-   Relate bugs por meio da seção Issues no GitHub.
-   Proponha melhorias ou novas funcionalidades.
-   Envie seus pull requests.

## 📄 Licença

Esta extensão é distribuída sob a licença GNU Affero General Public License v3.0 (AGPL-3.0). Consulte o arquivo LICENSE para obter mais detalhes.

## 💝 Apoio

## Se você gosta desta extensão, pode apoiar seu desenvolvimento fazendo uma doação por meio do [PayPal](https://paypal.me/jls).

Desenvolvido pela jls42.org com paixão e inovação, o Babel Fish AI leva a transcrição e a tradução a novos horizontes graças à inteligência artificial de ponta.
