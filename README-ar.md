**مقال مترجم من الفرنسية إلى العربية باستخدام gpt-5.6-sol.**

# Babel Fish AI - إضافة للنسخ الصوتي والترجمة بالذكاء الاصطناعي

<img src="images/icon128.png" alt="أيقونة Babel Fish AI" width="128" height="128">

**الموقع الرسمي: [babelfishai.jls42.org](https://babelfishai.jls42.org/)**

[🇸🇦 العربية](README-ar.md) | [🇩🇪 الألمانية](README-de.md) | [🇺🇸 الإنجليزية](README-en.md) | [🇪🇸 الإسبانية](README-es.md) | [🇮🇳 الهندية](README-hi.md) | [🇮🇹 الإيطالية](README-it.md) | [🇯🇵 اليابانية](README-ja.md) | [🇰🇷 الكورية](README-ko.md) | [🇳🇱 الهولندية](README-nl.md) | [🇵🇱 البولندية](README-pl.md) | [🇵🇹 البرتغالية](README-pt.md) | [🇷🇴 الرومانية](README-ro.md) | [🇸🇪 السويدية](README-sv.md) | [🇨🇳 الصينية](README-zh.md)

**لاستخدام الإضافة، ستحتاج إلى مفتاح API من أحد المزوّدين المدعومين:**

|                             المزوّد                             | الحصول على مفتاح API                                                                               |
| :--------------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
| <img src="images/mistral-logo.png" alt="Mistral AI" height="30"> | **Mistral AI**: [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)               |
|   <img src="images/openai-logo.png" alt="OpenAI" height="30">    | **OpenAI**: [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
|                                🚅                                | **Custom/LiteLLM**: لاستخدام نقاط نهاية API الخاصة بك                                      |

Babel Fish AI هي إضافة مبتكرة للمتصفح، مصممة لتوفير نسخ صوتي قوي مع دعم عدة مزوّدين. حوّل صوتك إلى نص بدقة متميزة باستخدام واجهات API للنسخ من Mistral AI ‏(Voxtral) أو OpenAI ‏(Whisper)، واستفد اختياريًا من الترجمة التلقائية في الوقت الفعلي. يمكنك استخدام Babel Fish AI للنسخ فقط، أو تفعيل الترجمة الفورية وفقًا لاحتياجاتك.

[![CodeFactor](https://www.codefactor.io/repository/github/jls42/babelfishai/badge)](https://www.codefactor.io/repository/github/jls42/babelfishai) [![شارة Codacy](https://app.codacy.com/project/badge/Grade/59bfe4cd13444ee1b4cffa58300dd043)](https://app.codacy.com/gh/jls42/BabelFishAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

[![حالة بوابة الجودة](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![تصنيف الأمان](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![تصنيف قابلية الصيانة](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![الثغرات الأمنية](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![مشكلات جودة الشيفرة](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![الدين التقني](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI) [![أسطر الشيفرة](https://sonarcloud.io/api/project_badges/measure?project=jls42_BabelFishAI&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jls42_BabelFishAI)

## 🌟 الميزات

-   **نسخ صوتي متقدم**

    -   التقاط صوت عالي الجودة عبر ميكروفون جهازك.
    -   نسخ دقيق عبر واجهات API الخاصة بـ Voxtral ‏(Mistral AI) أو Whisper ‏(OpenAI).
    -   دعم عدة مزوّدين: اختر بحرية بين Mistral AI أو OpenAI أو نقطة نهاية مخصصة.
    -   دعم متعدد اللغات للتعرّف على الكلام وعرض النص، مما يتيح نسخ المدخلات الصوتية بلغات مختلفة وعرض النتائج (النسخ والترجمة، إذا كانت مفعّلة) باللغة التي تختارها.
    -   إدراج النص تلقائيًا في الحقل النشط أو عرضه في مربع حوار مخصص.

-   **ترجمة وإعادة صياغة ذكيتان**

    -   ترجمة فورية للنصوص المنسوخة إلى لغات متنوعة، ويمكن تفعيلها عند الحاجة.
    -   إعادة صياغة النص لتحسين أسلوبه ووضوحه.
    -   استخدام نموذج ذكاء اصطناعي متقدم لضمان ترجمة أمينة للمعنى الأصلي.
    -   حرية اختيار استخدام النسخ وحده أو الجمع بين النسخ والترجمة.

-   **قائمة سياقية قوية**

    -   خيار "إعادة صياغة التحديد" لتحسين النصوص المحددة فورًا.
    -   خيار "ترجمة التحديد" مع قائمة فرعية تضم جميع اللغات المتاحة.
    -   خيار "تصحيح الإملاء" لتصحيح الأخطاء الإملائية والنحوية وعلامات الترقيم.
    -   استبدال النص المحدد مباشرة بنسخته المترجمة أو المعاد صياغتها أو المصححة.
    -   تكامل مثالي مع واجهة المستخدم الأصلية للمتصفح.

-   **واجهة مستخدم سهلة وقابلة للتخصيص**

    -   وضع عرض مرن: منطقة الإدخال النشطة أو نافذة حوار عائمة.
    -   شريط حالة قابل للضبط مع إمكانية اختيار الألوان والشفافية ومدة العرض.
    -   اختصار لوحة مفاتيح (Ctrl+Shift+1 أو ⌘+Shift+1 على Mac) لبدء التسجيل أو إيقافه.
    -   في Firefox، يتوفر «اختصار ذو أولوية» للمواقع التي يعترض فيها محرر الصفحة هذا الاختصار (ChatGPT وNotion وغيرهما): يكون مفعّلًا منذ التثبيت، ويمكن تعطيله من الخيارات (راجع [PRIVACY.md](PRIVACY.md)).
    -   خيار "إبقاء مفتوحًا" للتحكم في مدة عرض النتائج.
    -   أيقونة مخصصة تدمج ميكروفونًا والرقم "42" لسهولة التعرّف عليها فورًا.

-   **خيارات متقدمة**
    -   دعم عدة مزوّدين: Mistral AI وOpenAI وCustom/LiteLLM لأقصى قدر من المرونة.
    -   إمكانية تخصيص نماذج النسخ والترجمة لكل مزوّد.
    -   نماذج OpenAI المتاحة: GPT-4o mini (افتراضيًا)، وGPT-4.1 ‏(mini/standard)، و**GPT-5.4 ‏(nano/mini/standard)**، و**GPT-5.6 ‏(luna/terra/sol)**. النسخ: whisper-1 (افتراضيًا)، وgpt-4o-mini-transcribe، وgpt-4o-transcribe، و**gpt-transcribe**.
    -   نماذج Mistral المتاحة: Mistral Small (افتراضيًا)، وMistral Medium، وMistral Large، وCodestral، و**Ministral 3 ‏(3B/8B/14B)**. النسخ: Voxtral Mini. تُدعم استجابات نماذج Mistral التي تستخدم الاستدلال (كتل التفكير).
    -   الإعدادات التي كانت تستخدم gpt-4.1-nano (المقرر إيقافه في API الخاصة بـ OpenAI بتاريخ 23/10/2026) أو gpt-4o تنتقل تلقائيًا إلى gpt-5.6-luna وgpt-4.1 عند التحديث.
    -   اختيار مستقل للمزوّد الخاص بالنسخ والمزوّد الخاص بالترجمة أو إعادة الصياغة.
    -   التوافق مع LiteLLM Proxy عبر المزوّد Custom للاتصال بنماذج بديلة.
    -   إدارة كاملة للتدويل بفضل ملفات اللغات (\_locales)، مما يوفر واجهة ودعمًا صوتيًا بعدة لغات.

## 🌐 اللغات المدعومة

فيما يلي قائمة اللغات التي يدعمها Babel Fish AI، مع روابط إلى مقاطع فيديو توضيحية:

-   [العربية](https://www.youtube.com/watch?v=onzOGx7nbUE)
-   [الألمانية](https://www.youtube.com/watch?v=G1QVF1NTQYE)
-   [الإنجليزية](https://www.youtube.com/watch?v=QC8WiIszn3Q)
-   [الإسبانية](https://www.youtube.com/watch?v=nA93pis4vDQ)
-   [الفرنسية](https://www.youtube.com/watch?v=ITNFjx7Mgo4)
-   [الهندية](https://www.youtube.com/watch?v=FMEYdwCqoPg)
-   [الإيطالية](https://www.youtube.com/watch?v=QgYZt8myods)
-   [اليابانية](https://www.youtube.com/watch?v=noHEJCnocH8)
-   [الكورية](https://www.youtube.com/watch?v=YrYN75YSH3w)
-   [الهولندية](https://www.youtube.com/watch?v=OnAZHzbd2NQ)
-   [البولندية](https://www.youtube.com/watch?v=E5AVNjZYOxM)
-   [البرتغالية](https://www.youtube.com/watch?v=st0XwCV1tvo)
-   [الرومانية](https://www.youtube.com/watch?v=H2IMpU5_Hew)
-   [السويدية](https://www.youtube.com/watch?v=HMMzGyW8000)
-   [الصينية](https://www.youtube.com/watch?v=OJe6oVA_Y0s)

## 🚀 التثبيت

### Chrome

1.  **التنزيل والتثبيت:**

    -   استنسخ هذا المستودع من GitHub أو نزّل مجلد الإضافة يدويًا.
    -   **أو ثبّت الإضافة مباشرة من [Chrome Web Store](https://chromewebstore.google.com/detail/babelfishai-by-jls42org/aahodplbenfmijbeahnhoklpdnmfdmbk)**
    -   افتح Chrome وانتقل إلى `chrome://extensions/`.
    -   فعّل «وضع المطوّر» في أعلى اليسار.
    -   انقر على «تحميل إضافة غير مضغوطة» وحدد مجلد Babel Fish AI.

2.  **التحقق:**
    -   تأكد من ظهور الإضافة في شريط أدوات المتصفح مع الأيقونة المخصصة.

### Firefox

1.  **التنزيل والتثبيت:**

    -   **ثبّت الإضافة مباشرة من [إضافات Firefox](https://addons.mozilla.org/firefox/addon/babelfishai-by-jls42-org/)**
    -   أو للتثبيت اليدوي: استنسخ هذا المستودع من GitHub، ثم شغّل `./scripts/build.sh firefox`، الذي يُعِدّ `dist/firefox/` مع إعادة تسمية ملف manifest الخاص بـ Firefox إلى `manifest.json`.
    -   افتح Firefox وانتقل إلى `about:debugging#/runtime/this-firefox` (وليس «تثبيت إضافة من ملف» في `about:addons`، المخصص للإضافات الموقّعة).
    -   انقر على «تحميل إضافة مؤقتة...».
    -   حدد الملف `dist/firefox/manifest.json`.

2.  **التحقق:**
    -   تأكد من ظهور الإضافة في شريط أدوات Firefox مع الأيقونة المخصصة.

## ⚙️ الإعداد

1.  **إعداد مزوّد الذكاء الاصطناعي:**

    -   انقر على أيقونة الإضافة للوصول إلى الخيارات.
    -   حدد المزوّد من القائمة المنسدلة (Mistral AI أو OpenAI أو Custom/LiteLLM).
    -   أدخل مفتاح API الخاص بك:
        -   **Mistral AI**: متاح على [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)
        -   **OpenAI**: متاح على [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
    -   فعّل المزوّد باستخدام مفتاح التبديل بجوار القائمة المنسدلة.

2.  **تخصيص الخيارات:**

    -   اختر وضع العرض (المنطقة النشطة أو مربع الحوار).
    -   اضبط لون شريط الحالة وشفافيته ومدة عرضه.
    -   حدد لغات النسخ (الإدخال الصوتي) وعرض النص.
    -   فعّل ميزة الترجمة أو عطّلها وفقًا لاحتياجاتك.

3.  **إعداد متقدم للنماذج (اختياري):**
    -   في خيارات كل مزوّد، انقر على "إعداد النماذج" لتخصيص النماذج المستخدمة.
    -   يمكنك إضافة نماذج مخصصة للنسخ والترجمة أو إعادة الصياغة.
    -   إذا كان عدة مزوّدين مفعّلين، فيمكنك اختيار المزوّد المستخدم لكل خدمة (النسخ والترجمة).

## 🚀 الاستخدام مع LiteLLM Proxy أو نقاط نهاية مخصصة

يتوافق Babel Fish AI مع [LiteLLM Proxy](https://litellm.ai/) وغيره من وكلاء API المتوافقين مع OpenAI، مما يتيح استخدام نماذج لغوية بديلة.

### الإعداد

1.  **ثبّت الوكيل وأعدّه:** اتبع تعليمات الخدمة التي تستخدمها (LiteLLM وغيرها).
2.  **أعدّ إضافة Babel Fish AI:**
    -   في خيارات الإضافة، حدد المزوّد **Custom/LiteLLM** من القائمة المنسدلة.
    -   أدخل مفتاح API الخاص بك (إذا لزم الأمر).
    -   اضبط عناوين URL الخاصة بواجهات API:
        -   **عنوان URL للنسخ**: على سبيل المثال `http://localhost:4000/v1/audio/transcriptions`
        -   **عنوان URL للمحادثة**: على سبيل المثال `http://localhost:4000/v1/chat/completions`
    -   فعّل المزوّد باستخدام مفتاح التبديل.
    -   حدد خيار **"NoLog"** إذا كنت تريد تعطيل تسجيل الطلبات بواسطة LiteLLM.

**مهم:** يتوفر خيار "NoLog" **فقط** ضمن المزوّد Custom/LiteLLM. وهو غير متوافق مع واجهات API الرسمية لـ OpenAI أو Mistral AI.

## 🛠️ آلية العمل التقنية

### بنية الإضافة

تتكون الإضافة من عدة ملفات JavaScript تتفاعل فيما بينها:

#### الملفات الرئيسية

-   **`manifest.json`:** ملف الإعداد الرئيسي للإضافة. يحدد الأذونات والبرامج النصية والموارد التي يمكن الوصول إليها وغيرها. يستخدم الإصدار 3 من manifest ويعلن عن الأذونات `activeTab` و`storage` و`commands` و`scripting` و`contextMenus`.
-   **`background.js`:** عامل الخدمة الذي يعمل في الخلفية. يدير الأحداث (النقر على الأيقونة واختصارات لوحة المفاتيح والقائمة السياقية)، ويحقن `content script` عند الحاجة، ويتواصل مع `content script`.
-   **`content.js`:** البرنامج النصي الرئيسي الذي يُحقن في صفحات الويب. ينسق بين وحدات الأدوات المساعدة المختلفة ويدير التدفق العام للإضافة.
-   **`src/constants.js`:** يعرّف الثوابت الخاصة بالإعداد والحالات والإجراءات وغيرها.

#### وحدات الأدوات المساعدة

تستخدم الإضافة بنية معيارية تضم عدة ملفات متخصصة للأدوات المساعدة:

##### إدارة المزوّدين وواجهات API

-   **`src/utils/providers.js`:** سجل مزوّدي الذكاء الاصطناعي (Mistral AI وOpenAI وCustom/LiteLLM) مع إعداداتهم ونماذجهم وعناوين URL الافتراضية.
-   **`src/utils/api-utils.js`:** دوال للتفاعل مع واجهات API الخارجية، وحل إعدادات تعدد المزوّدين، ونسخ الصوت.
-   **`src/utils/text-processing.js`:** دوال معالجة النصوص: الترجمة وإعادة الصياغة والتصحيح الإملائي.

##### واجهة المستخدم والتفاعل

-   **`src/utils/ui.js`:** دوال مساعدة عامة لواجهة المستخدم.
-   **`src/utils/banner-utils.js`:** يدير شريط الحالة وعناصر التحكم الخاصة به ومحدد اللغة.
-   **`src/utils/focus-utils.js`:** يدير حفظ التركيز وتحديد النص واستعادتهما.
-   **`src/utils/transcription-display.js`:** يدير عرض نتائج النسخ.
-   **`src/utils/error-utils.js`:** يدير عرض الأخطاء ومعالجتها.
-   **`src/styles/content.css`:** أنماط CSS لواجهة المستخدم المحقونة في صفحات الويب.

##### التسجيل والأحداث

-   **`src/utils/recording-utils.js`:** يدير تسجيل الصوت عبر الميكروفون ومعالجة البيانات الصوتية.
-   **`src/utils/event-handlers.js`:** يحتوي على معالجات الأحداث الخاصة بتفاعلات المستخدم.

##### التدويل واللغات

-   **`src/utils/languages.js`:** يعرّف اللغات التي تدعمها الإضافة.
-   **`src/utils/languages-shared.js`:** يعرّف قائمة اللغات المدعومة ضمن سياق صفحة الويب.
-   **`src/utils/languages-data.js`:** يعرّف قائمة اللغات المدعومة لعامل الخدمة.
-   **`src/utils/i18n.js`:** يدير التدويل لواجهة المستخدم.

##### صفحة الخيارات

-   **`src/pages/options/`:** يحتوي على ملفات صفحة خيارات الإضافة (HTML وCSS وJavaScript).

### عملية النسخ والترجمة

#### ميزة النسخ الصوتي الرئيسية

1.  **بدء التسجيل:** يبدأ المستخدم التسجيل بالنقر على أيقونة الإضافة أو باستخدام اختصار لوحة المفاتيح (Ctrl+Shift+1 أو ⌘+Shift+1 على Mac). يرسل `background script` رسالة إلى `content script` لبدء التسجيل.
2.  **التقاط الصوت:** يستخدم `content script` واجهة API ‏`navigator.mediaDevices.getUserMedia` للوصول إلى الميكروفون وتسجيل الصوت عبر واجهة MediaRecorder API.
3.  **النسخ:** يستخدم `content script` الدالة `transcribeAudio` ‏(`src/utils/api-utils.js`) لإرسال الصوت إلى واجهة API للنسخ الخاصة بالمزوّد المُعدّ (Voxtral لـ Mistral AI وWhisper لـ OpenAI). تعيد واجهة API النص المنسوخ.
4.  **الترجمة أو إعادة الصياغة (اختياريًا):**

-   إذا كان خيار الترجمة مفعّلًا، يستخدم `content script` الدالة `translateText` ‏(`src/utils/text-processing.js`) لإرسال النص المنسوخ إلى واجهة API للمحادثة الخاصة بالمزوّد المُعدّ.
-   إذا كان خيار إعادة الصياغة مفعّلًا، تُستخدم الدالة `rephraseText` لتحسين النص المنسوخ.

5.  **العرض:** يعرض `content script` النص المعالَج إما في العنصر النشط بالصفحة (إذا كان حقلًا نصيًا أو عنصرًا قابلًا للتحرير)، وإما في مربع حوار مخصص.

#### ميزة القائمة السياقية

1. **تحديد النص:** يحدد المستخدم نصًا في صفحة ويب.
2. **القائمة السياقية:** يؤدي النقر بزر الفأرة الأيمن إلى عرض الخيارات:
    - "إعادة صياغة التحديد" لتحسين الأسلوب والوضوح
    - "ترجمة التحديد" مع قائمة فرعية باللغات المتاحة
    - "تصحيح الإملاء" لتصحيح الأخطاء
3. **المعالجة:** وفقًا للخيار المحدد:
    - يُرسل النص لإعادة صياغته عبر الدالة `rephraseText`
    - يُرسل النص للترجمة عبر الدالة `translateText` مع اللغة الهدف المحددة
    - يُرسل النص للتصحيح عبر الدالة `correctText`
4. **العرض:** تحل النتيجة محل التحديد الأصلي في العنصر الذي يوجد فيه النص المحدد.

### الاتصال

يتم الاتصال بين `background script` و`content script` عبر واجهة المراسلة API الخاصة بـ Chrome ‏(`chrome.runtime.sendMessage` و`chrome.runtime.onMessage`).

### تخزين البيانات

تستخدم الإضافة `chrome.storage.sync` لتخزين:

-   إعدادات مزوّدي الذكاء الاصطناعي (مفاتيح API والنماذج المحددة وعناوين URL المخصصة).
-   خيارات الإضافة (العرض والترجمة وألوان الشريط وغيرها).
-   تفضيلات اللغة للترجمة.

تُخزّن هذه البيانات محليًا على جهازك، ضمن مساحة تخزين إضافة المتصفح.
### إدارة الأخطاء

تُعرَّف الأخطاء المحتملة (مفتاح API مفقود، خطأ في النسخ، إلخ) في الملف `constants.js`. تتولى الدالتان `api-utils.js` و`text-processing.js` معالجة الأخطاء المحتملة لاستدعاءات API برسائل محسّنة وفقًا لرمز HTTP. يعرض `content.js` رسائل الخطأ للمستخدم عبر لافتة في أسفل الصفحة.

## 🛡️ الأمان والخصوصية

-   **حماية البيانات:**
    -   يُخزَّن مفتاح API بأمان في المتصفح.
    -   لا تحتفظ الإضافة ببياناتك الصوتية؛ إذ تُجرى جميع عمليات المعالجة في الوقت الفعلي.
    -   يتم الاتصال بواجهات API عبر اتصالات HTTPS آمنة.

للحصول على معلومات كاملة حول كيفية تعامل BabelFishAI مع بياناتك، يُرجى الاطلاع على [سياسة الخصوصية](PRIVACY.md).

## 🔧 استكشاف الأخطاء وإصلاحها

-   **مشكلات الميكروفون:**

    -   تحقّق من أذونات الوصول إلى الميكروفون في متصفحك.
    -   تأكّد من عدم استخدام أي تطبيق آخر للميكروفون في الوقت نفسه.

-   **أخطاء النسخ/الترجمة:**
    -   تحقّق من أن مفتاح API صالح ونشط.
    -   تأكّد من أن لديك اتصالًا مستقرًا بالإنترنت.
    -   راجع وحدة تحكم المتصفح للحصول على سجلات مفصّلة عند حدوث خطأ.

## 🤝 المساهمة

نرحّب بالمساهمات والاقتراحات. للمساهمة:

-   أبلغ عن الأخطاء عبر قسم Issues على GitHub.
-   اقترح تحسينات أو ميزات جديدة.
-   أرسل طلبات pull الخاصة بك.

## 📄 الترخيص

تُوزَّع هذه الإضافة بموجب ترخيص GNU Affero General Public License v3.0 (AGPL-3.0). راجع ملف LICENSE لمزيد من التفاصيل.

## 💝 الدعم

## إذا أعجبتك هذه الإضافة، يمكنك دعم تطويرها من خلال التبرع عبر [PayPal](https://paypal.me/jls).

طُوّرت بشغف وابتكار بواسطة jls42.org، وتدفع Babel Fish AI بالنسخ والترجمة نحو آفاق جديدة بفضل أحدث تقنيات الذكاء الاصطناعي.
