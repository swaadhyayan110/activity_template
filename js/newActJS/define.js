const Define = (() => {

    /*
        ==============
        Language Codes
        --------------
        en : "English"
        hi : "हिन्दी"
        ==============
    */

    // DEFINE BUTTONS
    const buttons = [
        { qid : 1, text : ['Q-1', 'Match-1'], module : 1, landscape : true },
        { qid : 2, text : ['Q-2', 'Match-2'], module : 2 },
        { qid : 3, text : ['Q-3', 'Match-3'], module : 3 },
        { qid : 4, text : ['Q-4', 'Fill-1'], module : 4 },
        { qid : 5, text : ['Q-5','Fill-2'], module : 5 },
        { qid : 6, text : ['Q-6', 'Jumble-Letter'], module : 6 },
        { qid : 7, text : ['Q-7', 'Jumble-Word'], module : 7 },
        { qid : 8, text : ['Q-8', 'MCQ-1'], module : 9 },
        { qid : 9, text : ['Q-9', 'MCQ-2'], module : 9 },
        { qid : 10, text : ['Q-10', 'MCQ-3'], module : 9 },
        { qid : 11, text : ['Q-11', 'Adaptiv'], module : 10 },
        { qid : 12, text : ['Q-12', 'Audio'], module : 11 },
        { qid : 13, text : ['DD', 'Drop Down'], module : 12 },
        { qid : 14, text : ['Q-14', 'Circle'], module : 13 },
        { qid : 15, text : ['Q-15','श्रवण कौशल'], module : 14 },
        { qid : 16, text : ['Q-16', 'T&F'], module : 15 },
        { qid : 17, text : ['Q-17', 'DND-1'], module : 8 },
        { qid : 18, text : ['Q-18', 'DND-2'], module : 16 },
        { qid : 19, text : ['Q-19', 'DND-3'], module : 16 },
        { qid : 20, text : ['Q-20', 'DND-4'], module : 16 },
        { qid : 21, text : ['Q-21', 'DND-5'], module : 16 },
        { qid : 22, text : ['Q-22', 'DND-6'], module : 17 },
        { qid : 23, text : ['Q-23', 'PDF'], module : 18 },
        { qid : 24, text : ['Q-24', 'Shabdkosh'], module : 19 },
        { qid : 25, text : ['Q-25', 'Shrutlekh'], module : 20 },
        { qid : 26, text : ['Q-26', 'WordSearch'], module : 21 },
        { qid : 27, text : ['Q-27', 'TextArea'], module : 22 },
        { qid : 28, text : ['Q-28', 'CrossWord'], module : 23 },
        { qid : 29, text : ['Q-29', 'ShravanKaushalWithPara'], module : 24 },
        { qid : 30, text : ['Q-30', 'ShravanKaushalWithoutPara'], module : 24 },
        { qid : 31, text : ['Q-31', 'VideoPlayer'], module : 25 },
        { qid : 32, text : ['Q-32', 'Rachnatmak_Para-1'], module : 26 },
        { qid : 33, text : ['Q-33', 'Rachnatmak_Inputs&Images-2'], module : 27 },
        { qid : 34, text : ['Q-34', 'Rachnatmak_Tab_Btns-3'], module : 28 },
        { qid : 35, text : ['Q-35', 'Rachnatmak_multi_Inputs-4'], module : 29 },
        { qid : 36, text : ['Q-36', 'ClickOnImage'], module : 30 },
        { qid : 37, text : ['Q-37', 'FillOnClick'], module : 31 },
        { qid : 38, text : ['Q-38', 'Dictionary'], module : 32 },
        { qid : 39, text : ['Q-39', 'MentalMath'], module : 33 },
    ];

    // DEFINE QUESTIONS
    const questions = [
        {
            id      : 1,
            lang    : 'en',
            head    : 'Module : 1',
            subhead : 'Look at the expression eye-opener in your textbook. Now join the expression to its idiom.',
            content : [
                { id: 1, left: 'Bird\'s&nbsp;<u>eye</u>&nbsp;view', right: 'Seen from above, as a bird does' },
                { id: 2, left: 'Feast for the eyes', right: 'To look with great enjoyment' },
                { id: 3, left: { path : 'img/1.png', width : '40px' }, right: 'To be very attentive' },
                { id: 4, left: 'Apple of someone\'s eye', right: 'To be a favourite or loved one of someone' },
                { id: 5, left: 'Catch someone\'s eye', right: { path : 'img/2.png', width : '10%' } },
                { id: 6, left: 'Be an eye-opener', right: 'To understand something' }
            ]
        },
        {
            id      : 2,
            lang    : 'hi',
            head    : 'Module : 2',
            subhead : 'Look at the expression eye-opener in your textbook. Now join the expression to its idiom.',
            content : {
                col1: [
                    { id: 1, img: 'img/1.png', width : '80%' },
                    { id: 2, text: 'img/2.png' },
                    { id: 3, img: 'img/3.png' },
                ],
                col2: [
                    { id: 1, text: 'जादू दिखाना' },
                    { id: 2, text: 'पत्र बाँटना' },
                    { id: 3, img: 'img/2.png' },
                    { id: 4, text: 'रखवाली करना' },
                    { id: 5, text: 'पढ़ाना' },
                    { id: 6, text: 'खेती करना' },
                ],
                col3: [
                    { id: 1, img: 'img/4.png' },
                    { id: 2, text: 'img/5.png' },
                    { id: 3, img: 'img/6.png' },
                ],
                correctLeft: { 1: 5, 2: 4, 3: 3 },
                correctRight: { 1: 6, 2: 1, 3: 2 }
            },
        },
        {
            id      : 3,
            lang    : 'hi',
            head    : 'Module : 3',
            subhead : 'Look at the expression eye-opener in your textbook. Now join the expression to its idiom.',
            content : [
                { id: 1, top: 'Bird\'s eye view', bottom: 'To understand something' },
                { id: 2, top: 'Feast for the eyes', bottom: 'Be noticed by someone' },
                { id: 3, top: 'All eyes and ears', bottom: 'To be very attentive' },
                { id: 4, top: 'Apple of someone\'s eye', bottom: 'Seen from above' },
                { id: 5, top: 'Catch someone\'s eye', bottom: 'To be a favourite or loved' }
            ]
        },
        {
            id      : 4,
            lang    : 'en',
            head    : 'Module : 4',
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
                    { img : 'img/ch4_2.png', ans : 'Settlement' },
                    { img : 'img/ch4_3.png', ans : 'Forest' },
                    { img : 'img/ch4_4.png', ans : 'Places of Worship' },	
                    { img : 'img/ch4_5.png', ans : 'River' },
                    { img : 'img/ch4_6.png', ans : 'Pond' },
                    { img : 'img/ch4_7.png', ans : 'Metalled Road' },
                    { img : 'img/ch4_8.png', ans : 'Unmetalled road' },
                    { img : 'img/ch4_9.png', ans : 'Broad Gauge Railway Line' },
                    { img : 'img/ch4_10.png', ans : 'Railway Crossing' },
                    { img : 'img/ch4_12.png', ans : 'Restaurant' },
                    { img : 'img/ch4_13.png', ans : 'Police Station' },
                    { img : 'img/ch4_14.png', ans : 'Bridge' }
                ]
            }
        },
        {
            id      : 5,
            lang    : 'hi',
            head    : 'Module : 5',
            content : {
                replacement : '#_#',
                questions   : [
                    { question : 'हमारे #_# देश का नाम #_# है।', answers : ['भारत', 'भारत'] },
                    { question : 'भारत की राजधानी #_# है।', answers : ['दिल्ली'] },
                    { question : 'भारत की राजभाषा #_# है।', answers : ['हिंदी'] },
                    { question : 'बच्चों को पढ़ने के लिए #_# चाहिए।', answers : ['किताब'] },
                    { question : 'जहाँ पढ़ाई होती है उसे #_# कहते हैं।', answers : ['विद्यालय'] }
                ]
            }
        },
        {
            id      : 6,
            lang    : 'hi',
            head    : 'Module : 6',
            subhead : 'text..',
            content : [
                'SCHOOL', 'TEACHER', 'STUDENT', 'BOOK', 
                'CLASS', 'COLLEGE', 'EXAM', 'LEARN', 'STUDY'
            ]
        },
        {
            id      : 7,
            lang    : 'en',
            head    : 'Module : 7',
            subhead : 'text ...',
            content : [
                'A short, statement expressing an opinion.',
                'A stance where both feet are placed in line, often used for balance.',
                'Actions speak louder than words.',
                'A picture is worth a thousand words.',
                'Practice makes perfect.',
                'Better late than never.',
                'Knowledge is power.',
                'Honesty is the best policy.'
            ]
        },            
        {
            id      : 8,
            lang    : 'hi',
            head    : 'Module : 9, Text Only',
            content : {
                mcq  : [
                    {
                        question : {                            
                            text : 'दूसरों के खिलौनों को खराब कहना'
                        },
                        options  : [
                            { text : 'बात बात है' },
                            { text : 'अच्छी बात है' },
                            { text : 'आम बात है।'},
                            { text : 'खास बात है।' }
                        ],
                        answer   : 0
                    },
                    {
                        question: {
                            text : 'दूसरों के खिलौनों को खराब कहना-'
                        },                        
                        options  : [
                            { text : 'अच्छा है।' },
                            { text : 'अच्छी बात है' },
                            { text : 'आम बात है।'},
                            { text : 'खास बात है।' }
                        ],
                        answer: 1
                    },
                    {
                        question: {
                            text : 'साथी खिलाड़ी को धमकाना और डराना-'
                        },
                        options  : [
                            { text : 'अच्छा है।' },
                            { text : 'अच्छी बात है' },
                            { text : 'आम बात है।'},
                            { text : 'खास बात है।' }
                        ],
                        answer: 1
                    }
                ]
            }
        },
        {
            id      : 9,
            lang    : 'hi',
            head    : 'Module : 9, Path Ka Saar/Naitik Shiksha',
            content : {
                text : {
                    text : 'वर्षा ऋतु अत्यंत सुहावनी होती है। वर्षा की बूँदें गर्मी से तपती प्रकृति को शीतलता प्रदान करती हैं। बारिश होने  पर बच्चे-बड़े, पेड़-पौधे, पशु-पक्षी सभी प्रसन्नता से झूम उठते हैं, परंतु इस मौसम में असावधानी से हमें कई  परेशानियों का सामना करना पड़ सकता है।नीचे कुछ प्रश्न दिए गए हैं। इनके सही उत्तर चुनिए-',
                    side : 'left'
                },
                img  : {
                    width : '35%',
                    path  : 'img/1.png'
                }
            }
        },
        {
            id      : 10,
            lang    : 'hi',
            head    : 'Module : 9, With Option images',
            content : {
                img  : {
                    width : '15%',
                    path  : 'img/1.png',
                    imageclass : 'text-center'
                },
                mcq  : [
                    {
                        imageaboveoption : {
                            image : 'img/2.png',
                            width : '10%'
                        },
                        question : {
                            image       : 'img/4.png',
                            replacement : '#_#',
                            text        : 'दूसरों के खिलौनों को खराब #_# कहना'
                        },
                        options  : [
                            { image : 'img/5.png' },
                            { image : 'img/6.png' },
                            { image : 'img/1.png'},
                            { text  : 'none of these' }
                        ],
                        answer   : 0
                    },
                    {
                        question: {
                            text : 'दूसरों के खिलौनों को खराब कहना-'
                        },                        
                        options  : [
                            { text : 'अच्छा है।' },
                            { text : 'अच्छी बात है' },
                            { text : 'आम बात है।'},
                            { text : 'खास बात है।' }
                        ],
                        answer: 1
                    },
                    {
                        question: {
                            text : 'साथी खिलाड़ी को धमकाना और डराना-'
                        },
                        options  : [
                            { text : 'अच्छा है।' },
                            { text : 'अच्छी बात है' },
                            { text : 'आम बात है।'},
                            { text : 'खास बात है।' }
                        ],
                        answer: 1
                    }
                ]
            }
        },
        {
            id      : 11,
            lang    : 'hi',
            content : {
                skiplevels : true,
                skipanswerbutton : true,
                skipnextlevel : true,
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
                            { question: 'कवि धरती के किन सपूतों को पुकारता है?', options: ['सैनिकों को', 'किसान सपूतों को', 'अमर सपूतों को', 'बच्चों को'], answer: 3 },
                            { question: 'कविता में ‘नव निर्माण’ का अर्थ है -', options: ['नया खाना बनाना', 'नई इमारत बनाना', 'समाज का पुनर्निर्माण करना', 'नई सड़क बनाना'], answer: 3 },
                            { question: '‘उठो’ शब्द से कवि क्या करना चाहता है?', options: ['जगाना', 'सुलाना', 'डराना', 'चुप कराना'], answer: 3 },
                            { question: '‘नव प्रात’ का अर्थ है -', options: ['नया गाँव', 'नई सुबह', 'नया जीवन', 'नया काम'], answer: 3 },
                            { question: '‘नव’ शब्द का अर्थ क्या है?', options: ['पुराना', 'रंगीन', 'नया', 'अधूरा'], answer: 3 },
                            { question: '‘नई स्मृति’ से कवि का क्या तात्पर्य है?', options: ['पुरानी यादें', 'नई यादें', 'किताबें', 'फिल्में'], answer: 3 },
                            { question: '‘नव प्राण भरो’ का क्या अर्थ है?', options: ['नया भोजन', 'नई ऊर्जा भरना', 'नींद लेना', 'अभ्यास करना'], answer: 3 },
                            { question: 'कविता में मुस्कान भरने की बात कही गई है-', options: ['कवि की', 'माता की', 'पृथ्वी की', 'युग-युग के सपनों में'], answer: 3 },
                            { question: 'कविता का स्वर कैसा है?', options: ['दुखी', 'प्रेरणादायक', 'क्रोधित', 'डरावना'], answer: 3 },
                            { question: 'कविता के अंत में कवि क्या दोहराता है?', options: ['नई यादें बनाओ', 'नई सोच लाओ', 'पुन: नया निर्माण करो', 'घर चलो'], answer: 3 }
                        ]
                    },
                    {
                        level     : 2,
                        questions : [
                            { question: '‘नव किरण है, ज्योति नई’ पंक्ति का क्या तात्पर्य है?', options: ['नया दीपक जलाना', 'प्रकाश और आशा का संदेश', 'बिजली का उपयोग', 'सूर्य का अस्त होना'], answer: 1 },
                            { question: '‘जन-जन के जीवन में -', options: ['जीवन को फिर से कठिन बनाना', 'पुनः ऊर्जा भरना', 'जीवन समाप्त करना', 'जीवन से ऊब जाना'], answer: 1 },
                            { question: '‘नई उमंग, नई तरंग’ का अर्थ है-', options: ['डर', 'क्रोध', 'उत्साह और ऊर्जा', 'आलस्य'], answer: 1 },
                            { question: '‘नव स्मृति’ और ‘नव प्राण’ किनका प्रतीक हैं?', options: ['अतीत का', 'पुनरुत्थान और जागरूकता का', 'नींद और आराम का', 'दुःख और पीड़ा का'], answer: 1 },
                            { question: '‘पुन: नया निर्माण करो’ कविता में कितनी बार आया है?', options: ['एक बार', 'दो बार', 'तीन बार', 'चार बार'], answer: 1 },
                            { question: 'कविता में ‘साँस नई’ का अर्थ क्या है?', options: ['नई हवा', 'नया जीवन व आत्मविश्वास', 'साँस की दवा', 'साँस लेना'], answer: 1 },
                            { question: 'कविता का मुख्य उद्देश्य क्या है?', options: ['मनोरंजन करना', 'शिक्षा देना', 'देश के विकास हेतु प्रेरित करना', 'दुख बताना'], answer: 1 },
                            { question: '‘नई-नई मुस्कान भरो’ से क्या संकेत मिलता है?', options: ['लोगों को हँसाना', 'सकारात्मक सोच फैलाना', 'मजाक करना', 'कविता सुनाना'], answer: 1 },
                            { question: '‘युग-युग के’ शब्द का क्या अर्थ है?', options: ['आज के लिए', 'आने वाली पीढ़ियों के लिए', 'एक ही समय के लिए', 'रात के लिए'], answer: 1 },
                            { question: 'कविता के किस भाव ने इसे प्रेरणास्पद बनाया है?', options: ['क्रोध', 'डर', 'पुनर्निर्माण और आशा', 'विरोध'], answer: 1 }
                        ]
                    },
                    {
                        level     : 3,
                        questions : [
                            { question: 'कविता में प्रयुक्त शैली कौन-सी है?', options: ['वर्णनात्मक', 'प्रश्नोत्तरी', 'आवाहनात्मक', 'व्यंग्यात्मक'], answer: 2 },
                            { question: '‘धरती के अमर सपूतों’ में ‘अमर’ विशेषण का प्रयोग क्यों हुआ है?', options: ['क्योंकि वे मृत्यु से अजेय हैं', 'क्योंकि वे प्रेरणास्रोत हैं', 'क्योंकि वे युद्ध करते हैं', 'क्योंकि वे भगवान हैं'], answer: 2 },
                            { question: '‘सपनों में मुस्कान’ डालने का क्या तात्पर्य है?', options: ['नींद में हँसना', 'भविष्य के सपनों को सुंदर बनाना', 'सोते समय सपना देखना', 'झूठे सपने दिखाना'], answer: 2 },
                            { question: '‘नई बात’ से कवि का आशय है-', options: ['नई कहानी', 'नवीन सोच व विचारधारा', 'नई योजना', 'अफवाह'], answer: 2 },
                            { question: 'कवि के अनुसार हर बालक क्या है?', options: ['शिक्षक और छात्र', 'रक्षक और पुजारी', 'सैनिक और राजकुमार', 'कलाकार और कवि'], answer: 2 },
                            { question: 'इस कविता की संरचना किस प्रकार की है?', options: ['दोहा', 'छंद मुक्त कविता', 'चौपाई', 'गीत'], answer: 2 },
                            { question: '‘नई-नई मुस्कान’ किसका प्रतीक है?', options: ['हास्य का', 'नया जीवन व प्रसन्नता का', 'उदासी का', 'कार्यभार का'], answer: 2 },
                            { question: 'कविता की पंक्तियों में कौन-सा काल प्रमुख है?', options: ['भूतकाल', 'वर्तमान', 'भविष्य', 'मिश्रित काल'], answer: 2 },
                            { question: '‘पुनः’ शब्द के प्रयोग से कवि क्या दिखाना चाहता है?', options: ['एक बार प्रयास काफी है', 'बार-बार प्रयास ज़रूरी है', 'एक बार हार मान लो', 'पुराना काफी है'], answer: 2 },
                            { question: 'इस कविता से हमें कौन-सा नैतिक सन्देश मिलता है?', options: ['केवल अपने लिए जियो', 'सब कुछ भगवान पर छोड़ दो', 'समाज के नव निर्माण के लिए आगे आओ', 'संघर्ष मत करो'], answer: 2 }
                        ]
                    }
                ]
            }
        },
        {
            id      : 12,
            lang    : 'hi',
            content : {
                desc : 'audio description',
                src  : 'https://swaadhyayan.com/data/learningContent/3/Hindi/video/cca24b220e4c0b05f1b84310b587da95.mp4',
            }
        },
        {
            id      : 13,
            lang    : 'hi',
            head    : 'Module : 12, Drop Down',
            content : {                
                replacement : '#_#',
                questions   : [
                    { text: '(क) सितार के लिए #_# खोखला किया गया।', options: ['लकड़ी','कद्दू','धातु'], answer: 'कद्दू' },
                    { text: '(ख) सितार की लकड़ी में ताँबा #_# जोड़ा गया।', options: ['तार','ताँबा','धातु'], answer: 'तार' },
                    { text: '(ग) #_# ने अपने कौशल से सितार को सजाया।', options: ['कारीगर','कवि','विद्यार्थी'], answer: 'कारीगर' },
                    { text: '(घ) सितार से #_# आवाज़ निकलने लगी।', options: ['मधुर','तेज़','भारी'], answer: 'मधुर' },
                    { text: '(ङ) इस कविता के कवि का नाम #_# है।', options: ['निराला','सुभद्राकुमारी चौहान','प्रसाद'], answer: 'निराला' }
                ]
            }
        },
        {
            id      : 14,
            lang    : 'hi',
            head    : 'Module : 13, Circle ',
            mode    : 'single',
            content : [
                { id: 1, text: 'दादा जी के लिए - तू, आप, तुम', answer: 'आप' },
                { id: 2, text: 'अध्यापक जी के लिए - आप, वह, तुम', answer: 'आप' },
                { id: 3, text: 'नानी जी के लिए - आप, तू, तुम', answer: 'आप' },
                { id: 4, text: 'माँ के लिए - आप, वह, तुम', answer: 'आप' },
                { id: 5, text: 'बड़े भाई के लिए - आप, तू, तुम', answer: 'आप' },
                { id: 6, text: 'पिता जी के लिए - आप, वह, तुम', answer: 'आप' },
                { id: 7, text: 'छोटी बहन के लिए - तुम, तू, आप', answer: 'तुम' },
            ]
        },
        {
            id      : 15,
            lang    : 'hi',
            head    : 'Module : 14',
            subhead : 'वाक्यांश को ध्यान से सुनकर उनके लिए प्रयुक्त किए जाने वाले एक शब्द के सही क्रमसंख्या को लिखो-',
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
            id      : 16,
            lang    : 'en',
            head    : 'Module : 15',
            content : [
                {
                    question: 'सितार बनाने के लिए लुहार ने पेड़ से लकड़ी काटी।',
                    answer: false,
                },
                {
                    question: 'सितार में लगाने के लिए सूखा तँूबा खोखला किया गया।',
                    answer: true
                },
                {
                    question: 'सितार में छह तार लगाए गए',
                    answer: false
                },
                {
                    question: 'कोयल गा-गाकर झूमने लगी, जब कोयल के लिए सितार बन गया।',
                    answer: false
                },
                {
                    question: 'कोयल ने अपने पंख से सितार बजाया।',
                    answer: true
                }
            ]
        },
        {
            id      : 17,
            lang    : 'hi',
            head    : 'Module : 8',
            subhead : '( शब्दों को सुनकर लिंगानुसार सही बॉक्स में रखो )',
            content : {
                shuffle : false,
                audio   : './bg.mp3',
                col     : {
                    md : 4,
                    sm : 4,
                    om : 4
                },
                heading : [
                    { id: 1, accept: 'm', text: 'पुल्लिंग(Masculine)' },
                    { id: 2, accept: 'f', text: 'स्त्रीलिंग(Feminine)' },
                    { id: 3, accept: 'n', text: 'नपुंसकलिंग(Neuter)' }
                ],
                options : [
                    { id: 1, ans: 'm', text: 'हंसौ' },
                    { id: 2, ans: 'f', text: 'अध्यापिके' },
                    { id: 3, ans: 'n', text: 'क्रीडनकानि' },
                    { id: 4, ans: 'm', text: 'हंसौक्री' },
                    { id: 4, ans: 'm', text: 'अध्याकानि' },
                ]
            }
        },
        {
            id      : 18,
            lang    : 'hi',
            head    : 'Module : 16',            
            content : {
                shuffle     : false,
                strictMatch : false,
                replacement : '#_#',
                addOptions  : [ 'op1', 'op2', 'op3', 'op1' ],
                questions   : [
                    { text: 'सितार बनने पर कोयल #_# नचाकर #_# नाचने लगी।', options: ['पंख', 'नाचने'] },
                    { text: 'सितार के सुर #_# में गूँजने लगे।', options: ['जंगल'] },
                    { text: 'सितार पर खाली जगह पर #_# की गई।', options: ['नक्काषी'] },
                    { text: 'सितार बनाने के लिए तारों को #_# से बाँधा गया।', options: ['खूँटी'] },
                    { text: 'कोयल ने सितार को बड़े ही #_# से पकड़ा।', options: ['जतन'] }
                ]
            }
        },
        {
            id      : 19,
            lang    : 'hi',
            head    : 'Module : 16',            
            content : {
                shuffle     : false,
                strictMatch : true,
                replacement : '#_#',
                option_side : 'right',
                questions   : [
                    { text: 'सितार बनने पर कोयल #_# नचाकर नाचने लगी।', options: ['पंख', 'नाचने'], answer : 1 },
                    { text: 'सितार के सुर #_# में गूँजने लगे।', options: ['जंगल', 'पंखूँटी'], answer : 0 },
                    { text: 'सितार पर खाली जगह पर #_# की गई।', options: ['नक्काषी', 'पंखूँटी'], answer : 1 },
                    { text: 'सितार बनाने के लिए तारों को #_# से बाँधा गया।', options: ['खूँटी', 'पंखूँटी'], answer : 0 },
                    { text: 'कोयल ने सितार को बड़े ही #_# से पकड़ा।', options: ['जतन', 'पंखूँटी'], answer : 1 }
                ]
            }
        },
        {
            id      : 20,
            lang    : 'hi',
            head    : 'Module : 16',
            content : {
                shuffle     : false,
                strictMatch : false,
                replacement : '#_#',
                col         : { col : 3, md : 4, sm : 12 },
                questions   : [
                    { text: '#_#, #_#', image : 'img/1.png', width : '25%', options: ['पंख', 'नाचने'] },
                    { text: '#_#, #_#', image : 'img/2.png', options: ['जंगल', 'पंखूँटी'] },
                    { text: '#_#, #_#', image : 'img/4.png', options: ['नक्काषी', 'पंखूँटी'] }
                ]
            }
        },
        {
            id      : 21,
            lang    : 'hi',
            head    : 'Module : 16',
            content : {
                set : {
                    answers : [ 'पंख', 'जंगल', 'नक्काषी' ],
                    options : [ 'पंख', 'जंगल', 'नक्काषी', 'नाचने', 'पंखूँटी', 'पंख' ],
                }
            }
        },
        {
            id      : 22,
            lang    : 'en',
            head    : 'Module : 17',
            content : {
                sequence : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday' ],
            }
        },
        {
            id      : 23,
            lang    : 'en',
            content : {
                pdf : 'pdf.pdf',
                download : false
            }
        },
        {
            id      : 24,
            lang    : 'en',
            head    : 'Module : 19',
            subhead : 'वाक्यांश को ध्यान से सुनकर उनके लिए प्रयुक्त किए जाने वाले एक शब्द के सही क्रमसंख्या को लिखो-',
            content : [
                {
                    id       : 1,
                    tabtitle : 'aPPle',
                    meaning  : 'कूद-कूदकर',
                    sentence : 'छोटी चिड़ियाँ appleing चलना सीखती हैं। appleing',
                    image    : {
                        path  : 'img/1.png',
                        width : '20%'
                    }
                },
                {
                    id       : 2,
                    tabtitle : 'कूद-कूदकर',
                    meaning  : 'कूद-कूदकर',
                    sentence : 'छोटी चिड़ियाँ कूद-कूदकरकू चलना सीखती हैं।'
                }
            ]
        },
        {
            id      : 25,
            lang    : 'en',
            content : {
                questions : [
                    { audio : './audio/1.mp3', answer: '1' },
                    { audio : './audio/2.mp3', answer: '2' },
                    { audio : './audio/3.mp3', answer: '3' },
                    { audio : './audio/4.mp3', answer: '4' },
                    { audio : './audio/5.mp3', answer: '5' },
                    { audio : './audio/6.mp3', answer: '6' },
                ]
            }
        },
        {
            id      : 26,
            lang    : 'en',
            head    : 'Module : 21',
            content : [
                { 
                    text   : 'A drawing of Earth on a flat surface (3 letters)',
                    answer : 'Map',
                    row    : 0, 
                    col    : 0,
                    direction : 'h'
                },
                { 
                    text   : 'Spherical model of Earth (5 letters)',
                    answer : 'Globe',
                    row    : 15,
                    col    : 6,
                    direction : 'h'
                },
                { 
                    text   : 'Ratio between map & ground distance (5 letters)',
                    answer : 'Scale',
                    row    : 4, 
                    col    : 0,
                    direction : 'h'
                },
                { 
                    text   : 'Angular distance north or south of Equator (8 letters)',
                    answer : 'Latitude',
                    row    : 0, 
                    col    : 8,
                    direction : 'v'
                },
                { 
                    text   : 'Angular distance east or west of Prime Meridian (9 letters)',
                    answer : 'Longitude',
                    row    : 0, 
                    col    : 12,
                    direction : 'v'
                },
                { 
                    text   : 'Network of latitude & longitude (4 letters)',
                    answer : 'Grid',
                    row    : 8, 
                    col    : 0,
                    direction : 'h'
                },
                { 
                    text   : 'Magnetic needle tool (7 letters)',
                    answer : 'Compass',
                    row    : 10, 
                    col    : 0,
                    direction : 'h'
                },
                { 
                    text   : 'A conventional sign (6 letters)',
                    answer : 'Symbol',
                    row    : 12, 
                    col    : 0,
                    direction : 'h'
                },
                { 
                    text   : '0° latitude dividing hemispheres (7 letters)',
                    answer : 'Equator',
                    row    : 6, 
                    col    : 0,
                    direction : 'h'
                },
                { 
                    text   : 'North-south line measuring longitude (8 letters)',
                    answer : 'Meridian',
                    row    : 2, 
                    col    : 14,
                    direction : 'v'
                },
            ]
        },
        {
            id      : 27,
            lang    : 'hi',
            head    : 'Module : 22',
            content : {
                replacement : '#_#',
                questions   : [
                    { text: 'किस महापुरुष के जन्मदिन को बाल-दिवस के रूप में मनाया जाता है? <br> #_#', answer: 'जछ' },
                    { text: 'नेहरू जी ने अपने जन्मदिन को बच्चों के जन्मदिन के रूप में मनाना क्यों स्वीकार कर लिया था? <br> #_#', answer: 'ज' }
                ]
            }
        },            
        {
            id      : 28,
            lang    : 'en',
            head    : 'Module : 23',
            content : {
                questions : [
                    { sequence : 1, direction : 'v', row : [1, 15], col : [20], question: 'Fossil scientists', answer : 'paLEONTOLOGISTS' },
                    { sequence : 2, direction : 'v', row : [3, 9], col : [6], question: 'Coins, tools, art', answer : 'SOURCES' },
                    { sequence : 3, direction : 'h', row : [4], col : [1, 14], question: 'Scientist who studies humans', answer : 'ANTHROPOLOGIST' },
                    { sequence : 4, direction : 'v', row : [4, 10], col : [13], question: 'Biographies, plays etc', answer : 'SECULAR' },
                    { sequence : 5, direction : 'v', row : [4, 12], col : [22], question: 'Study of Earth\'s history', answer : 'GEOLOGIST' },
                    { sequence : 6, direction : 'h', row : [6], col : [5, 15], question: 'Oral accounts from relatives', answer : 'ORALSOURCES' },
                    { sequence : 7, direction : 'v', row : [8, 14], col : [9], question: 'Facts in time order', answer : 'HISTORY' },
                    { sequence : 8, direction : 'v', row : [8, 16], col : [25], question: 'Legends & folk stories', answer : 'FOLKLORES' },
                    { sequence : 9, direction : 'h', row : [9], col : [2, 11], question: 'Old handwritten record', answer : 'MANUSCRIPT' },
                    { sequence : 10, direction : 'h', row : [10], col : [12, 25], question: 'Remains to study past life', answer : 'ARCHAEOLOGICAL' },
                ]
            }
        },
        {
            id      : 29,
            lang    : 'hi',
            head    : 'Module : 24 ---',
            content : {
                main: {
                    text: {
                        text: `करता था शैतानी दिनभर, गिरकर लगती चोट मुझे, होते घरवाले सब परेशान। समझ न आती उनकी बात, जितना मचाता तूफ़ान मैं, घर के होते खुश सब लोग।करता था शैतानी दिनभर, गिरकर लगती चोट मुझे, होते घरवाले सब परेशान। समझ न आती उनकी बात, जितना मचाता तूफ़ान मैं, घर के होते खुश सब लोग।करता था शैतानी दिनभर, गिरकर लगती चोट मुझे, होते घरवाले सब परेशान। समझ न आती उनकी बात, जितना मचाता तूफ़ान मैं, घर के होते खुश सब लोग।करता था शैतानी दिनभर, गिरकर लगती चोट मुझे, होते घरवाले सब परेशान। समझ न आती उनकी बात, जितना मचाता तूफ़ान मैं, घर के होते खुश सब लोग।करता था शैतानी दिनभर, गिरकर लगती चोट मुझे, होते घरवाले सब परेशान। समझ न आती उनकी बात, जितना मचाता तूफ़ान मैं, घर के होते खुश सब लोग।`,
                        side: 'bottom'
                    },
                    img: {
                        width: `20%`,
                        path: `img/ch4_1.png`,
                    },
                    audio: 'audio/heading.mp3',
                },
                questions: [
                    {
                        question: {
                            text: 'बच्चों की किन बातों से घर के लोग खुश होते हैं?',
                            image: 'img/ch4_1.png',
                            audio: 'audio/1.mp3'
                        },
                        options: [
                            { text: 'खेल-कूद में तूफ़ान मचाने पर' },
                            { text: 'खूब सोते रहने से', },
                            { text: 'हर बात में ज़िद करने से', image: 'img/ch4_1.png' },
                            { text: 'इनमें से कोई नहीं ', image: 'img/ch4_1.png' }
                        ],
                        answer: 0
                    },
                    {
                        question: {
                            text: 'बच्चों की किन बातों से घर के लोग परेशान होते हैं?',
                            audio: 'audio/2.mp3'
                        },
                        options: [
                            { text: 'खूब रोने से' },
                            { text: 'खेलने में चोट लगने से' },
                            { text: 'बार-बार खाने की इच्छा करने से' },
                            { text: 'इनमें से कोई नहीं' }
                        ],
                        answer: 1
                    }
                ]
            }
        },
        {
            id      : 30,
            lang    : 'hi',
            head    : 'Module : 24',
            content : {
                main: {
                    audio: 'audio/3.mp3',
                },
                questions: [
                    {
                        question : {
                            text  : 'बच्चों की किन बातों से घर के लोग खुश होते हैं?',
                            image : 'img/ch4_1.png',
                            audio : 'audio/1.mp3'
                        },
                        options: [
                            { text : 'खेल-कूद में तूफ़ान मचाने पर' },
                            { text : 'खूब सोते रहने से', },
                            { text : 'हर बात में ज़िद करने से', image : 'img/ch4_1.png' },
                            { text : 'इनमें से कोई नहीं ', image : 'img/ch4_1.png' }
                        ],
                        answer : 0
                    },
                    {
                        question : {
                            text  : 'बच्चों की किन बातों से घर के लोग परेशान होते हैं?',
                            audio : 'audio/2.mp3'
                        },
                        options : [
                            { text : 'खूब रोने से' },
                            { text : 'खेलने में चोट लगने से' },
                            { text : 'बार-बार खाने की इच्छा करने से' },
                            { text : 'इनमें से कोई नहीं' }
                        ],
                        answer : 1
                    }
                ]
            }
        },
        {
            id      : 31,
            lang    : 'en',
            head    : 'Module : 25',
            content : {
                video : {
                    path    : 'https://www.youtube.com/embed/WyVuxlx3Nq4?autoplay=1&mute=1&controls=0',
                    // path    : './video.mp4',
                    youtube : true
                }
            }
        },
        {
            id      : 32,
            lang    : 'hi',
            head    : 'Module : 26',
            subhead : "पेड़ - प्रकृति का वरदान",
            content : {
                image: {
                    path: 'img/1.png',
                    align: 'right',
                    width: '15%',
                    replacement: '#_#'
                },
                text: "पेड़-पौधे हमारी धरती माँ के सिर्फ़ शृंगार ही नहीं, #_# बल्कि उसपर स्थित जीवन के आधार भी हैं। इनके बिना हम जीवन की कल्पना भी नहीं कर सकते। प्राचीन काल से ही हमारे ऋषियों, मुनियों और विचारकों ने पेड़-पौधों के महत्त्व को समझा। यही कारण है कि हमारी संस्कृति में वनों का इतना महत्त्व है। हमारे यहाँ पेड़-पौधों को लगाना, इनकी पूजा करना और वन-महोत्सव की प्रथा का प्रचलन प्राचीन काल से है और इसके वैज्ञानिक कारण भी हैं। पेड़ों की पूजा अंधविश्वास नहीं है। पेड़-पौधे हमारे लिए बहुत लाभदायक हैं। इनसे हमें खाने के लिए फ़ल, विश्राम के लिए छाया, रोगों के लिए औषधियाँ, जलाने के लिए ईंधन एवं शुद्ध वातावरण आदि मिलता है। अतः उनके प्रति कृतज्ञता प्रकट करना हमारा प्रथम कर्तव्य है। पेड़-पौधे हमेशा से हम पर उपकार करते आए हैं। पेड़-पौधों द्वारा जलवायु औरवातावरण का संतुलन बना रहता है। इनकी जड़ें मिट्टी को जकड़कर रखती हैं तथा पत्तियाँ सड़कर खाद (ह्यूमस) का काम करती हैं। इससे मृदा-क्षरण कम होता है। यह तो हम सभी जानते हैं कि पेड़-पौधों में जीवन होता है। वे भी हमारी तरह दुख-सुख का अनुभव कर अपनी प्रतिक्रिया व्यक्त करते हैं। कहा जाता है कि मनुष्य पर उसके चारों ओर के वातावरण का असर पड़ता है, इसलिए अगर हम अपने चारों तरफ़ की धरती को पेड़ लगाकर हरा कर दें, तो चारों तरफ़ का सौंदर्य देखने लायक होगा, फिर जो मनुष्य ऐसे वातावरण में रहेगा, उसका हृदय भी उसी तरह खुशहाल हो जाएगा। पेड़ तो प्रकृति का सबसे बड़ा वरदान है। अगर पेड़ हैं तो वर्षा होगी, पानी की समस्या नहीं रहेगी एवं ऑक्सीजन और कार्बन डाइऑक्साइड गैसों में संतुलन रहेगा। यदि पेड़ों की संख्या बढ़ा दी जाए तो ग्रीन हाउस गैसों के असर से भी हम बच सकते हैं। प्रगति की ओर बढ़ रहे मानव ने नगर, महानगर, यहाँ तक कि कस्बे और देहात तक में छोटे-बड़े उद्योग-धंधों के रूप में अनेक छोटी-बड़ी फ़ैक्टरियाँ लगाई हैं। उनसे धुआँ, तरह-तरह की विषैली गैसें आदि निकलकर पर्यावरण को प्रदूषित कर रही हैं। पेड़-पौधे उनसे निकलने वाली प्रदूषित गैसों को पर्यावरण में घुलने से रोककर पर्यावरण को दूषित होने से बचाते हैं। पेड़-पौधे उस कामधेनु की भाँति हैं, जिसके बिना जीना असंभव है। इनके बिना हमारा अस्तित्व ही समाप्त हो जाएगा, अतः हमें चाहिए कि ज़्यादा-से-ज़्यादा पेड़ लगाकर अपनी पृथ्वी को बचाएँ, अन्यथा वह समय दूर नहीं, जब पृथ्वी पर जीव और जीवन एक इतिहास बन जाएगा।",
            }
        },
        {
            id      : 33,
            lang    : 'hi',
            head    : 'Module : 27',
            subhead : "‘विज्ञान के चमत्कार’ विषय पर लगभग 200-250 शब्दों में निबंध लिखिए।",
            content : {
                heading : " • विज्ञान का उद्देश्य मानव जीवन को सरल व कष्टरहित बनाना • विभिन्न क्षेत्रों में चमत्कार • चिकित्सा क्षेत्र में• संचार व परिवहन क्षेत्र में • शिक्षा व कृषि क्षेत्र में • विभिन्न  ष्कारों ने मानव जीवन को सुविधासंपन्न बना दिया है।",
                answer  : `<div class='headingInDtaAns'>विज्ञान के चमत्कार</div>
                        यदि विज्ञान के क्षेत्र में निरंतर नए-नए आविष्कार न होते तो कदाचित आज मानव प्रगति के सर्वोच्च शिखर पर
                        आसीन न होता। 
                        वैज्ञानिकों ने नित्य नए आविष्कार करके मनुष्य के जीवन को कष्टरहित एवं आनंददायी बना दिया है। आज
                        स्थिति यह है कि विज्ञान की सहायता लिए बिना मनुष्य की सुबह से शाम नहीं होती है। विज्ञान ने स्वर्ग
                        की सुखद सुंदर कल्पना को ज़मीन पर उतार दिया है। तीव्रगामी यातायात के साधनों से संपूर्ण विश्व की
                        यात्रा करना संभव हो गया है। टेलीफ़ोन, मोबाइल और कंप्यूटर ने हजारों मीलों की दूरियाँ समाप्त कर
                        घंटों के काम को मिनटों में पलक झपकते ही कर दिखाया है। बिजली के आविष्कार ने रात के अंधकार
                        को पूरी तरह समाप्त कर दिया है। कूलर, पंखों व एयरकंडीशनरों ने गर्मी की तपन को शांत कर दिया है।
                        हीटर की गर्मी ने सर्दी को दूर भगा दिया है। नहाने के लिए पानी गर्म करने के लिए गीज़र, भोजन को
                        सुरक्षित रखने के लिए फ्रिज़, जल्दी से खाना बनाने के लिए माइक्रोवेव ओवन हाजि़र है। चिकित्सा के क्षेत्र
                        में विज्ञान ने क्रांतिकारी परिवर्तन किया है। शरीर के सभी अंगों का एक्स-रे किया जा सकता है। बड़े-बड़े
                        रोगों को, महामारियों को जड़ से समाप्त किया जा सकता है। शरीर के विकृत अंगों को निकालकर नए अंग
                        लगाए जा रहे हैं। विकलांग व्यक्तियों को कृत्रिम अंग दिए जा रहे हैं। शिक्षा और कृषि के क्षेत्र में भी विज्ञान
                        ने पूरी धाक जमाई है। कंप्यूटर और इंटरनेट ने शिक्षा को सार्वभौमिक और ज्ञान की सीमाओं को बहुत ऊपर
                        तक पहुँचा दिया है। तकनीकी शिक्षा ने लोगों के रोज़गार में वृद्धि की है, मुद्रण के आविष्कार ने ज्ञान को
                        चिरस्थायी और विश्वव्यापी बना दिया है। खेतों में उन्नत बीजों, कृषि-यंत्रों, रासायनिक खादों के प्रयोग ने
                        पैदावार चौगुनी कर दी है। बड़े-बड़े उद्योगों में बटन दबाते ही मशीनें लाखों, करोड़ों की संख्या में उत्पादन
                        करने लगती हैं।`,
                textArea : {
                    count  : 1,
                    type   : 'multi',
                    height : '100px',
                },
                image : {
                    path  : 'img/1.png',
                    side  : 'right',
                    width : '150px',
                }
            }
        },
        {
            id      : 34,
            lang    : 'hi',
            head    : 'Module : 28',
            subhead : "‘विज्ञान के चमत्कार’ विषय पर लगभग 200-250 शब्दों में निबंध लिखिए।",
            content : {
                heading   : "दादा जी को स्वास्थ्य का ध्यान रखने की सलाह देते हुए पत्र",
                questions : [
                    { label : "घर का पता एवं स्थान", answer : `<b>डी-32/3 लाजपत नगर <br/>नई दिल्ली </b>` },
                    { label : "तिथि", answer : `दिनांक- ............................` },
                    { label : "संबोधन", answer : `पूजनीय दादा जी,` },
                    { label : "अभिवादन", answer : `सादर चरण स्पर्श।` },
                    { label : "समाचार विस्तार से", answer : `आपका पत्र मिला। घर का समाचार पढ़कर खुशी हुई, किंतु आपके स्वास्थ्य को लेकर चिंता बढ़ गई है। आपने लिखा है कि आपके पैरों में दर्द बढ़ गया है, जिससे चलने-फि़रने में तकलीफ़ होती है। आप अपना ध्यान रखें और किसी अच्छे अस्पताल में इलाज- कराएँ, जिससे आप ठीक प्रकार से चल सकें। व्यायाम करते रहें, जिससे हाथ-पैर चलते रहें। दवाई भी समय पर लें। मेरी तरफ़ से आप निशि्ंचत रहें। इस वर्ष भी मैं प्रथम आने के लिए जी-तोड़ मेहनत कर रहा हूँ। आजकल परीक्षा की तैयारी में व्यस्त हूँ। मैं दीपावली की छुट्टियों में आपसे मिलने आ रहा हूँ। मेरी ओर से घर में दादी जी, माता जी को सादर प्रणाम तथा शोभा को प्यार कहिएगा।` },
                    { label : "अपना रिश्ता बताते हुए", answer : `आपका प्यारा पोता` },
                    { label : "नाम", answer : `<b>अमित</b>` }
                ]
            }
        },
        {
            id      : 35,
            lang    : 'hi',
            head    : 'Module : 29',
            subhead : 'अपनी छोटी बहन को मोबाइल पर व्यर्थ समय बिताने की जगह पढ़ाई पर ध्यान देने का सुझाव देते हुए पत्र लिखिए।',
            content : {
                showButtons    : true,
                showAnswerOfId : 1,
                inputLeft      : false,
                hint  : 'आदरणीया चाची जी, गर्मियों की छुट्टियाँ, बड़े दिनों से दिल्ली नहीं आईं, रीनू-चीनू को लेकर आएँ, कुछ  दिन रहे सब मिलकर मजे करेंगे',
                image : {
                    path  : 'img/1.png',
                    width : '15%'
                },
                col : {
                    left  : { md: 4, sm: 6, col: 6, show: true },
                    right : { md: 6, sm: 6, col: 6, show: true }
                },
                placeholder: {
                    left  : 'यहाँ सामग्री लिखें...',
                    right : 'यहाँ विधि लिखें...'
                },
                question: [
                    { id: 1, text: "घर का पता एवं स्थान", answer: `ए-25/26,  पश्चिमी (वेस्ट) पटेल नगर,  नई दिल्ली - 110007` },
                    // { id: 2, text: "तिथि", answer: 'दिनांक - 10-03-20xx' },
                    // { id: 3, text: "संबोधन", answer: 'प्रिय बहन खुशी,' },
                    // { id: 4, text: "अभिवादन", answer: 'शुभाशीर्वाद,' },
                    // { id: 5, text: "समाचार विस्तार से", answer: `मैं यहाँ कुशल से हूँ तथा आशा करती हूँ कि चाचाजी, चाचीजी और तुम मेरठ में सकुशल होंगे। माँ-पिताजी और मैं यहाँ मजे में हैं। यह जानकर बड़ी प्रसन्नता हुई कि तुमने अपना पंद्रहवाँ जन्मदिन बड़े आनंद से मनाया। कल चाची जी से फ़ोन पर बात करते हुए मैंने यह सुना कि तुम आजकल सुबह से शाम तक उपहार में मिले मोबाइल फ़ोन से चिपकी रहती हो, तो मुझे बहुत दुख हुआ। बहन! मोबाइल फ़ोन आवश्यकता के समय प्रयोग की जाने वाली वस्तु है, न कि व्यर्थ समय गँवाने का साधन है। तुम यदि अपना समय मोबाइल फ़ोन के साथ बिताओगी, तो कक्षा में प्रथम कैसे आओगी? इसलिए तुम पहले की भाँति पढ़ाई-लिखाई पर ध्यान दो। ज़रूरी फ़ोन आने पर ही फ़ोन उठाओ। स्वयं को मोबाइल का दास मत बनाओ। आशा करती हूँ कि तुम मेरे सुझाव पर ध्यान दोगी। चाचा-चाची को कभी निराश नहीं करोगी। उनसे मेरा प्रणाम कहना। तुम्हें मेरा स्नेह भरा आशीर्वाद।` },
                    // { id: 6, text: "पत्र पाने वाले से आपका रिश्ता", answer: 'तुम्हारी बड़ी बहन,' },
                    // { id: 7, text: "नाम", answer: 'कoखoगo' }
                ]
            },
        },
        {
            id      : 36,
            lang    : 'en',
            head    : "Module : 30",
            content : {
                width    : "200px",
                height   : "200px",
                question : [
                    { path: 'img/1.png', answer: true },
                    { path: 'img/2.png', answer: true },
                    { path: 'img/3.png', answer: true },
                    { path: 'img/4.png', answer: false },
                    { path: 'img/5.png', answer: false },
                    { path: 'img/6.png', answer: false },
                    { path: 'img/1.png', answer: false },
                ]
            }
        },
        {
            id      : 37,
            lang    : 'en',            
            head    : 'Click on the correct words in the blanks given below.',
            content : {
                replacement : '#_#',
                question    : [
                    { text: 'The maximum tally marks fell in a #_# range', options: ['general', 'particular'], answer: 0 },
                    { text: 'Raw data can be condensed using a #_#', options: ['class intervals', 'age intervals'], answer: 1 },
                    { text: 'No two students had identical #_#', options: ['heights and weights', 'health requirements'], answer: 1 },
                    { text: 'Many students had their data falling under the same #_#', options: ['index', 'range'], answer: 1 },
                    { text: 'The teacher guessed to take the highest and lowest scores to calculate the #_# of the pupils.', options: ['heights and weights', 'age and length'], answer: 1 },
                ]
            }
        },
        {
            id      : 38,
            lang    : 'en',
            head    : 'Module : 32',
            subhead : '(Drag and arrange each word in the order you will find them in a dictionary.)',
            content : [
                'Negligence', 'Untruthfulness', 'Omnibus', 'Flustered', 'Stupidity', 
                'Scrimping', 'Patronage', 'Relinquished', 'Celestial', 'Xenophobia', 
                'Grimly', 'Hankering', 'Quavered', 'Angel', 'Deterrence', 'Lavender', 'aeroplane',
            ]
        },
        {
            id      : 39,
            lang    : 'en',
            head    : 'Numbers and Numeration',
            subhead : 'Drag the correct answer',
            content : {
                shuffle   : false,
                questions : [
                    {
                        type        : 'x',
                        replacement : '#_#',
                        text        : [ '\\( \\sqrt{49} \\)  = #_# + 200 = 207 x #_# = #img#' ],
                        image       : {
                            width       : '200px',
                            path        : 'img/414.png',
                            replacement : '#img#',
                        },
                        options     : [ '7', '2', '20' ],
                        correct     : [ 0, 1 ]
                    },
                    {
                        type      : '+',
                        text      : [ '393', '607' ],
                        options   : [ '1000', '5987', '3895', '9538' ],
                        correct   : [ 0 ]
                    },
                    {
                        type        : 'x',
                        replacement : '#_#',
                        text        : [ '200 + 200 = #_# + 200 = #_#' ],
                        options     : [ '400', '700', '600' ],
                        correct     : [ 0, 2 ]
                    }
                ]
            }
        },
    ];

    const questionContainer = '.question-container';
    const head    = 'qNum';
    const subHead = 'questionText';

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            if (!src) {
                reject(new Error('No script src provided'));
                return;
            }
            const exists = [...document.querySelectorAll('script')].some(script => script.src.includes( src ) );
            if( exists ) {                
                resolve('already-loaded');
                return;
            }
            
            const s   = document.createElement('script');
            s.src     = src;
            s.onload  = () => resolve(s);
            s.onerror = (err) => {
                s.remove();
                reject( new Error( `Failed to load script: ${src}` ) );
            };
            document.body.appendChild(s);
        });
    }

    (async () => {
        const scriptPath = 'js/newActJS';
        await loadScript(`${scriptPath}/modules.js`);
        await loadScript(`${scriptPath}/templates.js`);
        await loadScript(`${scriptPath}/ui.js`);
    })();

    const store = {
        head,
        buttons,
        subHead,
        questions,
        loadScript,
        questionContainer
    };

    const get = (key) => store[key];

    return { get };
})();
