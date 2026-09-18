**लेख का अनुवाद gpt-5.6-sol की मदद से फ़्रेंच से हिंदी में किया गया।**

# Babel Fish AI - AI-संचालित ध्वनि प्रतिलेखन और अनुवाद एक्सटेंशन

<img src="images/icon128.png" alt="Babel Fish AI आइकन" width="128" height="128">

**आधिकारिक वेबसाइट: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**एक्सटेंशन का उपयोग करने के लिए आपको समर्थित providers में से किसी एक की API कुंजी की आवश्यकता होगी:**

|                             Provider                             | API कुंजी प्राप्त करें                                                                               |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
|                                🚅                                | **Custom/LiteLLM**: अपने स्वयं के API endpoints का उपयोग करने के लिए                                      |

Babel Fish AI एक अभिनव ब्राउज़र एक्सटेंशन है, जिसे multi-provider समर्थन के साथ शक्तिशाली ध्वनि प्रतिलेखन प्रदान करने के लिए बनाया गया है। Mistral AI (Voxtral) या OpenAI (Whisper) की प्रतिलेखन API की सहायता से अपनी आवाज़ को उल्लेखनीय सटीकता के साथ टेक्स्ट में बदलें और वैकल्पिक रूप से वास्तविक समय में स्वचालित अनुवाद का लाभ उठाएँ। आप Babel Fish AI का उपयोग केवल प्रतिलेखन के लिए कर सकते हैं या अपनी आवश्यकताओं के अनुसार तत्काल अनुवाद सक्रिय कर सकते हैं।

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy बैज](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![गुणवत्ता गेट की स्थिति](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![सुरक्षा रेटिंग](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![रखरखाव-योग्यता रेटिंग](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![कमज़ोरियाँ](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![कोड की दुर्गंध](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![तकनीकी ऋण](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![कोड की पंक्तियाँ](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 विशेषताएँ

-   **उन्नत ध्वनि प्रतिलेखन**

    -   आपके उपकरण के माइक्रोफ़ोन के माध्यम से उच्च-गुणवत्ता वाली ऑडियो रिकॉर्डिंग।
    -   Voxtral (Mistral AI) या Whisper (OpenAI) API के माध्यम से सटीक प्रतिलेखन।
    -   Multi-provider समर्थन: Mistral AI, OpenAI या किसी अनुकूलित endpoint में से स्वतंत्र रूप से चुनें।
    -   ध्वनि पहचान और टेक्स्ट प्रदर्शन के लिए बहुभाषी समर्थन, जिससे विभिन्न भाषाओं में ध्वनि इनपुट का प्रतिलेखन किया जा सकता है और परिणामों (प्रतिलेखन तथा सक्रिय होने पर अनुवाद) को आपकी पसंद की भाषा में प्रदर्शित किया जा सकता है।
    -   सक्रिय फ़ील्ड में टेक्स्ट का स्वचालित समावेशन या समर्पित संवाद बॉक्स में प्रदर्शन।

-   **बुद्धिमत्तापूर्ण अनुवाद और पुनर्लेखन**

    -   आवश्यकता होने पर सक्रिय किए जा सकने वाले विभिन्न भाषाओं में प्रतिलेखों का तत्काल अनुवाद।
    -   शैली और स्पष्टता सुधारने के लिए टेक्स्ट का पुनर्लेखन।
    -   मूल अर्थ के अनुरूप सटीक अनुवाद सुनिश्चित करने के लिए उन्नत AI मॉडल का उपयोग।
    -   केवल प्रतिलेखन का उपयोग करने या प्रतिलेखन और अनुवाद को संयोजित करने की स्वतंत्रता।

-   **शक्तिशाली संदर्भ मेनू**

    -   चयनित टेक्स्ट को तुरंत बेहतर बनाने के लिए "चयन को पुनर्लिखें" विकल्प।
    -   सभी उपलब्ध भाषाओं के उप-मेनू वाला "चयन का अनुवाद करें" विकल्प।
    -   वर्तनी, व्याकरण और विराम-चिह्न की त्रुटियाँ ठीक करने के लिए "वर्तनी सुधारें" विकल्प।
    -   चयनित टेक्स्ट को उसके अनूदित, पुनर्लिखित या संशोधित संस्करण से सीधे बदलना।
    -   ब्राउज़र के मूल उपयोगकर्ता इंटरफ़ेस में सहज एकीकरण।

-   **सहज और अनुकूलन योग्य उपयोगकर्ता इंटरफ़ेस**

    -   लचीला प्रदर्शन मोड: सक्रिय इनपुट क्षेत्र या तैरती हुई संवाद विंडो।
    -   रंग, अपारदर्शिता और प्रदर्शन अवधि के विकल्पों वाली विन्यास योग्य स्थिति पट्टी।
    -   रिकॉर्डिंग शुरू/बंद करने के लिए कीबोर्ड शॉर्टकट (Ctrl+Shift+1 या Mac पर ⌘+Shift+1)।
    -   Firefox में उन साइटों के लिए "प्राथमिकता शॉर्टकट", जिनका पृष्ठ संपादक इस कुंजी संयोजन को रोक लेता है (ChatGPT, Notion…): स्थापना के तुरंत बाद सक्रिय और विकल्पों से निष्क्रिय किया जा सकता है ([PRIVACY.md](PRIVACY.md) देखें)।
    -   परिणामों के प्रदर्शन की अवधि नियंत्रित करने के लिए "खुला रखें" विकल्प।
    -   तुरंत पहचान के लिए माइक्रोफ़ोन और अंक "42" वाला अनुकूलित आइकन।

-   **उन्नत विकल्प**
    -   अधिकतम लचीलेपन के लिए multi-provider समर्थन: Mistral AI, OpenAI और Custom/LiteLLM।
    -   प्रत्येक provider के लिए प्रतिलेखन और अनुवाद मॉडल अनुकूलित करने की सुविधा।
    -   उपलब्ध OpenAI मॉडल: GPT-4o mini (डिफ़ॉल्ट), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** और **GPT-5.6 (luna/terra/sol)**। प्रतिलेखन: whisper-1 (डिफ़ॉल्ट), gpt-4o-mini-transcribe, gpt-4o-transcribe और **gpt-transcribe**।
    -   उपलब्ध Mistral मॉडल: Mistral Small (डिफ़ॉल्ट), Mistral Medium, Mistral Large, Codestral और **Ministral 3 (3B/8B/14B)**। प्रतिलेखन: Voxtral Mini। तर्क करने वाले Mistral मॉडल की प्रतिक्रियाएँ (विचार खंड) समर्थित हैं।
    -   gpt-4.1-nano (OpenAI API का 23/10/2026 को बंद होना) या gpt-4o का उपयोग करने वाली सेटिंग्स अपडेट के दौरान स्वचालित रूप से क्रमशः gpt-5.6-luna और gpt-4.1 पर स्थानांतरित हो जाती हैं।
    -   प्रतिलेखन और अनुवाद/पुनर्लेखन के लिए provider का स्वतंत्र चयन।
    -   वैकल्पिक मॉडलों से जुड़ने के लिए Custom provider के माध्यम से LiteLLM Proxy के साथ संगतता।
    -   भाषा फ़ाइलों (\_locales) की सहायता से अंतरराष्ट्रीयकरण का पूर्ण प्रबंधन, जो कई भाषाओं में इंटरफ़ेस और ध्वनि समर्थन प्रदान करता है।

## 🌐 समर्थित भाषाएँ

यहाँ Babel Fish AI द्वारा समर्थित भाषाओं की सूची, प्रदर्शन वीडियो के लिंक सहित, दी गई है:

-   [अरबी](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [जर्मन](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [अंग्रेज़ी](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [स्पेनी](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [फ़्रांसीसी](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [हिन्दी](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [इतालवी](https://www.youtube.com/watch?v=QgYZt8myods)
-   [जापानी](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [कोरियाई](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [डच](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [पोलिश](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [पुर्तगाली](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [रोमानियाई](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [स्वीडिश](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [चीनी](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 स्थापना

### Chrome

1.  **डाउनलोड और स्थापना:**

    -   GitHub से इस repository को clone करें या एक्सटेंशन फ़ोल्डर को मैन्युअल रूप से डाउनलोड करें।
    -   **या एक्सटेंशन को सीधे [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk) से स्थापित करें**
    -   Chrome खोलें और `chrome://extensions/` पर जाएँ।
    -   ऊपर दाईं ओर "डेवलपर मोड" सक्रिय करें।
    -   "अनपैक किया गया एक्सटेंशन लोड करें" पर क्लिक करें और Babel Fish AI फ़ोल्डर चुनें।

2.  **सत्यापन:**
    -   सुनिश्चित करें कि एक्सटेंशन अनुकूलित आइकन के साथ ब्राउज़र टूलबार में दिखाई दे रहा है।

### Firefox

1.  **डाउनलोड और स्थापना:**

    -   **एक्सटेंशन को सीधे [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/) से स्थापित करें**
    -   या मैन्युअल स्थापना के लिए: GitHub से इस repository को clone करें, फिर `./scripts/build.sh firefox` चलाएँ, जो Firefox manifest का नाम बदलकर `manifest.json` रखते हुए `dist/firefox/` तैयार करता है।
    -   Firefox खोलें और `about:debugging#/runtime/this-firefox` पर जाएँ (`about:addons` में "फ़ाइल से ऐड-ऑन स्थापित करें" पर नहीं, क्योंकि वह हस्ताक्षरित एक्सटेंशन के लिए आरक्षित है)।
    -   "अस्थायी ऐड-ऑन लोड करें..." पर क्लिक करें।
    -   `dist/firefox/manifest.json` फ़ाइल चुनें।

2.  **सत्यापन:**
    -   सुनिश्चित करें कि एक्सटेंशन अनुकूलित आइकन के साथ Firefox टूलबार में दिखाई दे रहा है।

## ⚙️ विन्यास

1.  **AI Provider का विन्यास:**

    -   विकल्पों तक पहुँचने के लिए एक्सटेंशन आइकन पर क्लिक करें।
    -   ड्रॉप-डाउन मेनू में अपना provider चुनें (Mistral AI, OpenAI या Custom/LiteLLM)।
    -   अपनी API कुंजी दर्ज करें:
        -   **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) पर उपलब्ध
        -   **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) पर उपलब्ध
    -   ड्रॉप-डाउन मेनू के पास स्थित toggle से provider सक्रिय करें।

2.  **विकल्पों का अनुकूलन:**

    -   प्रदर्शन मोड चुनें (सक्रिय क्षेत्र या संवाद बॉक्स)।
    -   स्थिति पट्टी का रंग, अपारदर्शिता और प्रदर्शन अवधि विन्यस्त करें।
    -   प्रतिलेखन (ध्वनि इनपुट) और टेक्स्ट प्रदर्शन के लिए भाषाएँ चुनें।
    -   अपनी आवश्यकताओं के अनुसार अनुवाद सुविधा को सक्रिय या निष्क्रिय करें।

3.  **(वैकल्पिक) मॉडलों का उन्नत विन्यास:**
    -   प्रत्येक provider के विकल्पों में उपयोग किए जाने वाले मॉडल अनुकूलित करने के लिए "मॉडल विन्यास" पर क्लिक करें।
    -   आप प्रतिलेखन और अनुवाद/पुनर्लेखन के लिए अनुकूलित मॉडल जोड़ सकते हैं।
    -   यदि कई providers सक्रिय हैं, तो आप प्रत्येक सेवा (प्रतिलेखन और अनुवाद) के लिए उपयोग किया जाने वाला provider चुन सकते हैं।

## 🚀 LiteLLM Proxy या अनुकूलित Endpoints के साथ उपयोग

Babel Fish AI [LiteLLM Proxy](https://litellm.ai/) और अन्य OpenAI-संगत API proxies के साथ संगत है, जिससे वैकल्पिक भाषा मॉडलों का उपयोग किया जा सकता है।

### विन्यास

1.  **अपना proxy स्थापित और विन्यस्त करें:** आपके द्वारा उपयोग की जा रही सेवा (LiteLLM आदि) के निर्देशों का पालन करें।
2.  **Babel Fish AI एक्सटेंशन विन्यस्त करें:**
    -   एक्सटेंशन के विकल्पों में ड्रॉप-डाउन मेनू से **Custom/LiteLLM** provider चुनें।
    -   अपनी API कुंजी दर्ज करें (यदि आवश्यक हो)।
    -   API URLs विन्यस्त करें:
        -   **प्रतिलेखन URL**: उदाहरण के लिए `http://localhost:4000/v1/audio/transcriptions`
        -   **Chat URL**: उदाहरण के लिए `http://localhost:4000/v1/chat/completions`
    -   toggle से provider सक्रिय करें।
    -   यदि आप LiteLLM द्वारा अनुरोधों की logging निष्क्रिय करना चाहते हैं, तो **"NoLog"** विकल्प चुनें।

**महत्वपूर्ण:** "NoLog" विकल्प **केवल** Custom/LiteLLM provider में उपलब्ध है। यह OpenAI या Mistral AI की आधिकारिक API के साथ संगत नहीं है।

## 🛠️ तकनीकी कार्यप्रणाली

### एक्सटेंशन की संरचना

एक्सटेंशन कई परस्पर संवाद करने वाली JavaScript फ़ाइलों से बना है:

#### मुख्य फ़ाइलें

-   **`manifest.json`:** एक्सटेंशन की मुख्य विन्यास फ़ाइल। यह permissions, scripts, सुलभ resources आदि को परिभाषित करती है। यह manifest के संस्करण 3 का उपयोग करती है और `activeTab`, `storage`, `commands`, `scripting` तथा `contextMenus` permissions घोषित करती है।
-   **`background.js`:** पृष्ठभूमि में चलने वाला service worker। यह events (आइकन पर क्लिक, कीबोर्ड शॉर्टकट, संदर्भ मेनू) प्रबंधित करता है, आवश्यकता होने पर `content script` को inject करता है और `content script` के साथ संवाद करता है।
-   **`content.js`:** वेब पृष्ठों में inject की जाने वाली मुख्य script। यह विभिन्न utility modules का समन्वय करती है और एक्सटेंशन के समग्र प्रवाह को प्रबंधित करती है।
-   **`src/constants.js`:** विन्यास, अवस्थाओं, actions आदि के लिए constants परिभाषित करती है।

#### Utility Modules

एक्सटेंशन कई विशेष utility फ़ाइलों वाली modular architecture का उपयोग करता है:

##### Providers और API का प्रबंधन

-   **`src/utils/providers.js`:** AI providers (Mistral AI, OpenAI, Custom/LiteLLM) की registry, जिसमें उनके configurations, models और डिफ़ॉल्ट URLs शामिल हैं।
-   **`src/utils/api-utils.js`:** बाहरी API के साथ संवाद, multi-provider विन्यास के resolution और ऑडियो प्रतिलेखन के लिए functions।
-   **`src/utils/text-processing.js`:** टेक्स्ट processing के functions: अनुवाद, पुनर्लेखन, वर्तनी सुधार।

##### उपयोगकर्ता इंटरफ़ेस और सहभागिता

-   **`src/utils/ui.js`:** उपयोगकर्ता इंटरफ़ेस के लिए सामान्य utility functions।
-   **`src/utils/banner-utils.js`:** स्थिति banner, उसके controls और भाषा selector का प्रबंधन करती है।
-   **`src/utils/focus-utils.js`:** focus और टेक्स्ट selection को सहेजने तथा पुनर्स्थापित करने का प्रबंधन करती है।
-   **`src/utils/transcription-display.js`:** प्रतिलेखन परिणामों के प्रदर्शन का प्रबंधन करती है।
-   **`src/utils/error-utils.js`:** errors के प्रदर्शन और processing का प्रबंधन करती है।
-   **`src/styles/content.css`:** वेब पृष्ठों में inject किए गए उपयोगकर्ता इंटरफ़ेस के लिए CSS styles।

##### रिकॉर्डिंग और Events

-   **`src/utils/recording-utils.js`:** माइक्रोफ़ोन के माध्यम से ऑडियो रिकॉर्डिंग और ऑडियो data processing का प्रबंधन करती है।
-   **`src/utils/event-handlers.js`:** उपयोगकर्ता interactions के लिए event handlers रखती है।

##### अंतरराष्ट्रीयकरण और भाषाएँ

-   **`src/utils/languages.js`:** एक्सटेंशन द्वारा समर्थित भाषाएँ परिभाषित करती है।
-   **`src/utils/languages-shared.js`:** वेब पृष्ठ के context के लिए समर्थित भाषाओं की सूची परिभाषित करती है।
-   **`src/utils/languages-data.js`:** service worker के लिए समर्थित भाषाओं की सूची परिभाषित करती है।
-   **`src/utils/i18n.js`:** उपयोगकर्ता इंटरफ़ेस के अंतरराष्ट्रीयकरण का प्रबंधन करती है।

##### विकल्प पृष्ठ

-   **`src/pages/options/`:** एक्सटेंशन के विकल्प पृष्ठ की फ़ाइलें (HTML, CSS, JavaScript) रखती है।

### प्रतिलेखन और अनुवाद प्रक्रिया

#### मुख्य ध्वनि प्रतिलेखन सुविधा

1.  **रिकॉर्डिंग शुरू करना:** उपयोगकर्ता एक्सटेंशन आइकन पर क्लिक करके या कीबोर्ड शॉर्टकट (Ctrl+Shift+1 या Mac पर ⌘+Shift+1) का उपयोग करके रिकॉर्डिंग शुरू करता है। `background script`, रिकॉर्डिंग शुरू करने के लिए `content script` को संदेश भेजता है।
2.  **ऑडियो कैप्चर:** `content script`, माइक्रोफ़ोन तक पहुँचने और MediaRecorder API के माध्यम से ऑडियो रिकॉर्ड करने के लिए `navigator.mediaDevices.getUserMedia` API का उपयोग करता है।
3.  **प्रतिलेखन:** `content script`, विन्यस्त provider की प्रतिलेखन API (Mistral AI के लिए Voxtral, OpenAI के लिए Whisper) को ऑडियो भेजने के लिए `transcribeAudio` function (`src/utils/api-utils.js`) का उपयोग करता है। API प्रतिलिखित टेक्स्ट लौटाती है।
4.  **अनुवाद या पुनर्लेखन (वैकल्पिक):**

-   यदि अनुवाद विकल्प सक्रिय है, तो `content script` प्रतिलिखित टेक्स्ट को विन्यस्त provider की chat API को भेजने के लिए `translateText` function (`src/utils/text-processing.js`) का उपयोग करता है।
-   यदि पुनर्लेखन विकल्प सक्रिय है, तो प्रतिलिखित टेक्स्ट को बेहतर बनाने के लिए `rephraseText` function का उपयोग किया जाता है।

5.  **प्रदर्शन:** `content script` संसाधित टेक्स्ट को या तो पृष्ठ के सक्रिय element में (यदि वह टेक्स्ट फ़ील्ड या संपादन योग्य element है) या अनुकूलित संवाद बॉक्स में प्रदर्शित करता है।

#### संदर्भ मेनू की सुविधा

1. **टेक्स्ट चयन:** उपयोगकर्ता किसी वेब पृष्ठ पर टेक्स्ट चुनता है।
2. **संदर्भ मेनू:** दायाँ क्लिक करने पर ये विकल्प दिखाई देते हैं:
    - शैली और स्पष्टता बेहतर बनाने के लिए "चयन को पुनर्लिखें"
    - उपलब्ध भाषाओं के उप-मेनू के साथ "चयन का अनुवाद करें"
    - त्रुटियाँ ठीक करने के लिए "वर्तनी सुधारें"
3. **Processing:** चुने गए विकल्प के अनुसार:
    - टेक्स्ट को `rephraseText` function के माध्यम से पुनर्लेखन के लिए भेजा जाता है
    - टेक्स्ट को चुनी गई लक्ष्य भाषा के साथ `translateText` function के माध्यम से अनुवाद के लिए भेजा जाता है
    - टेक्स्ट को `correctText` function के माध्यम से सुधार के लिए भेजा जाता है
4. **प्रदर्शन:** परिणाम उस element में मूल चयन को बदल देता है, जहाँ चयनित टेक्स्ट स्थित है।

### संचार

`background script` और `content script` के बीच संचार Chrome messaging API (`chrome.runtime.sendMessage` और `chrome.runtime.onMessage`) के माध्यम से होता है।

### डेटा संग्रहण

एक्सटेंशन निम्नलिखित को संग्रहीत करने के लिए `chrome.storage.sync` का उपयोग करता है:

-   AI providers का विन्यास (API कुंजियाँ, चयनित मॉडल, अनुकूलित URLs)।
-   एक्सटेंशन के विकल्प (प्रदर्शन, अनुवाद, banner के रंग आदि)।
-   अनुवाद के लिए भाषा प्राथमिकताएँ।

यह डेटा आपके कंप्यूटर पर ब्राउज़र एक्सटेंशन के स्थानीय storage में संग्रहीत किया जाता है।
### त्रुटि प्रबंधन

संभावित त्रुटियाँ (API कुंजी का न होना, ट्रांसक्रिप्शन त्रुटि आदि) `constants.js` फ़ाइल में परिभाषित हैं। `api-utils.js` और `text-processing.js` फ़ंक्शन HTTP कोड के अनुसार बेहतर संदेशों के साथ API कॉल की संभावित त्रुटियों को संभालते हैं। `content.js` पृष्ठ के नीचे एक बैनर के माध्यम से उपयोगकर्ता को त्रुटि संदेश दिखाता है।

## 🛡️ सुरक्षा और गोपनीयता

-   **डेटा सुरक्षा:**
    -   API कुंजी ब्राउज़र में सुरक्षित रूप से संग्रहीत की जाती है।
    -   एक्सटेंशन आपके ऑडियो डेटा को संग्रहीत नहीं करता; सभी प्रसंस्करण रीयल टाइम में होते हैं।
    -   API के साथ संचार सुरक्षित HTTPS कनेक्शन के माध्यम से होता है।

BabelFishAI आपके डेटा को कैसे संभालता है, इसकी पूरी जानकारी के लिए कृपया हमारी [गोपनीयता नीति](PRIVACY.md) देखें।

## 🔧 समस्या निवारण

-   **माइक्रोफ़ोन संबंधी समस्याएँ:**

    -   अपने ब्राउज़र में माइक्रोफ़ोन एक्सेस की अनुमतियों की जाँच करें।
    -   सुनिश्चित करें कि कोई अन्य एप्लिकेशन उसी समय माइक्रोफ़ोन का उपयोग नहीं कर रहा हो।

-   **ट्रांसक्रिप्शन/अनुवाद त्रुटियाँ:**
    -   जाँचें कि API कुंजी मान्य और सक्रिय है।
    -   सुनिश्चित करें कि आपका इंटरनेट कनेक्शन स्थिर है।
    -   त्रुटि होने पर विस्तृत लॉग प्राप्त करने के लिए ब्राउज़र कंसोल देखें।

## 🤝 योगदान

योगदान और सुझावों का स्वागत है। योगदान देने के लिए:

-   GitHub के Issues अनुभाग के माध्यम से बग की रिपोर्ट करें।
-   सुधारों या नई सुविधाओं का प्रस्ताव दें।
-   अपने pull requests सबमिट करें।

## 📄 लाइसेंस

यह एक्सटेंशन GNU Affero General Public License v3.0 (AGPL-3.0) के अंतर्गत वितरित किया जाता है। अधिक जानकारी के लिए LICENSE फ़ाइल देखें।

## 💝 सहयोग

## यदि आपको यह एक्सटेंशन पसंद है, तो आप [PayPal](https://paypal.me/jls) के माध्यम से दान देकर इसके विकास में सहयोग कर सकते हैं।

jls42.org द्वारा जुनून और नवाचार के साथ विकसित, Babel Fish AI अत्याधुनिक कृत्रिम बुद्धिमत्ता की सहायता से ट्रांसक्रिप्शन और अनुवाद को नई ऊँचाइयों तक पहुँचाता है।
