**Artigo traduzido do fr para o pt com o gpt-5.6-sol.**

# Babel Fish AI - Extensão de Transcrição de Voz e Tradução com IA

<img src="images/icon128.png" alt="Ícone do Babel Fish AI" width="128" height="128">

**Site oficial: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**Para usar a extensão, você precisará de uma chave de API de um dos providers compatíveis:**

|                             Provider                             | Obter uma chave de API                                                                               |
| :--------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------- |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)                                                |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)                                           |
|                                🚅                                | **Custom/LiteLLM**: Para usar seus próprios endpoints de API                                         |

Babel Fish AI é uma extensão de navegador inovadora, concebida para oferecer uma poderosa transcrição de voz com suporte a vários providers. Transforme sua voz em texto com uma precisão notável graças às APIs de transcrição da Mistral AI (Voxtral) ou da OpenAI (Whisper) e, opcionalmente, aproveite a tradução automática em tempo real. Você pode usar o Babel Fish AI exclusivamente para transcrição ou ativar a tradução instantânea de acordo com suas necessidades.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 Funcionalidades

-   **Transcrição de Voz Avançada**

    -   Captura de áudio de alta qualidade pelo microfone do seu dispositivo.
    -   Transcrição precisa pelas APIs Voxtral (Mistral AI) ou Whisper (OpenAI).
    -   Suporte a vários providers: escolha livremente entre Mistral AI, OpenAI ou um endpoint personalizado.
    -   Suporte multilíngue para reconhecimento de voz e exibição de texto, permitindo transcrever entradas de voz em diferentes idiomas e exibir os resultados (transcrição e tradução, se ativada) no idioma de sua escolha.
    -   Inserção automática do texto no campo ativo ou exibição em uma caixa de diálogo dedicada.

-   **Tradução e Reformulação Inteligentes**

    -   Tradução imediata das transcrições para vários idiomas, que pode ser ativada quando necessário.
    -   Reformulação do texto para melhorar seu estilo e sua clareza.
    -   Uso de um modelo de IA avançado para garantir uma tradução fiel ao sentido original.
    -   Liberdade para usar exclusivamente a transcrição ou combinar transcrição e tradução.

-   **Menu de Contexto Poderoso**

    -   Opção "Reformular a seleção" para melhorar instantaneamente os textos selecionados.
    -   Opção "Traduzir a seleção" com um submenu de todos os idiomas disponíveis.
    -   Opção "Corrigir a ortografia" para corrigir erros de ortografia, gramática e pontuação.
    -   Substituição direta do texto selecionado por sua versão traduzida, reformulada ou corrigida.
    -   Integração perfeita à interface de usuário nativa do navegador.

-   **Interface de Usuário Intuitiva e Personalizável**

    -   Modo de exibição flexível: campo de entrada ativo ou janela de diálogo flutuante.
    -   Faixa de status configurável, com opções de cor, opacidade e duração de exibição.
    -   Atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac) para iniciar/parar a gravação.
    -   No Firefox, um « atalho prioritário » para sites cujo editor de página intercepta a combinação (ChatGPT, Notion…): ativo desde a instalação e desativável nas opções (consulte [PRIVACY.md](PRIVACY.md)).
    -   Opção "Manter aberto" para controlar a duração da exibição dos resultados.
    -   Ícone personalizado que integra um microfone e o número "42" para reconhecimento imediato.

-   **Opções Avançadas**
    -   Suporte a vários providers: Mistral AI, OpenAI e Custom/LiteLLM para máxima flexibilidade.
    -   Possibilidade de personalizar os modelos de transcrição e tradução por provider.
    -   Modelos OpenAI disponíveis: GPT-4o mini (padrão), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** e **GPT-5.6 (luna/terra/sol)**. Transcrição: whisper-1 (padrão), gpt-4o-mini-transcribe, gpt-4o-transcribe e **gpt-transcribe**.
    -   Modelos Mistral disponíveis: Mistral Small (padrão), Mistral Medium, Mistral Large, Codestral e **Ministral 3 (3B/8B/14B)**. Transcrição: Voxtral Mini. As respostas dos modelos Mistral que raciocinam (blocos de reflexão) são compatíveis.
    -   As configurações que usavam gpt-4.1-nano (descontinuação da API OpenAI em 23/10/2026) ou gpt-4o passam automaticamente para gpt-5.6-luna e gpt-4.1 durante a atualização.
    -   Seleção independente do provider para transcrição e tradução/reformulação.
    -   Compatibilidade com LiteLLM Proxy por meio do provider Custom para conexão com modelos alternativos.
    -   Gerenciamento completo da internacionalização por meio dos arquivos de idioma (\_locales), oferecendo uma interface e suporte de voz em vários idiomas.

## 🌐 Idiomas Compatíveis

Veja a lista de idiomas compatíveis com o Babel Fish AI, com links para vídeos de demonstração:

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
-   [Polonês](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [Português](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [Romeno](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [Sueco](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [Chinês](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 Instalação

### Chrome

1.  **Download e Instalação:**

    -   Clone este repositório do GitHub ou baixe manualmente a pasta da extensão.
    -   **Ou instale a extensão diretamente pela [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   Abra o Chrome e acesse `chrome://extensions/`.
    -   Ative o « Modo do desenvolvedor » no canto superior direito.
    -   Clique em « Carregar sem compactação » e selecione a pasta do Babel Fish AI.

2.  **Verificação:**
    -   Certifique-se de que a extensão apareça na barra de ferramentas do navegador com o ícone personalizado.

### Firefox

1.  **Download e Instalação:**

    -   **Instale a extensão diretamente pelo [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   Ou, para a instalação manual: clone este repositório do GitHub e execute `./scripts/build.sh firefox`, que prepara `dist/firefox/` com o manifest do Firefox renomeado como `manifest.json`.
    -   Abra o Firefox e acesse `about:debugging#/runtime/this-firefox` (e não « Instalar extensão de um arquivo » em `about:addons`, reservado para extensões assinadas).
    -   Clique em « Carregar extensão temporária... ».
    -   Selecione o arquivo `dist/firefox/manifest.json`.

2.  **Verificação:**
    -   Certifique-se de que a extensão apareça na barra de ferramentas do Firefox com o ícone personalizado.

## ⚙️ Configuração

1.  **Configuração do Provider de IA:**

    -   Clique no ícone da extensão para acessar as opções.
    -   Selecione seu provider no menu suspenso (Mistral AI, OpenAI ou Custom/LiteLLM).
    -   Insira sua chave de API:
        -   **Mistral AI**: disponível em [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: disponível em [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    -   Ative o provider com o botão de alternância ao lado do menu suspenso.

2.  **Personalização das Opções:**

    -   Escolha o modo de exibição (campo ativo ou caixa de diálogo).
    -   Configure a cor, a opacidade e a duração de exibição da faixa de status.
    -   Selecione os idiomas para a transcrição (entrada de voz) e para a exibição do texto.
    -   Ative ou desative a funcionalidade de tradução de acordo com suas necessidades.

3.  **(Opcional) Configuração avançada dos modelos:**
    -   Nas opções de cada provider, clique em "Configuração dos modelos" para personalizar os modelos usados.
    -   Você pode adicionar modelos personalizados para transcrição e tradução/reformulação.
    -   Se vários providers estiverem ativados, você poderá escolher qual deles usar para cada serviço (transcrição e tradução).

## 🚀 Uso com LiteLLM Proxy ou Endpoints Personalizados

O Babel Fish AI é compatível com o [LiteLLM Proxy](https://litellm.ai/) e outros proxies de API compatíveis com OpenAI, permitindo o uso de modelos de linguagem alternativos.

### Configuração

1.  **Instale e configure seu proxy:** Siga as instruções do serviço que você usa (LiteLLM etc.).
2.  **Configure a extensão Babel Fish AI:**
    -   Nas opções da extensão, selecione o provider **Custom/LiteLLM** no menu suspenso.
    -   Insira sua chave de API (se necessário).
    -   Configure as URLs das APIs:
        -   **URL de Transcrição**: por exemplo, `http://localhost:4000/v1/audio/transcriptions`
        -   **URL de Chat**: por exemplo, `http://localhost:4000/v1/chat/completions`
    -   Ative o provider com o botão de alternância.
    -   Marque a opção **"NoLog"** se desejar desativar o registro das solicitações pelo LiteLLM.

**Importante:** A opção "NoLog" está disponível **apenas** no provider Custom/LiteLLM. Ela não é compatível com as APIs oficiais da OpenAI ou da Mistral AI.

## 🛠️ Funcionamento Técnico

### Arquitetura da Extensão

A extensão é composta por vários arquivos JavaScript que interagem entre si:

#### Arquivos Principais

-   **`manifest.json`:** O principal arquivo de configuração da extensão. Ele define as permissões, os scripts, os recursos acessíveis etc. Usa a versão 3 do manifest e declara as permissões `activeTab`, `storage`, `commands`, `scripting` e `contextMenus`.
-   **`background.js`:** O service worker executado em segundo plano. Ele gerencia os eventos (clique no ícone, atalhos de teclado, menu de contexto), injeta o `content script` quando necessário e se comunica com o `content script`.
-   **`content.js`:** O script principal que é injetado nas páginas web. Ele coordena os diferentes módulos utilitários e gerencia o fluxo geral da extensão.
-   **`src/constants.js`:** Define constantes de configuração, estados, ações etc.

#### Módulos Utilitários

A extensão usa uma arquitetura modular com vários arquivos utilitários especializados:

##### Gerenciamento dos Providers e das APIs

-   **`src/utils/providers.js`:** Registro dos providers de IA (Mistral AI, OpenAI, Custom/LiteLLM) com suas configurações, modelos e URLs padrão.
-   **`src/utils/api-utils.js`:** Funções para interação com APIs externas, resolução da configuração com vários providers e transcrição de áudio.
-   **`src/utils/text-processing.js`:** Funções de processamento de texto: tradução, reformulação e correção ortográfica.

##### Interface de Usuário e Interação

-   **`src/utils/ui.js`:** Funções utilitárias gerais para a interface de usuário.
-   **`src/utils/banner-utils.js`:** Gerencia a faixa de status, seus controles e o seletor de idioma.
-   **`src/utils/focus-utils.js`:** Gerencia o salvamento e a restauração do foco e da seleção de texto.
-   **`src/utils/transcription-display.js`:** Gerencia a exibição dos resultados da transcrição.
-   **`src/utils/error-utils.js`:** Gerencia a exibição e o tratamento de erros.
-   **`src/styles/content.css`:** Estilos CSS para a interface de usuário injetada nas páginas web.

##### Gravação e Eventos

-   **`src/utils/recording-utils.js`:** Gerencia a gravação de áudio pelo microfone e o processamento dos dados de áudio.
-   **`src/utils/event-handlers.js`:** Contém os manipuladores de eventos para as interações do usuário.

##### Internacionalização e Idiomas

-   **`src/utils/languages.js`:** Define os idiomas compatíveis com a extensão.
-   **`src/utils/languages-shared.js`:** Define a lista de idiomas compatíveis para o contexto da página web.
-   **`src/utils/languages-data.js`:** Define a lista de idiomas compatíveis para o service worker.
-   **`src/utils/i18n.js`:** Gerencia a internacionalização da interface de usuário.

##### Página de Opções

-   **`src/pages/options/`:** Contém os arquivos da página de opções da extensão (HTML, CSS, JavaScript).

### Processo de Transcrição e Tradução

#### Funcionalidade principal de transcrição de voz

1.  **Início da Gravação:** O usuário inicia a gravação clicando no ícone da extensão ou usando o atalho de teclado (Ctrl+Shift+1 ou ⌘+Shift+1 no Mac). O `background script` envia uma mensagem ao `content script` para iniciar a gravação.
2.  **Captura de Áudio:** O `content script` usa a API `navigator.mediaDevices.getUserMedia` para acessar o microfone e gravar o áudio por meio da API MediaRecorder.
3.  **Transcrição:** O `content script` usa a função `transcribeAudio` (`src/utils/api-utils.js`) para enviar o áudio à API de transcrição do provider configurado (Voxtral para Mistral AI, Whisper para OpenAI). A API retorna o texto transcrito.
4.  **Tradução ou Reformulação (Opcional):**

-   Se a opção de tradução estiver ativada, o `content script` usa a função `translateText` (`src/utils/text-processing.js`) para enviar o texto transcrito à API de chat do provider configurado.
-   Se a opção de reformulação estiver ativada, a função `rephraseText` será usada para melhorar o texto transcrito.

5.  **Exibição:** O `content script` exibe o texto processado no elemento ativo da página (se for um campo de texto ou elemento editável) ou em uma caixa de diálogo personalizada.

#### Funcionalidade do menu de contexto

1. **Seleção de Texto:** O usuário seleciona um texto em uma página web.
2. **Menu de Contexto:** Um clique com o botão direito exibe as opções:
    - "Reformular a seleção" para melhorar o estilo e a clareza
    - "Traduzir a seleção" com um submenu dos idiomas disponíveis
    - "Corrigir a ortografia" para corrigir os erros
3. **Processamento:** De acordo com a opção escolhida:
    - O texto é enviado para reformulação por meio da função `rephraseText`
    - O texto é enviado para tradução por meio da função `translateText` com o idioma de destino selecionado
    - O texto é enviado para correção por meio da função `correctText`
4. **Exibição:** O resultado substitui a seleção original no elemento em que o texto selecionado se encontra.

### Comunicação

A comunicação entre o `background script` e o `content script` é feita por meio da API de mensagens do Chrome (`chrome.runtime.sendMessage` e `chrome.runtime.onMessage`).

### Armazenamento de Dados

A extensão usa `chrome.storage.sync` para armazenar:

-   A configuração dos providers de IA (chaves de API, modelos selecionados e URLs personalizadas).
-   As opções da extensão (exibição, tradução, cores da faixa etc.).
-   As preferências de idioma para tradução.

Esses dados são armazenados localmente no seu computador, no armazenamento da extensão do navegador.
### Gerenciamento de Erros

Os possíveis erros (chave de API ausente, erro de transcrição etc.) são definidos no arquivo `constants.js`. As funções `api-utils.js` e `text-processing.js` gerenciam os possíveis erros das chamadas de API com mensagens aprimoradas de acordo com o código HTTP. O `content.js` exibe as mensagens de erro ao usuário por meio de um banner na parte inferior da página.

## 🛡️ Segurança e Privacidade

-   **Proteção de Dados:**
    -   A chave de API é armazenada de forma segura no navegador.
    -   A extensão não armazena seus dados de áudio; todo o processamento é realizado em tempo real.
    -   A comunicação com as APIs é feita por meio de conexões HTTPS seguras.

Para obter informações completas sobre como o BabelFishAI gerencia seus dados, consulte nossa [Política de Privacidade](PRIVACY.md).

## 🔧 Solução de Problemas

-   **Problemas com o Microfone:**

    -   Verifique as permissões de acesso ao microfone no seu navegador.
    -   Certifique-se de que nenhum outro aplicativo esteja usando o microfone simultaneamente.

-   **Erros de Transcrição/Tradução:**
    -   Verifique se a chave de API é válida e está ativa.
    -   Certifique-se de que sua conexão com a internet esteja estável.
    -   Consulte o console do navegador para obter logs detalhados em caso de erro.

## 🤝 Contribuição

Contribuições e sugestões são bem-vindas. Para contribuir:

-   Relate bugs por meio da seção Issues no GitHub.
-   Proponha melhorias ou novos recursos.
-   Envie seus pull requests.

## 📄 Licença

Esta extensão é distribuída sob a licença GNU Affero General Public License v3.0 (AGPL-3.0). Consulte o arquivo LICENSE para obter mais detalhes.

## 💝 Apoio

## Se você gosta desta extensão, pode apoiar seu desenvolvimento fazendo uma doação via [PayPal](https://paypal.me/jls).

Desenvolvido por jls42.org com paixão e inovação, o Babel Fish AI leva a transcrição e a tradução a novos horizontes graças à inteligência artificial de ponta.
