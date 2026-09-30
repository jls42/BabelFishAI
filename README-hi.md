**लेख का fr से hi में अनुवाद gpt-5.6-sol के साथ किया गया।**

# Babel Fish AI - AI के साथ ध्वनि प्रतिलेखन और अनुवाद एक्सटेंशन

<img src="images/icon128.png" alt="Babel Fish AI आइकन" width="128" height="128">

**आधिकारिक वेबसाइट: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 Deutsch](README-de.md) | [🇺🇸 English](README-en.md) | [🇪🇸 Español](README-es.md) | [🇮🇳 हिन्दी](README-hi.md) | [🇮🇹 Italiano](README-it.md) | [🇯🇵 日本語](README-ja.md) | [🇰🇷 한국어](README-ko.md) | [🇳🇱 Nederlands](README-nl.md) | [🇵🇱 Polski](README-pl.md) | [🇵🇹 Português](README-pt.md) | [🇷🇴 Română](README-ro.md) | [🇸🇪 Svenska](README-sv.md) | [🇨🇳 中文](README-zh.md)

**एक्सटेंशन का उपयोग करने के लिए, आपको समर्थित providers में से किसी एक की API कुंजी की आवश्यकता होगी:**

|                             Provider                             | API कुंजी प्राप्त करें                                                                               |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
|   <img src="images/gemini-logo.png" alt="Gemini" height="30">    | **Gemini (Google)**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)            |
|                                🚅                                | **Custom/LiteLLM**: अपने स्वयं के API endpoints का उपयोग करने के लिए                                      |

Babel Fish AI एक अभिनव ब्राउज़र एक्सटेंशन है, जिसे multi-provider समर्थन के साथ शक्तिशाली ध्वनि प्रतिलेखन प्रदान करने के लिए बनाया गया है। Mistral AI (Voxtral), OpenAI (gpt-transcribe, Whisper) या Gemini (Gemini 3.5 Transcribe) की प्रतिलेखन API की सहायता से अपनी आवाज़ को उल्लेखनीय सटीकता के साथ टेक्स्ट में बदलें और वैकल्पिक रूप से रीयल-टाइम स्वचालित अनुवाद का लाभ उठाएँ। आप Babel Fish AI का उपयोग केवल प्रतिलेखन के लिए कर सकते हैं या अपनी आवश्यकतानुसार तत्काल अनुवाद सक्रिय कर सकते हैं।

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![Codacy बैज](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![गुणवत्ता गेट की स्थिति](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![सुरक्षा रेटिंग](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![रखरखाव-योग्यता रेटिंग](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![कमज़ोरियाँ](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![कोड संबंधी समस्याएँ](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![तकनीकी ऋण](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![कोड की पंक्तियाँ](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 विशेषताएँ

-   **उन्नत ध्वनि प्रतिलेखन**

    -   आपके डिवाइस के माइक्रोफ़ोन के माध्यम से उच्च-गुणवत्ता वाली ऑडियो रिकॉर्डिंग।
    -   Voxtral (Mistral AI), gpt-transcribe और Whisper (OpenAI) या Gemini 3.5 Transcribe (Google) API के माध्यम से सटीक प्रतिलेखन।
    -   Multi-provider समर्थन: Mistral AI, OpenAI, Gemini या किसी कस्टम endpoint में से स्वतंत्र रूप से चुनें।
    -   ध्वनि पहचान और टेक्स्ट प्रदर्शन के लिए बहुभाषी समर्थन, जिससे विभिन्न भाषाओं में ध्वनि इनपुट का प्रतिलेखन किया जा सकता है और परिणामों को (प्रतिलेखन तथा सक्रिय होने पर अनुवाद) आपकी पसंद की भाषा में दिखाया जा सकता है।
    -   सक्रिय फ़ील्ड में टेक्स्ट का स्वचालित प्रविष्टिकरण या उसे समर्पित संवाद बॉक्स में प्रदर्शित करना।

-   **बुद्धिमान अनुवाद और पुनर्लेखन**

    -   आवश्यकता होने पर सक्रिय किए जा सकने वाले विभिन्न भाषाओं में प्रतिलेखन के तत्काल अनुवाद।
    -   शैली और स्पष्टता सुधारने के लिए टेक्स्ट का पुनर्लेखन।
    -   मूल अर्थ के प्रति निष्ठावान अनुवाद सुनिश्चित करने के लिए उन्नत AI मॉडल का उपयोग।
    -   केवल प्रतिलेखन का उपयोग करने या प्रतिलेखन और अनुवाद को संयोजित करने की स्वतंत्रता।

-   **शक्तिशाली संदर्भ मेनू**

    -   आपके चुने हुए टेक्स्ट को तुरंत बेहतर बनाने के लिए "चयन का पुनर्लेखन करें" विकल्प।
    -   सभी उपलब्ध भाषाओं के उप-मेनू के साथ "चयन का अनुवाद करें" विकल्प।
    -   वर्तनी, व्याकरण और विराम-चिह्न संबंधी त्रुटियाँ सुधारने के लिए "वर्तनी सुधारें" विकल्प।
    -   चुने हुए टेक्स्ट को सीधे उसके अनूदित, पुनर्लिखित या संशोधित संस्करण से बदलना।
    -   ब्राउज़र के मूल उपयोगकर्ता इंटरफ़ेस में सहज एकीकरण।

-   **सहज और अनुकूलन-योग्य उपयोगकर्ता इंटरफ़ेस**

    -   लचीला प्रदर्शन मोड: सक्रिय इनपुट क्षेत्र या फ़्लोटिंग संवाद विंडो।
    -   रंग, अपारदर्शिता और प्रदर्शन अवधि के चयन के साथ अनुकूलन-योग्य स्थिति बैनर।
    -   रिकॉर्डिंग शुरू/बंद करने के लिए कीबोर्ड शॉर्टकट (Ctrl+Shift+1 या Mac पर ⌘+Shift+1)।
    -   Firefox में, उन साइटों के लिए "प्राथमिकता शॉर्टकट" जिनका पृष्ठ संपादक इस संयोजन को रोक लेता है (ChatGPT, Notion…): इंस्टॉल होते ही सक्रिय, विकल्पों से निष्क्रिय किया जा सकता है ([PRIVACY.md](PRIVACY.md) देखें)।
    -   परिणामों की प्रदर्शन अवधि नियंत्रित करने के लिए "खुला रखें" विकल्प।
    -   तत्काल पहचान के लिए माइक्रोफ़ोन और संख्या "42" वाला कस्टम आइकन।

-   **उन्नत विकल्प**
    -   अधिकतम लचीलेपन के लिए Multi-provider समर्थन: Mistral AI, OpenAI, Gemini और Custom/LiteLLM।
    -   प्रत्येक provider के लिए प्रतिलेखन और अनुवाद मॉडल अनुकूलित करने की सुविधा।
    -   उपलब्ध OpenAI मॉडल: GPT-4o mini (डिफ़ॉल्ट), GPT-4.1 (mini/standard), **GPT-5.4 (nano/mini/standard)** और **GPT-5.6 (luna/terra/sol)**। प्रतिलेखन: **gpt-transcribe** (डिफ़ॉल्ट), whisper-1, gpt-4o-mini-transcribe और gpt-4o-transcribe। OpenAI इन अंतिम तीन मॉडलों को 26/02/2027 को अपनी API से हटा देगा; विकल्पों में पहले से चुने गए मॉडल का तब तक उपयोग जारी रहेगा।
    -   उपलब्ध Mistral मॉडल: Mistral Small (डिफ़ॉल्ट), Mistral Medium, Mistral Large, Codestral और **Ministral 3 (3B/8B/14B)**। प्रतिलेखन: Voxtral Mini। तर्क करने वाले Mistral मॉडल की प्रतिक्रियाएँ (विचार खंड) समर्थित हैं।
    -   उपलब्ध Gemini मॉडल: **Gemini 3.8 Flash** (डिफ़ॉल्ट, एक से दो सेकंड में उत्तर देने के लिए कम विचार के साथ) और **Gemini 3.5 Flash-Lite** (सबसे तेज़)। प्रतिलेखन: Google की Interactions API के माध्यम से **Gemini 3.5 Transcribe**, इस API के इतिहास में श्रुतलेख सहेजे बिना (`store: false`, [docs/providers/gemini.md](docs/providers/gemini.md) देखें)।
    -   gpt-4.1-nano (OpenAI API 23/10/2026 को बंद होगी) या gpt-4o का उपयोग करने वाली सेटिंग अपडेट के दौरान स्वतः क्रमशः gpt-5.6-luna और gpt-4.1 पर चली जाती हैं।
    -   प्रतिलेखन और अनुवाद/पुनर्लेखन के लिए provider का स्वतंत्र चयन।
    -   वैकल्पिक मॉडलों से जुड़ने के लिए Custom provider के माध्यम से LiteLLM Proxy के साथ संगतता।
    -   भाषा फ़ाइलों (\_locales) की सहायता से अंतरराष्ट्रीयकरण का पूर्ण प्रबंधन, जो कई भाषाओं में इंटरफ़ेस और ध्वनि समर्थन प्रदान करता है।

## 🌐 समर्थित भाषाएँ

प्रदर्शन वीडियो के लिंक सहित Babel Fish AI द्वारा समर्थित भाषाओं की सूची यहाँ दी गई है:

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

## 🚀 इंस्टॉलेशन

### Chrome

1.  **डाउनलोड और इंस्टॉलेशन:**

    -   GitHub से इस रिपॉज़िटरी को क्लोन करें या एक्सटेंशन फ़ोल्डर को मैन्युअल रूप से डाउनलोड करें।
    -   **या एक्सटेंशन को सीधे [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk) से इंस्टॉल करें**
    -   Chrome खोलें और `chrome://extensions/` पर जाएँ।
    -   ऊपर दाईं ओर "डेवलपर मोड" सक्रिय करें।
    -   "अनपैक किया गया एक्सटेंशन लोड करें" पर क्लिक करें और Babel Fish AI फ़ोल्डर चुनें।

2.  **सत्यापन:**
    -   सुनिश्चित करें कि एक्सटेंशन कस्टम आइकन के साथ ब्राउज़र टूलबार में दिखाई देता है।

### Firefox

1.  **डाउनलोड और इंस्टॉलेशन:**

    -   संस्करण 1.2.0 से **Firefox 140 या उसके बाद का संस्करण** (कंप्यूटर) आवश्यक है। इंस्टॉलेशन के समय और 1.2.0 में अपडेट करते समय, Firefox वह डेटा दिखाता है जिसे एक्सटेंशन आपके द्वारा कॉन्फ़िगर किए गए provider को भेजता है: आपकी आवाज़, चुना हुआ या बोला गया टेक्स्ट और आपकी API कुंजी ([PRIVACY.md](PRIVACY.md) देखें)।
    -   **एक्सटेंशन को सीधे [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/) से इंस्टॉल करें**
    -   या मैन्युअल इंस्टॉलेशन के लिए: GitHub से इस रिपॉज़िटरी को क्लोन करें, फिर `./scripts/build.sh firefox` चलाएँ, जो Firefox manifest का नाम बदलकर `manifest.json` रखते हुए `dist/firefox/` तैयार करता है।
    -   Firefox खोलें और `about:debugging#/runtime/this-firefox` पर जाएँ (`about:addons` में "फ़ाइल से ऐड-ऑन इंस्टॉल करें" पर नहीं, जो हस्ताक्षरित एक्सटेंशन के लिए आरक्षित है)।
    -   "अस्थायी ऐड-ऑन लोड करें..." पर क्लिक करें।
    -   `dist/firefox/manifest.json` फ़ाइल चुनें।

2.  **सत्यापन:**
    -   सुनिश्चित करें कि एक्सटेंशन कस्टम आइकन के साथ Firefox टूलबार में दिखाई देता है।

## ⚙️ कॉन्फ़िगरेशन

1.  **AI Provider का कॉन्फ़िगरेशन:**

    -   विकल्पों तक पहुँचने के लिए एक्सटेंशन आइकन पर क्लिक करें।
    -   ड्रॉपडाउन मेनू से अपना provider चुनें (Mistral AI, OpenAI, Gemini या Custom/LiteLLM)।
    -   अपनी API कुंजी दर्ज करें:
        -   **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys) पर उपलब्ध
        -   **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) पर उपलब्ध
        -   **Gemini**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey) पर उपलब्ध। बिलिंग वाले प्रोजेक्ट की कुंजी को प्राथमिकता दें: निःशुल्क कुंजी के साथ, यदि आप यूरोपीय आर्थिक क्षेत्र, स्विट्ज़रलैंड और यूनाइटेड किंगडम से बाहर हैं, तो Google अपने उत्पादों को बेहतर बनाने के लिए आपके श्रुतलेख और भेजे गए टेक्स्ट का उपयोग कर सकता है, जिसमें मानव द्वारा समीक्षा किए जाने की संभावना भी है; इसमें कोई व्यक्तिगत, संवेदनशील या गोपनीय जानकारी न भेजें। कुंजी को Gemini API तक सीमित रखें (नई कुंजियों की डिफ़ॉल्ट सेटिंग), वेबसाइटों तक कभी नहीं: Chrome में अनुरोध उस पृष्ठ से भेजे जाते हैं जहाँ आप बोलकर लिखवा रहे होते हैं।
    -   ड्रॉपडाउन मेनू के पास स्थित toggle से provider को सक्रिय करें।

2.  **विकल्पों का अनुकूलन:**

    -   प्रदर्शन मोड चुनें (सक्रिय क्षेत्र या संवाद बॉक्स)।
    -   स्थिति बैनर का रंग, अपारदर्शिता और प्रदर्शन अवधि कॉन्फ़िगर करें।
    -   प्रतिलेखन (ध्वनि इनपुट) और टेक्स्ट प्रदर्शन के लिए भाषाएँ चुनें।
    -   अपनी आवश्यकतानुसार अनुवाद सुविधा सक्रिय या निष्क्रिय करें।

3.  **(वैकल्पिक) उन्नत मॉडल कॉन्फ़िगरेशन:**

    -   प्रत्येक provider के विकल्पों में, उपयोग किए जाने वाले मॉडलों को अनुकूलित करने के लिए "मॉडल कॉन्फ़िगरेशन" पर क्लिक करें।
    -   आप प्रतिलेखन और अनुवाद/पुनर्लेखन के लिए कस्टम मॉडल जोड़ सकते हैं।
    -   यदि कई providers सक्रिय हैं, तो आप प्रत्येक सेवा (प्रतिलेखन और अनुवाद) के लिए उपयोग किया जाने वाला provider चुन सकते हैं।

4.  **एकाधिक सिंक्रनाइज़ किए गए डिवाइस:**
    -   अपने सभी डिवाइस पर एक्सटेंशन अपडेट करें। 1.2.0 से पुराना संस्करण Gemini को नहीं पहचानता: यदि Gemini चुना गया है, तो वह आपके द्वारा सक्रिय किए गए किसी पुराने provider का उपयोग करता है या कुछ भी नहीं भेजता।
    -   यदि एक्सटेंशन के किसी नए संस्करण ने ऐसा provider सहेजा है जिसे आपका संस्करण अभी तक नहीं पहचानता, तो विकल्प पृष्ठ "नए संस्करण के Providers" अनुभाग में इसकी सूचना देता है और सभी डिवाइस से उसकी सेटिंग मिटाने के लिए एक बटन प्रदान करता है।
    -   यदि ब्राउज़र आपके विकल्प सहेजने से मना कर देता है (उदाहरण के लिए कोई मान बहुत लंबा होने पर), तो पृष्ठ "विकल्प सहेजे गए!" के बजाय त्रुटि दिखाता है और कुछ भी नहीं सहेजता।

## 🚀 LiteLLM Proxy या कस्टम Endpoints के साथ उपयोग

Babel Fish AI [LiteLLM Proxy](https://litellm.ai/) और OpenAI-संगत अन्य API proxies के साथ संगत है, जिससे वैकल्पिक भाषा मॉडलों का उपयोग किया जा सकता है।

### कॉन्फ़िगरेशन

1.  **अपना proxy इंस्टॉल और कॉन्फ़िगर करें:** आपके द्वारा उपयोग की जाने वाली सेवा (LiteLLM आदि) के निर्देशों का पालन करें।
2.  **Babel Fish AI एक्सटेंशन कॉन्फ़िगर करें:**
    -   एक्सटेंशन के विकल्पों में, ड्रॉपडाउन मेनू से **Custom/LiteLLM** provider चुनें।
    -   अपनी API कुंजी दर्ज करें (यदि आवश्यक हो)।
    -   API URLs कॉन्फ़िगर करें:
        -   **प्रतिलेखन URL**: उदाहरण के लिए `http://localhost:4000/v1/audio/transcriptions`
        -   **Chat URL**: उदाहरण के लिए `http://localhost:4000/v1/chat/completions`
    -   toggle से provider को सक्रिय करें।
    -   यदि आप LiteLLM द्वारा अनुरोधों की लॉगिंग निष्क्रिय करना चाहते हैं, तो **"NoLog"** विकल्प चुनें।

**महत्वपूर्ण:** "NoLog" विकल्प **केवल** Custom/LiteLLM provider में उपलब्ध है। यह OpenAI, Mistral AI या Gemini की आधिकारिक API के साथ संगत नहीं है।

## 🛠️ तकनीकी कार्यप्रणाली

### एक्सटेंशन की संरचना

एक्सटेंशन कई JavaScript फ़ाइलों से बना है, जो परस्पर संवाद करती हैं:

#### मुख्य फ़ाइलें

-   **`manifest.json`:** एक्सटेंशन की मुख्य कॉन्फ़िगरेशन फ़ाइल। यह अनुमतियाँ, scripts, सुलभ संसाधन आदि परिभाषित करती है। यह manifest के संस्करण 3 का उपयोग करती है और `activeTab`, `storage`, `commands`, `scripting` तथा `contextMenus` अनुमतियाँ घोषित करती है।
-   **`background.js`:** पृष्ठभूमि में चलने वाला service worker। यह घटनाओं (आइकन पर क्लिक, कीबोर्ड शॉर्टकट, संदर्भ मेनू) को संभालता है, आवश्यकता होने पर `content script` इंजेक्ट करता है और `content script` से संवाद करता है।
-   **`content.js`:** वेब पृष्ठों में इंजेक्ट की जाने वाली मुख्य script। यह विभिन्न उपयोगिता modules का समन्वय करती है और एक्सटेंशन के समग्र प्रवाह को संभालती है।
-   **`src/constants.js`:** कॉन्फ़िगरेशन, स्थितियों, क्रियाओं आदि के लिए constants परिभाषित करती है।

#### उपयोगिता Modules

एक्सटेंशन कई विशिष्ट उपयोगिता फ़ाइलों वाली मॉड्यूलर संरचना का उपयोग करता है:

##### Providers और API का प्रबंधन

-   **`src/utils/providers.js`:** AI providers (Mistral AI, OpenAI, Gemini, Custom/LiteLLM) की registry, जिसमें उनके कॉन्फ़िगरेशन, मॉडल और डिफ़ॉल्ट URLs शामिल हैं।
-   **`src/utils/provider-store.js`:** स्टोरेज से providers की सेटिंग पढ़ना और यह नियंत्रित करना कि API कुंजी केवल उसके provider के पतों पर भेजी जाए।
-   **`src/utils/provider-adapters.js`:** providers के API प्रारूप: प्रमाणीकरण, अनुरोधों का body, प्रतिक्रियाओं और त्रुटियों को पढ़ना।
-   **`src/utils/api-utils.js`:** बाहरी API के साथ संवाद, multi-provider कॉन्फ़िगरेशन समाधान और ऑडियो प्रतिलेखन के लिए functions।
-   **`src/utils/text-processing.js`:** टेक्स्ट प्रोसेसिंग के functions: अनुवाद, पुनर्लेखन, वर्तनी सुधार।

##### उपयोगकर्ता इंटरफ़ेस और सहभागिता

-   **`src/utils/ui.js`:** उपयोगकर्ता इंटरफ़ेस के लिए सामान्य उपयोगिता functions।
-   **`src/utils/banner-utils.js`:** स्थिति बैनर, उसके controls और भाषा selector का प्रबंधन करती है।
-   **`src/utils/focus-utils.js`:** focus और टेक्स्ट चयन को सहेजने तथा पुनर्स्थापित करने का प्रबंधन करती है।
-   **`src/utils/transcription-display.js`:** प्रतिलेखन परिणामों के प्रदर्शन का प्रबंधन करती है।
-   **`src/utils/error-utils.js`:** त्रुटियों के प्रदर्शन और प्रबंधन को संभालती है।
-   **`src/styles/content.css`:** वेब पृष्ठों में इंजेक्ट किए गए उपयोगकर्ता इंटरफ़ेस के लिए CSS styles।

##### रिकॉर्डिंग और घटनाएँ

-   **`src/utils/recording-utils.js`:** माइक्रोफ़ोन के माध्यम से ऑडियो रिकॉर्डिंग और ऑडियो डेटा प्रोसेसिंग का प्रबंधन करती है।
-   **`src/utils/event-handlers.js`:** उपयोगकर्ता सहभागिताओं के event handlers शामिल करती है।

##### अंतरराष्ट्रीयकरण और भाषाएँ

-   **`src/utils/languages.js`:** एक्सटेंशन द्वारा समर्थित भाषाएँ परिभाषित करती है।
-   **`src/utils/languages-shared.js`:** वेब पृष्ठ के संदर्भ के लिए समर्थित भाषाओं की सूची परिभाषित करती है।
-   **`src/utils/languages-data.js`:** service worker के लिए समर्थित भाषाओं की सूची परिभाषित करती है।
-   **`src/utils/i18n.js`:** उपयोगकर्ता इंटरफ़ेस के अंतरराष्ट्रीयकरण का प्रबंधन करती है।

##### विकल्प पृष्ठ

-   **`src/pages/options/`:** एक्सटेंशन के विकल्प पृष्ठ की फ़ाइलें (HTML, CSS, JavaScript) शामिल करती है।
### ट्रांसक्रिप्शन और अनुवाद प्रक्रिया

#### मुख्य वॉइस ट्रांसक्रिप्शन कार्यक्षमता

1.  **रिकॉर्डिंग शुरू करना:** उपयोगकर्ता एक्सटेंशन आइकन पर क्लिक करके या कीबोर्ड शॉर्टकट (Ctrl+Shift+1 या Mac पर ⌘+Shift+1) का उपयोग करके रिकॉर्डिंग शुरू करता है। `background script`, रिकॉर्डिंग शुरू करने के लिए `content script` को एक संदेश भेजता है।
2.  **ऑडियो कैप्चर:** `content script`, माइक्रोफ़ोन तक पहुँचने और MediaRecorder API के माध्यम से ऑडियो रिकॉर्ड करने के लिए `navigator.mediaDevices.getUserMedia` API का उपयोग करता है।
3.  **ट्रांसक्रिप्शन:** `content script`, ऑडियो को कॉन्फ़िगर किए गए provider के ट्रांसक्रिप्शन API (Mistral AI के लिए Voxtral, OpenAI के लिए gpt-transcribe या Whisper, Gemini के लिए Gemini 3.5 Transcribe) पर भेजने हेतु `transcribeAudio` फ़ंक्शन (`src/utils/api-utils.js`) का उपयोग करता है। API ट्रांसक्राइब किया गया टेक्स्ट लौटाता है।
4.  **अनुवाद या पुनर्लेखन (वैकल्पिक):**

-   यदि अनुवाद विकल्प सक्रिय है, तो `content script`, ट्रांसक्राइब किए गए टेक्स्ट को कॉन्फ़िगर किए गए provider के chat API पर भेजने हेतु `translateText` फ़ंक्शन (`src/utils/text-processing.js`) का उपयोग करता है।
-   यदि पुनर्लेखन विकल्प सक्रिय है, तो ट्रांसक्राइब किए गए टेक्स्ट को बेहतर बनाने के लिए `rephraseText` फ़ंक्शन का उपयोग किया जाता है।

5.  **प्रदर्शन:** `content script` संसाधित टेक्स्ट को या तो पृष्ठ के सक्रिय एलिमेंट में (यदि वह टेक्स्ट फ़ील्ड या संपादन योग्य एलिमेंट है), या किसी कस्टम डायलॉग बॉक्स में प्रदर्शित करता है।

#### कॉन्टेक्स्ट मेनू की कार्यक्षमता

1. **टेक्स्ट का चयन:** उपयोगकर्ता किसी वेब पेज पर टेक्स्ट चुनता है।
2. **कॉन्टेक्स्ट मेनू:** राइट-क्लिक करने पर ये विकल्प दिखाई देते हैं:
    - शैली और स्पष्टता बेहतर बनाने के लिए "चयन का पुनर्लेखन करें"
    - उपलब्ध भाषाओं के सबमेनू के साथ "चयन का अनुवाद करें"
    - त्रुटियाँ सुधारने के लिए "वर्तनी सुधारें"
3. **प्रसंस्करण:** चुने गए विकल्प के अनुसार:
    - टेक्स्ट को `rephraseText` फ़ंक्शन के माध्यम से पुनर्लेखन के लिए भेजा जाता है
    - टेक्स्ट को चुनी गई लक्ष्य भाषा के साथ `translateText` फ़ंक्शन के माध्यम से अनुवाद के लिए भेजा जाता है
    - टेक्स्ट को `correctText` फ़ंक्शन के माध्यम से सुधार के लिए भेजा जाता है
4. **प्रदर्शन:** परिणाम उस एलिमेंट में मूल चयन को प्रतिस्थापित कर देता है, जहाँ चयनित टेक्स्ट मौजूद है।

### संचार

`background script` और `content script` के बीच संचार Chrome के मैसेजिंग API (`chrome.runtime.sendMessage` और `chrome.runtime.onMessage`) के माध्यम से होता है।

### डेटा संग्रहण

एक्सटेंशन निम्नलिखित को संग्रहीत करने के लिए `chrome.storage.sync` का उपयोग करता है:

-   AI providers का कॉन्फ़िगरेशन (API कुंजियाँ, चुने गए मॉडल, कस्टम URLs)। संस्करण 1.2.0 में जोड़े गए Gemini की अपनी संग्रहण कुंजी (`extraProvider.gemini`) है, जिसे पुराने संस्करण अनदेखा करते हैं।
-   एक्सटेंशन के विकल्प (प्रदर्शन, अनुवाद, बैनर के रंग आदि)।
-   अनुवाद की भाषा संबंधी प्राथमिकताएँ।

यह डेटा आपके कंप्यूटर पर ब्राउज़र एक्सटेंशन के संग्रहण में स्थानीय रूप से संग्रहीत किया जाता है।

### त्रुटि प्रबंधन

संभावित त्रुटियाँ (API कुंजी का न होना, ट्रांसक्रिप्शन त्रुटि आदि) `constants.js` फ़ाइल में परिभाषित हैं। `api-utils.js` और `text-processing.js` फ़ंक्शन, HTTP कोड के अनुसार बेहतर संदेशों के साथ API कॉल की संभावित त्रुटियों को संभालते हैं। `content.js` पृष्ठ के नीचे एक बैनर के माध्यम से उपयोगकर्ता को त्रुटि संदेश दिखाता है।

## 🛡️ सुरक्षा और गोपनीयता

-   **डेटा सुरक्षा:**
    -   API कुंजी ब्राउज़र में सुरक्षित रूप से संग्रहीत की जाती है।
    -   एक्सटेंशन आपका ऑडियो डेटा संग्रहीत नहीं करता; संपूर्ण प्रसंस्करण रीयल टाइम में होता है।
    -   APIs के साथ संचार सुरक्षित HTTPS कनेक्शन के माध्यम से होता है।

BabelFishAI आपके डेटा को किस प्रकार संभालता है, इसकी पूरी जानकारी के लिए कृपया हमारी [गोपनीयता नीति](PRIVACY.md) देखें।

## 🔧 समस्या निवारण

-   **माइक्रोफ़ोन संबंधी समस्याएँ:**

    -   अपने ब्राउज़र में माइक्रोफ़ोन एक्सेस की अनुमतियाँ जाँचें।
    -   सुनिश्चित करें कि कोई अन्य एप्लिकेशन उसी समय माइक्रोफ़ोन का उपयोग नहीं कर रहा है।

-   **ट्रांसक्रिप्शन/अनुवाद संबंधी त्रुटियाँ:**
    -   जाँचें कि API कुंजी मान्य और सक्रिय है।
    -   सुनिश्चित करें कि आपका इंटरनेट कनेक्शन स्थिर है।
    -   त्रुटि होने पर विस्तृत logs प्राप्त करने के लिए ब्राउज़र console देखें।

## 🤝 योगदान

योगदान और सुझावों का स्वागत है। योगदान करने के लिए:

-   GitHub के Issues अनुभाग के माध्यम से bugs की रिपोर्ट करें।
-   सुधार या नई कार्यक्षमताएँ प्रस्तावित करें।
-   अपनी pull requests सबमिट करें।

## 📄 लाइसेंस

यह एक्सटेंशन GNU Affero General Public License v3.0 (AGPL-3.0) के अंतर्गत वितरित किया जाता है। अधिक जानकारी के लिए LICENSE फ़ाइल देखें।

## 💝 सहयोग

## यदि आपको यह एक्सटेंशन पसंद है, तो आप [PayPal](https://paypal.me/jls) के माध्यम से दान देकर इसके विकास में सहयोग कर सकते हैं।

jls42.org द्वारा जुनून और नवाचार के साथ विकसित, Babel Fish AI अत्याधुनिक कृत्रिम बुद्धिमत्ता की सहायता से ट्रांसक्रिप्शन और अनुवाद को नई ऊँचाइयों तक ले जाता है।
