const Define = (() => {

    /*
        ==============
        Language Codes
        --------------
        sk : "संस्कृत"
        hi : "हिन्दी"
        en : "English"
        fr : "French"
        ro : "Roman"
        ==============
    */

    // DEFINE BUTTONS
    const buttons = [
        { qid: 44, text: ['Q-44', 'id : 0 - Math'], module: 0 },
        { qid: 0, text: ['Q-0', 'id : 0 - Audio'], module: 0 },
        { qid: 1, text: ['Q-1', 'id : 1 - Match-1'], module: 1, landscape: true },
        { qid: 2, text: ['Q-2', 'id : 2 - Match-2'], module: 2 },
        { qid: 3, text: ['Q-3', 'id : 3 - Match-3'], module: 3 },
        { qid: 4, text: ['Q-4', 'id : 4 - Fill-1'], module: 4 },
        { qid: 5, text: ['Q-5', 'id : 5 - Fill-2'], module: 5 },
        { qid: 6, text: ['Q-6', 'id : 6 - Jumble-Letter'], module: 6 },
        { qid: 7, text: ['Q-7', 'id : 7 - Jumble-Word'], module: 7 },
        { qid: 8, text: ['Q-8', 'id : 8 - DND-1'], module: 8 },
        { qid: 9, text: ['Q-9', 'id : 9 - MCQ-1'], module: 9 },
        { qid: 10, text: ['Q-10', 'id : 10 - Adaptiv'], module: 10 },
        { qid: 11, text: ['Q-11', 'id : 11 - Audio'], module: 11 },
        { qid: 12, text: ['Q-12', 'id : 12 - Drop Down'], module: 12 },
        { qid: 13, text: ['Q-13', 'id : 13 - Circle'], module: 13 },
        { qid: 14, text: ['Q-14', 'id : 14 - श्रवण कौशल'], module: 14 },
        { qid: 15, text: ['Q-15', 'id : 15 - T&F'], module: 15 },
        { qid: 16, text: ['Q-16', 'id : 16 - DND-2'], module: 16 },
        { qid: 17, text: ['Q-17', 'id : 16 - DND-3'], module: 16 },
        { qid: 18, text: ['Q-18', 'id : 17 - Sorting'], module: 17 },
        { qid: 19, text: ['Q-19', 'id : 18 - PDF'], module: 18 },
        { qid: 20, text: ['Q-20', 'id : 19 - Shabdkosh'], module: 19 },
        { qid: 21, text: ['Q-21', 'id : 20 - Shrutlekh'], module: 20 },
        { qid: 22, text: ['Q-22', 'id : 21 - WordSearch'], module: 21 },
        { qid: 23, text: ['Q-23', 'id : 22 - TextArea'], module: 22 },
        { qid: 24, text: ['Q-24', 'id : 23 - CrossWord'], module: 23 },
        { qid: 25, text: ['Q-25', 'id : 24 - ShravanKaushalWithPara'], module: 24 },
        { qid: 26, text: ['Q-26', 'id : 25 - VideoPlayer'], module: 25 },
        { qid: 27, text: ['Q-27', 'id : 26 - Rachnatmak_Para-1'], module: 26 },
        { qid: 28, text: ['Q-28', 'id : 27 - Rachnatmak_Inputs&Images-2'], module: 27 },
        { qid: 29, text: ['Q-29', 'id : 28 - Rachnatmak_Tab_Btns-3'], module: 28 },
        { qid: 30, text: ['Q-30', 'id : 29 - Rachnatmak_multi_Inputs-4'], module: 29 },
        { qid: 31, text: ['Q-31', 'id : 30 - ClickOnImage'], module: 30 },
        { qid: 32, text: ['Q-32', 'id : 31 - FillOnClick'], module: 31 },
        { qid: 33, text: ['Q-33', 'id : 32 - Dictionary'], module: 32 },
        { qid: 34, text: ['Q-34', 'id : 33 - MentalMath'], module: 33 },
        { qid: 35, text: ['Q-35', 'id : 34 - Youtube-Audio-Video'], module: 34 },
        { qid: 36, text: ['Q-36', 'id : 35 - Math Money'], module: 35 },
        { qid: 37, text: ['Q-37', 'id : 36 - Shabd Rachna'], module: 36 },
        { qid: 38, text: ['Q-38', 'id : 37 - Spell Check'], module: 37 },
        { qid: 39, text: ['Q-39', 'id : 38 - Spell It out'], module: 38 },
        { qid: 40, text: ['Q-40', 'id : 39 - Vowel Drag and Drop'], module: 39 },
        { qid: 41, text: ['Q-41', 'id : 19 - Shabdkosh type-2'], module: 19 },
        { qid: 42, text: ['Q-42', 'id : 40 - Virtual Tour'], module: 40 },
        { qid: 43, text: ['Q-43', 'id : 41 - Circle and underline'], module: 41 },
    ];

    // DEFINE QUESTIONS
    const questions = [
        {
            id: 44,
            ui: () => {
                const exp = [
                    { type: 'symbol', text: '`=`' },
                    { type: 'symbol', text: '`+`' },
                    { type: 'symbol', text: '`-`' },
                    { type: 'symbol', text: '`alpha`' },
                    { type: 'symbol', text: '`beta`' },
                    { type: 'symbol', text: '#{lc :}# `gamma` #{and uc :}# `Gamma`' },
                    { type: 'symbol', text: '#{lc :}# `delta` #{and uc :}# `Delta`' },
                    { type: 'symbol', text: '#{lc :}# `theta` #{and uc :}# `Theta`' },
                    { type: 'symbol', text: '#{lc :}# `lambda` #{and uc :}# `Lambda`' },
                    { type: 'symbol', text: '`mu`' },
                    { type: 'symbol', text: '#{lc :}# `pi` #{and uc :}# `Pi`' },
                    { type: 'symbol', text: '#{lc :}# `sigma` #{and uc :}# `Sigma`' },
                    { type: 'symbol', text: '#{lc :}# `omega` #{and uc :}# `Omega`' },
                    { type: 'symbol', text: '`angle`' },
                    { type: 'symbol', text: '`le`' },
                    { type: 'symbol', text: '`ge`' },
                    { type: 'symbol', text: '`sum`' },
                    { type: 'symbol', text: '`prod`' },
                    { type: 'symbol', text: '`int`' },
                    { type: 'symbol', text: '`lim`' },
                    { type: 'symbol', text: '`e`' },
                    { type: 'symbol', text: '`infty`' },
                    { type: 'symbol', text: '`pm`' },
                    { type: 'symbol', text: '`log`' },
                    { type: 'symbol', text: '`ln`' },
                    { type: 'symbol', text: '`to`' },
                    { type: 'symbol', text: '`approx`' },
                    { type: 'symbol', text: '`propto`' },
                    { type: 'symbol', text: '`P(A)`' },
                    { type: 'symbol', text: '`P(B)`' },
                    { type: 'symbol', text: '`mathbb(N)`' },
                    { type: 'symbol', text: '`mathbb(Z)`' },
                    { type: 'symbol', text: '`mathbb(Q)`' },
                    { type: 'symbol', text: '`mathbb(R)`' },
                    { type: 'symbol', text: '`cap`' },
                    { type: 'symbol', text: '`cup`' },
                    { type: 'symbol', text: '`in`' },
                    { type: 'symbol', text: '`notin`' },
                    { type: 'symbol', text: '`subset`' },
                    { type: 'symbol', text: '`subseteq`' },
                    { type: 'symbol', text: '`emptyset`' },
                    { type: 'symbol', text: '`n!`' },
                    { type: 'symbol', text: '`vec(a)`' },
                    { type: 'symbol', text: '`bar(x)`' },
                    { type: 'symbol', text: '`45 ^circ C`' },
                    { type: 'power', text: '`6^7`' },
                    { type: 'fraction', text: '`7/8`' },
                    { type: 'modulo', text: '`7%8`' },
                    { type: 'division', text: '`7 divide 8`' },
                    { type: 'multiplication', text: '`7 times 8`' },
                    { type: 'multiplication', text: '`7 * 8`' },
                    { type: 'subtraction', text: '`7 - 8`' },
                    { type: 'addition', text: '`7 + 8`' },
                    { type: 'mixed', text: '`1 1/2`' },
                    { type: 'root', text: '`sqrt(x)`' },
                    { type: 'absolute', text: '`|x - 5|`' },
                    { type: 'trigonometry', text: '`sin^2 theta`' },
                ];

                const html = [];

                const heading = `
                    <style>
                        .copy-text {
                            transition : 0.3s all ease;
                            display: inline-block;
                        }
                        .copy-text:hover {
                            transform: scale(1.4);
                            color : #58151c !important;
                        }
                    </style>
                    <div 
                        id="toast-container" 
                        class="position-fixed top-50 start-50 translate-middle-x p-3"
                    ></div>
                    <div 
                        class="border border-primary-subtle text-center fs-5 fw-semibold text-primary-emphasis bg-primary-subtle rounded-3 my-3 shadow-sm p-2 w-75 mx-auto"
                    >
                        MathJax V2 Syntax
                    </div>

                    <div class="w-75 mx-auto bg-body-tertiary p-3 rounded-3 shadow-sm">
                        <p class="text-muted">
                            <span class="bg-secondary-subtle px-2 py-1 rounded fw-semibold">lc</span> = lowercase ;
                            <span class="bg-secondary-subtle px-2 py-1 rounded fw-semibold">uc</span> = uppercase
                        </p>
                        <table class="table table-bordered table-hover align-middle">
                            <thead class="table-dark position-sticky top-0 z-1 align-middle text-center">
                                <tr>
                                    <th>Type</th>
                                    <th>Usage</th>
                                    <th>
                                        Expected Output 
                                        <small class="text-white-50">(click on symbols to copy)</small>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                `;
                html.push( heading );

                const express = exp?.map(({type, text}) => {
                    return `
                        <tr>
                            <td class="text-capitalize">${type}</td>
                            <td class="text-center font-monospace">
                                <span class="text-warning-emphasis">
                                    ${
                                        text
                                            .replace(/`/g, '<span class="text-danger fw-bold">`</span>')
                                            .replace(/#\{([^}]+)\}#/g, '<span class="text-primary-emphasis fw-semibold">$1</span>')
                                    }
                                </span>
                            </td>
                            <td class="text-center font-monospace">
                                ${
                                    text
                                        .replace(/`([^`]+)`/g, (_, word) => {
                                            return `
                                                <span 
                                                    class="copy-text text-warning-emphasis fw-semibold" 
                                                    data-copy="\`${word}\`"
                                                    role="button"
                                                >
                                                    \`${word}\`
                                                </span>
                                            `;
                                        })
                                        .replace(/#\{([^}]+)\}#/g, '<span class="text-primary-emphasis fw-semibold">$1</span>')
                                }
                            </td>
                        </tr>
                    `;
                }).join( '' );

                const tableEnd = `</tbody></table></div>`;
                html.push( express + tableEnd );

                return html.join( '' );
            },
            logic : {
                // Each function automatically receives `event`, `el`, `root`, and `logic`
                // These are injected only for handlers defined in `events`
                copyText : ({ event, el, root, logic }) => {
                    if (!el) return;

                    const text = el.dataset.copy ?? undefined;

                    if( !text ) {
                        logic.renderToast({message:'Couldn\'t copy symbol.', bsClass:"warning"});
                        return;
                    }

                    navigator.clipboard.writeText(text).then(() => {
                        logic.renderToast({text:text});
                    });
                },

                // This (`renderToast`) function is not registered in `events.handle`,
                // so it does not receive the default injected parameters
                renderToast : ({text,bsClass,message}={}) => {
                    document.querySelector( '#copyToast' )?.remove();

                    const toastClass = bsClass ?? 'success';

                    const toastHtml = `
                            <div 
                                id="copyToast"
                                class="toast align-items-center text-${toastClass}-emphasis bg-${toastClass}-subtle border-${toastClass}-subtle"
                            >
                            <div class="d-flex">
                                <div class="toast-body fs-6 font-monospace"></div>
                                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
                            </div>
                        </div>
                    `;
                    document.querySelector( '#toast-container' ).innerHTML = toastHtml;

                    const toastEl = document.getElementById('copyToast');
                    const toast   = bootstrap.Toast.getOrCreateInstance(toastEl);

                    if( !toast ) return;

                    const textMsg = message ?? `${text} copied to clipboard!`;
                    toast._element.querySelector('.toast-body').innerText = textMsg;

                    toast.show();
                }
            },
            events: [
                { event: 'click', selector: '.copy-text', handle: ['copyText'] },
            ]
        },
        {
            id: 0,
            path : {
                css : [ 'style.css' ]
            },
            ui: () => {
                const options = [
                    { name: "Salad", correct: true },
                    { name: "Sweets", correct: true },
                    { name: "Fruits", correct: false },
                    { name: "Bread", correct: true },
                    { name: "Parantha", correct: true },
                    { name: "Bun", correct: false },
                    { name: "Fruit cream", correct: false }
                ];

                const html = `
                    <div class="container py-4">
                        <h5 class="text-center mb-3">
                            Tick the things you can see in the plate
                        </h5>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card p-3 shadow-sm">
                                    ${options.map((opt, i) => `
                                        <div class="form-check my-2">
                                            <input 
                                                class="form-check-input option-check" 
                                                type="checkbox" 
                                                id="opt${i}"
                                                data-correct="${opt.correct}"
                                            >
                                            <label class="form-check-label" for="opt${i}">
                                                ${opt.name}
                                            </label>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="col-md-6 text-center">
                                <audio src="bg.mp3" id="audioEle"></audio>
                                <div class="border border-danger">
                                    <video src="video.mp4" id="videoEle" class="w-100" controls="true"></video>
                                </div>
                                <img 
                                    id="audioImage"
                                    src="test.png" 
                                    class="img-fluid rounded shadow-sm"
                                    style="max-height:300px;"
                                    alt="Click here to play audio and video"
                                    role="button"
                                />
                                <div class="text-muted">
                                    <small>Click swa-icon to play audio and video</small>
                                </div>
                            </div>
                        </div>

                        <div class="text-center mt-4">
                            <button class="btn btn-primary check-btn">
                                Check Answer
                            </button>
                            <div id="resultBox" class="mt-3 fw-bold text-center"></div>
                        </div>
                    </div>
                `;
                return html;
            },
            logic: {
                // Each function automatically receives `event`, `el`, `root`, and `logic`
                // These are injected only for handlers defined in `events`
                checkAnswer: ({ event, el, root, logic }) => {
                    console.log( {event, el, root} );
                    const checks = root.querySelectorAll('.option-check');
                    const result = root.querySelector('#resultBox');

                    let selected = [];
                    let correctAnswers = [];
                    let hasChecked = false;
                    let allCorrect = true;

                    checks.forEach(chk => {
                        const label = chk.nextElementSibling.innerText;
                        const isCorrect = chk.dataset.correct === "true";

                        if (isCorrect) correctAnswers.push(label);

                        if (chk.checked) {
                            hasChecked = true;
                            selected.push(label);

                            if (!isCorrect) {
                                allCorrect = false;
                            }
                        } else {
                            if (isCorrect) {
                                allCorrect = false;
                            }
                        }
                    });
                    
                    if (!hasChecked) {
                        alert("Please select at least one option!");
                        return;
                    }

                    const userHTML = `
                        <div class="mb-2">
                            <div class="fw-bold">Your Answer</div>
                            ${selected.map((item, i) => `<div>${i + 1}. ${item}</div>`).join('')}
                        </div>
                    `;

                    const correctHTML = `
                        <div class="mt-3">
                            <div class="fw-bold">Correct Answer</div>
                            ${correctAnswers.map((item, i) => `<div>${i + 1}. ${item}</div>`).join('')}
                        </div>
                    `;
                    
                    if (allCorrect) {
                        result.innerHTML = `
                            <div class="text-success fw-bold">Correct!</div>
                            ${userHTML}
                            ${correctHTML}
                        `;
                    } else {
                        result.innerHTML = `
                            <div class="text-danger fw-bold">Incorrect</div>
                            ${userHTML}
                            ${correctHTML}
                        `;
                    }
                },
                playMedia :({event, el, root}) => {
                    const audioEl = root.querySelector( '#audioEle' );
                    const videoEl = root.querySelector( '#videoEle' );
                    audioEl.play();
                    videoEl.play();
                }
            },
            events: [
                { event: 'click', selector: '.check-btn', handle: ['checkAnswer'] },
                { event: 'click', selector: '#audioImage', handle: ['playMedia'] }
            ]
        },
        {
            id: 1,
            lang: 'en',
            head: 'Template : 1',
            subhead: 'Look at `theta` the expression eye-opener in your textbook. Now join the expression to its idiom.',
            content: [
                { id: 1, left: 'Bird\'s&nbsp;<u>eye</u>&nbsp;view', right: 'Seen &nbsp; `theta` &nbsp; from above, as a bird does' },
                { id: 2, left: 'Feast for the eyes', right: 'To look with great enjoyment' },
                { id: 3, left: { path: 'img/1.png', width: '40px' }, right: 'To be very attentive' },
                { id: 4, left: 'Apple of someone\'s eye', right: 'To be a favourite or loved one of someone' },
                { id: 5, left: 'Catch someone\'s eye', right: { path: 'img/2.png', width: '10%' } },
                { id: 6, left: 'Be an eye-opener', right: 'To understand something' }
            ]
        },
        {
            id: 2,
            lang: 'hi',
            head: 'Template : 2',
            subhead: 'Look at the `theta` expression eye-opener in your textbook. Now join the expression to its idiom.',
            content: {
                col1: [
                    { id: 1, img: 'img/1.png', width: '80%' },
                    { id: 2, text: 'img/2.png' },
                    { id: 3, img: 'img/3.png' },
                ],
                col2: [
                    { id: 1, text: '`theta` जादू दिखाना' },
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
            id: 3,
            lang: 'hi',
            head: 'Template : 3',
            subhead: 'Look at the expression eye-opener `theta` in your textbook. Now join the expression to its idiom.',
            content: [
                { id: 1, top: 'Bird\'s eye view `theta`', bottom: 'To understand something' },
                { id: 2, top: 'Feast for the eyes', bottom: 'Be noticed by someone' },
                { id: 3, top: 'All eyes and ears', bottom: 'To be very attentive' },
                { id: 4, top: 'Apple of someone\'s eye', bottom: 'Seen from above' },
                { id: 5, top: 'Catch someone\'s eye', bottom: 'To be a favourite or loved' }
            ]
        },
        {
            id: 4,
            lang: 'en',
            head: 'Template : 4',
            subhead: 'text.. `theta`',
            content: {
                hintimage: 'img/ch4_1.png',
                hinttext: [
                    'Broad Gauge RailwayLine `theta`',
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
                blanks: [
                    { img: 'img/ch4_2.png', ans: 'Settlement `theta`' },
                    { img: 'img/ch4_3.png', ans: 'Forest' },
                    { img: 'img/ch4_4.png', ans: 'Places of Worship' },
                    { img: 'img/ch4_5.png', ans: 'River' },
                    { img: 'img/ch4_6.png', ans: 'Pond' },
                    { img: 'img/ch4_7.png', ans: 'Metalled Road' },
                    { img: 'img/ch4_8.png', ans: 'Unmetalled road' },
                    { img: 'img/ch4_9.png', ans: 'Broad Gauge Railway Line' },
                    { img: 'img/ch4_10.png', ans: 'Railway Crossing' },
                    { img: 'img/ch4_12.png', ans: 'Restaurant' },
                    { img: 'img/ch4_13.png', ans: 'Police Station' },
                    { img: 'img/ch4_14.png', ans: 'Bridge' }
                ]
            }
        },
        {
            id: 5,
            lang: 'hi',
            head: 'Template : 5',
            content: {
                imageReplacement: '#img#',
                replacement: '#_#',
                image: {
                    path: 'img/1.png',
                    width: '10%'
                },
                questionGridSize: { md: 12, sm: 12, col: 12 },      // [OPTIONAL]
                hint: {        // ['string' || {}]
                    text: '`theta` आदरणीया चाची जी, #img#; गर्मियों की छुट्टियाँ, #img# <br> बड़े दिनों से दिल्ली नहीं आईं, रीनू-चीनू को लेकर आएँ, कुछ दिन रहे सब मिलकर मजे करेंगे',
                    images: [
                        { path: 'img/2.png', width: '15%' },
                        { path: 'img/3.png' },
                    ]
                },
                label: { question: true, subQuestion: true },
                questions: [
                    {
                        qid: 1,
                        question: 'हमारे #_# देश का #img# नाम #_# है। #img#',
                        images: [
                            { path: 'img/5.png', width: '200px' },
                            { path: 'img/4.png', width: '200px' }
                        ],
                        answers: ['हिंदी']
                    },
                    {
                        qid: 2,
                        question: 'भारत की राजधानी #_# है।'
                    },
                    {
                        question: 'भारत की #_# #img# राजभाषा #_# है।',
                        images: [
                            { path: 'img/1.png', width: '200px' }
                        ],
                        inputWidth: '50px',
                        answers: ['हिंदी', 'djf', 'sfdsf'],
                        inputBelow: true
                    },
                    {
                        qid: 4,
                        inputWidth: '80px',
                        question: 'बच्चों को पढ़ने के लिए #_# चाहिए।',
                        answers: ['किताब'],
                        maxLength: 1,
                    },
                    {
                        qid: 5,
                        question: '#img# जहाँ #img# पढ़ाई होती है उसे #_# कहते हैं।',
                        images: [
                            { path: 'img/5.png', width: '200px' },
                            { path: 'img/2.png', width: '200px' },
                        ],
                        answers: ['विद्यालय']
                    },
                    {
                        qid: 6,
                        question: '#img# T#_#O#_#I#_#T#_##_#Y',
                        inputWidth: '30px',
                        maxLength: 1,
                        images: [
                            { path: 'img/5.png', width: '200px' },
                        ],
                        answers: ['A', 'B', 'C', 'D', 'E']
                    }
                ],
                subquestions: [
                    { sqid: 1, qid: 1, inputWidth: '80px', text: '~ सितार बनाने के लिए तारों को #_# से बाँधा गया।', answers: ['~पंख'], maxLength: 1 },
                    { sqid: 2, qid: 1, inputWidth: '180px', text: '#_#', answers: ['!पंख', '!पंख'] },
                    { sqid: 3, qid: 2, text: 'भारत बनाने के लिए तारों को #_# से बाँधा गया।', answers: ['@पंख', '@नाचने'], inputBelow: true, maxLength: 1 },
                    { sqid: 4, qid: 2, inputWidth: '40px', text: '# सितार बनाने के लिए तारों को #_# से बाँधा गया।', answers: ['#पंख'] },
                    { sqid: 5, qid: 2, text: '$ सितार बनाने के लिए तारों को #_# से बाँधा गया।', answers: ['$पंख'] }
                ],
                audio: ''
            }
        },
        {
            id: 6,
            lang: 'hi',
            head: 'Template : 6',
            subhead: 'text.. `theta`',
            content: [
                'SCHOOL', 'TEACHER', 'STUDENT', 'BOOK', '`theta`',
                'CLASS', 'COLLEGE', 'EXAM', 'LEARN', 'STUDY'
            ]
        },
        {
            id: 7,
            lang: 'en',
            head: 'Template : 7',
            subhead: 'text ... `theta`',
            content: [
                'A short, statement expressing an opinion. `theta`',
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
            id: 8,
            lang: 'hi',
            head: 'Template : 8',
            subhead: '( शब्दों को सुनकर लिंगानुसार सही बॉक्स में रखो ) `theta`',
            content: {
                shuffle: false,
                audio: './bg.mp3',
                col: {
                    md: 4,
                    sm: 4,
                    om: 4
                },
                heading: [
                    { id: 1, accept: 'm', text: 'पुल्लिंग(Masculine)' },
                    { id: 2, accept: 'f', text: 'स्त्रीलिंग(Feminine)' },
                    { id: 3, accept: 'n', text: 'नपुंसकलिंग(Neuter)' }
                ],
                options: [
                    { id: 1, ans: 'm', text: '', images: [{ path: 'img/1.png', width: '50px' }]},
                    { id: 2, ans: 'f', text: 'अध्यापिके' },
                    { id: 6, ans: 'f', text: '`theta`' },
                    { id: 3, ans: 'n', text: 'क्रीडनकानि', images: [{ path: 'img/3.png', width: '50px' }]},
                    { id: 4, ans: 'm', text: 'हंसौक्री', images: [{ path: 'img/4.png', width: '50px' }]},
                    { id: 5, ans: 'm', text: 'अध्याकानि', images: [{ path: 'img/5.png', width: '50px' }]},
                ]
            }
        },
        {
            id: 9,
            lang: 'hi',
            head: 'Template : 9',
            content: {
                text: {
                    text: '`theta` वर्षा ऋतु अत्यंत सुहावनी होती है। वर्षा की बूँदें गर्मी से तपती प्रकृति को शीतलता प्रदान करती हैं। बारिश होने  पर बच्चे-बड़े, पेड़-पौधे, पशु-पक्षी सभी प्रसन्नता से झूम उठते हैं, परंतु इस मौसम में असावधानी से हमें कई  परेशानियों का सामना करना पड़ सकता है।नीचे कुछ प्रश्न दिए गए हैं। इनके सही उत्तर चुनिए-',
                    side: 'right'
                },
                img: {
                    width: '35%',
                    path: 'img/1.png',
                    imageclass: 'text-center'
                },
                mcq: [
                    {
                        imageaboveoption: {
                            image: 'img/2.png',
                            width: '10%'
                        },
                        question: {
                            image: 'img/4.png',
                            replacement: '#_#',
                            text: 'दूसरों के खिलौनों को खराब #_# कहना'
                        },
                        options: [
                            { text : 'text `theta` test', image: 'img/4.png' },
                            { image: 'img/6.png' },
                            { image: 'img/1.png' },
                            { text: 'none of these' }
                        ],
                        answer: 0
                    },
                    {
                        question: {
                            text: 'दूसरों के खिलौनों को खराब कहना-'
                        },
                        options: [
                            { text: 'अच्छा है।' },
                            { text: 'अच्छी `theta` बात है' },
                            { text: 'आम बात है।' },
                            { text : 'text test', image: 'img/3.png', width: '100%' },
                        ],
                        answer: 1
                    },
                    {
                        question: {
                            text: 'साथी खिलाड़ी को धमकाना और डराना-'
                        },
                        options: [
                            { text: 'अच्छा है।' },
                            { text: 'अच्छी बात है' },
                            { text: 'आम बात है।' },
                            { text: 'खास बात है।' }
                        ],
                        answer: 1
                    }
                ]
            }
        },
        {
            id: 10,
            lang: 'en',
            content: {
                skiplevels: true,
                skipanswerbutton: true,
                skipnextlevel: false,
                skipOptions: false,
                skipQuestionSequence: false,
                headings: {
                    left: 'स्तर',
                    mid: {
                        attempted: 'किए गए प्रश्न:',
                        outof: 'में से'
                    },
                    right: {
                        heading: 'निर्देश',
                        instruction: [
                            'निम्नलिखित में से प्रत्येक प्रश्न में सही विकल्प चुनें।',
                            'कुल 3 स्तर (लेवल) हैं। प्रत्येक स्तर में 10 प्रश्न होंगे।',
                            'अगले स्तर पर जाने के लिए, आपको प्रत्येक प्रश्न का सही उत्तर देना होगा।',
                            'पाँच गलत प्रयासों के बाद, आप अपनी वर्तमान स्तर की रिपोर्ट देख पाएंगे।'
                        ]
                    }
                },
                levels: [
                    {
                        level: 1,
                        heading: {
                            text: 'this is `theta` sample heading',
                            classes: [
                                'text-center', 'fs-4', 'text-capitalize',
                                'text-primary-emphasis', 'bg-primary-subtle',
                                'rounded-2', 'p-1'
                            ],
                        },
                        questions: [
                            {
                                imageReplacement: '#img#',
                                imageAboveOption: {
                                    image: 'img/2.png',
                                    width: '10%'
                                },
                                question: {
                                    text: '`theta` कवि धरती #img# के किन सपूतों #img# को पुकारता है?',
                                    images: {
                                        path: ['img/1.png', 'img/2.png'],
                                        style : [ // style[i] applies to path[i]
                                            { 
                                                height : 'auto',
                                                width  : '100px'
                                            },
                                        ]
                                    }
                                },
                                options: [
                                    {
                                        text: '#img# सैनिकों को #img#',
                                        images: {
                                            path: ['img/ch4_1.png', 'img/5.png'],
                                            width: '40%'
                                        }
                                    },
                                    {
                                        text: 'किसान #img# सपूतों को',
                                        images: {
                                            path: ['img/2.png']
                                        }
                                    },
                                    {
                                        text: 'another sample text'
                                    },
                                    'this is sample text'
                                ],
                                answer: 1
                            },
                            { question: '`theta` कविता में ‘नव निर्माण’ का अर्थ है -', options: ['नया खाना बनाना', 'नई इमारत बनाना', 'समाज का पुनर्निर्माण करना', 'नई सड़क बनाना'], answer: 3 },
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
                        level: 2,
                        questions: [
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
                        level: 3,
                        questions: [
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
            id: 11,
            lang: 'hi',
            content: {
                desc: 'audio description `theta`',
                src : 'video.mp4',
                // src : 'audio/1.mp3',
                // src : 'https://swaadhyayan.com/data/learningContent/3/Hindi/video/cca24b220e4c0b05f1b84310b587da95.mp4',                
                // src : 'https://www.youtube.com/watch?v=gIoyGYYCAxE',
                // src : 'https://www.youtube.com/embed/gIoyGYYCAxE?si=8bhfXCJ1WKJpoIp8',
            }
        },
        {
            id: 12,
            lang: 'hi',
            head: 'Template : 12, Drop Down `theta`',
            content: {
                replacement: '#_#',
                questions: [
                    { text: '(क) सितार के लिए #_# खोखला किया गया।', options: ['लकड़ी', 'कद्दू', 'धातु', '`theta`'], answer: '`theta`' },
                    { text: '(ख) सितार की लकड़ी में ताँबा #_# जोड़ा गया।', options: ['तार', 'ताँबा', 'धातु'], answer: 'तार' },
                    { text: '(ग) #_# ने अपने कौशल से सितार को सजाया।', options: ['कारीगर', 'कवि', 'विद्यार्थी'], answer: 'कारीगर' },
                    { text: '(घ) सितार से #_# आवाज़ निकलने लगी।', options: ['मधुर', 'तेज़', 'भारी'], answer: 'मधुर' },
                    { text: '(ङ) इस कविता के कवि का नाम #_# है।', options: ['निराला', 'सुभद्राकुमारी चौहान', 'प्रसाद'], answer: 'निराला' }
                ]
            }
        },
        {
            id: 13,
            lang: 'hi',
            head: 'Template : 13, Circle `theta` ',
            mode: 'single', // `single` || `multi`
            config : {
                disableCircleBefore : '-'
            },
            content: [
                { id: 1, text: 'दादा जी के लिए - तू, आप, तुम `theta`', answer: '`theta`' },
                { id: 2, text: 'अध्यापक जी के लिए - आप, वह, तुम', answer: 'आप' },
                { id: 3, text: 'नानी जी के लिए - आप, तू, तुम', answer: 'आप' },
                { id: 4, text: 'माँ के लिए - आप, वह, तुम', answer: 'आप' },
                { id: 5, text: 'बड़े भाई के लिए - आप, तू, तुम', answer: 'आप' },
                { id: 6, text: 'पिता जी के लिए - आप, वह, तुम', answer: 'आप' },
                { id: 7, text: 'छोटी बहन के लिए - तुम, तू, आप', answer: 'तुम' },
            ]
        },
        {
            id: 14,
            lang: 'hi',
            head: 'Template : 14',
            subhead: '`theta` वाक्यांश को ध्यान से सुनकर उनके लिए प्रयुक्त किए जाने वाले एक शब्द के सही क्रमसंख्या को लिखो-',
            content: {
                questions: [
                    { id: 1, text: 'लेखक', ans: 4, popuptext: 'जो पुस्तकें लिखता है `theta`' },
                    { id: 2, text: 'चिकित्सक `theta`', ans: 3, popuptext: 'जो मरीज़ों का इलाज़ करता है' },
                    { id: 3, text: 'अध्यापक', ans: 1, popuptext: 'जो पढ़ाता है' },
                    { id: 4, text: 'धोबी', ans: 6, popuptext: 'जो कपड़े धोता है' },
                    { id: 5, text: 'कुम्हार', ans: 2, popuptext: 'जो मिट्टी के बर्तन बनाता है' },
                    { id: 6, text: 'दरज़ी `theta`', ans: 5, popuptext: 'जो कपड़े सिलता है' }
                ],
                audio: {
                    headsrc: './audio/heading.mp3',
                    options: [
                        { id: 1, src: './audio/1.mp3' },
                        { id: 2, src: './audio/2.mp3' },
                        { id: 3, src: './audio/3.mp3' },
                        { id: 4, src: './audio/4.mp3' },
                        { id: 5, src: './audio/5.mp3' },
                        { id: 6, src: './audio/6.mp3' },
                    ]
                }
            }
        },
        {
            id: 15,
            lang: 'en',
            head: 'Template : 15',
            replacement: '#_#',
            content: [
                {
                    question: { text: 'तार लगाए गए #_#', image: 'img/1.png', width: '20%' },
                    answer: false,
                },
                {
                    question: 'सितार में `theta` लगाने के लिए सूखा तँूबा खोखला किया गया।',
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
            ],
            add_content: {
                image: { path: "img/1.png", width: "30%" },
                audio: 'audio/1.mp3'
            }
        },
        {
            id: 16,
            lang: 'hi',
            head: '',
            content: {
                shuffle: false,
                strictMatch: false,
                replacement: '#_#',
                option_side: 'top',
                singleQuestionMode: false,
                col: { col: 12, md: 4, sm: 6 },
                addOptions: ['op1', 'op2', 'op3', '`theta`', 'op1'],
                text: {
                    text: 'वर्षा ऋतु `theta` अत्यंत सुहावनी होती है। वर्षा की बूँदें गर्मी से तपती प्रकृति को शीतलता प्रदान करती हैं। बारिश होने  पर बच्चे-बड़े, पेड़-पौधे, पशु-पक्षी सभी प्रसन्नता से झूम उठते हैं, परंतु इस मौसम में असावधानी से हमें कई  परेशानियों का सामना करना पड़ सकता है।नीचे कुछ प्रश्न दिए गए हैं। इनके सही उत्तर चुनिए-',
                    side: 'right'
                },
                img: {
                    width: '150px',
                    path: 'img/1.png',
                    imageclass: 'text-center'
                },
                questions: [
                    {
                        qid: 1,
                        text: 'सितार बनने पर कोयल #_# नचाकर #_# नाचने लगी।',
                        inputWidth: '100px',
                        image: 'img/1.png',
                        width: '120px',      // image-width
                        options: ['पंख', 'नाचने'],
                        answer: 1,
                        imageSide: 'right'
                    },
                    { qid: 2, text: '#_#', image: 'img/1.png', options: ['`theta`'], answer: 0 },
                    { qid: 3, text: 'सितार पर खाली जगह पर #_# की गई।', image: 'img/1.png', options: ['नक्काषी'], answer: 0 },
                    { qid: 4, text: 'सितार बनाने के लिए तारों को #_# से बाँधा गया।', image: 'img/1.png', options: ['खूँटी'], answer: 0 },
                    { qid: 5, text: 'कोयल ने सितार को बड़े ही #_# से पकड़ा।', image: 'img/1.png', options: ['जतन'], answer: 0 }
                ],
                // audio     : 'audio/1.mp3'
            }
        },
        {
            id: 17,
            lang: 'hi',
            head: 'Template : 16',
            content: {
                set: {
                    answers: ['पंख', 'जंगल', 'नक्काषी', '`theta`'],
                    options: ['पंख', 'जंगल', 'नक्काषी', 'नाचने', 'पंखूँटी', 'पंख', '`theta`'],
                },
            }
        },
        {
            id: 18,
            lang: 'en',
            head: 'Template : 17',
            content: {
                sequence: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', '`theta`'],
            }
        },
        {
            id: 19,
            lang: 'en',
            content: {
                pdf: 'pdf.pdf',
                download: true
            }
        },
        {
            id: 20,
            lang: 'en',
            head: 'Template : 19',
            content: [
                {
                    id: 1,
                    tabtitle: 'aPPle',
                    meaning: 'कूद-कूदकर',
                    sentence: 'छोटी चिड़ियाँ appleing `theta` चलना सीखती हैं। appleing',
                    image: [
                        {
                            path    : 'img/1.png',
                            width   : '40%',
                            caption : 'image-text `theta`'
                        },
                        {
                            path    : 'img/2.png',
                            width   : '40%',
                            caption : 'image-text'
                        },
                        {
                            path    : 'img/3.png',
                            width   : '40%',
                            caption : 'image-text'
                        },
                        {
                            path    : 'img/4.png',
                            width   : '40%'
                        }
                    ]
                },
                {
                    id: 2,
                    tabtitle: 'कूद-कूदकर `theta`',
                    meaning: 'कूद-कूदकर',
                    sentence: 'छोटी चिड़ियाँ कूद-कूदकरकू चलना सीखती हैं।'
                },
                {
                    id: 3,
                    tabtitle: 'amrood',
                    meaning: 'कूद-कूद-कूदकर',
                    sentence: 'छोटी चिड़ियाँ amrood चलना सीखती हैं। amrood',
                    image: {
                        path    : 'img/3.png',
                        width   : '20%',
                        caption : 'image-text'
                    }
                },
            ]
        },
        {
            id: 21,
            lang: 'en',
            content: {
                questions: [
                    { audio: './audio/1.mp3', answer: '1' },
                    { audio: './audio/2.mp3', answer: '2' },
                    { audio: './audio/3.mp3', answer: '3' },
                    { audio: './audio/4.mp3', answer: '4' },
                    { audio: './audio/5.mp3', answer: '5' },
                    { audio: './audio/6.mp3', answer: '6' },
                ]
            }
        },
        {
            id: 22,
            lang: 'en',
            head: 'Search the following from the word maze.',
            config: {
                replacement: '#_#',
                side: 'top',
                questionSection: {
                    heading: {
                        main: {
                            text: ''
                        },
                        vertical: {
                            text: 'Across'
                        },
                        horizontal: {
                            text: 'Down'
                        }
                    },
                    col: { col: 12, md: 12, sm: 12 },
                },
                shuffle: false,
                numeric: false
            },
            content: [
                {
                    text: 'a person who controls traffic on the road _______________',
                    answer: 'policeman',
                    row: 0,
                    col: 0,
                    direction: 'h'
                },
                {
                    text: 'It is the other name of roundabout in the road _______________',
                    answer: 'circle',
                    row: 3,
                    col: 3,
                    direction: 'h'
                },
                {
                    text: 'a covered road on which people can walk _______________',
                    answer: 'pavement',
                    row: 6,
                    col: 5,
                    direction: 'h'
                },
                {
                    text: 'this is worn to protect the head _______________',
                    answer: 'helmet',
                    row: 10,
                    col: 7,
                    direction: 'h'
                },
                {
                    text: 'you must stop when this light is on _______________',
                    answer: 'red',
                    row: 4,
                    col: 0,
                    direction: 'h'
                },

                {
                    text: 'It is the opposite of up _______________',
                    answer: 'down',
                    row: 4,
                    col: 2,
                    direction: 'v'
                },
                {
                    text: 'you need these to start a car _______________',
                    answer: 'keys',
                    row: 2,
                    col: 8,
                    direction: 'v'
                },
                {
                    text: 'you must wear this before you drive or ride a car _______________',
                    answer: 'seatbelt',
                    row: 5,
                    col: 8,
                    direction: 'v'
                }
            ]
        },
        {
            id: 23,
            lang: 'en',
            head: 'Template : 22',
            content: {
                replacement: '#_#',
                showInput: false,
                text: {
                    text: 'sfsf `theta` jsfjsvbf jsbvfjsfs jsfjsf',
                    side: 'left'
                },
                img: {
                    width: '35%',
                    path: 'img/1.png',
                    imageclass: 'text-center'
                },
                questions: [
                    { text: 'sfsf jsfjsvbf jsbvfjsfs jsfjsf `theta` <br> #_#', answer: 'a' },
                    { text: 'sfsf jsfjsvbf jsbvfjsfs jsfjsf `theta` <br> #_#', answer: 'b' }
                ]
            }
        },
        {
            id: 24,
            lang: 'sk',
            head: 'Template : 23',
            content: {
                replacement: '#_#',
                side: 'left',
                hint: true,
                config: {
                    showQuestion: true,
                },
                questions: [
                    { sequence: 1, direction: 'v', row: [2, 16], col: [20], question: '`theta` Fossil scientists', answer: "paLEONTOLOGISTS" },
                    { sequence: 2, direction: 'v', row: [4, 10], col: [6], question: { text: 'Coins, tools, art #_#', image: { path: 'img/414.png', width: '20%' } }, answer: { text: 'SOURCES', image: { path: 'img/2.png', row: 1, col: 6 } } },
                    { sequence: 3, direction: 'h', row: [5], col: [1, 14], question: 'Scientist who studies humans', answer: { text: 'ANTHROPOLOGIST', image: { path: 'img/3.png', row: 2, col: 1 } } },
                    { sequence: 4, direction: 'v', row: [5, 11], col: [13], question: 'Biographies, plays etc', answer: { text: 'SECULAR', image: { path: 'img/4.png', row: 2, col: 13 } } },
                    { sequence: 5, direction: 'v', row: [5, 13], col: [22], question: 'Study of Earth\'s history', answer: { text: 'GEOLOGIST', image: { path: 'img/5.png', row: 2, col: 22 } } },
                    { sequence: 6, direction: 'h', row: [7], col: [5, 15], question: { text: 'Oral accounts from relatives #_#', image: { path: 'img/2.png', width: '20%' } }, answer: { text: 'ORALSOURCES', image: { path: 'img/6.png', row: 6, col: 3 } } },
                    { sequence: 7, direction: 'v', row: [9, 15], col: [9], question: 'Facts in time order', answer: { text: 'HISTORY', image: { path: 'img/414.png', row: 12, col: 7 } } },
                    { sequence: 8, direction: 'v', row: [9, 17], col: [25], question: 'Legends & folk stories', answer: { text: 'FOLKLORES', image: { path: 'img/ch4_1.png', row: 6, col: 25 } } },
                    { sequence: 9, direction: 'h', row: [10], col: [2, 11], question: 'Old handwritten record', answer: { text: 'MANUSCRIPT', image: { path: 'img/ch4_2.png', row: 11, col: 3 } } },
                    { sequence: 10, direction: 'h', row: [11], col: [12, 25], question: 'Remains to study past life', answer: { text: 'ARCHAEOLOGICAL', image: { path: 'img/ch4_3.png', row: 12, col: 12 } } },
                ]
            }
        },
        {
            id: 25,
            lang: 'hi',
            head: 'Template : 24',
            content: {
                main: {
                    text: {
                        text: `करता \`theta\` था शैतानी दिनभर, गिरकर लगती चोट मुझे, होते घरवाले सब परेशान। समझ न आती उनकी बात, जितना मचाता तूफ़ान मैं, घर के होते खुश सब लोग।करता था शैतानी दिनभर, गिरकर लगती चोट मुझे, होते घरवाले सब परेशान। समझ न आती उनकी बात, जितना मचाता तूफ़ान मैं, घर के होते खुश सब लोग।करता था शैतानी दिनभर, गिरकर लगती चोट मुझे, होते घरवाले सब परेशान। समझ न आती उनकी बात, जितना मचाता तूफ़ान मैं, घर के होते खुश सब लोग।करता था शैतानी दिनभर, गिरकर लगती चोट मुझे, होते घरवाले सब परेशान। समझ न आती उनकी बात, जितना मचाता तूफ़ान मैं, घर के होते खुश सब लोग।करता था शैतानी दिनभर, गिरकर लगती चोट मुझे, होते घरवाले सब परेशान। समझ न आती उनकी बात, जितना मचाता तूफ़ान मैं, घर के होते खुश सब लोग।`,
                        side: 'bottom'
                    },
                    img: {
                        width: `20%`,
                        path: `img/ch4_1.png`,
                    },
                    audio: 'audio/correct.mp3',
                },
                col: { col: 12, md: 6, sm: 6 },
                questions: [
                    {
                        question1: {
                            text: 'बच्चों की किन बातों से घर के लोग खुश होते हैं?',
                            image: 'img/ch4_1.png',
                            audio: 'audio/1.mp3'
                        },
                        options: [
                            { text: 'खेल-कूद में तूफ़ान मचाने पर `theta`' },
                            { text: 'खूब सोते रहने से', },
                            { image: 'img/ch4_1.png' },
                            { text: 'इनमें से कोई नहीं ', image: 'img/ch4_1.png' }
                        ],
                        answer: 2
                    },
                    {
                        question: {
                            text: 'बच्चों की किन बातों से घर के लोग परेशान होते हैं?',
                            audio: ''
                        },
                        options: [
                            { text: 'खूब रोने से' },
                            { text: 'खेलने में चोट लगने से' },
                            { text: 'बार-बार खाने की इच्छा करने से' },
                            { text: 'इनमें से कोई नहीं' }
                        ],
                        answer: 1
                    },
                    {
                        question: {
                            text: '3बच्चों की किन बातों से घर के लोग परेशान होते हैं?',
                            audio: 'audio/2.mp3'
                        },
                        options: [
                            { text: 'खूब रोने से' },
                            { text: 'खेलने में चोट लगने से 2' },
                            { text: 'बार-बार खाने की इच्छा करने से' },
                            { text: 'इनमें से कोई नहीं' }
                        ],
                        answer: 1
                    }
                ]
            }
        },
        {
            id: 26,
            lang: 'en',
            head: 'Template : 25 `theta`',
            content: {
                video: {
                    path: './video.mp4',
                    youtube: true
                }
            }
        },
        {
            id: 27,
            lang: 'hi',
            head: 'Template : 26',
            subhead: "पेड़ - प्रकृति का वरदान",
            content: {
                image: {
                    path: ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png'],
                    align: ['right', 'left', 'right', 'left'],
                    width: '15%',
                    replacement: '#_#'
                },
                text: "पेड़-पौधे `theta` हमारी धरती माँ के सिर्फ़ शृंगार ही नहीं, #_# बल्कि उसपर स्थित जीवन के आधार भी हैं। इनके बिना हम जीवन की कल्पना भी #_# नहीं कर सकते। प्राचीन काल से ही हमारे ऋषियों, मुनियों और विचारकों ने पेड़-पौधों के महत्त्व को समझा। यही कारण है कि हमारी संस्कृति में वनों का इतना महत्त्व है। हमारे यहाँ पेड़-पौधों को लगाना, इनकी पूजा करना और वन-महोत्सव की प्रथा का प्रचलन प्राचीन काल से है और इसके वैज्ञानिक कारण भी हैं। #_# पेड़ों की पूजा अंधविश्वास नहीं है। पेड़-पौधे हमारे लिए बहुत लाभदायक हैं। इनसे हमें खाने के लिए फ़ल, विश्राम के लिए छाया, रोगों के लिए औषधियाँ, जलाने के लिए ईंधन एवं शुद्ध वातावरण आदि मिलता है। अतः उनके प्रति कृतज्ञता प्रकट करना हमारा प्रथम कर्तव्य है। पेड़-पौधे हमेशा से हम पर उपकार करते आए हैं। पेड़-पौधों द्वारा जलवायु औरवातावरण का संतुलन बना रहता है। इनकी जड़ें मिट्टी को जकड़कर रखती हैं तथा पत्तियाँ सड़कर खाद (ह्यूमस) का काम करती हैं। #_# इससे मृदा-क्षरण कम होता है। यह तो हम सभी जानते हैं कि पेड़-पौधों में जीवन होता है। वे भी हमारी तरह दुख-सुख का अनुभव कर अपनी प्रतिक्रिया व्यक्त करते हैं। कहा जाता है कि मनुष्य पर उसके चारों ओर के वातावरण का असर पड़ता है, इसलिए अगर हम अपने चारों तरफ़ की धरती को पेड़ लगाकर हरा कर दें, तो चारों तरफ़ का सौंदर्य देखने लायक होगा, फिर जो मनुष्य ऐसे वातावरण में रहेगा, उसका हृदय भी उसी तरह खुशहाल हो जाएगा। पेड़ तो प्रकृति का सबसे बड़ा वरदान है। #_# अगर पेड़ हैं तो वर्षा होगी, पानी की समस्या नहीं रहेगी एवं ऑक्सीजन और कार्बन डाइऑक्साइड गैसों में संतुलन रहेगा। यदि पेड़ों की संख्या बढ़ा दी जाए तो ग्रीन हाउस गैसों के असर से भी हम बच सकते हैं। प्रगति की ओर बढ़ रहे मानव ने नगर, महानगर, यहाँ तक कि कस्बे और देहात तक में छोटे-बड़े उद्योग-धंधों के रूप में अनेक छोटी-बड़ी फ़ैक्टरियाँ लगाई हैं। उनसे धुआँ, तरह-तरह की विषैली गैसें आदि निकलकर पर्यावरण को प्रदूषित कर रही हैं। पेड़-पौधे उनसे निकलने वाली प्रदूषित गैसों को पर्यावरण में घुलने से रोककर पर्यावरण को दूषित होने से बचाते हैं। पेड़-पौधे उस कामधेनु की भाँति हैं, जिसके बिना जीना असंभव है। इनके बिना हमारा अस्तित्व ही समाप्त हो जाएगा, अतः हमें चाहिए कि ज़्यादा-से-ज़्यादा पेड़ लगाकर अपनी पृथ्वी को बचाएँ, अन्यथा वह समय दूर नहीं, जब पृथ्वी पर जीव और जीवन एक इतिहास बन जाएगा।",
            }
        },
        {
            id: 28,
            lang: 'hi',
            head: 'Template : 27',
            hintText: false,
            subhead: "‘विज्ञान के चमत्कार’ `theta` विषय पर लगभग 200-250 शब्दों में निबंध लिखिए।",
            content: {
                heading: " • विज्ञान का उद्देश्य मानव जीवन को सरल व कष्टरहित बनाना • विभिन्न क्षेत्रों में चमत्कार • चिकित्सा क्षेत्र में• संचार व परिवहन क्षेत्र में • शिक्षा व कृषि क्षेत्र में • विभिन्न  ष्कारों ने मानव जीवन को सुविधासंपन्न बना दिया है।",
                answer: `<div class='headingInDtaAns'>विज्ञान के चमत्कार</div>
                        यदि विज्ञान के क्षेत्र में निरंतर नए-नए आविष्कार न होते तो कदाचित आज मानव प्रगति के सर्वोच्च शिखर पर
                        आसीन न होता। 
                        वैज्ञानिकों ने \`theta\` नित्य नए आविष्कार करके मनुष्य के जीवन को कष्टरहित एवं आनंददायी बना दिया है। आज
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
                textArea: {
                    count: 1,
                    type: 'multi',
                    height: '100px',
                },
                image: {
                    path: 'img/1.png',
                    side: 'top',
                    width: '150px',
                },
                showInput: false,
            }
        },
        {
            id: 29,
            lang: 'hi',
            head: 'Template : 28',
            subhead: "‘विज्ञान के चमत्कार’ `theta` विषय पर लगभग 200-250 शब्दों में निबंध लिखिए।",
            content: {
                heading: "दादा जी `theta` को स्वास्थ्य का ध्यान रखने की सलाह देते हुए पत्र",
                questions: [
                    { label: "घर का पता एवं स्थान", answer: `<b>डी-32/3 लाजपत नगर <br/>नई दिल्ली </b>` },
                    { label: "तिथि", answer: `दिनांक- ............................` },
                    { label: "संबोधन", answer: `पूजनीय \`theta\` दादा जी,` },
                    { label: "अभिवादन", answer: `सादर चरण स्पर्श।` },
                    { label: "समाचार विस्तार से", answer: `आपका पत्र मिला। घर का समाचार पढ़कर खुशी हुई, किंतु आपके स्वास्थ्य को लेकर चिंता बढ़ गई है। आपने लिखा है कि आपके पैरों में दर्द बढ़ गया है, जिससे चलने-फि़रने में तकलीफ़ होती है। आप अपना ध्यान रखें और किसी अच्छे अस्पताल में इलाज- कराएँ, जिससे आप ठीक प्रकार से चल सकें। व्यायाम करते रहें, जिससे हाथ-पैर चलते रहें। दवाई भी समय पर लें। मेरी तरफ़ से आप निशि्ंचत रहें। इस वर्ष भी मैं प्रथम आने के लिए जी-तोड़ मेहनत कर रहा हूँ। आजकल परीक्षा की तैयारी में व्यस्त हूँ। मैं दीपावली की छुट्टियों में आपसे मिलने आ रहा हूँ। मेरी ओर से घर में दादी जी, माता जी को सादर प्रणाम तथा शोभा को प्यार कहिएगा।` },
                    { label: "अपना रिश्ता बताते हुए", answer: `आपका प्यारा पोता` },
                    { label: "नाम", answer: `<b>अमित</b>` }
                ]
            }
        },
        {
            id: 30,
            lang: 'hi',
            head: 'Template : 29',
            subhead: 'अपनी छोटी बहन को मोबाइल पर `theta` व्यर्थ समय बिताने की जगह पढ़ाई पर ध्यान देने का सुझाव देते हुए पत्र लिखिए।',
            content: {
                showButtons: true,
                showAnswerOfId: 1,
                inputLeft: true,
                hint: 'आदरणीया चाची जी, गर्मियों की छुट्टियाँ, बड़े दिनों से दिल्ली नहीं आईं, रीनू-चीनू को लेकर आएँ, कुछ  दिन रहे सब मिलकर मजे करेंगे',
                image: {
                    path: 'img/1.png',
                    width: '15%'
                },
                col: {
                    left: { md: 4, sm: 6, col: 6, show: true },
                    right: { md: 6, sm: 6, col: 6, show: true }
                },
                placeholder: {
                    left: 'यहाँ सामग्री लिखें...',
                    right: 'यहाँ विधि लिखें...'
                },
                question: [
                    { id: 1, text: "घर का पता एवं स्थान", answer: `ए-25/26,  पश्चिमी (वेस्ट) पटेल नगर,  नई दिल्ली - 110007` },
                    { id: 2, text: "तिथि", answer: 'दिनांक - 10-03-20xx' },
                    { id: 3, text: "संबोधन", answer: 'प्रिय बहन खुशी,' },
                    { id: 4, text: "अभिवादन", answer: 'शुभाशीर्वाद,' },
                    { id: 5, text: "समाचार विस्तार से", answer: `मैं यहाँ कुशल से हूँ तथा आशा करती हूँ कि चाचाजी, चाचीजी और तुम मेरठ में सकुशल होंगे। माँ-पिताजी और मैं यहाँ मजे में हैं। यह जानकर बड़ी प्रसन्नता हुई कि तुमने अपना पंद्रहवाँ जन्मदिन बड़े आनंद से मनाया। कल चाची जी से फ़ोन पर बात करते हुए मैंने यह सुना कि तुम आजकल सुबह से शाम तक उपहार में मिले मोबाइल फ़ोन से चिपकी रहती हो, तो मुझे बहुत दुख हुआ। बहन! मोबाइल फ़ोन आवश्यकता के समय प्रयोग की जाने वाली वस्तु है, न कि व्यर्थ समय गँवाने का साधन है। तुम यदि अपना समय मोबाइल फ़ोन के साथ बिताओगी, तो कक्षा में प्रथम कैसे आओगी? इसलिए तुम पहले की भाँति पढ़ाई-लिखाई पर ध्यान दो। ज़रूरी फ़ोन आने पर ही फ़ोन उठाओ। स्वयं को मोबाइल का दास मत बनाओ। आशा करती हूँ कि तुम मेरे सुझाव पर ध्यान दोगी। चाचा-चाची को कभी निराश नहीं करोगी। उनसे मेरा प्रणाम कहना। तुम्हें मेरा स्नेह भरा आशीर्वाद।` },
                    { id: 6, text: "पत्र पाने वाले से आपका रिश्ता", answer: 'तुम्हारी बड़ी बहन,' },
                    { id: 7, text: "नाम", answer: 'कoखoगo' }
                ]
            },
        },
        {
            id: 31,
            lang: 'en',
            head: "Template : 30 `theta`",
            content: {
                width: "200px",
                height: "200px",
                question: [
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
            id: 32,
            lang: 'en',
            head: 'Click on the correct words in the blanks given below.',
            content: {
                replacement: '#_#',
                question: [
                    { text: 'The `theta` maximum tally marks fell in a #_# range', options: ['general', 'particular'], answer: 0 },
                    { text: 'Raw data can be condensed using a #_#', options: ['class intervals', 'age intervals'], answer: 1 },
                    { text: 'No two students had identical #_#', options: ['heights and weights', 'health requirements'], answer: 1 },
                    { text: 'Many students had their data falling under the same #_#', options: ['index', 'range'], answer: 1 },
                    { text: 'The teacher guessed to take the highest and lowest scores to calculate the #_# of the pupils.', options: ['heights and weights', 'age and length'], answer: 1 },
                ]
            }
        },
        {
            id: 33,
            lang: 'en',
            head: 'Template : 32',
            subhead: '(Drag and `theta` arrange each word in the order you will find them in a dictionary.)',
            content: [
                'Negligence', 'Untruthfulness', '`theta`', 'Omnibus', 'Flustered', 'Stupidity',
                'Scrimping', 'Patronage', 'Relinquished', 'Celestial', 'Xenophobia',
                'Grimly', 'Hankering', 'Quavered', 'Angel', 'Deterrence', 'Lavender', 'aeroplane',
            ]
        },
        {
            id: 34,
            lang: 'en',
            head: '`theta` Numbers and Numeration',
            subhead: 'Drag the correct answer',
            content: {
                shuffle: false,
                questions: [
                    {
                        type: 'x',
                        replacement: '#_#',
                        text: ['`theta` `sqrt(49)`  = #_# + 200 = 207 x #_# = #img#'],
                        image: {
                            width: '200px',
                            path: 'img/414.png',
                            replacement: '#img#',
                        },
                        options: ['7', '2', '20', '`theta`'],
                        correct: [0, 3]
                    },
                    {
                        type: '+',
                        text: ['393', '607'],
                        options: ['1000', '5987', '3895', '9538'],
                        correct: [0]
                    },
                    {
                        type: 'x',
                        replacement: '#_#',
                        text: ['200 + 200 = #_# + 200 = #_#'],
                        options: ['400', '700', '600'],
                        correct: [0, 2]
                    }
                ]
            }
        },
        {
            id: 35,
            content: {
                buttons: [
                    { ytId: 'xyxlR0DNyRI', isVideo: false, label: '1 पुल्लिङ्गम् `theta` प्रथम:' },
                    { ytId: '1h5JA1fqXvo', isVideo: true, label: '2 स्त्रीलिङ्गम्' },
                    { ytId: 'xyxlR0DNyRI', isVideo: true, label: '3 नपुंसकलिङ्गम्' },
                    { ytId: 'xyxlR0DNyRI', isVideo: true, label: '4 पुल्लिङ्गम्' },
                    { ytId: 'xyxlR0DNyRI', isVideo: true, label: '5 स्त्रीलिङ्गम् ' },
                    { ytId: 'xyxlR0DNyRI', isVideo: true, label: '6 नपुंसकलिङ्गम्' },
                    { ytId: 'xyxlR0DNyRI', isVideo: true, label: '7 पुल्लिङ्गम्' },
                    { ytId: 'xyxlR0DNyRI', isVideo: true, label: '8 स्त्रीलिङ्गम्' },
                    { ytId: 'xyxlR0DNyRI', isVideo: true, label: '9 नपुंसकलिङ्गम्' },
                    { ytId: 'xyxlR0DNyRI', isVideo: true, label: '10 नपुंसकलिङ्गम्' }
                ]
            }
        },
        {
            id: 36,
            lang: 'en',
            head: 'Template : 35',
            content: {
                options: ['`theta`', '120', '40', '160', '180', '480'],
                section: {
                    visible: true,
                    heading: {
                        primary: 'XYZ `theta` Sweets',
                        secondary: '9876543210',
                    },
                    list: [
                        { label: 'Location', text: 'New Delhi' },
                        { label: 'Bill No', text: '125847' },
                        { label: 'Date', text: '08/12/2025' }
                    ],
                    block: {
                        label: 'Name & Address :',
                        text: 'Mr. Patel, Rajender Nagar, New Delhi'
                    }
                },
                table: {
                    head: ['S.N.', 'Name of the Items', 'Quantity (in kg)', 'Rate (₹/kg)', 'Amount (in ₹)'],
                    body: [
                        [
                            { value: '1.' },
                            { value: 'Curd' },
                            { value: '2 kg.' },
                            { value: '₹ 60.00' },
                            { value: '120', drop: true }
                        ],
                        [
                            { value: '2.' },
                            { value: 'Cheese' },
                            { value: '2 kg.' },
                            { value: '₹ 20.00' },
                            { value: '40', drop: true }
                        ],
                        [
                            { value: '3.' },
                            { value: 'Rasgulla' },
                            { value: '2 kg.' },
                            { value: '₹ 80.00' },
                            { value: '160', drop: true }
                        ],
                        [
                            { value: '4.' },
                            { value: 'Burfee' },
                            { value: '2 kg.' },
                            { value: '₹ 80.00' },
                            { value: '160', drop: true }
                        ],
                        [
                            { value: 'Total', colspan: 4, class: 'totalAmtText' },
                            { value: '480', drop: true }
                        ],
                        [
                            { value: 'Signature of the Shopkeeper', colspan: 5, class: 'signatureOf' }
                        ]
                    ]
                }
            }
        },
        {
            id: 37,
            lang: 'en',
            head: 'Template : 36',
            subhead: 'वर्णों को `theta` सही क्रम में लगाकर सार्थक शब्द बनाओ-',
            content: {
                width: {
                    heading: '240px'
                },
                data: {
                    replacement: '#_#',
                    bullets: true,
                    shuffle: false,
                    questions: [
                        [
                            { id: 1, text: '#_# + #_#', answer: ['न', 'ल'] },
                            { id: 2, text: '#_# + #_#', answer: ['क', 'ल'] },
                            { id: 3, text: '#_# + #_#', answer: ['च', 'ल'] },
                            { id: 4, text: '#_# + #_# + #_#', answer: ['क्ष', 'त्रि', 'य'] },
                            { id: 5, text: '#_# + #_#', answer: ['र', 'थ'] }
                        ],
                        [
                            { id: 1, text: '#_# + #_# + #_#', answer: ['क', 'ल', 'न'] },
                            { id: 2, text: '#_# + #_# + #_#', answer: ['ग', 'ल', 'न'] },
                            { id: 3, text: '#_# + #_# + #_#', answer: ['प', 'व', 'न'] },
                            { id: 4, text: '#_# + #_# + #_#', answer: ['ख़', 'ब', 'र'] },
                            { id: 5, text: '#_# + #_# + #_#', answer: ['न', 'ह', 'र'] }
                        ]
                    ]
                }
            }
        },
        {
            id: 38,
            lang: 'en',
            head: 'Template : 37, Spell Check `theta`',
            mode: 'multiple',
            content: {
                replacement: '#{word}#',
                questions: [
                    {
                        id: 1, 
                        text: 'I am six years old. I study in Class 1. <br> I have #blac# #hare# and #broun# eyes. I have strong #leggs#. They help me #ren# fast. Today, I fell and hurt my #kne asdf#. I hope to get well soon and run again.',
                        answer: ['black', 'hair', 'brown', 'legs', 'run', 'knee'] 
                    }
                ]
            }
        },
        {
            id: 39,
            lang: 'en',
            head: 'Template : 38, Spell It Out `theta`',
            content: {
                count: 6,
                words: ['Jeans', 'Sweater', 'cap', 'shorts', 'frock', 'skirt', 'hat', 'Vest', 'clothes', 'socks', 't-shirt', 'trousers', 'shirt', 'scarf', 'tie']
            }
        },
        {
            id: 40,
            lang: 'hi',
            head: 'Template : 39, `theta` Vowel Drag and Drop',
            content: {
                replacement: '#',
                col: { col: 12, md: 6, sm: 12 },
                image: {
                    path: 'img/1.png',
                    width: '20%',
                },
                words: [
                    { text: "#बल्टी# #घड़या# नद #सरस्वत# `theta`", answer: ['बाल्टी', 'घड़िया', 'सरस्वती'] },
                    { text: "नद", answer: "नदी" },
                    { text: "#घड़या#", image: { path: 'img/3.png', width: '15%' }, answer: ["घड़िया"] },
                    { text: "सरस्वत #बल्टी# #नद#", image: { path: 'img/4.png', width: '15%' }, answer: ['बाल्टी', 'नदी'] },
                    { text: "#बल्टी#", image: { path: 'img/5.png', width: '15%' }, answer: ["बाल्टी"] }
                ],
                vowels: ["ा", "ि", "ी", "ु", "ू", "े", "ै", "ो", "ौ", "ं", "ः", "ँ"]
            }
        },
        {
            id: 41,
            lang: 'en',
            head: 'Template : 19, Shabdkosh `theta`',
            shuffle: false,
            content: [
                {
                    id: 1,
                    tabtitle: 'aPPle',
                    meaning: 'कूद-कूदकर',
                    sentence: 'छोटी चिड़ियाँ `theta` appleing चलना सीखती हैं। appleing',
                    image: {
                        path: 'img/1.png',
                        width: '20%'
                    },
                    titles: [
                        { title: "1कूद-कूदकर", text: "1छोटी चिड़ियाँ `theta` appleing चलना सीखती हैं। appleing" },
                        { title: "SentenCe", text: "छोटी apple" },
                        { title: "1Antonyms", text: "चिड़ियाँ" },
                    ]
                },
                {
                    id: 2,
                    tabtitle: 'कूद-कूदकर',
                    meaning: 'कूद-कूदकर',
                    sentence: 'छोटी चिड़ियाँ कूद-कूदकरकू चलना सीखती हैं।',
                    image: {
                        path: 'img/2.png',
                        width: '20%'
                    },
                    titles: [
                        { title: "2कूद-कूदकर", text: "2छोटी चिड़ियाँ appleing चलना सीखती हैं। appleing" },
                        { title: "2Synonyms", text: "2छोटी" },
                        { title: "sentence", text: "2चिड़ियाँ कूद-कूदकर" },
                    ]
                }
            ]
        },
        {
            id: 42,
            head: 'Template : 40, VirtualTour `theta`',
            lang: 'en',
            content: {
                questions: [
                    {
                        id: 1,
                        title: {
                            main: {
                                text: '`theta` Fascinating Facts'
                            },
                            sub: {
                                text: 'here `theta` some sub title text',
                                classes: 'text-success `theta` bg-success-subtle border-success border rounded-3 w-50 text-uppercase p-2'
                            }
                        },
                        set: {
                            virtualTour: false,
                            questions: [
                                {
                                    head: 'image - position - top',
                                    sentence: 'question `theta` set sentencehere and item size lorem.',
                                    imageLayout: {
                                        col: { md: 4, sm: 6, col: 12 },
                                        position: 'top',
                                        width: '50%',
                                        images: [
                                            { path: 'img/1.png', caption: 'police-man-1' },
                                            { path: 'img/2.png', caption: 'police-man-2 `theta`' },
                                            { path: 'img/3.png', caption: 'police-man-3' },
                                            { path: 'img/3.png', caption: 'police-man-3' }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        id: 2,
                        title: {
                            main: {
                                text: 'Virtual Tour'
                            },
                            sub: {
                                text: 'here some sub `theta` title text',
                                classes: 'text-success bg-success-subtle rounded-3 w-50 text-uppercase p-2'
                            }
                        },
                        set: {
                            virtualTour: true,
                            imageWidth: '100%',
                            col: {
                                md: 4,
                                sm: 6,
                                col: 3,
                            },
                            images: [
                                { path: 'img/1.png', caption: 'text-1' },
                                { path: 'img/2.png', caption: 'text-2' },
                                { path: 'img/3.png', caption: 'text-3' },
                                { path: 'img/4.png', caption: 'text-4' },
                                { path: 'img/5.png', caption: 'text-5' }
                            ],
                            audio: { path: 'audio/ohGalat.mp3' }
                        }
                    },
                    {
                        id: 2,
                        title: {
                            main: {
                                text: 'Fascinating Facts-2 `theta`'
                            },
                            sub: {
                                text: 'here some sub title text',
                                classes: 'text-success bg-success-subtle rounded-3 w-50 text-uppercase p-2'
                            }
                        },
                        set: {
                            virtualTour: false,
                            questions: [
                                {
                                    head: 'image - position - left',
                                    sentence: 'question set `theta` sentencehere and item size lorem.',
                                    imageLayout: {
                                        position: 'left',
                                        width: '150px',
                                        images: [
                                            { path: 'img/1.png', caption: 'police-man-1' },
                                            { path: 'img/2.png', caption: 'police-man-2' },
                                            { path: 'img/3.png', caption: 'police-man-3' }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            id      : 43,
            head    : 'Template : 43, CircleAndUnderline `theta`',
            lang    : 'mt',
            config  : {
                // To hide the menu, make either of them true, but not both.
                menuOptions : {
                    circle    : false,
                    underline : true
                }
            },
            content : {
                questions: [
                    {
                        id    : 1,
                        words : [ 'lorem', 'ipsum', 'red dipsum', 'bipsum', 'chipsum', '`theta`', 'lipsum', '.' ],
                        highlight : { // Index of words
                            circle    : [ 0, 2 ],
                            underLine : [ 4, 5 ],
                            disabled  : [ 3, 6 ]
                        }
                    },
                    {
                        id    : 2,
                        words : [ 'lorem', 'ipsum', 'red dipsum', 'bipsum', 'chipsum', 'lipsum' ],
                        highlight : {
                            circle    : [ 0, 2 ],
                            underLine : [ 1, 5 ]
                        }
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
            if( !src ) {
                reject(new Error('No script src provided'));
                return;
            }

            const exists = [...document.querySelectorAll('script')].some(script => script.src.includes(src));
            if( exists ) {
                resolve('already-loaded');
                return;
            }
            
            const s   = document.createElement('script');
            s.src     = src;
            s.onload  = () => resolve(s);
            s.onerror = (err) => {
                s.remove();
                reject(new Error(`Failed to load script: ${src}`));
            };
            document.body.appendChild(s);
        });
    };

    (async () => {
        const p = 'js/newActJS';
        const v = Date.now();

        await loadScript(`${p}/modules.js?v=${v}`);
        await loadScript(`${p}/templates.js?v=${v}`);
        await loadScript(`${p}/ui.js?v=${v}`);
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
