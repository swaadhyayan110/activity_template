const Define = (() => {    

    // DEFINE BUTTONS
    const buttons = [
        { qid : 1, text : ['Q-1', 'M-1'], module : 1, landscape : true },
        { qid : 2, text : ['Q-2', 'M-2'], module : 2 },
        { qid : 3, text : ['Q-3', 'M-3'], module : 3 },
        { qid : 4, text : ['Q-4', 'Fill'], module : 4 },
        { qid : 5, text : ['Q-5','श्रुतलेख'], module : 5 },
        { qid : 6, text : ['Q-6', 'Letter'], module : 6 },
        { qid : 7, text : ['Q-7', 'Word'], module : 7 },
        { qid : 8, text : ['Q-8', 'DND'], module : 8 },
        { qid : 9, text : ['Q-9', 'Mcq'], module : 9 },
        { qid : 10, text : ['Adaptiv'], module : 10 },
        { qid : 11, text : ['Audio'], module : 11 },
        { qid : 12, text : ['DD'], module : 12 },
        { qid : 13, text : ['Circle'], module : 13 },
        { qid : 14, text : ['श्रवण कौशल'], module : 14 },
        { qid : 15, text : ['Q-9', 'T&F'], module : 15 },
    ];

    // DEFINE QUESTIONS
    const questions = [
        {
            id      : 1,
            lang    : 'en',
            head    : '1. Vocabulary',
            subhead : 'Look at the expression eye-opener in your textbook. Now join the expression to its idiom.',
            content : [
                { id: 1, left: "Bird’s eye view", right: "Seen from above, as a bird does" },
                { id: 2, left: "Feast for the eyes", right: "To look with great enjoyment" },
                { id: 3, left: "All eyes and ears", right: "To be very attentive" },
                { id: 4, left: "Apple of someone’s eye", right: "To be a favourite or loved one of someone" },
                { id: 5, left: "Catch someone’s eye", right: "Be noticed by someone" },
                { id: 6, left: "Be an eye-opener", right: "To understand something" }
            ]
        },
        {
            id      : 2,
            head    : '2. Vocabulary',
            subhead : 'Look at the expression eye-opener in your textbook. Now join the expression to its idiom.',
            content : {
                col1: [
                    { id: 1, img: "./img/1.png" },
                    { id: 2, text: "./img/2.png" },
                    { id: 3, img: "./img/3.png" },
                ],
                col2: [
                    { id: 1, text: "जादू दिखाना" },
                    { id: 2, text: "पत्र बाँटना" },
                    { id: 3, img: "./img/2.png" },
                    { id: 4, text: "रखवाली करना" },
                    { id: 5, text: "पढ़ाना" },
                    { id: 6, text: "खेती करना" },
                ],
                col3: [
                    { id: 1, img: "./img/4.png" },
                    { id: 2, text: "./img/5.png" },
                    { id: 3, img: "./img/6.png" },
                ],
                correctLeft: { 1: 5, 2: 4, 3: 3 },
                correctRight: { 1: 6, 2: 1, 3: 2 }
            },
        },
        {
            id      : 3,
            head    : '3. Vocabulary',
            subhead : 'Look at the expression eye-opener in your textbook. Now join the expression to its idiom.',
            content : [
                { id: 1, top: "Bird’s eye view", bottom: "To understand something" },
                { id: 2, top: "Feast for the eyes", bottom: "Be noticed by someone" },
                { id: 3, top: "All eyes and ears", bottom: "To be very attentive" },
                { id: 4, top: "Apple of someone’s eye", bottom: "Seen from above" },
                { id: 5, top: "Catch someone’s eye", bottom: "To be a favourite or loved" }
            ]
        },
        {
            id      : 4,
            head    : '4. Identify and write the names of the features given in the sketch using the helping words.',
            subhead : 'text..',
            content : {
                hintimage : 'img/ch4_1.png',
                hinttext  : [
                    'Broad Gauge RailwayLine',
                    'Pond',
                    'Police Station',
                    'Bridge',
                    'Places of worship',
                    'Forest',
                    'River',
                    'Unmetalled road',
                    'Restaurant',
                    'Metalled road',
                    'Settlement',
                    'Railway Crossing'
                ],
                blanks : [
                    { img : "img/ch4_2.png", ans : "Settlement" },
                    { img : "img/ch4_3.png", ans : "Forest" },
                    { img : "img/ch4_4.png", ans : "Places of Worship" },	
                    { img : "img/ch4_5.png", ans : "River" },
                    { img : "img/ch4_6.png", ans : "Pond" },
                    { img : "img/ch4_7.png", ans : "Metalled Road" },
                    { img : "img/ch4_8.png", ans : "Unmetalled road" },
                    { img : "img/ch4_9.png", ans : "Broad Gauge Railway Line" },
                    { img : "img/ch4_10.png", ans : "Railway Crossing" },
                    { img : "img/ch4_12.png", ans : "Restaurant" },
                    { img : "img/ch4_13.png", ans : "Police Station" },
                    { img : "img/ch4_14.png", ans : "Bridge" }
                ]
            }
        },
        {
            id : 5,
            head : '5. नीचे दिए गए प्रश्नों के सही उत्तर टाइप करें: ',
            content : {
                replacement : '#_#',
                questions   : [
                    { question: "1. हमारे #_# देश का नाम #_# है।", answers: ["भारत", "भारत"] },
                    { question: "2. भारत की राजधानी #_# है।", answers: ["दिल्ली"] },
                    { question: "3. भारत की राजभाषा #_# है।", answers: ["हिंदी"] },
                    { question: "4. बच्चों को पढ़ने के लिए #_# चाहिए।", answers: ["किताब"] },
                    { question: "5. जहाँ पढ़ाई होती है उसे #_# कहते हैं।", answers: ["विद्यालय"] }
                ]
            }
        },
        {
            id      : 6,
            head    : '6. Jumble letters',
            subhead : 'text..',
            content : [
                "SCHOOL", "TEACHER", "STUDENT", "BOOK", 
                "CLASS", "COLLEGE", "EXAM", "LEARN", "STUDY"
            ]
        },
        {
            id      : 7,
            head    : '7. Jumble words',
            subhead : 'text ...',
            content : [
                "A short, statement expressing an opinion.",
                "A stance where both feet are placed in line, often used for balance.",
                "Actions speak louder than words.",
                "A picture is worth a thousand words.",
                "Practice makes perfect.",
                "Better late than never.",
                "Knowledge is power.",
                "Honesty is the best policy."
            ]
        },
        {
            id      : 8,
            head    : '8. शब्दान् श्रुत्वा लिङ्गानुसारं योग्यपेटिकायां स्थापयत',            
            subhead : '( शब्दों को सुनकर लिंगानुसार सही बॉक्स में रखो )',
            content : {
                audio   : './bg.mp3',
                heading : [
                    { id: 1, accept: 'm', text: 'पुल्लिंग(Masculine)' },
                    { id: 2, accept: 'f', text: 'स्त्रीलिंग(Feminine)' },
                    { id: 3, accept: 'n', text: 'नपुंसकलिंग(Neuter)' }
                ],
                options : [
                    { id: 1, ans: 'm', text: 'हंसौ' },
                    { id: 2, ans: 'f', text: 'अध्यापिके' },
                    { id: 3, ans: 'n', text: 'क्रीडनकानि' }
                ]
            }
        },        
        {
            id      : 9,
            head    : '9. MCQ',
            subhead : '(After attempting all, your report will be displayed automatically.)',
            content : {
                lang : 'hi',
                text : {
                    text : 'वर्षा ऋतु अत्यंत सुहावनी होती है। वर्षा की बूँदें गर्मी से तपती प्रकृति को शीतलता प्रदान करती हैं। बारिश होने  पर बच्चे-बड़े, पेड़-पौधे, पशु-पक्षी सभी प्रसन्नता से झूम उठते हैं, परंतु इस मौसम में असावधानी से हमें कई  परेशानियों का सामना करना पड़ सकता है।नीचे कुछ प्रश्न दिए गए हैं। इनके सही उत्तर चुनिए-',
                    side : 'left'
                },
                img  : {
                    path : './img/1.png',
                    side : 'left'
                },
                mcq  : [
                    {
                        question: "खेल के दौरान झगड़ा करना-",
                        options: ['बुरी बात है।', 'अच्छी बात है', 'आम बात है।', 'खास बात है।'],
                        answer: 0
                    },
                    {
                        question: "दूसरों के खिलौनों को खराब कहना-",
                        options: ['अच्छा है।', 'बुरा है।', 'बच्चों की आदत है।', 'हमारी आदत है।'],
                        answer: 1
                    },
                    {
                        question: "साथी खिलाड़ी को धमकाना और डराना-",
                        options: ['उचित है।', 'अनुचित है।', 'अच्छा है।', 'आवश्यक है।'],
                        answer: 1
                    }
                ]
            }
        },        
        {
            id : 10,
            content : {
                headings : {
                    left : 'स्तर',
                    mid  : {
                        attempted : 'किए गए प्रश्न:',
                        outof     : 'में से'
                    },
                    right : {
                        heading     : 'निर्देश',
                        instruction : [
                            'निम्नलिखित में से प्रत्येक प्रश्न में सही विकल्प चुनें।',
                            'कुल 3 स्तर (लेवल) हैं। प्रत्येक स्तर में 10 प्रश्न होंगे।',
                            'अगले स्तर पर जाने के लिए, आपको प्रत्येक प्रश्न का सही उत्तर देना होगा।',
                            'पाँच गलत प्रयासों के बाद, आप अपनी वर्तमान स्तर की रिपोर्ट देख पाएंगे।'
                        ]
                    }
                },
                levels : [
                    {
                        level : 1,
                        questions : [
                            { question: "कवि धरती के किन सपूतों को पुकारता है?", options: ["सैनिकों को", "किसान सपूतों को", "अमर सपूतों को", "बच्चों को"], answer: 3 },
                            { question: "कविता में ‘नव निर्माण’ का अर्थ है –", options: ["नया खाना बनाना", "नई इमारत बनाना", "समाज का पुनर्निर्माण करना", "नई सड़क बनाना"], answer: 3 },
                            { question: "‘उठो’ शब्द से कवि क्या करना चाहता है?", options: ["जगाना", "सुलाना", "डराना", "चुप कराना"], answer: 3 },
                            { question: "‘नव प्रात’ का अर्थ है –", options: ["नया गाँव", "नई सुबह", "नया जीवन", "नया काम"], answer: 3 },
                            { question: "‘नव’ शब्द का अर्थ क्या है?", options: ["पुराना", "रंगीन", "नया", "अधूरा"], answer: 3 },
                            { question: "‘नई स्मृति’ से कवि का क्या तात्पर्य है?", options: ["पुरानी यादें", "नई यादें", "किताबें", "फिल्में"], answer: 3 },
                            { question: "‘नव प्राण भरो’ का क्या अर्थ है?", options: ["नया भोजन", "नई ऊर्जा भरना", "नींद लेना", "अभ्यास करना"], answer: 3 },
                            { question: "कविता में मुस्कान भरने की बात कही गई है-", options: ["कवि की", "माता की", "पृथ्वी की", "युग-युग के सपनों में"], answer: 3 },
                            { question: "कविता का स्वर कैसा है?", options: ["दुखी", "प्रेरणादायक", "क्रोधित", "डरावना"], answer: 3 },
                            { question: "कविता के अंत में कवि क्या दोहराता है?", options: ["नई यादें बनाओ", "नई सोच लाओ", "पुन: नया निर्माण करो", "घर चलो"], answer: 3 }
                        ]
                    },
                    {
                        level     : 2,
                        questions : [
                            { question: "‘नव किरण है, ज्योति नई’ पंक्ति का क्या तात्पर्य है?", options: ["नया दीपक जलाना", "प्रकाश और आशा का संदेश", "बिजली का उपयोग", "सूर्य का अस्त होना"], answer: 1 },
                            { question: "‘जन-जन के जीवन में -", options: ["जीवन को फिर से कठिन बनाना", "पुनः ऊर्जा भरना", "जीवन समाप्त करना", "जीवन से ऊब जाना"], answer: 1 },
                            { question: "‘नई उमंग, नई तरंग’ का अर्थ है-", options: ["डर", "क्रोध", "उत्साह और ऊर्जा", "आलस्य"], answer: 1 },
                            { question: "‘नव स्मृति’ और ‘नव प्राण’ किनका प्रतीक हैं?", options: ["अतीत का", "पुनरुत्थान और जागरूकता का", "नींद और आराम का", "दुःख और पीड़ा का"], answer: 1 },
                            { question: "‘पुन: नया निर्माण करो’ कविता में कितनी बार आया है?", options: ["एक बार", "दो बार", "तीन बार", "चार बार"], answer: 1 },
                            { question: "कविता में ‘साँस नई’ का अर्थ क्या है?", options: ["नई हवा", "नया जीवन व आत्मविश्वास", "साँस की दवा", "साँस लेना"], answer: 1 },
                            { question: "कविता का मुख्य उद्देश्य क्या है?", options: ["मनोरंजन करना", "शिक्षा देना", "देश के विकास हेतु प्रेरित करना", "दुख बताना"], answer: 1 },
                            { question: "‘नई-नई मुस्कान भरो’ से क्या संकेत मिलता है?", options: ["लोगों को हँसाना", "सकारात्मक सोच फैलाना", "मजाक करना", "कविता सुनाना"], answer: 1 },
                            { question: "‘युग-युग के’ शब्द का क्या अर्थ है?", options: ["आज के लिए", "आने वाली पीढ़ियों के लिए", "एक ही समय के लिए", "रात के लिए"], answer: 1 },
                            { question: "कविता के किस भाव ने इसे प्रेरणास्पद बनाया है?", options: ["क्रोध", "डर", "पुनर्निर्माण और आशा", "विरोध"], answer: 1 }
                        ]
                    },
                    {
                        level     : 3,
                        questions : [
                            { question: "कविता में प्रयुक्त शैली कौन-सी है?", options: ["वर्णनात्मक", "प्रश्नोत्तरी", "आवाहनात्मक", "व्यंग्यात्मक"], answer: 2 },
                            { question: "‘धरती के अमर सपूतों’ में ‘अमर’ विशेषण का प्रयोग क्यों हुआ है?", options: ["क्योंकि वे मृत्यु से अजेय हैं", "क्योंकि वे प्रेरणास्रोत हैं", "क्योंकि वे युद्ध करते हैं", "क्योंकि वे भगवान हैं"], answer: 2 },
                            { question: "‘सपनों में मुस्कान’ डालने का क्या तात्पर्य है?", options: ["नींद में हँसना", "भविष्य के सपनों को सुंदर बनाना", "सोते समय सपना देखना", "झूठे सपने दिखाना"], answer: 2 },
                            { question: "‘नई बात’ से कवि का आशय है-", options: ["नई कहानी", "नवीन सोच व विचारधारा", "नई योजना", "अफवाह"], answer: 2 },
                            { question: "कवि के अनुसार हर बालक क्या है?", options: ["शिक्षक और छात्र", "रक्षक और पुजारी", "सैनिक और राजकुमार", "कलाकार और कवि"], answer: 2 },
                            { question: "इस कविता की संरचना किस प्रकार की है?", options: ["दोहा", "छंद मुक्त कविता", "चौपाई", "गीत"], answer: 2 },
                            { question: "‘नई-नई मुस्कान’ किसका प्रतीक है?", options: ["हास्य का", "नया जीवन व प्रसन्नता का", "उदासी का", "कार्यभार का"], answer: 2 },
                            { question: "कविता की पंक्तियों में कौन-सा काल प्रमुख है?", options: ["भूतकाल", "वर्तमान", "भविष्य", "मिश्रित काल"], answer: 2 },
                            { question: "‘पुनः’ शब्द के प्रयोग से कवि क्या दिखाना चाहता है?", options: ["एक बार प्रयास काफी है", "बार-बार प्रयास ज़रूरी है", "एक बार हार मान लो", "पुराना काफी है"], answer: 2 },
                            { question: "इस कविता से हमें कौन-सा नैतिक सन्देश मिलता है?", options: ["केवल अपने लिए जियो", "सब कुछ भगवान पर छोड़ दो", "समाज के नव निर्माण के लिए आगे आओ", "संघर्ष मत करो"], answer: 2 }
                        ]
                    }
                ]
            }
        },
        {
            id : 11,
            content : {
                desc : "audio description",
                src  : "https://swaadhyayan.com/data/learningContent/3/Hindi/video/cca24b220e4c0b05f1b84310b587da95.mp4",
            }
        },
        {
            id      : 12,
            head    : '12. नीचे दिए गए वाक्यों में रिक्त स्थानों की पूर्ति सही शब्द चुनकर कीजिए :-',
            content : {
                lang        : 'hi',
                replacement : '#_#',
                questions   : [
                    { text: "(क) सितार के लिए #_# खोखला किया गया।", options: ["लकड़ी","कद्दू","धातु"], answer: "कद्दू" },
                    { text: "(ख) सितार की लकड़ी में ताँबा #_# जोड़ा गया।", options: ["तार","ताँबा","धातु"], answer: "तार" },
                    { text: "(ग) #_# ने अपने कौशल से सितार को सजाया।", options: ["कारीगर","कवि","विद्यार्थी"], answer: "कारीगर" },
                    { text: "(घ) सितार से #_# आवाज़ निकलने लगी।", options: ["मधुर","तेज़","भारी"], answer: "मधुर" },
                    { text: "(ङ) इस कविता के कवि का नाम #_# है।", options: ["निराला","सुभद्राकुमारी चौहान","प्रसाद"], answer: "निराला" }
                ]
            }
        },
        {
            id      : 13,
            head    : '13. उचित सर्वनाम शब्दों पर क्लिक करो - ',
            mode    : 'single',
            lang    : 'hi',
            content : [
                { id: 1, label: "(क)", text: "दादा जी के लिए - तू, आप, तुम", answer: "आप" },
                { id: 2, label: "(ख)", text: "अध्यापक जी के लिए - आप, वह, तुम", answer: "आप" },
                { id: 3, label: "(ग)", text: "नानी जी के लिए - आप, तू, तुम", answer: "आप" },
                { id: 4, label: "(घ)", text: "माँ के लिए - आप, वह, तुम", answer: "आप" },
                { id: 5, label: "(ड)", text: "बड़े भाई के लिए - आप, तू, तुम", answer: "आप" },
                { id: 6, label: "(च)", text: "पिता जी के लिए - आप, वह, तुम", answer: "आप" },
                { id: 7, label: "(छ)", text: "छोटी बहन के लिए - तुम, तू, आप", answer: "तुम" },
            ]
        },
        {
            id      : 14,
            head    : 'अनोखा जादू का खेल',
            subhead : 'वाक्यांश को ध्यान से सुनकर उनके लिए प्रयुक्त किए जाने वाले एक शब्द के सही क्रमसंख्या को लिखो-',
            lang    : 'hi',
            content : {
                questions : [
                    { id: 1, text: 'लेखक', ans: 4, popuptext: 'जो पुस्तकें लिखता है' },
                    { id: 2, text: 'चिकित्सक', ans: 3, popuptext: 'जो मरीज़ों का इलाज़ करता है' },
                    { id: 3, text: 'अध्यापक', ans: 1, popuptext: 'जो पढ़ाता है' },
                    { id: 4, text: 'धोबी', ans: 6, popuptext: 'जो कपड़े धोता है' },
                    { id: 5, text: 'कुम्हार', ans: 2, popuptext: 'जो मिट्टी के बर्तन बनाता है' },
                    { id: 6, text: 'दरज़ी', ans: 5, popuptext: 'जो कपड़े सिलता है' }
                ],
                audio : {
                    headsrc : './audio/heading.mp3',
                    options : [
                        { id : 1, src : './audio/1.mp3' },
                        { id : 2, src : './audio/2.mp3' },
                        { id : 3, src : './audio/3.mp3' },
                        { id : 4, src : './audio/4.mp3' },
                        { id : 5, src : './audio/5.mp3' },
                        { id : 6, src : './audio/6.mp3' },
                    ]
                }
            }
        },
        {
            id      : 15,
            head    : '15. नीचे दिए गए वाक्यों को पढ़कर सही/गलत में से सही उत्तर चुनिएः-',
            subhead : '',
            lang    : 'hi',
            content : [
                {
                    question: "सितार बनाने के लिए लुहार ने पेड़ से लकड़ी काटी।",
                    answer: false,
                },
                {
                    question: "सितार में लगाने के लिए सूखा तँूबा खोखला किया गया।",
                    answer: true
                },
                {
                    question: "सितार में छह तार लगाए गए",
                    answer: false
                },
                {
                    question: "कोयल गा-गाकर झूमने लगी, जब कोयल के लिए सितार बन गया।",
                    answer: false
                },
                {
                    question: "कोयल ने अपने पंख से सितार बजाया।",
                    answer: true
                }
            ]
        }, 
    ];

    const questionContainer = '.question-container';
    const head    = 'qNum';
    const subHead = 'questionText';

    const store = {
        head,
        buttons,
        subHead,        
        questions,
        questionContainer
    };

    (async () => {
        const scriptPath = 'js/newActJS';
        
        const loadScript = (src) =>
            new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = src;
                s.onload = resolve;
                s.onerror = reject;
                document.body.appendChild(s);
            });

        await loadScript(`${scriptPath}/modules.js`);
        await loadScript(`${scriptPath}/templates.js`);
        await loadScript(`${scriptPath}/ui.js`);
    })();

    const get = (key) => store[key];

    return { get };
})();
