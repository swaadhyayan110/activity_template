const activities = {};

const Helper = (() => {

    const __audio = new Audio();

    __audio.addEventListener('ended', () => {

        $('.common_playBtn').show();
        $('.common_pauseBtn').hide();

        $("#question-container-box").slideDown('slow');

    });

    const playAudio = async ({ playBtn = '.common_playBtn', pauseBtn = '.common_pauseBtn', handleBtn = true } = {}) => {

        try {
            $('#listening_container').hide();
            $('#question_header_container').show();
            if (handleBtn) {
                $(playBtn).hide();
                $(pauseBtn).show();
            }

            await __audio.play();

        }
        catch (err) {

            // ignore AbortError (normal behavior)
            if (err.name !== "AbortError") {
                console.error("Playback failed:", err);
            }

        }

    }

    const pauseAudio = () => {

        __audio.pause();

        $('.common_playBtn').show();
        $('.common_pauseBtn').hide();

    }

    const stopAudio = () => {

        __audio.pause();
        __audio.currentTime = 0;

        $('.common_playBtn').show();
        $('.common_pauseBtn').hide();

        $("#question-container-box").slideDown('slow');

    }

    const setAudio = (src) => {

        if (!src) return;

        // stop current audio safely
        __audio.pause();

        // reset source safely
        __audio.removeAttribute('src');
        __audio.load();

        // set new source
        __audio.src = src;

    }

    const defaultCol = {
        md: 12,
        sm: 12,
        col: 12
    };

    return {
        setAudio,
        playAudio,
        stopAudio,
        pauseAudio,
        audio: __audio,
        defaultCol
    }
})();

const Activity = (() => {

    const store = { templates: {} };

    const css = (href) => {
        try {
            if (!href) return;

            const completePath = 'css/newActCss/' + href;
            const exists = [...document.querySelectorAll('link[rel="stylesheet"]')].some(link => link.href.includes(completePath));

            if (exists) return;

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = completePath;
            document.head.appendChild(link);
        } catch (err) {
            console.error('Activity.css : ', err);
        }
    };

    const template = (tid) => {
        try {
            const found = Templates.get('templates')?.find(t => t.id === tid);
            return found ? found.template : null;
        } catch (err) {
            console.error('Activity.template : ', err);
        }
    };

    const getDefine = (questionId) => {
        try {
            return Define.get('questions')?.find(q => q.id == questionId);
        } catch (err) {
            console.error('Activity.getDefine : ', err);
        }
    };

    const shuffleArray = (array) => {
        try {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        } catch (err) {
            console.error('Activity.shuffleArray : ', err);
            return [];
        }
    };

    const shuffleWords = (words) => {
        try {
            if (!Array.isArray(words)) return words;

            const arr = [...words];
            do {
                for (let i = arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            } while (JSON.stringify(arr) === JSON.stringify(words) && words.length > 1);
            return arr;
        } catch (err) {
            console.error('Activity.shuffleWords : ', err);
        }
    };

    const getQid = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.dataset.qid : undefined;
    };

    const setQid = (selector, questionId) => {
        const ele = document.querySelector(selector);
        if (ele) {
            ele.dataset.qid = questionId;
            return true;
        } else {
            console.warn('[WARNING]', 'Unable to set qid');
            return false;
        }
    };

    const setHeader = (questionID) => {
        try {
            const data = getDefine(questionID);
            const container = document.querySelector(Define.get('questionContainer'));
            if (!container) {
                console.warn('setHeader: container not found:', container);
                return;
            }

            const head = Define.get('head');
            const subHead = Define.get('subHead');
            const eleArr = [head, subHead].map(item => `.${item}`);

            const elements = {};

            const elHead = container.querySelector(eleArr[0]);
            const elSub = container.querySelector(eleArr[1]);

            if (elHead) elHead.innerHTML = data.head || elHead.remove();
            if (elSub) elSub.innerHTML = data.subhead || elSub.remove();

            elements.head = document.contains(elHead);
            elements.subhead = document.contains(elSub);

            return elements;

        } catch (err) {
            console.error('Activity.setHeader :- ', err);
        }
    };

    const toggleCheckBtn = (selector, disable) => {
        try {
            const container = document.querySelector(Define.get('questionContainer'));
            const btn = container.querySelector(selector);
            if (!btn) return;
            btn.disabled = disable;
            btn.style.opacity = disable ? "0.5" : "1";
            btn.style.pointerEvents = disable ? "none" : "auto";
        } catch (err) {
            console.error('Activity.toggleCheckBtn : ', err);
        }
    };

    const translateBulletLabels = ({ lang = 'mt', ind = 0, upperCase = false } = {}) => {
        const bullets = {
            en: [...'abcdefghijklmnopqrstuvwxyz'],
            hi: [...'कखगघङचछजझञटठडढणतथदधनपफबभमय'],
            mt: Array.from({ length: 26 }, (_, i) => (i + 1).toString()),
            ro: [
                'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x',
                'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx',
                'xxi', 'xxii', 'xxiii', 'xxiv', 'xxv', 'xxvi'
            ]

        }

        const chars = bullets[lang] ?? bullets.mt;
        const cased = upperCase ? chars.map(ch => ch.toUpperCase()) : chars;

        return (ind !== undefined && cased[ind] !== undefined) ? cased[ind] : '-';
    };

    const translateButtonLabels = (lang = 'hi') => {
        if (lang == 'hi') {
            return {
                check: 'उत्तर जाँचिए',
                show: 'उत्तर देखो',
                submit: 'सबमिट करें',
                replay: 'दुबारा खेलें',
                try: 'पुनः प्रयास करें'
            };
        }
        else if (lang == 'en') {
            return {
                check: 'Check Answers',
                show: 'Show Answers',
                submit: 'Submit',
                replay: 'Replay',
                try: 'Try Again'
            };
        }
        else if (lang == 'fr') {
            return {
                check: 'Vérifier les réponses',
                show: 'Afficher les réponses',
                submit: 'Soumettre',
                replay: 'Rejouer',
                try: 'Essayer à nouveau'
            };
        }
        else if (lang == 'sk') {
            return {
                check: 'उत्तराणि पश्यन्तु',
                show: 'उत्तराणि दर्शयतु',
                submit: 'उपस्थापयतु',
                replay: 'पुनः वादयति',
                try: 'पुनः प्रयासं कुरुत'
            };
        }
    };

    const translatePopupLabels = (lang = 'hi') => {
        if (lang == 'hi') {
            return {
                excellent: 'उत्कृष्ट!',
                great: 'बहुत अच्छा!',
                good: 'अच्छा!',
                perfect: 'बढ़िया!',
                correct: 'सही!',
                allCorrect: 'सभी उत्तर सही हैं 🎉',
                noCorrect: 'कोई भी उत्तर सही नहीं है ❌',
                almost: 'लगभग सही!',
                notBad: 'बुरा नहीं है',
                oops: 'अरे नहीं...',
                checkAnswers: 'अपने उत्तरों की जाँच करें',
                scored: (correct, total) => `आपने ${total} में से ${correct} अंक प्राप्त किए हैं ✅`,
                selectLeftFirst: 'कृपया पहले बाईं ओर की वस्तु चुनें!',
                selectTopFirst: 'कृपया पहले ऊपर की वस्तु चुनें!',
                selectImageFirst: 'कृपया पहले बाएँ या दाएँ कॉलम से एक छवि चुनें।',
                writeAtLeastOne: 'कृपया कम से कम एक उत्तर लिखें फिर उत्तर जाँचें।',
                noAnswerWritten: 'कोई उत्तर नहीं लिखा गया',
                answerReview: 'उत्तर समीक्षा',
                correctLabel: 'सही',
                wrongLabel: 'गलत',
                emptyLabel: 'खाली',
                ok: 'ठीक है',
                tryAgain: 'कृपया पुनः प्रयास करें।',
                pointsScored: (score, total) => `आपको ${total} में से ${score} अंक मिले हैं`,
                allLevelsCompleted: 'सभी स्तर पूरे हो गए हैं।',
                maxSelectionReached: (max) => `आप केवल ${max} शब्द चुन सकते हैं।`,
                holdOn: 'अरे रुकिए!',
                fillAllBlanks: 'कृपया सभी स्थानों को भरें!',
                notAttempted: 'प्रयास नहीं किया',
                incompleteAnswers: 'कुछ उत्तर अधूरे हैं, कृपया पुनः प्रयास करें।!',
                selectOptionBeforeNext: 'अगले पर जाने से पहले कृपया एक विकल्प चुनें।',
                info: 'जानकारी',
                chooseWord: 'एक शब्द चुनें!',
                chooseWordFromBox: 'उत्तर जाँचने से पहले कृपया बॉक्स से एक शब्द चुनें।',
                fillCrosswordBeforeChecking: 'जाँचने से पहले कृपया क्रॉसवर्ड भरें!',
                selectOptionForQuestion: (num) => `सबमिट करने से पहले कृपया प्रश्न ${num} के लिए एक विकल्प चुनें।`,
                unstoppable: 'आपने कमाल कर दिया!',
                superbJob: 'बहुत शानदार काम किया दोस्त!',
                selectAllWrongWords: 'कृपया सभी गलत शब्द चयनित करें।',
                fillAllAnswersCorrectlly: 'कृपया सभी उत्तर सही ढंग से भरें।',
                noSelectTitle: "⚠️ चयन करें",
                noSelectText: "कृपया कम से कम एक चित्र चुनें",
                correctTitle: "शाबाश! 👍",
                correctText: "सभी उत्तर सही हैं",
                wrongTitle: "गलत उत्तर ❌",
                wrongText: "कृपया दोबारा प्रयास करें",
                result: "परिणाम",
                yourAnswer: "आपका उत्तर",
                correctAnswer: "सही उत्तर",
                score: "अंक",
                notAttempted: "प्रयास नहीं किया",
                questionNotFound: "प्रश्न उपलब्ध नहीं है",
                questionLabel: "प्र",
                levelLabel: "स्तर",
                levelComplete: "पूरा हुआ",
                totalQuestions: "कुल प्रश्न",
                correctAnswers: "सही उत्तर",
                attemptNo: "प्रयास संख्या",
                goToLevel: (level) => `स्तर ${level} पर जाएँ`,
                finished: "समाप्त",
                choose: "चुनें",
                status: "स्थिति",
                correctStatus: "✔ सही",
                incorrectStatus: "❌ गलत",
                unattemptedStatus: "उत्तर नहीं दिया",
                allWordsCorrect: "आपने सभी शब्द सही लिखे!",
                excellentPerformance: "शानदार प्रदर्शन!",
                playAgain: "फिर से खेलें"
            };
        } else {
            return {
                excellent: 'Excellent!',
                great: 'Great!',
                good: 'Good!',
                perfect: 'Perfect!',
                correct: 'Correct!',
                allCorrect: 'All answers are correct 🎉',
                noCorrect: 'No answers are correct ❌',
                almost: 'Almost!',
                notBad: 'Not bad',
                oops: 'Oops!',
                checkAnswers: 'Check your answers',
                scored: (correct, total) => `You got ${correct} out of ${total} correct ✅`,
                selectLeftFirst: 'Please select left item first!',
                selectTopFirst: 'Please select top item first!',
                selectImageFirst: 'Please select an image from left or right column first.',
                writeAtLeastOne: 'Please write at least one answer and then check the answer.',
                noAnswerWritten: 'No answer was written',
                answerReview: 'Answer review',
                correctLabel: 'Correct',
                wrongLabel: 'Wrong',
                emptyLabel: 'Empty',
                ok: 'OK',
                tryAgain: 'Please try again.',
                pointsScored: (score, total) => `You scored ${score} out of ${total}`,
                allLevelsCompleted: 'All levels have been completed.',
                maxSelectionReached: (max) => `You can only select ${max} words.`,
                holdOn: 'Hold on a second!',
                fillAllBlanks: 'Please fill in all the blanks!',
                notAttempted: 'Not Attempted',
                incompleteAnswers: 'Some answers are incomplete, please try again.!',
                selectOptionBeforeNext: 'Please select an option before next.',
                info: 'Info',
                chooseWord: 'Choose a word!',
                chooseWordFromBox: 'Please choose a word from the box before checking your answer.',
                fillCrosswordBeforeChecking: 'Please fill the crossword before checking!',
                selectOptionForQuestion: (num) => `Please select an option for Question ${num} before submitting.`,
                unstoppable: 'You are unstoppable 😎🔥',
                superbJob: 'Superb Job Buddy!',
                selectAllWrongWords: 'Please select all wrong words first.',
                fillAllAnswersCorrectlly: 'Please fill all answers correctly',
                noSelectTitle: "⚠️ Select Images",
                noSelectText: "Please select at least one image",
                correctTitle: "Great! 👍",
                correctText: "All answers are correct",
                wrongTitle: "Wrong ❌",
                wrongText: "Please try again",
                result: "Result",
                yourAnswer: "Your Answer",
                correctAnswer: "Correct Answer",
                score: "Score",
                questionNotFound: "Question not found.",
                questionLabel: "Q",
                levelLabel: "Level",
                levelComplete: "completed.",
                totalQuestions: "Total Questions",
                correctAnswers: "Correct Answers",
                attemptNo: "Attempt No",
                goToLevel: (level) => `Go to Level ${level}`,
                finished: "Finished",
                choose: "choose",
                status: "Status",
                correctStatus: "✔ Correct",
                incorrectStatus: "❌ Incorrect",
                unattemptedStatus: "Unattempted",
                allWordsCorrect: "You wrote all the words correctly!",
                excellentPerformance: "Excellent performance!",
                playAgain: "Play again"
            };
        }
    };

    const translateTableHeads = (lang = 'hi') => {
        if (lang == 'hi') {
            return {
                sequence: 'प्रश्‍न संख्या',
                attempted: 'आपका उत्तर',
                correct: 'सही उत्तर',
                result: 'परिणाम'
            };
        } else {
            return {
                sequence: 'Question No.',
                attempted: 'Your Answer',
                correct: 'Correct Answer',
                result: 'Result'
            };
        }
    };

    const translateNextPrevLabel = (lang = 'hi') => {
        if (lang == 'hi') {
            return {
                next: 'अगला',
                prev: 'पिछला'
            };
        } else {
            return {
                next: 'Next',
                prev: 'Prev'
            };
        }
    };

    const hindiKeyboard = () => {
        return {
            "default": [
                "` १ २ ३ ४ ५ ६ ७ ८ ९ ० - = {bksp}",
                "{tab} क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण",
                "{lock} त थ द ध न प फ ब भ म य र ल व {enter}",
                "{shift} श ष स ह क्ष त्र ज्ञ ़ ं ँ ः {shift}",
                "{accept} {space} {alt}"
            ],
            "shift": [
                "~ ! @ # ₹ % ^ & * ( ) _ + {bksp}",
                "{tab} औ ऐ आ ई ऊ ए ओ ऋ ॠ ऌ ॡ { } |",
                "{lock} ा ि ी ु ू ृ े ै ो ौ ् {enter}",
                "{shift} ॐ ॰ ऽ ‘ ’ “ ” < > ? {shift}",
                "{accept} {space} {alt}"
            ],
            "alt": [
                "` ॑ ॒ ॓ ॔ ॕ ॖ ॗ क़ ख़ ग़ ज़ ड़ ढ़ फ़ {bksp}",
                "{tab} ॲ ऑ ऒ अ इ उ ए ओ औ ॠ ॡ { } |",
                "{lock} ँ ं ः ऽ ॐ ॰ ॠ ॡ ॲ {enter}",
                "{shift} ऍ ॅ ॉ ॊ ॴ ॵ ॶ ॷ ॸ ॹ {shift}",
                "{accept} {space} {default}"
            ]
        };
    };

    const translateBooleanLabels = (lang = 'hi') => lang == 'hi' ? ['सही', 'गलत'] : ['True', 'False'];
    const translateWordLabel = (lang = 'hi') => lang == 'hi' ? 'शब्द' : 'Word';
    const translateSentenceLabel = (lang = 'hi') => lang == 'hi' ? 'वाक्य' : 'Sentence';
    const translateMeaningLabel = (lang = 'hi') => lang == 'hi' ? 'अर्थ' : 'Meaning';
    const translateColumnLabel = (lang = 'hi') => lang == 'hi' ? 'खंड' : 'Column';
    const translateBoxLabel = (lang = 'hi') => lang == 'hi' ? 'बॉक्स' : 'Box';
    const translateHintLabel = (lang = 'hi') => lang == 'hi' ? 'संकेत' : 'Hint';
    const translateWriteAnsLabel = (lang = 'hi') => lang == 'hi' ? 'उत्तर लिखें' : 'write answer';

    const pathToCWD = () => assets_url;

    const get = (key) => store[key];

    const register = (name, mod) => {
        try {
            store.templates[name] = mod;
        } catch (err) {
            console.error('Activity.register : ', err);
        }
    };

    const render = (templateId, questionId, activityId = null) => {
        try {

            Helper.stopAudio();

            const templateName = template(templateId);
            if (!templateName) {
                console.error('Activity.render: unknown templateId', templateId);
                return;
            }

            const temp = store.templates[templateName];
            if (!temp || !temp.render) {
                console.error('Activity.render: module not registered:', templateName);
                return;
            }

            const qObj = getDefine(questionId);
            if (!qObj) {
                console.error('Activity.render: no question found for', questionId);
                return;
            }

            if (!activityId) {
                activityId = templateName === 'MatchLeftToRight' ? `m${qObj.id}` : `act${qObj.id}`;
            }

            temp.render(questionId, activityId);
        } catch (err) {
            console.error('Activity.render : ', err);
        }
    };

    return {
        get,
        css,
        render,
        getQid,
        setQid,
        register,
        template,
        setHeader,
        getDefine,
        pathToCWD,
        shuffleArray,
        shuffleWords,
        hindiKeyboard,
        toggleCheckBtn,
        translateBoxLabel,
        translateWordLabel,
        translateHintLabel,
        translateTableHeads,
        translateColumnLabel,
        translateMeaningLabel,
        translateButtonLabels,
        translateBulletLabels,
        translatePopupLabels,
        translateWriteAnsLabel,
        translateSentenceLabel,
        translateBooleanLabels,
        translateNextPrevLabel
    };
})();

const MatchLeftToRight = (() => {

    const drawArrow = (activityId, fromElement, toElement, color = "green") => {
        try {

            const svg = document.querySelector(`.matching-area.${activityId} svg`);
            if (!svg || !fromElement || !toElement) return;

            const leftId = fromElement.dataset.id;
            const rightId = toElement.dataset.id;

            svg.querySelectorAll(`line[data-from="${leftId}"], line[data-to="${rightId}"]`)
                .forEach(l => l.remove());

            const fromRect = fromElement.getBoundingClientRect();
            const toRect = toElement.getBoundingClientRect();
            const containerRect = fromElement.closest(".matching-area").getBoundingClientRect();

            const x1 = fromRect.right - containerRect.left;
            const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
            const x2 = toRect.left - containerRect.left;
            const y2 = toRect.top + toRect.height / 2 - containerRect.top;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("stroke", color);
            line.setAttribute("stroke-width", "2");
            line.dataset.from = leftId;
            line.dataset.to = rightId;

            if (color == 'green') {
                line.setAttribute("marker-end", "url(#arrowhead)");
            } else {
                line.setAttribute("marker-end", "url(#arrowheadRed)");
            }

            svg.appendChild(line);
        } catch (err) {
            console.error('MatchLeftToRight.drawArrow :', err);
        }
    };

    const checkAnswers = (activityId) => {
        try {
            const activity = activities[activityId];
            if (!activity) return;

            const correctMatches = activity.correctMatches || {};
            let correctCount = 0;

            const area = document.querySelector(`.matching-area.${activityId}`);
            if (!area) return;

            area.querySelectorAll(".item").forEach(item => {
                item.classList.remove("correct", "wrong");
            });

            for (const leftId in correctMatches) {
                const rightId = activity.userMatches[leftId];
                const leftItem = area.querySelector(`.left-items .item[data-id="${leftId}"]`);
                const rightItem = area.querySelector(`.right-items .item[data-id="${rightId}"]`);

                if (!leftItem || !rightItem) continue;

                if (rightId == correctMatches[leftId]) {
                    correctCount++;
                    drawArrow(activityId, leftItem, rightItem, "green");
                    leftItem.classList.add("correct");
                    rightItem.classList.add("correct");
                } else {
                    drawArrow(activityId, leftItem, rightItem, "red");
                    leftItem.classList.add("wrong");
                    rightItem.classList.add("wrong");
                }
            }

            const total = Object.keys(correctMatches).length;
            const lang = activity.lang || 'en';
            const popupLabels = Activity.translatePopupLabels(lang);

            if (correctCount === total) {
                Swal.fire({ icon: "success", title: popupLabels.excellent, text: popupLabels.allCorrect });
            } else if (correctCount === 0) {
                Swal.fire({ icon: "error", title: popupLabels.oops, text: popupLabels.noCorrect });
            } else {
                Swal.fire({ icon: "info", title: popupLabels.almost, text: popupLabels.scored(correctCount, total) });
            }
        } catch (err) {
            console.error('MatchLeftToRight.checkAnswers :', err);
        }
    };

    const showAnswers = (activityId) => {
        try {
            resetActivity(activityId);
            const activity = activities[activityId];
            if (!activity) return;

            const correctMatches = activity.correctMatches || {};
            const area = document.querySelector(`.matching-area.${activityId}`);
            if (!area) return;

            for (const leftId in correctMatches) {
                const leftItem = area.querySelector(`.left-items .item[data-id="${leftId}"]`);
                const rightItem = area.querySelector(`.right-items .item[data-id="${correctMatches[leftId]}"]`);

                if (!leftItem || !rightItem) continue;

                drawArrow(activityId, leftItem, rightItem, "green");

                leftItem.classList.add("correct");
                rightItem.classList.add("correct");
                activities[activityId].userMatches[leftId] = correctMatches[leftId];
            }

            Activity.toggleCheckBtn('.submit-btn', true);
        } catch (err) {
            console.error('MatchLeftToRight.showAnswers :', err);
        }
    };

    const resetActivity = (activityId) => {
        try {
            const svg = document.querySelector(`.matching-area.${activityId} svg`);
            if (svg) {
                const defs = svg.querySelector("defs");
                svg.innerHTML = "";
                if (defs) svg.appendChild(defs);
            }

            activities[activityId] = activities[activityId] || { userMatches: {}, selectedLeftItem: null, correctMatches: {} };
            activities[activityId].userMatches = {};
            activities[activityId].selectedLeftItem = null;

            const area = document.querySelector(`.matching-area.${activityId}`);
            if (!area) return;
            area.querySelectorAll(".item").forEach(item => {
                item.classList.remove("correct", "wrong", "selected");
            });

            Activity.toggleCheckBtn('.submit-btn', false);
        } catch (err) {
            console.error('MatchLeftToRight.resetActivity :', err);
        }
    };

    const checkIfAllAttempted = (activityId) => {
        try {
            const activity = activities[activityId];
            if (!activity) return;

            const correctMatches = activity.correctMatches || {};
            const total = Object.keys(correctMatches).length;

            const attempted = Object.keys(activity.userMatches || {}).filter(leftId => activity.userMatches[leftId]).length;

            const submitBtn = document.querySelector(`.buttons.machiNgs .submit-btn[data-activity="${activityId}"]`);
            if (submitBtn) {
                if (attempted === total) {
                    submitBtn.classList.remove("disable");
                } else {
                    submitBtn.classList.add("disable");
                }
            }
        } catch (err) {
            console.error('MatchLeftToRight.checkIfAllAttempted :', err);
        }
    };

    const redrawAllArrows = (activityId) => {
        try {
            const activity = activities[activityId];
            const svg = document.querySelector(`.matching-area.${activityId} svg`);
            if (!svg || !activity) return;

            const defs = svg.querySelector("defs");
            svg.innerHTML = "";
            if (defs) svg.appendChild(defs);

            for (const leftId in activity.userMatches) {
                const rightId = activity.userMatches[leftId];
                const leftEl = document.querySelector(`.matching-area.${activityId} .left-items .item[data-id="${leftId}"]`);
                const rightEl = document.querySelector(`.matching-area.${activityId} .right-items .item[data-id="${rightId}"]`);
                if (leftEl && rightEl) {
                    drawArrow(activityId, leftEl, rightEl);
                }
            }
        } catch (err) {
            console.error('MatchLeftToRight.redrawAllArrows :', err);
        }
    };

    const ui = (activityId = "m1", questionId) => {
        try {
            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);
            const columnLabel = Activity.translateColumnLabel(lang);

            const html = `<div class="question">
                <div class="container">
                    <div class="qSections">
                        <div class="${Define.get('head')}"></div>
                        <p class="${Define.get('subHead')}"></p>
                    </div>
                    <hr/>
                    <div class="forLevelAB">
                        <div class="levelText">${columnLabel}-<span class='text-uppercase'>${Activity.translateBulletLabels({ lang: lang, ind: 0 })}</span></div>
                        <div class="levelText">${columnLabel}-<span class='text-uppercase'>${Activity.translateBulletLabels({ lang: lang, ind: 1 })}</span></div>
                    </div>
                    <div class="content user-select-none">
                        <div class="instructions">
                            <div class="activity-wrapper">
                            <div class="matching-area ${activityId}" data-id="${activityId}">
                                <div class="left-items" id="leftItems_${activityId}"></div>
                                <svg width="100%" height="100%">
                                    <defs>
                                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="green"></polygon>
                                        </marker>
                                    </defs>
                                </svg>
                                <svg width="100%" height="100%">
                                    <defs>
                                        <marker id="arrowheadRed" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="red"></polygon>
                                        </marker>
                                    </defs>
                                </svg>
                                <div class="right-items" id="rightItems_${activityId}"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttons machiNgs">
                    <button class="submit-btn disable" data-activity="${activityId}">${buttonLabel.check}</button>
                    <button class="show-btn">${buttonLabel.show}</button>
                    <button class="reset-btn">${buttonLabel.try}</button>
                </div>
                </div>`;
            // ..
            const cont = document.querySelector(Define.get('questionContainer'));
            cont.innerHTML = html;
        } catch (err) {
            console.error('MatchLeftToRight.ui :', err);
        }
    };

    const matchLeftToRight = (questionId, activityId = "m1") => {
        try {
            const data = Activity.getDefine(questionId);
            if (!Object.entries(data).length) return;

            ui(activityId, questionId);

            const headElem = Activity.setHeader(questionId);
            if (!headElem.head && !headElem.subhead) {
                document.querySelector('hr').remove();
            }

            const leftContainer = document.getElementById(`leftItems_${activityId}`);
            const rightContainer = document.getElementById(`rightItems_${activityId}`);
            const area = document.querySelector(`.matching-area.${activityId}`);
            const buttons = document.querySelector(`.matching-area.${activityId}`)?.closest('.container')?.querySelector('.buttons.machiNgs');

            const leftFrag = document.createDocumentFragment();
            const rightFrag = document.createDocumentFragment();

            const questions = data.content;
            const correctMatches = Object.fromEntries(questions.map(q => [String(q.id), String(q.id)]));

            const leftShuffled = Activity.shuffleArray(questions);
            const rightShuffled = Activity.shuffleArray(questions);

            activities[activityId] = activities[activityId] || { userMatches: {}, selectedLeftItem: null, correctMatches: {} };
            activities[activityId].correctMatches = correctMatches || {};
            activities[activityId].userMatches = {};

            leftShuffled.forEach(d => {
                const div = document.createElement('div');
                div.className = 'item';
                div.dataset.id = d.id;

                const imagePath = (typeof d?.left === 'object' && d?.left?.path) ? d.left.path : false;
                const imageWidth = (imagePath != false && d?.left?.width) ? d.left.width : '50px';
                const leftImage = `<img src="${Activity.pathToCWD() + imagePath}" alt="image" style="width:${imageWidth};" class="mx-auto" ondragstart="return false;">`;
                div.innerHTML = (imagePath != false) ? leftImage : (typeof d?.left === 'object') ? '-' : d.left;

                div.addEventListener('click', (ev) => {
                    leftContainer.querySelectorAll('.item.selected').forEach(i => i.classList.remove('selected'));
                    div.classList.add('selected');
                    activities[activityId].selectedLeftItem = div;
                });

                leftFrag.appendChild(div);
            });

            rightShuffled.forEach(d => {
                const div = document.createElement('div');
                div.className = 'item';
                div.dataset.id = d.id;

                const imagePath = (typeof d?.right === 'object' && d?.right?.path) ? d.right.path : false;
                const imageWidth = (imagePath != false && d?.right?.width) ? d.right.width : '50px';
                const leftImage = `<img class="mx-auto" src="${Activity.pathToCWD() + imagePath}" style="width:${imageWidth};" ondragstart="return false;">`;
                div.innerHTML = (imagePath != false) ? leftImage : d.right;

                div.addEventListener('click', (ev) => {
                    const activity = activities[activityId];
                    if (!activity || !activity.selectedLeftItem) {
                        const lang = Activity.getDefine(Activity.getQid(`#${containerId}`))?.lang || 'en';
                const popupLabels = Activity.translatePopupLabels(lang);
                Swal.fire({ icon: "error", text: popupLabels.selectLeftFirst });
                return;
                    }

                    const leftId = activity.selectedLeftItem.dataset.id;
                    const rightId = div.dataset.id;

                    activity.userMatches[leftId] = rightId;
                    drawArrow(activityId, activity.selectedLeftItem, div);

                    activity.selectedLeftItem.classList.remove('selected');
                    activity.selectedLeftItem = null;

                    checkIfAllAttempted(activityId);
                });

                rightFrag.appendChild(div);
            });

            leftContainer.innerHTML = '';
            rightContainer.innerHTML = '';

            leftContainer.appendChild(leftFrag);
            rightContainer.appendChild(rightFrag);

            const submitBtn = document.querySelector(`.buttons.machiNgs .submit-btn[data-activity="${activityId}"]`);
            const showBtn = document.querySelector(`.buttons.machiNgs .show-btn`);
            const resetBtn = document.querySelector(`.buttons.machiNgs .reset-btn`);

            if (submitBtn) {
                submitBtn.addEventListener('click', () => checkAnswers(activityId));
            }
            if (showBtn) {
                showBtn.addEventListener('click', () => showAnswers(activityId));
            }
            if (resetBtn) {
                resetBtn.addEventListener('click', () => resetActivity(activityId));
            }
        } catch (err) {
            console.error('MatchLeftToRight.matchLeftToRight :', err);
        }
    };

    window.addEventListener('resize', () => {
        for (const activityId in activities) redrawAllArrows(activityId);
    });

    return {
        render: matchLeftToRight,
        drawArrow,
        checkAnswers,
        showAnswers,
        resetActivity,
        checkIfAllAttempted,
        redrawAllArrows
    };
})();

const MatchLeftRightToCenter = (() => {

    const qS = (sel, ctx = document) => (ctx && ctx.querySelector) ? ctx.querySelector(sel) : null;
    const qSA = (sel, ctx = document) => (ctx && ctx.querySelectorAll) ? Array.from(ctx.querySelectorAll(sel)) : [];

    const getBoundaryPoint = (rect, targetX, targetY) => {
        try {
            const cx = (rect.left + rect.right) / 2;
            const cy = (rect.top + rect.bottom) / 2;
            const dx = targetX - cx;
            const dy = targetY - cy;

            if (Math.abs(dx) < 1e-6 && Math.abs(dy) < 1e-6) {
                return { x: cx, y: cy };
            }

            const w = rect.width;
            const h = rect.height;
            const isCircle = Math.abs(w - h) < 2;

            if (isCircle) {
                const r = Math.min(w, h) / 2;
                const len = Math.sqrt(dx * dx + dy * dy);
                const ux = dx / len;
                const uy = dy / len;
                return { x: cx + ux * r, y: cy + uy * r };
            } else {
                const tx1 = (rect.left - cx) / dx;
                const tx2 = (rect.right - cx) / dx;
                const ty1 = (rect.top - cy) / dy;
                const ty2 = (rect.bottom - cy) / dy;

                const candidates = [];
                const pushIfValid = (t, edge) => {
                    if (!isFinite(t) || t <= 0) return;
                    const x = cx + dx * t;
                    const y = cy + dy * t;
                    if (edge === 'left' || edge === 'right') {
                        if (y >= rect.top && y <= rect.bottom) candidates.push({ t, x, y });
                    } else {
                        if (x >= rect.left && x <= rect.right) candidates.push({ t, x, y });
                    }
                };

                if (isFinite(tx1)) pushIfValid(tx1, 'left');
                if (isFinite(tx2)) pushIfValid(tx2, 'right');
                if (isFinite(ty1)) pushIfValid(ty1, 'top');
                if (isFinite(ty2)) pushIfValid(ty2, 'bottom');

                if (candidates.length === 0) return { x: cx, y: cy };
                candidates.sort((a, b) => a.t - b.t);
                return { x: candidates[0].x, y: candidates[0].y };
            }
        } catch (err) {
            console.error('MatchLeftRightToCenter.getBoundaryPoint :', err);
        }
    };

    const drawLine = (svg, fromEl, toEl, color = "green", tag = "L") => {
        try {
            if (!svg || !fromEl || !toEl) return;

            const fromId = fromEl.dataset.id;
            const toId = toEl.dataset.id;

            svg.querySelectorAll(`line[data-from="${tag}~${fromId}"]`).forEach(l => l.remove());

            const fromRect = fromEl.getBoundingClientRect();
            const toRect = toEl.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();

            const fromCenterX = (fromRect.left + fromRect.right) / 2;
            const fromCenterY = (fromRect.top + fromRect.bottom) / 2;
            const toCenterX = (toRect.left + toRect.right) / 2;
            const toCenterY = (toRect.top + toRect.bottom) / 2;

            const p1v = getBoundaryPoint(fromRect, toCenterX, toCenterY);
            const p2v = getBoundaryPoint(toRect, fromCenterX, fromCenterY);

            const x1 = p1v.x - svgRect.left;
            const y1 = p1v.y - svgRect.top;
            const x2 = p2v.x - svgRect.left;
            const y2 = p2v.y - svgRect.top;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("stroke", color);
            line.setAttribute("stroke-width", "2");
            line.setAttribute("stroke-linecap", "round");
            line.dataset.from = `${tag}~${fromId}`;
            line.dataset.to = `${tag}~${toId}`;
            if (color == 'green') {
                line.setAttribute("marker-end", "url(#arrowhead2)");
            } else {
                line.setAttribute("marker-end", "url(#arrowheadRed2)");
            }
            svg.appendChild(line);
        } catch (err) {
            console.error('MatchLeftRightToCenter.drawLine :', err);
        }
    };

    const clearSvg = (svg) => {
        try {
            if (!svg) return;
            svg.querySelectorAll("line").forEach(l => l.remove());
        } catch (err) {
            console.error('MatchLeftRightToCenter.clearSvg :', err);
        }
    };

    const resetActivity = (activityId) => {
        try {
            const activity = activities[activityId];
            if (!activity) return;

            const container = document.getElementById(activityId);
            if (!container) return;

            const svg = qS(".svg2", container);

            if (svg) {
                const defs = svg.querySelector("defs");
                svg.innerHTML = "";
                if (defs) svg.appendChild(defs);
            }

            activity.userLeftMatches = {};
            activity.userRightMatches = {};
            activity.selectedLeft = null;
            activity.selectedRight = null;

            qSA(".matchItems1 .imgBoxes, .matchItems2 .centerItems, .matchItems3 .imgBoxes", container)
                .forEach(el => el.classList.remove("correct", "wrong", "selected"));

            Activity.toggleCheckBtn('.submit-btn', false);
        } catch (err) {
            console.error('MatchLeftRightToCenter.resetActivity :', err);
        }
    };

    const checkAnswers = (activityId) => {
        try {
            const activity = activities[activityId];
            if (!activity) return;
            const container = document.getElementById(activityId);
            if (!container) return;
            const svg = qS(".svg2", container);

            qSA(".matchItems1 .imgBoxes, .matchItems2 .centerItems, .matchItems3 .imgBoxes", container)
                .forEach(el => el.classList.remove("correct", "wrong", "selected"));

            let correctCount = 0;
            const totalLeft = Object.keys(activity.correctLeft || {}).length;
            const totalRight = Object.keys(activity.correctRight || {}).length;
            const total = totalLeft + totalRight;
            const lang = activity.lang || 'en';
            const popupLabels = Activity.translatePopupLabels(lang);

            Object.entries(activity.correctLeft || {}).forEach(([leftId, centerCorrectId]) => {
                const userCenterId = activity.userLeftMatches[leftId];
                const leftEl = qS(`.matchItems1 [data-id="${leftId}"]`, container);
                const centerEl = qS(`.matchItems2 [data-id="${userCenterId}"]`, container);

                if (!leftEl || !centerEl) return;

                if (String(userCenterId) === String(centerCorrectId)) {
                    leftEl.classList.add("correct");
                    centerEl.classList.add("correct");
                    drawLine(svg, leftEl, centerEl, "green", "L");
                    correctCount++;
                } else {
                    leftEl.classList.add("wrong");
                    centerEl.classList.add("wrong");
                    drawLine(svg, leftEl, centerEl, "red", "L");
                }
            });

            Object.entries(activity.correctRight || {}).forEach(([rightId, centerCorrectId]) => {
                const userCenterId = activity.userRightMatches[rightId];
                const rightEl = qS(`.matchItems3 [data-id="${rightId}"]`, container);
                const centerEl = qS(`.matchItems2 [data-id="${userCenterId}"]`, container);

                if (!rightEl || !centerEl) return;

                if (String(userCenterId) === String(centerCorrectId)) {
                    rightEl.classList.add("correct");
                    centerEl.classList.add("correct");
                    drawLine(svg, rightEl, centerEl, "green", "R");
                    correctCount++;
                } else {
                    rightEl.classList.add("wrong");
                    centerEl.classList.add("wrong");
                    drawLine(svg, rightEl, centerEl, "red", "R");
                }
            });

            if (correctCount === total && total > 0) {
                Swal.fire({ icon: "success", title: popupLabels.great, text: popupLabels.allCorrect });
            } else if (correctCount === 0) {
                Swal.fire({ icon: "error", title: popupLabels.oops, text: popupLabels.noCorrect });
            } else {
                Swal.fire({ icon: "info", title: popupLabels.almost, text: popupLabels.scored(correctCount, total) });
            }
        } catch (err) {
            console.error('MatchLeftRightToCenter.checkAnswers :', err);
        }
    };

    const showAnswers = (activityId) => {
        try {
            const activity = activities[activityId];
            if (!activity) return;
            const container = document.getElementById(activityId);
            if (!container) return;
            const svg = qS(".svg2", container);

            resetActivity(activityId);

            Object.entries(activity.correctLeft || {}).forEach(([leftId, centerId]) => {
                const leftEl = qS(`.matchItems1 [data-id="${leftId}"]`, container);
                const centerEl = qS(`.matchItems2 [data-id="${centerId}"]`, container);

                if (!leftEl || !centerEl) return;

                drawLine(svg, leftEl, centerEl, "green", "L");
                leftEl.classList.add("correct");
                centerEl.classList.add("correct");
                activity.userLeftMatches[leftId] = centerId;
            });

            Object.entries(activity.correctRight || {}).forEach(([rightId, centerId]) => {
                const rightEl = qS(`.matchItems3 [data-id="${rightId}"]`, container);
                const centerEl = qS(`.matchItems2 [data-id="${centerId}"]`, container);

                if (!rightEl || !centerEl) return;

                drawLine(svg, rightEl, centerEl, "green", "R");
                rightEl.classList.add("correct");
                centerEl.classList.add("correct");
                activity.userRightMatches[rightId] = centerId;
            });

            Activity.toggleCheckBtn('.submit-btn', true);
        } catch (err) {
            console.error('MatchLeftRightToCenter.showAnswers :', err);
        }
    };

    const redrawAll = (activityId) => {
        try {
            const activity = activities[activityId];
            if (!activity) return;
            const container = document.getElementById(activityId);
            if (!container) return;
            const svg = qS(".svg2", container);
            if (!svg) return;

            const defs = svg.querySelector("defs");
            svg.innerHTML = "";
            if (defs) svg.appendChild(defs);

            Object.entries(activity.userLeftMatches || {}).forEach(([leftId, centerId]) => {
                const leftEl = qS(`.matchItems1 [data-id="${leftId}"]`, container);
                const centerEl = qS(`.matchItems2 [data-id="${centerId}"]`, container);
                if (leftEl && centerEl) drawLine(svg, leftEl, centerEl, "green", "L");
            });

            Object.entries(activity.userRightMatches || {}).forEach(([rightId, centerId]) => {
                const rightEl = qS(`.matchItems3 [data-id="${rightId}"]`, container);
                const centerEl = qS(`.matchItems2 [data-id="${centerId}"]`, container);
                if (rightEl && centerEl) drawLine(svg, rightEl, centerEl, "green", "R");
            });
        } catch (err) {
            console.error('MatchLeftRightToCenter.redrawAll :', err);
        }
    };

    const sizeAndPlaceSvg = (svg, wrapper) => {
        try {
            if (!svg || !wrapper) return;

            const prevPos = getComputedStyle(wrapper).position;
            if (prevPos === "static") wrapper.style.position = "relative";

            const w = wrapper.clientWidth || wrapper.offsetWidth || wrapper.scrollWidth || 0;
            const h = wrapper.clientHeight || wrapper.offsetHeight || wrapper.scrollHeight || 0;

            svg.style.position = "absolute";
            svg.style.left = "0px";
            svg.style.top = "0px";
            svg.style.width = (w ? w + "px" : "100%");
            svg.style.height = (h ? h + "px" : "100%");
            svg.style.pointerEvents = "none";
            svg.style.zIndex = 50;

            if (w && h) {
                svg.setAttribute("width", String(w));
                svg.setAttribute("height", String(h));
                svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
                svg.setAttribute("preserveAspectRatio", "none");
            }
        } catch (err) {
            console.error('MatchLeftRightToCenter.sizeAndPlaceSvg :', err);
        }
    };

    const matchLeftRightToCenter = (questionId, activityId = "act1") => {
        try {
            const data = Activity.getDefine(questionId);
            const content = data.content;
            const lang = data?.lang ?? 'en';

            const btnLabels = Activity.translateButtonLabels(lang);

            activities[activityId] = activities[activityId] || {};
            activities[activityId].correctLeft = content.correctLeft || {};
            activities[activityId].correctRight = content.correctRight || {};
            activities[activityId].userLeftMatches = {};
            activities[activityId].userRightMatches = {};
            activities[activityId].selectedLeft = null;
            activities[activityId].selectedRight = null;

            const container = Define.get('questionContainer');
            const cont = document.querySelector(container);
            if (!cont) {
                console.warn("Container not found:", container);
                return;
            }

            cont.innerHTML = `<div id="${activityId}" class="question">
                            <div class="container">
                                <div class="qSections">
                                    <div class="${Define.get('head')}"></div>
                                    <p class="${Define.get('subHead')}"></p>
                                </div>
                                <hr />
                                <div class="rowM3 matching-area user-select-none" style="position:relative;">
                                    <div class="colmn1 matchItems1"></div>
                                    <div class="colmn1 matchItems2"></div>
                                    <div class="colmn1 matchItems3"></div>
                                    <svg class="svg2" style="position:absolute; left:0; top:0; width:100%; height:100%; pointer-events:none; z-index:9999;">
                                        <defs>
                                            <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="green"></polygon>
                                            </marker>
                                        </defs>
                                    </svg>
                                    <svg class="svg2" style="position:absolute; left:0; top:0; width:100%; height:100%; pointer-events:none; z-index:9999;"
                                        <defs>
                                            <marker id="arrowheadRed2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="red"></polygon>
                                            </marker>
                                        </defs>
                                    </svg>
                                </div>
                                <div class="buttons machiNgs">
                                    <button class="submit-btn">${btnLabels.check}</button>
                                    <button class="show-btn">${btnLabels.show}</button>
                                    <button class="reset-btn">${btnLabels.try}</button>
                                </div>
                            </div>
                        </div>`;
            // ..           

            let activityRoot = null;
            if (cont.id && cont.id === activityId) {
                activityRoot = cont;
            } else {
                activityRoot = cont.querySelector(`#${activityId}`) || cont;
            }

            const row = cont.querySelector('.rowM3');
            const matchItems1 = row.querySelector('.matchItems1');
            const matchItems2 = row.querySelector('.matchItems2');
            const matchItems3 = row.querySelector('.matchItems3');

            const svg = cont.querySelector('.svg2');
            if (svg) {
                svg.dataset.activity = activityId;
                sizeAndPlaceSvg(svg, row);
            }

            matchItems1.innerHTML = "";
            matchItems2.innerHTML = "";
            matchItems3.innerHTML = "";

            const col1 = Array.isArray(content.col1) ? Activity.shuffleArray(content.col1) : [];
            const col2 = Array.isArray(content.col2) ? Activity.shuffleArray(content.col2) : [];
            const col3 = Array.isArray(content.col3) ? Activity.shuffleArray(content.col3) : [];

            const returnHtml = (colSeq, item) => {
                const image_width = item.width ?? '65%';
                const html = item.text ?
                    `<div class="centerItems shadow-sm" data-col="${colSeq}" data-id="${item.id}">${item.text}</div>` :
                    `<div class="imgBoxes shadow" data-col="${colSeq}" data-id="${item.id}"><img src="${Activity.pathToCWD()}${item.img}" alt="" ondragstart="return false"; style="width:${image_width};"></div>`;
                // ..
                return html;
            }

            col1.forEach(item => {
                matchItems1.insertAdjacentHTML('beforeend', returnHtml(1, item));
            });

            col2.forEach(item => {
                matchItems2.insertAdjacentHTML('beforeend', returnHtml(2, item));
            });

            col3.forEach(item => {
                matchItems3.insertAdjacentHTML('beforeend', returnHtml(3, item));
            });

            const leftEls = Array.from(matchItems1.querySelectorAll('[data-col="1"]'));
            const centerEls = Array.from(matchItems2.querySelectorAll('[data-col="2"]'));
            const rightEls = Array.from(matchItems3.querySelectorAll('[data-col="3"]'));

            leftEls.forEach(el => {
                el.addEventListener('click', () => {
                    leftEls.forEach(i => i.classList.remove('selected'));
                    el.classList.add('selected');
                    activities[activityId].selectedLeft = el;
                    activities[activityId].selectedRight = null;
                });
            });

            rightEls.forEach(el => {
                el.addEventListener('click', () => {
                    rightEls.forEach(i => i.classList.remove('selected'));
                    el.classList.add('selected');
                    activities[activityId].selectedRight = el;
                    activities[activityId].selectedLeft = null;
                });
            });

            centerEls.forEach(centerEl => {
                centerEl.addEventListener('click', () => {
                    const centerId = centerEl.dataset.id;
                    const act = activities[activityId];
                    if (!act) return;

                    const svgLocal = cont.querySelector('.svg2');

                    if (act.selectedLeft) {
                        const leftId = act.selectedLeft.dataset.id;
                        act.userLeftMatches[leftId] = centerId;
                        if (svgLocal) drawLine(svgLocal, act.selectedLeft, centerEl, "green", "L");
                        act.selectedLeft.classList.remove('selected');
                        act.selectedLeft = null;
                    } else if (act.selectedRight) {
                        const rightId = act.selectedRight.dataset.id;
                        act.userRightMatches[rightId] = centerId;
                        if (svgLocal) drawLine(svgLocal, act.selectedRight, centerEl, "green", "R");
                        act.selectedRight.classList.remove('selected');
                        act.selectedRight = null;
                    } else {
                        const lang = Activity.getDefine(Activity.getQid(`#${containerId}`))?.lang || 'en';
                        const popupLabels = Activity.translatePopupLabels(lang);
                        Swal.fire({ icon: "info", text: popupLabels.selectImageFirst });
                    }
                });
            });

            const headElem = Activity.setHeader(questionId);
            if (!headElem.head && !headElem.subhead) {
                document.querySelector('hr').remove();
            }

            const btnContainer = cont.querySelector('.buttons.machiNgs');
            if (btnContainer) {
                const submitBtn = btnContainer.querySelector('.submit-btn');
                const showBtn = btnContainer.querySelector('.show-btn');
                const resetBtn = btnContainer.querySelector('.reset-btn');

                if (submitBtn) {
                    submitBtn.dataset.activity = activityId;
                    submitBtn.addEventListener('click', () => checkAnswers(activityId));
                }
                if (showBtn) {
                    showBtn.dataset.activity = activityId;
                    showBtn.addEventListener('click', () => showAnswers(activityId));
                }
                if (resetBtn) {
                    resetBtn.dataset.activity = activityId;
                    resetBtn.addEventListener('click', () => resetActivity(activityId));
                }
            }
        } catch (err) {
            console.error("MatchLeftRightToCenter.matchLeftRightToCenter:", err);
        }
    };

    let __m2resizeTO = null;
    window.addEventListener("resize", () => {
        clearTimeout(__m2resizeTO);
        __m2resizeTO = setTimeout(() => {
            Object.keys(activities).forEach(id => {
                if (activities[id] && (activities[id].correctLeft || activities[id].correctRight)) {
                    redrawAll(id);
                }
            });
        }, 120);
    });

    return {
        render: matchLeftRightToCenter,
        checkAnswers,
        showAnswers,
        resetActivity,
        redrawAll
    };
})();

const MatchTopToBottom = (() => {

    Activity.css('matchType3.css');

    const drawArrow = (activityId, fromEl, toEl, color = "green") => {
        try {
            if (!fromEl || !toEl) return;
            const area = document.querySelector(`.matching-area3[data-activity="${activityId}"]`);
            if (!area) return;

            const svg = area.querySelector("svg[data-svg]");
            if (!svg) return;

            const topId = fromEl.dataset.id;
            const bottomId = toEl.dataset.id;

            svg.querySelectorAll(`line[data-from="${topId}"], line[data-to="${bottomId}"]`)
                .forEach(l => l.remove());

            const fromRect = fromEl.getBoundingClientRect();
            const toRect = toEl.getBoundingClientRect();
            const containerRect = area.getBoundingClientRect();

            const x1 = (fromRect.left + fromRect.right) / 2 - containerRect.left;
            const y1 = fromRect.bottom - containerRect.top;
            const x2 = (toRect.left + toRect.right) / 2 - containerRect.left;
            const y2 = toRect.top - containerRect.top;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("stroke", color);
            line.setAttribute("stroke-width", "2");
            line.dataset.from = topId;
            line.dataset.to = bottomId;
            if (color == 'green') {
                line.setAttribute("marker-end", `url(#arrowhead_${activityId})`);
            } else {
                line.setAttribute("marker-end", `url(#arrowhead_${activityId}_red)`);
            }
            svg.appendChild(line);
        } catch (err) {
            console.error('MatchTopToBottom.drawArrow : ', err);
        }
    };

    const checkIfAllAttempted = (activityId) => {
        try {
            const act = activities[activityId];
            if (!act) return;
            const total = Object.keys(act.correctMatches || {}).length;
            const attempted = Object.keys(act.userMatches || {}).filter(k => act.userMatches[k]).length;
            const area = document.querySelector(`.matching-area3[data-activity="${activityId}"]`);
            if (!area) return;
            if (attempted === total) {
                Activity.toggleCheckBtn('.submit-btn', false);
            }
        } catch (err) {
            console.error('MatchTopToBottom.checkIfAllAttempted : ', err);
        }
    };

    const redrawAllArrows = (activityId) => {
        try {
            const activity = activities[activityId];
            const area = document.querySelector(`.matching-area3[data-activity="${activityId}"]`);
            if (!area || !activity) return;
            const svg = area.querySelector("svg[data-svg]");
            if (!svg) return;

            const defs = svg.querySelector("defs");
            svg.innerHTML = "";
            if (defs) svg.appendChild(defs);

            for (const topId in activity.userMatches) {
                const bottomId = activity.userMatches[topId];
                const topEl = area.querySelector(`.rowHoriZ.topItem .item2[data-id="${topId}"]`);
                const bottomEl = area.querySelector(`.rowHoriZ.bottItem .item2[data-id="${bottomId}"]`);
                if (topEl && bottomEl) drawArrow(activityId, topEl, bottomEl);
            }
        } catch (err) {
            console.error('MatchTopToBottom.redrawAllArrows : ', err);
        }
    };

    const resetActivity = (activityId) => {
        try {
            const area = document.querySelector(`.matching-area3[data-activity="${activityId}"]`);
            if (!area) return;

            const svg = area.querySelector("svg[data-svg]");
            if (svg) {
                const defs = svg.querySelector("defs");
                svg.innerHTML = "";
                if (defs) svg.appendChild(defs);
            }

            activities[activityId] = activities[activityId] || { userMatches: {}, selectedTop: null, correctMatches: {} };
            activities[activityId].userMatches = {};
            activities[activityId].selectedTop = null;

            area.querySelectorAll(".item2").forEach(it => it.classList.remove("selected", "correct", "wrong"));
            Activity.toggleCheckBtn('.submit-btn', false);
        } catch (err) {
            console.error('MatchTopToBottom.resetActivity : ', err);
        }
    };

    const checkAnswers = (activityId) => {
        try {
            const activity = activities[activityId];
            const area = document.querySelector(`.matching-area3[data-activity="${activityId}"]`);
            if (!activity || !area) return;

            area.querySelectorAll(".item2").forEach(el => { el.classList.remove("correct", "wrong"); });

            const correctMatches = activity.correctMatches || {};
            let correctCount = 0;

            for (const topId in correctMatches) {
                const chosenBottom = activity.userMatches[topId];
                const topItem = area.querySelector(`.rowHoriZ.topItem .item2[data-id="${topId}"]`);
                const bottomItem = area.querySelector(`.rowHoriZ.bottItem .item2[data-id="${chosenBottom}"]`);

                if (!chosenBottom) continue;

                if (String(chosenBottom) === String(correctMatches[topId])) {
                    correctCount++;
                    topItem?.classList.add("correct");
                    bottomItem?.classList.add("correct");
                    drawArrow(activityId, topItem, bottomItem, "green");
                } else {
                    topItem?.classList.add("wrong");
                    bottomItem?.classList.add("wrong");
                    drawArrow(activityId, topItem, bottomItem, "red");
                }
            }

            const total = Object.keys(correctMatches).length;
            const lang = activity.lang || 'en';
            const popupLabels = Activity.translatePopupLabels(lang);

            if (correctCount === total) {
                Swal.fire({ icon: "success", title: popupLabels.good, text: popupLabels.scored(correctCount, total) });
            } else if (correctCount === 0) {
                Swal.fire({ icon: "error", title: popupLabels.oops, text: popupLabels.noCorrect });
            } else {
                Swal.fire({ icon: "info", title: popupLabels.notBad, text: popupLabels.scored(correctCount, total) });
            }
        } catch (err) {
            console.error('MatchTopToBottom.checkAnswers : ', err);
        }
    };

    const showAnswers = (activityId) => {
        try {
            resetActivity(activityId);
            const activity = activities[activityId];
            const area = document.querySelector(`.matching-area3[data-activity="${activityId}"]`);
            if (!activity || !area) return;

            const correctMatches = activity.correctMatches || {};
            for (const topId in correctMatches) {
                const topItem = area.querySelector(`.rowHoriZ.topItem .item2[data-id="${topId}"]`);
                const bottomItem = area.querySelector(`.rowHoriZ.bottItem .item2[data-id="${correctMatches[topId]}"]`);
                if (!topItem || !bottomItem) continue;

                drawArrow(activityId, topItem, bottomItem, "green");
                topItem.classList.add("correct");
                bottomItem.classList.add("correct");
                activity.userMatches[topId] = String(correctMatches[topId]);
            }
            Activity.toggleCheckBtn('.submit-btn', true);
        } catch (err) {
            console.error('MatchTopToBottom.showAnswers : ', err);
        }
    };

    const ui = (activityId, questionId) => {
        try {
            const container = Define.get('questionContainer');
            const cont = document.querySelector(container);
            if (!cont) {
                console.error("Container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            cont.innerHTML = `<div class="question">
                <div class="container">
                <div class="qSections">
                    <div class="${Define.get('head')}"></div>
                    <p class="${Define.get('subHead')}"></p>
                </div>

                <div class="m3Holders">
                    <div class="matching-area3 user-select-none" data-activity="${activityId}">
                    <div class="rowHoriZ topItem" data-top="">
                    </div>
                    <svg data-svg width="100%" height="100%" style="position: absolute; left: 0; top: 0;">
                        <defs>
                        <marker id="arrowhead_${activityId}" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="green"></polygon>
                        </marker>
                        </defs>
                    </svg>
                    <svg data-svg width="100%" height="100%" style="position: absolute; left: 0; top: 0;">
                        <defs>
                        <marker id="arrowhead_${activityId}_red" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="red"></polygon>
                        </marker>
                        </defs>
                    </svg>
                    <div class="rowHoriZ bottItem" style="margin-top: 10vw;" data-bottom="">
                    </div>
                    </div>
                </div>
                <div class="buttons machiNgs">
                    <button class="submit-btn" data-check>${buttonLabel.check}</button>
                    <button class="show-btn" data-show>${buttonLabel.show}</button>
                    <button class="reset-btn" data-reset>${buttonLabel.try}</button>
                </div>
                </div>
            </div>`;
        } catch (err) {
            console.error('MatchTopToBottom.ui : ', err);
        }
    };

    const matchTopToBottom = (questionId, activityId = "m3_1") => {
        try {
            const data = Activity.getDefine(questionId);
            if (!data || !Array.isArray(data.content) || data.content.length === 0) return;

            const questions = data.content.map(q => ({
                id: String(q.id),
                top: q.top || "",
                bottom: q.bottom || "",
                match: String(q.match !== undefined ? q.match : q.id)
            }));

            const correctMatches = Object.fromEntries(questions.map(q => [String(q.id), String(q.match)]));

            activities[activityId] = activities[activityId] || { userMatches: {}, selectedTop: null, correctMatches: {} };
            activities[activityId].correctMatches = correctMatches;
            activities[activityId].userMatches = {};

            ui(activityId, questionId);
            Activity.setHeader(questionId);

            const area = document.querySelector(`.matching-area3[data-activity="${activityId}"]`);
            const topContainer = area.querySelector("[data-top]");
            const bottomContainer = area.querySelector("[data-bottom]");

            topContainer.innerHTML = "";
            bottomContainer.innerHTML = "";

            const topList = Activity.shuffleArray(questions);
            const bottomList = Activity.shuffleArray(questions);

            topList.forEach(item => {
                const div = document.createElement("div");
                div.className = "item2";
                div.dataset.id = item.id;
                div.dataset.match = item.match;

                const inner = document.createElement("div");
                inner.className = "item-text";
                inner.textContent = item.top;
                div.appendChild(inner);

                div.addEventListener("click", () => {
                    area.querySelectorAll(".rowHoriZ.topItem .item2.selected").forEach(i => i.classList.remove("selected"));
                    div.classList.add("selected");
                    activities[activityId].selectedTop = div;
                });
                topContainer.appendChild(div);
            });

            bottomList.forEach(item => {
                const div = document.createElement("div");
                div.className = "item2";
                div.dataset.id = item.id;

                const inner = document.createElement("div");
                inner.className = "item-text";
                inner.textContent = item.bottom;
                div.appendChild(inner);

                div.addEventListener("click", () => {
                    const act = activities[activityId];
                    if (!act || !act.selectedTop) {
                        const lang = Activity.getDefine(Activity.getQid(`#${containerId}`))?.lang || 'en';
                const popupLabels = Activity.translatePopupLabels(lang);
                Swal.fire({ icon: "error", text: popupLabels.selectTopFirst });
                return;
                    }
                    const topId = act.selectedTop.dataset.id;
                    const bottomId = div.dataset.id;

                    act.userMatches[topId] = String(bottomId);
                    drawArrow(activityId, act.selectedTop, div);

                    act.selectedTop.classList.remove("selected");
                    act.selectedTop = null;

                    checkIfAllAttempted(activityId);
                });
                bottomContainer.appendChild(div);
            });

            const containerEl = document.querySelector(Define.get('questionContainer'));
            const checkBtn = containerEl.querySelector(".buttons.machiNgs [data-check]");
            const showBtn = containerEl.querySelector(".buttons.machiNgs [data-show]");
            const resetBtn = containerEl.querySelector(".buttons.machiNgs [data-reset]");

            if (checkBtn) checkBtn.addEventListener("click", () => checkAnswers(activityId));
            if (showBtn) showBtn.addEventListener("click", () => showAnswers(activityId));
            if (resetBtn) resetBtn.addEventListener("click", () => resetActivity(activityId));

            window.addEventListener("resize", () => redrawAllArrows(activityId));
        } catch (err) {
            console.error("MatchTopToBottom.matchTopToBottom : ", err);
        }
    };

    return {
        render: matchTopToBottom,
        drawArrow,
        checkAnswers,
        showAnswers,
        resetActivity,
        checkIfAllAttempted,
        redrawAllArrows
    };
})();

const FillInTheBlanksWithImage = (() => {

    Activity.css('fillUp.css');

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question user-select-none">
                <div class="container-fluid">
                    <div class="qSections">
                        <div class="${Define.get('head')}"></div>
                        <p class="${Define.get('subHead')}"></p>
                    </div>
                    <div class="wordRows"></div>
                    <div class="row">
                        <div class="col-md-6 col-12">
                            <div class="imgBoxFill"></div>
                        </div>
                        <div class="col-md-6 col-12">
                            <div class="fillBoxSections shadow-sm">
                                <div id="inputsContainer" class="row"></div>
                            </div>
                            <div class="buttons machiNgs">
                                <button class="submit-btn" id="checkBtnF">${buttonLabel.check}</button>
                                <button class="show-btn" id="showBtnF">${buttonLabel.show}</button>
                                <button class="reset-btn" id="resetBtnF">${buttonLabel.try}</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>`;
            // ..

            const checkBtn = parent.querySelector("#checkBtnF");
            const showBtn = parent.querySelector("#showBtnF");
            const resetBtn = parent.querySelector("#resetBtnF");

            if (checkBtn) checkBtn.addEventListener("click", checkAnswerFill);
            if (showBtn) showBtn.addEventListener("click", showAnswersFill);
            if (resetBtn) resetBtn.addEventListener("click", resetFill);
        } catch (err) {
            console.error('FillInTheBlanksWithImage.ui : ', err);
        }
    };

    const fillInTheBlanks = (questionId) => {
        try {
            const data = Activity.getDefine(questionId);

            ui(questionId);
            Activity.setHeader(questionId);

            document.querySelector(Define.get('questionContainer')).querySelector("#checkBtnF").dataset.qid = data?.id;

            const container2 = document.getElementById("inputsContainer");
            if (!container2) {
                return;
            }
            container2.innerHTML = "";

            const textFrag = document.createDocumentFragment();
            data?.content?.hinttext?.forEach((item) => {
                const div = document.createElement('div');
                div.className = 'wordBoxesFill shadow-sm';
                div.textContent = item;

                textFrag.appendChild(div);
            });
            document.querySelector('.wordRows').appendChild(textFrag);

            document.querySelector('.imgBoxFill').innerHTML = `<img src="${Activity.pathToCWD()}${data?.content?.hintimage}" ondragstart="return false";/>`;

            let blanksBlock = '';
            data?.content?.blanks.forEach((item, i) => {
                if (item.img) {
                    blanksBlock += `<div class="col-md-4">
                            <div class="fillBox shadow-sm">
                            <img class="imgInboxFill" src="${Activity.pathToCWD()}${item.img}" alt="feature-${i + 1}" ondragstart="return false;"/>
                            <input class="inputsFills form-control" 
                                    type="text" 
                                    placeholder="Fill Answer" 
                                    data-ans="${item.ans}" 
                                    data-type="image">
                            </div>
                        </div>`;
                    // ..
                } else {
                    blanksBlock += `<div class="col-md-4">
                        <div class="fillBox shadow-sm">
                        <p class="fw-bold">${item.text}</p>
                        <input class="inputsFills form-control" data-ans="${item.ans}" type="text" placeholder="Fill Answer" data-type="text">
                        </div>
                    </div>`;
                    // ..
                }
            });
            container2.innerHTML = blanksBlock;
        } catch (err) {
            console.error('FillInTheBlanksWithImage.fillInTheBlanks : ', err);
        }
    };

    const checkAnswerFill = () => {
        try {
            let correct = 0;
            const inputs = document.querySelectorAll(".inputsFills");
            inputs.forEach(input => {
                const type = input.dataset.type;
                const userVal = input.value.trim().toLowerCase();
                const correctVal = (input.dataset.ans || "").toLowerCase();
                if (input.value.trim() === "") {
                    input.classList.add("is-invalid");
                    input.classList.remove("is-valid");
                } else {
                    if (type === "image") {
                        if (userVal === correctVal) {
                            input.classList.add("is-valid");
                            input.classList.remove("is-invalid");
                            correct++;
                        } else {
                            input.classList.add("is-invalid");
                            input.classList.remove("is-valid");
                        }
                    } else if (type === "text") {
                        input.classList.add("is-valid");
                        input.classList.remove("is-invalid");
                        correct++;
                    }
                }
            });

            const activityData = Activity.getDefine(questionId);
            const lang = activityData?.lang || 'en';
            const popupLabels = Activity.translatePopupLabels(lang);
            const dataFills = activityData?.content?.blanks;

            Swal.fire({
                icon: correct === (dataFills || []).length ? "success" : "info",
                title: correct === (dataFills || []).length ? popupLabels.perfect : popupLabels.checkAnswers,
                text: popupLabels.scored(correct, (dataFills || []).length)
            });
        } catch (err) {
            console.error('FillInTheBlanksWithImage.checkAnswerFill : ', err);
        }
    };

    const showAnswersFill = () => {
        try {
            Activity.toggleCheckBtn('#checkBtnF', true);
            disableAll();
            document.querySelectorAll(".inputsFills").forEach(input => {
                input.value = input.dataset.ans;
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
            });
        } catch (err) {
            console.error('FillInTheBlanksWithImage.showAnswersFill : ', err);
        }
    };

    const resetFill = () => {
        try {
            Activity.toggleCheckBtn('#checkBtnF', false);
            enableAll();
            document.querySelectorAll(".inputsFills").forEach(input => {
                input.value = "";
                input.classList.remove("is-valid", "is-invalid");
            });
        } catch (err) {
            console.error('FillInTheBlanksWithImage.resetFill : ', err);
        }
    };

    const disableAll = () => {
        try {
            document.querySelectorAll(".inputsFills").forEach(el => {
                el.setAttribute("disabled", true);
            });
        } catch (err) {
            console.error('FillInTheBlanksWithImage.disableAll : ', err);
        }
    };

    const enableAll = () => {
        try {
            document.querySelectorAll(".inputsFills").forEach(el => {
                el.removeAttribute("disabled");
            });
        } catch (err) {
            console.error('FillInTheBlanksWithImage.enableAll : ', err);
        }
    };

    return {
        render: fillInTheBlanks,
        checkAnswerFill,
        showAnswersFill,
        resetFill,
        disableAll,
        enableAll
    };
})();

const FillInTheBlanksHindiKb = (() => {

    Activity.css('fillHindi.css');

    const quizContainerID = 'quizContainer';

    let __subQuestions;

    const ui = (questionId) => {
        try {
            __subQuestions = undefined;

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const content = activity?.content ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);
            const audio = content?.audio ?? false;
            const audioSrc = audio != false ? audio : '';

            const definedCol = content?.questionGridSize ?? {};

            parent.innerHTML = `<div class="question">
                                    <div class="container">
                                        ${audioSrc ?
                    `<div class="common_listening_container" id="listening_container">
                                                <div class="play-btn common_playBtn">
                                                    <div class="icon"></div>
                                                </div>
                                            </div>`: ''
                }
                                        <div id="question_header_container" ${(audioSrc || !activity.head) ? `style="display: none"` : ''}>
                                            <div class="qSections row g-0 mt-3 rowWithAudios">
                                                <div class="col font18 fontBold ${Define.get('head')} m-0"></div>
                                                ${audioSrc ?
                    `<div class="col-auto" id="listening_common_audio_container">
                                                        <svg id="" fill="currentColor" width="33" height="33" class="bi bi-play-circle-fill common_playBtn" viewBox="0 0 16 16" role="button">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                                                        </svg>
                                                        <svg id="" width="33" height="33" fill="currentColor" class="bi bi-pause-circle-fill common_pauseBtn" viewBox="0 0 16 16" role="button">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
                                                        </svg>
                                                    </div>`: ''
                }
                                            </div>
                                        </div>
                                        <div id='question-container-box' ${audioSrc ? `style="display: none"` : ''}>
                                            <div id="fill-img-container" class="text-center"></div>
                                            <div id="fill-hint-container" class="text-center instForFillText shadow-sm"></div>
                                            ${definedCol instanceof Object &&
                    Object.entries(definedCol).length
                    ? `
                                                    <div id="${quizContainerID}" class="row g-0"></div>
                                                `
                    : `
                                                    <div id="${quizContainerID}"></div>
                                                `
                }
                                            <div class="buttons machiNgs">
                                                <button class="submit-btn check_1">${buttonLabel.check}</button>
                                                <button class="show-btn">${buttonLabel.show}</button>
                                                <button class="reset-btn">${buttonLabel.try}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="result" id="result"></div>
                                </div>`;
            // ..

            Activity.setHeader(questionId);
            Activity.setQid(`#${quizContainerID}`, questionId);

            const submitBtn = parent.querySelector('.submit-btn');
            const showBtn = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');

            if (submitBtn) submitBtn.addEventListener("click", checkAnswersHandler);
            if (showBtn) showBtn.addEventListener("click", showAnswersHandler);
            if (resetBtn) resetBtn.addEventListener("click", resetQuizHandler);

            is_Audio_available(audioSrc);

        } catch (e) {
            console.error('FillInTheBlanksHindiKb.ui :', e);
        }
    }

    const __questionImageTemplate = (src, width) => {
        const imageWidth = width ? width : '50px';
        const img = `
            <img 
                src="${Activity.pathToCWD()}${src}" 
                style="width:${imageWidth};" 
                ondragstart="return false;"
            >
        `;
        return img;
    }

    const __renderImageInQuestionText = ({ data, text, imageReplacement } = {}) => {
        let index = 0;
        const images = data?.images ?? [];
        const regex = new RegExp(imageReplacement, 'g');

        const __itr = () => {
            const imageData = images[index++];
            const imagePath = imageData?.path;
            const imageWidth = imageData?.width;
            return imagePath ? __questionImageTemplate(imagePath, imageWidth) : '';
        }

        return text.replace(regex, __itr);
    }

    const fillInTheBlanks = (questionId) => {
        try {

            ui(questionId);

            const activity = Activity.getDefine(questionId);
            const content = activity?.content;
            const lang = activity?.lang ?? 'en';
            const replacement = content?.replacement ?? '#_#';
            const imageReplacement = content?.imageReplacement ?? '#img#';
            const label = content?.label ?? {};
            const queLabel = label?.question ?? true;
            const subQueLabel = label?.subQuestion ?? true;

            if (content?.subquestions) __subQuestions = content?.subquestions;

            const placeholder = Activity.translateWriteAnsLabel(lang);
            const renderInput = ({ qID = '', sqID = '', inputIndex = '', classes = '', style = '', maxLength = '' } = {}) => {
                const inputHtml = `
                            <input 
                                class="hindiInput inPutHindiNew ${classes}" 
                                data-qId="${qID}"
                                data-sqId="${sqID}"
                                data-index="${inputIndex}"
                                autocomplete="off" 
                                type="text" 
                                placeholder="${placeholder}",
                                ${maxLength != '' ? `maxlength="${maxLength}"` : ''}
                                style="${style}"
                            >
                        `;
                return inputHtml;
            }

            if (content?.image && content?.image?.path) {
                const path = Activity.pathToCWD() + content.image.path;
                const width = content?.image?.width ?? '15%';
                const image = `<img src="${path}" style="width:${width};" ondragstart="return false;">`
                $('#fill-img-container').html(image);
            } else {
                $('#fill-img-container').remove();
            }

            const hint = content?.hint;
            const fillContainer = document.querySelector('#fill-hint-container')
            if (fillContainer) {
                const isText = hint?.text;
                if (hint && typeof hint === 'string') {
                    fillContainer.innerHTML = hint;
                } else if (isText && hint && hint instanceof Object) {

                    const __image = (src, width = '') => {
                        const imageWidth = width == '' ? '150px' : width;
                        const img = `
                            <img 
                                src="${Activity.pathToCWD()}${src}" 
                                style="width:${imageWidth};" 
                                ondragstart="return false;"
                            >
                        `;
                        return img;
                    }

                    const __render = () => {
                        let index = 0;
                        const text = hint?.text ?? '';
                        const images = hint?.images ?? [];
                        const regex = new RegExp(imageReplacement, 'g');

                        const __itr = () => {
                            const imageData = images[index++];
                            const imagePath = imageData?.path;
                            const imageWidth = imageData?.width ?? '';
                            return imagePath ? __image(imagePath, imageWidth) : '';
                        }

                        return text.replace(regex, __itr);
                    }

                    fillContainer.innerHTML = __render();
                } else {
                    fillContainer.remove();
                }
            }

            const defaultCol = Helper?.defaultCol ?? {};
            const definedCol = content?.questionGridSize ?? {};
            const col = {
                md: definedCol?.md ?? defaultCol.md,
                sm: definedCol?.sm ?? defaultCol.sm,
                col: definedCol?.col ?? defaultCol.col
            };

            content?.questions.forEach((question, qIndex) => {
                const subQuestion = __subQuestions?.filter(subques => subques.qid === question.qid) ?? [];
                const questionId = question?.qid !== undefined ? question?.qid : (qIndex + 1);
                const mainBullet = Activity.translateBulletLabels({ lang: lang, ind: qIndex });
                const html = [content?.questions.length != 1 && queLabel ? `${mainBullet}) ` : null];

                const div = document.createElement('div');
                div.classList.add('questionFILL');
                div.id = `que_${qIndex}`;

                const colCondition = definedCol instanceof Object && Object.entries(definedCol).length;
                const inputBelowCondition = question?.inputBelow === true && question?.answers;

                if (colCondition) div.classList.add(`d-flex`, `gap-2`, `flex-wrap`, `col-sm-${col.sm}`, `col-md-${col.md}`, `col-${col.col}`, `${subQuestion.length == 0 && !inputBelowCondition ? 'align-items-center' : 'align-items-start'}`);

                if (subQuestion.length || inputBelowCondition) {
                    const imageView = __renderImageInQuestionText({
                        data: question,
                        text: question?.question ?? '',
                        imageReplacement: imageReplacement
                    });
                    html.push(`${imageView}`);
                }

                if (subQuestion.length) {
                    console.log('if')
                    if (html.length > 2) return false;

                    const frame = `<div class="my-2">`;
                    html.push(frame);
                    subQuestion.map((subques, subind) => {
                        const multiInput = [];
                        const subQuesText = [];
                        const subquesID = subques?.sqid ?? false;
                        const length = subques?.maxLength ?? '';
                        if (subques?.inputBelow === true) {
                            const text = subques?.text ?? '';
                            subQuesText.push(text);

                            subques?.answers.map((_, i) => {
                                const belowInput = `
                                                    <div class="my-2 mx-4 px-2">
                                                        ${renderInput({
                                    qID: questionId,
                                    sqID: subquesID,
                                    inputIndex: i,
                                    classes: 'w-100 my-2',
                                    style: 'text-align:left !important',
                                    maxLength: `${length}`
                                })}
                                                    </div>
                                                    `;
                                // ..
                                multiInput.push(belowInput);
                            });
                        } else {
                            const width = subques?.inputWidth ?? '';
                            const style = `width:${width} !important; max-width:${width} !important;`
                            let idx = 0;
                            const view = subques?.text.replaceAll(replacement, () =>
                                renderInput({
                                    qID: questionId,
                                    sqID: subquesID,
                                    inputIndex: idx++,
                                    style: style,
                                    maxLength: `${length}`,
                                })
                            );
                            subQuesText.push(view);
                        }

                        const bullet = subQuestion.length > 1
                            ? Activity.translateBulletLabels({ lang: 'ro', ind: subind, upperCase: false }) + ')'
                            : '';
                        const final = `
                                            <div class="my-2">
                                                ${subQueLabel ? `${bullet}` : ''} ${subQuesText.join('')}
                                            </div>
                                            ${multiInput.join('')}
                                        `;
                        // ..
                        html.push(final);
                    });
                } else {
                    const length = question?.maxLength ?? '';
                    if (inputBelowCondition) {
                        question?.answers.map((_, i) => {
                            const belowInput = `<div class="my-1 mx-4 px-2">
                                ${renderInput({
                                qID: questionId,
                                sqID: false,
                                inputIndex: i,
                                classes: 'w-100 my-2',
                                style: 'text-align:left !important',
                                maxLength: `${length}`
                            })}
                            </div>`;
                            html.push(belowInput);
                        });
                    } else {
                        let idx = 0;
                        const width = question?.inputWidth ?? '';
                        const style = `width:${width} !important;max-width:${width} !important;`
                        const length = question?.maxLength ?? '';

                        let imageHtml = '';
                        if (question?.images?.length) {
                            const imgData = question.images[0];
                            imageHtml = __questionImageTemplate(imgData.path, imgData.width);
                        }

                        const questionTextWithoutImage = question?.question?.replaceAll(imageReplacement, '');

                        const inputView = questionTextWithoutImage?.replaceAll(replacement, () =>
                            renderInput({
                                qID: questionId,
                                sqID: false,
                                inputIndex: idx++,
                                style: style,
                                maxLength: `${length}`
                            })
                        );

                        html.push(imageHtml);

                        html.push(inputView);
                    }
                }

                div.innerHTML = html.join('');
                $(`#${quizContainerID}`)[0].appendChild(div);

            });

            if (lang === 'hi') {
                $(function () {
                    $.keyboard.layouts["hindiQuiz"] = Activity.hindiKeyboard();

                    $(".hindiInput")
                        .keyboard({
                            layout: "hindiQuiz",
                            usePreview: false,
                            autoAccept: true,
                        })
                        .addTyping({ showTyping: true, delay: 70 })
                        .addCaret({
                            caretClass: "ui-keyboard-caret",
                            animate: true,
                            blinkRate: 600,
                        });
                });
            }

        } catch (err) {
            console.error('FillInTheBlanksHindiKb.fillIntheBlanks :', err);
        }
    }

    const normalizeHindi = (str) => {
        return (str || "").normalize("NFC").replace(/\s+/g, "").replace(/[।|,.;:'"!?]/g, "").trim().toLowerCase();
    }

    const checkAnswersHandler = () => {
        let __score = 0;

        const activity = Activity.getDefine(Activity.getQid(`#${quizContainerID}`));
        const content = activity?.content ?? {};
        const questions = content?.questions ?? [];
        const subquestions = content?.subquestions ?? [];

        $('.inPutHindiNew').map((_, item) => {
            const dataset = item.dataset;
            const qid = dataset.qid;
            const sqid = dataset.sqid;
            const index = dataset.index;
            const input = $(`.hindiInput.inPutHindiNew[data-qid="${qid}"][data-index="${index}"][data-sqid="${sqid}"]`);

            if (input[0] === undefined) return false;

            if (sqid == 'false') {
                questions.map((ques, ind) => {
                    const questionID = ques.qid ?? ind + 1;
                    const condition = questionID == qid
                        && (Array.isArray(ques.answers))
                        && (ques.answers.length)
                        && (ques.answers[index]);
                    // ..
                    if (condition && normalizeHindi(input.val()) == normalizeHindi(ques.answers[index])) {
                        __score++;
                        input[0].style.borderColor = 'limegreen';
                    }
                });
            } else {
                subquestions.map((ques) => {
                    const condition = (ques.qid == qid)
                        && (ques.sqid == sqid)
                        && (ques.answers.length)
                        && (ques.answers[index]);
                    // ..
                    if (condition && normalizeHindi(input.val()) == normalizeHindi(ques.answers[index])) {
                        __score++;
                        input[0].style.borderColor = 'red';
                    }
                });
            }

        });

        const totalBlanks = $('.inPutHindiNew').length;
        const lang = activity?.lang || 'hi';
        const popupLabels = Activity.translatePopupLabels(lang);

        const swalIcon = (__score === totalBlanks) ? "success" : "info";
        const swalTitle = (__score === totalBlanks) ? popupLabels.allCorrect : popupLabels.oops;

        Swal.fire({
            icon: swalIcon,
            title: swalTitle,
            text: popupLabels.scored(__score, totalBlanks),
            confirmButtonColor: "#00bfff",
            confirmButtonText: popupLabels.ok
        });
    }

    const showAnswersHandler = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${quizContainerID}`));
        const content = activity?.content ?? {};
        const questions = content?.questions ?? [];
        const subquestions = content?.subquestions ?? [];

        $(".check_1").addClass("disable");

        $('.inPutHindiNew').map((_, item) => {
            const dataset = item.dataset;
            const qid = dataset.qid;
            const sqid = dataset.sqid;
            const index = dataset.index;
            const input = $(`.hindiInput.inPutHindiNew[data-qid="${qid}"][data-index="${index}"][data-sqid="${sqid}"]`);

            input[0] != undefined ? input[0].style.borderColor = 'dodgerblue' : '';

            if (sqid == 'false') {
                questions.map((ques, ind) => {
                    const questionID = ques.qid ?? ind + 1;
                    const condition = questionID == qid
                        && (Array.isArray(ques.answers))
                        && (ques.answers.length)
                        && (ques.answers[index]);
                    // ..
                    if (condition) input.val(ques.answers[index]);
                });
            } else {
                subquestions.map((ques) => {
                    const condition = (ques.qid == qid)
                        && (ques.sqid == sqid)
                        && (ques.answers.length)
                        && (ques.answers[index]);
                    // ..
                    if (condition) input.val(ques.answers[index]);
                });
            }

        });
    }

    const resetQuizHandler = () => {
        $(".check_1").removeClass("disable")
        const inputs = document.querySelectorAll(".inPutHindiNew");
        inputs.forEach(el => {
            el.value = "";
            el.style.borderColor = "#444";
        });
    }

    const is_Audio_available = (src) => {

        if (!src && src == '') return;

        Helper.setAudio(Activity.pathToCWD() + src);

        const containerSelector = Define.get('questionContainer');
        const parent = document.querySelector(containerSelector);

        const audio_playBtns = parent.querySelectorAll('.common_playBtn');
        const audio_pauseBtn = parent.querySelector('.common_pauseBtn');

        audio_playBtns.forEach(btn => {
            btn.addEventListener('click', Helper.playAudio);
        });

        audio_pauseBtn.addEventListener('click', Helper.pauseAudio);

    }

    return {
        render: fillInTheBlanks,
        checkAnswersHandler,
        showAnswersHandler,
        resetQuizHandler
    }

})();

const JumbleLetters = (() => {

    let isDragging = false;
    let lastDragTime = 0;

    const shuffle = (word) => {
        try {
            const orig = word.split('');
            let arr;
            const allSame = orig.every(c => c === orig[0]);
            if (orig.length <= 1 || allSame) return orig;
            do {
                arr = [...orig];
                for (let i = arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            } while (arr.join('') === word);
            return arr;
        } catch (err) {
            console.log('JumbleLetters.shuffle : ', err);
        }
    }

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                <div class="container">
                    <div class="qSections">
                        <div class="${Define.get('head')}"></div>
                        <p class="${Define.get('subHead')}"></p>
                    <hr />
                    <div class="row" id="letterContainer"></div>
                </div>
                <div class="buttons machiNgs">
                    <button class="submit-btn" id="submit">${buttonLabel.check}</button>
                    <button class="show-btn">${buttonLabel.show}</button>
                    <button class="reset-btn" data-qid="">${buttonLabel.try}</button>
                </div>
                </div>`;
            // ..            

            const checkBtn = parent.querySelector("#submit");
            const showBtn = parent.querySelector(".show-btn");
            const resetBtn = parent.querySelector(".reset-btn");
            if (checkBtn) checkBtn.addEventListener("click", submit);
            if (showBtn) showBtn.addEventListener("click", showAns);
            if (resetBtn) resetBtn.addEventListener("click", reset);
        } catch (err) {
            console.log('JumbleLetters.ui : ', err);
        }
    }

    const loadAllQuestions = (questionId) => {
        try {

            const data = Activity.getDefine(questionId);

            ui(questionId);
            const headElem = Activity.setHeader(questionId);
            if (!headElem.head && !headElem.subhead) {
                document.querySelector('hr').remove();
            }

            document.querySelector(Define.get('questionContainer')).querySelector(".reset-btn").dataset.qid = data?.id;

            $("#letterContainer").empty();

            const words = data?.content;
            words.forEach((word, index) => {
                const jumbled = shuffle(word);

                const gameBox = $(`
                    <div class="col-md-6 col-12 col-sm-12">
                        <div class="rowLines">
                        <div class="numb">${index + 1}.</div>
                        <div class="letterjumbRow" id="letters-${index}" aria-label="Arrange the letters for ${word}"></div>
                        </div>
                    </div>
                `);

                const $row = gameBox.find(`#letters-${index}`);
                jumbled.forEach(letter => {
                    $row.append(`<div class="letterjumb" role="button" tabindex="0">${letter}</div>`);
                });

                $("#letterContainer").append(gameBox);

                $row.sortable({
                    placeholder: "letterjumb-placeholder",
                    tolerance: "pointer",
                    helper: "clone",
                    appendTo: "body",
                    zIndex: 999999,
                    revert: 0,   // instant move
                    distance: 1, // start dragging immediately
                    delay: 0,
                    scroll: true,
                    containment: "#letterContainer",
                    start: function (e, ui) {
                        isDragging = true;
                        isDragging = true;
                        ui.placeholder.width(ui.helper.outerWidth());
                        ui.placeholder.height(ui.helper.outerHeight());
                    },
                    stop: function (e, ui) {
                        lastDragTime = Date.now();
                        lastDragTime = lastDragTime;
                        setTimeout(() => { isDragging = false; isDragging = false; }, 30);
                    }
                }).disableSelection();

                enableTapSwapFallback($row[0]);
            });
        } catch (err) {
            console.log('JumbleLetters.loadAllQuestions : ', err);
        }
    }

    const enableTapSwapFallback = (container) => {
        try {
            let selected = null;

            $(container).on("click touchend", ".letterjumb", function (e) {
                if (Date.now() - lastDragTime < 200) return;
                if (isDragging) return;
                if (e.type === "touchend") e.preventDefault();

                const $this = $(this);

                if (!selected) {
                    selected = this;
                    $this.addClass("ui-state-active");
                    return;
                }

                if (selected === this) {
                    $this.removeClass("ui-state-active");
                    selected = null;
                    return;
                }

                const a = selected;
                const b = this;
                const parent = a.parentNode;

                const aNext = a.nextSibling;
                const bNext = b.nextSibling;

                if (aNext === b) {
                    parent.insertBefore(b, a);
                } else if (bNext === a) {
                    parent.insertBefore(a, b);
                } else {
                    parent.insertBefore(a, bNext);
                    parent.insertBefore(b, aNext);
                }

                $(a).removeClass("ui-state-active");
                selected = null;
            });
        } catch (err) {
            console.log('JumbleLetters.enableTapSwapFallback : ', err);
        }
    }

    const submit = () => {
        try {
            let score = 0;

            const questionId = document.querySelector(Define.get('questionContainer')).querySelector(".reset-btn").dataset.qid;
            const activity = Activity.getDefine(questionId);
            const lang = activity?.lang || 'en';
            const popupLabels = Activity.translatePopupLabels(lang);
            const jumbleData = activity?.content;

            jumbleData.forEach((word, index) => {
                let isCorrect = true;

                $(`#letters-${index} .letterjumb`).each(function (i) {
                    if ($(this).text() === word[i]) {
                        $(this).removeClass("wrong").addClass("correct");
                    } else {
                        $(this).removeClass("correct").addClass("wrong");
                        isCorrect = false;
                    }
                });

                if (isCorrect) score++;
            });

            if (score === jumbleData.length) {
                Swal.fire({ title: popupLabels.good, text: popupLabels.allCorrect, icon: "success" });
            } else {
                Swal.fire({ icon: "error", title: popupLabels.oops, text: popupLabels.scored(score, jumbleData.length) + " " + popupLabels.tryAgain });
            }
        } catch (err) {
            console.log('JumbleLetters.submit : ', err);
        }
    }

    const reset = () => {
        try {
            Activity.toggleCheckBtn('#submit', false);
            const questionId = document.querySelector(Define.get('questionContainer')).querySelector(".reset-btn").dataset.qid;
            loadAllQuestions(questionId);
        } catch (err) {
            console.log('JumbleLetters.reset : ', err);
        }
    }

    const showAns = () => {
        try {
            Activity.toggleCheckBtn('#submit', true);

            const questionId = document.querySelector(Define.get('questionContainer')).querySelector(".reset-btn").dataset.qid;
            const jumbleData = Activity.getDefine(questionId)?.content;

            jumbleData.forEach((word, index) => {
                const letterRow = $(`#letters-${index}`);
                letterRow.empty();
                word.split('').forEach(letter => {
                    letterRow.append(`<div class="letterjumb correct">${letter}</div>`);
                });
            });
        } catch (err) {
            console.log('JumbleLetters.showAns : ', err);
        }
    }

    return {
        render: loadAllQuestions,
        enableTapSwapFallback,
        submit,
        reset,
        showAns,
        isDragging,
        lastDragTime
    };
})();

const JumbleWords = (() => {

    Activity.css('wordJumb.css');

    const idiomContainer = "#idiomContainer";

    let isDraggingIdioms = false;
    let lastDragTimeIdioms = 0;

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container">
                                        <div class="${Define.get('head')}"></div>
                                        <p class="${Define.get('subHead')}"></p>
                                        <div id="idiomContainer"></div>
                                        <div class="buttons machiNgs">
                                            <button class="submit-btn" id="submit7">${buttonLabel.check}</button>
                                            <button class="show-btn">${buttonLabel.show}</button>
                                            <button class="reset-btn">${buttonLabel.try}</button>
                                        </div>
                                    </div>
                                </div>`;
            // ..        

            const checkBtn = parent.querySelector('.submit-btn');
            const showBtn = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');

            if (checkBtn) checkBtn.addEventListener("click", checkAnswersWORD);
            if (showBtn) showBtn.addEventListener("click", showAnswersWORD);
            if (resetBtn) resetBtn.addEventListener("click", resetWord);

        } catch (e) {
            console.error('JumbleWords.ui :', e);
        }
    }

    const renderIdioms = (questionId) => {
        try {
            ui(questionId);

            const $container = $(idiomContainer);
            $container.empty();

            $container[0].dataset.qid = questionId;

            Activity.setHeader(questionId);

            const idioms = Activity.shuffleArray(Activity.getDefine(questionId)?.content);

            $container[0].dataset.shuffledIdioms = JSON.stringify(idioms);

            idioms.forEach((sentence, index) => {
                const words = splitWords(sentence);
                const jumbled = Activity.shuffleWords(words);

                const $row = $(`<div class="rowWordLet" data-index="${index}">
                        <div style="display:flex; gap:12px;">
                            <div class="numLe">${index + 1}.</div>
                            <div>
                                <div class="wordStance" id="words-${index}" role="list"></div>
                                <div class="finalOutput" aria-live="polite"></div>
                            </div>
                        </div>
                    </div>`);
                $container.append($row);

                const $wordStance = $row.find(`#words-${index}`);
                jumbled.forEach(w => {
                    const $el = $(`<div class="word2" role="listitem" tabindex="0">${w}</div>`);
                    $wordStance.append($el);
                });

                if ($wordStance.data('ui-sortable')) {
                    $wordStance.sortable('destroy');
                }

                $wordStance.sortable({
                    items: ".word2",
                    placeholder: "word-placeholder",
                    helper: "clone",
                    tolerance: "pointer",
                    forcePlaceholderSize: true,
                    appendTo: document.body,
                    zIndex: 999999,
                    start: function (e, ui) {
                        isDraggingIdioms = true;
                        ui.placeholder.css({
                            width: ui.helper.outerWidth(),
                            height: ui.helper.outerHeight()
                        });
                    },
                    stop: function (e, ui) {
                        lastDragTimeIdioms = Date.now();
                        setTimeout(() => { isDraggingIdioms = false; }, 30);
                    }
                }).disableSelection();

                enableTapSwapFallback($wordStance[0], index);
            });
        } catch (err) {
            console.error('JumbleWords.renderIdioms :', err);
        }
    }

    const enableTapSwapFallback = (container) => {
        try {
            let selected = null;
            $(container).off("click.touchSwap")
                .on("click.touchSwap touchend.touchSwap", ".word2", function (e) {
                    if (Date.now() - lastDragTimeIdioms < 200) return;
                    if (isDraggingIdioms) return;
                    if (e.type === "touchend") e.preventDefault();

                    const a = selected;
                    const b = this;

                    if (!a) {
                        selected = this;
                        $(this).addClass("ui-state-active");
                        return;
                    }
                    if (a === b) {
                        $(this).removeClass("ui-state-active");
                        selected = null;
                        return;
                    }

                    const parent = a.parentNode;
                    const aNext = a.nextSibling;
                    const bNext = b.nextSibling;

                    if (aNext === b) {
                        parent.insertBefore(b, a);
                    } else if (bNext === a) {
                        parent.insertBefore(a, b);
                    } else {
                        parent.insertBefore(a, bNext);
                        parent.insertBefore(b, aNext);
                    }

                    $(a).removeClass("ui-state-active");
                    selected = null;
                });
        } catch (err) {
            console.error('JumbleWords.enableTapSwapFallback :', err);
        }
    }

    const checkAnswersWORD = () => {
        try {
            let allRowsCorrect = true;
            const questionId = $(idiomContainer)[0].dataset.qid;
            const activity = Activity.getDefine(questionId);
            const lang = activity?.lang || 'en';
            const popupLabels = Activity.translatePopupLabels(lang);

            const idioms = JSON.parse($(idiomContainer)[0].dataset.shuffledIdioms);

            $(".rowWordLet").each(function () {
                const index = $(this).data("index");
                const correct = splitWords(idioms[index]);
                const user = $(this).find(".word2").map(function () {
                    return $(this).text().trim();
                }).get();

                const $out = $(this).find(".finalOutput");
                $(this).find(".word2").removeClass("correctWord wrongwrongRORD");

                let allGood = true;
                $(this).find(".word2").each(function (i) {
                    if ($(this).text().trim() === correct[i]) {
                        $(this).addClass("correctWord");
                    } else {
                        $(this).addClass("wrongwrongRORD");
                        if (allGood) {
                            Swal.fire({
                                icon: "error",
                                title: popupLabels.oops,
                                text: popupLabels.incompleteAnswers,
                            });
                        }
                        allGood = false;
                        allRowsCorrect = false;
                    }
                });

                if (allGood) {

                } else {

                }
            });

            if (allRowsCorrect) {
                Swal.fire({
                    title: popupLabels.correct,
                    text: popupLabels.allCorrect,
                    icon: "success"
                });
            }
        } catch (err) {
            console.error('JumbleWords.checkAnswersWORD :', err);
        }
    }

    const showAnswersWORD = () => {
        try {
            const questionId = $(idiomContainer)[0].dataset.qid;
            const idioms = Activity.getDefine(questionId)?.content;

            Activity.toggleCheckBtn('.submit-btn', true);

            $(".rowWordLet").each(function () {
                const index = $(this).data("index");
                const words = splitWords(idioms[index]);
                const $stance = $(this).find(".wordStance");

                const map = {};
                $stance.find(".word2").each(function () {
                    const txt = $(this).text().trim();
                    if (!map[txt]) map[txt] = [];
                    map[txt].push(this);
                });
                $(".word2").addClass("correctWord");

                $stance.empty();
                words.forEach(w => {
                    if (map[w] && map[w].length) {
                        $stance.append(map[w].shift());
                    } else {
                        $stance.append(`<div class="word2">${w}</div>`);
                    }
                });
                $stance.sortable("disable");
            });
        } catch (err) {
            console.error('JumbleWords.showAnswersWORD :', err);
        }
    }

    const resetWord = () => {
        try {
            Activity.toggleCheckBtn('.submit-btn', false);

            const questionId = $(idiomContainer)[0].dataset.qid;
            renderIdioms(questionId);
        } catch (err) {
            console.error('JumbleWords.resetWord :', err);
        }
    }

    const splitWords = (sentence, spliter = ' ') => {
        try {
            return sentence.split(spliter).map(s => s.trim());
        } catch (err) {
            console.error('JumbleWords.splitWords :', err);
        }
    }

    return {
        render: renderIdioms,
        enableTapSwapFallback,
        checkAnswersWORD,
        showAnswersWORD,
        resetWord,
        splitWords,
        isDraggingIdioms,
        lastDragTimeIdioms
    }

})();

const Mcq_PathKaSaar = (() => {

    Activity.css('mcq.css');

    const heading = 'quiz-container';

    let userAnswers = [];

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            parent.innerHTML = `<div class="question">
                                    <div class="container">
                                        <div class="rowWithAudios">
                                            <span class="m-0 ${Define.get('head')}"></span> 
                                            <span class="colorsDiff ${Define.get('subHead')}"></span>
                                        </div>
                                        <div class="mcq-context p-1"></div>
                                        <div id="${heading}"></div>
                                        <div id="popupDialogAns">
                                            <div class="baseMod">
                                                <div class="answerdiv">
                                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                                        <h4 id="scoreTextQ1" class="text-center mb-3"></h4>
                                                        <button id="close-popup" class="btn btn-secondary">X</button>
                                                    </div>
                                                    <div id="answerShowMCW"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            const closeBtn = parent.querySelector('#close-popup');
            if (closeBtn) closeBtn.addEventListener("click", closeFnMCQ);
        } catch (e) {
            console.error('Mcq.ui :', e);
        }
    }

    const renderAllQuestionsMCQ = (questionId) => {
        try {
            ui(questionId);

            const headElem = Activity.setHeader(questionId);
            if (!headElem.head && !headElem.subhead) {
                document.querySelector('.rowWithAudios').remove();
            }

            const headingEl = document.getElementById(heading);
            headingEl.dataset.qid = questionId;

            const activity = Activity.getDefine(questionId);
            const content = activity?.content ?? {};
            const lang = activity?.lang ?? 'en';
            const data = content?.mcq ?? [];

            if (userAnswers.length < data.length) {
                for (let i = userAnswers.length; i < data.length; i++) userAnswers.push(null);
            } else if (userAnswers.length > data.length) {
                userAnswers.length = data.length;
            }

            const text = content?.text ?? {};
            const img = content?.img ?? {};

            const mcqContextContainer = $('.mcq-context');
            mcqContextContainer.empty();

            const hasText = text && Object.keys(text).length > 0;
            const hasImg = img && Object.keys(img).length > 0;

            if (!hasText && !hasImg) mcqContextContainer.remove();

            if (hasText || hasImg) {
                const textDiv = $('<div class="mcq-text"></div>');
                const imgDiv = $('<div class="mcq-image"><img ondragstart="return false;"/></div>');

                mcqContextContainer.addClass('row g-0');

                const preferredSide = (hasText && text?.side) ? text.side : (hasImg && img?.side) ? img.side : 'left';
                const side = String(preferredSide).toLowerCase();

                const commonClassText = 'col-7';
                const commonClassImg = 'col-5 text-center';

                if (hasText) {
                    mcqContextContainer.append(textDiv);
                    const mcq_txt_class = hasImg ? `${commonClassText}` : 'col';
                    textDiv.addClass(mcq_txt_class).html(text.text || '');
                }

                if (hasImg) {
                    const imageclass = img?.imageclass ?? '';
                    mcqContextContainer.append(imgDiv);
                    const mcq_img_cont_class = hasText
                        ? commonClassImg
                        : `col ${imageclass}`;
                    // ..

                    const image_width = img.width ?? '40%';

                    imgDiv.addClass(mcq_img_cont_class)
                        .find('img')
                        .attr('src', Activity.pathToCWD() + img.path)
                        .css({ 'border-radius': '20px', 'width': image_width });
                }

                if (side === 'left' || side === 'right') {
                    mcqContextContainer.css('flex-direction', 'row');
                    if (side === 'left') {
                        textDiv.css('order', 1);
                        imgDiv.css('order', 2);
                        textDiv.removeClass('text-end').addClass('text-start');
                    } else {
                        textDiv.css('order', 2);
                        imgDiv.css('order', 1);
                        textDiv.removeClass('text-end').addClass('text-start');
                    }
                } else if (side === 'top' || side === 'bottom') {
                    mcqContextContainer.css('flex-direction', 'column');
                    if (side === 'top') {
                        textDiv.css('order', 1);
                        imgDiv.css('order', 2);
                    } else {
                        textDiv.css('order', 2);
                        imgDiv.css('order', 1);
                    }
                    textDiv.removeClass('col-7').addClass('col-12 my-1');
                    imgDiv.removeClass('col-5').addClass('col-12 my-1 text-center');
                } else {
                    mcqContextContainer.css('flex-direction', 'row');
                    textDiv.css('order', 1);
                    imgDiv.css('order', 2);
                }

            }

            const html = [];
            data.map((mcq, ind) => {

                const question = mcq?.question ?? {};

                const path = question?.image ?? undefined;
                const image = path != undefined ?
                    render_image(Activity.pathToCWD() + path)
                    : undefined;
                // ..
                const replacement = question?.replacement ?? '#_#';
                const questionText = path != undefined ?
                    question?.text.replace(replacement, image) :
                    question?.text.replace(replacement, '');
                // ..

                const options = mcq?.options.map((option, oi) => {
                    const optionText = option_text(option);
                    const isSelected = userAnswers[ind] === oi ? "selected" : "";
                    const html = `
                        <div class="col-md-6 col-sm-12 mb-2">
                        <label class="option-btn ${isSelected} mcq-type" data-oi="${oi}" data-qi="${ind}" >
                            <input type="radio" name="question-${ind}" ${userAnswers[ind] === oi ? "checked" : ""}>
                            <strong>(${Activity.translateBulletLabels({ lang: lang, ind: oi })})</strong> 
                            ${optionText}
                        </label>
                        </div>
                    `;
                    return html;
                });

                const imageAboveOption = mcq?.imageaboveoption ?
                    `<div class="text-center my-1">
                        <img src="${Activity.pathToCWD()}${mcq?.imageaboveoption.image}" style="width :${mcq?.imageaboveoption.width ?? '30%'};">
                    </div>` : '';
                // ..

                const ques = `<div class="p-2">
                                <div class="row m-0 ${image ? 'align-items-center' : ''}" style="font-size:18px">
                                    <div style="width:30px" class="questionHeadingMCQ"><strong>${ind + 1}.</strong></div>
                                    <div class="col questionHeadingMCQ">${questionText}</div>
                                </div>
                                ${imageAboveOption}
                                <div class="row mt-2 ml-4">${options.join('')}</div>
                            </div>
                            `;
                // ..
                html.push(ques);
            });

            const container = document.getElementById(heading);
            container.innerHTML = html.join('');

            Array.from(document.querySelectorAll('.mcq-type')).forEach(mcq => {
                mcq.addEventListener("click", (ev) => {
                    const qi = parseInt(mcq.dataset.qi, 10);
                    const oi = parseInt(mcq.dataset.oi, 10);
                    selectOptionMCQ(qi, oi);
                });
            });
        } catch (e) {
            console.error('Mcq.renderAllQuestionsMCQ', e);
        }
    }

    const render_image = (src, width = false) => `<img src="${src}" style="height:150px; width:${!width ? '150px' : `${width}`}; object-fit:contain;" ondragstart="return false;">`;

    const option_text = (option) => {
        const path = option?.image ?? undefined;
        const width = option?.width ?? false;
        const image = path != undefined ?
            render_image(Activity.pathToCWD() + path, width) :
            undefined;
        // ..
        const optionText = path != undefined ? image : option?.text ?? '';
        return optionText;
    }

    const selectOptionMCQ = (qIndex, optIndex) => {
        try {
            const qi = parseInt(qIndex, 10);
            const oi = parseInt(optIndex, 10);

            const headingEl = document.getElementById(heading);
            const questionId = headingEl.dataset.qid;

            const data = Activity.getDefine(questionId)?.content?.mcq || [];
            if (userAnswers.length < data.length) {
                for (let i = userAnswers.length; i < data.length; i++) userAnswers.push(null);
            }

            userAnswers[qi] = oi;

            updateAttemptedCountMCQ();
            renderAllQuestionsMCQ(questionId);
            checkIfAllAnsweredMCW();
        } catch (e) {
            console.error('Mcq.selectOptionMCQ', e);
        }
    }

    const setUserAnswer = (qIndex, optIndex) => {
        try {
            const qi = parseInt(qIndex, 10);
            const oi = parseInt(optIndex, 10);
            userAnswers[qi] = oi;

            const questionId = document.getElementById(heading)?.dataset.qid;
            if (questionId) renderAllQuestionsMCQ(questionId);
        } catch (e) {
            console.error('Mcq.setUserAnswer', e);
        }
    }

    const getUserAnswers = () => {
        return userAnswers.slice();
    }

    const updateAttemptedCountMCQ = () => {
        const attempted = userAnswers.filter(a => a !== null).length;
    }

    const checkIfAllAnsweredMCW = () => {
        const allAnswered = userAnswers.length > 0 && userAnswers.every(ans => ans !== null);
        if (allAnswered) {
            showAnswerPopupMCQ();
        }
    }

    const showAnswerPopupMCQ = () => {
        try {
            let correctCount = 0;

            const questionId = document.getElementById(heading)?.dataset.qid;
            const activity = Activity.getDefine(questionId);
            const data = activity?.content;
            const lang = activity?.lang || 'en';
            const mcq = data?.mcq || [];
            const headLabels = Activity.translateTableHeads(lang);
            const popupLabels = Activity.translatePopupLabels(lang);

            let totalQues = mcq.length;

            let tableHTML = `<div class="table-responsive p-2">
                <table class="table table-bordered" style="font-size:20px">
                <thead class="text-light" style="white-space: nowrap;">
                    <tr>
                        <th>${headLabels.sequence}</th>
                        <th>${headLabels.attempted}</th>
                        <th>${headLabels.correct}</th>
                        <th>${headLabels.result}</th>
                    </tr>
                </thead>
                <tbody>`;
            // ..

            mcq.forEach((q, i) => {
                const userIndex = userAnswers[i];
                const userAnswerText = userIndex !== null && userIndex !== undefined
                    ? `${option_text(q?.options[userIndex])}`
                    : popupLabels.notAttempted;

                const correctAnswerText = `${option_text(q?.options[q.answer])}`;
                const isCorrect = userIndex === q.answer;
                if (isCorrect) correctCount++;
                tableHTML += `
                <tr>
                    <th>${i + 1}.</th>
                    <td class="${isCorrect ? 'text-success' : 'text-danger'}">${userAnswerText}</td>
                    <td class="text-success">${correctAnswerText}</td>
                    <td class="${isCorrect ? 'text-success' : 'text-danger'}">
                    ${isCorrect ? "✔" : "✘"}
                    </td>
                </tr>`;
            });

            tableHTML += `</tbody></table></div>`;

            const answerShowEl = document.getElementById("answerShowMCW");
            if (answerShowEl) answerShowEl.innerHTML = tableHTML;
            const popup = document.getElementById("popupDialogAns");
            if (popup) popup.style.display = "block";

            const scoreText = document.getElementById("scoreTextQ1");
            if (scoreText) {
                scoreText.innerText = popupLabels.scored(correctCount, totalQues);
            }
        } catch (e) {
            console.error('Mcq.showAnswerPopupMCQ', e);
        }
    }

    const closeFnMCQ = () => {
        try {
            const popup = document.getElementById("popupDialogAns");
            if (popup) popup.style.display = "none";
            userAnswers = userAnswers.map(() => null);
            const questionId = document.getElementById(heading)?.dataset.qid;
            if (questionId) renderAllQuestionsMCQ(questionId);
        } catch (e) {
            console.error('Mcq.closeFnMCQ', e);
        }
    }

    return {
        render: renderAllQuestionsMCQ,
        selectOptionMCQ,
        updateAttemptedCountMCQ,
        checkIfAllAnsweredMCW,
        showAnswerPopupMCQ,
        closeFnMCQ,
        getUserAnswers,
        setUserAnswer
    }

})();

const Adaptiv = (() => {

    Activity.css('adaptiv.css');

    const headerContainer = 'headersTopT';
    const levelHeadingID = 'levelHeading';

    let currentLevel = 1;
    let currentQuestion = 0;
    let attemptCount = 0;
    let submitted = false;
    let currentQuizData = undefined;
    let userAnswersAdaptiv = undefined;
    let showResultPending = false;
    let retryWrongOnly = false;
    let wrongQuestions = [];
    let __activity = undefined;

    const ui = (questionId, totalQues) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId);
            const data = activity?.content;
            const lang = activity?.lang ?? 'en';

            const instructions = [];
            (data?.headings?.right?.instruction || []).forEach((item) => {
                instructions.push(`<li>${item}</li>`);
            });

            const prevNextLabel = Activity.translateNextPrevLabel(lang);
            const buttonLabels = Activity.translateButtonLabels(lang);
            parent.innerHTML = `<div class="question">
                                    <div class="container-fluid">
                                        <div class="${headerContainer}">
                                            ${data?.headings?.left ?
                    `<div class="btnAdapt shadow-sm">
                                                    <span class="level-text">${data?.headings?.left ?? ''}</span>
                                                    - 
                                                    <span class="levelUpdate">${currentLevel}</span>
                                                </div>`
                    : ''
                }
                                            ${data?.headings?.mid ?
                    `<div class="btnAdapt shadow-sm">
                                                    <span id="attempted-text">${data?.headings?.mid?.attempted ?? ''}</span> 
                                                    <span class="showD" id="attempted-count"> 0 </span> 
                                                    <span id="outof-text">${data?.headings?.mid?.outof ?? ''}</span>
                                                    <span class="showD" id="total-questions"> ${totalQues ?? 0} </span>
                                                </div>`
                    : ''
                }
                                            ${data?.headings?.right ?
                    `<div class="btnAdapt shadow-sm" id="nirdesh" style="cursor: pointer;">
                                                    <svg class="iconsIns" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                                    </svg>
                                                    <span class="instruction-heading">${data?.headings?.right?.heading ?? ''}</span>
                                                </div>`
                    : ''
                }
                                        </div>
                                        <div class="container my-5 contAdapt shadow-lg">
                                            <div class="mb-2" id="${levelHeadingID}"></div>
                                            <div class="question-card justify-content-center animate__animated animate__fadeInDown" id="quizContainerAdaptiv"></div>
                                            <div class="buttonection" id="nav-buttons">
                                                <div class="buttons machiNgs">
                                                    <button class="submit-btn adaptive" id="prev-btn">${prevNextLabel.prev}</button>
                                                    <button class="show-btn adaptive" id="next-btn">${prevNextLabel.next}</button>
                                                    <button class="reset-btn adaptive" id="sub-btn" style="display: none;">${buttonLabels.submit}</button>
                                                </div>
                                                <div id="submit-btn-wrapper" class="text-center"></div>
                                            </div>
                                        </div>
                                        <div id="overlayAns"></div>
                                    </div>
                                    <div id="overlay">
                                        <div id="popupDialog">
                                            <p class="text-danger fw-bold">
                                                <span class="instruction-heading">${data?.headings?.right?.heading ?? ''}</span>
                                            </p>
                                            <ul class="instructionsList">${instructions.join('')}</ul>
                                            <div class="mt-3 text-center">
                                                <button class="btn btn-primary close-overlay">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="popupDialogAnsAd">
                                    <div class="baseMod2">
                                        <div class="answerdiv2" id="answer-reviewAD">
                                        </div>
                                    </div>
                                </div>`;

            const headerCont = document.querySelector('.' + headerContainer);
            if (headerCont && questionId !== undefined) {
                headerCont.dataset.qid = questionId;
            }

            updateAttemptedCount();

            const prevBtn = parent.querySelector('#prev-btn');
            const nextBtn = parent.querySelector('#next-btn');
            const submitBtn = parent.querySelector('#sub-btn');
            const nirdeshBtn = parent.querySelector('#nirdesh');
            const closeOverlayBtn = parent.querySelector('.close-overlay');

            if (closeOverlayBtn) closeOverlayBtn.addEventListener("click", closeFn);
            if (prevBtn) prevBtn.addEventListener("click", prevQuestion);
            if (nextBtn) nextBtn.addEventListener("click", nextQuestion);
            if (submitBtn) submitBtn.addEventListener("click", showResult);
            if (nirdeshBtn) nirdeshBtn.addEventListener("click", openFn);

        } catch (e) {
            console.error('Adaptiv.ui :', e);
        }
    }

    const __image = (src, width = false) => `<img src="${Activity.pathToCWD()}${src}" style="${!width ? 'height:150px;' : ''} width:${!width ? '150px' : `${width}`}; object-fit:contain;" ondragstart="return false;">`;

    const __option_images = ({ data, replacement } = {}) => {
        const imageData = data?.images ?? {};
        const imagePath = imageData?.path ?? [];
        const width = imageData?.width ?? false;
        const text = data?.text ?? '';

        if (!text && !imagePath.length) return '';

        if (!imagePath.length) return text;

        const regex = new RegExp(replacement, 'g');

        let index = 0;

        return text.replace(regex, () => __image(imagePath[index++], width));
    }

    const renderQuestion = (questionId, direction) => {
        const level = currentLevel;
        const activity = Activity.getDefine(questionId);
        const lang = activity?.lang ?? 'en';
        const content = activity?.content;
        const data = content?.levels;
        const skipOptions = content?.skipOptions ?? false;
        const skipQuestionSequence = content?.skipQuestionSequence ?? false;
        const found = (data || []).find(lvl => lvl.level === level);
        const questLen = found?.questions?.length || 0;
        let realIndex = currentQuestion;

        __activity = activity;

        if (retryWrongOnly) realIndex = wrongQuestions[currentQuestion];

        const q = found?.questions?.[realIndex];
        currentQuizData = found?.questions || [];

        ui(questionId, questLen);

        if (userAnswersAdaptiv == undefined) {
            userAnswersAdaptiv = new Array(questLen).fill(null);
        } else if (userAnswersAdaptiv.length !== questLen) {
            const newArr = new Array(questLen).fill(null);
            for (let i = 0; i < Math.min(newArr.length, userAnswersAdaptiv.length); i++) {
                newArr[i] = userAnswersAdaptiv[i];
            }
            userAnswersAdaptiv = newArr;
        }

        const container = document.getElementById("quizContainerAdaptiv");
        if (!container) return;

        container.classList.remove('animate__fadeInDown', 'animate__fadeInUp');

        if (direction === 'next') {
            container.classList.add('animate__animated', 'animate__fadeInDown');
        } else if (direction === 'prev') {
            container.classList.add('animate__animated', 'animate__fadeInUp');
        } else {
            container.classList.add('animate__animated', 'animate__fadeInDown');
        }

        void container.offsetWidth;

        if (!q) {
            const popupLabels = Activity.translatePopupLabels(lang);
            container.innerHTML = `<div class="row m-0"><div class="col">${popupLabels.questionNotFound}</div></div>`;
            updateNavButtons();
            return;
        }

        const levelHeadingText = found?.heading ?? {};
        const levelHeadContainer = document.querySelector('#' + levelHeadingID);
        if (levelHeadingText?.text && levelHeadContainer) {
            const text = levelHeadingText.text;
            const classes = levelHeadingText?.classes ?? [];
            levelHeadContainer.innerHTML = text;

            classes.forEach(cls => levelHeadContainer.classList.add(cls));
        }

        const imageReplacement = q?.imageReplacement ?? '#img#';

        const __renderQuestionText = (data) => {

            const imageData = data?.images ?? {};
            const imagePath = imageData?.path ?? [];
            const text = data?.text ?? '';

            if (!text && !imagePath.length) return '';

            if (!imagePath.length) return text;

            const __image = (src) => `<img src="${Activity.pathToCWD()}${src}" style="height:50px; width:50px; object-fit:contain;" ondragstart="return false;">`;

            const regex = new RegExp(imageReplacement, 'g');

            let index = 0;
            return text.replace(regex, () => __image(imagePath[index++]));
        }

        const questionText = (q?.question && typeof q?.question === 'string')
            ? q.question
            : __renderQuestionText(q.question);
        // ..

        const imageAboveOption = (q?.imageAboveOption && q?.imageAboveOption?.image != '') ?
            `
                        <div class="text-center my-1">
                            <img src="${Activity.pathToCWD()}${q.imageAboveOption.image}" style="width :${q.imageAboveOption.width ?? '150px'};">
                        </div>
                    ` : '';
        // ..

        const popupLabels = Activity.translatePopupLabels(lang);

        container.innerHTML = `${questionText != ''
            ? `
                    <div class="row m-0 g-0 align-items-center" style="font-size:18px">
                        ${!skipQuestionSequence ? `
                            <div style="min-width:30px;" class="col-auto questionHeadingMCQ me-2">
                                <strong>${popupLabels.questionLabel}${realIndex + 1}.</strong>
                            </div>
                            ` : ''
            }
                        <div class="col questionHeadingMCQ">${questionText}</div>
                    </div>
                ` : ''
            }
            ${imageAboveOption}
            ${!skipOptions ? `
                    <div class="row mt-3">
                        <div class="row mt-2 gx-0 px-3">
                        ${q.options.map((opt, i) => {
                const optionLabel = Activity.translateBulletLabels({ lang: lang, ind: i, upperCase: true });
                const isSelected = userAnswersAdaptiv[realIndex] === i;
                let extraClass = isSelected ? "selected" : "";

                if (typeof opt === 'string') {
                    if (submitted) {
                        if (i === q.answer) extraClass = "correct";
                        else if (isSelected && i !== q.answer) extraClass = "incorrect";
                    }
                    return `
                                    <div class="col-md-6 col-sm-12 mb-2">
                                        <label class="option-btnAdpt ${extraClass}" data-option-index="${i}">
                                            <input type="radio" name="question-${realIndex}" ${isSelected ? "checked" : ""} />
                                            <strong>${optionLabel}.</strong>
                                            ${opt}
                                        </label>
                                    </div>
                                `;
                } else if (opt instanceof Object) {
                    const optionText = __option_images({ data: opt, replacement: imageReplacement });
                    return `
                                    <div class="col-md-6 col-sm-12 mb-2">
                                        <label class="option-btnAdpt ${extraClass}" data-option-index="${i}">
                                            <input type="radio" name="question-${realIndex}" ${isSelected ? "checked" : ""} />
                                            <strong>${optionLabel}.</strong> 
                                            ${optionText}
                                        </label>
                                    </div>
                                `;
                }
            }).join('')}
                        </div>
                    </div>
                ` : ''
            }
        `;

        if (!skipOptions) {
            Array.from(document.querySelectorAll('.option-btnAdpt')).forEach((optionEl) => {
                optionEl.addEventListener("click", (ev) => {
                    const idxAttr = optionEl.getAttribute('data-option-index');
                    const idx = idxAttr !== null ? parseInt(idxAttr, 10) : 0;
                    selectOption(realIndex, idx);
                });
            });
        }

        updateNavButtons();
    }

    const selectOption = (realIndex, optIndex) => {
        if (submitted) return;
        if (!Array.isArray(userAnswersAdaptiv) || realIndex < 0) return;

        if (retryWrongOnly && userAnswersAdaptiv[realIndex] === currentQuizData[realIndex]?.answer) {
            return;
        }

        userAnswersAdaptiv[realIndex] = optIndex;
        updateAttemptedCount();

        if (!retryWrongOnly) {
            const allAnswered = userAnswersAdaptiv.every(ans => ans !== null);
            if (allAnswered && currentQuestion === currentQuizData.length - 1) {
                showResultPending = true;
            }
        }

        if (retryWrongOnly) {
            const allWrongAnswered = wrongQuestions.every(i => userAnswersAdaptiv[i] !== null);
            if (allWrongAnswered) {
                showResultPending = true;
            }
        }
    };

    const nextQuestion = () => {
        const limit = getQuestionLimit();
        const skipOptions = __activity?.content?.skipOptions ?? false;

        if (skipOptions) userAnswersAdaptiv[currentQuestion] = true;

        if (userAnswersAdaptiv[currentQuestion] === null) {
            const activity = Activity.getDefine(Activity.getQid(`.${headerContainer}`));
            const lang = activity?.lang ?? 'en';
            const popupLabels = Activity.translatePopupLabels(lang);
            Swal.fire({
                title: popupLabels.info,
                text: popupLabels.selectOptionBeforeNext,
                icon: 'info'
            });
            return;
        }

        if (currentQuestion < limit - 1) {
            currentQuestion++;
            renderQuestion(Activity.getQid(`.${headerContainer}`), 'next');
        }

        updateNavButtons();
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion(Activity.getQid(`.${headerContainer}`), 'prev');
        }
        updateNavButtons();
    }

    const updateNavButtons = () => {
        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");
        const subBtn = document.getElementById("sub-btn");

        const total = retryWrongOnly ? wrongQuestions.length : currentQuizData.length;
        const isLast = currentQuestion === total - 1;

        const skipOptions = __activity?.content?.skipOptions ?? false;

        const allAnswered = retryWrongOnly
            ? wrongQuestions.every(i => userAnswersAdaptiv[i] !== null)
            : userAnswersAdaptiv.every(ans => ans !== null);

        if (prevBtn) prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
        if (nextBtn && subBtn) {
            if (isLast && (allAnswered || skipOptions)) {
                nextBtn.style.display = 'none';
                subBtn.style.display = 'inline-block';
            } else {
                nextBtn.style.display = 'inline-block';
                subBtn.style.display = 'none';
            }
        }
    };

    const showResult = () => {
        try {
            const activity = Activity.getDefine(Activity.getQid(`.${headerContainer}`)) ?? {};
            const lang = activity?.lang ?? 'en';
            const content = activity?.content ?? {};
            const levels = content?.levels ?? [];
            const skiplevels = content?.skiplevels ?? false;
            const skipansbtn = content?.skipanswerbutton ?? false;
            const skipnextbtn = content?.skipnextlevel ?? false;
            const skipOptions = __activity?.content?.skipOptions ?? false;

            const levelTextEl = document.getElementById("levelText");
            if (levelTextEl) levelTextEl.style.display = 'none';
            const container = document.getElementById("quizContainerAdaptiv");
            submitted = true;
            attemptCount++;

            wrongQuestions = [];
            (currentQuizData || []).forEach((q, i) => {
                if (userAnswersAdaptiv[i] !== q.answer) {
                    wrongQuestions.push(i);
                }
            });

            const popupLabels = Activity.translatePopupLabels(lang);

            const correct = (userAnswersAdaptiv || []).filter((a, i) => a === (currentQuizData?.[i]?.answer)).length;
            const showAnswerBtn = attemptCount >= 5;
            const showRetryBtn = correct < (currentQuizData?.length || 0);
            const showNextLevel = correct === skipnextbtn || skipOptions || ((currentQuizData?.length || 0) && (currentQuizData?.length || 0) > 0);
            const finished = currentLevel === levels.length;
            const whenCompleteLevel = showNextLevel ? popupLabels.levelComplete : "";
            const navButtonsEl = document.getElementById("nav-buttons");
            if (navButtonsEl) navButtonsEl.style.display = "none";
            const submitWrapper = document.getElementById("submit-btn-wrapper");
            if (submitWrapper) submitWrapper.innerHTML = '';
            if (!container) return;

            const btnLabel = Activity.translateButtonLabels(lang);
            container.innerHTML = `
                <div class="result-box">
                    ${!skipnextbtn ? `<h4><strong class="fs-1">${popupLabels.levelLabel} ${currentLevel} ${whenCompleteLevel}</strong></h4>` : ''}
                    ${!skipOptions ? `
                        <p class="text-danger my-3">
                            ${popupLabels.totalQuestions} : 
                            ${currentQuizData?.length || 0}
                        </p>
                        <p class="text-success my-3">
                            ${popupLabels.correctAnswers}: ${correct}
                        </p>
                        <p class="text-success my-3">
                            ${popupLabels.attemptNo}: ${attemptCount}
                        </p>
                        ` : ''
                }
                    <div class="rowBtns">
                        ${((showNextLevel || skiplevels) && !skipnextbtn) ? `
                            <button class='btn btn-success mt-3 mx-3' id='btn-next-level'>
                                ${popupLabels.goToLevel(currentLevel + 1)}
                            </button>` : ''
                }
                        ${(showRetryBtn || showNextLevel) ? `
                                <button class='btn btn-primary mt-3 mx-3' id='btn-retry'>
                                    ${btnLabel.try}
                                </button>
                            ` : ''
                }
                        ${!skipOptions ? `
                            ${(!skipOptions || showAnswerBtn || showNextLevel || skipansbtn) ? `
                                    <button class='btn btn-danger mt-3 mx-3' id='btn-show-answers'>
                                        ${btnLabel.show}
                                    </button>
                                ` : ''
                    }
                            ` : ''
                }
                        ${(finished && showNextLevel && !skipnextbtn) ? `
                                <button class='btn btn-success mt-3 mx-3' id='btn-finish'>
                                    ${popupLabels.finished}
                                </button>
                            ` : ''
                }
                    </div>
                </div>`;

            const btnNextLevel = document.getElementById('btn-next-level');
            const btnRetry = document.getElementById('btn-retry');
            const btnShowAnswers = document.getElementById('btn-show-answers');
            const btnFinish = document.getElementById('btn-finish');

            if (btnNextLevel) {
                btnNextLevel.addEventListener('click', (e) => {
                    loadNextLevel();
                });
            }
            if (btnRetry) {
                btnRetry.addEventListener('click', (e) => {
                    retryQuiz();
                });
            }
            if (btnShowAnswers) {
                btnShowAnswers.addEventListener('click', (e) => {
                    showAnswerPopup();
                });
            }
            if (btnFinish) {
                btnFinish.addEventListener('click', (e) => {
                    finishMessage();
                });
            }

            showResultPending = false;
            $(".instruc").hide();
            $(".submit-info").hide();

            const hideBtn = document.getElementById("btn-next-level");
            if (finished && showNextLevel) {
                if (hideBtn) hideBtn.style.display = 'none';
            } else {
                if (hideBtn) hideBtn.style.display = 'inline-block';
            }

            retryWrongOnly = false;
        } catch (e) {
            console.error('Adaptiv.showResult error:', e);
        }
    }

    const getQuestionLimit = () => {
        return retryWrongOnly
            ? wrongQuestions.length
            : currentQuizData?.length || 0;
    };

    const loadNextLevel = () => {
        const levelTextEl = document.getElementById("levelText");
        if (levelTextEl) levelTextEl.style.display = 'block';
        if (currentLevel < 3) currentLevel++;

        if (currentLevel === 2 && typeof quizDataLevelB !== 'undefined') currentQuizData = quizDataLevelB;
        if (currentLevel === 3 && typeof quizDataLevelC !== 'undefined') currentQuizData = quizDataLevelC;
        currentQuestion = 0;
        submitted = false;
        userAnswersAdaptiv = new Array(currentQuizData?.length || 0).fill(null);
        attemptCount = 0;
        const navButtonsEl = document.getElementById("nav-buttons");
        if (navButtonsEl) navButtonsEl.style.display = "block";
        const levelUpdateEl = document.querySelector(".levelUpdate");
        if (levelUpdateEl && typeof levelHeadings !== 'undefined') levelUpdateEl.textContent = levelHeadings[currentLevel];

        renderQuestion(Activity.getQid(`.${headerContainer}`));
        updateAttemptedCount();
        $(".instruc").show();
        $(".submit-info").show();
        if (currentLevel === 2) {
            $("#quizContainerAdaptiv").removeClass("animate__bounceInLeft").addClass("animate__bounceInRight");
        }
        else if (currentLevel === 3) {
            $("#quizContainerAdaptiv").removeClass("animate__bounceInRight").addClass("animate__bounceInLeft");
        }
        if (navButtonsEl) navButtonsEl.style.display = "block";
    }

    const updateAttemptedCount = () => {
        if (!Array.isArray(userAnswersAdaptiv)) {
            const el = document.getElementById("attempted-count");
            if (el) el.textContent = 0;
            return;
        }
        const attempted = userAnswersAdaptiv.filter(a => a !== null).length;
        const el = document.getElementById("attempted-count");
        if (el) el.textContent = attempted;
    }

    const retryQuiz = () => {
        submitted = false;

        retryWrongOnly = false;
        currentQuestion = 0;
        userAnswersAdaptiv = new Array(currentQuizData.length).fill(null);

        // if( wrongQuestions.length > 0 ) {
        //     console.log('if')
        //     retryWrongOnly = true;
        //     currentQuestion = 0;

        //     wrongQuestions.forEach(i => {
        //         userAnswersAdaptiv[i] = null;
        //     });
        // } else {
        //     console.log('else')
        //     retryWrongOnly = false;
        //     currentQuestion = 0;
        //     userAnswersAdaptiv = new Array(currentQuizData.length).fill(null);
        // }

        renderQuestion(Activity.getQid(`.${headerContainer}`));
        updateAttemptedCount();

        $(".instruc").show();
        $(".submit-info").show();

        const levelTextEl = document.getElementById("levelText");
        if (levelTextEl) levelTextEl.style.display = 'block';
    };

    const showAnswerPopup = () => {
        const activity = Activity.getDefine(Activity.getQid(`.${headerContainer}`));
        const lang = activity?.lang ?? 'en';

        let totalCorrect = 0;
        let totalQuestion = 0;
        let topData = ``;
        let midData1 = ``;
        let midData2 = ``;
        let midData3 = ``;
        const optionLabel = index => (typeof index === 'number' && index >= 0) ? String.fromCharCode(65 + index) : "";

        const label = index => Activity.translateBulletLabels({ lang: lang, ind: index, upperCase: true });
        (currentQuizData || []).forEach((q, i) => {
            const userIndex = userAnswersAdaptiv?.[i];
            const userAnswerText = (userIndex !== null && userIndex !== undefined) ? `${label(userIndex)}` : "Not attempted";
            const correctAnswerText = `${label(q.answer)}`;
            if (userAnswerText === correctAnswerText) totalCorrect++;
            totalQuestion++;

            let resultSymbol = '✘';
            let resultClass = 'text-danger';
            if (userAnswerText === correctAnswerText) {
                resultSymbol = '✔';
                resultClass = 'text-success';
            }

            midData2 += `<tr class="trData">
                <th>${lang == 'hi' ? 'प्र' : 'Q'}${totalQuestion}.</th>
                <td class="text-danger">${userAnswerText}</td>
                <td class="text-success">${correctAnswerText}</td>
                <td class="${resultClass}">${resultSymbol}</td>
            </tr>`;
        });

        const popupLabels = Activity.translatePopupLabels(lang);
        const headLabel = Activity.translateTableHeads(lang);
        topData = `<div class="d-flex justify-content-between align-items-center">
                    <h4 id="scoreTextQ1" class="text-center mb-3">
                        ${popupLabels.scored(totalCorrect, totalQuestion)}
                    </h4>
                    <button class="btn btn-secondary" id="btn-close-answers">X</button>
                </div>`;
        midData1 = `<div id="" class="innerDIV">
                    <div class="table-responsive p-2">
                        <table class="table table-bordered" style="font-size:20px">
                        <thead class="thead-light" style="white-space: nowrap;">
                            <tr>
                                <th>${headLabel.sequence}</th>
                                <th>${headLabel.attempted}</th>
                                <th>${headLabel.correct}</th>
                                <th>${headLabel.result}</th>
                            </tr>
                        </thead>
                        <tbody>`;
        midData3 = `</tbody>
                        </table>
                    </div>
                </div>`;
        const reviewHtml = topData + midData1 + midData2 + midData3;
        const reviewEl = document.getElementById("answer-reviewAD");
        if (reviewEl) reviewEl.innerHTML = reviewHtml;

        $("#popupDialogAnsAd").css("display", "block");
        const btnCloseAnswers = document.getElementById("btn-close-answers");
        if (btnCloseAnswers) {
            btnCloseAnswers.addEventListener("click", closeFnAD);
        }
    }

    const closeFnAD = () => {
        $("#popupDialogAnsAd").hide();
    }

    const finishMessage = () => {
        const activity = Activity.getDefine(Activity.getQid(`.${headerContainer}`));
        const lang = activity?.lang ?? 'en';
        const popupLabels = Activity.translatePopupLabels(lang);

        Swal.fire({
            title: popupLabels.allCorrect,
            text: "",
            icon: "success",
            timer: 3000,
            showConfirmButton: false
        });
    }

    const openFn = () => {
        const ov = document.getElementById('overlay');
        if (ov) ov.classList.add('active');
    }

    const closeFn = () => {
        const ov = document.getElementById('overlay');
        if (ov) ov.classList.remove('active');
    }

    return {
        render: renderQuestion,
        userAnswersAdaptiv,
        currentLevel,
        currentQuestion,
        submitted,
        currentQuizData,
        attemptCount,
        showResultPending
    }

})();

const DropDown = (() => {

    Activity.css('dd.css');

    const quesClass = 'questionSections';

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container">
                                        <div class="qSections">
                                            <div class="questHindi ${Define.get('head')}"></div>
                                        </div>
                                        <div class="${quesClass}"></div>
                                    </div>
                                    <div class="buttons machiNgs">
                                        <button class="submit-btn" id="checkBtnDD_quiz1">${buttonLabel.check}</button>
                                        <button class="show-btn">${buttonLabel.show}</button>
                                        <button class="reset-btn">${buttonLabel.try}</button>
                                    </div>
                                </div>
                                <div class="reportTBl" id="commonReport">
                                    <div class="reportBox">
                                        <div class="holdWhite">
                                        <div class="headerRep">
                                            <div class="statusIfallgood" id="statusIfallgood"></div>
                                            <div class="closeModels" onclick="document.getElementById('commonReport').style.display='none'">
                                                <svg width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div id="reportBoxRender"></div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            const submitBtn = parent.querySelector('.submit-btn');
            const showBtn = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');

            if (submitBtn) submitBtn.addEventListener("click", checkAnswersDD);
            if (showBtn) showBtn.addEventListener("click", showAnswersDD);
            if (resetBtn) resetBtn.addEventListener("click", resetActivityDD);
        } catch (e) {
            console.error('DropDown.ui :', e);
        }
    }

    const renderQuestions = (questionId) => {
        ui(questionId);
        Activity.setHeader(questionId);

        const container = document.querySelector(`.${quesClass}`);
        container.innerHTML = "";

        $(`.${quesClass}`)[0].dataset.qid = questionId;

        const content = Activity.getDefine(questionId)?.content;
        const questions = content?.questions;
        const replacement = content?.replacement;

        questions.forEach((q, i) => {
            const wrapper = document.createElement("div");
            wrapper.className = "qLines";

            const parts = q.text.split(replacement);

            if (Array.isArray(q.options[0])) {
                parts.forEach((part, blankIndex) => {
                    wrapper.appendChild(document.createTextNode(part));

                    if (blankIndex < q.options.length) {
                        const select = makeSelect(i, blankIndex, q.options[blankIndex]);
                        wrapper.appendChild(select);
                    }
                });
            } else {
                wrapper.appendChild(document.createTextNode(parts[0] || ""));
                const select = makeSelect(i, null, q.options);
                wrapper.appendChild(select);
                wrapper.appendChild(document.createTextNode(parts[1] || ""));
            }

            container.appendChild(wrapper);
        });
    }

    const makeSelect = (qIndex, blankIndex, optionsArr) => {
        const select = document.createElement("select");
        select.setAttribute("data-index", qIndex);
        if (blankIndex !== null) select.setAttribute("data-blank", blankIndex);

        const lang = Activity.getDefine(Activity.getQid(`.${quesClass}`))?.lang;
        const popupLabels = Activity.translatePopupLabels(lang);

        const def = document.createElement("option");
        def.value = "";
        def.disabled = true;
        def.selected = true;
        def.hidden = true;
        def.textContent = popupLabels.choose;
        select.appendChild(def);

        optionsArr.forEach(optValue => {
            const opt = document.createElement("option");
            opt.value = norm(optValue);
            opt.textContent = optValue;
            select.appendChild(opt);
        });

        return select;
    }

    const norm = (s) => {
        if (s === null || s === undefined) return "";
        return String(s).trim().normalize();
    }

    const checkAnswersDD = () => {
        document.getElementById("commonReport").style.display = "block";
        const selects = document.querySelectorAll(`select`);

        const activity = Activity.getDefine(Activity.getQid(`.${quesClass}`));
        const lang = activity?.lang || 'en';
        const content = activity?.content;
        const data = content?.questions;
        const popupLabels = Activity.translatePopupLabels(lang);

        const headings = {
            yourAns: popupLabels.yourAnswer,
            correctAns: popupLabels.correctAnswer,
            status: popupLabels.status,
            correct: popupLabels.correctStatus,
            incorrect: popupLabels.incorrectStatus,
            unattempted: popupLabels.unattemptedStatus,
            statusText: popupLabels.correct
        };

        const numbering = lang == 'hi'
            ? ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श"]
            : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        let reportHtml = `
            <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead>
                <tr style="background:#f1f5f9; color:#000;">
                    <th>#</th>
                    <th>${headings.yourAns}</th>
                    <th>${headings.correctAns}</th>
                    <th>${headings.status}</th>
                </tr>
                </thead>
                <tbody>
        `;

        let correctCount = 0;
        let questionTracker = {};

        selects.forEach(sel => {
            const qIdx = parseInt(sel.getAttribute("data-index"), 10);
            const blankIdx = parseInt(sel.getAttribute("data-blank"), 10) || 0;

            const yourAns = sel.value ? norm(sel.value) : headings.unattempted;
            const correctRaw = Array.isArray(data[qIdx].answer) ? data[qIdx].answer[blankIdx] : data[qIdx].answer;
            const correctAns = norm(correctRaw);

            let status = yourAns === correctAns
                ? headings.correct
                : (yourAns === headings.unattempted ? headings.unattempted : headings.incorrect);

            sel.classList.remove("correct", "incorrect");
            if (status === headings.correct) {
                sel.classList.add("correct");
                correctCount++;
            } else if (status === headings.incorrect) {
                sel.classList.add("incorrect");
            }

            if (!questionTracker[qIdx]) questionTracker[qIdx] = { yourAns: [], correctAns: [], status: [] };
            questionTracker[qIdx].yourAns.push(yourAns);
            questionTracker[qIdx].correctAns.push(correctAns);
            questionTracker[qIdx].status.push(status);
        });

        Object.keys(questionTracker).forEach(qIdx => {
            const q = questionTracker[qIdx];
            reportHtml += `
            <tr>
                <td>${numbering[parseInt(qIdx)] || (parseInt(qIdx) + 1)}</td>
                <td>${q.yourAns.join(", ")}</td>
                <td>${q.correctAns.join(", ")}</td>
                <td>${q.status.join(", ")}</td>
            </tr>
            `;
        });

        reportHtml += `</tbody></table></div>`;
        document.getElementById("reportBoxRender").innerHTML = reportHtml;

        const statusIfallgood = document.getElementById("statusIfallgood");
        if (statusIfallgood) {
            statusIfallgood.innerHTML = `
            <span class="blinkMe" style="font-weight:bold; color:${correctCount === selects.length ? "green" : "red"}">
                ${correctCount} / ${selects.length} ${headings.statusText} 
                (${selects.length ? Math.round((correctCount / selects.length) * 100) : 0}%)
            </span>
            `;
        }
    }

    const showAnswersDD = () => {
        const container = Define.get('questionContainer');
        const parent = document.querySelector(container);
        const btn = parent.querySelector('.show-btn')
        const btnGroup = btn.closest(".buttons");
        if (btnGroup) {
            const submitBtn = btnGroup.querySelector(".submit-btn");
            if (submitBtn) submitBtn.classList.add("disable");
        }

        const data = Activity.getDefine(Activity.getQid(`.${quesClass}`))?.content?.questions;
        const selects = document.querySelectorAll(`select`);
        selects.forEach(sel => {
            const qIdx = parseInt(sel.getAttribute("data-index"), 10) || 0;
            const blankIdx = parseInt(sel.getAttribute("data-blank"), 10) || 0;

            const correctRaw = Array.isArray(data[qIdx].answer)
                ? data[qIdx].answer[blankIdx]
                : data[qIdx].answer;
            const correctAns = norm(correctRaw);

            let matched = Array.from(sel.options).find(opt => norm(opt.value) === correctAns);
            if (!matched) {
                matched = Array.from(sel.options).find(opt => norm(opt.textContent) === correctAns);
            }
            if (matched) sel.value = matched.value;

            sel.classList.remove("incorrect");
            sel.classList.add("correct");
        });

    }

    const resetActivityDD = () => {
        const container = Define.get('questionContainer');
        const parent = document.querySelector(container);
        const btn = parent.querySelector('.reset-btn')
        const btnGroup = btn.closest(".buttons");
        if (btnGroup) {
            const submitBtn = btnGroup.querySelector(".submit-btn");
            if (submitBtn) submitBtn.classList.remove("disable");
        }
        const selects = document.querySelectorAll(`select`);
        selects.forEach(sel => {
            sel.selectedIndex = 0;
            sel.classList.remove("correct", "incorrect");
        });
    }

    return {
        render: renderQuestions
    };

})();

const Circle = (() => {

    Activity.css('clickTo.css');

    const quesClass = 'questInCHeading';
    const dataKey = 'c1';
    let activitiesClicked = {};
    let userSelections = {};

    const ui = (questionId) => {
        try {
            const containerSelector = Define.get('questionContainer');
            const parent = document.querySelector(containerSelector);
            if (!parent) {
                console.error("ui container not found:", containerSelector);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container" id="${dataKey}">
                                        <div class="${quesClass}">
                                            <div class="questHindi ${Define.get('head')}"></div>
                                        </div>
                                        <div id="datClikToCir"></div>
                                        <div class="buttons machiNgs">
                                            <button class="submit-btn">${buttonLabel.check}</button>
                                            <button class="show-btn">${buttonLabel.show}</button>
                                            <button class="reset-btn">${buttonLabel.try}</button>
                                        </div>
                                    </div>
                                </div>
                                <div id="clickAct">
                                    <div class="baseFixeds">
                                        <div class="report_clicks">
                                        <div
                                            class="d-flex justify-content-between align-items-center">
                                            <h4 id="scoreTextQ1Click" class="text-center"></h4>
                                            <button id="pop-close" class="btn btn-secondary">X</button>
                                        </div>
                                        <div id="datapendReportClick"></div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            const submitBtn = parent.querySelector('.submit-btn');
            const showBtn = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');
            const closepop = parent.querySelector('#pop-close');

            if (submitBtn) submitBtn.addEventListener("click", () => checkCircle(dataKey));
            if (showBtn) showBtn.addEventListener("click", (ev) => showCircle(dataKey, ev.currentTarget));
            if (resetBtn) resetBtn.addEventListener("click", () => resetCircle(dataKey));
            if (closepop) closepop.addEventListener("click", closeReportClick);
        } catch (e) {
            console.error('Circle.ui :', e);
        }
    };

    const renderQuestions = (questionId) => {
        ui(questionId);
        Activity.setHeader(questionId);

        const heading = document.querySelector(`.${quesClass}`);
        if (!heading) {
            console.error("renderQuestions: heading element not found");
            return;
        }
        heading.dataset.qid = questionId;

        const renderDiv = document.querySelector(`#datClikToCir`);
        if (!renderDiv) {
            console.error("renderQuestions: render container #datClikToCir not found");
            return;
        }
        renderDiv.innerHTML = "";

        const activity = Activity.getDefine(questionId);
        const content = activity?.content;
        const lang = activity?.lang ?? 'en';

        if (!Array.isArray(content)) {
            console.error("renderQuestions: activity content should be an array", content);
            return;
        }

        activitiesClicked[dataKey] = {
            mode: activity.mode || activity?.content?.mode || activity?.mode || 'multi',
            questions: content,
            lang: activity?.content?.lang || activity.lang || 'en'
        };

        if (!userSelections[dataKey]) userSelections[dataKey] = {};

        content.forEach((item, ind) => {
            const parts = item.text.split(/(\s+|,)/);
            const html = parts.map((part) => {
                if (part.trim() === "" || part === ",") return part;
                return `<span class="clickable" data-act="${dataKey}" data-id="${item.id}" data-word="${part.trim()}">${part}</span>`;
            }).join("");
            renderDiv.innerHTML += `
            <div class="questInC" data-id="${item.id}">
                <span class="label">(${Activity.translateBulletLabels({ lang: lang, ind: ind })})</span> ${html}
            </div>`;
        });

        if (!document.__circle_click_attached) {
            document.addEventListener("click", function (e) {
                if (!e.target || !e.target.classList) return;
                if (e.target.classList.contains("clickable")) {
                    const span = e.target;
                    const act = span.dataset.act;
                    const qId = span.dataset.id;
                    const word = span.dataset.word;

                    const activityMeta = activitiesClicked[act];
                    if (!activityMeta) {
                        const qid = Activity.getQid(`.${quesClass}`);
                        const actActivity = Activity.getDefine(qid);
                        const mode = actActivity?.mode || 'multi';
                        activitiesClicked[act] = activitiesClicked[act] || { mode, questions: actActivity?.content || [], lang: actActivity?.lang || 'en' };
                    }

                    const mode = activitiesClicked[act].mode;

                    if (!userSelections[act]) userSelections[act] = {};
                    if (!userSelections[act][qId]) userSelections[act][qId] = [];

                    if (mode === "single") {
                        const siblings = document.querySelectorAll(`[data-act="${act}"][data-id="${qId}"]`);
                        siblings.forEach(sib => sib.classList.remove("circle"));

                        userSelections[act][qId] = [word];
                        span.classList.add("circle");
                    } else {
                        span.classList.toggle("circle");

                        if (span.classList.contains("circle")) {
                            if (!userSelections[act][qId].includes(word)) {
                                userSelections[act][qId].push(word);
                            }
                        } else {
                            userSelections[act][qId] = userSelections[act][qId].filter(w => w !== word);
                        }
                    }
                }
            });
            document.__circle_click_attached = true;
        }
    };

    const checkCircle = (dataKeyParam) => {
        const key = dataKeyParam || dataKey;
        const container = document.getElementById(key);
        const activity = activitiesClicked[key];
        if (!container || !activity) {
            console.error("checkCircle: missing container or activity for", key);
            return;
        }
        const data = activity.questions;

        data.forEach((item) => {
            const answers = Array.isArray(item.answer) ? item.answer : [item.answer];
            const spans = container.querySelectorAll(`[data-id="${item.id}"] .clickable`);
            spans.forEach((span) => {
                span.classList.remove("correct", "wrong");
                if (span.classList.contains("circle")) {
                    if (answers.includes(span.dataset.word)) {
                        span.classList.add("correct");
                    } else {
                        span.classList.add("wrong");
                    }
                }
            });
        });

        showClickReportClick(data, userSelections[key], activity.lang || 'en');
    };

    const showCircle = (dataKeyParam, btn) => {
        const key = dataKeyParam || dataKey;
        const container = document.getElementById(key);
        const activity = activitiesClicked[key];
        if (!container || !activity) {
            console.error("showCircle: missing container or activity for", key);
            return;
        }
        const data = activity.questions;

        container.querySelectorAll(".clickable").forEach((el) => {
            el.classList.remove("circle", "wrong", "correct");
        });

        data.forEach((item) => {
            const answers = Array.isArray(item.answer) ? item.answer : [item.answer];
            const spans = container.querySelectorAll(`[data-id="${item.id}"] .clickable`);
            spans.forEach((span) => {
                if (answers.includes(span.dataset.word)) {
                    span.classList.add("correct");
                }
            });
        });

        const checkBtn = container.querySelector(".submit-btn");
        if (checkBtn) {
            checkBtn.classList.add("disabled-click");
            checkBtn.disabled = true;
        }
        if (btn && btn.classList) {
            btn.classList.add("clicked-show");
        }
    };

    const resetCircle = (dataKeyParam) => {
        const key = dataKeyParam || dataKey;
        const container = document.getElementById(key);
        if (!container) return;

        container.querySelectorAll(".clickable").forEach((el) => {
            el.classList.remove("circle", "correct", "wrong");
        });

        const checkBtn = container.querySelector(".submit-btn");
        if (checkBtn) {
            checkBtn.classList.remove("disabled-click");
            checkBtn.disabled = false;
        }

        const showBtn = container.querySelector(".show-btn");
        if (showBtn) {
            showBtn.classList.remove("clicked-show");
        }

        userSelections[key] = {};
    };

    const showClickReportClick = (clickData, selections = {}, typeLang = 'en') => {
        $("#clickAct").css("display", "block");
        let correctCount = 0;
        let totalQues = Array.isArray(clickData) ? clickData.length : 0;
        const headLabels = Activity.translateTableHeads(typeLang);
        const popupLabels = Activity.translatePopupLabels(typeLang);

        let tableHTML = `<div class="table-responsive p-2">
            <table class="table table-bordered" style="font-size:18px">
            <thead class="text-light" style="white-space: nowrap;">
            <tr>
                <th>${headLabels.sequence}</th>
                <th>${headLabels.attempted}</th>
                <th>${headLabels.correct}</th>
                <th>${headLabels.result}</th>
            </tr>
            </thead>
            <tbody>`;
        // ..

        (clickData || []).forEach((q, i) => {
            const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
            const userAns = (selections && selections[q.id]) ? selections[q.id] : [];
            let isCorrect =
                userAns.length > 0 &&
                correctAnswers.every(a => userAns.includes(a)) &&
                userAns.length === correctAnswers.length;
            if (isCorrect) correctCount++;

            const userAnswerText =
                userAns.length > 0
                    ? userAns.join(", ")
                    : typeLang === "hi" ? "प्रयास नहीं किया" : "Not Attempted";
            const correctAnswerText = correctAnswers.join(", ");
            tableHTML += `
            <tr>
                <th>${q.label || (i + 1)}</th>
                <td class="${isCorrect ? "text-success" : "text-danger"}">${userAnswerText}</td>
                <td class="text-success">${correctAnswerText}</td>
                <td class="${isCorrect ? "text-success" : "text-danger"}">
                ${isCorrect ? "✔" : "✘"}
                </td>
            </tr>`;
        });

        tableHTML += `</tbody></table></div>`;

        const reportEl = document.getElementById("datapendReportClick");
        if (reportEl) reportEl.innerHTML = tableHTML;

        const scoreEl = document.getElementById("scoreTextQ1Click");
        if (scoreEl) {
            scoreEl.innerText = popupLabels.scored(correctCount, totalQues);
        }
    };

    const closeReportClick = () => {
        $("#clickAct").css("display", "none");
        const reportEl = document.getElementById("datapendReportClick");
        if (reportEl) reportEl.innerHTML = "";
    };

    return {
        render: renderQuestions
    };

})();

const ShravanKaushal = (() => {

    Activity.css('shrvan.css');

    const inputDataId = 'showrowInputsData1';

    let curntInd = -1;
    let audioPlayer = null;

    const ui = (questionId) => {
        try {
            const containerSelector = Define.get('questionContainer');
            const btnid = 'shravanPopupClose'
            const parent = document.querySelector(containerSelector);
            if (!parent) {
                console.error("ui container not found:", containerSelector);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const buttonLabel = Activity.translateButtonLabels(lang);
            const nextPrevLabel = Activity.translateNextPrevLabel(lang);

            parent.innerHTML = `<div class="question">
                                    <audio id="audioPlayer" preload="auto"></audio>
                                    <div class="startActBtns">
                                        <div class="play-btn" role="button" tabindex="0">
                                            <div class="icon"></div>
                                        </div>
                                    </div>
                                    <div class="afterClicks" style="display:none;">
                                        <div class="container">
                                            <div class="bigHeadingS ${Define.get('head')}"></div>
                                            <div class="runingHead ${Define.get('subHead')}"></div>
                                            <div id="${inputDataId}" class="rowInputsData"></div>
                                            <div class="secondRowaBB">
                                                <div class="nextPreviRow">
                                                    <button class="buttShar" id="prevBtns">${nextPrevLabel.prev}</button>
                                                    <button class="buttShar" id="nextBtns">${nextPrevLabel.next}</button>
                                                    <button class="buttShar" id="replayBtns">${buttonLabel.replay}</button>
                                                </div>
                                                <div class="buttons machiNgs">
                                                    <button class="submit-btn">${buttonLabel.check}</button>
                                                    <button class="reset-btn">${buttonLabel.try}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="clickActShravan" style="display:none;">
                                    <div class="baseFixeds">
                                        <div class="report_shravan">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <h4 id="scoreTextQ8Click" class="text-center"></h4>
                                                <button class="btn btn-secondary" id="${btnid}">X</button>
                                            </div>
                                            <div id="dataReportShravan"></div>
                                            <div class="ansViews"></div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            const closeBtn = document.getElementById(btnid);
            if (closeBtn) {
                closeBtn.addEventListener('click', closeReportShravan);
            }

            const inputEl = document.getElementById(inputDataId);
            if (inputEl) inputEl.dataset.qid = questionId;

            audioPlayer = parent.querySelector('#audioPlayer');

            const playBtn = parent.querySelector('.play-btn');
            const prevBtn = parent.querySelector('#prevBtns');
            const nextBtn = parent.querySelector('#nextBtns');
            const replayBtn = parent.querySelector('#replayBtns');
            const submiBtn = parent.querySelector('.submit-btn');
            const resetBtn = parent.querySelector('.reset-btn');

            if (playBtn) playBtn.addEventListener('click', startShravan);
            if (prevBtn) prevBtn.addEventListener('click', prevStep);
            if (nextBtn) nextBtn.addEventListener('click', nextStep);
            if (replayBtn) replayBtn.addEventListener('click', replayAudio);
            if (submiBtn) submiBtn.addEventListener('click', checkAns);
            if (resetBtn) resetBtn.addEventListener('click', resetAns);

            if (playBtn) {
                playBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        startShravan();
                    }
                });
            }
            updateButtons();
        } catch (e) {
            console.error('ShravanKaushal.ui :', e);
        }
    };

    const renderQues = (questionId) => {
        ui(questionId);
        Activity.setHeader(questionId);

        const dataSet = Activity.getDefine(Activity.getQid(`#${inputDataId}`))?.content?.questions || [];

        const rowDiv = document.getElementById(inputDataId);
        rowDiv.innerHTML = "";

        const popupcontainer = document.querySelector('.ansViews');
        const popupContent = [];
        dataSet.forEach((item, ind) => {
            const html = `
                <div class="columan shadow-lg">
                    <div class="textHindiOpt">${item.text}</div>
                    <input id="f${inputDataId}_${item.id}" type="text" maxlength="1" class="inputTSharavan" />
                </div>
            `;
            rowDiv.innerHTML += html;

            const popuprow = `<div class="viewsDivs">${ind + 1}. ${item.popuptext} — ${item.text}</div>`;
            popupContent.push(popuprow);
        });
        popupcontainer.innerHTML = popupContent.join('');

    }

    const startShravan = () => {
        if (!audioPlayer) {

            audioPlayer = document.getElementById('audioPlayer');
            if (!audioPlayer) {
                console.error('audioPlayer not found');
                return;
            }
        }

        const qid = Activity.getQid(`#${inputDataId}`);
        const src = Activity.getDefine(qid)?.content?.audio?.headsrc
            ?? Activity.getDefine(qid)?.content?.audio?.options?.[0];
        if (src) {
            audioPlayer.src = src;
            audioPlayer.currentTime = 0;
            audioPlayer.play().catch(err => {

                console.warn('Audio play failed (user gesture required?):', err);
            });
        } else {
            console.warn('No audio source found for this activity.');
        }

        const startBlock = document.querySelector('.startActBtns');
        const afterBlock = document.querySelector('.afterClicks');
        if (startBlock) startBlock.style.display = 'none';
        if (afterBlock) afterBlock.style.display = 'block';

        updateButtons();
    };

    const updateButtons = () => {
        const audioList = Activity.getDefine(Activity.getQid(`#${inputDataId}`))?.content?.audio?.options || [];
        const prevBtn = document.getElementById('prevBtns');
        const nextBtn = document.getElementById('nextBtns');

        if (!prevBtn || !nextBtn) return;

        if (curntInd <= 0) {
            prevBtn.classList.add('cNotAll');
            prevBtn.disabled = true;
        } else {
            prevBtn.classList.remove('cNotAll');
            prevBtn.disabled = false;
        }

        if (curntInd >= audioList.length - 1) {
            nextBtn.classList.add('cNotAll');
            nextBtn.disabled = true;
        } else {
            nextBtn.classList.remove('cNotAll');
            nextBtn.disabled = false;
        }
    };

    const nextStep = () => {
        const audioList = Activity.getDefine(Activity.getQid(`#${inputDataId}`))?.content?.audio?.options || [];
        if (curntInd < audioList.length) {
            if (!audioPlayer) audioPlayer = document.getElementById('audioPlayer');

            if (curntInd < audioList.length - 1) {
                curntInd++;
            }

            audioPlayer.src = audioList[curntInd].src;
            audioPlayer.currentTime = 0;
            audioPlayer.play().catch(() => { });
        }
        updateButtons();
    };

    const prevStep = () => {
        const audioList = Activity.getDefine(Activity.getQid(`#${inputDataId}`))?.content?.audio?.options || [];
        if (curntInd > 0) {
            if (!audioPlayer) audioPlayer = document.getElementById('audioPlayer');
            curntInd--;
            audioPlayer.src = audioList[curntInd].src;
            audioPlayer.currentTime = 0;
            audioPlayer.play().catch(() => { });
        }
        updateButtons();
    };

    const replayAudio = () => {
        if (!audioPlayer) audioPlayer = document.getElementById('audioPlayer');
        if (!audioPlayer) return;
        audioPlayer.currentTime = 0;
        audioPlayer.play().catch(() => { });
    };

    const checkAns = () => {
        const data = Activity.getDefine(Activity.getQid(`#${inputDataId}`));
        const dataSet = data?.content?.questions || [];
        const lang = data?.lang || 'en';
        const headLabels = Activity.translateTableHeads(lang);
        const popupLabels = Activity.translatePopupLabels(lang);

        let correctCount = 0;
        const totalQues = dataSet.length;

        let tableHTML = `<div class="table-responsive p-2">
            <table class="table table-bordered" style="font-size:18px">
            <thead class="text-light" style="white-space: nowrap;">
                <tr>
                <th>${headLabels.sequence}</th>
                <th>${headLabels.attempted}</th>
                <th>${headLabels.correct}</th>
                <th>${headLabels.result}</th>
                </tr>
            </thead>
            <tbody>`;
        // ..

        dataSet.forEach((q, i) => {
            const inputEl = document.getElementById(`f${inputDataId}_${q.id}`);
            const userAns = parseInt(inputEl.value);
            const correctAnswers = Array.isArray(q.ans) ? q.ans : [q.ans];

            const isCorrect = userAns && correctAnswers.includes(userAns);
            if (isCorrect) correctCount++;

            const userAnswerText =
                userAns.length > 0 ? userAns : popupLabels.notAttempted;
            const correctAnswerText = correctAnswers.join(", ");

            tableHTML += `
            <tr>
                <th>${q.label || (i + 1)}</th>
                <td class="${isCorrect ? "text-success" : "text-danger"}">${escapeHtml(userAnswerText)}</td>
                <td class="text-success">${escapeHtml(correctAnswerText)}</td>
                <td class="${isCorrect ? "text-success" : "text-danger"}">
                ${isCorrect ? "✔" : "✘"}
                </td>
            </tr>`;
        });

        tableHTML += `</tbody></table></div>`;

        const reportEl = document.getElementById("dataReportShravan");
        if (reportEl) reportEl.innerHTML = tableHTML;

        const scoreTextEl = document.getElementById("scoreTextQ8Click");
        if (scoreTextEl) {
            scoreTextEl.innerText = popupLabels.scored(correctCount, totalQues);
        }

        const clickAct = document.getElementById("clickActShravan");
        if (clickAct) clickAct.style.display = "block";
    };

    const closeReportShravan = () => {
        const el = document.getElementById("clickActShravan");
        if (el) el.style.display = "none";
    };

    const showAns = () => {
        const dataSet = Activity.getDefine(Activity.getQid(`#${inputDataId}`))?.content?.questions || [];
        dataSet.forEach(q => {
            const inputEl = document.getElementById(`f${inputDataId}_${q.id}`);
            if (inputEl) {
                inputEl.value = Array.isArray(q.ans) ? q.ans.join(', ') : (q.ans ?? '');
            }
        });
    };

    const resetAns = () => {
        const inputs = document.querySelectorAll(`#${inputDataId} input`);
        inputs.forEach(inp => inp.value = "");
    };

    const escapeHtml = (str) => {
        if (typeof str !== 'string') return str;
        return str.replace(/[&<>"']/g, (m) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m]));
    }

    return {
        render: renderQues,
        startShravan,
        curntInd,
        get audio() { return audioPlayer; }
    };

})();

const TrueAndFalse = (() => {

    const inputDataId = 'trueAndFalse4';
    let userAns = [];

    const ui = (questionId) => {
        try {
            const containerSelector = Define.get('questionContainer');
            const parent = document.querySelector(containerSelector);
            if (!parent) {
                console.error("ui container not found:", containerSelector);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const buttonLabel = Activity.translateButtonLabels(lang);

            const audio = activity?.add_content?.audio ?? false;
            const audioSrc = audio != false ? audio : '';

            parent.innerHTML = `<div class="question">
                                    <div class="container">
                                        ${audioSrc ?
                    `<div class="common_listening_container" id="listening_container">
                                                <div class="play-btn common_playBtn">
                                                    <div class="icon"></div>
                                                </div>
                                            </div>`: ''
                }
                                        <div id="question_header_container" ${(audioSrc || !activity.head) ? `style="display: none"` : ''}>
                                            <div class="qSections row g-0 mt-3">
                                                <div class="col font18 fontBold ${Define.get('head')} m-0"></div>
                                                ${audioSrc ?
                    `<div class="col-auto" id="listening_common_audio_container">
                                                        <svg id="" fill="currentColor" width="33" height="33" class="bi bi-play-circle-fill common_playBtn" viewBox="0 0 16 16" role="button">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                                                        </svg>
                                                        <svg id="" width="33" height="33" fill="currentColor" class="bi bi-pause-circle-fill common_pauseBtn" viewBox="0 0 16 16" role="button">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
                                                        </svg>
                                                    </div>`: ''
                }
                                            </div>
                                            <hr/>
                                        </div>
                                        <div id='question-container-box' ${audioSrc ? `style="display: none"` : ''}>
                                            <div class="TandF-context p-1 row g-0 justify-content-center"></div>
                                            <div class="marTop5">
                                                <div id="${inputDataId}"></div>
                                            </div>
                                            <div class="buttons machiNgs">
                                                <button class="submit-btn disable" id="submit4">${buttonLabel.check}</button>
                                                <button class="show-btn">${buttonLabel.show}</button>
                                                <button class="reset-btn">${buttonLabel.try}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="popupDialogAns">
                                        <div class="baseMod">
                                            <div class="answerdiv">
                                                <div class="d-flex justify-content-between align-items-center mb-3">
                                                    <h4 id="scoreTextQ1" class="text-center mb-3"></h4>
                                                    <button class="btn btn-secondary popUp-close-btn">X</button>
                                                </div>
                                                <div id="answer-review"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            const inputEl = document.getElementById(inputDataId);
            if (inputEl) inputEl.dataset.qid = questionId;

            const submiBtn = parent.querySelector('.submit-btn');
            const showBtn = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');
            const closePopUpBtn = parent.querySelector('.popUp-close-btn');

            if (submiBtn) submiBtn.addEventListener('click', showPopUp);
            if (showBtn) showBtn.addEventListener('click', showAnswersTandF);
            if (resetBtn) resetBtn.addEventListener('click', resetTrueFalse);
            if (closePopUpBtn) closePopUpBtn.addEventListener('click', closePopUp);

            is_Audio_available(audioSrc);

        } catch (e) {
            console.error('TrueAndFalse.ui :', e);
        }
    };

    const render = (questionId) => {
        ui(questionId);

        const qid = Activity.getQid(`#${inputDataId}`);
        const headElem = Activity.setHeader(qid);
        if (!headElem.head && !headElem.subhead) {
            document.querySelector('hr').remove();
        }

        const activity = Activity.getDefine(qid) ?? {};
        const lang = activity?.lang ?? 'en';
        const dataSet = activity?.content ?? [];
        const replacement = activity?.replacement ?? '#_#';

        userAns = new Array(dataSet.length).fill(null);

        const btnLabels = Activity.translateBooleanLabels(lang);

        const rowDiv = document.getElementById(inputDataId);
        rowDiv.innerHTML = "";
        const rowContent = [];

        const TandFContextContainer = $('.TandF-context');
        TandFContextContainer.empty();

        const add_content = activity?.add_content ?? {};

        const image = add_content?.image ?? {};
        const hasImg = image && Object.keys(image).length > 0;
        const isPath = image?.path;

        if (!hasImg || isPath == undefined) {
            TandFContextContainer.remove();
        }

        if (hasImg && isPath != undefined) {
            const imgDiv = $('<div class="mcq-image"><img ondragstart="return false;"/></div>');

            const commonClassImg = 'col-md-12 col-lg-5 col-sm-12 col-12 text-center';

            TandFContextContainer.append(imgDiv);

            const image_width = image.width ?? '40%';

            imgDiv.addClass(commonClassImg)
                .find('img')
                .attr('src', Activity.pathToCWD() + image.path)
                .css({ 'border-radius': '20px', 'width': image_width });
        }

        dataSet.forEach((item, ind) => {
            const isImage_Text = typeof item?.question === 'object' ? true : false;
            const hasText = isImage_Text == true ? item?.question?.text : false;
            const hasImage = isImage_Text == true ? item?.question?.image : false;

            let question = "";

            if (isImage_Text) {
                if (hasText) {
                    question += hasText;
                }

                if (hasImage) {
                    const imageWidth = item?.question?.width ?? '40px';
                    const image = `<img src="${Activity.pathToCWD() + hasImage}" alt="image" style="width:${imageWidth};" class="mx-auto" ondragstart="return false;">`;
                    if (hasText) {
                        question = question.replaceAll(replacement, image);
                    } else {
                        question = image;
                    }
                } else {
                    question = question.replaceAll(replacement, '');
                }

            } else {
                question = item.question;
            }

            const html = `
                <div class="row m-0 mb-3 question-block ${isImage_Text ? 'align-items-center' : ''}">
                    <div style="width:40px">(${Activity.translateBulletLabels({ lang: lang, ind: ind })})</div>
                    <div class="col p-0">
                        <div class="row m-0 ${isImage_Text ? 'align-items-center' : ''}">
                            <div class="col-lg-7 col-md-7 col-sm-8 col-10 p-0">&nbsp; ${question}</div>
                            <div class="col-auto options mb-2">
                                <button class="btn btn-sm btn-outline-success tnfBtn" data-answer="true" data-ind="${ind}">${btnLabels[0]}</button>
                                <button class="btn btn-sm btn-outline-danger tnfBtn" data-answer="false" data-ind="${ind}">${btnLabels[1]}</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            rowContent.push(html);
        });

        rowDiv.innerHTML = rowContent.join('');

        const containerSelector = Define.get('questionContainer');
        const parent = document.querySelector(containerSelector);
        const tnfBtns = parent.querySelectorAll('.tnfBtn');

        if (tnfBtns.length > 0) {
            tnfBtns.forEach(btn => {
                btn.addEventListener('click', (e) => selectAnswer(e.currentTarget));
            });
        }
    }

    const selectAnswer = (thisObj) => {
        const ind = $(thisObj).attr('data-ind');
        const answer = $(thisObj).attr('data-answer');
        userAns[ind] = answer;

        const btnGroup = thisObj.parentElement.querySelectorAll("button");
        btnGroup.forEach(b => b.classList.remove("active"));
        thisObj.classList.add("active");
        checkIfAllAttempt();
    }

    const checkIfAllAttempt = () => {
        const allAnswered = userAns.every(ans => ans !== null);
        const submitBtn = document.getElementById(`submit4`);
        if (allAnswered) {
            submitBtn.classList.remove("disable");
        }
    }

    const showAnswersTandF = () => {
        const questions = Activity.getDefine(Activity.getQid(`#${inputDataId}`))?.content || [];
        $(`.options`).css('pointer-events', 'none');
        $(`#submit4`).addClass('disable');
        questions.map((item, index) => {
            const opt1 = $(`.options`).eq(index).children().eq(0);
            const opt2 = $(`.options`).eq(index).children().eq(1);

            const opt1ans = opt1.attr('data-answer');

            $(`.options`).eq(index).children('button').removeClass('active');

            if (item.answer === (opt1ans === 'true')) {
                $(opt1).removeClass('active').addClass('active');
            } else {
                $(opt2).addClass('active');
            }
        })
    }

    const resetTrueFalse = () => {
        const questions = Activity.getDefine(Activity.getQid(`#${inputDataId}`))?.content || [];
        $(".tnfBtn").removeClass('active');
        $(`.options`).css('pointer-events', 'all');
        userAns = new Array(questions.length).fill(null);
        $(`#submit4`).addClass('disable');
    }

    const showPopUp = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${inputDataId}`)) ?? {};
        const lang = activity?.lang ?? 'en';
        const headLabels = Activity.translateTableHeads(lang);
        const questions = activity?.content;

        let correctCount = 0;
        const totalQues = questions.length;
        const table = [];

        const tableBodyF = `<div class="table-responsive p-2">
                                <table class="table table-bordered" style="font-size:20px">
                                    <thead class="text-light" style="white-space: nowrap;">
                                        <tr>
                                            <th>${headLabels.sequence}</th>
                                            <th>${headLabels.attempted}</th>
                                            <th>${headLabels.correct}</th>
                                            <th>${headLabels.result}</th>
                                        </tr>
                                    </thead>
                                <tbody>`;
        // ..
        table.push(tableBodyF);

        questions.forEach((item, i) => {
            const userAnswer = userAns[i];
            const correctAnswerText = item.answer;
            let count = 0;
            let isCorrect = false;

            if (item.answer === (userAnswer === 'true')) {
                isCorrect = true;
                count++;
                correctCount++;
            }

            const popupLabels = Activity.translatePopupLabels(lang);
            const userAnswerText = (userAnswer !== undefined && userAnswer !== null) ? `${userAnswer}` : popupLabels.unattemptedStatus;

            const textLabels = Activity.translateBooleanLabels(lang);

            const tempUserAnswer = userAnswer == 'true' ? textLabels[0] : (userAnswer == 'false' ? textLabels[1] : userAnswerText);
            const tempCorrectAnswer = correctAnswerText == true ? textLabels[0] : textLabels[1];

            const body = `
                <tr clsss='trData'>
                    <th>(${Activity.translateBulletLabels({ lang: lang, ind: i })})</th>
                    <td class="${isCorrect ? 'text-success' : 'text-danger'}">${tempUserAnswer}</td>
                    <td class="text-success">${tempCorrectAnswer}</td>
                    <td class="${isCorrect ? 'text-success' : 'text-danger'} ">${isCorrect ? '✔' : '✘'}</td>
                </tr>
            `;
            table.push(body);
        });

        const tableBodyL = `</tbody></table></div>`;
        table.push(tableBodyL);

        const popupLabels = Activity.translatePopupLabels(lang);

        document.getElementById("answer-review").innerHTML = table.join('');
        document.getElementById("popupDialogAns").style.display = "block";

        document.getElementById("scoreTextQ1").innerText = popupLabels.scored(correctCount, totalQues);
    }

    const closePopUp = () => {
        document.getElementById("popupDialogAns").style.display = "none";
    }

    const is_Audio_available = (src) => {

        if (!src && src == '') return;

        Helper.setAudio(Activity.pathToCWD() + src);

        const containerSelector = Define.get('questionContainer');
        const parent = document.querySelector(containerSelector);

        const audio_playBtns = parent.querySelectorAll('.common_playBtn');
        const audio_pauseBtn = parent.querySelector('.common_pauseBtn');

        audio_playBtns.forEach(btn => {
            btn.addEventListener('click', Helper.playAudio);
        });

        audio_pauseBtn.addEventListener('click', Helper.stopAudio);
    }

    return {
        render: render
    };

})();

const DragAndDrop = (() => {

    Activity.css('dnd.css');

    const containerId = 'dragItemsQ1';
    const containerSelector = '#question1';

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                <div class="container">
                                    <div class="rowWithAudios">
                                        <p class="questLine"> 
                                            <span class="${Define.get('head')}"></span> 
                                            <span class="hindTrans ${Define.get('subHead')}"></span>
                                        </p>
                                        <div class="playsBtns">
                                            <svg fill="currentColor" id="playSvg" class="bi bi-play-fill btnSounds" viewBox="0 0 16 16">
                                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                                            </svg>
                                            <svg fill="currentColor" id="pauseSvg" class="bi bi-pause btnSounds" viewBox="0 0 16 16">
                                                <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div id="question1" class="question-block">
                                        <div class="dragItems" id="${containerId}"></div>
                                        <div class="dropItems"></div>
                                        <div class="buttons machiNgs">
                                            <button class="submit-btn">${buttonLabel.check}</button>
                                            <button class="show-btn">${buttonLabel.show}</button>
                                            <button class="reset-btn">${buttonLabel.try}</button>
                                        </div>
                                    </div>
                                </div>`;
            // ..       

            const checkBtn = parent.querySelector('.submit-btn');
            const showBtn = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');
            const playSvg = parent.querySelector('#playSvg');
            const pauseSvg = parent.querySelector('#pauseSvg');

            if (checkBtn) checkBtn.addEventListener("click", checkAnswersDnd);
            if (showBtn) showBtn.addEventListener("click", showAnswersDnd);
            if (resetBtn) resetBtn.addEventListener("click", resetActivityDnd);

            if (playSvg) playSvg.addEventListener("click", () => toggleAudio(true));
            if (pauseSvg) pauseSvg.addEventListener("click", () => toggleAudio(false));
        } catch (e) {
            console.error('DragAndDrop.ui :', e);
        }
    }

    const renderDataDND = (questionId) => {
        try {
            ui(questionId);
            const data = Activity.getDefine(questionId);
            const content = data?.content || {};

            const hasAudio = content?.audio;
            if (!hasAudio) $('.playsBtns').remove();

            const headElem = Activity.setHeader(questionId);
            const audioBtnExists = document.contains(document.querySelector('.playsBtns'));
            if (!headElem.head && !headElem.subhead && !audioBtnExists) {
                document.querySelector('.rowWithAudios').remove();
            }

            const dragItems = document.getElementById(containerId);
            dragItems.dataset.qid = questionId;

            const isShuffle = content?.shuffle ?? true;

            const head = ['<div class="row w-100 justify-content-center">'];
            const headings = (isShuffle == true) ? Activity.shuffleArray(content?.heading) : content?.heading;

            const defaultCol = {
                md: 4,
                sm: 6,
                om: 12
            };
            const col = {
                md: content?.col?.md ?? defaultCol.md,
                sm: content?.col?.sm ?? defaultCol.sm,
                om: content?.col?.om ?? defaultCol.om
            };

            headings.forEach((item) => {
                const html = `<div class="col-md-${col.md} col-sm-${col.sm} col-${col.om}">
                                <div class="wh1">
                                    ${(item.text != '' && item.text) ? `<div class="headingsDND">${item.text}</div>` : ''}
                                    <div class="dropSect" data-accept="${item.accept}"></div> 
                                </div>
                            </div>`;
                // ..
                head.push(html);
            });
            head.push('</div>');
            $('.dropItems').html(head.join(''));

            const opt = [];
            const options = (isShuffle == true) ? Activity.shuffleArray(data?.content?.options) : data?.content?.options;
            options.forEach((item) => {
                let imgHtml = '';
                if (item.images && Array.isArray(item.images)) {
                    item.images.forEach(img => {
                        const width = img.width || '50px';
                        imgHtml += `<img src="${Activity.pathToCWD()}${img.path}" style="width:${width};" ondragstart="return false;">`;
                    });
                }
                const html = `<div class="wordDrag" data-ans="${item.ans}" data-id="${item.id}">${imgHtml}${item.text}</div>`;
                opt.push(html);
            });
            dragItems.innerHTML = opt.join('');

            makeDraggable(`#${containerId} .wordDrag`);
            initDroppable(containerSelector);
        } catch (e) {
            console.error('DragAndDrop.renderDataDND :', e);
        }
    }

    const makeDraggable = (selector) => {
        try {
            $(selector).draggable({
                helper: "original",
                revert: "invalid",
                start: function () { $(this).addClass("dragging"); },
                stop: function () { $(this).removeClass("dragging"); }
            });

            $(selector).on("touchstart", function (e) {
                const touch = e.originalEvent.touches[0];
                const $this = $(this);
                $this.addClass("dragging");
                $this.data("touchOffsetX", touch.pageX - $this.offset().left);
                $this.data("touchOffsetY", touch.pageY - $this.offset().top);

                $(document).on("touchmove.drag", function (e) {
                    const moveTouch = e.originalEvent.touches[0];
                    $this.css({
                        position: "absolute",
                        left: moveTouch.pageX - $this.data("touchOffsetX"),
                        top: moveTouch.pageY - $this.data("touchOffsetY"),
                        zIndex: 9999
                    });
                });

                $(document).on("touchend.drag", function () {
                    $(document).off(".drag");
                    $this.removeClass("dragging");
                });
            });
        } catch (e) {
            console.error('DragAndDrop.makeDraggable :', e);
        }
    }

    const initDroppable = () => {
        try {
            $(`${containerSelector} .dropSect`).droppable({
                accept: ".wordDrag",
                drop: function (event, ui) {
                    const $dragged = ui.draggable;
                    $dragged
                        .removeClass("ui-draggable ui-draggable-handle dragging")
                        .css({ top: "auto", left: "auto", position: "relative" })
                        .draggable("disable");
                    // ..
                    $(this).append($dragged);
                }
            });
        } catch (e) {
            console.error('DragAndDrop.initDroppable :', e);
        }
    }

    const checkAnswersDnd = () => {
        try {
            let correct = 0;
            const dragItems = document.getElementById(containerId);
            const questionId = dragItems.dataset.qid;
            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const popupLabels = Activity.translatePopupLabels(lang);

            const total = $(`${containerSelector} .wordDrag`).length;

            $(`${containerSelector} .dropSect`).each(function () {
                const accept = $(this).attr('data-accept');
                const droppedItems = $(this).children('.wordDrag');
                droppedItems.each(function () {
                    let background = '#ffcdd2';
                    if ($(this).attr('data-ans') == accept) {
                        background = '#c8e6c9';
                        correct++;
                    }
                    $(this).css('background', background);
                });
            });

            Swal.fire({
                title: correct === total ? popupLabels.allCorrect : popupLabels.checkAnswers,
                text: popupLabels.scored(correct, total),
                icon: correct === total ? "success" : "info",
                confirmButtonText: popupLabels.ok
            });
        } catch (e) {
            console.error('DragAndDrop.checkAnswersDnd :', e);
        }
    }

    const showAnswersDnd = () => {
        try {
            Activity.toggleCheckBtn('.submit-btn', true);

            const dragItems = document.getElementById(containerId);
            const questionId = dragItems.dataset.qid;

            renderDataDND(dragItems.dataset.qid);

            $(`${containerSelector} .dropSect`).empty();
            const data = Activity.getDefine(questionId)?.content?.options;

            data.forEach((item) => {
                let imgHtml = '';
                if (item.images && Array.isArray(item.images)) {
                    item.images.forEach(img => {
                        const width = img.width || '50px';
                        imgHtml += `<img src="${Activity.pathToCWD()}${img.path}" style="width:${width};" ondragstart="return false;">`;
                    });
                }
                const $clone = $(`<div class="wordDrag">${imgHtml}${item.text}</div>`)
                    .css({ background: "#c8e6c9", position: "relative" })
                    .attr("data-ans", item.ans);
                $(`${containerSelector} .dropSect[data-accept='${item.ans}']`).append($clone);
            });
        } catch (e) {
            console.error('DragAndDrop.showAnswersDnd :', e);
        }
    }

    const resetActivityDnd = () => {
        try {
            Activity.toggleCheckBtn('.submit-btn', false);

            const dragItems = document.getElementById(containerId);
            renderDataDND(dragItems.dataset.qid);
            $(`${containerSelector} .dropSect`).empty();
            $(`${containerSelector} .wordDrag`);
        } catch (e) {
            console.error('DragAndDrop.resetActivityDnd :', e);
        }
    }

    const toggleAudio = (play = true) => {
        try {
            const dragItems = document.getElementById(containerId);
            const questionId = dragItems.dataset.qid;

            const src = Activity.getDefine(questionId)?.content?.audio;
            const audio = new Audio(src);
            if (play) {
                $("#playSvg").hide();
                $("#pauseSvg").show();
                audio.play();
            } else {
                $("#playSvg").show();
                $("#pauseSvg").hide();
                audio.pause();
            }
        } catch (e) {
            console.error('DragAndDrop.toggleAudio :', e);
        }
    }

    return {
        render: renderDataDND,
        toggleAudio,
        makeDraggable,
        initDroppable,
        showAnswersDnd,
        checkAnswersDnd,
        resetActivityDnd
    }

})();

const DragAndDropMulti = (() => {

    Activity.css('dnd.css');

    const containerId = 'dragItemsMulti';

    let shuffledQuestions;
    let DragEnabled = false;
    let userAns;
    let __singleQuesIndex = 0;

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            __singleQuesIndex = 0;

            const activity = Activity.getDefine(questionId) ?? {};
            const content = activity?.content ?? {};
            const lang = activity.lang ?? 'en';
            const singleQuestionMode = content?.singleQuestionMode ?? false;

            const buttonLabel = Activity.translateButtonLabels(lang);

            const audio = content?.audio ?? false;
            const audioSrc = audio != false ? audio : '';

            parent.innerHTML = `<div class="question">
                                    <div class="container">
                                        ${audioSrc ?
                    `<div class="common_listening_container" id="listening_container">
                                                <div class="play-btn common_playBtn">
                                                    <div class="icon"></div>
                                                </div>
                                            </div>`: ''
                }
                                        <div id="question_header_container" ${(audioSrc || !activity.head) ? `style="display: none"` : ''}>
                                            <div class="qSections row g-0 mt-3 rowWithAudios">
                                                <div class="col font18 fontBold ${Define.get('head')} m-0"></div>
                                                ${audioSrc ?
                    `<div class="col-auto" id="listening_common_audio_container">
                                                        <svg id="" fill="currentColor" width="33" height="33" class="bi bi-play-circle-fill common_playBtn" viewBox="0 0 16 16" role="button">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                                                        </svg>
                                                        <svg id="" width="33" height="33" fill="currentColor" class="bi bi-pause-circle-fill common_pauseBtn" viewBox="0 0 16 16" role="button">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
                                                        </svg>
                                                    </div>`: ''
                }
                                            </div>
                                        </div>
                                        <div id='question-container-box' ${audioSrc ? `style="display: none"` : ''}>
                                            <div class="mcq-context p-1"></div>
                                            <div class="question-block position-relative">
                                                <div class="dragItems drag-container2" id="${containerId}" data-qid="${questionId}"></div>
                                                <div class="drag-question-box2 mt-3"></div>
                                            </div>
                                            ${!singleQuestionMode ? `
                                                    <div class="buttons machiNgs">
                                                        <button class="submit-btn disable" id="submit2">${buttonLabel.check}</button>
                                                        <button class="show-btn" id="showAns2">${buttonLabel.show}</button>
                                                        <button class="reset-btn">${buttonLabel.try}</button>
                                                    </div>
                                                ` : ''
                }
                                        </div>
                                    </div>
                                </div>
                                <div id="popupDialogAns">
                                    <div class="baseMod">
                                        <div class="answerdiv">
                                            <div class="d-flex justify-content-between align-items-center mb-3">
                                                <h4 id="scoreTextQ1" class="text-center mb-3"></h4>
                                                <button class="btn btn-secondary popUp-close-btn">X</button>
                                            </div>
                                            <div id="answer-review"></div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            const submitBtn = parent.querySelector('.submit-btn');
            const showBtn = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');
            const popUpCloseBtn = parent.querySelector('.popUp-close-btn');

            if (submitBtn) submitBtn.addEventListener("click", showPopUp);
            if (showBtn) showBtn.addEventListener("click", showDropAnswers);
            if (resetBtn) resetBtn.addEventListener("click", resetDropBox);
            if (popUpCloseBtn) popUpCloseBtn.addEventListener("click", closePopUp);

            is_Audio_available(audioSrc);

        } catch (e) {
            console.error('DragAndDropMulti.ui :', e);
        }
    }

    const showPopUp = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity?.lang ?? 'en';
        const questions = activity?.content?.questions ?? [];
        const headLabels = Activity.translateTableHeads(lang);

        const strictMatch = activity?.content?.strictMatch;
        const option_side = activity?.content?.option_side ?? 'top';

        const type_set = activity?.content?.set ?? {};
        const hasTypeSet = Object.keys(type_set).length > 0;

        let correctCount = 0;
        let totalQues = questions.length;
        const table = [];

        const tableBodyF = `<div class="table-responsive p-2">
                            <table class="table table-bordered" style="font-size:20px">
                                <thead class="text-light" style="white-space: nowrap;">
                                    <tr>
                                        <th>${headLabels.sequence}</th>
                                        <th>${headLabels.attempted}</th>
                                        <th>${headLabels.correct}</th>
                                        <th>${headLabels.result}</th>
                                    </tr>
                                </thead>
                            <tbody>`;
        // ..
        table.push(tableBodyF);

        if (hasTypeSet) {
            totalQues = type_set?.answers.length || 0;
            const compareAnswerArrays = (correctAns = [], userAns = []) => {
                const setUserAns = new Set(userAns);
                const missing = correctAns.filter(x => !setUserAns.has(x));

                const counts = userAns.reduce((acc, cur) => {
                    acc[cur] = (acc[cur] || 0) + 1;
                    return acc;
                }, {});
                const duplicates = Object.keys(counts).filter(k => counts[k] > 1);

                const setCorrectAns = new Set(correctAns);
                const extras = userAns.filter(x => !setCorrectAns.has(x));

                const ok = missing.length === 0 && duplicates.length === 0;

                userAns.map((ans, key) => {
                    let isCorrect = false;
                    if (setCorrectAns.has(ans)) {
                        isCorrect = true;
                        correctCount++;
                    }

                    const body = `
                        <tr clsss='trData'>
                            <th>(${Activity.translateBulletLabels({ lang: lang, key: key })})</th>
                            <td class="${isCorrect ? 'text-success' : 'text-danger'}">${ans.toString()}</td>
                            <td></td>
                            <td class="${isCorrect ? 'text-success' : 'text-danger'} ">${isCorrect ? '✔' : '✘'}</td>
                        </tr>
                    `;
                    table.push(body);
                });

                return { ok, missing, duplicates, extras };
            }
            compareAnswerArrays(type_set?.answers, userAns)
        } else {
            shuffledQuestions.forEach((item, i) => {
                const userAnswer = userAns[i];
                let count = 0;
                let isCorrect = false;

                let correctAnswerText = item.options;
                if (option_side == 'right') {
                    correctAnswerText = item.options[item.answer] ?? '';
                }

                if (strictMatch) {
                    isCorrect = userAnswer.toString() === correctAnswerText.toString();
                    if (isCorrect) {
                        count++;
                        correctCount++;
                    }
                } else {
                    let remaining = [...correctAnswerText];
                    let match = undefined;
                    if (option_side == 'right') {
                        remaining = [correctAnswerText];
                        match = userAnswer.map(userWord => {
                            const match = userWord === remaining[0];
                            return match;
                        });
                    } else {
                        match = userAnswer.map(userWord => {
                            const id = remaining.indexOf(userWord);
                            const match = id !== -1;
                            if (match) remaining.splice(id, 1);
                            return match;
                        });
                    }

                    match.map((item) => {
                        if (item == true) {
                            count++;
                        }
                        const ansLen = option_side == "right" ? remaining.length : correctAnswerText.length;
                        if (count == ansLen) {
                            isCorrect = true;
                            correctCount++;
                        }
                    });
                }

                const body = `
                    <tr clsss='trData'>
                        <th>(${Activity.translateBulletLabels({ lang: lang, ind: i })})</th>
                        <td class="${isCorrect ? 'text-success' : 'text-danger'}">${userAnswer.toString()}</td>
                        <td class="text-success">${correctAnswerText.toString()}</td>
                        <td class="${isCorrect ? 'text-success' : 'text-danger'} ">${isCorrect ? '✔' : '✘'}</td>
                    </tr>
                `;
                table.push(body);
            });
        }

        const tableBodyL = `</tbody></table></div>`;
        table.push(tableBodyL);

        document.getElementById("answer-review").innerHTML = table.join('');

        if (hasTypeSet) {
            document.querySelectorAll("tr").forEach(row => {
                const cells = row.querySelectorAll("th, td");
                if (cells.length >= 3) {
                    cells[2].remove();
                }
            });
        }

        document.getElementById("popupDialogAns").style.display = "block";

        const popupLabels = Activity.translatePopupLabels(lang);
        document.getElementById("scoreTextQ1").innerText = popupLabels.scored(correctCount, totalQues);
    }

    const closePopUp = () => {
        document.getElementById("popupDialogAns").style.display = "none";
    }

    const showDropAnswers = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) || {};
        const option_side = activity?.content?.option_side || 'top';

        const type_set = activity?.content?.set || {};
        const hasTypeSet = Object.keys(type_set).length > 0;

        $(`#submit2`).addClass('disable');
        DragEnabled = false;
        if (option_side == 'right') {
            shuffledQuestions.map((item, ind) => {
                $(`.dropBox_2`).eq(ind).html(item.options[item.answer]);
            });
        } else if (hasTypeSet) {
            type_set.answers.map((ans, ind) => {
                $(`.dropBox_2`).eq(ind).html(ans);
            });
        } else {
            for (let i = 0; i < $(`.dropBox_2`).length; i++) {
                $(`.dropBox_2`).eq(i).html($(`.dropBox_2`).eq(i).attr('data-ans'));
            }
        }
    }

    const resetDropBox = () => {
        $(`.dropBox_2`).html('');
        $(`#submit2`).addClass('disable');
        DragEnabled = true;
    }

    const canSingleQuestion = ({ content, ind, lang, questionItem } = {}) => {
        if (!content) return;

        const replacement = content?.replacement ?? '#_#';
        const questions = content?.questions ?? [];
        const option_side = content?.option_side ?? 'top';
        const isCol = typeof content?.col == 'object' ? true : false;
        const singleQuestionMode = content?.singleQuestionMode ?? false;

        const defaultCol = {
            md: 4,
            sm: 6,
            col: 12
        };
        const col_size = {
            md: content?.col?.md ?? defaultCol.md,
            sm: content?.col?.sm ?? defaultCol.sm,
            col: content?.col?.col ?? defaultCol.col
        };

        const item = questionItem ?? questions[ind];

        const inputWidth = item?.inputWidth ?? '';
        const quesOptions = item?.options || [];

        let replacedText = item?.text;

        const questionHtml = [];
        const optionHtml = [];

        let index = 0;
        const replacementRegex = new RegExp(replacement, "g");

        replacedText = replacedText.replace(replacementRegex, () => {
            const ans = quesOptions[index++] || '';
            return `
                <div 
                    class="drop-Box dropBox_2 ui-droppable" 
                    data-ans="${ans}" 
                    style="width:${inputWidth};">
                </div>
            `;
        });

        const image = [];
        if (item.image != undefined) {
            const image_width = item.width ?? '200px';
            const img = `<img class="" style="width: ${image_width};" src="${Activity.pathToCWD()}${item.image}" ondragstart="return false;"></img>`
            image.push(img);
        }

        if (option_side == 'top' && singleQuestionMode) {
            const options = item?.options || [];
            const addOptions = Activity.shuffleArray(content?.addOptions || []) || [];
            const mergedOptions = Activity.shuffleArray([...new Set([...options, ...addOptions])] || []) || [];
            mergedOptions.forEach((item, ind) => {
                const html = drag_option_html(item, ind);
                optionHtml.push(html);
            });
            $('.drag-container2').html(optionHtml.join(''));
        }

        if (option_side == 'right') {
            const options = [];
            quesOptions.map((item, ind) => {
                options.push(drag_option_html(item, ind));
            });
            const html = `
                <div class="row g-0 my-3 align-items-center">
                    <div class="col-auto me-1">
                        (${Activity.translateBulletLabels({ lang: lang, ind: ind })})
                    </div>
                    <div class="col d-flex flex-wrap align-items-center question-container_2" data-queindex="${ind}">
                        ${image.join('')}
                        ${replacedText}
                        <div class="ms-3 d-flex">
                            ${options.join('')}
                        </div>
                    </div>
                </div>
            `;
            questionHtml.push(html);
        } else {
            if (isCol === false) {
                const imageSide = questions[ind]?.imageSide ?? 'left';

                const html = `
                    <div class="my-2 p-1">
                        <div class="row g-0 border rounded h-100 p-2">
                            <div class="col-auto me-1 d-flex align-items-center">
                                (${Activity.translateBulletLabels({ lang: lang, ind: ind })})
                            </div>
                            <div class="col question-container_2 d-flex flex-wrap align-items-center ${imageSide === 'right' ? 'flex-row-reverse' : ''}" style="gap: 5px" data-queindex="${ind}">
                                <div class='col-auto'>
                                    ${image.join('')}
                                </div>
                                <div class='col d-flex'>
                                    ${replacedText}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                questionHtml.push(html);
            } else {
                ind == 0 ? questionHtml.push('<div class="row g-0 my-3">') : false;

                replacedText = replacedText.replaceAll(',', '');

                console.log(col_size.md);

                const html = `
                    ${col_size && !singleQuestionMode ? `
                            <div class="my-2 col-${col_size.col} col-md-${col_size.md} col-sm-${col_size.sm} p-1">
                        ` : `
                            <div class="my-2 p-1">
                        `
                    }
                        <div class="d-flex h-100 border rounded p-2">
                            <div class="col-auto p-1 d-flex align-items-center me-1">
                                (${Activity.translateBulletLabels({ lang: lang, ind: ind })})
                            </div>
                            <div class="d-flex flex-column justify-content-between col question-container_2">
                                ${image.length ? `
                                        <div class="d-flex align-items-center h-100 ${!singleQuestionMode && col_size.md == 4 ? 'justify-content-center' : ''}">
                                            ${image.join('')}
                                        </div>
                                    ` : ''
                    }
                                <div class="row g-0 gap-4 my-3 ${!singleQuestionMode && col_size.md == 4 ? 'justify-content-center' : ''}" data-queindex="${ind}">
                                    ${replacedText}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                questionHtml.push(html);

                ind == questions.length ? questionHtml.push('</div>') : false;
            }
        }

        return {
            questionHtml,
            optionHtml
        }
    }

    const renderDataDND = (questionId) => {
        try {
            ui(questionId);
            const headElem = Activity.setHeader(questionId);

            if (!headElem.head) {
                const headerContainer = document.getElementById('question_header_container');
                if (headerContainer && !headerContainer.querySelector('.common_playBtn')) {
                    headerContainer.style.display = 'none';
                }
            }

            const data = Activity.getDefine(questionId);
            const lang = data?.lang ?? 'en';

            const dragItems = document.getElementById(containerId);
            dragItems.dataset.qid = questionId;

            const content = data?.content ?? {};
            const text = content?.text ?? {};
            const img = content?.img ?? {};

            const mcqContextContainer = $('.mcq-context');
            mcqContextContainer.empty();

            const hasText = text && Object.keys(text).length > 0;
            const hasImg = img && Object.keys(img).length > 0;

            if (!hasText && !hasImg) mcqContextContainer.remove();

            if (hasText || hasImg) {
                const textDiv = $('<div class="mcq-text"></div>');
                const imgDiv = $('<div class="mcq-image"><img ondragstart="return false;"/></div>');

                mcqContextContainer.addClass('row g-0');

                const preferredSide = (hasText && text?.side) ? text.side : (hasImg && img?.side) ? img.side : 'top';
                const side = String(preferredSide).toLowerCase();

                const commonClassText = 'col-7';
                const commonClassImg = 'col-5 text-center';

                if (hasText) {
                    mcqContextContainer.append(textDiv);
                    const mcq_txt_class = hasImg ? `${commonClassText}` : 'col';
                    textDiv.addClass(mcq_txt_class).html(text.text || '');
                }

                if (hasImg) {
                    const imageclass = img?.imageclass ?? '';
                    mcqContextContainer.append(imgDiv);
                    const mcq_img_cont_class = hasText
                        ? commonClassImg
                        : `col ${imageclass}`;
                    // ..

                    const image_width = img.width ?? '40%';

                    imgDiv.addClass(mcq_img_cont_class)
                        .find('img')
                        .attr('src', Activity.pathToCWD() + img.path)
                        .css({ 'border-radius': '20px', 'width': image_width });
                }

                if (side === 'left' || side === 'right') {
                    mcqContextContainer.css('flex-direction', 'row');
                    if (side === 'left') {
                        textDiv.css('order', 1);
                        imgDiv.css('order', 2);
                        textDiv.removeClass('text-end').addClass('text-start');
                    } else {
                        textDiv.css('order', 2);
                        imgDiv.css('order', 1);
                        textDiv.removeClass('text-end').addClass('text-start');
                    }
                } else if (side === 'top' || side === 'bottom') {
                    mcqContextContainer.css('flex-direction', 'column');
                    if (side === 'top') {
                        textDiv.css('order', 1);
                        imgDiv.css('order', 2);
                    } else {
                        textDiv.css('order', 2);
                        imgDiv.css('order', 1);
                    }
                    textDiv.removeClass('col-7').addClass('col-12 my-1');
                    imgDiv.removeClass('col-5').addClass('col-12 my-1 text-center');
                } else {
                    mcqContextContainer.css('flex-direction', 'row');
                    textDiv.css('order', 1);
                    imgDiv.css('order', 2);
                }
            }
            const option_side = content?.option_side ?? 'top';
            const type_set = content?.set ?? {};
            const hasTypeSet = Object.keys(type_set).length > 0;
            const isShuffle = content?.shuffle ?? true;
            const singleQuestionMode = content?.singleQuestionMode ?? false;

            const questions_temp = content?.questions ?? [];

            const optionHtml = [];
            const questions = isShuffle == true ? Activity.shuffleArray(questions_temp) || [] : questions_temp;

            if (option_side == 'top' && !hasTypeSet && !singleQuestionMode) {
                const options = Activity.shuffleArray(questions || [])?.flatMap(obj => obj.options) || [];
                const addOptions = Activity.shuffleArray(content?.addOptions || []) || [];
                const mergedOptions = Activity.shuffleArray([...new Set([...options, ...addOptions])] || []) || [];
                mergedOptions.forEach((item, ind) => {
                    const html = drag_option_html(item, ind);
                    optionHtml.push(html);
                });
                $('.drag-container2').html(optionHtml.join(''));
            }

            if (hasTypeSet) {
                const options = Activity.shuffleArray(type_set?.options || []) || [];
                const uniqueOptions = [...new Set(options)];
                uniqueOptions.forEach((item, ind) => {
                    const html = drag_option_html(item, ind);
                    optionHtml.push(html);
                });
                $('.drag-container2').html(optionHtml.join(''));
            }

            const questionHtml = [];
            if (hasTypeSet) {
                type_set?.answers.map((item, ind) => {
                    const html = `
                        <div class="row g-0 my-3">
                            <div class="col-auto me-2">
                                (${Activity.translateBulletLabels({ lang: lang, ind: ind })})
                            </div>
                            <div class="col question-container_2 d-flex flex-wrap align-items-center" style="gap: 5px" data-queindex="${ind}">
                                <div class="drop-Box dropBox_2 ui-droppable"></div>
                            </div>
                        </div>
                    `;
                    questionHtml.push(html);
                });
            } else {
                shuffledQuestions = questions;
                if (!singleQuestionMode) {
                    questions.forEach((item, ind) => {
                        const view = canSingleQuestion({
                            questionItem: item,
                            content: content,
                            ind: ind,
                            lang: lang
                        }).questionHtml.join('');

                        questionHtml.push(view);
                    });
                } else {
                    const view = canSingleQuestion({
                        content: content,
                        ind: __singleQuesIndex,
                        lang: lang
                    }).questionHtml.join('');

                    questionHtml.push(view);

                    if (questions.length == 1) return;

                    const toggleBtnContainer = document.querySelector('#question-container-box');
                    if (!toggleBtnContainer) return;

                    const toggleBtnsLabel = Activity.translateNextPrevLabel(lang);
                    const buttonLabel = Activity.translateButtonLabels(lang);

                    const toggleBtns = `
                        <div id="toggleQuestions" class="row g-0">
                            <div class="col text-start">
                                <button id="previousBtn" class="btn btn-outline-primary rounded m-1" disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                    </svg>
                                    ${toggleBtnsLabel.prev}
                                </button>
                                <button id="nextBtn" class="btn btn-outline-primary rounded m-1" disabled>
                                    ${toggleBtnsLabel.next}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="col-auto text-end">
                                <button id="showBtn" class="btn btn-outline-success rounded m-1">
                                    ${buttonLabel.submit}
                                </button>
                            </div>
                        </div>
                    `;
                    // ..

                    toggleBtnContainer.insertAdjacentHTML('beforebegin', toggleBtns);

                    const toggleQuestionsContainer = document.querySelector('#toggleQuestions');
                    if (!toggleQuestionsContainer) return;

                    const __toggleBtns = getToggleBtns();

                    const previousBtn = __toggleBtns.prev;
                    const nextBtn = __toggleBtns.next;
                    const showBtn = __toggleBtns.show;

                    if (previousBtn) previousBtn.addEventListener('click', __previousQuestion);
                    if (showBtn) showBtn.addEventListener('click', __showAnswerPopupSingleType);
                    if (nextBtn) {
                        nextBtn.addEventListener('click', __nextQuestion);
                        nextBtn.disabled = false;
                    }

                }
            }
            $('.drag-question-box2').html(questionHtml.join(''));

            userAns = Array(questions.length).fill([]);

            makeDraggable(`.wordDrag`);
            initDroppable('.dropBox_2');
            DragEnabled = true;
        } catch (e) {
            console.error('DragAndDropMulti.renderDataDND :', e);
        }
    }

    const __getQuestionData = () => {
        const questionId = Activity.getQid('#' + containerId);
        const data = Activity.getDefine(questionId);
        const lang = data?.lang ?? 'en';
        const content = data?.content ?? {};
        const questions = content?.questions ?? [];

        return {
            lang: lang,
            content: content,
            questions: questions
        }
    }

    const __setGetUserAttemptedAns = () => {
        userAns[__singleQuesIndex]?.forEach((ans, ind) => {
            $('.drop-Box.dropBox_2').eq(ind).attr('data-val', ans).html(ans);
        });
    }

    const __renderSingleQuesWithDataOnChange = () => {
        const data = __getQuestionData();

        const questionView = canSingleQuestion({
            content: data.content,
            ind: __singleQuesIndex,
            lang: data.lang
        }).questionHtml.join('');

        $('.drag-question-box2').html(questionView);

        makeDraggable(`.wordDrag`);
        initDroppable('.dropBox_2');
        DragEnabled = true;

        __setGetUserAttemptedAns();
    }

    const __previousQuestion = () => {
        const btns = getToggleBtns();
        const prev = btns.prev;
        const next = btns.next;

        if (!prev || !next) return;

        next.disabled = false;

        if (prev.disabled) return;

        __singleQuesIndex--;

        prev.disabled = __singleQuesIndex == 0;

        __renderSingleQuesWithDataOnChange();
    };

    const __nextQuestion = () => {
        const btns = getToggleBtns();
        const prev = btns.prev;
        const next = btns.next;

        if (!prev || !next) return;

        prev.disabled = false;

        const data = __getQuestionData();

        const hasQuestion = __singleQuesIndex < data.questions.length;

        if (!hasQuestion) {
            next.disabled = true;
            return;
        }

        if (next.disabled) return;

        __singleQuesIndex++;

        next.disabled = __singleQuesIndex == data.questions.length - 1;

        __renderSingleQuesWithDataOnChange();
    };

    const getToggleBtns = () => {

        const toggleQuestionsContainer = document.querySelector('#toggleQuestions');
        if (!toggleQuestionsContainer) {
            return {
                prev: null,
                next: null,
                show: null
            }
        };

        const previousBtn = toggleQuestionsContainer.querySelector('#previousBtn');
        const nextBtn = toggleQuestionsContainer.querySelector('#nextBtn');
        const showBtn = toggleQuestionsContainer.querySelector('#showBtn');

        return {
            prev: previousBtn,
            next: nextBtn,
            show: showBtn,
        }
    }

    const __showAnswerPopupSingleType = () => {

        if (!userAns.every(arr => arr.length > 0 && arr.every(v => v != null && v !== ""))) {
            console.log('Please attempt all questions');
            return;
        }

        const data = __getQuestionData();
        const lang = data?.lang ?? 'en';
        const questions = data?.questions ?? [];
        const strictMatch = data?.content?.strictMatch ?? false;
        const option_side = data?.content?.option_side ?? 'top';

        const tableHeadLabel = Activity.translateTableHeads(lang);
        let correctCount = 0;
        let totalQues = questions.length;
        const table = [];

        const tablePartStart = `
            <div class="table-responsive p-2">
            <table class="table table-bordered" style="font-size:20px">
                <thead class="text-light" style="white-space: nowrap;">
                    <tr>
                        <th>${tableHeadLabel.sequence}</th>
                        <th>${tableHeadLabel.attempted}</th>
                        <th>${tableHeadLabel.correct}</th>
                        <th>${tableHeadLabel.result}</th>
                    </tr>
                </thead>
            <tbody>
        `;
        // ..
        table.push(tablePartStart);

        questions.forEach((item, i) => {
            const userAnswer = userAns[i];
            let count = 0;
            let isCorrect = false;

            let correctAnswerText = item.options;
            if (option_side == 'right') {
                correctAnswerText = item.options[item.answer] ?? '';
            }

            if (strictMatch) {
                isCorrect = userAnswer.toString() === correctAnswerText.toString();
                if (isCorrect) {
                    count++;
                    correctCount++;
                }
            } else {
                let remaining = [...correctAnswerText];
                let match = undefined;
                if (option_side == 'right') {
                    remaining = [correctAnswerText];
                    match = userAnswer.map(userWord => {
                        const match = userWord === remaining[0];
                        return match;
                    });
                } else {
                    match = userAnswer.map(userWord => {
                        const id = remaining.indexOf(userWord);
                        const match = id !== -1;
                        if (match) remaining.splice(id, 1);
                        return match;
                    });
                }

                match.map((item) => {
                    if (item == true) {
                        count++;
                    }
                    const ansLen = option_side == "right" ? remaining.length : correctAnswerText.length;
                    if (count == ansLen) {
                        isCorrect = true;
                        correctCount++;
                    }
                });
            }

            const body = `
                <tr clsss='trData'>
                    <th>(${Activity.translateBulletLabels({ lang: lang, ind: i })})</th>
                    <td class="${isCorrect ? 'text-success' : 'text-danger'}">${userAnswer.toString()}</td>
                    <td class="text-success">${correctAnswerText.toString()}</td>
                    <td class="${isCorrect ? 'text-success' : 'text-danger'} ">${isCorrect ? '✔' : '✘'}</td>
                </tr>
            `;
            table.push(body);
        });

        const tablePartEnd = `</tbody></table></div>`;
        table.push(tablePartEnd);

        const popupLabels = Activity.translatePopupLabels(lang);

        document.getElementById("answer-review").innerHTML = table.join('');
        document.getElementById("popupDialogAns").style.display = "block";

        document.getElementById("scoreTextQ1").innerText = popupLabels.scored(correctCount, totalQues);
    }

    const drag_option_html = (item, ind) => `<div class="drag_${ind} wordDrag font17" data-text="${item}" data-ans="${item}">${item}</div>`;

    const makeDraggable = (selector) => {
        try {
            $(selector).draggable({
                revert: true,
                containment: '.container-sub',
                start: function () {
                    if (!DragEnabled) {
                        return false;
                    }
                }
            });
        } catch (e) {
            console.error('DragAndDropMulti.makeDraggable :', e);
        }
    }

    const initDroppable = (selector) => {
        try {
            $(selector).droppable({
                revert: true,
                drop: function (event, ui) {
                    const dragVal = ui.draggable.attr('data-ans');
                    $(this).html(dragVal).attr('data-val', `${dragVal}`);
                    const index = $(this).parent().attr('data-queindex');
                    const qID = $(`#${containerId}`).attr('data-qid');

                    const activity = Activity.getDefine(qID) ?? {};
                    const hasCol = typeof activity?.content?.col === 'object' ? true : false;

                    if (Array.isArray(userAns[index])) {
                        const totalDropBox = (hasCol === true)
                            ? $(this).parent().children()
                            : $(`.question-container_2`).eq(index).children(selector);
                        // ..

                        const tempArr = [];
                        for (let i = 0; i < totalDropBox.length; i++) {
                            if ($(totalDropBox).eq(i).attr('data-val') != "") {
                                tempArr.push($(totalDropBox).eq(i).attr('data-val'));
                            }
                        }
                        userAns[index] = tempArr;
                    } else {
                        userAns[index] = dragVal;
                    }

                    if (enableDragCheckSubmitBtn() == $(selector).length) {
                        $(`#submit2`).removeClass('disable');
                    }
                }
            });
        } catch (e) {
            console.error('DragAndDropMulti.initDroppable :', e);
        }
    }

    const enableDragCheckSubmitBtn = () => {
        let count = 0;
        for (let i = 0; i < $(`.dropBox_2`).length; i++) {
            if ($(`.dropBox_2`).eq(i).html() !== "") {
                count++;
            }
        }
        return count;
    }

    const is_Audio_available = (src) => {

        if (!src && src == '') return;

        Helper.setAudio(Activity.pathToCWD() + src);

        const containerSelector = Define.get('questionContainer');
        const parent = document.querySelector(containerSelector);

        const audio_playBtns = parent.querySelectorAll('.common_playBtn');
        const audio_pauseBtn = parent.querySelector('.common_pauseBtn');

        audio_playBtns.forEach(btn => {
            btn.addEventListener('click', Helper.playAudio);
        });

        audio_pauseBtn.addEventListener('click', Helper.pauseAudio);
    }

    return {
        render: renderDataDND,
    }

})();

const Sorting = (() => {

    const containerId = 'sorting-container';

    const sequenceClass = 'sort-options';
    const quesHeadingClass = 'sort-ques-heading';

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container contAdapt shadow-lg" id="${containerId}">
                                        <div class="questionHeadingMCQ ${Define.get('head')}"></div>
                                        <div class="question-card justify-content-center animate__animated animate__fadeInDown animate__bounceInLeft" id="quizContainerAdaptiv">
                                            <ul id="dragOptions" class="${sequenceClass}"></ul>
                                        </div>
                                        <div class="buttons machiNgs">
                                            <button class="submit-btn" id="submit2">${buttonLabel.check}</button>
                                            <button class="show-btn" id="showAns2">${buttonLabel.show}</button>
                                            <button class="reset-btn">${buttonLabel.try}</button>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            const submitBtn = parent.querySelector('.submit-btn');
            const showBtn = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');

            if (submitBtn) submitBtn.addEventListener("click", checkAnswer);
            if (showBtn) showBtn.addEventListener("click", showAnswer);
            if (resetBtn) resetBtn.addEventListener("click", tryAgain);
        } catch (e) {
            console.error('Sorting.ui :', e);
        }
    }

    const renderQuestion = (questionId) => {
        try {
            ui(questionId);
            Activity.setHeader(questionId);

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity?.lang ?? 'en';

            const dragContainer = document.getElementById(containerId);
            dragContainer.dataset.qid = questionId;

            const content = activity?.content ?? {};
            const quesHead = content?.question ?? '';
            const sequence = Activity.shuffleArray(content?.sequence ?? []) ?? [];

            renderSequence(sequence);

            $('.' + quesHeadingClass).html(quesHead);

            dragContainer.querySelectorAll(`.${sequenceClass} li`).forEach(li => {
                li.addEventListener("dragstart", () => li.classList.add("dragging"));
                li.addEventListener("dragend", () => li.classList.remove("dragging"));
            });

            const ul = dragContainer.querySelector('.' + sequenceClass);
            if (ul) ul.addEventListener("dragover", handleDragOver);

        } catch (e) {
            console.error('Sorting.renderQuestion :', e);
        }
    }

    const renderSequence = (seqArray, seqClass = '') => {
        try {
            const seqHtml = [];
            seqArray.map((item) => {
                const li = `<li draggable="true" data-text="${item}" class="ddg ${seqClass}">${item}</li>`;
                seqHtml.push(li);
            });

            $('.' + sequenceClass).html(seqHtml.join(''));
        } catch (e) {
            console.error('Sorting.renderSequence :', e);
        }
    }

    function handleDragOver(e) {
        try {
            e.preventDefault();
            const ul = e.currentTarget;
            const dragging = document.querySelector('.dragging');
            if (!dragging) return;
            const after = getDragAfterElement(ul, e.clientY);
            if (!after) ul.appendChild(dragging);
            else ul.insertBefore(dragging, after);
        } catch (err) {
            console.error(err);
        }
    }

    const getDragAfterElement = (container, y) => {
        const elements = [...container.querySelectorAll("li:not(.dragging)")];
        return elements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) return { offset, element: child };
            else return closest;
        }, { offset: -Infinity }).element;
    }

    const showAnswer = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) || {};
        const content = activity?.content ?? {};
        const sequence = content?.sequence ?? [];

        renderSequence(sequence, 'text-success border-success');

        const ul = document.querySelector('.' + sequenceClass);
        if (ul) ul.removeEventListener('dragover', handleDragOver);

        $(`.${sequenceClass} li`).map((i, item) => {
            $(item).on('dragstart', (e) => { e.preventDefault(); return false; })
        });

        $('.submit-btn').addClass('disable');
    }

    const tryAgain = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) || {};
        const content = activity?.content ?? {};
        const sequence = Activity.shuffleArray(content?.sequence ?? []) ?? [];

        renderSequence(sequence);

        const ul = document.querySelector('.' + sequenceClass);
        if (ul) {
            ul.removeEventListener('dragover', handleDragOver);
            ul.addEventListener('dragover', handleDragOver);
        }

        $(`.${sequenceClass} li`).map((i, item) => {
            $(item).on('dragstart', (e) => { });
        });

        document.querySelectorAll(`.${sequenceClass} li`).forEach(li => {
            li.addEventListener("dragstart", () => li.classList.add("dragging"));
            li.addEventListener("dragend", () => li.classList.remove("dragging"));
        });

        $('.submit-btn').removeClass('disable');
    }

    const checkAnswer = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) || {};
        const content = activity?.content ?? {};
        const lang = activity?.lang || 'en';
        const sequence = content?.sequence ?? [];
        const popupLabels = Activity.translatePopupLabels(lang);

        const attempt = [];
        [...$(`.${sequenceClass} li`)]?.map((item, ind) => {
            attempt.push(item.innerHTML);
        });

        if (sequence.toString() === attempt.toString()) {
            Swal.fire({
                title: popupLabels.excellent,
                icon: "success"
            });

            renderSequence(sequence, 'text-success border-success');
        } else {
            attempt?.map((item, ind) => {
                let dragClass = 'text-success border-success';
                if (sequence[ind] != item) {
                    dragClass = 'text-danger border-danger';
                }
                $('.ddg').eq(ind).addClass(dragClass);
            });

            Swal.fire({
                title: popupLabels.oops,
                icon: "error"
            });
        }
    }

    return {
        render: renderQuestion,
    }

})();

const Pdf = (() => {
    const containerId = 'pdf-container';

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container contAdapt py-0 shadow-lg" id="${containerId}">
                                        <div class="wrap">
                                            <div class="d-flex align-items-center justify-content-center p-1 gap-2 mt-2">
                                                <div class="col-2 text-center">
                                                    <button class="btn btn-sm btn-primary p-2" id="downloadBtn">⬇ Download</button>
                                                </div>
                                                <div class="col mx-auto d-flex align-items-center justify-content-center">
                                                    <button class="btn btn-sm btn-primary p-2" id="prevBtn">◀ Prev</button>
                                                    <input class="mx-1 border rounded-2" id="pageNum" type="number" value="0" min="1" autocomplete="off" style="width: 3rem;text-align: center;">
                                                    /
                                                    <span id="pageCount" class="mx-1">0</span>
                                                    <button class="btn btn-sm btn-primary p-2" id="nextBtn">Next ▶</button>
                                                </div>
                                                <div class="col-2 text-center">
                                                    <button class="btn btn-sm btn-primary p-2" id="zoomOutBtn">-</button>
                                                    <button class="btn btn-sm btn-primary p-2" id="zoomInBtn">+</button>
                                                    <button class="btn btn-sm btn-primary p-2" id="resetBtn">Reset</button>
                                                </div>
                                            </div>
                                            <div class="viewer overflow-auto d-flex align-items-center justify-content-center p-1">
                                                <canvas id="pdfCanvas" width="756" height="972" style="width: 756px; height: 972px;"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

        } catch (e) {
            console.error('Pdf.ui :', e);
        }
    };

    const toggle_loader = (show = true) => {
        try {
            $('.spinner-container').remove();
            $('.viewer').addClass('position-relative');
            const html = `<div class="spinner-container position-absolute top-0 end-0 start-0 bottom-0 bg-white opacity-75 z-3 d-flex align-items-start justify-content-center" style="border-radius:20px;padding-top:25vh;">
                            <div class="spinner-border text-primary" role="status"></div>
                        </div>`;
            // ..
            if (show) {
                $('.viewer').append(html);
            }
        } catch (err) {
            console.log('ERROR : Pdf.toggle_loader', err);
        }
    };

    const renderPdf = async (questionId) => {
        try {
            ui(questionId);

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity?.lang ?? 'en';
            const path = activity?.content?.pdf ? Activity.pathToCWD() + activity?.content?.pdf : '';

            if (!path) {
                console.warn('No PDF path found');
                return;
            }

            const downloadBtn = document.getElementById("downloadBtn");
            const downloadAllowed = activity?.content?.download;
            if (downloadBtn && downloadAllowed) {
                downloadBtn.onclick = () => {
                    const a = document.createElement("a");
                    a.href = path;
                    a.download = path;
                    a.click();
                };
            } else {
                downloadBtn.remove();
            }

            toggle_loader(true);
            await Define.get('loadScript')('js/pdf.js');
            await Define.get('loadScript')('js/pdf.worker.js');

            if (window.pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/pdf.worker.js';
            }

            const canvas = document.getElementById("pdfCanvas");
            const ctx = canvas.getContext("2d");
            const pageNumInput = document.getElementById("pageNum");
            const pageCountEl = document.getElementById("pageCount");

            let pdfDoc = null;
            let currentPage = 1;
            let scale = 1.2;
            let rotation = 0;

            const loadingTask = pdfjsLib.getDocument(path);
            loadingTask.onProgress = (data) => {
                if (data.total && data.loaded === data.total) toggle_loader(false);
            };

            try {
                pdfDoc = await loadingTask.promise;
                console.info('[OK] ', 'PDF loaded.');
            } catch (err) {
                console.info('[ERROR]', 'Failed to load PDF =>', err.message ?? err);
                return;
            }

            const togglePdfControls = (enabled) => {
                const ids = ['prevBtn', 'nextBtn', 'zoomInBtn', 'zoomOutBtn', 'resetBtn'];
                ids.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.disabled = !enabled;
                });
                if (pageNumInput) pageNumInput.disabled = !enabled;
            }

            const renderPage = async () => {
                toggle_loader(true);

                if (!pdfDoc) return;

                let currentRenderTask = null;
                let isRendering = false;

                if (currentRenderTask) {
                    try {
                        currentRenderTask.cancel();
                        await new Promise(r => setTimeout(r, 0));
                    } catch (e) { }
                    currentRenderTask = null;
                }

                togglePdfControls(false);
                isRendering = true;

                try {
                    const page = await pdfDoc.getPage(currentPage);
                    const viewport = page.getViewport({ scale, rotation });
                    const outputScale = window.devicePixelRatio || 1;
                    canvas.width = viewport.width * outputScale;
                    canvas.height = viewport.height * outputScale;
                    canvas.style.width = viewport.width + "px";
                    canvas.style.height = viewport.height + "px";
                    const transform = outputScale !== 1
                        ? [outputScale, 0, 0, outputScale, 0, 0]
                        : null;

                    await page.render({
                        canvasContext: ctx,
                        viewport,
                        transform
                    }).promise;

                    pageNumInput.value = currentPage;
                    toggle_loader(false);
                } catch (err) {
                    if (err && err.name === 'RenderingCancelledException') {
                        console.info('render cancelled');
                    } else {
                        console.error('Error rendering page:', err);
                    }
                } finally {
                    isRendering = false;
                    togglePdfControls(true);
                }
            }

            pageCountEl.textContent = pdfDoc ? `${pdfDoc.numPages}` : 0;
            await renderPage();

            document.getElementById("prevBtn").onclick = () => {
                if (currentPage <= 1) return;
                currentPage--; renderPage();
            };
            document.getElementById("nextBtn").onclick = () => {
                if (currentPage >= pdfDoc.numPages) return;
                currentPage++; renderPage();
            };
            pageNumInput.onchange = () => {
                let v = parseInt(pageNumInput.value) || 1;
                if (v < 1) v = 1;
                if (v > pdfDoc.numPages) v = pdfDoc.numPages;
                currentPage = v; renderPage();
            };
            document.getElementById("zoomInBtn").onclick = () => { scale *= 1.2; renderPage(); };
            document.getElementById("zoomOutBtn").onclick = () => { scale /= 1.2; renderPage(); };
            document.getElementById("resetBtn").onclick = () => { scale = 1.2; rotation = 0; renderPage(); };

        } catch (e) {
            toggle_loader(true);
            console.error('Pdf.renderPdf :', e);
        }
    };

    return { render: renderPdf }
})();

const Shabdkosh = (() => {
    Activity.css('shabdkosh.css');

    const containerId = 'shabdkosh-container';

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            parent.innerHTML = `<div class="question">
                                    <div class="containe" id="${containerId}">
                                        <div class="rowWithAudios font18 fontBold mx-4 mb-4 ${Define.get('head')}"></div>
                                        <div class="question-block mt-3">
                                            <div class="tab-containerz">
                                                <div class="tab-content mx-auto">
                                                    <div class="tab-buttons" id="tabButtons"></div>
                                                    <div class="content-bg" id="tabPanes"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            Activity.setHeader(questionId);

        } catch (e) {
            console.error('Shabdkosh.ui :', e);
        }
    };

    const renderQuestion = (questionId) => {
        try {
            ui(questionId);

            const activity = Activity.getDefine(questionId) ?? {};
            const content = activity?.content ?? [];
            const isShuffle = activity?.shuffle ?? true;
            const questions = isShuffle ? Activity.shuffleArray(content) : content;

            if (!Activity.setQid(`#${containerId}`, questionId)) return false;

            const tabs = [];
            questions.forEach((item, ind) => {

                if (!item.tabtitle || !item.id) return;

                const titleLower = item.tabtitle.toLowerCase();
                const tabTitle = titleLower.charAt(0).toUpperCase() + titleLower.slice(1).toLowerCase();
                const tab = `
                    <button class="tab-btn" data-id="${item.id}" data-title="${titleLower}">
                        ${tabTitle}
                    </button>
                `;
                tabs.push(tab);
            });
            const tabBtn = document.getElementById("tabButtons");
            if (tabBtn && tabs.length) tabBtn.innerHTML = tabs.join('');

            const tabBtns = document.querySelectorAll('#tabButtons button');
            tabBtns.forEach((item, ind) => {
                item.addEventListener('click', (e) => {
                    renderTabContent(e);
                    toggleTabActive(e);
                });
                if (ind === 0) {
                    item.click();
                }
            });

        } catch (e) {
            console.error('Shabdkosh.renderQuestion :', e);
        }
    };

    const renderTabContent = (thisObj) => {
        if (typeof thisObj != 'object' && typeof thisObj.target != 'object') {
            console.warn('[WARNING]', 'Invalid selector');
        }

        const id = thisObj.target.dataset.id;

        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity?.lang ?? 'en';
        const content = activity?.content ?? [];
        const tabitem = content.filter(x => x.id == id);

        const isTitles = tabitem[0]?.titles ? tabitem[0]?.titles.length > 0 : false;
        const titles = isTitles ? tabitem[0]?.titles : tabitem[0];

        if (!tabitem.length) {
            console.warn('[WARNING]', 'Invalid tab-id');
            return;
        }

        if (!tabitem[0]?.tabtitle || !tabitem[0]?.id) return;

        const titleLower = tabitem[0].tabtitle.toLowerCase();
        const tabTitle = titleLower.charAt(0).toUpperCase() + titleLower.slice(1).toLowerCase();

        const titlesHtml = [];
        let tabpanecontent = "";

        titlesHtml.push(`<div class='tab-pane active'> ${tabitem[0]?.tabtitle ? `<div class="over my-3"><b>${tabTitle}</b></div>` : ''}`);

        if (!isTitles) {
            tabpanecontent = `
                    ${titles?.meaning ? `<div class="meaning me-1"><b class="me-1 arth">${Activity.translateMeaningLabel(lang)} :</b>${titles.meaning}</div>` : ''}
                    ${titles?.sentence ?
                    `<div class="sentence-use">
                            <b class="sent-head">${Activity.translateSentenceLabel(lang)} -</b> 
                            ${titles?.sentence ?
                        titles?.sentence.replaceAll(titleLower, `<span class="blinking-underline sometextcolor">${titleLower}</span>`)
                        : ''
                    }
                        </div>` : ''
                }
                    ${titles?.image && titles?.image?.path ?
                    `<div class="img-box">
                            <img style="width:${titles?.image?.width ?? '40%'};" src="${Activity.pathToCWD() + titles?.image?.path}" class="photo animate__animated animate__bounceInRight" ondragstart="return false;">
                        </div>`
                    : ''
                }
                </div>
            `;
            titlesHtml.push(tabpanecontent);
        } else {
            titles.map((item) => {
                const labelName = item?.title;
                const labelText = item?.text;
                if (!labelName || !labelText) return;
                if (labelName.toLowerCase() == Activity.translateSentenceLabel(lang).toLocaleLowerCase()) {
                    tabpanecontent = `<div class="sentence-use">
                                        <b class="sent-head">${Activity.translateSentenceLabel(lang)} -</b> 
                                        ${item?.text ?
                            item?.text.replaceAll(titleLower, `<span class="blinking-underline sometextcolor">${titleLower}</span>`)
                            : ''
                        }
                                    </div>`
                } else {
                    tabpanecontent = `<div class="meaning me-1"><b class="me-1 arth">${labelName} :</b>${item.text}</div>`;
                }

                titlesHtml.push(tabpanecontent);

            });

            if (tabitem[0]?.image && tabitem[0]?.image?.path) {
                const image = `<div class="img-box">
                                    <img style="width:${tabitem[0]?.image?.width ?? '40%'};" src="${Activity.pathToCWD() + tabitem[0]?.image?.path}" class="photo animate__animated animate__bounceInRight" ondragstart="return false;">
                                </div>`
                titlesHtml.push(image);
            }
        }

        const tabPanes = document.getElementById("tabPanes");
        if (tabPanes) tabPanes.innerHTML = titlesHtml.join('');
    };

    const toggleTabActive = (thisObj) => {
        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        thisObj.target.classList.add("active");
    };

    return { render: renderQuestion }
})();

const Shrutlekh = (() => {

    Activity.css('shrutlekh.css');

    const containerId = 'shrutlekh-container';
    const responseAudioContId = 'response-audio-cont';
    const correctionBoxContId = 'correct-box-cont';
    const questionBtnContId = 'question-button';
    const textInputId = 'singleInput';
    const textInputParenId = 'singleSection';
    const correctionBoxSectionId = 'correctionSection';
    const correctWordHintId = 'correctWordDisplay';

    const tickIconPath = './images/right1.png';

    let questionIndex = 0;
    const currentAudio = new Audio();

    const audioBasePath = './audio/commonDictationSong/';
    const audioBundle = {
        clickBtn: { hi: `${audioBasePath}clickOnbtn-Hn.mp3`, en: `${audioBasePath}clickOnbtn.mp3` },
        clickNextBtn: { hi: `${audioBasePath}clickOnNextbtn-Hn.mp3`, en: `${audioBasePath}clickOnNextbtn.mp3` },
        box1: { hi: `${audioBasePath}correctInbox1-Hn.mp3`, en: `${audioBasePath}correctInbox1.mp3` },
        box2: { hi: `${audioBasePath}correctInbox2-Hn.mp3`, en: `${audioBasePath}correctInbox2.mp3` },
        box3: { hi: `${audioBasePath}correctInbox3-Hn.mp3`, en: `${audioBasePath}correctInbox3.mp3` },
        correct: { hi: `${audioBasePath}right_ans-Hn.mp3`, en: `${audioBasePath}right_ans.mp3` },
        incorrect: { hi: `${audioBasePath}wrong_ans-Hn.mp3`, en: `${audioBasePath}wrong_ans.mp3` },
        writeCorrectBelow: { hi: `${audioBasePath}secondAttemptStatement-Hn.mp3`, en: `${audioBasePath}secondAttemptStatement.mp3` }
    };
    const _constructAudio = () => {
        for (const key in audioBundle) {
            for (const lang in audioBundle[key]) {
                const audio = new Audio();
                audio.src = audioBundle[key][lang];
                audioBundle[key][lang] = audio;
            }
        }
    };
    _constructAudio();

    const playAudio = async (key, lang = 'en') => {
        await pauseAllAudio();
        const audio = audioBundle[key]?.[lang];
        if (audio instanceof HTMLAudioElement) {
            try {
                await audio.play();
            } catch (err) {
                console.warn('audio play blocked:', err);
            }
        }
        return audio;
    };

    const pauseAllAudio = () => {
        return new Promise(resolve => {

            if (currentAudio) {
                currentAudio.currentTime = 0;
                currentAudio.pause();
            }

            for (const key in audioBundle) {
                for (const lang in audioBundle[key]) {
                    const audio = audioBundle[key][lang];
                    if (audio instanceof HTMLAudioElement) {
                        audio.currentTime = 0;
                        audio.pause();
                    }
                }
            }

            resolve();
        });
    };

    const ui = (questionId) => {
        try {

            pauseAllAudio();

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const btnLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="qq-Box" id="${containerId}">
                                        <div class="play-btn">
                                            <div class="icon"></div>
                                        </div>
                                    </div>
                                    <div class="shrutlekh">
                                        <div class="question-section">
                                            <div class="box-border">
                                                <div class="content-box">
                                                    <div id="${questionBtnContId}" class="number-buttons ui-keyboard-keyset ui-keyboard-keyset-normal"></div>
                                                </div>
                                                <div id="${textInputParenId}" class="input-single">
                                                    <input id="${textInputId}" class="word-input dictationInput hindiInput" autocomplete="off" />
                                                    <div class="machiz">
                                                        <button id="checkSingleBtn" class="submit-btn d-block">Check Answer</button>
                                                        <p id="message"></p>
                                                    </div>
                                                </div>
                                                <div id="${correctionBoxSectionId}" class="input-box correction">
                                                    <div class="correct-spell">
                                                        <span id="${correctWordHintId}"></span>
                                                    </div>
                                                    <div class="box-row row" id="${correctionBoxContId}"></div>
                                                    <div class="machiz">
                                                        <button id="checkPracticeBtn" class="submit-btn">${btnLabel.check}</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="${responseAudioContId}"></div>
                                        </div>
                                    </div>
                                </div>`;
            // ..
            Activity.setHeader(questionId);
            if (!Activity.setQid(`#${containerId}`, questionId)) return false;

            const playBtn = parent.querySelector('.play-btn');
            const checkBtn = parent.querySelector('#checkSingleBtn');
            const checkPracBtn = parent.querySelector('#checkPracticeBtn');

            if (playBtn) playBtn.addEventListener("click", openQuestions);
            if (checkBtn) checkBtn.addEventListener("click", checkAnswer);
            if (checkPracBtn) checkPracBtn.addEventListener("click", checkPracAnswer);
        } catch (err) {
            console.error('Shrutlekh.ui :', err);
        }
    };

    const openQuestions = () => {
        try {
            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
            const lang = activity?.lang ?? 'en';

            playAudio('clickBtn', lang);

            $('.qq-Box').hide();
            $('.question-section').show();

            renderWordButton();
        } catch (err) {
            console.log('Shrutlekh.openQuestions', err);
        }
    };

    const renderWordButton = () => {
        try {
            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
            const lang = activity?.lang ?? 'en';
            const content = activity?.content ?? {};
            const questions = content?.questions ?? [];
            const label = Activity.translateWordLabel(lang);

            if (questionIndex < questions.length) {
                const btn = `<div class="word-btn active" data-index="${questionIndex}">
                                ${label} ${Number(questionIndex + 1)}
                            </div>`;
                // ..
                $('#' + questionBtnContId).append(btn);
                $(`.word-btn[data-index='${questionIndex}']`)[0].addEventListener('click', playAudio_focusInput);
            }
        } catch (err) {
            console.log('Shrutlekh.renderWordButton', err);
        }
    };

    const toggleNextWord = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity?.lang ?? 'en';
        const content = activity?.content ?? {};
        const questions = content?.questions ?? [];

        questionIndex++;

        if (questionIndex != questions.length) {
            playAudio('clickNextBtn', lang);
            renderWordButton();
        }

        if ($('.word-btn.done').length == questionIndex && questions.length == questionIndex) {
            showFinalCongrats();
        }
    };

    const playAudio_focusInput = () => {
        try {
            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
            const lang = activity?.lang ?? 'en';
            const content = activity?.content ?? {};
            const questions = content?.questions ?? [];
            const curQues = questions[questionIndex] ?? {};

            if (!Object.keys(curQues).length) return;

            $('#' + textInputParenId).css('display', 'block');

            pauseAllAudio();

            if (currentAudio instanceof HTMLAudioElement) {
                currentAudio.src = Activity.pathToCWD() + curQues.audio;
                currentAudio.currentTime = 0;
                currentAudio.play();
            }

            if (lang == 'hi') {
                $.keyboard.layouts['hindi'] = Activity.hindiKeyboard();

                $('#' + textInputId)
                    .keyboard({
                        layout: 'hindi',
                        usePreview: false,
                        autoAccept: true,
                    })
                    .addTyping({ showTyping: true, delay: 70 })
                    .on('keydown', e => e.preventDefault());
            }

            $('#' + textInputId).focus().val('');

        } catch (err) {
            console.log('Shrutlekh.playAudio_focusInput', err);
        }
    };

    const checkAnswer = () => {
        try {
            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
            const content = activity?.content ?? {};
            const questions = content?.questions ?? [];
            const curQues = questions[questionIndex] ?? {};

            const userInput = $('#' + textInputId)[0].value.trim();
            if (userInput === curQues?.answer) correctPopUp();
            else wrongPopUp();
        } catch (err) {
            console.log('Shrutlekh.checkAnswer', err);
        }
    };

    const checkPracAnswer = async () => {
        try {
            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
            const lang = activity?.lang ?? 'en';
            const content = activity?.content ?? {};
            const questions = content?.questions ?? [];
            const curQues = questions[questionIndex] ?? {};
            const answer = curQues?.answer;

            let boxID;
            let boxInput;
            let correctCount = 0;
            $('.correction-input').each((ind, item) => {
                if (item.value == answer) {
                    correctCount++;
                    item.style.borderColor = 'green';
                } else {
                    item.style.borderColor = 'red';
                    boxID = `box${ind + 1}`;
                    boxInput = item;
                    return false;
                }
            });

            if ($('.correction-input').length == correctCount && correctCount > 1) {

                const correctAudio = await playAudio('correct', lang);
                const timeout = Math.round(correctAudio.duration * 1000);

                const popupLabels = Activity.translatePopupLabels(lang);

                Swal.fire({
                    icon: 'success',
                    title: popupLabels.great,
                    color: '#2e7d32',
                    timer: timeout,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                }).then((res) => {
                    if (res.isDismissed) {
                        $('#' + correctionBoxSectionId).css('display', 'none');
                        correctPopUp({ skipAlert: true });
                    }
                });

            } else {
                const boxAudio = await playAudio(boxID, lang);
                const duration = boxAudio instanceof HTMLAudioElement ? boxAudio.duration : 2;
                const timeout = Math.round(duration * 1000);
                const popupLabels = Activity.translatePopupLabels(lang);

                Swal.fire({
                    icon: 'error',
                    title: popupLabels.oops,
                    color: '#c62828',
                    timer: timeout,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                }).then((res) => {
                    if (res.isDismissed) {
                        boxInput.focus();
                    }
                });
            }

        } catch (err) {
            console.log('Shrutlekh.checkPracAnswer', err);
        }
    };

    const correctPopUp = async ({ skipAlert = false } = {}) => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity?.lang ?? 'en';
        const content = activity?.content ?? {};
        const questions = content?.questions ?? [];
        const curQues = questions[questionIndex] ?? {};

        const btnHtml = `${curQues?.answer}
                        <span class="right-icon">
                            <img src="${tickIconPath}" alt="correct" class="icon-img">
                        </span>`;
        // ..

        $(`.word-btn[data-index='${questionIndex}']`).addClass('done').html(btnHtml);
        $(`.word-btn[data-index='${questionIndex}']`)[0].removeEventListener('click', playAudio_focusInput);

        $('#' + textInputParenId)[0].style.display = "none";

        if (!skipAlert) {
            const correctAudio = await playAudio('correct', lang);
            const timeout = Math.round(correctAudio.duration) * 1000;
            const popupLabels = Activity.translatePopupLabels(lang);

            Swal.fire({
                icon: 'success',
                title: popupLabels.excellent,
                color: '#2e7d32',
                timer: timeout,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then((res) => {
                if (res.isDismissed) {
                    toggleNextWord();
                }
            });
        } else {
            toggleNextWord();
        }
    };

    const wrongPopUp = async () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity?.lang ?? 'en';
        const popupLabels = Activity.translatePopupLabels(lang);

        const incorrectAudio = await playAudio('incorrect', lang);

        const timeout = Math.round(incorrectAudio.duration) * 1000;
        Swal.fire({
            icon: "error",
            title: popupLabels.oops,
            html: `<small>${popupLabels.tryAgain}</small>`,
            timer: timeout,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        }).then((res) => {
            if (res.isDismissed) {
                renderCorrectionBox();
            }
        });
    };

    const showFinalCongrats = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity?.lang ?? 'en';
        const popupLabels = Activity.translatePopupLabels(lang);

        Swal.fire({
            icon: 'success',
            title: popupLabels.excellent,
            html: `<b>${popupLabels.allWordsCorrect}</b><br><small>${popupLabels.excellentPerformance}</small>`,
            confirmButtonText: popupLabels.playAgain,
            color: '#333',
            confirmButtonColor: '#3085d6',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        }).then((res) => {
            if (res.isConfirmed && res.value) {
                playAudio('clickBtn', lang);

                $('#' + questionBtnContId).html('');
                questionIndex = 0;
                renderWordButton();
            }
        });
    };

    const renderCorrectionBox = async () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity.lang ?? 'en';
        const content = activity?.content ?? {};
        const questions = content?.questions ?? [];
        const curQues = questions[questionIndex] ?? {};

        await playAudio('writeCorrectBelow', lang);

        const boxLabel = Activity.translateBoxLabel(lang);

        $('#' + textInputParenId).css('display', 'none').val('');
        $('#' + correctionBoxSectionId).css('display', 'block');

        $('#' + correctWordHintId).html(curQues?.answer);

        const box = [];
        for (let i = 1; i <= 3; i++) {
            const html = `<div class="col-sm-4">
                            <div class="box-wrap">
                                <label class="box-label">${boxLabel} ${i}</label>
                                <input id="box1" class="word-input correction-input dictationInput hindiInput" autocomplete="off" />
                            </div>
                        </div>`;
            // ..
            box.push(html);
        }
        $('#' + correctionBoxContId).html(box.join(''));

        if (lang == 'hi') {
            $.keyboard.layouts["hindi"] = Activity.hindiKeyboard();

            $('.correction-input')
                .keyboard({
                    layout: "hindi",
                    usePreview: false,
                    autoAccept: true,
                })
                .addTyping({ showTyping: true, delay: 70 })
                .on('keydown', e => e.preventDefault());
        }
    };

    return {
        render: ui
    }

})();

const WordSearch = (() => {

    Activity.css('wordSearch.css');

    const containerId = 'word-search-container';
    const puzzleTextId = 'puzzle-text';
    const puzzleAnsId = 'answer';
    const puzzleContId = 'puzzle';

    const color_blue = '#31cde2';

    let __grid;

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const que_side = activity?.config?.side ?? 'left';

            const isqueSection_mainHeading = activity?.config?.questionSection?.heading?.main?.text ?? 'Hints';

            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question word-searched">                                    
                                    <div class="container" id="${containerId}">
                                        <div class="${Define.get('head')}"></div>
                                        <div class="hints">${isqueSection_mainHeading}</div>
                                        <div class="divDisplay gap-3 justify-content-center ${que_side === 'top' || que_side === 'bottom' ? 'flex-column' : ''} ${que_side === 'bottom' ? 'flex-column-reverse' : que_side === 'right' ? 'flex-row-reverse' : ''}">
                                            <div id="${puzzleTextId}" class="text ${que_side === 'top' || que_side === 'bottom' ? 'w-100 d-flex justify-content-evenly flex-wrap' : ''}"></div>
                                            <div id="${puzzleContId}"></div>
                                        </div>
                                        <div class="machiNgs">
                                            <button class="submit-btn" id="c-check">${buttonLabel.check}</button>
                                            <button class="reset-btn">${buttonLabel.try}</button>
                                            <button class="show-btn">${buttonLabel.show}</button>
                                        </div>
                                        <div class="note" id="${puzzleAnsId}" style="display:none;"></div>
                                    </div>
                                </div>`;
            // ..

            const resetBtn = parent.querySelector('.reset-btn');
            const showBtn = parent.querySelector('.show-btn');
            const submitBtn = parent.querySelector('.submit-btn');

            if (resetBtn) resetBtn.addEventListener("click", clearGrid);
            if (showBtn) showBtn.addEventListener("click", showAnswer);
            if (submitBtn) submitBtn.addEventListener("click", checkAnswer);
        } catch (err) {
            console.error('WordSearch.ui :', err);
        }
    };

    const render = (questionId) => {
        try {
            ui(questionId);
            Activity.setHeader(questionId);

            if (!Activity.setQid(`#${containerId}`, questionId)) return false;

            const activity = Activity.getDefine(questionId);
            const isShuffle = activity?.config?.shuffle ?? true;
            const lang = activity?.lang ?? 'en';
            const content = isShuffle ? Activity.shuffleArray(activity?.content ?? []) ?? [] : activity?.content ?? [];
            const que_side = activity?.config?.side ?? 'left';

            const queSection = activity?.config?.questionSection;
            const queHeading = queSection?.heading

            const ques = { across: [], down: [] };

            content.map(item => {
                if (item.direction === 'h') ques.across.push(item);
                else ques.down.push(item);
            });

            const puzzle = [];
            const words = [];

            let col = undefined;

            if (queSection != undefined) {
                col = que_side === 'left' || que_side === 'right' ? Helper.defaultCol : activity?.config?.questionSection?.col;
                puzzle.push(`<div class='col-md-${col?.md} col-sm-${col?.sm} col-${col?.col}  ${queSection == undefined ? 'd-flex flex-wrap' : ''}'>`);
                if (ques?.across.length) puzzle.push(`<div class="hints">${queHeading?.vertical?.text ?? 'Across'}</div>`);
                ques?.across.map((item, index) => {
                    const html = `<div class="criss-item clues-text mb-1">
                                    ${index + 1}. ${renderQuestion(item)}
                                </div>`;
                    puzzle.push(html);
                });
                puzzle.push(`</div><div class='col-md-${col?.md} col-sm-${col?.sm} col-${col.col}'>`);

                if (ques?.down.length) puzzle.push(`<div class="hints">${queHeading?.horizontal?.text ?? 'Down'}</div>`);
                ques?.down.map((item, index) => {
                    const html = `<div class="criss-item clues-text mb-1">
                                    ${index + 1}. ${renderQuestion(item)}
                                </div>`;
                    puzzle.push(html);
                });
            } else {
                col = Helper.defaultCol;
                puzzle.push(`<div class='col-md-${col?.md} col-sm-${col?.sm} col-${col?.col}  ${queSection == undefined ? 'd-flex flex-wrap' : ''}'>`);
                content?.map((item, index) => {
                    let size = item?.colSize ?? Helper.defaultCol;
                    const html = `<div class="criss-item clues-text col-md-${size?.md} col-sm-${size?.sm} col-${size?.col} px-3 my-1 ${!item?.text ? `text-center` : ''}">
                                    ${item?.text ? `${index + 1}.` : ''} ${renderQuestion(item)}
                                </div>`;
                    puzzle.push(html);
                    words.push(`<div>${Number(index + 1)}. ${item.answer}</div>`);
                });
            }

            puzzle.push(`</div>`);

            $('#' + puzzleTextId).html(puzzle.join(''));
            $('#' + puzzleAnsId).html(words.join(''));

            renderGrid(content, lang);

        } catch (e) {
            console.error('WordSearch.render :', e);
        }
    }

    const renderGrid = () => {
        try {
            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
            const content = activity?.content ?? [];

            const words = content.filter(puz => puz?.answer).map(puz => puz.answer.toUpperCase());
            const longest = Math.max(...words.map(w => w.length));

            const maxRow = Math.max(...content.map(p => p.direction === 'h' ? p.row : p.row + (p.answer?.length || 0) - 1));
            const maxCol = Math.max(...content.map(p => p.direction === 'v' ? p.col : p.col + (p.answer?.length || 0) - 1));

            const size = Math.max(longest + 4, maxRow + 1);
            const gridCols = Math.min(maxCol + 1, size);

            const grid = Array.from({ length: size }, () => Array.from({ length: gridCols }, () => ''));

            const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            content.forEach(item => {
                const { row, col, answer, direction } = item;
                if (!answer || (direction !== 'h' && direction !== 'v')) return;

                const up = answer.toUpperCase();

                [...up].forEach((ch, i) => {
                    const r = direction === 'h' ? row : row + i;
                    const c = direction === 'h' ? col + i : col;
                    const cell = grid[r][c];
                    if (cell === '' || cell === ch) grid[r][c] = ch;
                });
            });


            const pool = alphabets.toUpperCase();
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < gridCols; c++) {
                    if (grid[r][c] === '') {
                        const rand = Math.floor(Math.random() * pool.length);
                        grid[r][c] = pool[rand];
                    }
                }
            }

            const gridHtml = ['<table>'];
            grid.forEach((rowArr, row) => {
                gridHtml.push('<tr>');
                rowArr.forEach((cell, col) => {
                    const data = `<td><input type="button" value="${cell}" data-row="${row}" data-col="${col}" data-selected="0"></td>`;
                    gridHtml.push(data);
                });
                gridHtml.push('</tr>');
            });
            gridHtml.push('</table>');

            const puzzleCont = document.getElementById(puzzleContId);
            puzzleCont.innerHTML = gridHtml.join('');

            puzzleCont.querySelectorAll('input[type="button"]').forEach(btn => {
                btn.addEventListener('click', selectCell);
            });

            __grid = grid.map(row => [...row]);

        } catch (err) {
            console.log('WordSearch.renderGrid', err);
        }
    }

    const selectCell = (e) => {
        const btn = e.currentTarget;

        if (btn.dataset.selected == 2) return;
        btn.dataset.selected = btn.dataset.selected == 0 ? 1 : 0;
        btn.style.background = btn.dataset.selected == 1 ? 'yellow' : color_blue;
    }

    const clearGrid = () => {

        document.querySelectorAll('input[type="button"]').forEach(btn => {
            btn.dataset.selected = 0;
            btn.style.color = 'black';
            btn.style.background = color_blue;
        });

        const checkBtn = document.getElementById('c-check');
        checkBtn.disabled = false;
        checkBtn.style.opacity = 1;
    }

    const showAnswer = () => {
        try {
            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
            const content = activity?.content ?? [];
            const puzzleCont = document.getElementById(puzzleContId);

            if (!puzzleCont) return;

            puzzleCont.querySelectorAll('input[type="button"]').forEach(btn => {
                btn.dataset.selected = 0;
                btn.style.background = color_blue;
                btn.style.color = 'black';
            });

            content.forEach(item => {
                const { row, col, answer, direction } = item;
                if (!answer || (direction !== 'h' && direction !== 'v')) return;

                const up = answer.toUpperCase();
                [...up].forEach((ch, i) => {
                    const r = direction === 'h' ? row : row + i;
                    const c = direction === 'h' ? col + i : col;

                    const selector = `input[type="button"][data-row="${r}"][data-col="${c}"]`;
                    const btn = puzzleCont.querySelector(selector);
                    if (!btn) return;

                    btn.dataset.selected = 1;
                    btn.style.background = 'green';
                    btn.style.color = 'white';
                });
            });

            const checkBtn = document.getElementById('c-check');
            if (checkBtn) {
                checkBtn.disabled = true;
                checkBtn.style.opacity = '0.5';
            }

        } catch (err) {
            console.error('WordSearch.showAnswer', err);
        }
    }

    const checkAnswer = () => {
        try {

            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
            const lang = activity?.lang ?? 'en';
            const content = activity?.content ?? [];

            const checkBtn = document.getElementById("c-check");

            const popupLabels = Activity.translatePopupLabels(lang);
            const selected = [...document.querySelectorAll('input[data-selected="1"]')];
            if (selected.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: popupLabels.chooseWord,
                    text: popupLabels.chooseWordFromBox,
                    confirmButtonText: popupLabels.ok,
                    confirmButtonColor: '#3085d6',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                });
                checkBtn.disabled = false;
                checkBtn.style.opacity = 1;
                return;
            }

            const matchedButtons = new Set();

            let correct = false;
            let correctCount = 0;
            const totalCount = content.length;

            content.forEach((item, index) => {
                let formed = '';
                let buttons = [];

                const { row, col, answer, direction } = item;
                if (!answer || (direction !== 'h' && direction !== 'v')) return;

                const up = answer.toUpperCase();
                [...up].forEach((ch, i) => {
                    const r = direction === 'h' ? row : row + i;
                    const c = direction === 'h' ? col + i : col;
                    const btn = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
                    if (btn) buttons.push(btn);
                    if (btn && btn.dataset.selected == 1) formed += btn.value;
                });

                if (formed === up) {
                    correct = true;
                    correctCount++;
                    buttons.forEach(btn => {
                        if (btn.dataset.selected == 1) {
                            btn.style.background = 'limegreen';
                            btn.style.color = 'white';
                            btn.dataset.selected = 2;
                            matchedButtons.add(btn);
                        }
                    });
                }
            });

            selected.forEach(btn => {
                if (!matchedButtons.has(btn)) {
                    btn.style.background = 'red';
                    btn.style.color = 'white';
                    btn.dataset.selected = 3;
                }
            });

            let complete = false;
            if (correctCount === totalCount) {
                complete = true;
                if (checkBtn) {
                    checkBtn.disabled = true;
                    checkBtn.style.opacity = '0.5';
                }
            }

            popup({ complete: complete, correct: correctCount, total: totalCount, lang: lang });

        } catch (err) {
            console.error('WordSearch.checkAnswer', err);
        }
    };

    const popup = ({ complete = false, correct = 0, total = 0, lang = 'en' } = {}) => {
        const popupLabels = Activity.translatePopupLabels(lang);
        const buttonLabels = Activity.translateButtonLabels(lang);

        if (complete) {
            Swal.fire({
                title: popupLabels.excellent,
                text: popupLabels.allCorrect,
                icon: 'success',
                confirmButtonText: buttonLabels.replay,
                confirmButtonColor: '#28a745',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then((res) => {
                if (res.isConfirmed) {
                    clearGrid();
                }
            });
        } else {
            Swal.fire({
                title: popupLabels.checkAnswers,
                html: popupLabels.scored(correct, total),
                icon: 'info',
                confirmButtonText: popupLabels.ok,
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then((res) => {
                if (res.isConfirmed) {
                    clearGrid();
                }
            });
        }
    }

    const renderQuestion = (question) => {

        let queTxt = undefined;

        const isText = question?.text ?? false;
        const isImage = question?.image ?? false;

        if (isText) {
            queTxt = question?.text;
        }

        if (isImage) {

            const image = question?.image ?? {};
            const width = question?.image?.width ?? '20%';

            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
            const replacement = activity?.config?.replacement ?? '#_#';

            if (image && image?.path) {
                let img = undefined;
                if (queTxt !== undefined) {
                    img = `<img src='${Activity.pathToCWD() + image?.path}' style='width: ${width};' />`
                    queTxt = queTxt.replace(replacement, img);
                } else {
                    img = `<img src='${Activity.pathToCWD() + image?.path}' style='width: ${width};' />`
                    queTxt = img;
                }
            }
        }

        return queTxt;
    }

    return {
        render
    }

})();

const TextArea = (() => {

    const containerId = 'text-area-container';
    const quesContId = 'question-container';

    let shuffledQuestions;

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const content = activity?.content ?? {};
            const lang = activity.lang ?? 'en';
            let showInput = content?.showInput ?? true;

            if (lang === 'en') {
                showInput = true;
            }

            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container" id="${containerId}">
                                        <h5 class="questionHeading mt-3 border-bottom pb-2 ${Define.get('head')}"></h5>
                                        <div class="mcq-context p-1"></div>
                                        <div id="short-answer-container" class="ps-1 pe-3">
                                            <div id="${quesContId}" class="mb-2" style="font-size: 20px;"></div>
                                        </div>
                                        <div class="text-center">
                                            <div class="buttons machiNgs">
                                                <button class="submit-btn ${!showInput ? 'd-none' : ''}">${buttonLabel.check}</button>
                                                <button class="show-btn">${!showInput ? 'उत्तर नमुना' : `${buttonLabel.show}`}</button>
                                                <button class="reset-btn ${!showInput ? 'd-none' : ''}" >${buttonLabel.try}</button>
                                            </div>
                                        </div>
                                        <div id="popupDialogAns">
                                            <div class="baseMod">
                                                <div class="answerdiv">                                                    
                                                    <div id="answerShowMCW"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            Activity.setHeader(questionId);

            const resetBtn = parent.querySelector('.reset-btn');
            const showBtn = parent.querySelector('.show-btn');
            const submitBtn = parent.querySelector('.submit-btn');

            if (resetBtn) resetBtn.addEventListener("click", resetAnswers);
            if (showBtn) showBtn.addEventListener("click", showAnswers);
            if (submitBtn) submitBtn.addEventListener("click", checkAnswers);
        } catch (err) {
            console.error('TextArea.ui :', err);
        }
    };

    const render = (questionId) => {
        try {
            ui(questionId);

            const activity = Activity.getDefine(questionId);
            const content = activity?.content ?? {};
            const text = content?.text ?? {};
            const img = content?.img ?? {};

            const mcqContextContainer = $('.mcq-context');
            mcqContextContainer.empty();

            const hasText = text && Object.keys(text).length > 0;
            const hasImg = img && Object.keys(img).length > 0;

            if (!hasText && !hasImg) mcqContextContainer.remove();

            if (hasText || hasImg) {
                const textDiv = $('<div class="mcq-text"></div>');
                const imgDiv = $('<div class="mcq-image"><img ondragstart="return false;"/></div>');

                mcqContextContainer.addClass('row g-0');

                const preferredSide = (hasText && text?.side) ? text.side : (hasImg && img?.side) ? img.side : 'top';
                const side = String(preferredSide).toLowerCase();

                const commonClassText = 'col-7';
                const commonClassImg = 'col-5 text-center';

                if (hasText) {
                    mcqContextContainer.append(textDiv);
                    const mcq_txt_class = hasImg ? `${commonClassText}` : 'col';
                    textDiv.addClass(mcq_txt_class).html(text.text || '');
                }

                if (hasImg) {
                    const imageclass = img?.imageclass ?? '';
                    mcqContextContainer.append(imgDiv);
                    const mcq_img_cont_class = hasText
                        ? commonClassImg
                        : `col ${imageclass}`;

                    const image_width = img.width ?? '40%';

                    imgDiv.addClass(mcq_img_cont_class)
                        .find('img')
                        .attr('src', Activity.pathToCWD() + img.path)
                        .css({ 'border-radius': '20px', 'width': image_width });
                }

                if (side === 'left' || side === 'right') {
                    mcqContextContainer.css('flex-direction', 'row');
                    if (side === 'left') {
                        textDiv.css('order', 1);
                        imgDiv.css('order', 2);
                        textDiv.removeClass('text-end').addClass('text-start');
                    } else {
                        textDiv.css('order', 2);
                        imgDiv.css('order', 1);
                        textDiv.removeClass('text-end').addClass('text-start');
                    }
                } else if (side === 'top' || side === 'bottom') {
                    mcqContextContainer.css('flex-direction', 'column');
                    if (side === 'top') {
                        textDiv.css('order', 1);
                        imgDiv.css('order', 2);
                    } else {
                        textDiv.css('order', 2);
                        imgDiv.css('order', 1);
                    }
                    textDiv.removeClass('col-7').addClass('col-12 my-1');
                    imgDiv.removeClass('col-5').addClass('col-12 my-1 text-center');
                } else {
                    mcqContextContainer.css('flex-direction', 'row');
                    textDiv.css('order', 1);
                    imgDiv.css('order', 2);
                }
            }

            if (!Activity.setQid(`#${containerId}`, questionId)) return false;

            const lang = activity?.lang ?? 'en';
            const replacement = content?.replacement ?? '#_#';
            let showInput = content?.showInput ?? true;

            if (lang === 'en') {
                showInput = true;
            }

            shuffledQuestions = Activity.shuffleArray(content?.questions ?? []) ?? [];

            const placeholder = Activity.translateWriteAnsLabel(lang);
            const textArea = `<textarea class="hindiInput w-100 ui-keyboard-input ui-widget-content ui-corner-all ui-keyboard-autoaccepted" rows="3" data-qindex="0" data-blankindex="0" autocomplete="off" placeholder="${placeholder}" style="border-radius: 10px; margin-top: 1%; padding: 10px 0 0 10px; ${!showInput ? `display: none; pointer-events: none;` : ''}" role="textbox"></textarea>`;
            const questions = [];
            shuffledQuestions.forEach((ques, index) => {
                const questionText = ques?.text?.replace(replacement, textArea);
                const html = `
                        <div class="my-3">
                            ${shuffledQuestions.length > 1 ? `${Activity.translateBulletLabels({ ind: index })}. ` : ''}${questionText}
                        </div>
                    `;
                questions.push(html);
            });
            $('#' + quesContId).html(questions.join(''));

            if (lang == 'hi') {
                const inputs = $('#' + quesContId)[0].querySelectorAll('.hindiInput');

                $.keyboard.layouts['hindi'] = Activity.hindiKeyboard();
                $(inputs)
                    .keyboard({
                        layout: 'hindi',
                        usePreview: false,
                        autoAccept: true,
                    })
                    .addTyping({ showTyping: true, delay: 70 })
                    .on('keydown', e => e.preventDefault());
            }
        } catch (err) {
            console.error('TextArea.render :', err);
        }
    };

    const resetAnswers = () => {
        const input = document.querySelectorAll('textarea.hindiInput');
        if (input) input.forEach(input => input.value = '');
        $('.submit-btn').removeClass('disable');
    };

    const checkAnswers = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
        const lang = activity?.lang ?? 'en';

        const inputs = document.querySelectorAll('textarea.hindiInput');
        if (inputs.length) {
            let correctCount = 0, wrongCount = 0, emptyCount = 0;
            let filled = false;

            inputs.forEach(input => {
                if (input.value.trim() !== "") {
                    filled = true;
                }
            });

            const popupLabels = Activity.translatePopupLabels(lang);

            if (!filled) {
                Swal.fire({
                    icon: 'warning',
                    title: popupLabels.noAnswerWritten,
                    text: popupLabels.writeAtLeastOne,
                    confirmButtonText: popupLabels.ok
                });
                return;
            }

            const tableData = [];
            inputs.forEach((input, ind) => {

                const { index, flag, correct, user } = getAnswer(input, ind);

                let resultIcon = '';
                let userClass = '';

                if (user === '') {
                    resultIcon = '⚠ ' + popupLabels.emptyLabel;
                    userClass = 'wrong';
                    emptyCount++;
                } else if (user === correct) {
                    resultIcon = '✔️';
                    userClass = 'correct';
                    correctCount++;
                } else {
                    resultIcon = '❌';
                    userClass = 'wrong';
                    wrongCount++;
                }
                // ..
                const data = `
                    <tr>
                        <td style="text-align: center;">${parseInt(index) + 1}.</td>
                        <td class="${userClass}">${user || "-"}</td>
                        <td class="correct">${correct}</td>
                        <td style="text-align: center;">${resultIcon}</td>
                    </tr>
                `;
                tableData.push(data);
            });

            const tableHead = Activity.translateTableHeads(lang);

            const popHtml = `
                    <div class="popup-header d-flex justify-content-between align-items-center py-2">
                        <h2> ${popupLabels.answerReview}</h2>    
                        <button id="close-popup" class="btn btn-secondary">X</button>                    
                    </div>
                    <table class="answerdiv table table-bordered w-100" style="font-size:20px">
                        <thead class="text-light" style="white-space: nowrap;">
                            <tr>
                                <th style="width:50px">${tableHead.sequence}</th>
                                <th style="width:250px">${tableHead.attempted}</th>
                                <th style="width:250px">${tableHead.correct}</th>
                                <th style="width:50px">${tableHead.result}</th>
                            </tr>
                        </thead>
                    <tbody>
                        ${tableData.join('')}
                    </tbody>
                    </table>
                    <div class="d-flex" style="padding:10px; text-align:left;">
                        <p>${popupLabels.correctLabel} :</p> &nbsp;${correctCount} &nbsp;| &nbsp;
                        <p>${popupLabels.wrongLabel} :</p> &nbsp;${wrongCount} &nbsp;| &nbsp;
                        <p>${popupLabels.emptyLabel} :</p>&nbsp; ${emptyCount}
                    </div>
                    `;
            // ..            
            const answerShowEl = document.getElementById("answerShowMCW");
            if (answerShowEl) answerShowEl.innerHTML = popHtml;
            const popup = document.getElementById("popupDialogAns");
            if (popup) popup.style.display = "block";

            const closeBtn = document.querySelector('#close-popup');
            if (closeBtn) closeBtn.addEventListener('click', closeFnMCQ);
        }
    }

    const showAnswers = () => {
        const inputs = document.querySelectorAll('textarea.hindiInput');
        if (inputs.length) {
            inputs.forEach((input, ind) => {
                const { index, flag, correct, user } = getAnswer(input, ind);
                input.value = correct;
                $(input).slideDown();
            });
            $('.submit-btn').addClass('disable');
        }
    }

    const getAnswer = (input, qInd) => {
        const correctAnswer = shuffledQuestions[qInd]?.answer;
        const userAnswer = input.value.trim();
        let isCorrect = false;

        if (userAnswer == correctAnswer) isCorrect = true;
        return {
            index: qInd,
            flag: isCorrect,
            correct: correctAnswer,
            user: userAnswer
        };
    }

    const closeFnMCQ = () => {
        try {
            const popup = document.getElementById("popupDialogAns");
            if (popup) popup.style.display = "none";
        } catch (e) {
            console.error('Mcq.closeFnMCQ', e);
        }
    }

    return {
        render
    }
})();

const CrossWord = (() => {
    const containerId = 'cross-word-container';

    const defaultColor = '#31cde2';
    const correctColor = 'lightgreen';

    Activity.css('crossword-puzzle.css');

    let questionSet = null;

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const que_side = activity.content?.side ?? 'left';
            const showQuestion = activity.content?.config?.showQuestion ?? 'true';

            const buttonLabel = Activity.translateButtonLabels(lang);

            const uiHtml = `<div class="question">
                            <div class="container" id="${containerId}">                                        
                                <div class="cross-word-puzzle crossword-content" style="text-align:left;">
                                    <div class="${Define.get('head')}"></div>
                                    <div class="cross-puzzle ${que_side === 'top' || que_side === 'bottom' ? 'flex-column' : ''} ${que_side === 'bottom' ? 'flex-column-reverse' : que_side === 'right' ? 'flex-row-reverse' : ''}" style="gap: 2vw;">
                                        ${showQuestion ? `<div class="criss-cross ${que_side === 'top' || que_side === 'bottom' ? 'w-100 d-flex justify-content-evenly' : ''}"></div>` : ''}
                                        <div id="puzzle2" class='w-100' style="display:block;"></div>
                                    </div>
                                    <div id="answer" style="display:none;color:#000"></div>
                                    <div class="machiNgs">
                                        <div class="buttons machiNgs">
                                            <button class="submit-btn">${buttonLabel.check}</button>
                                            <button class="show-btn">${buttonLabel.show}</button>
                                            <button class="reset-btn">${buttonLabel.try}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            // ..
            parent.innerHTML = uiHtml;

            Activity.setHeader(questionId);

            const resetBtn = parent.querySelector('.reset-btn');
            const showBtn = parent.querySelector('.show-btn');
            const submitBtn = parent.querySelector('.submit-btn');

            if (resetBtn) resetBtn.addEventListener('click', clearAllInputs);
            if (showBtn) showBtn.addEventListener('click', fillAllCorrect);
            if (submitBtn) submitBtn.addEventListener('click', checkAnswers);
        } catch (err) {
            console.error('CrossWord.ui :', err);
        }
    };

    const render = (questionId) => {
        try {
            ui(questionId);
            if (!Activity.setQid(`#${containerId}`, questionId)) return false;

            const activity = Activity.getDefine(questionId);
            const lang = activity?.lang ?? 'en';
            const content = activity?.content ?? {};
            const questions = content?.questions ?? [];

            __renderGrid(questions, __renderQuestions(questions));
            questionSet = questions;

            if (content.hint) showHints();

        } catch (err) {
            console.error('CrossWord.render :', err);
        }
    };

    const __renderQuestions = (questions = []) => {
        const answers = [];
        const ques = { across: [], down: [] };

        questions.map(item => {
            let answer = undefined;

            if (typeof item.answer === 'string') {
                answer = item.answer;
            }
            else if (typeof item.answer === 'object') {
                answer = item.answer.text;
            }

            answers.push(`<div>${item.sequence}. ${answer.toUpperCase()}</div>`);

            if (item.direction === 'h') ques.across.push(item);
            else ques.down.push(item);
        });
        $('#answer').html(answers.join(''));

        const hints = [];
        hints.push(`<div>`);
        if (ques?.across.length) hints.push(`<div class="criss-item across">ACROSS</div>`);
        ques?.across.map((item) => {
            const html = `
                <div class="criss-item clues-text">
                    ${item.sequence}. ${renderQuestion(item.question)}
                </div>
            `;
            hints.push(html);
        });
        hints.push(`</div>`);

        hints.push(`<div>`);
        if (ques?.down.length) hints.push(`<div class="criss-item across">DOWN</div>`);
        ques?.down.map((item) => {
            const html = `
                <div class="criss-item clues-text">
                    ${item.sequence}. ${renderQuestion(item.question)}
                </div>
            `;
            hints.push(html);
        });
        hints.push(`</div>`);
        $('.criss-cross').html(hints.join(''));

        return ques;
    };

    const __renderGrid = (questions = [], renderedQuestion = {}) => {
        try {

            const allRows = questions.flatMap(q => Array.isArray(q.row) ? q.row : (q.row ? [q.row] : []));
            const allCols = questions.flatMap(q => Array.isArray(q.col) ? q.col : (q.col ? [q.col] : []));
            const maxRow = allRows.length ? Math.max(...allRows) : 0;
            const maxCol = allCols.length ? Math.max(...allCols) : 0;

            const horizontal = renderedQuestion?.across ?? [];
            const vertical = renderedQuestion?.down ?? [];

            const startOf = arr => Array.isArray(arr) ? arr[0] : arr;
            const endOf = arr => Array.isArray(arr) ? (arr.length > 1 ? arr[1] : arr[0]) : arr;

            const table = ['<table cellspacing="1">'];
            for (let r = 1; r <= maxRow; r++) {
                table.push('<tr>');
                for (let c = 1; c <= maxCol; c++) {
                    let num = '';
                    for (let i = 0; i < horizontal.length; i++) {
                        const item = horizontal[i];
                        const rowStart = startOf(item.row);
                        const colStart = startOf(item.col);
                        if (r === rowStart && c === colStart) { num = item.sequence; break; }
                    }
                    if (!num) {
                        for (let i = 0; i < vertical.length; i++) {
                            const item = vertical[i];
                            const rowStart = startOf(item.row);
                            const colStart = startOf(item.col);
                            if (r === rowStart && c === colStart) { num = item.sequence; break; }
                        }
                    }

                    table.push('<td>');
                    if (__isBox(r, c, renderedQuestion)) {
                        table.push(`<span class="num" style="top: 8px; left: -2px;">${num || ''}</span><input type="text" class="box" maxlength="1" />`);
                    } else {
                        table.push('&nbsp;');
                    }
                    table.push('</td>');
                }
                table.push('</tr>');
            }
            table.push('</table>');
            document.getElementById("puzzle2").innerHTML = table.join('');
            renderGridImages(questions);

        } catch (err) {
            console.log('CrossWord.__renderGrid', err);
        }
    };

    const __isBox = (row, col, renderedQuestion = {}) => {
        const horizontal = renderedQuestion?.across ?? [];
        const vertical = renderedQuestion?.down ?? [];

        const startOf = arr => Array.isArray(arr) ? arr[0] : arr;
        const endOf = arr => Array.isArray(arr) ? (arr.length > 1 ? arr[1] : arr[0]) : arr;

        for (const item of horizontal) {
            const rStart = startOf(item.row);
            const cStart = startOf(item.col);
            const cEnd = endOf(item.col);
            if (row === rStart && col >= cStart && col <= cEnd) return true;
        }

        for (const item of vertical) {
            const cStart = startOf(item.col);
            const rStart = startOf(item.row);
            const rEnd = endOf(item.row);
            if (col === cStart && row >= rStart && row <= rEnd) return true;
        }

        return false;
    };

    const clearAllInputs = () => {

        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};

        const showHint = content?.hint;

        document.querySelectorAll('.box').forEach(b => {
            b.value = '';
            b.style.background = defaultColor;
            b.style.pointerEvents = "auto";
        });

        const checkBtn = document.querySelector('.submit-btn');
        if (checkBtn) {
            checkBtn.disabled = false;
            checkBtn.style.opacity = '1';
            checkBtn.style.cursor = 'pointer';
            checkBtn.classList.remove('disable');
        }
        if (showHint) showHints();
    };

    const showCorrectPopup = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity?.lang ?? 'en';
        const popupLabels = Activity.translatePopupLabels(lang);

        Swal.fire({
            iconHtml: "😄",
            title: popupLabels.allCorrect,
            color: "#2e7d32",
            timer: 1500,
            showConfirmButton: false,
            background: "#fff",
            backdrop: false,
            customClass: {
                icon: "no-border-icon",
                popup: "simple-popup"
            }
        });
    };

    const fillAllCorrect = () => {
        try {
            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
            const content = activity?.content ?? {};
            const questions = content?.questions ?? [];

            questions?.forEach(q => {
                let answer = undefined;

                if (typeof q.answer === 'string') {
                    answer = q.answer.toUpperCase();
                }
                else if (typeof q.answer === 'object') {
                    answer = q.answer.text.toUpperCase();
                }

                if (q.direction === 'h') {
                    let r = q.row[0];
                    let start = q.col[0];

                    [...answer].forEach((ch, i) => {
                        const cell = document.querySelector(
                            `#puzzle2 table tr:nth-child(${r}) td:nth-child(${start + i}) input.box`
                        );
                        if (cell) {
                            cell.value = ch;
                            cell.style.background = correctColor;
                            cell.style.pointerEvents = "none";
                        }
                    });

                } else {
                    let c = q.col[0];
                    let start = q.row[0];

                    [...answer].forEach((ch, i) => {
                        const cell = document.querySelector(
                            `#puzzle2 table tr:nth-child(${start + i}) td:nth-child(${c}) input.box`
                        );
                        if (cell) {
                            cell.value = ch;
                            cell.style.background = correctColor;
                            cell.style.pointerEvents = "none";
                        }
                    });
                }
            });

            const checkBtn = document.querySelector('.submit-btn');
            if (checkBtn) {
                checkBtn.disabled = true;
                checkBtn.style.opacity = '1';
                checkBtn.style.cursor = 'pointer';
                checkBtn.classList.add('disable');
            }
        } catch (err) {
            console.error('CrossWord.fillAllCorrect:', err);
        }
    };

    const checkAnswers = () => {
        try {
            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
            const content = activity?.content ?? {};
            const questions = content?.questions ?? [];

            let allEmpty = true;
            document.querySelectorAll(".box").forEach(b => {
                if (b.value.trim() !== "") allEmpty = false;
            });
            const popupLabels = Activity.translatePopupLabels(lang);
            if (allEmpty) {
                Swal.fire({
                    icon: "info",
                    title: popupLabels.info,
                    text: popupLabels.fillCrosswordBeforeChecking,
                    confirmButtonText: popupLabels.ok,
                    confirmButtonColor: "#6c63ff"
                });
                return;
            }

            let total = 0;
            let correctCount = 0;

            const startOf = arr => Array.isArray(arr) ? arr[0] : arr;
            const endOf = arr => Array.isArray(arr) ? (arr.length > 1 ? arr[1] : arr[0]) : arr;

            questions?.forEach(q => {
                let answer = undefined;

                if (typeof q.answer === 'string') {
                    answer = (q.answer || '').toUpperCase().replace(/\s+/g, '');
                }
                else if (typeof q.answer === 'object') {
                    answer = (q.answer.text || '').toUpperCase().replace(/\s+/g, '');
                }

                if (!answer) return;

                if (q.direction === 'h') {
                    const r = startOf(q.row);
                    const cStart = startOf(q.col);

                    [...answer].forEach((ch, i) => {
                        const c = cStart + i;
                        const selector = `#puzzle2 table tr:nth-child(${r}) td:nth-child(${c}) input.box`;
                        const input = document.querySelector(selector);
                        if (!input) return;
                        total++;
                        const val = (input.value || '').toUpperCase().trim();
                        input.value = val;
                        if (val === ch) {
                            input.style.background = correctColor;
                            correctCount++;
                        }
                    });

                } else {
                    const c = startOf(q.col);
                    const rStart = startOf(q.row);
                    [...answer].forEach((ch, i) => {
                        const r = rStart + i;
                        const selector = `#puzzle2 table tr:nth-child(${r}) td:nth-child(${c}) input.box`;
                        const input = document.querySelector(selector);
                        if (!input) return;
                        total++;
                        const val = (input.value || '').toUpperCase().trim();
                        input.value = val;
                        if (val === ch) {
                            input.style.background = correctColor;
                            correctCount++;
                        }
                    });
                }
            });

            if (correctCount === total && total > 0) {
                showCorrectPopup();
            } else {
                const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
                const lang = activity?.lang ?? 'en';
                const popupLabels = Activity.translatePopupLabels(lang);

                Swal.fire({
                    icon: "info",
                    title: popupLabels.checkAnswers,
                    html: popupLabels.scored(correctCount, total),
                    confirmButtonText: popupLabels.ok,
                    confirmButtonColor: "#6c63ff"
                });
            }
        } catch (err) {
            console.log('CrossWord.checkAnswers :', err);
        }
    };

    const renderGridImages = (questions = []) => {

        const wrapper = document.getElementById("puzzle2");
        if (!wrapper) return;

        wrapper.style.position = "relative";

        wrapper.querySelectorAll(".floating-grid-image").forEach(img => img.remove());

        questions.forEach(q => {

            if (!q.answer?.image?.path || !q.answer?.image?.row || !q.answer?.image?.col) return;

            const { row, col, path } = q.answer.image;

            const cell = document.querySelector(
                `#puzzle2 table tr:nth-child(${row}) td:nth-child(${col})`
            );

            if (!cell) return;

            const verticalMargin = cell.clientWidth / 3;

            const img = document.createElement("img");
            img.src = Activity.pathToCWD() + path;
            img.className = "floating-grid-image";

            img.style.position = "absolute";
            img.style.pointerEvents = "none";
            img.style.height = "auto";

            img.style.width = (cell.offsetWidth * 2) + "px";

            wrapper.appendChild(img);

            img.onload = () => {
                img.style.top = cell.offsetTop + verticalMargin + "px";
                img.style.left = cell.offsetLeft - verticalMargin + "px";
            };
        });
    };

    const showHints = () => {
        let inputs = [];

        $('.num').each(function () {
            let numValue = $(this).html();

            if (numValue && numValue.trim() != '') {
                $(this).siblings('input').each(function () {
                    inputs.push(this);
                });
            }
        });

        questionSet.map((q, i) => {
            let answer = undefined;
            if (typeof q?.answer === 'string') {
                answer = q?.answer;
            }
            else if (typeof q?.answer === 'object') {
                answer = q?.answer?.text;
            }

            inputs[i].value = answer[0];
            inputs[i].style.pointerEvents = "none";
        });
    }

    const renderQuestion = (question) => {

        let queTxt = undefined;
        if (typeof question === 'string') {
            queTxt = question;
        }
        else if (typeof question === 'object') {

            const isText = question?.text ?? false;
            const isImage = question?.image ?? false;

            if (isText) {
                queTxt = question?.text;
            }

            if (isImage) {

                const image = question?.image ?? {};
                const width = question?.image?.width ?? '20%';

                const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
                const content = activity?.content ?? {};
                const replacement = content?.replacement ?? '#_#';

                if (image && image?.path) {

                    const img = `<img src='${Activity.pathToCWD() + image?.path}' style='width: ${width};' />`
                    queTxt = queTxt.replace(replacement, img);
                }
            }


        }

        return queTxt;
    }

    const closePopup = () => {
        const popup = document.getElementById('centerPopup');
        if (popup) {
            popup.style.display = 'none';
            popup.setAttribute('aria-hidden', 'true');
        }
    };

    window.addEventListener("resize", () => {
        document.querySelectorAll(".floating-grid-image").forEach(el => el.remove());
        renderGridImages(questionSet);
    });

    return {
        render
    }
})();

const ShravanKaushalWithImages = (() => {
    const containerId = 'sharavan-image-container';

    let userAnswers;
    let questionRendered = false;
    let questionIndex = 0;
    const mainAudio = new Audio();
    const queAudio = new Audio();

    let waitForMainAudioToFinish = false;
    let replayAudioHandler = null;

    Activity.css('shravanKaushal.css');
    Activity.css('mcq.css');

    const ui = (questionId) => {
        try {
            questionIndex = 0;
            questionRendered = false;

            mainAudio.currentTime = 0;
            mainAudio.pause();
            queAudio.currentTime = 0;
            queAudio.pause();

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const content = activity.content ?? {};
            const questions = content.questions ?? [];

            userAnswers = Array(questions.length).fill(null);

            const buttonLabel = Activity.translateButtonLabels(lang);
            const prevNextLabel = Activity.translateNextPrevLabel(lang);
            const isMain = content?.main ?? false;

            const uiHtml = `<div class="question">
                                <div class="container shrawan-kaushal" id="${containerId}">
                                    <div class="listen-activity-container ${!isMain ? 'd-none' : ''}">
                                        <div class="play-btn">
                                            <div class="icon"></div>
                                        </div>
                                    </div>
                                    ${activity.content?.main?.text != undefined ?
                    `<div class="poem-sec" style="display:none;">
                                            <div class="my-3 container" id="questionTitle">
                                                <b class="${Define.get('head')}"></b>
                                                <svg id="ado-play" fill="currentColor" class="bi bi-play-circle-fill playBtn common_playBtn" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                                                </svg>
                                                <svg id="stop-audio-icon" width="33" height="33" fill="currentColor" class="bi bi-pause-circle-fill common_pauseBtn" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
                                                </svg>
                                            </div>
                                            <div class="container contListen">
                                                <div class="poem-text my-2" id="poemContainer"></div>
                                                <div class="buttons machiNgs">
                                                    <button class="show-btn" id='para-next-btn'>${prevNextLabel.next}</button>
                                                </div>
                                            </div>
                                        </div>`: ''
                }
                                    <div class="question-sec" style="${activity.content?.main != undefined ? "display:none" : 'display:block'}">
                                        <div class="container contListen">
                                            <div class="my-3 container" id="questionTitle">
                                                <b class="${Define.get('head')}"></b>
                                                ${isMain ?
                    `<svg id="ado-play" fill="currentColor" class="bi bi-play-circle-fill playBtn common_playBtn" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                                                    </svg>
                                                    <svg id="stop-audio-icon" width="33" height="33" fill="currentColor" class="bi bi-pause-circle-fill common_pauseBtn" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
                                                    </svg>`: ''
                }
                                            </div>
                                            <div id="mcqContainer"></div>
                                            <div class="listen-buttonection">
                                                <div class="buttons machiNgs">
                                                    <button class="submit-btn" id="listen-prev-btn" style="${activity.content?.main?.text != undefined ? "display:block" : "display:none"}">${prevNextLabel.prev}</button>
                                                    <button class="show-btn" id="listen-next-btn">${prevNextLabel.next}</button>
                                                    <button class="reset-btn" id="listen-sub-btn" style="display:none;">${buttonLabel.submit}</button> 
                                                    <button class="replay-btn" id="listen-replay-btn">${lang == 'en' ? 'Replay' : 'दुबारा सुने'}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="popupDialogAns" style="display: none;">
                                    <div class="baseMod">
                                        <div class="answerdiv">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <h4 id="scoreTextQ1" class="text-center mb-3"></h4>
                                            <button class="btn btn-secondary popUp-close-btn">X</button>
                                        </div>
                                        <div id="answer-review"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            // ..

            parent.innerHTML = uiHtml;
            Activity.setHeader(questionId);
            Activity.setQid(`#${containerId}`, questionId);

            const playBtn = parent.querySelector('.play-btn');
            const audioPlayBtn = parent.querySelectorAll('.bi-play-circle-fill');
            const audioPauseBtn = parent.querySelectorAll('.bi-pause-circle-fill');
            const nextQuestionBtn = parent.querySelectorAll('#listen-next-btn');
            const prevBtn = parent.querySelector('#listen-prev-btn');
            const paraNextBtn = parent.querySelector('#para-next-btn');

            if (paraNextBtn) {

                paraNextBtn.addEventListener('click', () => {

                    // stop main audio
                    Helper.stopAudio();

                    // ✅ reset state so alert does not show
                    questionRendered = false;
                    questionIndex = 0;

                    // render first question
                    renderQuestion();

                    // play question audio
                    const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
                    const questions = activity?.content?.questions ?? [];

                    if (questions[0]?.question?.audio) {

                        playQuestionAudio(
                            Activity.pathToCWD() + questions[0].question.audio
                        );

                    }

                });

            }

            const submitBtn = parent.querySelector('#listen-sub-btn');
            const closeBtn = parent.querySelector('.popUp-close-btn');

            if (playBtn) playBtn.addEventListener('click', startListeningActivity);
            if (prevBtn) prevBtn.addEventListener('click', prevQuestion);
            if (submitBtn) submitBtn.addEventListener('click', submitAnswers);
            if (closeBtn) closeBtn.addEventListener('click', closePopUp);

            nextQuestionBtn.forEach(btn => {
                btn.addEventListener('click', renderQuestion);
            });
            audioPlayBtn.forEach(btn => {
                btn.addEventListener('click', playMainAudio);
            });
            audioPauseBtn.forEach(btn => {
                btn.addEventListener('click', Helper.pauseAudio);
            });

            if (!isMain) {
                renderQuestion();
            }
        } catch (err) {
            console.error('ShravanKaushalWithImages.ui :', err);
        }
    };

    const startListeningActivity = () => {
        $('.listen-activity-container').hide();
        $('.poem-sec').show();

        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};
        const main = content?.main ?? {};

        const text = main?.text ?? {};
        const img = main?.img ?? {};
        const audio = main?.audio;

        const shravanContextContainer = $('#poemContainer');
        shravanContextContainer.empty();

        const hasText = text && Object.keys(text).length > 0;
        const hasImg = img && Object.keys(img).length > 0;

        if (!hasText && !hasImg) shravanContextContainer.remove();

        if (hasText || hasImg) {
            const textDiv = $('<div class="mcq-text"></div>');
            const imgDiv = $('<div class="mcq-image"><img ondragstart="return false;"/></div>');

            shravanContextContainer.addClass('row g-0');

            const preferredSide = (hasText && text?.side) ? text.side : (hasImg && img?.side) ? img.side : 'left';
            const side = String(preferredSide).toLowerCase();

            const commonClassText = 'col-md-12 col-lg-7 col-12 col-sm-12';
            const commonClassImg = 'col-md-12 col-lg-5 col-sm-12 col-12 text-center';

            if (hasText) {
                shravanContextContainer.append(textDiv);
                const mcq_txt_class = hasImg ? `${commonClassText}` : 'col';
                textDiv.addClass(mcq_txt_class).html(text.text || '');
            }

            if (hasImg) {
                const imageclass = img?.imageclass ?? '';
                shravanContextContainer.append(imgDiv);
                const mcq_img_cont_class = hasText
                    ? commonClassImg
                    : `col ${imageclass}`;
                // ..

                const image_width = img.width ?? '40%';

                imgDiv.addClass(mcq_img_cont_class)
                    .find('img')
                    .attr('src', Activity.pathToCWD() + img.path)
                    .css({ 'border-radius': '20px', 'width': image_width });
            }

            if (side === 'left' || side === 'right') {
                shravanContextContainer.css('flex-direction', 'row');
                if (side === 'left') {
                    textDiv.css('order', 1);
                    imgDiv.css('order', 2);

                    textDiv.removeClass('text-end').addClass('text-start');

                } else {
                    textDiv.css('order', 2);
                    imgDiv.css('order', 1);

                    textDiv.removeClass('text-start').addClass('text-end');
                }
            } else if (side === 'top' || side === 'bottom') {
                shravanContextContainer.css('flex-direction', 'column');
                if (side === 'top') {
                    textDiv.css('order', 1);
                    imgDiv.css('order', 2);
                } else {
                    textDiv.css('order', 2);
                    imgDiv.css('order', 1);
                }

                textDiv.removeClass(commonClassText).addClass('col my-1');
                imgDiv.removeClass(commonClassImg).addClass('col my-1 text-center');
            } else {
                shravanContextContainer.css('flex-direction', 'row');
                textDiv.css('order', 1);
                imgDiv.css('order', 2);
            }

        }

        if (audio) {

            Helper.setAudio(Activity.pathToCWD() + audio);

            const questions = activity?.content?.questions ?? [];

            // ✅ CASE: NO text and NO image
            if (!hasText && !hasImg) {

                waitForMainAudioToFinish = true;

                renderQuestion();

                const questions = activity?.content?.questions ?? [];

                if (questions[0]?.question?.audio) {

                    Helper.audio.addEventListener('ended', () => {

                        waitForMainAudioToFinish = false;

                        playQuestionAudio(
                            Activity.pathToCWD() + questions[0].question.audio
                        );

                    }, { once: true });

                }

            }

            // play main audio
            Helper.playAudio({
                playBtn: '.common_playBtn',
                pauseBtn: '.common_pauseBtn',
                handleBtn: true
            });

        }

    }

    const playMainAudio = () => {

        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};

        const audioPath = content?.main?.audio ? content.main.audio : undefined;

        Helper.setAudio(Activity.pathToCWD() + audioPath);
        Helper.playAudio({ playBtn: '.common_playBtn', pauseBtn: '.common_pauseBtn', handleBtn: true })
    }

    const playQuestionAudio = (src) => {
        Helper.pauseAudio();
        Helper.setAudio(src);
        Helper.playAudio({ playBtn: '.common_pauseBtn', pauseBtn: '.common_playBtn', handleBtn: false });
    }

    const renderQuestion = () => {

        Helper.stopAudio();

        if (questionRendered) {
            const selected = document.querySelector(
                `input[name="question-${questionIndex}"]:checked`
            );

            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
            const lang = activity?.lang ?? 'en';
            const popupLabels = Activity.translatePopupLabels(lang);

            if (!selected) {
                Swal.fire({
                    icon: "info",
                    title: popupLabels.info,
                    text: popupLabels.selectOptionBeforeNext,
                    confirmButtonText: popupLabels.ok
                });
                return;
            } else {
                questionIndex++;
            }
        }

        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity?.lang ?? 'en';
        const content = activity?.content ?? {};
        const main = content?.main ?? {};
        const questions = content?.questions ?? [];
        const q = questions[questionIndex];

        $(`.${Define.get('head')}`).html(activity.head);

        const html = [];

        const headHtml = `
            <div class='question-block animate__animated animate__fadeInRight'>
            ${questions.length > 1 ?`<div class="Ques"><b>${questionIndex + 1}. ${q?.question?.text ?? ''}</b></div>`:''}
            ${q?.question?.image
                ? `<img src="${Activity.pathToCWD() + q.question?.image}" class="question-img mb-2 image-Center">`
                : ''
            }
            <div class='row m-0 mt-2'>
        `;
        html.push(headHtml);

        const hasImage = q?.options.some(opt => opt.image);
        const col = content?.col ?? content?.col ?? { col: 12, md: 6, sm: 12 };
        q?.options.forEach((opt, i) => {
            const options = `
                            <div class="col-md-${col?.md} col-sm-${col?.sm} col-${col?.col} p-0">
                                <label class="opt-box ${hasImage ? "big-box" : "small-box"}">
                                    <div class="left-content">
                                        <input 
                                            type="radio"
                                            name="question-${questionIndex}"
                                            value="${i}"                                            
                                            ${userAnswers[questionIndex] === i ? "checked" : ""}
                                        >
                                        <strong class="alpha">
                                            (${Activity.translateBulletLabels({ lang: lang, ind: i, upperCase: true })})
                                        </strong>
                                        <span>${opt.text || ""}</span>
                                    </div>
                                    <div class="right-img ${opt.text == undefined ? 'w-100' : null}">
                                        ${opt.image ? `<img src="${Activity.pathToCWD() + opt.image}" class="opt-image">` : ""}
                                    </div>
                                </label>
                            </div>`;
            // ..
            html.push(options);
        });
        html.push('</div></div>');
        document.getElementById("mcqContainer").innerHTML = html.join('');

        const replayBtn = document.querySelector('.replay-btn');

        if (replayAudioHandler) {
            replayBtn.removeEventListener('click', replayAudioHandler);
        }

        replayAudioHandler = function () {
            const src = Activity.pathToCWD() + q?.question?.audio;
            playQuestionAudio(src);
        };

        replayBtn.addEventListener('click', replayAudioHandler);

        $('.question-sec').show();
        $('.poem-sec').hide();

        $('.left-content input').each((ind, item) => {
            item.addEventListener('click', () => selectOption(questionIndex, ind));
        });

        toggleButtons(questions, main);
        questionRendered = true;

        const audioPath = q?.question?.audio;

        // ✅ play audio ONLY when allowed
        if (audioPath && !waitForMainAudioToFinish) {

            playQuestionAudio(
                Activity.pathToCWD() + audioPath
            );

        }

    }

    const selectOption = (qIndex, optIndex) => {
        userAnswers[qIndex] = optIndex;
    }

    const toggleButtons = (questions, main) => {

        const text = main?.text ?? {};
        const img = main?.img ?? {};

        const hasText = text && Object.keys(text).length > 0;
        const hasImg = img && Object.keys(img).length > 0;

        const isTextImg = hasText && hasImg;

        document.getElementById("listen-prev-btn").style.display = isTextImg || questionIndex != 0 ? "inline-block" : "none";
        document.getElementById("listen-next-btn").style.display =
            questionIndex === questions.length - 1 ? "none" : "inline-block";
        document.getElementById("listen-sub-btn").style.display =
            questionIndex === questions.length - 1 ? "inline-block" : "none";

        document.getElementById("listen-replay-btn").style.display = questions[questionIndex]?.question?.audio ? "inline-block" : "none";
    }

    const prevQuestion = () => {
        questionRendered = false;

        if (questionIndex > 0) {
            questionIndex--;
            renderQuestion();
        } else {
            $('.question-sec').hide();
            startListeningActivity();
        }
    }

    const submitAnswers = () => {
        Helper.stopAudio();

        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity.lang ?? 'en';
        const content = activity.content ?? {};
        const questions = content.questions ?? [];

        const notAnsweredIndex = userAnswers.findIndex(a => a === null);

        const popupLabels = Activity.translatePopupLabels(lang);

        if (notAnsweredIndex !== -1) {
            Swal.fire({
                icon: 'info',
                title: popupLabels.info,
                text: popupLabels.selectOptionForQuestion(notAnsweredIndex + 1),
                confirmButtonText: popupLabels.ok
            });
            return;
        }

        const userTextAns = [];
        const correctTextAns = [];

        questions?.forEach((q, index) => {
            const selected = userAnswers[index];
            userTextAns.push(q.options[selected].text);
            correctTextAns.push(q.options[q.answer].text);
        });

        const score = userTextAns.filter((ans, i) => ans === correctTextAns[i]).length;
        const total = questions.length;

        showResultPopup(score, total, userTextAns, correctTextAns, lang);
    }

    const showResultPopup = (score, total, userAns, correctAns, lang = 'en') => {
        const popupLabels = Activity.translatePopupLabels(lang);

        document.getElementById("scoreTextQ1").innerText = popupLabels.scored(score, total);

        const tableHeadLabels = Activity.translateTableHeads(lang);

        const table = [];
        const tableHead = `
            <div class="table-responsive">
                <table class="table table-bordered" style="font-size:20px">
                    <thead class="text-light" style="white-space: nowrap;">
                        <tr>
                            <th>${tableHeadLabels.sequence}</th>
                            <th>${tableHeadLabels.attempted}</th>
                            <th>${tableHeadLabels.correct}</th>
                            <th>${tableHeadLabels.result}</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        table.push(tableHead);

        userAns.forEach((ua, i) => {
            const ca = correctAns[i];
            const isCorrect = ua === ca;

            const tr = `
                <tr>
                    <th>${i + 1}</th>
                    <td class="${isCorrect ? "text-success" : "text-danger"}">${ua}</td>
                    <td class="text-success">${ca}</td>
                    <td class="${isCorrect ? "text-success" : "text-danger"}">
                        ${isCorrect ? "✔" : "✘"}
                    </td>
                </tr>
            `;
            table.push(tr);
        });

        table.push(`</tbody></table></div>`);

        document.getElementById("answer-review").innerHTML = table.join('');
        document.getElementById("popupDialogAns").style.display = "block";
    }

    const closePopUp = () => {
        $("#popupDialogAns").hide();
    }

    return {
        render: ui
    }

})();

const OnlyAudio = (() => {

    Activity.css('audioPlay.css');

    let state = {
        container: null,
        audioEl: null,
        __ytPlayer: null,
        mode: null,
        rafId: null,
        isSeeking: false,
        initialized: false,
    };

    let fakePercent = 0;
    let fakeInterval;

    const safeLog = (...a) => { if (window.console) console.log(...a); };

    const formatTime = (s) => {
        if (!Number.isFinite(s) || s < 0) s = 0;
        const m = Math.floor(s / 60).toString();
        const sec = Math.floor(s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    };

    const isYouTube = (u) => typeof u === "string" && (u.includes("youtube.com") || u.includes("youtu.be"));

    const extractYouTubeId = (url) => {
        if (!url) return null;
        let m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        if (m) return m[1];
        m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        if (m) return m[1];
        m = url.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
        if (m) return m[1];
        return null;
    };

    let ytApiPromise = null;
    const ensureYouTubeApi = () => {
        if (window.YT && window.YT.Player) return Promise.resolve();
        if (ytApiPromise) return ytApiPromise;

        ytApiPromise = new Promise((resolve, reject) => {
            // create script
            const s = document.createElement("script");
            s.src = "https://www.youtube.com/iframe_api";
            s.async = true;
            document.head.appendChild(s);

            // single global callback
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = function () {
                if (typeof prev === "function") try { prev(); } catch (e) { /* ignore */ }
                resolve();
            };

            // fallback timeout
            setTimeout(() => {
                if (window.YT && window.YT.Player) resolve();
                else reject(new Error("YouTube API load timeout"));
            }, 10000);
        });

        return ytApiPromise;
    };

    const updatePlayButton = (playing) => {
        if (!state.playBtn) return;
        state.playBtn.src = playing
            ? "images/pause2.png"
            : "images/play2.png";
    };

    const startProgressLoop = () => {
        if (state.rafId) return;
        const frame = () => {
            if (!state.isSeeking) {
                let cur = 0, dur = 0;
                if (state.mode === "file" && state.audioEl) {
                    cur = state.audioEl.currentTime || 0;
                    dur = state.audioEl.duration || 0;
                } else if (state.mode === "youtube" && state.__ytPlayer) {
                    try {
                        cur = state.__ytPlayer.getCurrentTime() || 0;
                        dur = state.__ytPlayer.getDuration() || 0;
                    } catch (e) { cur = 0; dur = 0; }
                }

                if (dur > 0) {
                    const pct = Math.min(100, (cur / dur) * 100);
                    if (state.seek) state.seek.value = pct;
                    if (state.durationEl) state.durationEl.textContent = formatTime(dur);
                }
                if (state.currentTimeEl) state.currentTimeEl.textContent = formatTime(cur);
            }
            state.rafId = requestAnimationFrame(frame);
        };
        state.rafId = requestAnimationFrame(frame);
    };

    const stopProgressLoop = () => { if (state.rafId) cancelAnimationFrame(state.rafId); state.rafId = null; };

    const destroyYT = () => {
        try {
            if (state.__ytPlayer && typeof state.__ytPlayer.destroy === "function") {
                state.__ytPlayer.destroy();
            }
        } catch (e) { /* ignore */ }
        state.__ytPlayer = null;
    };

    const initFile = (src) => {
        if (state.__ytPlayer) {
            try { state.__ytPlayer.pauseVideo(); } catch (e) { }
        }

        destroyYT();
        if (!state.audioEl) {
            state.audioEl = document.createElement("audio");
            state.audioEl.id = "oas-audio";
            state.audioEl.preload = "metadata";
            state.audioEl.style.display = "none";
            state.container.appendChild(state.audioEl);
        }
        state.mode = "file";
        state.audioEl.src = src;
        state.loaderEl.style.display = "inline-block";
        startFakeLoader();

        state.audioEl.onloadedmetadata = () => {
            stopFakeLoader();
            if (state.durationEl) state.durationEl.textContent = formatTime(state.audioEl.duration);
        };

        state.audioEl.onplay = () => { updatePlayButton(true); startProgressLoop(); };
        state.audioEl.onpause = () => { updatePlayButton(false); stopProgressLoop(); };
        state.audioEl.onended = () => { updatePlayButton(false); stopProgressLoop(); state.seek && (state.seek.value = 100); };
    };

    const initYouTube = async (urlOrId) => {
        if (state.audioEl) {
            state.audioEl.pause();
        }
        state.mode = "youtube";
        destroyYT();

        const id = extractYouTubeId(urlOrId) || urlOrId;
        if (!id) throw new Error("Invalid YouTube URL or id");

        state.loaderEl.style.display = "inline-block";
        startFakeLoader();
        await ensureYouTubeApi(); // may throw

        // Create player in a hidden wrapper (but not 0x0)
        state.iframeWrap.innerHTML = `<div id="oas-yt-player"></div>`;
        state.__ytPlayer = new YT.Player("oas-yt-player", {
            height: "1",
            width: "1",
            videoId: id,
            playerVars: { autoplay: 0, controls: 0, rel: 0 },
            events: {
                onReady: (ev) => {
                    // allow autoplay on the created iframe
                    const iframe = state.iframeWrap.querySelector("iframe");
                    if (iframe) iframe.setAttribute("allow", "autoplay; encrypted-media");
                    try {
                        const dur = state.__ytPlayer.getDuration();
                        if (state.durationEl && Number.isFinite(dur)) state.durationEl.textContent = formatTime(dur);
                        stopFakeLoader();
                    } catch (e) { /* ignore */ }
                    state.loaderEl.style.display = "none";
                },
                onStateChange: (e) => {
                    const s = e.data;
                    if (s === YT.PlayerState.PLAYING) {
                        updatePlayButton(true);
                        startProgressLoop();
                    }
                    else if (s === YT.PlayerState.PAUSED) {
                        updatePlayButton(false);
                        stopProgressLoop();
                    }
                    else if (s === YT.PlayerState.ENDED) {
                        updatePlayButton(false);
                        stopProgressLoop();
                        state.seek && (state.seek.value = 100);
                    }
                }
            }
        });
    };

    const ui = (questionId) => {
        try {

            const container = Define && typeof Define.get === "function" ? Define.get('questionContainer') : null;
            const parent = container ? document.querySelector(container) : null;

            if (!parent) {
                console.error("Audio.renderUI: ui container not found (Define.get('questionContainer') =>", container, ")");
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity?.lang ?? 'en';
            const content = activity?.content ?? {};

            const defaultDesc = lang == 'en' ? 'Audio' : 'ऑडियो';
            const description = content?.desc ?? defaultDesc;

            parent.innerHTML = `
            <div class="question">
                <div class="container">
                    <div class="audio-music-bg"></div>
                    <div class="container-sub">
                        <div class="row g-0 justify-content-center audio-box">
                            <div class="col-lg-11 col-md-10 col-sm-10 col-12 d-flex justify-content-center align-items-center">
                                <div class="audio-container">
                                    <div class="audio-banner">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#fff"
                                        class="bi bi-music-note-beamed" viewBox="0 0 16 16">
                                        <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
                                        <path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
                                        <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
                                        </svg>
                                    </div>
                                    <div class="audio-name my-3">${description}</div>
                                    <div>
                                        <input type="range" class="w-100" id="seekSlider" min="0" max="100" value="0" step="0.1">
                                        <div class="d-flex justify-content-between align-items-center progress-bar-seek">
                                            <span id="currentTime">00:00</span>
                                            <span id="duration">00:00</span>
                                        </div>
                                        <div id="oas-iframe-wrap" class="hidden-iframe d-none" aria-hidden="true"></div>
                                        <div class="rowAudioBtns">
                                            <img src="images/replay2.png" class="audio-replay-btn" id="replayBtn" alt="replay">
                                            <div id="loader" style="display:none">Loading... 0%</div>
                                            <img src="images/play2.png" class="w-25 play-icon" alt="play-pause" id="playPauseBtn">
                                            <img src="images/replay2.png" class="audio-replay-btn invisible" alt>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            state.container = parent;
            state.playBtn = parent.querySelector("#playPauseBtn");
            state.seek = parent.querySelector("#seekSlider");
            state.currentTimeEl = parent.querySelector("#currentTime");
            state.durationEl = parent.querySelector("#duration");
            state.replayBtn = parent.querySelector("#replayBtn");
            state.loaderEl = parent.querySelector("#loader");
            state.iframeWrap = parent.querySelector("#oas-iframe-wrap");
        } catch (e) {
            console.error('OnlyAudio.renderUI error:', e);
        }
    };

    const init = async (questionId) => {

        ui(questionId);

        const activity = Activity.getDefine(questionId) ?? {};
        const content = activity.content ?? {};

        let source = `${content?.src}`;

        if (!source || typeof source !== "string") throw new Error("source string required");

        state.playBtn.addEventListener("click", async () => {
            try {
                if (state.mode === "file" && state.audioEl) {
                    if (state.audioEl.paused) await state.audioEl.play();
                    else state.audioEl.pause();
                } else if (state.mode === "youtube" && state.__ytPlayer) {
                    const st = state.__ytPlayer.getPlayerState();
                    if (st === YT.PlayerState.PLAYING) state.__ytPlayer.pauseVideo();
                    else state.__ytPlayer.playVideo();
                } else {
                    await setupSource(source);
                    if (state.mode === "file" && state.audioEl) state.audioEl.play();
                    if (state.mode === "youtube" && state.__ytPlayer) state.__ytPlayer.playVideo();
                }
            } catch (err) {
                console.error("play error:", err);
            }
        });

        state.replayBtn.addEventListener("click", () => {
            if (state.mode === "file" && state.audioEl) {
                state.audioEl.currentTime = 0;
                state.audioEl.play();
            } else if (state.mode === "youtube" && state.__ytPlayer) {
                try { state.__ytPlayer.seekTo(0, true); state.__ytPlayer.playVideo(); } catch (e) { /* ignore */ }
            }
        });

        // seeking
        state.seek.addEventListener("input", (e) => {
            state.isSeeking = true;
        });
        state.seek.addEventListener("change", (e) => {
            const pct = parseFloat(e.target.value) || 0;
            handleSeekPct(pct);
            state.isSeeking = false;
        });

        // keyboard support for play button
        state.playBtn.tabIndex = 0;
        state.playBtn.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); state.playBtn.click(); } });

        // set up initial source but do not autoplay (user gesture needed for some browsers)
        await setupSource(source);

        state.initialized = true;
        safeLog("OnlyAudioSimple initialized", state.mode);
    };

    const handleSeekPct = (pct) => {
        if (state.mode === "file" && state.audioEl && state.audioEl.duration) {
            state.audioEl.currentTime = (pct / 100) * state.audioEl.duration;
        } else if (state.mode === "youtube" && state.__ytPlayer && typeof state.__ytPlayer.getDuration === "function") {
            try {
                const dur = state.__ytPlayer.getDuration() || 0;
                const target = (pct / 100) * dur;
                state.__ytPlayer.seekTo(target, true);
            } catch (e) { /* ignore */ }
        }
    };

    const setupSource = async (src) => {
        if (isYouTube(src)) {
            await initYouTube(src);
        } else {
            initFile(src);
        }
    };

    const startFakeLoader = () => {
        fakePercent = 0;
        state.loaderEl.style.display = "inline-block";
        fakeInterval = setInterval(() => {
            fakePercent += 5;
            if (fakePercent > 95) fakePercent = 95;
            state.loaderEl.textContent = `Loading... ${fakePercent}%`;
        }, 200);
    }

    const stopFakeLoader = () => {
        clearInterval(fakeInterval);
        state.loaderEl.textContent = `Loading... 100%`;
        setTimeout(() => {
            state.loaderEl.style.display = "none";
        }, 200);
    }

    const destroy = () => {
        try {
            // Stop RAF
            if (state.rafId) {
                cancelAnimationFrame(state.rafId);
                state.rafId = null;
            }

            // Stop & clean audio
            if (state.audioEl) {
                // Remove all event handlers to prevent re-triggering
                state.audioEl.onplay = null;
                state.audioEl.onpause = null;
                state.audioEl.onended = null;
                state.audioEl.onloadedmetadata = null;
                state.audioEl.onerror = null;

                // Stop playback & stop loading
                state.audioEl.pause();
                state.audioEl.src = "";
                state.audioEl.load();   // IMPORTANT: cancels pending load
                state.audioEl.remove();
            }

            // Destroy YouTube
            if (state.__ytPlayer && state.__ytPlayer.destroy) {
                state.__ytPlayer.destroy();
            }
            state.__ytPlayer = null;

            // Clear UI
            if (state.container) {
                state.container.innerHTML = "";
            }

            // Reset state
            state = {
                container: null,
                audioEl: null,
                __ytPlayer: null,
                mode: null,
                rafId: null,
                isSeeking: false,
                initialized: false
            };

        } catch (e) {
            console.error("destroy error", e);
        }
    };


    return { render: init, destroy };
})();

const VideoPlayer = (() => {
    const containerId = 'video-container';

    const ui = (questionId) => {
        try {

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const content = activity.content ?? {};
            const video = content?.video ?? {};
            const isYouTube = video?.youtube ?? false;
            const path = (video?.path && isYouTube) ? video?.path : Activity.pathToCWD() + video?.path;

            const uiHtml = `<div class="question">
                                <div class="p-2 d-flex align-items-center justify-content-center" id="${containerId}" style="height:85vh !important;">
                                    ${`<iframe id="ytVideo" 
                                            class="w-100 h-100"
                                            src="${path}"
                                            frameborder="0"
                                            allow="autoplay; fullscreen;"
                                            allowfullscreen
                                            style="background: #000">
                                        </iframe>`
                }
                                </div>
                            </div>`;
            // ..
            parent.innerHTML = uiHtml;
            Activity.setHeader(questionId);
            Activity.setQid(`#${containerId}`, questionId);
        } catch (err) {
            console.error('VideoPlayer.ui :', err);
        }
    };

    return {
        render: ui
    }

})();

const RachnatmakParaWithImages = (() => {
    const containerId = 'rachnatmak-container';

    Activity.css('fillHindi.css');

    const ui = (questionId) => {
        try {

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity?.lang ?? 'en';

            const uiHtml = `<div class="question">
                                <div class="container" id="${containerId}">
                                    <div class="menHeading ${Define.get('head')}"></div>
                                    <p class="nameOfTopic ${Define.get('subHead')}"></p>
                                    ${activity.instruction != undefined && activity.instruction !== "" ?
                    `<div class="instForFillText shadow-sm">
                                            <div class="headNirdesh">${Activity.translateHintLabel(lang)}</div>
                                            <p class="saketText">instruction</p>
                                        </div>`: ''
                }
                                    <div class="textNormalRun"></div>
                                </div>
                                `;
            // ..
            parent.innerHTML = uiHtml;
            Activity.setHeader(questionId);
            Activity.setQid(`#${containerId}`, questionId);
        } catch (err) {
            console.error('RachnatmakWithImages.ui :', err);
        }
    };

    const renderActivity = (questionId) => {
        ui(questionId);

        const activity = Activity.getDefine(questionId) ?? {};
        const content = activity?.content ?? {};

        const container = document.querySelector(".textNormalRun");

        const image = content?.image ?? false;
        let text = content?.text ?? '';
        if (image != false) {
            const width = image?.width ?? '40%';
            const replacement = image?.replacement ?? '#_#';

            if (Array.isArray(image.path)) {
                let count = 0;
                const escapedReplacement = replacement.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(escapedReplacement, 'g');

                text = text.replace(regex, (match) => {
                    const path = image.path[count];
                    if (path) {
                        const align = Array.isArray(image.align) ? (image.align[count] || 'right') : (image.align || 'right');
                        const fullPath = path ? Activity.pathToCWD() + path : '';
                        const imageTag = `<img src="${fullPath}" style="width:${width};" class="img-${align}" >`;
                        count++;
                        return imageTag;
                    }
                    return match;
                });
            } else {
                const align = (image?.align == 'left' || image?.align == 'right') ? image?.align : 'right';
                const path = image?.path ? Activity.pathToCWD() + image.path : false;
                if (path != false && text.includes(replacement)) {
                    const imageTag = `<img src="${path}" style="width:${width};" class="img-${align}" >`;
                    text = text.replace(replacement, imageTag);
                }
            }
        }
        container.innerHTML = text;
    }

    return {
        render: renderActivity
    }

})();

const RachnatmakWithKeyboard = (() => {
    const containerId = 'rachnatmak-container';

    Activity.css('fillHindi.css');

    const ui = (questionId) => {
        try {

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const content = activity?.content ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            const showInput = content?.showInput ?? true;

            const uiHtml = `<div class="question">
                                <div class="container" id="${containerId}">
                                    <div class="menHeading ${Define.get('head')}"></div>
                                    <div class="nameOfTopic ${Define.get('subHead')}"></div>
                                    <div id="activitiesRachnatmal"></div>
                                    <div class='clear'></div>
                                    <div class="studentAnsBox" style="display:none;">
                                        <div class="inForContRach animate__animated  animate__fadeInDown">
                                            <div class="closeBtnsRachna">X</div>
                                            <div class="studentOutPut"></div>
                                        </div>
                                    </div>
                                    <div class="sampleBox" style="display:none;">
                                        <div class="sampleAnsBox inForContRach animate__animated  animate__fadeInDown">
                                            <div class="closeBtnsRachna closeAnsBox">X</div>
                                            ${content.answer}
                                        </div>
                                    </div>
                                    <div class="buttons machiNgs">
                                        <button class="submit-btn ${!showInput ? 'd-none' : ''}">${buttonLabel.check}</button>
                                        <button class="show-btn">${!showInput ? 'उत्तर नमुना' : `${buttonLabel.show}`}</button>
                                        <button class="reset-btn ${!showInput ? 'd-none' : ''}">${buttonLabel.try}</button>
                                    </div>
                                </div>
                            `;
            // ..
            parent.innerHTML = uiHtml;
            Activity.setHeader(questionId);
            Activity.setQid(`#${containerId}`, questionId);


            const resetBtn = parent.querySelector('.reset-btn');
            const showBtn = parent.querySelector('.show-btn');
            const submitBtn = parent.querySelector('.submit-btn');
            const closeBtn = parent.querySelectorAll('.closeBtnsRachna');

            if (showBtn) showBtn.addEventListener("click", showAnswer);
            if (resetBtn) resetBtn.addEventListener("click", resetActivity);
            if (submitBtn) submitBtn.addEventListener("click", checkAnswer);
            if (closeBtn) closeBtn.forEach((item) => {
                item.addEventListener("click", closePopUp);
            })


        } catch (err) {
            console.error('RachnatmakWithKeyboard.ui :', err);
        }
    };

    const renderActivity = (questionId) => {
        ui(questionId);

        const activity = Activity.getDefine(questionId) ?? {};
        const lang = activity.lang ?? 'en';
        const content = activity.content ?? {};
        const hintText = activity.hintText ?? true;

        const showInput = content?.showInput ?? true;

        let textareaType = content.textArea?.type ?? "single";
        let textareaClass = textareaType === "multi" ? "multiTextArea" : "singleTextarea";
        let textBox = "";
        for (let i = 0; i < content.textArea?.count; i++) {
            textBox += `
                    <textarea 
                        class="form-control hindiInput ui-keyboard-input ui-widget-content ui-corner-all ui-keyboard-autoaccepted forHindiDev 
                        ${textareaClass}" 
                        data-ans="${i}"
                        placeholder="${Activity.translateWriteAnsLabel(lang)}"
                        style="height:${content?.textArea?.height}; ${!showInput ? `display: none; pointer-events: none;` : ''}"
                    ></textarea>
                `;
        }

        const imgSrc = content?.image?.path ? Activity.pathToCWD() + content?.image?.path : '';
        const imgWidth = content?.image?.width ?? '10%';
        const image = imgSrc
            ? `<img
                class="dynamicImgRachna shadow-sm ${content?.image?.side}"
                src="${imgSrc}"
                style="width:${imgWidth};" />`
            : '';
        // ..

        const imageHTML = content?.image
            ? (content.image?.side === 'left')
            : '';

        const imageDirection = () => {
            const html = [];
            if (content?.image?.side === 'top') html.push(`<div class="text-center">${image}</div>`);

            const frag1 = `<div class="inputeSectionsRachna img-${content?.image?.side}">`
            html.push(frag1);

            if (content?.image?.side === 'left') html.push(image);
            const textArea = `<div class="textInputsBox">${textBox}</div>`;
            html.push(textArea);

            if (content?.image?.side === 'right') html.push(image);
            html.push('</div>');

            return html.join('');
        }

        const html = `
            ${content?.heading ?
                `<div class="instForFillText shadow-sm">
                    ${hintText ? `
                            <div class="headNirdesh">${Activity.translateHintLabel(lang)}</div>
                        ` : ''
                }
                    <p class="saketText">${content?.heading ?? ''}</p>
                </div>` : ''
            }
            ${imageDirection()}
            `;

        document.getElementById("activitiesRachnatmal").innerHTML = html;

        if (lang == 'hi') {
            const inputs = $('#' + containerId)[0].querySelectorAll('.hindiInput');
            $.keyboard.layouts['hindi'] = Activity.hindiKeyboard();
            $(inputs)
                .keyboard({
                    layout: 'hindi',
                    usePreview: false,
                    autoAccept: true,
                })
                .addTyping({ showTyping: true, delay: 70 })
                .on('keydown', e => e.preventDefault());
        }
    }

    const showAnswer = () => {
        $(".sampleBox").show();
    }

    const resetActivity = () => {
        document.querySelectorAll('textarea').forEach(t => t.value = "");
    }

    const checkAnswer = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity.content ?? {};
        const lang = activity?.lang ?? 'en';

        const textareas = document.querySelectorAll('textarea');
        const studentBox = document.querySelector('.studentOutPut');
        let isEmptyFound = false;

        const keywords = content.answer
            .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
            .split(/\s+/)
            .filter(word => word.length > 3);
        const uniqueKeywords = [...new Set(keywords)];

        textareas.forEach(t => {
            if (t.value.trim() === "") {
                isEmptyFound = true;
                t.style.border = "2px solid red";
            } else {
                t.style.border = "";
            }
        });
        if (isEmptyFound) {
            const popupLabels = Activity.translatePopupLabels(lang);
            Swal.fire({
                icon: "error",
                title: popupLabels.oops,
                text: popupLabels.writeAtLeastOne,
                confirmButtonText: popupLabels.ok
            });
            return;
        }

        $(".studentAnsBox").show();
        let studentText = Array.from(textareas).map(t => t.value).join(" ");

        let matchedKeywords = 0;
        let studentWords = studentText.split(/\s+/);

        uniqueKeywords.forEach(key => {
            if (studentWords.includes(key)) matchedKeywords++;
        });

        let score = Math.round((matchedKeywords / uniqueKeywords.length) * 100);
        score = Math.max(0, Math.min(100, score));

        const popupLabels = Activity.translatePopupLabels(lang);

        studentBox.innerHTML = `<div class='headingYourAns'>${popupLabels.attempted} :</div><br>
                                <span class='studentTextApp'>${studentText}</span><br><br>
                                <div class='scoreInRachNamat'>${popupLabels.pointsScored(score, 100)}</div>`;

        $(".studentAnsBox").show();

        studentBox.innerHTML = `
                <div class='headingYourAns'>आपके उत्तर :</div><br>
                <span class='studentTextApp'>${studentText}</span><br><br>
                <div class='scoreInRachNamat'>आपको 100 में से ${score} अंक मिले हैं</div>`;
    }

    const closePopUp = () => {
        $(".studentAnsBox").hide();
        $(".sampleBox").hide();
    }

    return {
        render: renderActivity
    }

})();

const RachnatmakWithTabBtns = (() => {
    const containerId = 'rachnatmak-container';

    Activity.css('fillHindi.css');

    const ui = (questionId) => {
        try {

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            const uiHtml = `<div class="question">
                                <div class="container" id="${containerId}">
                                    <div class="container">
                                        <div class="wrapers">
                                            <div class="menHeading text-center ${Define.get('head')}" id="mainHRach"></div>
                                            <div class="nameOfTopic text-center ${Define.get('subHead')}" id="subHeadRach"></div>
                                            <div class="holderLeterBox">
                                                <div class="rowRachnaButtons animate__animated animate__fadeInDown" id="dynamicTabs"></div>
                                                <div class="showContentBox" id="dynamicContent"></div>
                                            </div>
                                            <div class="readyLetterBox" id="readyLetterBox"></div>
                                            <div class="buttons machiNgs">
                                                <button class="show-btn readyPatar">${buttonLabel.show}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
            // ..
            parent.innerHTML = uiHtml;
            Activity.setHeader(questionId);
            Activity.setQid(`#${containerId}`, questionId);
        } catch (err) {
            console.error('RachnatmakWithTabBtns.ui :', err);
        }
    };

    const renderActivities = (questionId) => {
        const activity = Activity.getDefine(questionId) ?? {};
        const content = activity?.content ?? {};

        ui(questionId);

        const tabContainer = document.getElementById("dynamicTabs");
        const contentContainer = document.getElementById("dynamicContent");

        content?.questions.forEach((item, index) => {
            const tab = document.createElement("div");
            tab.className = "tbClicked";
            tab.dataset.id = index;
            tab.innerHTML = `<div class="row align-items-start">
                                <div class="col-md-3 col-12">
                                    <div class="tabsForLetter shadow-sm" data-id="${index}">
                                        ${index + 1 + '. ' + item.label}
                                    </div>
                                </div>
                                <div class="col-md-9 col-12">
                                    <div class="showInboxes animate__animated animate__fadeInUp" data-id="${index}" style="display:none;">
                                        ${item.answer}
                                    </div>
                                </div>
                            </div>`;

            tabContainer.appendChild(tab);
            const div = document.createElement("div");
            div.className = "showInboxes animate__animated animate__fadeInDown";
            div.dataset.id = index;
            div.style.display = "none";
            div.innerHTML = item.answer;
            contentContainer.appendChild(div);
        });

        showAns(questionId);
        handlingClick();
    }

    const handlingClick = () => {
        const tabs = document.querySelectorAll('.tabsForLetter');
        tabs.forEach((tab) => {
            const tabId = tab.dataset.id;
            const contentBox = document.querySelector(`.showInboxes[data-id="${tabId}"]`);
            tab.addEventListener('click', (e) => {
                $(contentBox).toggle();
            });
        });
    }

    const showAns = (questionId) => {
        const activity = Activity.getDefine(questionId) ?? {};
        const content = activity?.content ?? {};

        const readyLetterBox = document.getElementById("readyLetterBox");
        const htmlReady = `<div class="baseModelsReady animate__animated animate__fadeInDown">
                            <div class='headingReadyPatr'>${content?.heading}</div>
                            <div class="closeBtnsRachna closeReadyPatar">X</div>
                            <div id="dataForReadyPatar"></div>
                        </div>`
        readyLetterBox.innerHTML = htmlReady
        const dataForReadyPatar = document.getElementById("dataForReadyPatar")
        content?.questions.map((item) => {
            const html = `<div>${item.answer}</div>`
            dataForReadyPatar.innerHTML += html;
        });

        $('.closeReadyPatar').on('click', () => {
            $("#readyLetterBox").hide();
        });

        $('.readyPatar').on('click', () => {
            $("#readyLetterBox").show();
            $("#readyLetterBox").css("display", "flex");
        });
    }

    return {
        render: renderActivities
    }

})();

const RachnatmakWithInputs = (() => {
    const containerId = 'rachnatmak-container';

    Activity.css('fillHindi.css');

    const ui = (questionId) => {
        try {

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const content = activity?.content ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);


            const uiHtml = `<div class="question">
                                <div class="container" id="${containerId}">
                                    <div class="container">
                                        <div class="wrapers">
                                            <div class="menHeading text-center ${Define.get('head')}" id="mainHRach"></div>
                                            <div class="nameOfTopic text-center ${Define.get('subHead')}" id="subHeadRach"></div>
                                            ${content?.hint ?
                    `<div class="instForFillText shadow-sm">
                                                    <div class="headNirdesh">${Activity.translateHintLabel(lang)}</div>
                                                    <p class="saketText">${content?.hint}</p>
                                                </div>`: ''
                }
                                            ${content?.image ?
                    `<div class="imgDisplay" style="width:${content.image?.width}">
                                                    <img src="${Activity.pathToCWD() + content.image?.path}"/>
                                                </div>`: ''
                }
                                            <div id="showInputsAnnds"></div>
                                            ${content?.showButtons ?
                    `<div class="buttons machiNgs">
                                                    <button class="submit-btn">${buttonLabel.check}</button>
                                                    <button class="show-btn">${buttonLabel.show}</button>
                                                    <button class="reset-btn">${buttonLabel.try}</button>
                                                </div>`: ''
                }
                                        </div>
                                    </div>
                                </div>
                                `;
            // ..
            parent.innerHTML = uiHtml;
            Activity.setHeader(questionId);
            Activity.setQid(`#${containerId}`, questionId);

            const submitBtn = parent.querySelector('.submit-btn');
            const showAnsBtn = parent.querySelector('.show-btn');
            const retryBtn = parent.querySelector('.reset-btn');

            if (submitBtn) submitBtn.addEventListener('click', checkAnswers);
            if (showAnsBtn) showAnsBtn.addEventListener('click', showAnswer);
            if (retryBtn) retryBtn.addEventListener('click', resetActivity);

        } catch (err) {
            console.error('RachnatmakWithInputs.ui :', err);
        }
    };

    const renderActivity = (questionId) => {
        ui(questionId);

        const activity = Activity.getDefine(questionId) ?? {};
        const content = activity?.content ?? {};
        const lang = activity?.lang ?? 'en';

        const showInputsAnnds = document.getElementById("showInputsAnnds");

        const colLeft = content?.col?.left != undefined ? content?.col?.left : { md: 6, sm: 6, col: 6, show: true };
        const colRight = content?.col?.right != undefined ? content?.col?.right : { md: 6, sm: 6, col: 6, show: true };

        content?.question.map((item, index) => {

            const html = `<div class="row rowContainer">
                            <div class="col-md-${colLeft?.md} col-sm-${colLeft?.sm} col-${colLeft?.col}"
                                style="display:${colLeft?.show ? "block" : "none"}">
                                ${content?.inputLeft === false ?
                    item?.text ?
                        `<div class="headingText animate__animated animate__fadeInDown">
                                            ${index + 1}. ${item.text}
                                        </div>` : ''
                    :
                    `<textarea 
                                        data-type="left" id="leftValue_${index}"
                                        class="form-control hindiInput fillAppli animate__animated animate__fadeInUp"
                                        placeholder="${content?.placeholder?.left ?? ""}">
                                    </textarea>`
                }
                            </div>
                            ${item?.answer ?
                    `<div class="col-md-${colRight?.md} col-sm-${colRight?.sm} col-${colRight?.col}"
                                    style="display:${colRight?.show ? "block" : "none"}">
                                    <textarea data-type="right" id="inputAns_${index}"
                                    class="form-control hindiInput fillAppli animate__animated animate__fadeInUp"
                                    placeholder="${content?.placeholder?.right ?? ""}"></textarea>
                                </div>` : ''
                }
                        </div>`;
            // ..
            showInputsAnnds.innerHTML += html;
        });

        // Default Show Answers
        showDefaultAnswer();

        document.querySelectorAll(".fillAppli").forEach((textarea) => {
            textarea.addEventListener("input", () => autoResizeTextarea(textarea));
            autoResizeTextarea(textarea);
        });

        if (lang == 'hi') {
            const inputs = $('#' + containerId)[0].querySelectorAll('.hindiInput');

            $.keyboard.layouts['hindi'] = Activity.hindiKeyboard();
            $(inputs)
                .keyboard({
                    layout: 'hindi',
                    usePreview: false,
                    autoAccept: true,
                })
                .addTyping({ showTyping: true, delay: 70 })
                .on('keydown', e => e.preventDefault());
        }
    }

    const showDefaultAnswer = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};

        const fillAppli = document.querySelectorAll('.fillAppli');

        if (content?.showAnswerOfId === true) {
            if (content?.inputLeft === false) {
                content?.question.forEach((item, index) => {
                    if (fillAppli[index]) {
                        fillAppli[index].value = item?.answer.replaceAll("<br/>", "\n");
                        autoResizeTextarea(fillAppli[index]);
                        fillAppli[index].classList.add("pointer-none");
                    }
                });
            }
            else {
                const row = $(`.rowContainer`);
                row.map((index, item) => {
                    const inputs = $(item).children().find('.fillAppli');
                    inputs.map((_, input) => {
                        const type = input.dataset.type;
                        input.value = type == 'left' ? content?.question[index].text : content?.question[index].answer;
                        input.classList.add("pointer-none");
                    });
                });
            }
        } else {
            const qID = content?.showAnswerOfId;
            if (Number(qID)) {
                if (qID < 0 || qID > content?.question.length) return false;

                const question = content?.question.filter(item => item.id == qID);
                const index = Number(qID - 1);
                if (content?.inputLeft === false) {
                    if (!fillAppli[index]) return false;

                    fillAppli[index].value = question[0]?.answer?.replaceAll("<br/>", "\n");
                    fillAppli[index].classList.add('pointer-none');
                } else {
                    const row = $(`.rowContainer`).eq(index).children().find('.fillAppli');
                    row.map((_, item) => {
                        const type = item.dataset.type
                        item.value = type == 'left' ? question[0].text : question[0].answer;
                        item.classList.add('pointer-none');
                    });
                }
                autoResizeTextarea(fillAppli[index]);
            }
        }
    }

    const autoResizeTextarea = (el) => {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }

    const getAllTextareas = () => {
        return document.querySelectorAll(".fillAppli");
    }

    const showAnswer = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};

        $(".submit-btn").addClass("noClicked");
        if (content.inputLeft == false) {
            const fillAppli = document.querySelectorAll(".fillAppli");
            content?.question.forEach((item, index) => {
                if (fillAppli[index]) {
                    fillAppli[index].value = item.answer.replaceAll("<br/>", "\n");
                    autoResizeTextarea(fillAppli[index]);
                }
            });
            $(".fillAppli").css("overflow", "hidden");
            $(".fillAppli").addClass("pointer-none");
        } else {
            const fillAppLeft = document.querySelectorAll('.fillAppli[data-type="left"]');
            const fillAppRight = document.querySelectorAll('.fillAppli[data-type="right"]');
            content?.question.forEach((item, index) => {
                if (fillAppLeft[index]) {
                    fillAppLeft[index].value = item.text.replaceAll("<br/>", "\n");
                }

                if (fillAppRight[index]) {
                    fillAppRight[index].value = item.answer.replaceAll("<br/>", "\n");
                }
                autoResizeTextarea(fillAppRight[index]);
                autoResizeTextarea(fillAppLeft[index]);
            });
        }
    }

    const resetActivity = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};

        $(".submit-btn").removeClass("noClicked");
        $(".fillAppli").removeClass("pointer-none");

        if (content.inputLeft == false) {
            let fillAppli = document.querySelectorAll(".fillAppli");
            content.question.forEach((item, index) => {
                if (fillAppli[index]) {
                    if (index === content.showAnswer) {
                        fillAppli[index].value = item.ans.replaceAll("<br/>", "\n");
                    } else {
                        fillAppli[index].value = "";
                    }
                    autoResizeTextarea(fillAppli[index]);
                }
            });
        }
        else {
            const textareas = getAllTextareas();
            textareas.forEach((ta) => {
                ta.value = "";
                ta.classList.remove("pointer-none", "correctAnswer", "wrongAnswer");
            });
        }
    }

    const checkAnswers = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};
        const lang = activity?.lang ?? 'en';

        if (content?.inputLeft == false) {

            let fillAppli = document.querySelectorAll(".fillAppli");
            let correct = 0;

            content?.question.forEach((item, index) => {
                if (fillAppli[index].value.trim() !== "" &&
                    fillAppli[index].value.trim() === item.answer.replaceAll("<br/>", "\n")
                ) {
                    correct++;
                }
            });

            let score = (correct / fillAppli.length) * 100;
            let finalScore = score.toFixed(0);

            const popupLabels = Activity.translatePopupLabels(lang);
            const scoreText = popupLabels.scored(correct, fillAppli.length);

            // SCORE BASED ALERT
            if (finalScore == 0) {
                Swal.fire({
                    icon: "error",
                    title: popupLabels.oops,
                    text: scoreText
                });
            } else if (finalScore <= 50) {
                Swal.fire({
                    icon: "warning",
                    title: popupLabels.notBad,
                    text: scoreText
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: popupLabels.excellent,
                    text: scoreText
                });
            }
        } else {
            let score = 0;

            const fillAppLeft = document.querySelectorAll('.fillAppli[data-type="left"]');
            const fillAppRight = document.querySelectorAll('.fillAppli[data-type="right"]');
            const total = fillAppLeft.length + fillAppRight.length;

            content?.question.forEach((item, index) => {
                if (fillAppLeft[index]) {
                    const correctAnswer = item.text.replaceAll("<br/>", "\n");
                    if (fillAppLeft[index].value.trim() === correctAnswer.trim()) {
                        score++;
                        fillAppLeft[index].classList.add('correctAnswer');
                        fillAppLeft[index].classList.remove('wrongAnswer');
                    } else {
                        fillAppLeft[index].classList.remove('correctAnswer');
                        fillAppLeft[index].classList.add('wrongAnswer');
                    }
                }

                if (fillAppRight[index]) {
                    const correctAnswer = item.answer.replaceAll("<br/>", "\n");
                    if (fillAppLeft[index].value.trim() === correctAnswer.trim()) {
                        score++;
                        fillAppLeft[index].classList.add('correctAnswer');
                        fillAppLeft[index].classList.remove('wrongAnswer');
                    } else {
                        fillAppLeft[index].classList.remove('correctAnswer');
                        fillAppLeft[index].classList.add('wrongAnswer');
                    }
                }
                autoResizeTextarea(fillAppRight[index]);
                autoResizeTextarea(fillAppLeft[index]);
            });

            let iconType = "info";

            if (score === total) {
                iconType = "success";
            } else if (score === 0) {
                iconType = "error";
            } else {
                iconType = "info";
            }

            const popupLabels = Activity.translatePopupLabels(lang);
            const totalScoreTxt = popupLabels.pointsScored(score, total);
            Swal.fire({
                title: popupLabels.info,
                text: totalScoreTxt,
                icon: iconType,
                confirmButtonText: popupLabels.ok
            });
        }
    }

    return {
        render: renderActivity
    }

})();

const ClickOnImage = (() => {
    const containerId = 'clickOnImage-container';

    Activity.css('fillHindi.css');

    const default_smallScreen_width = '100px';
    const default_smallScreen_height = '100px';

    const default_largeScreen_width = '200px';
    const default_largeScreen_height = '200px';

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);


            parent.innerHTML = `<div class="question">
                                <div class="container" id="${containerId}">
                                    <div class="container">
                                        <div class="wrapers">
                                            <div class="menHeading text-center ${Define.get('head')}" id="mainHRach"></div>
                                            <div class="nameOfTopic text-center ${Define.get('subHead')}" id="subHeadRach"></div>
                                            <div class="clikImhCRow row g-0" id="clikImhCRow"></div>
                                            <div class="buttons machiNgs">
                                                <button class="submit-btn">${buttonLabel.check}</button>
                                                <button class="show-btn">${buttonLabel.show}</button>
                                                <button class="reset-btn">${buttonLabel.try}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
            // ..

            Activity.setHeader(questionId);
            Activity.setQid(`#${containerId}`, questionId);

            const submitBtn = parent.querySelector('.submit-btn');
            const showAnsBtn = parent.querySelector('.show-btn');
            const retryBtn = parent.querySelector('.reset-btn');

            if (submitBtn) submitBtn.addEventListener('click', checkAnswers);
            if (showAnsBtn) showAnsBtn.addEventListener('click', showAnswers);
            if (retryBtn) retryBtn.addEventListener('click', resetActivity);

        } catch (err) {
            console.error('clickOnImage.ui :', err);
        }
    };

    const renderActivity = (questionId) => {
        ui(questionId);

        const activity = Activity.getDefine(questionId) ?? {};
        const content = activity?.content ?? {};

        const clikImhCRow = document.getElementById("clikImhCRow");

        const isAndroid = window.innerWidth <= 480;
        const imgWidth = content?.width ?? default_largeScreen_width;
        const imgHeight = content?.height ?? default_largeScreen_height;

        const width = isAndroid ? default_smallScreen_width : imgWidth;
        const height = isAndroid ? default_smallScreen_height : imgHeight;

        content?.question.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'imgClick shadow-sm';
            div.style.width = width;
            div.style.height = height;
            div.style.margin = "5px";
            div.setAttribute('data-index', index);
            div.classList.add('col-3');
            div.innerHTML = `<img src="${Activity.pathToCWD() + item.path}" alt="img-${index}" style="width:100%; height:100%;">`;
            clikImhCRow.appendChild(div);
        });

        clikImhCRow.addEventListener('click', (e) => {
            const card = e.target.closest('.imgClick');
            if (!card) return;
            card.classList.toggle('selectedClickImgs');
            card.classList.remove('correct-borderClickImgs', 'wrong-borderClickImgs');
        });

        window.addEventListener("resize", () => {
            resizeFn(width, height)
        });
    }

    const resizeFn = (width, height) => {
        const isAndroidResize = window.innerWidth <= 480;
        document.querySelectorAll(".imgClick").forEach(div => {
            div.style.width = isAndroidResize ? default_smallScreen_width : width;
            div.style.height = isAndroidResize ? default_smallScreen_height : height;
        });
    }

    const checkAnswers = () => {

        const selectedCards = document.querySelectorAll('.imgClick.selectedClickImgs');

        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};
        const question = content?.question ?? [];
        const lang = activity.lang ?? 'en';
        const popupLabels = Activity.translatePopupLabels(lang);

        if (selectedCards.length === 0) {
            document.querySelectorAll('.imgClick').forEach(card => {
                card.classList.remove('correct-borderClickImgs', 'wrong-borderClickImgs');
            });

            Swal.fire({
                icon: 'warning',
                title: popupLabels.oops,
                text: popupLabels.selectImageFirst
            });
            return;
        }

        let allCorrect = false;
        let correctCount = 0;

        content?.question.forEach((item, index) => {
            const card = document.querySelector(`.imgClick[data-index="${index}"]`);
            card.classList.remove('correct-borderClickImgs', 'wrong-borderClickImgs');

            const selectedCard = document.querySelector(`.imgClick[data-index="${index}"].selectedClickImgs`);

            const isSelected = card.classList.contains('selectedClickImgs');
            const isRight = item?.answer === true;

            if (isRight && isSelected) {
                correctCount++;
                selectedCard?.classList.add('correct-borderClickImgs');
            } else {
                selectedCard?.classList.add('wrong-borderClickImgs');
            }
        });

        if (correctCount === totalCount.length) {
            Swal.fire({ icon: 'success', title: popupLabels.excellent, text: popupLabels.allCorrect });
        } else {
            Swal.fire({ icon: 'error', title: popupLabels.oops, text: popupLabels.scored(correctCount, totalCount.length) });
        }
    }

    const resetActivity = () => {
        $(".submit-btn").removeClass("noClicked");
        document.querySelectorAll('.imgClick').forEach(card => {
            card.classList.remove('selectedClickImgs', 'correct-borderClickImgs', 'wrong-borderClickImgs');
        });
    }

    const showAnswers = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};

        $(".submit-btn").addClass("noClicked");
        content?.question.forEach((item, index) => {
            const card = document.querySelector(`.imgClick[data-index="${index}"]`);
            card.classList.remove('selectedClickImgs', 'wrong-borderClickImgs', 'correct-borderClickImgs');
            if (item?.answer === true) card.classList.add('correct-borderClickImgs');
        });
    }

    return {
        render: renderActivity
    }

})();

const FillOnClick = (() => {
    const containerId = 'fillOnclick-container';

    Activity.css('reading.css');

    const ui = (questionId) => {
        try {

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                <div class="container" id="${containerId}">
                                    <div class="container">
                                        <div class="wrapers">                                            
                                            <div class="instTextEng ${Define.get('head')}"></div>
                                            <div id="readingHolders"></div>
                                            <div id="rowOpts"></div>
                                            <div class="buttons machiNgs">
                                                <button class="submit-btn">${buttonLabel.check}</button>
                                                <button class="show-btn">${buttonLabel.show}</button>
                                                <button class="reset-btn">${buttonLabel.try}</button>
                                            </div>
                                            <div id="reportBoxReading" class="reportBoxReading"></div>
                                        </div>
                                    </div>
                                </div>
                                `;
            // ..

            Activity.setHeader(questionId);
            Activity.setQid(`#${containerId}`, questionId);

            const submitBtn = parent.querySelector('.submit-btn');
            const showAnsBtn = parent.querySelector('.show-btn');
            const retryBtn = parent.querySelector('.reset-btn');

            if (submitBtn) submitBtn.addEventListener('click', checkAnswers);
            if (showAnsBtn) showAnsBtn.addEventListener('click', showAnswers);
            if (retryBtn) retryBtn.addEventListener('click', resetActivity);

        } catch (err) {
            console.error('fillOnClick.ui :', err);
        }
    };

    const renderActivity = (questionId) => {
        ui(questionId);

        const container = Define.get('questionContainer');
        const parent = document.querySelector(container);

        const activity = Activity.getDefine(questionId) ?? {};
        const content = activity?.content ?? {};

        const replacement = content?.replacement ?? '#_#';
        const rowOpts = document.getElementById("rowOpts");

        const opts = [];
        content?.question.map((item, index) => {
            const modifiedText = item?.text.replace(replacement, `<input type="text" data-q="${index}" class="form-control clickToFillsRed fullInputs"/>`);
            const optionsHtml = item?.options.map((opt) =>
                `<div class="clickedLetter" data-opt="${opt}" data-q="${index}">${opt}</div>`
            ).join("");

            const html = `<div class="rowFillClick">
                            <div class="firstColRe">
                                <div class="levelsLe">${index + 1} </div>
                                <div class="withInputsRowsRed">${modifiedText}</div>
                            </div>
                            <div class="optionsBoxClicked">${optionsHtml}</div>
                        </div>`;
            // ..
            opts.push(html);
        });
        rowOpts.innerHTML = opts.join('');

        const option = parent.querySelectorAll('.clickedLetter');

        if (option) {
            option.forEach((opt) => {
                opt.addEventListener('click', selectOption);
            });
        }
    }

    const selectOption = (e) => {
        const qIndex = e.target.getAttribute("data-q");
        const inputBox = document.querySelector(`input[data-q="${qIndex}"]`);
        const val = e.target.innerText.trim();

        inputBox.value = val;
        inputBox.style.width = (val.length + 1) * 11 + "px";

        document.querySelectorAll(`.clickedLetter[data-q="${qIndex}"]`)
            .forEach(o => o.classList.remove("activeOpt"));
        e.target.classList.add("activeOpt");
    }

    const checkAnswers = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};

        const lang = activity.lang ?? 'en';

        $("#reportBoxReading").show();
        let score = 0;

        const t = Activity.translatePopupLabels(lang);

        let reportHTML = `<div class="ReadingActCard effectFadeScale">
                            <button id="closeReport" class="ReadingActCloseBtn">✖</button>
                            <h2 class="ReadingActTitle">🎉 ${t.result} 🤪</h2>
                            <div class="ReadingActItemsBox">`;

        content?.question.map((item, index) => {
            const userVal = document.querySelector(`input[data-q="${index}"]`).value.trim();
            const correctAns = item?.options[item.answer];
            const isCorrect = userVal.toLowerCase() === correctAns.toLowerCase();
            if (isCorrect) score++;

            reportHTML += `<div class="ReadingActItem ${isCorrect ? "ReadingActCorrect" : "ReadingActWrong"}">
                            <div class="ReadingActQno">${index + 1}.</div>
                            <div class="ReadingActAnswerBox">
                                <p><strong>${t.yourAnswer}:</strong> <span>${userVal || `😶 ${t.notAttempted}?`}</span></p>
                                <p><strong>${t.correctAnswer}:</strong> <span>${correctAns}</span></p>
                            </div>
                            <div class="ReadingActEmoji">${isCorrect ? "😎✔" : "😭❌"}</div>
                        </div>`;
        });

        reportHTML += `</div>
                        <h2 class="ReadingActScore">🏆 ${t.score}: ${score}/${content?.question.length}</h2>
                        </div>`;

        document.getElementById("reportBoxReading").innerHTML = reportHTML;

        document.getElementById("closeReport").addEventListener("click", () => {
            $("#reportBoxReading").hide();
            document.getElementById("reportBoxReading").innerHTML = "";
        });
    }

    const resetActivity = () => {
        $(".submit-btn").removeClass("noclickMe");
        document.querySelectorAll(".fullInputs").forEach(inp => {
            inp.value = "";
            inp.style.width = "120px";
        });
        document.querySelectorAll(".clickedLetter").forEach(opt => {
            opt.classList.remove("activeOpt");
        });
        $("#reportBoxReading").hide();
        document.getElementById("reportBoxReading").innerHTML = "";
    }

    const showAnswers = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? {};

        $(".submit-btn").addClass("noclickMe");
        content?.question.map((item, index) => {
            const correct = item?.options[item?.answer];
            if (!correct) return;
            const inp = document.querySelector(`input[data-q="${index}"]`);
            inp.value = correct;
            inp.style.width = (correct.length + 1) * 11 + "px";

            const options = document.querySelectorAll(`.clickedLetter[data-q="${index}"]`);
            options.forEach(o => {
                o.classList.remove("activeOpt");
                if (o.innerText.trim() === correct) {
                    o.classList.add("activeOpt");
                }
            });
        });
    }

    return {
        render: renderActivity
    }

})();

const Dictionary = (() => {
    const containerId = 'dictionary-container';

    Activity.css('dictionary.css');

    const ui = (questionId) => {
        try {

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';

            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                <div class="container" id="${containerId}">
                                    <div class="wrapers">
                                        <div class="menHeDic">
                                            <div class="dictHeadintTexts">
                                                <span class="${Define.get('head')}"></span>
                                                <span class="secondTextsRed ${Define.get('subHead')}"></span>
                                            </div>
                                        </div>
                                        <div id="dictionaryHolders"></div>
                                        <div class="buttons machiNgs">
                                            <button class="submit-btn">${buttonLabel.check}</button>
                                            <button class="show-btn">${buttonLabel.show}</button>
                                            <button class="reset-btn">${buttonLabel.try}</button>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            Activity.setHeader(questionId);
            Activity.setQid(`#${containerId}`, questionId);

            const submitBtn = parent.querySelector('.submit-btn');
            const showAnsBtn = parent.querySelector('.show-btn');
            const retryBtn = parent.querySelector('.reset-btn');

            if (submitBtn) submitBtn.addEventListener('click', checkAnswers);
            if (showAnsBtn) showAnsBtn.addEventListener('click', showAnswers);
            if (retryBtn) retryBtn.addEventListener('click', resetActivity);

        } catch (err) {
            console.error('Dictionary.ui :', err);
        }
    };

    const renderActivity = (questionId) => {
        ui(questionId);

        const activity = Activity.getDefine(questionId) ?? {};
        const lang = activity.lang ?? 'en';
        const content = activity?.content ?? [];

        const dictionaryHolders = document.getElementById("dictionaryHolders");
        let dropBoxes = "";
        for (let i = 0; i <= 25; i++) {
            const alpha = Activity.translateBulletLabels({ lang: lang, ind: i, upperCase: true });
            dropBoxes += `<div class="dropBoxDictP shadow-sm">
                            <div class="letterNums shadow-sm">${alpha}</div>
                            <div class="dropBoxDict" data-accept="${alpha}"></div>
                        </div>`;
        }

        const html = `<div class="row">
                            <div class="col-md-4 col-sm-4 col-12">
                                <div class="boxOfItem shadow-sm dragItems" id="optHolders"></div>
                            </div>
                            <div class="col-md-8 col-sm-8 col-12">
                                <div class="shadow-sm dropSectDic">
                                    ${dropBoxes}
                                </div>
                            </div>
                        </div>`;

        dictionaryHolders.innerHTML = html;

        const optHolders = document.getElementById("optHolders");

        content.forEach(item => {
            const firstLetter = item.trim()[0].toUpperCase();
            optHolders.innerHTML += `<div class="disDragItems wordDragDic" data-ans="${firstLetter}">${item}</div>`;
        });

        makeDraggable(".wordDragDic");
        initDroppable(".container");
    }

    const makeDraggable = (selector) => {
        $(selector).draggable({
            helper: "original",
            revert: "invalid",
        });
    }

    const initDroppable = (containerSelector) => {
        $(`${containerSelector} .dropBoxDict`).droppable({
            accept: ".wordDragDic",
            drop: function (event, ui) {
                const $dragged = ui.draggable;
                $dragged.css({ position: "relative", top: "auto", left: "auto" });
                $(this).append($dragged);
            }
        });
        $(`${containerSelector} .dragItems`).droppable({
            accept: ".wordDragDic",
            drop: function (event, ui) {
                const $dragged = ui.draggable;
                $dragged.css({ position: "relative", top: "auto", left: "auto" });
                $(this).append($dragged);
            }
        });
    }

    const checkAnswers = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity.lang ?? 'en';
        const content = activity?.content ?? [];

        let correct = 0;
        const totalWords = content.length;
        $(".dropBoxDict").each(function () {
            const correctLetter = $(this).attr("data-accept");
            $(this).children(".wordDragDic").each(function () {
                const droppedItem = $(this);
                if (droppedItem.attr("data-ans") === correctLetter) {
                    droppedItem.css("background", "#c8e6c9");
                    correct++;
                } else {
                    droppedItem.css("background", "#ffcdd2");
                }
            });
        });
        const popupLabels = Activity.translatePopupLabels(lang);

        if (correct === totalWords) {
            Swal.fire({
                title: "🎉" + popupLabels.excellent,
                text: popupLabels.allCorrect,
                icon: "success",
                confirmButtonText: popupLabels.ok
            });
        } else {
            Swal.fire({
                title: popupLabels.oops + "💪",
                text: popupLabels.scored(correct, totalWords),
                icon: "info",
                confirmButtonText: popupLabels.ok
            });
        }
    }

    const resetActivity = () => {
        $(".submit-btn").removeClass("noclickMe");
        renderActivity(Activity.getQid(`#${containerId}`));
    }

    const showAnswers = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const content = activity?.content ?? [];

        $(".submit-btn").addClass("disabled");
        $(".dropBoxDict").empty();
        content.forEach(item => {
            const letter = item.trim()[0].toUpperCase();
            const $clone = $(`<div class="disDragItems wordDragDic">${item}</div>`)
                .css("background", "#c8e6c9")
                .attr("data-ans", letter);
            // ..
            $(`.dropBoxDict[data-accept='${letter}']`).append($clone);
        });
        $(".dropBoxDict").droppable("disable");
    }

    return {
        render: renderActivity
    }

})();

const MentalMath = (() => {
    Activity.css('math.css');

    const containerId = 'mental-container';
    const questionTextId = 'dynamicTypeArea';
    const questionContentCls = 'boxForAttemptedMath';
    const dropOptionsMathCls = 'drpOptionsMath';
    const draggableOptionCls = 'disDragItemsMath';
    const dropAreaCls = 'dropArea';

    let shuffledQuestions;
    let currentQuesIndex = 0;
    let currentScore = 0;
    let correctDropCount = 0;

    let __questionID;

    MathJax = {
        tex: {
            inlineMath: [
                ["\\(", "\\)"],
                ["\\[", "\\]"]
            ]
        }
    };

    const ui = async (questionId) => {
        try {
            __questionID = questionId;

            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error('ui container not found:', container);
                return;
            }

            await Define.get('loadScript')('js/tex-chtml.js');

            currentQuesIndex = 0;
            currentScore = 0;
            correctDropCount = 0;

            const activity = Activity.getDefine(questionId) ?? {};
            const content = activity?.content ?? [];
            const questions = content?.questions ?? [];
            const lang = activity.lang ?? 'en';
            shuffledQuestions = content?.shuffle === true
                ? (Activity.shuffleArray(questions) ?? [])
                : questions;

            parent.innerHTML = `<div class="question">
                                    <div class="container" id="${containerId}">
                                        ${activity?.head
                    ?
                    `<div class="menHeDicMath text-center">
                                                        <span class="menHeadingMath ${Define.get('head')}"></span>
                                                        ${activity?.subhead
                        ? ` (<span class="secondTextsRedMath ${Define.get('subHead')}"></span>)`
                        : ''
                    }
                                                    </div>`
                    : ''
                }
                                        <div class="${dropOptionsMathCls}" id="optLoop"></div>
                                        <div class="${questionContentCls} shadow-sm"></div>
                                    </div>
                                </div>`;
            // ..
            Activity.setHeader(questionId);

            if (!Activity.setQid(`#${containerId}`, questionId)) return false;
            renderQuestion();

        } catch (err) {
            console.error('MentalMath.ui :', err);
        }
    };

    const renderQuestion = () => {
        try {

            const activity = Activity.getDefine(Activity.getQid(containerId)) ?? {};
            const lang = activity?.lang ?? 'en';
            const question = shuffledQuestions[currentQuesIndex];

            const options = [];
            question?.options.forEach((item, i) => {
                const html = `<div class="${draggableOptionCls}" data-index="${i}">${item}</div>`;
                options.push(html);
            });
            $(`.${dropOptionsMathCls}`).html(options.join(''));
            makeDraggable(`.${draggableOptionCls}`);

            const html = `
                            <div class="numAndNumof">
                                <div class="qnuMath">
                                    Question : ${currentQuesIndex + 1} / ${shuffledQuestions.length}
                                </div>
                                <div class="qnuMath">Score : ${currentScore}</div>
                            </div>
                            <div id="${questionTextId}"></div>
                        `;
            // ..
            $(`.${questionContentCls}`).html(html);
            operatorUI(question);

        } catch (err) {
            console.error('MentalMath.renderQuestion :', err);
        }
    };

    const makeDraggable = (selector) => {
        try {
            $(selector).draggable({
                helper: 'clone',
                revert: 'invalid',
            });
        } catch (err) {
            console.error('MentalMath.makeDraggable :', err);
        }
    }

    const operatorUI = (question) => {
        try {
            let html;

            switch (question.type) {
                case '+':
                    html = `
                                <div class="rowT1">
                                <div class="opraterMath">${question.type}</div>
                                <div class="dititalText">
                                    <div class="textDigit">
                                        ${question.text.map(txt => `<div>${txt}</div>`).join('')}
                                    </div>
                                </div>
                                </div>
                                <div class="dropAnsBoxes ${dropAreaCls}"></div>
                            `;
                    // ..
                    break;

                case 'x':
                    const data = shuffledQuestions[currentQuesIndex];

                    const imageWidth = (data?.image && data.image?.width) ? data.image.width : '15%';
                    const imgReplacement = (data?.image && data.image?.replacement) ? data.image?.replacement : '#img#';
                    const image = (data?.image && data.image?.path)
                        ? `<img class="mx-2" src="${Activity.pathToCWD() + data.image.path}" style="width:${imageWidth};">`
                        : '';
                    // ..

                    const quesText = (data?.text && (Array(data?.text[0]) !== undefined))
                        ? data?.text[0] : '';

                    const replacement = data?.replacement ?? '#_#';
                    const content = quesText.replace(imgReplacement, image)
                        .replaceAll(
                            replacement,
                            `<div class="dropAnsBoxes2 ${dropAreaCls}"></div>`
                        );
                    // ..

                    html = `<div class="multifillBox">${content}</div>`;
                    break;

                default:
                    html = `<div class="dropAnsBoxes ${dropAreaCls}"></div>`;
            }

            const area = document.getElementById(questionTextId);
            if (area) area.innerHTML = html;

            makeDroppable(`.${dropAreaCls}`);
            MathJax.typesetPromise();

        } catch (err) {
            console.error('MentalMath.operatorUI :', err);
        }
    }

    const makeDroppable = (selector) => {
        try {
            const correctAnswers = shuffledQuestions[currentQuesIndex].correct;
            const totalDrops = Array.isArray(correctAnswers) ? correctAnswers.length : 1;

            $(selector).droppable({
                accept: `.${draggableOptionCls}`,
                tolerance: 'intersect',
                drop: function (event, ui) {
                    const ansIndex = parseInt(ui.draggable.attr('data-index'));
                    const pos = $(selector).index(this);

                    const isCorrect = correctAnswers[pos] === ansIndex;

                    if (isCorrect) {
                        const dragWidth = ui.draggable.outerWidth();
                        $(this).css({
                            'width': dragWidth + 'px',
                            'background': '#c8e6c9',
                            'transition': '0.3s'
                        });

                        $(this).html(
                            ui.draggable.clone()
                                .removeClass(draggableOptionCls)
                                .addClass('fixedDrop')
                        );
                        $(this).droppable('disable');

                        correctDropCount++;

                        if (correctDropCount === totalDrops) {
                            setTimeout(() => {
                                correctDropCount = 0;
                                currentScore++;
                                updateScore();
                                if ((currentQuesIndex + 1) === shuffledQuestions.length) {
                                    showFunnySuccess();
                                } else {
                                    currentQuesIndex++;
                                    renderQuestion();
                                }
                            }, 900);
                        }

                    } else {
                        $(this).css('background', '#ffcdd2');
                        $(this).addClass('shake');
                        setTimeout(() => $(this).removeClass('shake'), 600);
                    }
                }
            });
        } catch (err) {
            console.error('MentalMath.makeDroppable :', err);
        }
    }

    const updateScore = () => {
        $('.qnuMath').html(`Score : ${currentScore}`);
    }

    const showFunnySuccess = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`)) ?? {};
        const lang = activity?.lang ?? 'en';
        const popupLabels = Activity.translatePopupLabels(lang);
        const buttonLabels = Activity.translateButtonLabels(lang);

        Swal.fire({
            title: "🎉" + popupLabels.excellent + "🎉",
            html: `
                <b>${popupLabels.unstoppable}</b><br>${popupLabels.superbJob}<br><br>
                <div style="display:flex; gap:15px; justify-content:center;">
                    <button id="restartBtn" style="
                    padding: 10px 20px;
                    border: none;
                    background: #ff9800;
                    color: white;
                    font-weight: bold;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 18px;
                    ">🔁 ${buttonLabels.replay}</button>

                    <button id="closeBtn" style="
                    padding: 10px 20px;
                    border: none;
                    background: #f44336;
                    color: white;
                    font-weight: bold;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 18px;
                    ">❌ ${popupLabels.ok}</button>
                </div>
            `,
            icon: "success",
            showConfirmButton: false,
            allowOutsideClick: false
        });

        $(document).on("click", "#restartBtn", function () {
            Swal.close();
            currentQuesIndex = 0;
            currentScore = 0;
            correctDropCount = 0;
            ui(__questionID);
        });

        $(document).on("click", "#closeBtn", function () {
            Swal.close();
        });
    }

    return { render: ui }
})();

const AudioAndVideoFromYoutube = (() => {
    Activity.css('audioVideoYoutube.css');

    const containerId = 'youtube-container';
    const playerCont = 'plyItems';
    const playerViewId = 'playerViewContainer';
    let __currentIndex;
    let __currentItem;
    let __ytPlayer;
    let __ytReadyResolve;
    let __done = false;

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            parent.innerHTML = `<div class="question">
                                    <div class="container-fluid" id="${containerId}">
                                        <div class="row">
                                            <div class="col-md-3 col-sm-6 col-12">
                                                <div class="leftPanelBoxes">
                                                    <div class="circleWrapper" id="circleWrapper"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-9 col-sm-6 col-12" id="${playerViewId}"></div>
                                        </div>
                                    </div>
                                </div>`;
            // ..
            __playerHtml();

            Activity.setHeader(questionId);
        } catch (err) {
            console.error('AudioAndVideoFromYoutube.ui :', err);
        }
    };

    const render = async (questionId) => {
        try {
            ui(questionId);
            if (!Activity.setQid(`#${containerId}`, questionId)) return false;

            const activity = Activity.getDefine(questionId);
            const content = activity?.content ?? {};
            const buttons = content?.buttons ?? [];

            const buttonUI = () => {
                const buttonHtml = [];
                buttons.map((btn) => {
                    const button = `<div class="circle3D activeCircle3D">${btn?.label ?? ''}</div>`;
                    buttonHtml.push(button);
                });
                $('#circleWrapper').html(buttonHtml.join(''));

                $('.circle3D.activeCircle3D').map((ind, item) => {
                    item.addEventListener('click', () => loadandplay(ind));
                });
            }

            await Define.get('loadScript')('https://www.youtube.com/iframe_api');
            await ytReady;
            buttonUI();

            if (buttons.length) loadandplay(0);
        } catch (err) {
            console.error('AudioAndVideoFromYoutube.render :', err);
        }
    };

    const setActiveCircle = (index) => {
        document.querySelectorAll(".circle3D").forEach((c, i) => {
            c.classList.toggle("activeCircle3D", i === index);
        });
    };

    const __playerHtml = () => {
        $(`#${playerViewId}`).html(`<div id="${playerCont}" class="leftPanelBoxes ${playerCont}"></div>`);
    };

    const loadandplay = (index) => {

        __playerHtml();
        setActiveCircle(index);

        __currentIndex = index;
        __ytPlayer = undefined;
        __currentItem = undefined;
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
        const content = activity?.content ?? {};
        const buttons = content?.buttons ?? [];
        const button = buttons[__currentIndex] ?? false;
        const youTubeID = button?.ytId ?? false;

        if (button === false || youTubeID === false) return false;

        __currentItem = button;
        const isVideo = button?.isVideo ?? false;

        (isVideo === true) ? videoUI(youTubeID) : audioUI(youTubeID);
    };

    const videoUI = (yiId) => {
        youtube(yiId);
        $('iframe').addClass(`vdoFrmMulti`);
    };

    const audioUI = (yiId) => {
        const ui = `<div class="audioPlayerFull">
                        <div class="funBG"></div>
                        <div class="bigCenterCircle" id="bigCircle">
                            <button class="mainPlayBtn" id="playBtn">►</button>
                        </div>
                        <div class="funControls">
                            <button class="funBtn" id="btnReplay">⟲</button>
                            <button class="funBtn" id="btnMute">🔊</button>
                        </div>
                        <div class="progressBox">
                            <input type="range" id="seekBar" value="0" min="0">
                            <div class="timeRowFS">
                                <span id="currTime">00:00</span>
                                <span id="totalTime">00:00</span>
                            </div>
                        </div>                        
                        <div id="ytAudioPlayer" style="width:1px;height:1px;overflow:hidden"></div>
                    </div>`;
        // ..
        $(`.${playerCont}`).html(ui);
        youtube(yiId, 'ytAudioPlayer');

        const playBtn = document.getElementById('playBtn');
        const bigCircle = document.getElementById('bigCircle');
        const seekBar = document.getElementById('seekBar');
        const btnReplay = document.getElementById('btnReplay');
        const btnMute = document.getElementById('btnMute');

        playBtn.onclick = () => {
            if (!__ytPlayer) return;
            const state = __ytPlayer.getPlayerState();
            if (state !== 1) {
                __ytPlayer.playVideo();
                playBtn.textContent = '❚❚';
                bigCircle.classList.add('playing');
            } else {
                __ytPlayer.pauseVideo();
                playBtn.textContent = '►';
                bigCircle.classList.remove('playing');
            }
        };

        btnReplay.onclick = () => {
            if (__ytPlayer) {
                __ytPlayer.seekTo(0);
                __ytPlayer.playVideo();
            }
        };

        btnMute.onclick = () => {
            if (!__ytPlayer) return;
            if (__ytPlayer.isMuted()) {
                __ytPlayer.unMute();
                btnMute.textContent = '🔊';
            } else {
                __ytPlayer.mute();
                btnMute.textContent = '🔇';
            }
        };

        seekBar.oninput = () => {
            if (__ytPlayer) __ytPlayer.seekTo(seekBar.value);
        };
    };

    const youtube = (yiId, selector = playerCont) => {
        __ytPlayer = new YT.Player(selector, {
            height: '1',
            width: '1',
            videoId: yiId,
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    const onPlayerReady = (event) => {
        if (__currentItem?.isVideo !== undefined && __currentItem.isVideo === false) {
            const playBtn = document.getElementById('playBtn');
            const bigCircle = document.getElementById('bigCircle');
            const seekBar = document.getElementById('seekBar');
            const currTime = document.getElementById('currTime');
            const totalTime = document.getElementById('totalTime');

            event.target.playVideo();
            bigCircle.classList.add('playing');
            playBtn.textContent = '❚❚';

            setInterval(() => {
                if (!event.target) return;
                if (event.target.getDuration() === 0) return;
                const duration = Math.round(event.target.getDuration());
                const getCurrentTime = Math.round(event.target.getCurrentTime());

                seekBar.max = Math.round(duration);
                seekBar.value = Math.round(getCurrentTime);
                currTime.textContent = format(getCurrentTime);
                totalTime.textContent = format(duration);
            }, 500);
        }
    };

    const onPlayerStateChange = (event) => {
        if (__currentItem?.isVideo !== undefined && __currentItem.isVideo === false) {
            const playBtn = document.getElementById('playBtn');
            const bigCircle = document.getElementById('bigCircle');

            if (event.data === YT.PlayerState.PLAYING) {
                bigCircle.classList.add('playing');
                playBtn.textContent = '❚❚';
            } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                bigCircle.classList.remove('playing');
                playBtn.textContent = '►';
            }
        }
    };

    const format = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    const ytReady = new Promise(resolve => {
        __ytReadyResolve = resolve;
    });

    window.onYouTubeIframeAPIReady = () => {
        __ytReadyResolve();
    };


    return { render: render }
})();

const MathMoney = (() => {
    Activity.css('math.css');

    const containerId = 'math-money-container';
    const optionViewId = 'option-view';
    const sectionViewId = 'section-view';
    const tableViewId = 'table-view';
    const dragItemClass = 'dragItm2';
    const dropBoxClass = 'dropBoxItem';

    let __answers;
    let __correctCount = 0;

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            parent.innerHTML = `<div class="question">
                                    <div class="container" id="${containerId}">
                                        <div class="menHeDicMath">
                                            <div class="menHeadingMath ${Define.get('head')}"></div>
                                        </div>
                                        <div id="${optionViewId}" class="drpOptionsMath"></div>
                                        <div id="${sectionViewId}" class="bill-wrapper d-block"></div>
                                        <div id="${tableViewId}" class="table-responsive mt-3 tblsMaths"></div>
                                    </div>
                                </div>`;
            // ..

            Activity.setHeader(questionId);
        } catch (err) {
            console.error('MathMoney.ui :', err);
        }
    };

    const render = (questionId) => {
        try {
            ui(questionId);
            if (!Activity.setQid(`#${containerId}`, questionId)) return false;

            __correctCount = 0;
            const activity = Activity.getDefine(questionId);
            const content = activity?.content ?? {};
            const options = Activity.shuffleArray(content?.options ?? []) ?? [];
            const section = content?.section ?? {};
            const table = content?.table ?? {};
            __answers = table?.body.map((tr) => tr.map((td, index) => ({ ...td, index })).filter(td => td?.drop));
            const isSection = (Object.keys(section).length && section.visible != undefined)
                ? section.visible
                : false;
            // ..

            const optionsHtml = [];
            options.map((opt) => {
                const html = `<div class="disDragItemsMath ${dragItemClass} ui-draggable ui-draggable-handle">${opt}</div>`
                optionsHtml.push(html);
            });

            const sectionHtml = [];
            if (isSection) {
                if (section?.heading) {
                    const sectionHeading =
                        (section?.primary || section?.secondary)
                            ? `
                                <div class="bill-header">
                                    ${section?.primary
                                ? `<h2 class="bill-title">${section.primary}</h2>`
                                : ''
                            }
                                    ${section?.secondary
                                ? `<p class="bill-phone"><strong>Phone:</strong> ${section.secondary}</p>`
                                : ''
                            }
                                </div>
                            `
                            : ''
                    // ..
                    sectionHtml.push(sectionHeading);
                }

                if (section?.list) {
                    const sectionList = `
                        <div class="bill-details">
                            ${section.list.map((list) => {
                        return `
                                        <p>
                                            <strong>${list?.label ?? ''}</strong> ${list?.text ?? ''}
                                        </p>
                                    `;
                    }).join('')
                        }
                        </div>`
                    // ..
                    sectionHtml.push(sectionList);
                }

                if (section?.block) {
                    const block = section.block;
                    const blockHtml = (block?.label || block?.text)
                        ?
                        `<div class="bill-customer">
                                ${block?.label
                            ? `<label>${block.label}</label>`
                            : ''
                        }
                                ${block?.text
                            ? `<div class="customer-address">${block.text}</div>`
                            : ''
                        }
                            </div>`
                        : '';
                    // ..
                    sectionHtml.push(blockHtml);
                }
            }

            const tableHtml = [];
            if (Object.keys(table).length) {
                const tableView = (table?.head || table?.body)
                    ?
                    `
                            <table class="table table-bordered">
                                ${table?.head
                        ?
                        `<thead><tr>
                                                ${table?.head.map((th) => {
                            return `<th>${th}</th>`
                        }).join('')
                        }
                                            </tr></thead>`
                        : ''
                    }
                                ${table?.body
                        ?
                        `<tbody>
                                                ${table?.body.map((tr) => {
                            return `<tr>
                                                        ${tr.map((td) => {
                                const colspan = td?.colspan ?? '';
                                const classes = td?.class ?? '';
                                const tdView = `
                                                                    <td colspan="${colspan}" class="${classes}">
                                                                    ${(td?.drop && td?.drop === true)
                                        ? `<div class="${dropBoxClass} ui-droppable"></div>`
                                        : td?.value ?? ''
                                    }
                                                                    </td>`
                                // ..
                                return tdView;
                            }).join('')
                                }
                                                        </tr>`
                        }).join('')
                        }
                                            </tbody>`
                        : ''
                    }
                            </table>
                        `
                    : '';
                // ..
                tableHtml.push(tableView);
            }

            $(`#${optionViewId}`).html(optionsHtml.join(''));
            $(`#${sectionViewId}`).html(sectionHtml.join(''));
            $(`#${tableViewId}`).html(tableHtml);

            initDrag();
            initDrop();

        } catch (err) {
            console.error('MathMoney.render :', err);
        }
    };

    const initDrag = () => {
        $(`.${dragItemClass}`).draggable({
            revert: true,
        });
    };

    const initDrop = () => {
        $(`.${dropBoxClass}`).droppable({
            accept: `.${dragItemClass}`,
            tolerance: 'intersect',
            drop: dropHandler
        });
    };

    const dropHandler = (event, ui) => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
        const lang = activity?.lang ?? 'en';

        const text = ui.draggable.text().trim();
        const target = event.target;
        const index = $(target).closest('td').index();
        const trInd = $(target).closest('tr').index();
        const answer = __answers[trInd]
            ?.map((ans) => (ans?.index === index) ? (ans?.value ?? '') : '')
            ?.filter((ans) => ans)
            .toString();
        // ..

        const totalCount = __answers.flat();

        if (answer === text) {
            __correctCount++;
            const html = ui.draggable.clone().removeClass(dragItemClass).addClass('fixedDrop').css('position', 'static');
            $(target).html(html).removeClass('wrongAnsMoney').addClass('correctAnsMoney').droppable('disable');

            if (__correctCount === totalCount.length) {
                const popupLabels = Activity.translatePopupLabels(lang);
                Swal.fire({
                    icon: 'success',
                    title: popupLabels.excellent,
                    text: popupLabels.allCorrect,
                    confirmButtonText: popupLabels.ok
                }).then((res) => {
                    if (res.isConfirmed) {
                        $(`.${dragItemClass}`).draggable('disable');
                    }
                });
            }
        } else {
            $(target).removeClass('correctAnsMoney').addClass('wrongAnsMoney');
            setTimeout(() => $(this).removeClass('wrongAnsMoney'), 600);
            ui.draggable.draggable('option', 'revert', true);
        }
    }

    return {
        render: render
    }
})();

const ShabdRachna = (() => {

    Activity.css('shabdRachna.css');

    const containerId = 'shabd-rachna-container';
    const quesContId = 'questBoxes';
    const dropShabdCls = 'dropSabd';
    const dragShabdCls = 'itmd';

    let __score = 0;

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);

            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getDefine(questionId);
            const lang = activity?.lang ?? 'en';
            const content = activity?.content ?? {};
            const headWidth = content?.width?.heading ?? '250px';

            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container" id="${containerId}">                                        
                                        <div class="nameofChapter d-block ${Define.get('head')}" style="width: ${headWidth};"></div>
                                            <div class="sabadRach">
                                                <div class="headingTextSabad ${Define.get('subHead')}"></div>
                                                <div class="boxAutoScroll" id="${quesContId}"></div>
                                                <div class="buttons machiNgs">
                                                    <button class="submit-btn submitBtnSabd">${buttonLabel.check}</button>
                                                    <button class="show-btn">${buttonLabel.show}</button>
                                                    <button class="reset-btn">${buttonLabel.try}</button>
                                                </div>
                                                <div id="funnyReport" style="display: none;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            const checkBtn = document.querySelector('.submit-btn');
            const showBtn = document.querySelector('.show-btn');
            const resetBtn = document.querySelector('.reset-btn');

            if (checkBtn) checkBtn.addEventListener('click', checkAnswers);
            if (showBtn) showBtn.addEventListener('click', showAnswers);
            if (resetBtn) resetBtn.addEventListener('click', resetAll);

            Activity.setHeader(questionId);
        } catch (err) {
            console.error('ShabdRachna.ui :', err);
        }
    };

    const render = (questionId) => {
        try {
            ui(questionId);
            if (!Activity.setQid(`#${containerId}`, questionId)) return false;

            __score = 0;
            const activity = Activity.getDefine(questionId);
            const lang = activity?.lang ?? 'en';
            const content = activity?.content ?? {};
            const data = content?.data ?? {};
            const replacement = data?.replacement ?? '#_#';
            const bullets = data?.bullets ?? false;
            const questions = data?.questions ?? [];

            const html = questions.map((question, index) => {
                const quesBullet = bullets
                    ?
                    `
                            <div class="headingQSabadRach">
                                (${Activity.translateBulletLabels({ lang: lang, ind: index })})
                            </div>
                        `
                    : '';
                // ..
                const view = question.map((ques, ind) => {
                    const subBullets = Activity.translateBulletLabels({ lang: 'mt', ind: ind });
                    const dragOptions = Activity.shuffleArray(ques?.answer ?? []) ?? [];

                    const dropArea = ques?.text.split('+')
                        .map((item, i) => item.replace(replacement, `<div class="${dropShabdCls}" data-index="${i}"></div>`))
                        .join('<div class="opraterPlus">+</div>');
                    // ..
                    return `
                        <div class="qSabadRach" data-block-index="${index}" data-id="${ques?.id}">
                            <div class="flexRow">
                                <div class="levels">${subBullets}.</div>
                                <div class="drgitm">
                                    ${dragOptions.map((opt) => `<div class="${dragShabdCls}">${opt}</div>`)}
                                </div>
                                <div class="isTO">=</div>
                                <div class="rowInFlSaba">${dropArea}</div>
                            </div>
                        </div>
                    `
                }).join('');

                return [quesBullet, view].join('');
            });

            $(`#${quesContId}`).html(html);
            initDragAndDrop();

        } catch (err) {
            console.error('ShabdRachna.render :', err);
        }
    };

    const initDragAndDrop = () => {
        $(`.${dragShabdCls}`).draggable({
            revert: 'invalid',
            helper: 'clone',
            cursor: 'move'
        });

        $(`.${dropShabdCls}`).droppable({
            accept: `.${dragShabdCls}`,
            drop: function (event, ui) {
                const droppedText = ui.draggable.text();
                $(this).text(droppedText).attr('data-fill', droppedText);
            }
        });
    };

    const checkAnswers = () => {
        __score = 0;
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
        const lang = activity?.lang ?? 'en';
        const content = activity?.content ?? {};
        const data = content?.data ?? {};
        const questions = data?.questions ?? [];

        const set = questions.map((question) => question.map((ques) => ({ answer: ques?.answer.join('') }))).flat();

        [...$(`.rowInFlSaba`)].map((row, i) => {
            const drops = $(row).find(`.${dropShabdCls}`);
            let correctCount = 0;
            let thisTotal = 0;
            [...drops].map((drop) => {
                const parentData = $(drop).closest('.qSabadRach')[0].dataset;
                const mainQuesInd = parentData.blockIndex;
                const subQuesId = parentData.id;
                const dropData = drop.dataset;
                const dropIndex = dropData.index;
                const dropFill = dropData.fill ?? '';
                const answers = questions[mainQuesInd].filter(ques => ques.id == subQuesId)[0]?.answer;
                const answer = answers[dropIndex] ?? '';
                thisTotal = answers.length;
                set[i].user = (set[i].user || '') + dropFill;

                if (answer == dropFill) correctCount++;
            });
            if (correctCount === thisTotal) __score++;
        });

        const popupLabels = Activity.translatePopupLabels(lang);

        const tableRows = set.map((item) => {
            const correct = item.answer === item.user ?? false;
            const text = correct ? popupLabels.correctLabel : popupLabels.wrongLabel;
            const classes = correct ? "correctSabadStatus" : "wrongSabadStatus";

            const row = `
                            <tr class="${classes}">
                                <td>${item.answer}</td>
                                <td>${item.user}</td>
                                <td>${text}</td>
                            </tr>
                        `;
            // ..
            return row;
        }).join('');

        const messages = {
            hi: [
                { min: 100, msg: "आप तो कमाल हो! 🤩 पूरी तरह सही!", emoji: "🧡🎉😁" },
                { min: 70, msg: "बहुत बढ़िया! थोड़ी और practice कर लो!", emoji: "👍😃" },
                { min: 40, msg: "अच्छा है, कोशिश जारी रखें!", emoji: "🙂🤏" },
                { min: 0, msg: "😂 अरे! ये क्या कर दिया? फिर से कोशिश करो!", emoji: "😅😭" }
            ],
            en: [
                { min: 100, msg: "Amazing! All correct! 🤩", emoji: "🧡🎉😁" },
                { min: 70, msg: "Great! A little more practice!", emoji: "👍😃" },
                { min: 40, msg: "Good! Keep trying!", emoji: "🙂🤏" },
                { min: 0, msg: "Oops! Try again! 😂", emoji: "😅😭" }
            ]
        };

        const total = set.length;
        const percent = Math.round((__score / total) * 100);
        const res = messages[lang] ? messages[lang].find(m => percent >= m.min) : messages['en'].find(m => percent >= m.min);

        const tableView = `
            <div class="box" style="animation: 0.5s pop;">
                <div id="rpText">
                    <div class="resultTexts">
                        ${popupLabels.score}: ${__score} / ${total}
                    </div>
                    <div class="emoji" style="font-size:36px; margin:6px 0;">${res.emoji}</div>
                    <div class="messageRes">${res.msg}</div>
                    <div class="table-responsive tblInSch">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>${popupLabels.correctAnswer}</th>
                                    <th>${popupLabels.yourAnswer}</th>
                                    <th>${popupLabels.status}</th>
                                </tr>
                            </thead>
                            <tbody>${tableRows}</tbody>
                        </table>
                    </div>
                </div>
                <button id="funnyBtn">${popupLabels.ok}</button>
            </div>
        `;
        // ..

        $('#funnyReport').html(tableView).css({ 'display': 'flex' });
        $('#funnyBtn')[0].addEventListener('click', closeReport);

    };

    const showAnswers = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
        const content = activity?.content ?? {};
        const data = content?.data ?? {};
        const questions = data?.questions ?? [];

        $('.submitBtnSabd').addClass('noclicked');

        [...$(`.rowInFlSaba`)].map((row, i) => {
            const drops = $(row).find(`.${dropShabdCls}`);
            [...drops].map((drop) => {
                const parentData = $(drop).closest('.qSabadRach')[0].dataset;
                const mainQuesInd = parentData.blockIndex;
                const subQuesId = parentData.id;
                const dropData = drop.dataset;
                const dropIndex = dropData.index;
                const answers = questions[mainQuesInd].filter(ques => ques.id == subQuesId)[0]?.answer;
                const answer = answers[dropIndex] ?? '';
                drop.innerHTML = answer;
                drop.classList.add('correctSabad');
                drop.classList.remove('wrongSabad');
            });
        });
    };

    const resetAll = () => {
        $('.submitBtnSabd').removeClass('noclicked');
        $(`.${dropShabdCls}`).each(function () {
            $(this).text('').removeAttr('data-fill').removeClass('correctSabad wrongSabad');
        });
    };

    const closeReport = () => {
        $("#funnyReport").hide();
    }

    return {
        render: render
    }
})();

const SpellCheck = (() => {

    Activity.css('clickTo.css');

    const containerId = 'spell-check-container';

    const quesClass = 'questInCHeading';
    let activitiesClicked = {};
    let userSelections = {};

    const ui = (questionId) => {
        try {
            const containerSelector = Define.get('questionContainer');
            const parent = document.querySelector(containerSelector);
            if (!parent) {
                console.error("ui container not found:", containerSelector);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container" id="${containerId}">
                                        <div class="${quesClass}">
                                            <div class="questHindi ${Define.get('head')}"></div>
                                        </div>
                                        <div id="datClikToCir"></div>
                                        <div class="buttons machiNgs">
                                            <button class="submit-btn">${buttonLabel.check}</button>
                                            <button class="show-btn">${buttonLabel.show}</button>
                                            <button class="reset-btn">${buttonLabel.try}</button>
                                        </div>
                                    </div>
                                </div>
                                <div id="clickAct">
                                    <div class="baseFixeds">
                                        <div class="report_clicks">
                                        <div
                                            class="d-flex justify-content-between align-items-center">
                                            <h4 id="scoreTextQ1Click" class="text-center"></h4>
                                            <button id="pop-close" class="btn btn-secondary">X</button>
                                        </div>
                                        <div id="datapendReportClick"></div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            const submitBtn = parent.querySelector('.submit-btn');
            const showBtn = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');
            const closepop = parent.querySelector('#pop-close');

            if (submitBtn) submitBtn.addEventListener("click", () => checkAnswer(containerId));
            if (showBtn) showBtn.addEventListener("click", (ev) => showAnswers(containerId, ev.currentTarget));
            if (resetBtn) resetBtn.addEventListener("click", () => resetCircle(containerId));
            if (closepop) closepop.addEventListener("click", closeReportClick);

            Activity.setHeader(questionId);

            if (lang === 'hi') {
                $(function () {
                    $.keyboard.layouts["hindiQuiz"] = Activity.hindiKeyboard();

                    $(".hindiInput")
                        .keyboard({
                            layout: "hindiQuiz",
                            usePreview: false,
                            autoAccept: true,
                        })
                        .addTyping({ showTyping: true, delay: 70 })
                        .addCaret({
                            caretClass: "ui-keyboard-caret",
                            animate: true,
                            blinkRate: 600,
                        });
                });
            }

        } catch (e) {
            console.error('SpellCheck.ui :', e);
        }
    };

    const renderQuestions = (questionId) => {
        ui(questionId);
        if (!Activity.setQid(`#${containerId}`, questionId)) return false;

        const heading = document.querySelector(`.${quesClass}`);
        if (!heading) {
            console.error("renderQuestions: heading element not found");
            return;
        }
        heading.dataset.qid = questionId;

        const renderDiv = document.querySelector(`#datClikToCir`);
        if (!renderDiv) {
            console.error("renderQuestions: render container #datClikToCir not found");
            return;
        }
        renderDiv.innerHTML = "";

        const activity = Activity.getDefine(questionId);
        const content = activity?.content;
        const lang = activity?.lang ?? 'en';
        const replacement = content?.replacement ?? '#';

        if (!Array.isArray(content?.questions)) {
            console.error("renderQuestions: activity question should be an array", content?.questions);
            return;
        }

        activitiesClicked[containerId] = {
            mode: activity.mode || activity?.content?.mode || activity?.mode || 'multi',
            questions: content,
            lang: activity?.content?.lang || activity.lang || 'en'
        };

        if (!userSelections[containerId]) userSelections[containerId] = {};

        content?.questions.forEach((item, ind) => {
            const regex = new RegExp(`${replacement[0]}[^${replacement[0]}]+${replacement[replacement.length - 1]}[.,?!-]?|[^\\s]+[.,?!-]?`, "g");

            if (!item?.text) return false;
            const parts = item?.text.match(regex);
            if (!item?.answer) return false;
            const answers = item?.answer;
            let count = 0;

            const html = parts?.map((part, i) => {
                if (part.trim() === "" || part === ",") return part;
                const match = hasHashPhrases(replacement[0], part);
                let word = match ? part.replaceAll(replacement[0], '') : part;
                let data_word = match ? answers[count] : part;
                const isSymbol = /^[.,?!-]$/.test(part);
                if (match) count++;
                return `<span class="${isSymbol ? 'px-0' : 'clickable'}" data-act="${containerId}" data-id="${item.id}" data-word="${data_word}">
                        ${word}
                    </span>`
            }).join("");

            renderDiv.innerHTML += `
            <div class="questInC border-0" data-id="${item.id}">
                ${content?.questions.length > 1 ?
                    `<span class="label">(${Activity.translateBulletLabels({ lang: lang, ind: ind })})</span>` : ''
                }
                ${html}
            </div>`;

            const input_container = document.createElement('div');
            input_container.id = "inputFlipToCir" + ind;
            input_container.classList.add('questInC', 'row');
            input_container.style.border = "none";

            renderDiv.append(input_container);

            answers.map((_, ind) => {
                input_container.innerHTML += `<div class="col-md-4 col-sm-6 col-12 my-3 d-flex align-items-end">
                                               ${ind + 1}. <input type='text' class='hindiInput inPutHindiNew w-100'/>
                                            </div>`;
            });
        });

        if (!document.__circle_click_attached) {
            document.addEventListener("click", function (e) {
                if (!e.target || !e.target.classList) return;
                if (e.target.classList.contains("clickable")) {
                    const span = e.target;
                    const act = span.dataset.act;
                    const qId = span.dataset.id;

                    const activityMeta = activitiesClicked[act];
                    if (!activityMeta) return;

                    const mode = activityMeta.mode;

                    if (!userSelections[act]) userSelections[act] = {};
                    if (!userSelections[act][qId]) userSelections[act][qId] = [];

                    const spans = document.querySelectorAll(`[data-act="${act}"][data-id="${qId}"].clickable`);
                    const circledCount = Array.from(spans).filter(s => s.classList.contains("circle")).length;

                    const currentQuestion = activityMeta.questions.questions.find(q => q.id == qId);
                    const answersLength = currentQuestion.answer.length;

                    console.log(activityMeta?.mode);

                    if (activityMeta?.mode != 'single') {
                        if (!span.classList.contains("circle") && circledCount >= activityMeta.questions.questions.find(q => q.id == qId).answer.length) {
                            const popupLabels = Activity.translatePopupLabels(activityMeta.lang || 'en');
                            Swal.fire({
                                title: popupLabels.oops,
                                text: popupLabels.maxSelectionReached(answersLength),
                                icon: "warning",
                                confirmButtonText: popupLabels.ok
                            });
                            return;
                        }
                    }

                    if (mode === "single") {
                        const siblings = document.querySelectorAll(`[data-act="${act}"][data-id="${qId}"]`);
                        siblings.forEach(sib => sib.classList.remove("circle"));
                        userSelections[act][qId] = [span.dataset.word];
                        span.classList.add("circle");
                    } else {
                        span.classList.toggle("circle");
                        if (span.classList.contains("circle")) {
                            if (!userSelections[act][qId].includes(span.dataset.word)) {
                                if (span.dataset.word.endsWith('.') || span.dataset.word.endsWith(',')) {
                                    span.dataset.word = span.dataset.word.slice(0, -1);
                                }
                                userSelections[act][qId].push(span.dataset.word);
                            }
                        } else {
                            userSelections[act][qId] = userSelections[act][qId].filter(w => w !== span.dataset.word);
                        }
                    }
                }
            });

            document.__circle_click_attached = true;
        }
    };

    function hasHashPhrases(replacement, str) {
        if (!str) return false;
        const escaped = replacement.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`${escaped}([^${escaped}]+)${escaped}`, "g");

        return regex.test(str);
    }

    const checkAnswer = (dataKeyParam) => {
        const key = dataKeyParam || containerId;
        const container = document.getElementById(key);
        const activity = activitiesClicked[key];
        if (!container || !activity) return;

        const data = activity.questions.questions;
        const lang = activity?.lang ?? 'en';

        let allCirclesSelected = true;

        data.forEach((item) => {
            const answers = Array.isArray(item.answer) ? item.answer.map(a => a.trim()) : [item.answer.trim()];
            const spans = container.querySelectorAll(`[data-id="${item.id}"].clickable`);
            const circledWords = Array.from(spans)
                .filter(span => span.classList.contains("circle"))
                .map(span => span.dataset.word?.trim() || '');

            if (circledWords.length !== answers.length) {
                allCirclesSelected = false;
            }
        });

        if (!allCirclesSelected) {
            const popupLabels = Activity.translatePopupLabels(lang);
            Swal.fire({
                title: popupLabels.oops,
                text: popupLabels.selectAllWrongWords,
                icon: 'error',
                confirmButtonText: popupLabels.ok
            });
            return;
        }

        // --- Check input values (any order, no repetition) ---
        let allInputsFilled = true;

        data.forEach((item, id) => {
            const answers = Array.isArray(item.answer) ? item.answer.map(a => a.trim()) : [item.answer.trim()];
            const input_container = document.getElementById('inputFlipToCir' + id);
            const inputs = input_container.querySelectorAll("input[type='text']");

            const usedAnswers = new Set();
            const inputValues = Array.from(inputs).map(i => i.value.trim());

            if (inputValues.some(v => !v)) {
                allInputsFilled = false;
            }

            inputs.forEach((input) => {
                const value = input.value.trim();
                if (answers.includes(value) && !usedAnswers.has(value)) {
                    usedAnswers.add(value);
                }
            });
        });

        if (!allInputsFilled) {
            const popupLabels = Activity.translatePopupLabels(lang);
            Swal.fire({
                title: popupLabels.oops,
                text: popupLabels.fillAllAnswersCorrectlly,
                icon: 'error',
                confirmButtonText: popupLabels.ok
            });
            return;
        }

        // ✅ Everything correct, show report
        showClickReportClick(activity.questions, userSelections[key], activity.lang || 'en');
    };

    const showAnswers = (dataKeyParam, btn) => {
        const key = dataKeyParam || containerId;
        const container = document.getElementById(key);
        const activity = activitiesClicked[key];
        if (!container || !activity) {
            console.error("showCircle: missing container or activity for", key);
            return;
        }
        const data = activity.questions.questions;

        container.querySelectorAll(".clickable").forEach((el) => {
            el.classList.remove("circle");
        });

        data.forEach((item, ind) => {
            const answers = item?.answer;
            const spans = container.querySelectorAll(`[data-id="${item.id}"] .clickable`);
            const input_container = document.getElementById('inputFlipToCir' + ind);
            const inputs = input_container.querySelectorAll('input');
            spans.forEach((span) => {
                span.classList.add('itemDisabled');
                if (answers.includes(span.dataset.word) && span.dataset.word != span.innerHTML) {
                    span.classList.add("circle");
                }
            });
            inputs.forEach((input, i) => {
                input.value = answers[i];
                input.classList.add('itemDisabled');
            });
        });

        const checkBtn = container.querySelector(".submit-btn");
        if (checkBtn) {
            checkBtn.classList.add("disabled-click");
            checkBtn.disabled = true;
        }
        if (btn && btn.classList) {
            btn.classList.add("clicked-show");
        }

    };

    const resetCircle = (dataKeyParam) => {
        const key = dataKeyParam || containerId;
        const container = document.getElementById(key);
        if (!container) return;

        container.querySelectorAll(".clickable").forEach((el) => {
            el.classList.remove("circle", "itemDisabled");
        });

        const inputs = document.querySelectorAll("[type=text]");
        inputs.forEach((input) => {
            input.value = "";
            input.classList.remove('itemDisabled');
        })

        const checkBtn = container.querySelector(".submit-btn");
        if (checkBtn) {
            checkBtn.classList.remove("disabled-click");
            checkBtn.disabled = false;
        }

        const showBtn = container.querySelector(".show-btn");
        if (showBtn) {
            showBtn.classList.remove("clicked-show");
        }

        userSelections[key] = {};
    };

    const showClickReportClick = (clickData, selections = {}, typeLang = 'en') => {
        $("#clickAct").css("display", "block");
        let correctCount = 0;
        const questions = clickData.questions;
        let totalQues = Array.isArray(questions) ? questions.length : 0;

        let tableHTML = `<div class="table-responsive p-2">
            <table class="table table-bordered" style="font-size:18px">
            <thead class="text-light" style="white-space: nowrap;">
            <tr>
                <th>${typeLang === "hi" ? "प्रश्न संख्या" : "Q. No."}</th>
                <th>${typeLang === "hi" ? "आपका उत्तर" : "Your Answer"}</th>
                <th>${typeLang === "hi" ? "सही उत्तर" : "Correct Answer"}</th>
                <th>${typeLang === "hi" ? "परिणाम" : "Result"}</th>
            </tr>
            </thead>
            <tbody>`;

        (questions || []).forEach((q, i) => {
            const correctAnswers = Array.isArray(q.answer) ? q.answer.map(a => a.trim().toLowerCase()) : [q.answer.trim().toLowerCase()];

            const circledWords = Array.from(
                document.querySelectorAll(`[data-id="${q.id}"] .clickable.circle`)
            ).map(s => s.dataset.word?.trim().toLowerCase() || '');

            const circledWrongWords = Array.from(
                document.querySelectorAll(`[data-id="${q.id}"] .clickable.circle`)
            ).map(s => {
                let word = s.innerHTML?.trim() || '';
                word = word.replace(/[.,!?]$/, '');
                return word;
            });

            const input_container = document.getElementById('inputFlipToCir' + i);
            const inputs = Array.from(input_container.querySelectorAll('input'));
            const inputValues = inputs.map(input => input.value.trim().toLowerCase());

            const allCirclesSelected = circledWords.length === correctAnswers.length
                && correctAnswers.every(ans => circledWords.includes(ans));

            const allInputsCorrect = correctAnswers.every(ans => inputValues.includes(ans));
            const noDuplicates = new Set(inputValues).size === inputValues.length;

            const isCorrect = allCirclesSelected && allInputsCorrect && noDuplicates;

            if (isCorrect) correctCount++;

            const userAnswerText = circledWords.length > 0
                ? `<div>
                    <span class='text-dark'>Incorrect Words:-</span> 
                        ${circledWrongWords.join(',')}
                        </div>` + (inputValues.length ? `<div class='border-top'><span class='text-dark'>Correct Words:-</span> ${inputValues.join(", ")}
                </div>` : "")
                : typeLang === "hi" ? "प्रयास नहीं किया" : "Not Attempted";

            const correctAnswerText = correctAnswers.join(", ");

            tableHTML += `
            <tr>
                <th>${q.label || (i + 1)}</th>
                <td class="${isCorrect ? "text-success" : "text-danger"}">${userAnswerText}</td>
                <td class="text-success">${correctAnswerText}</td>
                <td class="${isCorrect ? "text-success" : "text-danger"}">
                    ${isCorrect ? "✔" : "✘"}
                </td>
            </tr>`;
        });

        tableHTML += `</tbody></table></div>`;

        const reportEl = document.getElementById("datapendReportClick");
        if (reportEl) reportEl.innerHTML = tableHTML;

        const scoreEl = document.getElementById("scoreTextQ1Click");
        if (scoreEl) {
            scoreEl.innerText = typeLang === "hi"
                ? `आपको ${totalQues} में से ${correctCount} अंक मिले हैं`
                : `You scored ${correctCount} out of ${totalQues}`;
        }
    };

    const closeReportClick = () => {
        $("#clickAct").css("display", "none");
        const reportEl = document.getElementById("datapendReportClick");
        if (reportEl) reportEl.innerHTML = "";
    };

    return {
        render: renderQuestions
    };

})();

const SpellItOut = (() => {

    Activity.css('clickTo.css');

    const inputContainer = 'input-container';

    const containerId = 'spell-It-out-container';

    const quesClass = 'questInCHeading';

    const ui = (questionId) => {
        try {
            const containerSelector = Define.get('questionContainer');
            const parent = document.querySelector(containerSelector);
            if (!parent) {
                console.error("ui container not found:", containerSelector);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container" id="${containerId}">
                                        <div class="${quesClass}">
                                            <div class="questHindi ${Define.get('head')}"></div>
                                        </div>
                                        <div class='spell-out-box spell-out-font-23 d-flex flex-wrap gap-2 justify-content-center' id="spell-out-container"></div>
                                        <div id="${inputContainer}" class="spell-out-font spell-out-font-23 mt-3"></div>
                                        <div class="buttons machiNgs">
                                            <button class="submit-btn">${buttonLabel.check}</button>
                                            <button class="reset-btn">${buttonLabel.try}</button>
                                        </div>
                                    </div>
                                </div>
                                <div id="clickAct">
                                    <div class="baseFixeds">
                                        <div class="report_clicks">
                                        <div
                                            class="d-flex justify-content-between align-items-center">
                                            <h4 id="scoreTextQ1Click" class="text-center"></h4>
                                            <button id="pop-close" class="btn btn-secondary">X</button>
                                        </div>
                                        <div id="datapendReportClick"></div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            const submitBtn = parent.querySelector('.submit-btn');
            const resetBtn = parent.querySelector('.reset-btn');

            if (submitBtn) submitBtn.addEventListener("click", checkAnswer);
            if (resetBtn) resetBtn.addEventListener("click", resetActivity);

            Activity.setHeader(questionId);

            if (lang === 'hi') {
                $(function () {
                    $.keyboard.layouts["hindiQuiz"] = Activity.hindiKeyboard();

                    $(".hindiInput")
                        .keyboard({
                            layout: "hindiQuiz",
                            usePreview: false,
                            autoAccept: true,
                        })
                        .addTyping({ showTyping: true, delay: 70 })
                        .addCaret({
                            caretClass: "ui-keyboard-caret",
                            animate: true,
                            blinkRate: 600,
                        });
                });
            }

        } catch (e) {
            console.error('Circle.ui :', e);
        }
    };

    const areAllInputsFilled = (values) => {
        return values.every(v => v !== "");
    };

    const isWordAllowed = (word, allowedWords) => {
        return allowedWords.includes(word);
    };

    const isWordUnique = (word, usedValues) => {
        return !usedValues.has(word);
    };

    const isRowSameValue = (values) => {
        return values.every(v => v === values[0]);
    };

    const checkAnswer = () => {
        const container = document.getElementById(inputContainer);
        const rows = container.querySelectorAll(".row");

        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
        const content = activity?.content ?? {};
        const lang = activity?.lang ?? 'en';

        const words = content?.words ?? [];

        const allowedWords = words.map(w => w.toLowerCase());
        const usedValues = new Set();

        let errorMessage = null;

        rows.forEach((row, rowIndex) => {
            if (errorMessage) return;

            const inputs = row.querySelectorAll("input");
            const values = Array.from(inputs).map(input =>
                input.value.trim().toLowerCase()
            );

            if (!areAllInputsFilled(values)) {
                errorMessage = lang === 'hi'
                    ? `कृपया सभी इनपुट भरें।`
                    : `Please fill all inputs.`;
                return;
            }

            const word = values[0];

            if (!isWordAllowed(word, allowedWords)) {
                errorMessage = lang === 'hi'
                    ? `लाइन ${rowIndex + 1} का शब्द सूची में नहीं है।`
                    : `The word in Line ${rowIndex + 1} is not from the given words.`;
                return;
            }

            if (!isWordUnique(word, usedValues)) {
                errorMessage = lang === 'hi'
                    ? `लाइन ${rowIndex + 1} का शब्द पहले से उपयोग किया गया है।`
                    : `The word in Line ${rowIndex + 1} is already used in another line.`;
                return;
            }

            if (!isRowSameValue(values)) {
                errorMessage = lang === 'hi'
                    ? `लाइन ${rowIndex + 1} में सभी शब्द समान होने चाहिए।`
                    : `All inputs in Line ${rowIndex + 1} must have the same word.`;
                return;
            }

            usedValues.add(word);
        });

        if (errorMessage) {
            const popupLabels = Activity.translatePopupLabels(lang);
            Swal.fire({
                title: popupLabels.oops,
                text: errorMessage,
                icon: 'error',
                confirmButtonText: popupLabels.ok
            });
            return false;
        }

        const popupLabels = Activity.translatePopupLabels(lang);
        Swal.fire({
            title: popupLabels.excellent,
            text: popupLabels.allCorrect,
            icon: 'success',
            confirmButtonText: popupLabels.ok
        });

        return true;
    };

    const resetActivity = () => {
        const container = document.getElementById(inputContainer);
        const inputs = container.querySelectorAll("[type='text");
        inputs.forEach((input) => {
            input.value = "";
        })
    }

    const render = (questionId) => {
        ui(questionId);
        if (!Activity.setQid(`#${containerId}`, questionId)) return false;

        const heading = document.querySelector(`.${quesClass}`);
        if (!heading) {
            console.error("heading element not found");
            return;
        }
        heading.dataset.qid = questionId;

        const renderDiv = document.querySelector(`#spell-out-container`);
        if (!renderDiv) {
            console.error("renderWords: render container #spell-out-container not found");
            return;
        }
        renderDiv.innerHTML = "";

        const activity = Activity.getDefine(questionId);
        const content = activity?.content ?? {};
        const lang = activity?.lang ?? "en";
        const words = content?.words ?? [];

        if (words.length == 0) return;

        if (!Array.isArray(words)) {
            console.error("renderWords: words should be an array", words);
            return;
        }

        words?.map((item) => {
            renderDiv.innerHTML += `<div class='d-flex-inline p-2'>${item}</div>`;
        });

        const count = content?.count ?? 1;

        if (count > words.length) {
            console.error(`count:- ${count} should be less than or equal to total words:- ${words.length}`);
            return;
        }

        const wordsRepetition = 3;

        const container = document.getElementById(inputContainer);

        for (let i = 0; i < count; i++) {
            const row = document.createElement("div");
            row.classList.add("row", "align-items-end", "my-3");

            const serialCol = document.createElement("div");
            serialCol.classList.add("col-auto");
            serialCol.innerText = `${i + 1}.`;

            row.appendChild(serialCol);

            for (let j = 0; j < wordsRepetition; j++) {
                const col = document.createElement("div");
                col.classList.add("col");

                const input = document.createElement("input");
                input.type = "text";
                input.style.fontSize = "25px";
                input.placeholder = lang == 'en' ? "word " : "शब्द " + (j + 1);
                input.classList.add("hindiInput", "inPutHindiNew", "w-100");

                col.appendChild(input);
                row.appendChild(col);
            }

            container.appendChild(row);
        }


    };

    return {
        render: render
    };

})();

const VowelDragAndDrop = (() => {

    Activity.css('dnd.css');

    const containerId = 'vowel_dragAndDrop';
    let DragEnabled = false;

    const ui = (questionId) => {
        try {
            const containerSelector = Define.get('questionContainer');
            const parent = document.querySelector(containerSelector);
            if (!parent) {
                console.error("ui container not found:", containerSelector);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const lang = activity.lang ?? 'en';
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container">
                                        <div class="rowWithAudios font18 fontBold ${Define.get('head')}"></div>
                                        <div class="question-block">
                                            <div class='common-image-container d-flex justify-content-center'></div>
                                            <div class="dragItems drag-container2" id="${containerId}" data-qid="${questionId}"></div>
                                            <div class="vowel-drop-box mt-3"></div>
                                        </div>
                                        <div class="buttons machiNgs">
                                            <button class="submit-btn" id="submit2">${buttonLabel.check}</button>
                                            <button class="show-btn" id="showAns2">${buttonLabel.show}</button>
                                            <button class="reset-btn">${buttonLabel.try}</button>
                                        </div>
                                    </div>
                                </div>
                                <div id="clickAct">
                                    <div class="baseFixeds">
                                        <div class="report_clicks">
                                        <div
                                            class="d-flex justify-content-between align-items-center">
                                            <h4 id="scoreTextQ1Click" class="text-center"></h4>
                                            <button id="pop-close" class="btn btn-secondary">X</button>
                                        </div>
                                        <div id="datapendReportClick"></div>
                                        </div>
                                    </div>
                                </div>`;

            const submitBtn = parent.querySelector('.submit-btn');
            const showBtn = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');

            if (submitBtn) submitBtn.addEventListener("click", checkAnswer);
            if (showBtn) showBtn.addEventListener("click", showAnswer);
            if (resetBtn) resetBtn.addEventListener("click", resetActivity);

            Activity.setHeader(questionId);

        } catch (e) {
            console.error('Circle.ui :', e);
        }
    };

    const splitGraphemes = (str) => {
        if (typeof Intl !== "undefined" && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter("hi", {
                granularity: "grapheme",
            });
            return Array.from(segmenter.segment(str), s => s.segment);
        }

        const devanagariRegex = /\s|[\p{L}](?:[\p{M}]|\u094D[\p{L}])*/gu;
        return str.match(devanagariRegex) || [];
    };

    const parseSharpWords = (text) => {
        const parts = [];
        let buffer = '';
        let inside = false;

        if (text.includes('#')) {
            for (let ch of text) {
                if (ch === '#') {
                    if (inside) {
                        parts.push({ text: buffer, editable: true });
                        buffer = '';
                    } else if (buffer) {
                        parts.push({ text: buffer, editable: false });
                        buffer = '';
                    }
                    inside = !inside;
                } else {
                    buffer += ch;
                }
            }
            if (buffer) parts.push({ text: buffer, editable: false });
        } else {
            const trimmed = text.trim();
            if (trimmed.split(' ').length === 1) {
                parts.push({ text: trimmed, editable: true });
            } else {
                parts.push({ text: trimmed, editable: false });
            }
        }

        return parts;
    };

    const resetActivity = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
        const content = activity?.content ?? {};
        const words = content?.words ?? [];

        words.forEach((item, wordIndex) => {
            const wordContainer = document.querySelector(`.question-container_2[data-queindex="${wordIndex}"]`);
            if (!wordContainer) return;

            wordContainer.classList.remove('vowel-correct', 'vowel-incorrect');

            const parts = parseSharpWords(item.text);

            wordContainer.innerHTML = parts
                .map(part => {
                    const isEditable = part.editable;
                    const text = part.text.trim();
                    if (!text) return '';

                    const lettersHtml = splitGraphemes(text)
                        .map(letter => letter === ' '
                            ? '&nbsp;'
                            : `<span class="letter${isEditable ? ' editable' : ''}" data-original="${letter}">${letter}</span>`
                        )
                        .join('');

                    return `<span class="part-container${isEditable ? ' editable' : ''}" data-original="${text}">${lettersHtml}</span>&nbsp;`;
                })
                .filter(Boolean)
                .join('');
        });

        $('.submit-btn, .show-btn').removeClass('disable');

        initDroppable('.letter');
        DragEnabled = true;
    };

    const showAnswer = () => {
        document.querySelectorAll('.question-container_2').forEach((wordEl, wordIndex) => {
            const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
            const content = activity?.content?.words || [];
            const item = content[wordIndex];
            if (!item) return;

            let answers = Array.isArray(item.answer) ? [...item.answer] : [item.answer];
            let answerIndex = 0;

            const parts = parseSharpWords(item.text);

            wordEl.innerHTML = parts.map(part => {
                const isEditable = part.editable;
                const text = part.text.trim();

                if (!text) return '';

                let partHtml = `<span class="part-container ${isEditable ? 'editable' : ''}" data-original="${text}">`;

                if (isEditable) {
                    const ans = answers[answerIndex++] || '';
                    const lettersHtml = splitGraphemes(ans)
                        .map(letter => `<span class="letter editable vowel-correct" data-original="${letter}">${letter}</span>`)
                        .join('');
                    partHtml += `${lettersHtml}</span>&nbsp;`;
                } else {
                    const lettersHtml = splitGraphemes(text)
                        .map(letter => letter === ' ' ? '&nbsp;' : `<span class="letter" data-original="${letter}">${letter}</span>`)
                        .join('');
                    partHtml += `${lettersHtml}</span>&nbsp;`;
                }

                return partHtml;
            }).filter(Boolean).join('');
        });

        $('.question-container_2').removeClass('vowel-incorrect');
        $('.submit-btn').addClass('disable');
        DragEnabled = false;
    };

    const checkAnswer = () => {
        const activity = Activity.getDefine(Activity.getQid(`#${containerId}`));
        const lang = activity?.lang ?? 'en';
        const content = activity?.content?.words || [];

        const questionEls = document.querySelectorAll('.question-container_2');
        let totalScore = 0;
        const totalQuestions = questionEls.length;

        questionEls.forEach((wordEl, wordIndex) => {
            const item = content[wordIndex];
            if (!item) return;

            const parts = parseSharpWords(item.text);
            const answers = Array.isArray(item.answer) ? [...item.answer] : [item.answer];
            let answerCounter = 0;

            const wordSpans = Array.from(wordEl.querySelectorAll('.part-container'));
            let allCorrect = true;
            let spanPointer = 0;

            parts.forEach((part) => {
                const isEditable = part.editable;
                const expected = isEditable ? (answers[answerCounter++] || '') : part.text;

                if (!expected.trim()) return;

                const currentSpan = wordSpans[spanPointer++];
                if (!currentSpan) return;

                const letterEls = Array.from(currentSpan.querySelectorAll('.letter'));
                const userWord = letterEls.map(el => el.textContent.trim()).join('');

                let correct = false;

                if (isEditable) {
                    correct = userWord === expected;
                } else {
                    const originalWord = letterEls.map(el => el.dataset.original || '').join('');
                    correct = userWord === originalWord;
                }

                if (isEditable && correct) {
                    currentSpan.classList.add('vowel-correct');
                    currentSpan.classList.remove('vowel-incorrect');
                } else if (isEditable) {
                    currentSpan.classList.add('vowel-incorrect');
                    currentSpan.classList.remove('vowel-correct');
                    allCorrect = false;
                } else {
                    const originalWord = letterEls.map(el => el.dataset.original || '').join('');

                    if (userWord !== originalWord) {
                        if (userWord !== expected) {
                            currentSpan.classList.add('vowel-incorrect');
                            currentSpan.classList.remove('vowel-correct');
                        } else {
                            currentSpan.classList.add('vowel-correct');
                            currentSpan.classList.remove('vowel-incorrect');
                        }
                        allCorrect = false;
                    } else {
                        currentSpan.classList.remove('vowel-incorrect');
                        currentSpan.classList.remove('vowel-correct');
                    }
                }
            });


            if (allCorrect) totalScore++;
        });

        DragEnabled = false;

        const popupLabels = Activity.translatePopupLabels(lang);

        Swal.fire({
            title: popupLabels.checkAnswers,
            text: popupLabels.scored(totalScore, totalQuestions),
            icon: totalScore === totalQuestions ? 'success' : 'error',
            confirmButtonText: popupLabels.ok
        });
    };

    const render = (questionId) => {
        ui(questionId);
        if (!Activity.setQid(`#${containerId}`, questionId)) return false;

        const activity = Activity.getDefine(questionId);
        const lang = activity?.lang ?? 'en';
        const content = activity?.content ?? {};

        const words = content?.words ?? [];
        const vowels = content?.vowels || [];
        const isCol = content?.col ?? false;

        const defaultCol = {
            md: 4,
            sm: 6,
            col: 12
        };

        const col_size = {
            md: isCol != false ? content?.col?.md ?? defaultCol.md : 12,
            sm: isCol != false ? content?.col?.sm ?? defaultCol.sm : 12,
            col: isCol != false ? content?.col?.col ?? defaultCol.col : 12
        };

        const hasMainImage = content?.image ?? false;
        const imagePath = hasMainImage?.path ?? false;
        let mainImage = "";

        if (hasMainImage !== false && imagePath !== false) {
            const imageWidth = hasMainImage?.width ?? '50%';
            mainImage = `<img src="${Activity.pathToCWD() + imagePath}" alt="image" style="width:${imageWidth};" class="mx-auto mb-2" ondragstart="return false;">`;
            $('.common-image-container').html(mainImage);
        } else {
            $('.common-image-container').remove();
        }

        const optionHtml = [];

        const drag_option_html = (item, ind) => {
            if (item === 'र्') {
                return `
                    <div class="vowel-container">
                        <div class="drag_${ind} vowel font17 px-2" data-text="${item}">
                            <img src="${Activity.pathToCWD()}r_matra.png" alt="र्" style="width: 18px; vertical-align: top;">
                        </div>
                    </div>
                `;
            }
            return `<div class="vowel-container">
                        <div class="drag_${ind} vowel font17 px-2" data-text="${item}">${item}</div>
                    </div>`;
        };


        vowels.forEach((item, ind) => {
            const html = drag_option_html(item, ind);
            optionHtml.push(html);
        });
        $('.drag-container2').html(optionHtml.join(''));

        const questionHtml = [];
        questionHtml.push('<div class="row g-0">');

        words.forEach((item, wordIndex) => {
            const hasImage = typeof item?.image === 'object';
            const imagePath = hasImage ? item.image.path : null;

            let image = '';
            if (hasImage && imagePath) {
                image = `<img src="${Activity.pathToCWD() + imagePath}" style="width:${item.image.width || '40px'}" class="mx-auto mb-2" ondragstart="return false">`;
            }

            const parts = parseSharpWords(item.text);
            const answerValue = Array.isArray(item.answer) ? item.answer.join('|') : item.answer;

            const html = `
                <div class="my-2 d-flex col-${col_size.col} col-md-${col_size.md} col-sm-${col_size.sm}">
                    <div class="col-auto p-2">
                        (${Activity.translateBulletLabels({ lang, ind: wordIndex })})
                    </div>
                    <div class="p-2 col d-flex flex-wrap ${hasImage ? 'flex-column align-items-center' : ''}">
                        ${image}
                        <div class="d-flex question-container_2" data-queindex="${wordIndex}" data-ans="${answerValue}">
                            ${parts.map(part => {
                const isEditable = part.editable;
                const text = part.text.trim();
                if (!text) return '';

                return `<span class="part-container ${isEditable ? 'editable' : ''}" data-original="${text}">
                                        ${splitGraphemes(text).map(letter => `<span class="letter" data-original="${letter}">${letter}</span>`).join('')}
                                    </span>&nbsp;`;
            }).join('')
                }
                        </div>
                    </div>
                </div>`;
            questionHtml.push(html);
        });

        questionHtml.push('</div>');
        $('.vowel-drop-box').html(questionHtml.join(''));

        userAns = Array(words.length).fill([]);

        makeDraggable('.vowel');
        initDroppable('.letter');
        DragEnabled = true;
    };

    const combineVowelMatra = (base, matra) => {
        const vowelCombinations = {
            'अ': { 'ा': 'आ', 'ि': 'इ', 'ी': 'ई', 'ु': 'उ', 'ू': 'ऊ', 'े': 'ए', 'ै': 'ऐ', 'ो': 'ओ', 'ौ': 'औ' },
            'आ': { 'ा': 'आ', 'ि': 'आई', 'ी': 'आई', 'ु': 'आउ', 'ू': 'आऊ', 'े': 'आए', 'ै': 'आऐ', 'ो': 'आओ', 'ौ': 'आऔ' },
            'इ': { 'ा': 'इा', 'ि': 'इि', 'ी': 'ई', 'ु': 'इु', 'ू': 'इू', 'े': 'इे', 'ै': 'इै', 'ो': 'इो', 'ौ': 'इौ' },
            'ई': { 'ा': 'ईा', 'ि': 'ईि', 'ी': 'ई', 'ु': 'ईु', 'ू': 'ईू', 'े': 'ईे', 'ै': 'ईै', 'ो': 'ईो', 'ौ': 'ईौ' },
            'उ': { 'ा': 'उा', 'ि': 'उि', 'ी': 'उी', 'ु': 'ऊ', 'ू': 'ऊ', 'े': 'उे', 'ै': 'उै', 'ो': 'उो', 'ौ': 'उौ' },
            'ऊ': { 'ा': 'ऊा', 'ि': 'ऊि', 'ी': 'ऊी', 'ु': 'ऊु', 'ू': 'ऊ', 'े': 'ऊे', 'ै': 'ऊै', 'ो': 'ऊो', 'ौ': 'ऊौ' },
            'ए': { 'ा': 'एा', 'ि': 'एि', 'ी': 'एी', 'ु': 'एु', 'ू': 'एू', 'े': 'ए', 'ै': 'ऐ', 'ो': 'एो', 'ौ': 'एौ' },
            'ऐ': { 'ा': 'ऐा', 'ि': 'ऐि', 'ी': 'ऐी', 'ु': 'ऐु', 'ू': 'ऐू', 'े': 'ऐे', 'ै': 'ऐ', 'ो': 'ऐो', 'ौ': 'ऐौ' },
            'ओ': { 'ा': 'ओा', 'ि': 'ओि', 'ी': 'ओी', 'ु': 'ओु', 'ू': 'ओू', 'े': 'ओे', 'ै': 'ओै', 'ो': 'ओ', 'ौ': 'औ' },
            'औ': { 'ा': 'औा', 'ि': 'औि', 'ी': 'औी', 'ु': 'औु', 'ू': 'औू', 'े': 'औे', 'ै': 'औै', 'ो': 'औो', 'ौ': 'औ' },
        };

        if (vowelCombinations[base] && vowelCombinations[base][matra]) {
            return vowelCombinations[base][matra];
        }

        if (matra === 'ि') {
            return matra + base;
        }

        if (matra.endsWith('्')) {
            return matra + base;
        }

        return base + matra;
    };

    const makeDraggable = (selector) => {
        try {
            $(selector).draggable({
                revert: true,
                containment: '.container-sub',
                start: function () {
                    if (!DragEnabled) {
                        return false;
                    }
                }
            });
        } catch (e) {
            console.error('DragAndDropMulti.makeDraggable :', e);
        }
    }

    const initDroppable = (selector) => {
        try {
            $(selector).droppable({
                drop: function (_, ui) {
                    if (!DragEnabled) return;

                    let base = $(this).attr('data-original');
                    const swar = ui.draggable.attr('data-text');

                    const combined = combineVowelMatra(base, swar);

                    $(this).text(combined);
                }
            });
        } catch (e) {
            console.error('initDroppable:', e);
        }
    };

    return {
        render: render
    };

})();

const VirtualTour = (() => {

    const containerId = 'virtualTour';
    const titleWrapperId = 'title-wrapper';
    const audioWrapperId = 'audio-wrapper';
    const imageContainerCls = 'question-image-container';

    let __currentIndex = 0;
    let __questions = undefined;
    let __prevBtn = undefined;
    let __nextBtn = undefined;

    const style = () => {
        const purpleColor = "#771360";
        const titleStyle = `border:1px solid ${purpleColor};background-color:${purpleColor};`;

        const store = {
            colors: {
                purple: purpleColor
            },
            css: {
                title: titleStyle
            }
        };

        return { get: store };
    }

    const defaultCol = Helper?.defaultCol ?? {};

    const ui = (questionId) => {
        try {
            const containerSelector = Define.get('questionContainer');
            const parent = document.querySelector(containerSelector);
            if (!parent) {
                console.error("ui container not found:", containerSelector);
                return;
            }

            const activity = Activity.getDefine(questionId) ?? {};
            const content = activity?.content ?? {};
            const lang = activity?.lang ?? 'en';
            const questions = content?.questions ?? [];
            const questionsLength = questions.length;

            const toggleBtns = Activity.translateNextPrevLabel(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container w-75 mx-auto">
                                        <div class="p-2 rounded-3 border bg-light text-center ${Define.get('head')}"></div>
                                        <div id="${containerId}" class="py-2 mt-2">
                                            ${questionsLength > 1
                    ? `
                                                    <div class="text-end">
                                                        <button id="previousBtn" class="btn btn-outline-primary rounded m-1" disabled>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                                                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                                            </svg>
                                                            ${toggleBtns.prev}
                                                        </button>
                                                        <button id="nextBtn" class="btn btn-outline-primary rounded m-1" disabled>
                                                            ${toggleBtns.next}
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ` : ''
                }
                                            <div class="question-content-container">
                                                <div id="${titleWrapperId}"></div>
                                                <div id="${audioWrapperId}"></div>
                                                <div class="row g-0 ${imageContainerCls}"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

            __prevBtn = document.querySelector('#previousBtn');
            __nextBtn = document.querySelector('#nextBtn');

            if (__prevBtn) __prevBtn.addEventListener('click', renderPrev);
            if (__nextBtn) __nextBtn.addEventListener('click', renderNext);

            Activity.setHeader(questionId);

            if (content?.questions?.length > 1) __nextBtn.disabled = false;

        } catch (e) {
            console.error('VirtualTour.ui :', e);
        }
    };

    const render = (questionId) => {
        __currentIndex = 0;
        __questions = undefined;
        __prevBtn = undefined;
        __nextBtn = undefined;

        ui(questionId);
        if (!Activity.setQid(`#${containerId}`, questionId)) return false;

        renderQuestion();
    };

    const captionTextView = (text = '') => {
        const caption = `
            <div class="col-12 text-decoration-underline text-capitalize text-muted text-center">
                <small>${text}</small>
            </div>`
        // ..
        if (text != '') return caption;
        else return '';
    }

    const renderImage = ({ path = '', imageWidth = '50%', border = false } = {}) => {
        const borderStyle = (border == true) ? `border:2px solid ${style().get.colors.purple}` : '';
        const img = `
            <img 
                src="${Activity.pathToCWD()}${path}" 
                class="rounded-2" 
                style="width:${imageWidth};${borderStyle}" 
                ondragstart="return false;"
            ></img>`
        // ..
        return img;
    }

    const renderQuestion = () => {

        Helper.stopAudio();

        const questionId = Activity.getQid(`#${containerId}`);
        const activity = Activity.getDefine(questionId) ?? {};
        const content = activity?.content ?? {};
        const questions = content?.questions ?? [];

        if (!__questions) __questions = questions;

        const currentQuestion = questions[__currentIndex];

        (() => {
            const titleWrapper = document.querySelector(`#${titleWrapperId}`);
            if (!titleWrapper) return false;

            const title = currentQuestion?.title ?? {};
            const titleHtml =
                title && (title.hasOwnProperty('main') || title.hasOwnProperty('sub'))
                    ? `
                        <div class="question-text-container row g-0 gap-2 my-2 fs-5 align-items-start">
                            ${title?.main?.text && title.main.text != ''
                        ? `
                                    <div 
                                        class="col-auto p-3 fw-bold text-light text-uppercase rounded-3" 
                                        style="${style().get.css.title}"
                                    >${title.main.text}</div>
                                ` : ''
                    }
                            ${title?.sub?.text && title.sub.text != ''
                        ? `
                                    <div 
                                        class="col row g-0 align-items-center ${title?.sub?.classes ? title?.sub?.classes : ''} ${title?.main?.text ? '' : 'justify-content-center'} p-3"
                                    >${title.sub.text}</div>
                                ` : ''
                    }
                        </div>
                    ` : '';
            // ..

            titleWrapper.innerHTML = titleHtml;
        })();

        const containerHtml = document.querySelector(`.${imageContainerCls}`);
        if (!containerHtml) return false;
        containerHtml.innerHTML = '';

        const wrapper = document.querySelector('#' + audioWrapperId);
        if (wrapper) wrapper.innerHTML = '';

        if (currentQuestion?.set?.virtualTour === true) {
            const definedCol = currentQuestion?.set?.col ?? {};
            const col = {
                md: definedCol?.md ?? defaultCol.md,
                sm: definedCol?.sm ?? defaultCol.sm,
                col: definedCol?.col ?? defaultCol.col
            };

            const audioPath = currentQuestion?.set?.audio && currentQuestion?.set?.audio?.path
                ? currentQuestion.set.audio.path
                : undefined;
            // ..

            if (audioPath) {

                const audioView = `<div class="text-end">
                                    <svg class="common_playBtn" id="playAudio" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16" role="button">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                                    </svg>
                                    <svg class="common_pauseBtn" style="display:none;" id="pauseAudio" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16" role="button">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                                    </svg>
                                </div>`;
                // ..

                if (wrapper) wrapper.innerHTML = audioView;

                Helper.setAudio(Activity.pathToCWD() + audioPath);

                const playAudio = document.querySelector('#playAudio');
                const pauseAudio = document.querySelector('#pauseAudio');

                if (playAudio) playAudio.addEventListener('click', Helper.playAudio);
                if (pauseAudio) pauseAudio.addEventListener('click', Helper.pauseAudio);
            }

            const imageWidth = (currentQuestion?.set?.imageWidth && currentQuestion?.set?.imageWidth !== '')
                ? currentQuestion.set.imageWidth
                : '100%';
            // ..

            containerHtml.classList.add('justify-content-center');

            containerHtml.innerHTML = currentQuestion.set?.images.map(obj => {
                return `
                    <div class="col-${col.col} col-md-${col.md} col-sm-${col.sm} p-3 text-center animate__animated animate__fadeInDown">
                        ${renderImage({ path: obj?.path, imageWidth: imageWidth, border: true })}
                        ${obj?.caption && obj?.caption != ''
                        ? captionTextView(obj.caption) : ''
                    }
                    </div>
                `;
            }).join('') ?? '';
        }

        if (currentQuestion?.set?.virtualTour === false) {
            containerHtml.innerHTML = currentQuestion?.set?.questions?.map(question => {

                const imageLayout = question?.imageLayout ?? {};

                const imageWidth = imageLayout?.width ?? '100px';
                const imagePos = imageLayout?.position ?? 'top';
                const images = imageLayout?.images ?? [];
                const definedCol = imageLayout?.col ?? {};
                const col = {
                    md: definedCol?.md ?? defaultCol.md,
                    sm: definedCol?.sm ?? defaultCol.sm,
                    col: definedCol?.col ?? defaultCol.col
                };

                const imageClass = `
                    ${imagePos === 'top' || imagePos === 'bottom'
                        ? images.length > 1
                            ? `col-${col.col} col-sm-${col.sm} col-md-${col.md}`
                            : 'col-12'
                        : 'col-auto'
                    } row g-0 align-items-center justify-content-center
                `;
                // ..

                const textClass = (imagePos == 'left' || imagePos == 'right')
                    ? 'col'
                    : 'col-12';
                // ..

                let __renderAll = true;
                const imageHtmlSet = images?.map((image, index) => {
                    if (imagePos == 'left' || imagePos == 'right') __renderAll = false;

                    if (!__renderAll && index > 0) return;

                    return image?.path && image?.path != ''
                        ? `<div class="${imageClass} my-1 px-1">
                                <div class="col-12 text-center">
                                    ${renderImage({ path: image.path, imageWidth: imageWidth })}
                                </div>
                                ${image?.caption && image?.caption != ''
                            ? captionTextView(image.caption) : ''
                        }
                            </div>
                        ` : ''
                    // ..
                }).join('');

                const imageHtmlContainer = imageHtmlSet != ''
                    ? images.length > 1 && (imagePos == 'top' || imagePos == 'bottom')
                        ? `<div class="row g-0 justify-content-center">${imageHtmlSet}</div>`
                        : imageHtmlSet
                    : ''
                // ..

                return `
                    ${question?.head || question?.sentence || imageHtmlSet ? `
                            <div class="row g-0 border-secondary-subtle border rounded py-2 bg-light-subtle px-1 my-2 animate__animated animate__fadeInDown">
                                ${imagePos == 'top' || imagePos == 'left' ? imageHtmlContainer : ''}
                                ${question?.head || question?.sentence ? `
                                    <div class="${textClass} my-2">
                                        ${question?.head ? `
                                                <div class="fs-5 text-danger-emphasis p-1">
                                                    ${question.head}
                                                </div>
                                            ` : ''
                            }
                                        ${question?.sentence ? `
                                                <div class="p-1">${question.sentence}</div>
                                            ` : ''
                            }
                                    </div>` : ''
                        }
                                ${imagePos == 'bottom' || imagePos == 'right' ? imageHtmlContainer : ''}
                            </div>
                            ` : ''
                    }
                `
            }).join('') ?? '';
        }
    };

    const renderNext = () => {
        __currentIndex++;
        __prevBtn.disabled = false;
        renderQuestion();

        if (!__questions[__currentIndex + 1]) {
            __nextBtn.disabled = true;
            return;
        }
    };

    const renderPrev = () => {
        __currentIndex--;
        __nextBtn.disabled = false;
        renderQuestion();

        if (!__questions[__currentIndex - 1]) {
            __prevBtn.disabled = true;
            return;
        }
    };

    return {
        render: render
    };

})();

Templates.get('templates').map(({ template }) => {
    try {
        const mod = eval(template);
        if (!mod || (typeof mod !== 'function' && typeof mod !== 'object')) {
            console.error(`FATAL :: Couldn't register ${template} :`, mod);
            return;
        }
        Activity.register(template, mod);
    } catch (err) {
        console.error(`FATAL :: Couldn't register ${template} :`, err);
    }
});
