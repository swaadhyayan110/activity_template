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
                    { id: 3, left: 'All eyes and ears', right: 'To be very attentive' },
                    { id: 4, left: 'Apple of someone\'s eye', right: 'To be a favourite or loved one of someone' },
                    { id: 5, left: 'Catch someone\'s eye', right: 'Be noticed by someone' },
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
                lang    : 'en',
                head    : 'Module : 5',
                content : {
                    replacement : '#_#',
                    questions   : [
                        { question: '1. हमारे #_# देश का नाम #_# है।', answers: ['भारत', 'भारत'] },
                        { question: '2. भारत की राजधानी #_# है।', answers: ['दिल्ली'] },
                        { question: '3. भारत की राजभाषा #_# है।', answers: ['हिंदी'] },
                        { question: '4. बच्चों को पढ़ने के लिए #_# चाहिए।', answers: ['किताब'] },
                        { question: '5. जहाँ पढ़ाई होती है उसे #_# कहते हैं।', answers: ['विद्यालय'] }
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
                    questions   : [
                        { text: '#_#, #_#', image : 'img/1.png', width : '25%', options: ['पंख', 'नाचने'] },
                        { text: '#_#, #_#', image : 'img/2.png', options: ['जंगल', 'पंखूँटी'] },
                        { text: '#_#, #_#', image : 'img/3.png', options: ['नक्काषी', 'पंखूँटी'] }
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
                        tabtitle : 'apple',
                        meaning  : 'कूद-कूदकर',
                        sentence : 'छोटी चिड़ियाँ apples चलना सीखती हैं।',
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
                        { audio : './audio/6.mp3', answer: '6' }
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
        ];

        const questionContainer = '.question-container';
        const head    = 'qNum';
        const subHead = 'questionText';

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = src;
                s.onload = () => resolve(s);
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
