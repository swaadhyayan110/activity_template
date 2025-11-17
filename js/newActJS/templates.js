const activities = {};

const Activity = (() => {

    const store = { modules: {} };

    const css = (href) => {
        try {
            if( !href ) return;

            const link = document.createElement("link");
            link.rel   = "stylesheet";
            link.type  = "text/css";
            link.href  = 'css/newActCss/'+href;
            document.head.appendChild(link);
        } catch( err ) {
            console.error( 'Activity.css : ', err );
        }
    };

    const module = (id) => {
        try {            
            const found = Modules.get()?.find(m => m.id === id);
            return found ? found.module : null;
        } catch ( err ) {
            console.error( 'Activity.module : ', err );
        }
    };
    
    const getData = (questionId) => {
        try {
            return Define.get('questions')?.find(q => q.id == questionId);
        } catch ( err ) {
            console.error( 'Activity.getData : ', err );
        }
    };

    const shuffleQuestions = (array) => {
        try {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        } catch ( err ) {
            console.error( 'Activity.shuffleQuestions : ', err );
            return [];
        }
    };

    const shuffleWords = (words) => {
        try {
            if( !Array.isArray(words) ) return words;

            const arr = [...words];
            do {
                for (let i = arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            } while (JSON.stringify(arr) === JSON.stringify(words) && words.length > 1);
            return arr;
        } catch ( err ) {
            console.error( 'Activity.shuffleWords : ', err );
        }
    };

    const setQuestionDetails = ( questionID ) => {
        try {
            const data = getData( questionID );
            const container = document.querySelector(Define.get('questionContainer'));
            if( !container ) {
                console.warn('setQuestionDetails: container not found:', container);
                return;
            }

            const head    = Define.get('head');
            const subHead = Define.get('subHead');
            const eleArr  = [ head, subHead ].map(item => `.${item}`);

            const elements = {};
            
            const elHead = container.querySelector(eleArr[0]);
            const elSub  = container.querySelector(eleArr[1]);

            if (elHead) elHead.innerHTML = data.head || elHead.remove();
            if (elSub) elSub.innerHTML   = data.subhead || elSub.remove();

            elements.head    = document.contains(elHead);
            elements.subhead = document.contains(elSub);

            return elements;

        } catch( err ) {
            console.error( 'Activity.setQuestionDetails :- ', err );
        }
    };

    const toggleCheckBtn = (selector, disable) => {
        try {
            const container = document.querySelector( Define.get('questionContainer') );
            const btn       = container.querySelector(selector);        
            if( !btn ) return;
            btn.disabled = disable;
            btn.style.opacity = disable ? "0.5" : "1";
            btn.style.pointerEvents = disable ? "none" : "auto";
        } catch ( err ) {
            console.error( 'Activity.toggleCheckBtn : ', err );
        }
    };

    const translateBulletLabels = ({ lang='en', ind=0, upperCase=true } = {}) => {
        const alphabets = {
            en: [...'abcdefghijklmnopqrstuvwxyz'],
            hi: [...'कखगघङचछजझञटठडढणतथदधनपफबभमय']
        }

        const characters = alphabets[lang] ?? alphabets.en;
        const casedList  = upperCase ? characters.map(ch => ch.toUpperCase()) : characters;

        return (ind !== undefined && casedList[ind] !== undefined) ? casedList[ind] : '-';
    };

    const translateButtonLabels = (lang='en') => {
        if( lang == 'en' ) {
            return { 
                check : 'Check Answers',
                show  : 'Show Answers',
                try   : 'Try Again'
            };
        } else {
            return { 
                check : 'उत्तर जाँचिए',
                show  : 'उत्तर देखो',
                try   : 'पुनः प्रयास करें'
            };
        }
    };

    const translateAnswerTableHeads = (lang='en') => {
        if( lang == 'en' ) {
            return {
                sequence  : 'Question No.',
                attempted : 'Your Answer',
                correct   : 'Correct Answer',
                result    : 'Result'
            };
        } else {
            return {
                sequence  : 'प्रश्‍न संख्या',
                attempted : 'आपका उत्तर',
                correct   : 'सही उत्तर',
                result    : 'परिणाम'
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

    const translateBooleanLabels = (lang='en') => lang == 'en' ? ['True', 'False'] : ['सही', 'गलत'];
    const translateWordLabel     = (lang='en') => lang == 'en' ? 'word' : 'शब्द';
    const translateSentenceLabel = (lang='en') => lang == 'en' ? 'sentence' : 'वाक्य';
    const translateColumnLabel   = (lang='en') => lang == 'en' ? 'column' : 'खंड';
    const translateBoxLabel      = (lang='en') => lang == 'en' ? 'box' : 'बॉक्स';    

    const pathToCWD = () => assets_url;

    const get = (key) => store[key];

    const register = (name, mod) => {
        try {
            store.modules[name] = mod;
        } catch ( err ) {
            console.error( 'Activity.register : ', err );
        }
    };
  
    const render = (moduleId, questionId, activityId=null) => {
        try {
            const moduleName = module(moduleId);
            if( !moduleName ) {
                console.error('Activity.render: unknown moduleId', moduleId);
                return;
            }       

            const mod = store.modules[moduleName];
            if( !mod || !mod.render ) {
                console.error('Activity.render: module not registered:', moduleName);
                return;
            }

            const qObj = getData( questionId );
            if( !qObj ) {
                console.error('Activity.render: no question found for', questionId );
                return;
            }
            
            if( !activityId ) {
                activityId = moduleName === 'MatchLeftToRight' ? `m${qObj.id}` : `act${qObj.id}`;
            }        
            
            mod.render( questionId, activityId );
        } catch ( err ) {
            console.error( 'Activity.render : ', err );
        }
    };

    return {
        get,
        css,
        module,
        render,
        getData,
        register,
        shuffleWords,
        hindiKeyboard,
        toggleCheckBtn,
        pathToCWD,
        shuffleQuestions,
        translateBoxLabel,
        setQuestionDetails,
        translateWordLabel,
        translateColumnLabel,
        translateButtonLabels,
        translateBulletLabels,
        translateSentenceLabel,
        translateBooleanLabels,
        translateAnswerTableHeads,
    };    
})();

const MatchLeftToRight = (() => {

    const drawArrow = (activityId, fromElement, toElement, color = "green") => {
        try {
    
            const svg = document.querySelector(`.matching-area.${activityId} svg`);
            if( !svg || !fromElement || !toElement ) return;

            const leftId  = fromElement.dataset.id;
            const rightId = toElement.dataset.id;
            
            svg.querySelectorAll(`line[data-from="${leftId}"], line[data-to="${rightId}"]`)
            .forEach(l => l.remove());

            const fromRect = fromElement.getBoundingClientRect();
            const toRect   = toElement.getBoundingClientRect();
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
            line.setAttribute("marker-end", "url(#arrowhead)");
            line.dataset.from = leftId;
            line.dataset.to = rightId;
            svg.appendChild(line);
        } catch( err ) {
            console.error( 'MatchLeftToRight.drawArrow :', err );
        }
    };
    
    const checkAnswers = (activityId) => {
        try {
            const activity = activities[activityId];
            if( !activity ) return;

            const correctMatches = activity.correctMatches || {};
            let correctCount     = 0;

            const area = document.querySelector(`.matching-area.${activityId}`);
            if( !area ) return;

            area.querySelectorAll(".item").forEach(item => {
                item.classList.remove("correct", "wrong");
            });

            for( const leftId in correctMatches ) {
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
            if (correctCount === total) {
                Swal.fire({ icon: "success", title: "Excellent!", text: `All ${total} answers are correct 🎉` });
            } else if (correctCount === 0) {
                Swal.fire({ icon: "error", title: "Oops!", text: "No answers are correct ❌" });
            } else {
                Swal.fire({ icon: "info", title: "Almost!", text: `You got ${correctCount} out of ${total} correct ✅` });
            }
        } catch( err ) {
            console.error( 'MatchLeftToRight.checkAnswers :', err );
        }
    };

    const showAnswers = (activityId) => {
        try {
            resetActivity(activityId);
            const activity = activities[activityId];
            if( !activity ) return;

            const correctMatches = activity.correctMatches || {};
            const area = document.querySelector(`.matching-area.${activityId}`);
            if( !area ) return;

            for( const leftId in correctMatches ) {
                const leftItem  = area.querySelector(`.left-items .item[data-id="${leftId}"]`);
                const rightItem = area.querySelector(`.right-items .item[data-id="${correctMatches[leftId]}"]`);

                if( !leftItem || !rightItem ) continue;

                drawArrow(activityId, leftItem, rightItem, "green");

                leftItem.classList.add("correct");
                rightItem.classList.add("correct");
                activities[activityId].userMatches[leftId] = correctMatches[leftId];
            }
            
            Activity.toggleCheckBtn( '.submit-btn', true );
        } catch( err ) {
            console.error( 'MatchLeftToRight.showAnswers :', err );
        }
    };

    const resetActivity = (activityId) => {
        try {
            const svg = document.querySelector(`.matching-area.${activityId} svg`);
            if( svg ) {
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

            Activity.toggleCheckBtn( '.submit-btn', false );
        } catch( err ) {
            console.error( 'MatchLeftToRight.resetActivity :', err );
        }
    };

    const checkIfAllAttempted = (activityId) => {
        try {
            const activity = activities[activityId];
            if( !activity ) return;

            const correctMatches = activity.correctMatches || {};
            const total = Object.keys(correctMatches).length;

            const attempted = Object.keys(activity.userMatches || {}).filter(leftId => activity.userMatches[leftId]).length;

            const submitBtn = document.querySelector(`.buttons.machiNgs .submit-btn[data-activity="${activityId}"]`);
            if( submitBtn ) {
                if( attempted === total ) {
                    submitBtn.classList.remove("disable"); 
                } else {
                    submitBtn.classList.add("disable");
                }
            }
        } catch( err ) {
            console.error( 'MatchLeftToRight.checkIfAllAttempted :', err );
        }
    };

    const redrawAllArrows = (activityId) => {
        try {
            const activity = activities[activityId];
            const svg = document.querySelector(`.matching-area.${activityId} svg`);
            if( !svg || !activity ) return;

            const defs = svg.querySelector("defs");
            svg.innerHTML = "";
            if( defs ) svg.appendChild(defs);

            for( const leftId in activity.userMatches ) {
                const rightId = activity.userMatches[leftId];
                const leftEl  = document.querySelector(`.matching-area.${activityId} .left-items .item[data-id="${leftId}"]`);
                const rightEl = document.querySelector(`.matching-area.${activityId} .right-items .item[data-id="${rightId}"]`);
                if( leftEl && rightEl ) {
                    drawArrow(activityId, leftEl, rightEl);
                }
            }
        } catch( err ) {
            console.error( 'MatchLeftToRight.redrawAllArrows :', err );
        }
    };

    const ui = (activityId="m1", questionId) => {
        try {
            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            
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
                        <div class="levelText">${columnLabel}-${Activity.translateBulletLabels({lang:lang, ind:0})}</div>
                        <div class="levelText">${columnLabel}-${Activity.translateBulletLabels({lang:lang, ind:1})}</div>
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
        } catch( err ) {
            console.error( 'MatchLeftToRight.ui :', err );
        }
    };
    
    const matchLeftToRight = (questionId, activityId="m1") => {
        try {
            const data = Activity.getData( questionId );
            if( !Object.entries(data).length ) return;

            ui(activityId, questionId);

            const headElem = Activity.setQuestionDetails( questionId );
            if( !headElem.head && !headElem.subhead ) {
                document.querySelector('hr').remove();
            }

            const leftContainer  = document.getElementById(`leftItems_${activityId}`);
            const rightContainer = document.getElementById(`rightItems_${activityId}`);
            const area    = document.querySelector(`.matching-area.${activityId}`);
            const buttons = document.querySelector(`.matching-area.${activityId}`)?.closest('.container')?.querySelector('.buttons.machiNgs');

            const leftFrag  = document.createDocumentFragment();
            const rightFrag = document.createDocumentFragment();

            const questions      = data.content;
            const correctMatches = Object.fromEntries(questions.map(q => [String(q.id), String(q.id)]));

            const leftShuffled  = Activity.shuffleQuestions(questions);
            const rightShuffled = Activity.shuffleQuestions(questions);
            
            activities[activityId] = activities[activityId] || { userMatches: {}, selectedLeftItem: null, correctMatches: {} };
            activities[activityId].correctMatches = correctMatches || {};
            activities[activityId].userMatches = {};
            
            leftShuffled.forEach(d => {
                const div       = document.createElement('div');
                div.className   = 'item';
                div.dataset.id  = d.id;
                div.innerHTML   = d.left;

                div.addEventListener('click', (ev) => {
                    leftContainer.querySelectorAll('.item.selected').forEach(i => i.classList.remove('selected'));
                    div.classList.add('selected');
                    activities[activityId].selectedLeftItem = div;
                });

                leftFrag.appendChild(div);
            });
            
            rightShuffled.forEach(d => {
                const div      = document.createElement('div');
                div.className  = 'item';
                div.dataset.id = d.id;
                div.innerHTML  = d.right;

                div.addEventListener('click', (ev) => {
                    const activity = activities[activityId];
                    if (!activity || !activity.selectedLeftItem) {
                    Swal.fire({ icon: "error", text: "Please select left item first!" });
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

            leftContainer.innerHTML  = '';
            rightContainer.innerHTML = '';

            leftContainer.appendChild(leftFrag);
            rightContainer.appendChild(rightFrag);
            
            const submitBtn = document.querySelector(`.buttons.machiNgs .submit-btn[data-activity="${activityId}"]`);
            const showBtn   = document.querySelector(`.buttons.machiNgs .show-btn`);
            const resetBtn  = document.querySelector(`.buttons.machiNgs .reset-btn`);

            if( submitBtn ) {
                submitBtn.addEventListener('click', () => checkAnswers(activityId));
            }
            if( showBtn ) {
                showBtn.addEventListener('click', () => showAnswers(activityId));
            }
            if( resetBtn ) {
                resetBtn.addEventListener('click', () => resetActivity(activityId));
            }
        } catch( err ) {
            console.error( 'MatchLeftToRight.matchLeftToRight :', err );
        }
    };

    window.addEventListener('resize', () => {
        for( const activityId in activities ) redrawAllArrows(activityId);
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
    
    const qS  = (sel, ctx = document) => (ctx && ctx.querySelector) ? ctx.querySelector(sel) : null;
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
                const len = Math.sqrt(dx*dx + dy*dy);
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
                        if (y >= rect.top && y <= rect.bottom) candidates.push({t,x,y});
                    } else {
                        if (x >= rect.left && x <= rect.right) candidates.push({t,x,y});
                    }
                };

                if (isFinite(tx1)) pushIfValid(tx1, 'left');
                if (isFinite(tx2)) pushIfValid(tx2, 'right');
                if (isFinite(ty1)) pushIfValid(ty1, 'top');
                if (isFinite(ty2)) pushIfValid(ty2, 'bottom');

                if (candidates.length === 0) return { x: cx, y: cy };
                candidates.sort((a,b) => a.t - b.t);
                return { x: candidates[0].x, y: candidates[0].y };
            }
        } catch( err ) {
            console.error( 'MatchLeftRightToCenter.getBoundaryPoint :', err );
        }
    };

    const drawLine = (svg, fromEl, toEl, color = "green", tag = "L") => {
        try {
            if (!svg || !fromEl || !toEl) return;

            const fromId = fromEl.dataset.id;
            const toId = toEl.dataset.id;
            
            svg.querySelectorAll(`line[data-from="${tag}~${fromId}"]`).forEach(l => l.remove());

            const fromRect = fromEl.getBoundingClientRect();
            const toRect   = toEl.getBoundingClientRect();        
            const svgRect  = svg.getBoundingClientRect();
        
            const fromCenterX = (fromRect.left + fromRect.right) / 2;
            const fromCenterY = (fromRect.top + fromRect.bottom) / 2;
            const toCenterX   = (toRect.left + toRect.right) / 2;
            const toCenterY   = (toRect.top + toRect.bottom) / 2;
            
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
            line.setAttribute("marker-end", "url(#arrowhead2)");

            line.dataset.from = `${tag}~${fromId}`;
            line.dataset.to   = `${tag}~${toId}`;
            svg.appendChild(line);
        } catch( err ) {
            console.error( 'MatchLeftRightToCenter.drawLine :', err );
        }
    };

    const clearSvg = (svg) => {
        try {
            if (!svg) return;
            svg.querySelectorAll("line").forEach(l => l.remove());
        } catch( err ) {
            console.error( 'MatchLeftRightToCenter.clearSvg :', err );
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

            Activity.toggleCheckBtn( '.submit-btn', false );
        } catch( err ) {
            console.error( 'MatchLeftRightToCenter.resetActivity :', err );
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
                Swal.fire({ icon: "success", title: "Great!", text: `All ${total} matches are correct 🎉` });
            } else if (correctCount === 0) {
                Swal.fire({ icon: "error", title: "Oops!", text: "No answers are correct ❌" });
            } else {
                Swal.fire({ icon: "info", title: "Almost!", text: `You got ${correctCount} out of ${total} correct ✅` });
            }
        } catch( err ) {
            console.error( 'MatchLeftRightToCenter.checkAnswers :', err );
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

            Activity.toggleCheckBtn( '.submit-btn', true );
        } catch( err ) {
            console.error( 'MatchLeftRightToCenter.showAnswers :', err );
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
        } catch( err ) {
            console.error( 'MatchLeftRightToCenter.redrawAll :', err );
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
        } catch( err ) {
            console.error( 'MatchLeftRightToCenter.sizeAndPlaceSvg :', err );
        }
    };

    const matchLeftRightToCenter = (questionId, activityId="act1") => {
        try {
            const data    = Activity.getData( questionId );
            const content = data.content;
            const lang    = data?.lang ?? 'en';

            const btnLabels = Activity.translateButtonLabels( lang );

            activities[activityId]                  = activities[activityId] || {};
            activities[activityId].correctLeft      = content.correctLeft || {};
            activities[activityId].correctRight     = content.correctRight || {};
            activities[activityId].userLeftMatches  = {};
            activities[activityId].userRightMatches = {};
            activities[activityId].selectedLeft     = null;
            activities[activityId].selectedRight    = null;

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
            
            const row         = cont.querySelector('.rowM3');
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

            const col1 = Array.isArray(content.col1) ? Activity.shuffleQuestions(content.col1) : [];
            const col2 = Array.isArray(content.col2) ? Activity.shuffleQuestions(content.col2) : [];
            const col3 = Array.isArray(content.col3) ? Activity.shuffleQuestions(content.col3) : [];

            const returnHtml = (colSeq, item) => {
                const image_width = item.width ?? '65%';
                const html = item.text ? 
                    `<div class="centerItems shadow-sm" data-col="${colSeq}" data-id="${item.id}">${item.text}</div>` : 
                    `<div class="imgBoxes shadow" data-col="${colSeq}" data-id="${item.id}"><img src="${Activity.pathToCWD()}${item.img}" alt="" ondragstart="return false"; style="width:${image_width};"></div>`;
                // ..
                return html;
            }
            
            col1.forEach(item => {                
                matchItems1.insertAdjacentHTML('beforeend', returnHtml(1, item) );
            });

            col2.forEach(item => {
                matchItems2.insertAdjacentHTML('beforeend', returnHtml(2, item) );
            });

            col3.forEach(item => {
                matchItems3.insertAdjacentHTML('beforeend', returnHtml(3, item) );
            });

            const leftEls   = Array.from(matchItems1.querySelectorAll('[data-col="1"]'));
            const centerEls = Array.from(matchItems2.querySelectorAll('[data-col="2"]'));
            const rightEls  = Array.from(matchItems3.querySelectorAll('[data-col="3"]'));
            
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
                        Swal.fire({ icon: "info", text: "Please select an image from left or right column first." });
                    }
                });
            });            
            
            const headElem = Activity.setQuestionDetails( questionId );
            if( !headElem.head && !headElem.subhead ) {
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
            const x2 = (toRect.left + toRect.right) / 2 -containerRect.left;
            const y2 = toRect.top - containerRect.top;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("stroke", color);
            line.setAttribute("stroke-width", "2");
            line.setAttribute("marker-end", `url(#arrowhead_${activityId})`);
            line.dataset.from = topId;
            line.dataset.to = bottomId;
            svg.appendChild(line);
        } catch( err ) {
            console.error( 'MatchTopToBottom.drawArrow : ', err );
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
            Activity.toggleCheckBtn('.submit-btn', attempted === total);
        } catch( err ) {
            console.error( 'MatchTopToBottom.checkIfAllAttempted : ', err );
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
        } catch( err ) {
            console.error( 'MatchTopToBottom.redrawAllArrows : ', err );
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
        } catch( err ) {
            console.error( 'MatchTopToBottom.resetActivity : ', err );
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
            if (correctCount === total) {
                Swal.fire({ icon: "success", title: "Good!", text: `You got ${correctCount} out of ${total} correct.` });
            } else if (correctCount === 0) {
                Swal.fire({ icon: "error", title: "Oops...", text: `No correct answers. ${correctCount}/${total}` });
            } else {
                Swal.fire({ icon: "info", title: "Not bad", text: `You got ${correctCount} out of ${total} correct.` });
            }
        } catch( err ) {
            console.error( 'MatchTopToBottom.checkAnswers : ', err );
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
        } catch( err ) {
            console.error( 'MatchTopToBottom.showAnswers : ', err );
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

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';

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
        } catch( err ) {
            console.error( 'MatchTopToBottom.ui : ', err );
        }
    };  

    const matchTopToBottom = (questionId, activityId = "m3_1") => {
        try {
            const data = Activity.getData( questionId );
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
            Activity.setQuestionDetails( questionId );
            
            const area            = document.querySelector(`.matching-area3[data-activity="${activityId}"]`);
            const topContainer    = area.querySelector("[data-top]");
            const bottomContainer = area.querySelector("[data-bottom]");

            topContainer.innerHTML    = "";
            bottomContainer.innerHTML = "";
            
            const topList    = Activity.shuffleQuestions(questions);
            const bottomList = Activity.shuffleQuestions(questions);
            
            topList.forEach(item => {
                const div         = document.createElement("div");
                div.className     = "item2";
                div.dataset.id    = item.id;
                div.dataset.match = item.match;

                const inner       = document.createElement("div");
                inner.className   = "item-text";
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
                const div      = document.createElement("div");
                div.className  = "item2";
                div.dataset.id = item.id;

                const inner       = document.createElement("div");
                inner.className   = "item-text";
                inner.textContent = item.bottom;
                div.appendChild(inner);

                div.addEventListener("click", () => {
                    const act = activities[activityId];
                    if (!act || !act.selectedTop) {
                        Swal.fire({ icon: "error", text: "Select top item first" });
                        return;
                    }
                    const topId    = act.selectedTop.dataset.id;
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
            const showBtn  = containerEl.querySelector(".buttons.machiNgs [data-show]");
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
            const parent    = document.querySelector(container);
            if( !parent ) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            
            const buttonLabel = Activity.translateButtonLabels(lang);
            
            parent.innerHTML= `<div class="question user-select-none">
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
			const showBtn  = parent.querySelector("#showBtnF");
			const resetBtn = parent.querySelector("#resetBtnF");

			if (checkBtn) checkBtn.addEventListener("click", checkAnswerFill);
			if (showBtn) showBtn.addEventListener("click", showAnswersFill);
			if (resetBtn) resetBtn.addEventListener("click", resetFill);
        } catch ( err ) {
            console.error( 'FillInTheBlanksWithImage.ui : ', err );
        }
	};
	
	const fillInTheBlanks = (questionId) => {
        try {
            const data = Activity.getData( questionId );

            ui(questionId);
            Activity.setQuestionDetails( questionId );

            document.querySelector(Define.get('questionContainer')).querySelector("#checkBtnF").dataset.qid = data?.id;

            const container2 = document.getElementById("inputsContainer");
            if (!container2) {
                return;
            }		
            container2.innerHTML = "";
            
            const textFrag = document.createDocumentFragment();
            data?.content?.hinttext?.forEach((item) => {
                const div       = document.createElement('div');
                div.className   = 'wordBoxesFill shadow-sm';
                div.textContent = item;

                textFrag.appendChild(div);
            });
            document.querySelector('.wordRows').appendChild(textFrag);

            document.querySelector('.imgBoxFill').innerHTML = `<img src="${Activity.pathToCWD()}${data?.content?.hintimage}" ondragstart="return false";/>`;
            
            let blanksBlock = '';
            data?.content?.blanks.forEach((item, i) => {
                if( item.img ) {
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
        } catch ( err ) {
            console.error( 'FillInTheBlanksWithImage.fillInTheBlanks : ', err );
        }
	};
	
	const checkAnswerFill = () => {
        try {
            let correct = 0;
            const inputs = document.querySelectorAll(".inputsFills");
            inputs.forEach(input => {
                const type       = input.dataset.type;
                const userVal    = input.value.trim().toLowerCase();
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

            const questionId = document.querySelector(Define.get('questionContainer')).querySelector("#checkBtnF").dataset.qid;
            const dataFills  = Activity.getData( questionId )?.content?.blanks;

            Swal.fire({
                icon: correct === (dataFills || []).length ? "success" : "info",
                title: correct === (dataFills || []).length ? "Perfect!" : "Checked",
                text: `You got ${correct} / ${(dataFills || []).length} correct.`
            });
        } catch ( err ) {
            console.error( 'FillInTheBlanksWithImage.checkAnswerFill : ', err );
        }
	};
	
	const showAnswersFill = () => {
        try {
            Activity.toggleCheckBtn( '#checkBtnF', true );
            disableAll();
            document.querySelectorAll(".inputsFills").forEach(input => {
                input.value = input.dataset.ans;
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
            });
        } catch ( err ) {
            console.error( 'FillInTheBlanksWithImage.showAnswersFill : ', err );
        }
	};
	
	const resetFill = () => {
        try {
            Activity.toggleCheckBtn( '#checkBtnF', false );
            enableAll();
            document.querySelectorAll(".inputsFills").forEach(input => {
                input.value = "";
                input.classList.remove("is-valid", "is-invalid");
            });
        } catch ( err ) {
            console.error( 'FillInTheBlanksWithImage.resetFill : ', err );
        }
	};

	const disableAll = () => {
        try {
            document.querySelectorAll(".inputsFills").forEach(el => {
                el.setAttribute("disabled", true);
            });
        } catch ( err ) {
            console.error( 'FillInTheBlanksWithImage.disableAll : ', err );
        }
	};

	const enableAll = () => {
        try {
            document.querySelectorAll(".inputsFills").forEach(el => {
                el.removeAttribute("disabled");
		    });
        } catch ( err ) {
            console.error( 'FillInTheBlanksWithImage.enableAll : ', err );
        }
	};

	return {
		render:fillInTheBlanks,
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

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container">
                                        <div class="hindiHeadings ${Define.get('head')}"></div>
                                        <div id="${quizContainerID}"></div>
                                    </div>
                                    <div class="buttons machiNgs">
                                        <button class="submit-btn check_1">${buttonLabel.check}</button>
                                        <button class="show-btn">${buttonLabel.show}</button>
                                        <button class="reset-btn">${buttonLabel.try}</button>
                                    </div>
                                    <div class="result" id="result"></div>
                                </div>`;
            // ..

            const submitBtn = parent.querySelector( '.submit-btn' );
            const showBtn   = parent.querySelector( '.show-btn' );
            const resetBtn  = parent.querySelector( '.reset-btn' );

            if( submitBtn ) submitBtn.addEventListener("click", checkAnswersHandler);
            if( showBtn ) showBtn.addEventListener("click", showAnswersHandler);
            if( resetBtn ) resetBtn.addEventListener("click", resetQuizHandler);
        } catch (e) {
            console.error( 'FillInTheBlanksHindiKb.ui :', e );
        }
    }

    const fillInTheBlanks = (questionId) => {
        try {

            ui(questionId);
            Activity.setQuestionDetails( questionId );

            const container = $('#'+quizContainerID)[0];

            container.dataset.qid = questionId;
            const data        = Activity.getData(questionId)?.content;
            const replacement = data?.replacement;

            data?.questions.forEach((item, qIndex) => {
                const div = document.createElement("div");
                div.classList.add("questionFILL");
                
                const parts = item.question.split( replacement );

                const html = [];
                parts.forEach((part, idx) => {
                    html.push(part);
                    if( item.answers[idx] !== undefined ) {
                        html.push(`<input class="hindiInput inPutHindiNew" data-qindex="${qIndex}" data-blankindex="${idx}" autocomplete="off" type="text" placeholder="उत्तर लिखें">`);
                    }
                });
                div.innerHTML = html.join( '' );
                container.appendChild( div );
            });

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


        } catch( e ) {
            console.error( 'FillInTheBlanksHindiKb.fillIntheBlanks :', e );
        }
    }

    const normalizeHindi = (str) => {
        return (str || "").normalize("NFC").replace(/\s+/g, "").replace(/[।|,.;:'"!?]/g, "").trim().toLowerCase();
    }

    const checkAnswersHandler = () => {
        let score = 0;
        const inputs = document.querySelectorAll(".inPutHindiNew");

        const questionId = $('#'+quizContainerID)[0].dataset.qid;
        const questions  = Activity.getData(questionId)?.content?.questions;

        inputs.forEach(el => {
            const qIndex = el.dataset.qindex;
            const blankIndex = el.dataset.blankindex;
            const val = normalizeHindi(el.value);
            const correctAns = normalizeHindi(questions[qIndex].answers[blankIndex]);

            if (val === correctAns) {
                score++;
                el.style.borderColor = "limegreen";
            } else {
                el.style.borderColor = "red";
            }
        });

        const totalBlanks = questions.reduce((acc, q) => acc + q.answers.length, 0);

        const swalIcon = (score === totalBlanks) ? "success" : "info";
        const swalTitle = (score === totalBlanks) ? "🎉 सभी सही!" : "अरे नहीं...";

        Swal.fire({
            icon: swalIcon,
            title: swalTitle,
            text: `✅ आपका स्कोर: ${score}/${totalBlanks}`,
            confirmButtonColor: "#00bfff"
        });
    }

    const showAnswersHandler = () => {
        const questionId = $('#'+quizContainerID)[0].dataset.qid;
        const questions  = Activity.getData(questionId)?.content?.questions;

        $(".check_1").addClass("disable");
        const inputs = document.querySelectorAll(".inPutHindiNew");
        inputs.forEach(el => {
            const qIndex = el.dataset.qindex;
            const blankIndex = el.dataset.blankindex;
            el.value = questions[qIndex].answers[blankIndex];
            el.style.borderColor = "dodgerblue";
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

    return {
        render: fillInTheBlanks,
        checkAnswersHandler,
        showAnswersHandler,
        resetQuizHandler
    }

})();

const JumbleLetters = (() => {
    
    let isDragging   = false;
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
        } catch( err ) {
            console.log( 'JumbleLetters.shuffle : ', err );
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

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
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
            const showBtn  = parent.querySelector(".show-btn");
            const resetBtn = parent.querySelector(".reset-btn");
            if (checkBtn) checkBtn.addEventListener("click", submit);
            if (showBtn) showBtn.addEventListener("click", showAns);
            if (resetBtn) resetBtn.addEventListener("click", reset);
        } catch( err ) {
            console.log( 'JumbleLetters.ui : ', err );
        }
    }

    const loadAllQuestions = (questionId) => {
        try {

            const data = Activity.getData( questionId );

            ui(questionId);        
            const headElem = Activity.setQuestionDetails( questionId );
            if( !headElem.head && !headElem.subhead ) {
                document.querySelector('hr').remove();
            }

            document.querySelector(Define.get('questionContainer')).querySelector(".reset-btn").dataset.qid  = data?.id;        

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
        } catch( err ) {
            console.log( 'JumbleLetters.loadAllQuestions : ', err );
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
        } catch( err ) {
            console.log( 'JumbleLetters.enableTapSwapFallback : ', err );
        }
    }
    
    const submit = () => {
        try {
            let score = 0;

            const questionId = document.querySelector(Define.get('questionContainer')).querySelector(".reset-btn").dataset.qid;
            const jumbleData = Activity.getData( questionId )?.content;

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
                Swal.fire({ title: "Good!", text: "Congratulations! All are correct!", icon: "success" });
            } else {
                Swal.fire({ icon: "error", title: "Oops...", text: `You got ${score} out of ${jumbleData.length} correct. Please try again.` });
            }
        } catch( err ) {
            console.log( 'JumbleLetters.submit : ', err );
        }
    }
    
    const reset = () => {
        try {
            Activity.toggleCheckBtn( '#submit', false );
            const questionId = document.querySelector(Define.get('questionContainer')).querySelector(".reset-btn").dataset.qid;
            loadAllQuestions( questionId );
        } catch( err ) {
            console.log( 'JumbleLetters.reset : ', err );
        }
    }
    
    const showAns = () => {
        try {
            Activity.toggleCheckBtn( '#submit', true );

            const questionId = document.querySelector(Define.get('questionContainer')).querySelector(".reset-btn").dataset.qid;
            const jumbleData = Activity.getData( questionId )?.content;

            jumbleData.forEach((word, index) => {
                const letterRow = $(`#letters-${index}`);
                letterRow.empty();
                word.split('').forEach(letter => {
                    letterRow.append(`<div class="letterjumb correct">${letter}</div>`);
                });
            });
        } catch( err ) {
            console.log( 'JumbleLetters.showAns : ', err );
        }
    }    
    
    return {
        render:loadAllQuestions,
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

    let isDraggingIdioms   = false;
    let lastDragTimeIdioms = 0;

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            
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
			
			const checkBtn = parent.querySelector( '.submit-btn' );
			const showBtn  = parent.querySelector( '.show-btn' );
			const resetBtn = parent.querySelector( '.reset-btn' );

			if (checkBtn) checkBtn.addEventListener("click", checkAnswersWORD);
			if (showBtn) showBtn.addEventListener("click", showAnswersWORD);
			if (resetBtn) resetBtn.addEventListener("click", resetWord);
           
		} catch (e) {
            console.error( 'JumbleWords.ui :', e );
        }
    }

    const renderIdioms = (questionId) => {
        try {
            ui(questionId);

            const $container = $(idiomContainer);
            $container.empty();

            $container[0].dataset.qid = questionId;

            Activity.setQuestionDetails( questionId );

            const idioms = Activity.shuffleQuestions( Activity.getData( questionId )?.content );

            $container[0].dataset.shuffledIdioms = JSON.stringify(idioms);

            idioms.forEach((sentence, index) => {
                const words   = splitWords(sentence);
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

                if( $wordStance.data('ui-sortable') ) {
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
        } catch( err ) {
            console.error( 'JumbleWords.renderIdioms :', err );
        }
    }

    const enableTapSwapFallback = (container) => {
        try {
            let selected = null;
            $(container).off("click.touchSwap")
            .on("click.touchSwap touchend.touchSwap", ".word2", function (e) {
                if( Date.now() - lastDragTimeIdioms < 200 ) return;
                if( isDraggingIdioms ) return;
                if( e.type === "touchend" ) e.preventDefault();

                const a = selected;
                const b = this;

                if( !a ) {
                    selected = this;
                    $(this).addClass("ui-state-active");
                    return;
                }
                if( a === b ) {
                    $(this).removeClass("ui-state-active");
                    selected = null;
                    return;
                }

                const parent = a.parentNode;
                const aNext  = a.nextSibling;
                const bNext  = b.nextSibling;

                if( aNext === b ) {
                    parent.insertBefore(b, a);
                } else if( bNext === a ) {
                    parent.insertBefore(a, b);
                } else {
                    parent.insertBefore(a, bNext);
                    parent.insertBefore(b, aNext);
                }

                $(a).removeClass("ui-state-active");
                selected = null;
            });
        } catch( err ) {
            console.error( 'JumbleWords.enableTapSwapFallback :', err );
        }
    }

    const checkAnswersWORD = () => {
        try {
            let allRowsCorrect = true;        
            const idioms = JSON.parse($(idiomContainer)[0].dataset.shuffledIdioms);  

            $(".rowWordLet").each(function () {
                const index   = $(this).data("index");
                const correct = splitWords(idioms[index]);
                const user    = $(this).find(".word2").map(function () {
                    return $(this).text().trim();
                }).get();

                const $out = $(this).find(".finalOutput");
                $(this).find(".word2").removeClass("correctWord wrongwrongRORD");

                let allGood = true;
                $(this).find(".word2").each(function (i) {
                    if( $(this).text().trim() === correct[i] ) {
                        $(this).addClass("correctWord");
                    } else {
                        $(this).addClass("wrongwrongRORD");
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Some Answer are uncompleted please try again.!",
                        });
                        allGood = false;
                        allRowsCorrect = false;
                    }
                });

                if (allGood) {
                    
                } else {
                    
                }
            });
            
            if( allRowsCorrect ) {
                Swal.fire({
                    title : "Correct!",
                    text  : "All answers are correct!",
                    icon  : "success"
                });
            }
        } catch( err ) {
            console.error( 'JumbleWords.checkAnswersWORD :', err );
        }
    }

    const showAnswersWORD = () => {
        try {
            const questionId = $(idiomContainer)[0].dataset.qid;
            const idioms = Activity.getData( questionId )?.content;

            Activity.toggleCheckBtn( '.submit-btn', true );

            $(".rowWordLet").each(function () {
                const index   = $(this).data("index");
                const words   = splitWords(idioms[index]);
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
        } catch( err ) {
            console.error( 'JumbleWords.showAnswersWORD :', err );
        }
    }

    const resetWord = () => {
        try {
            Activity.toggleCheckBtn( '.submit-btn', false );

            const questionId = $(idiomContainer)[0].dataset.qid;
            renderIdioms( questionId );
        } catch( err ) {
            console.error( 'JumbleWords.resetWord :', err );
        }
    }

    const splitWords = ( sentence, spliter=' ' ) => {
        try {
            return sentence.split( spliter ).map( s => s.trim() );
        } catch( err ) {
            console.error( 'JumbleWords.splitWords :', err );
        }
    }

    return {
        render:renderIdioms,
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

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';

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
            
            const closeBtn = parent.querySelector( '#close-popup' );
            if( closeBtn ) closeBtn.addEventListener("click", closeFnMCQ);
        } catch (e) {
            console.error( 'Mcq.ui :', e );
        }
    }

    const renderAllQuestionsMCQ = (questionId) => {
        try {
            ui(questionId);

            const headElem = Activity.setQuestionDetails( questionId );
            if( !headElem.head && !headElem.subhead ) {
                document.querySelector( '.rowWithAudios' ).remove();
            }

            const headingEl = document.getElementById(heading);
            headingEl.dataset.qid = questionId;

            const activity = Activity.getData( questionId );
            const content  = activity?.content ?? {};
            const lang     = activity?.lang ?? 'en';
            const data     = content?.mcq ?? [];
            
            if (userAnswers.length < data.length) {
                for (let i = userAnswers.length; i < data.length; i++) userAnswers.push(null);
            } else if (userAnswers.length > data.length) {
                userAnswers.length = data.length;
            }

            const text = content?.text ?? {};
            const img  = content?.img ?? {};

            const mcqContextContainer = $('.mcq-context');
            mcqContextContainer.empty();
            
            const hasText = text && Object.keys(text).length > 0;
            const hasImg  = img && Object.keys(img).length > 0;

            if ( !hasText && !hasImg ) mcqContextContainer.remove();
            
            if (hasText || hasImg) {
                const textDiv = $('<div class="mcq-text"></div>');
                const imgDiv = $('<div class="mcq-image"><img ondragstart="return false;"/></div>');
                
                mcqContextContainer.addClass('row g-0');

                const preferredSide = (hasText && text?.side) ? text.side : (hasImg && img?.side) ? img.side : 'left';
                const side = String(preferredSide).toLowerCase();

                const commonClassText = 'col-md-12 col-lg-7 col-12 col-sm-12';
                const commonClassImg  = 'col-md-12 col-lg-5 col-sm-12 col-12 text-center';

                if (hasText) {
                    mcqContextContainer.append(textDiv);
                    const mcq_txt_class = hasImg ? `${commonClassText}` : 'col';
                    textDiv.addClass(mcq_txt_class).html(text.text || '');
                }

                if (hasImg) {
                    mcqContextContainer.append(imgDiv);
                    const mcq_img_cont_class = hasText 
                        ? commonClassImg
                        : 'col';
                    // ..

                    const image_width = img.width ?? '40%';

                    imgDiv.addClass(mcq_img_cont_class)
                        .find('img')
                        .attr('src', Activity.pathToCWD() + img.path)
                        .css({ 'border-radius' : '20px', 'width' : image_width });
                }

                if( side === 'left' || side === 'right' ) {
                    mcqContextContainer.css('flex-direction', 'row');
                    if( side === 'left' ) {
                        textDiv.css('order', 1);
                        imgDiv.css('order', 2);
                        
                        textDiv.removeClass( 'text-end' ).addClass( 'text-start' );

                    } else {
                        textDiv.css('order', 2);
                        imgDiv.css('order', 1);
                        
                        textDiv.removeClass( 'text-start' ).addClass( 'text-end' );
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

                    textDiv.removeClass( commonClassText ).addClass( 'col my-1' );
                    imgDiv.removeClass( commonClassImg ).addClass( 'col my-1 text-center' );
                } else {
                    mcqContextContainer.css('flex-direction', 'row');
                    textDiv.css('order', 1);
                    imgDiv.css('order', 2);
                }
                
            }            

            const html = [];
            data.map((mcq, ind) => {

                const question = mcq?.question ?? {};
                
                const path  = question?.image ?? undefined;
                const image = path != undefined ? 
                    question_image(Activity.pathToCWD()+path)
                    : undefined;
                // ..
                const replacement  = question?.replacement ?? '#_#';
                const questionText = path != undefined ?
                    question?.text.replace(replacement, image ) :
                    question?.text.replace(replacement, '' );
                // ..

                const options = mcq?.options.map((option, oi) => {
                    const optionText = option_text(option);
                    const isSelected = userAnswers[ind] === oi ? "selected" : "";
                    const html = `
                        <div class="col-md-6 col-sm-12 mb-2">
                        <label class="option-btn ${isSelected} mcq-type" data-oi="${oi}" data-qi="${ind}" >
                            <input type="radio" name="question-${ind}" ${userAnswers[ind] === oi ? "checked" : ""}>
                            <strong>(${Activity.translateBulletLabels({lang:lang, ind:oi})})</strong> 
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
                                <div class="row m-0 align-items-center" style="font-size:18px">
                                    <div style="width:30px" class="questionHeadingMCQ"><strong>${ind + 1}.</strong></div>
                                    <div class="col questionHeadingMCQ">${questionText}</div>
                                </div>
                                ${imageAboveOption}
                                <div class="row mt-2 ml-4">${options.join('')}</div>
                            </div>
                            `;
                // ..
                html.push( ques );
            });

            const container = document.getElementById(heading);
            container.innerHTML = html.join( '' );
            
            Array.from(document.querySelectorAll('.mcq-type')).forEach(mcq => {
                mcq.addEventListener("click", (ev) => {
                    const qi = parseInt(mcq.dataset.qi, 10);
                    const oi = parseInt(mcq.dataset.oi, 10);
                    selectOptionMCQ(qi, oi);
                });
            });
        } catch( e ) {
            console.error( 'Mcq.renderAllQuestionsMCQ', e );
        }
    }    

    const question_image = (src) => `<img src="${src}" style="height:100px; width:100px; object-fit:contain;">`;
    const option_image   = (src) => `<img src="${src}" style="height:150px; width:150px; object-fit:contain;">`;

    const option_text = (option) => {
        const path  = option?.image ?? undefined;
        const image = path != undefined ? 
            option_image(Activity.pathToCWD()+path) :
            undefined;
        // ..
        const optionText = path != undefined ? image : option?.text ?? '';
        return optionText;
    }

    const selectOptionMCQ = (qIndex, optIndex) => {
        try {
            const qi = parseInt(qIndex, 10);
            const oi = parseInt(optIndex, 10);
            
            const headingEl  = document.getElementById(heading);
            const questionId = headingEl.dataset.qid;
            
            const data = Activity.getData( questionId )?.content?.mcq || [];
            if( userAnswers.length < data.length ) {
                for( let i = userAnswers.length; i < data.length; i++ ) userAnswers.push(null);
            }

            userAnswers[qi] = oi;

            updateAttemptedCountMCQ();        
            renderAllQuestionsMCQ( questionId );
            checkIfAllAnsweredMCW();
        } catch( e ) {
            console.error( 'Mcq.selectOptionMCQ', e );
        }
    }

    const setUserAnswer = (qIndex, optIndex) => {
        try {
            const qi = parseInt(qIndex, 10);
            const oi = parseInt(optIndex, 10);
            userAnswers[qi] = oi;
            
            const questionId = document.getElementById(heading)?.dataset.qid;
            if (questionId) renderAllQuestionsMCQ(questionId);
        } catch( e ) {
            console.error( 'Mcq.setUserAnswer', e );
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
        if( allAnswered ) {
            showAnswerPopupMCQ();
        }
    }

    const showAnswerPopupMCQ = () => {
        try {
            let correctCount = 0;

            const questionId = document.getElementById(heading)?.dataset.qid;
            const activity = Activity.getData( questionId );
            const data     = activity?.content;
            const lang     = activity?.lang;
            const mcq      = data?.mcq || [];
            const headLabels = Activity.translateAnswerTableHeads(lang);

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
                    : (lang === "hi" ? "प्रयास नहीं किया" : "Not Attempted");

                const correctAnswerText = `${option_text(q?.options[q.answer])}`;
                const isCorrect = userIndex === q.answer;
                if (isCorrect) correctCount++;
                tableHTML += `
                <tr>
                    <th>${i + 1}.</th>
                    <td class="${isCorrect ? 'text-success' : 'text-danger'}">${userAnswerText}</td>
                    <td class="text-success">${correctAnswerText}</td>
                    <td class="${isCorrect ? 'text-success' : 'text-danger'}">
                    ${isCorrect ? (lang === "hi" ? "✔ " : "✔ ") : (lang === "hi" ? "✘ " : "✘")}
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
                scoreText.innerText =
                    lang === "hi"
                    ? `आपको ${totalQues} में से ${correctCount} अंक मिले हैं`
                    : `You scored ${correctCount} out of ${totalQues}`;
            }
        } catch( e ) {
            console.error( 'Mcq.showAnswerPopupMCQ', e );
        }
    }

    const closeFnMCQ = () => {
        try {
            const popup = document.getElementById("popupDialogAns");
            if (popup) popup.style.display = "none";
            userAnswers = userAnswers.map(() => null);
            const questionId = document.getElementById(heading)?.dataset.qid;
            if (questionId) renderAllQuestionsMCQ( questionId );
        } catch( e ) {
            console.error( 'Mcq.closeFnMCQ', e );
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

    let currentLevel    = 1;
    let currentQuestion = 0;
    let attemptCount    = 0;
    let submitted       = false;
    let currentQuizData    = undefined;
    let userAnswersAdaptiv = undefined;
    let showResultPending  = false;

    const getQid = () => {
        const el = document.querySelector('.' + headerContainer);
        return el ? el.dataset.qid : undefined;
    }

    const ui = ( questionId, totalQues ) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const data = Activity.getData(questionId)?.content;

            const instructions = [];
            (data?.headings?.right?.instruction || []).forEach((item) => {
                instructions.push(`<li>${item}</li>`);
            });

            parent.innerHTML = `<div class="question">
                                    <div class="container-fluid">
                                        <div class="${headerContainer}">
                                            <div class="btnAdapt shadow-sm">
                                                <span class="level-text">${data?.headings?.left ?? ''}</span>
                                                - 
                                                <span class="levelUpdate">${currentLevel}</span>
                                            </div>
                                            <div class="btnAdapt shadow-sm">
                                                <span id="attempted-text">${data?.headings?.mid?.attempted ?? ''}</span> 
                                                <span class="showD" id="attempted-count"> 0 </span> 
                                                <span id="outof-text">${data?.headings?.mid?.outof ?? ''}</span>
                                                <span class="showD" id="total-questions"> ${totalQues ?? 0} </span>
                                            </div>
                                            <div class="btnAdapt shadow-sm" id="nirdesh" style="cursor: pointer;">
                                                <svg class="iconsIns" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                                </svg>
                                                <span class="instruction-heading">${data?.headings?.right?.heading ?? ''}</span>
                                            </div>
                                        </div>
                                        <div class="container my-5 contAdapt shadow-lg">
                                            <div class="question-card justify-content-center animate__animated animate__fadeInDown" id="quizContainerAdaptiv"></div>
                                            <div class="buttonection" id="nav-buttons">
                                                <div class="buttons machiNgs">
                                                    <button class="submit-btn" id="prev-btn">Prev</button>
                                                    <button class="show-btn" id="next-btn">Next</button>
                                                    <button class="reset-btn" id="sub-btn" style="display: none;">Submit</button>
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

            const prevBtn    = parent.querySelector( '#prev-btn' );
            const nextBtn    = parent.querySelector( '#next-btn' );
            const submitBtn  = parent.querySelector( '#sub-btn' );
            const nirdeshBtn = parent.querySelector( '#nirdesh' );
            const closeOverlayBtn = parent.querySelector( '.close-overlay' );

            if( closeOverlayBtn ) closeOverlayBtn.addEventListener("click", closeFn);
            if( prevBtn ) prevBtn.addEventListener("click", prevQuestion);
            if( nextBtn ) nextBtn.addEventListener("click", nextQuestion);
            if( submitBtn ) submitBtn.addEventListener("click", showResult);
            if( nirdeshBtn ) nirdeshBtn.addEventListener("click", openFn);

        } catch (e) {
            console.error( 'Adaptiv.ui :', e );
        }
    }

    const renderQuestion = (questionId, direction) => {
        const level = currentLevel;
        const data  = Activity.getData(questionId)?.content?.levels;
        const found = (data || []).find( lvl => lvl.level === level );
        const questLen  = found?.questions?.length || 0;
        const q         = found?.questions?.[currentQuestion];
        currentQuizData = found?.questions || [];

        ui(questionId, questLen );

        if( userAnswersAdaptiv == undefined ) {
            userAnswersAdaptiv = new Array(questLen).fill(null);
        } else if( userAnswersAdaptiv.length !== questLen ) {
            const newArr = new Array(questLen).fill(null);
            for (let i=0;i<Math.min(newArr.length, userAnswersAdaptiv.length); i++) {
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
            container.innerHTML = `<div class="row m-0"><div class="col">Question not found.</div></div>`;
            updateNavButtons();
            return;
        }

        container.innerHTML = `<div class="row m-0" style="font-size:18px">
                <div style="width:30px" class="questionHeadingMCQ"><strong>Q${currentQuestion + 1}. </strong></div>
                <div class="col questionHeadingMCQ">${q.question}</div>
            </div>
            <div class="row mt-3">
                <div class="row mt-2 ml-4">
                ${q.options.map((opt, i) => {
                    const optionLabel = String.fromCharCode(65 + i);
                    // check selected for this question index (not level)
                    const isSelected = userAnswersAdaptiv[currentQuestion] === i;
                    let extraClass = isSelected ? "selected" : "";
                    if (submitted) {
                        if (i === q.answer) extraClass = "correct";
                        else if (isSelected && i !== q.answer) extraClass = "incorrect";
                    }
                    // put data attributes so click handler can read index
                    return `        
                        <div class="col-md-6 col-sm-12 mb-2">
                            <label class="option-btnAdpt ${extraClass}" data-option-index="${i}">
                                <input type="radio" name="question-${currentQuestion}" ${isSelected ? "checked" : ""} />
                                <strong>${optionLabel}.</strong> ${opt}
                            </label>
                        </div>
                    `;
                }).join('')}
                </div>
            </div>
        `;

        // add handlers to labels
        Array.from(document.querySelectorAll('.option-btnAdpt')).forEach((optionEl) => {
            optionEl.addEventListener("click", (ev) => {
                const idxAttr = optionEl.getAttribute('data-option-index');
                const idx = idxAttr !== null ? parseInt(idxAttr, 10) : 0;
                selectOption(currentQuestion, idx);
                // re-render current question to reflect classes/checked state
                renderQuestion(questionId);
            });
        });

        updateNavButtons();
    }

    const selectOption = (qIndex, optIndex) => {
        if (submitted) return;
        if (!Array.isArray(userAnswersAdaptiv) || qIndex < 0) return;
        userAnswersAdaptiv[qIndex] = optIndex;
        updateAttemptedCount();
        if (Array.isArray(currentQuizData) && userAnswersAdaptiv.filter(a => a !== null).length === currentQuizData.length && currentQuestion === currentQuizData.length - 1) {
            showResultPending = true;
        }
    }

    const nextQuestion = () => {
        if (userAnswersAdaptiv[currentQuestion] === null || userAnswersAdaptiv[currentQuestion] === undefined) {
            Swal.fire({
                title: "Info",
                text: "Please select an option before next.",
                icon: "info"
            });
            return;
        }

        if( currentQuestion < (currentQuizData?.length || 0) - 1 ) {
            currentQuestion++;
            renderQuestion(getQid(), 'next');
        }
        updateNavButtons();
    }

    const prevQuestion = () => {
        if( currentQuestion > 0 ) {
            currentQuestion--;
            renderQuestion(getQid(), 'prev');
        }
        updateNavButtons();
    }

    const updateNavButtons = () => {
        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");
        const subBtn = document.getElementById("sub-btn");
        const isLast = currentQuestion === (currentQuizData?.length || 0) - 1;
        const allAnswered = Array.isArray(userAnswersAdaptiv) && userAnswersAdaptiv.length > 0 && userAnswersAdaptiv.every(ans => ans !== null);

        if (prevBtn) prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';

        if (nextBtn && subBtn) {
            if (isLast && allAnswered) {
                nextBtn.style.display = 'none';
                subBtn.style.display = 'inline-block';
            } else {
                nextBtn.style.display = 'inline-block';
                subBtn.style.display = 'none';
            }
        }
    }

    const showResult = () => {
        try {
            const levelTextEl = document.getElementById("levelText");
            if (levelTextEl) levelTextEl.style.display = 'none';
            const container = document.getElementById("quizContainerAdaptiv");
            submitted = true;
            attemptCount++;
            const correct = (userAnswersAdaptiv || []).filter((a, i) => a === (currentQuizData?.[i]?.answer)).length;
            const showAnswerBtn = attemptCount >= 5;
            const showRetryBtn = correct < (currentQuizData?.length || 0);
            const showNextLevel = correct === (currentQuizData?.length || 0) && (currentQuizData?.length || 0) > 0;
            const finished = currentLevel === 3;
            const whenCompleteLevel = showNextLevel ? "completed." : "";
            const navButtonsEl = document.getElementById("nav-buttons");
            if (navButtonsEl) navButtonsEl.style.display = "none";
            const submitWrapper = document.getElementById("submit-btn-wrapper");
            if (submitWrapper) submitWrapper.innerHTML = '';
            if (!container) return;
            
            container.innerHTML = `
                <div class="result-box">
                    <h4><strong class="fs-1">Level ${currentLevel} ${whenCompleteLevel}</strong></h4>
                    <p class="text-danger my-3">Total Questions: ${currentQuizData?.length || 0}</p>
                    <p class="text-success my-3">Correct Answers: ${correct}</p>
                    <p class="text-success my-3">Attempt No: ${attemptCount}</p>
                    <div class="rowBtns">
                        ${showNextLevel ? `<button class='btn btn-success mt-3 mx-3' id='btn-next-level'>Go To Level ${currentLevel + 1}</button>` : ''}
                        ${(showRetryBtn || showNextLevel) ? `<button class='btn btn-primary mt-3 mx-3' id='btn-retry'>दोबारा प्रयास करें</button>` : ''}
                        ${(showAnswerBtn || showNextLevel) ? `<button class='btn btn-danger mt-3 mx-3' id='btn-show-answers'>Show Answers</button>` : ''}
                        ${(finished && showNextLevel) ? `<button class='btn btn-success mt-3 mx-3' id='btn-finish'>Finished</button>` : ''}
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
        } catch (e) {
            console.error('Adaptiv.showResult error:', e);
        }
    }

    const loadNextLevel = () => {
        const levelTextEl = document.getElementById("levelText");
        if (levelTextEl) levelTextEl.style.display = 'block';
        currentLevel++;
        
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
        
        renderQuestion(getQid());
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
        currentQuestion = 0;
        submitted = false;
        userAnswersAdaptiv = new Array(currentQuizData?.length || 0).fill(null);
        const navButtonsEl = document.getElementById("nav-buttons");
        if (navButtonsEl) navButtonsEl.style.display = "flex";
        renderQuestion(getQid());
        updateAttemptedCount();
        $(".instruc").show();
        $(".submit-info").show();
        const levelTextEl = document.getElementById("levelText");
        if (levelTextEl) levelTextEl.style.display = 'block';
        if (navButtonsEl) navButtonsEl.style.display = "block";
    }

    const showAnswerPopup = () => {
        let totalCorrect = 0;
        let totalQuestion = 0;
        let topData = ``;
        let midData1 = ``;
        let midData2 = ``;
        let midData3 = ``;
        const optionLabel = index => (typeof index === 'number' && index >= 0) ? String.fromCharCode(65 + index) : "";

        // Build table rows safely
        (currentQuizData || []).forEach((q, i) => {
            const userIndex = userAnswersAdaptiv?.[i];
            const userAnswerText = (userIndex !== null && userIndex !== undefined) ? `${optionLabel(userIndex)}. ${q.options[userIndex]}` : "Not attempted";
            const correctAnswerText = `${optionLabel(q.answer)}. ${q.options[q.answer]}`;
            if (userAnswerText === correctAnswerText) totalCorrect++;
            totalQuestion++;
            const status = (userAnswerText === correctAnswerText) ? '✔' : '✘';
            midData2 += `<tr class="trData">
                <th>Q${totalQuestion}.</th>
                <td class="text-danger">${userAnswerText}</td>
                <td class="text-success">${correctAnswerText}</td>
                <td class="text-danger">${status}</td>
            </tr>`;
        });

        topData = `<div class="d-flex justify-content-between align-items-center">
                    <h4 id="scoreTextQ1" class="text-center mb-3">You got : ${totalCorrect} out of ${totalQuestion}</h4>
                    <button class="btn btn-secondary" id="btn-close-answers">X</button>
                </div>`;
        midData1 = `<div id="" class="innerDIV">
                    <div class="table-responsive p-2">
                        <table class="table table-bordered" style="font-size:20px">
                        <thead class="thead-light" style="white-space: nowrap;">
                            <tr>
                            <th>Ques. No.</th>
                            <th>Your Answer</th>
                            <th>Correct Answer</th>
                            <th>Status</th>
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

    const popupFn = () => {
        $("#overlay,#popupDialog").show();
    }

    const finishMessage = () => {
        Swal.fire({
            title: "All level has been completed.",
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
        render:renderQuestion,
        userAnswersAdaptiv,
        currentLevel,
        currentQuestion,
        submitted,
        currentQuizData,
        attemptCount,
        showResultPending
    }

})();

const OnlyAudio = (() => {
    
    Activity.css('audioPlay.css');
    
    let mode = ""; 
    let ytPlayer = null;
    let animationFrameId = null;
    let loaderInterval = null;
    let isPlaying = false;
    let isSeeking = false;
    let wasPlayingBeforeSeek = false;
    let pendingYouTubeVideoId = null; 
    let initialized = false;
    
    let audioEl = null;
    let seekSlider = null;
    let currentTimeEl = null;
    let durationEl = null;
    let loader = null;
    let playPauseBtn = null;
    let replayBtn = null;
    let youtubeContainer = null;    

    const isYouTube = (url) => {
        return typeof url === "string" && (url.includes("youtube.com") || url.includes("youtu.be"));
    };

    const extractVideoId = (url) => {
        const match = (url || "").match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    };

    const safeLog = (...args) => {
        if (console && console.log) console.log(...args);
    };
    
    const formatTime = (sec) => {
        if (!Number.isFinite(sec) || sec < 0) sec = 0;
        const m = Math.floor(sec / 60).toString();
        const s = Math.floor(sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };
   
    const showLoader = () => {
        if (!loader) return;
        loader.style.display = "block";
        loader.textContent = "Loading... 0%";
        clearInterval(loaderInterval);
        let percent = 0;
        loaderInterval = setInterval(() => {
            percent += Math.floor(Math.random() * 10) + 5;
            if (percent >= 100) percent = 99;
            loader.textContent = `Loading... ${percent}%`;
        }, 150);
    };

    const hideLoader = () => {
        clearInterval(loaderInterval);
        if (loader) loader.textContent = "Loading... 100%";
        setTimeout(() => {
            if (loader) loader.style.display = "none";
        }, 250);
    };
    
    const cacheElements = () => {
        audioEl = document.getElementById("localAudio");
        seekSlider = document.getElementById("seekSlider");
        currentTimeEl = document.getElementById("currentTime");
        durationEl = document.getElementById("duration");
        loader = document.getElementById("loader");
        playPauseBtn = document.getElementById("playPauseBtn");
        replayBtn = document.getElementById("replayBtn");
        youtubeContainer = document.getElementById("youtubePlayer");
    };    

    const renderUI = (questionId) => {
        try {
            const description = Activity.getData(questionId)?.content?.desc;

            const container = Define && typeof Define.get === "function" ? Define.get('questionContainer') : null;
            const parent = container ? document.querySelector(container) : null;

            if (!parent) {
                console.error("Audio.renderUI: ui container not found (Define.get('questionContainer') =>", container, ")");
                return;
            }

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
                        <div class="audio-name">${description}</div>
                        <div>
                            <input type="range" class="w-100" id="seekSlider" min="0" max="100" value="0" step="0.1">
                            <div class="d-flex justify-content-between align-items-center progress-bar-seek">
                            <span id="currentTime">00:00</span>
                            <span id="duration">00:00</span>
                            </div>
                            <audio id="localAudio"></audio>
                            <div id="youtubePlayer"></div>
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
            </div>
            `;

            $('.container-sub').children().css({ 'width': '560px', 'height': '500px' });
            $('.audio-container').css({ 'width': '90%', 'height': '90%' }).removeClass('mb-3');
            $('.audio-container').parent().addClass('d-flex justify-content-center align-items-center');
        } catch (e) {
            console.error('OnlyAudio.renderUI error:', e);
        }
    };    

    const attachEvents = () => {
        if (!seekSlider) return;
        
        seekSlider.addEventListener("input", (e) => {
            handleSeek(e.target.value);
        });
        
        const onStart = () => {
            isSeeking = true;
            wasPlayingBeforeSeek = isPlaying;
            if (mode === "file" && audioEl && !audioEl.paused) audioEl.pause();
            else if (mode === "youtube" && ytPlayer && typeof ytPlayer.pauseVideo === "function") {
                try { ytPlayer.pauseVideo(); } catch (e) {}
            }
        };
        
        const onEnd = (val) => {
            isSeeking = false;
            handleSeek(val);
            if (wasPlayingBeforeSeek) {
                if (mode === "file" && audioEl) audioEl.play();
                else if (mode === "youtube" && ytPlayer && typeof ytPlayer.playVideo === "function") {
                    try { ytPlayer.playVideo(); } catch (e) {}
                }
            }
        };

        seekSlider.addEventListener("mousedown", onStart);
        seekSlider.addEventListener("touchstart", onStart);
        seekSlider.addEventListener("mouseup", (e) => onEnd(e.target.value));
        seekSlider.addEventListener("touchend", (e) => onEnd(e.target.value));

        if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlay);
        if (replayBtn) replayBtn.addEventListener("click", () => {
            if (mode === "youtube" && ytPlayer && typeof ytPlayer.seekTo === "function") {
                ytPlayer.seekTo(0, true);
                ytPlayer.playVideo && ytPlayer.playVideo();
            } else if (mode === "file" && audioEl) {
                audioEl.currentTime = 0;
                audioEl.play();
            }
        });
        
        if (audioEl) {
            audioEl.addEventListener("loadedmetadata", () => {
                hideLoader();
                if (durationEl) durationEl.textContent = formatTime(audioEl.duration);
            });

            audioEl.addEventListener("play", () => {
                updateButton(true);
                updateProgressLoop();
            });

            audioEl.addEventListener("pause", () => {
                updateButton(false);
                stopProgressLoop();
            });

            audioEl.addEventListener("ended", () => {
                if (seekSlider) seekSlider.value = 100;
                updateButton(false);
                stopProgressLoop();
            });
        }
    };

    const togglePlay = () => {
        if (mode === "youtube" && ytPlayer) {
            const state = (typeof YT !== "undefined" && YT.PlayerState) ? ytPlayer.getPlayerState() : null;
            if (state === YT.PlayerState.PLAYING) {
            try { ytPlayer.pauseVideo(); } catch (e) {}
            } else {
            try { ytPlayer.playVideo(); } catch (e) {}
            }
        } else if (mode === "file" && audioEl) {
            if (audioEl.paused) audioEl.play();
            else audioEl.pause();
        }
    };

    const updateButton = (playing) => {
        isPlaying = !!playing;
        if (playPauseBtn) playPauseBtn.src = playing ? "images/pause2.png" : "images/play2.png";
    };
    
    const seek = (seconds) => {
        if (mode === "youtube" && ytPlayer && typeof ytPlayer.seekTo === "function") {
            try {
            const current = ytPlayer.getCurrentTime();
            ytPlayer.seekTo(current + seconds, true);
            } catch (e) {}
        } else if (mode === "file" && audioEl) {
            const target = Math.max(0, Math.min(audioEl.duration || 0, (audioEl.currentTime || 0) + seconds));
            audioEl.currentTime = target;
        }
    };
    
    const handleSeek = (val) => {
        const percent = parseFloat(val);
        if (isNaN(percent)) return;
        if (mode === "youtube" && ytPlayer && typeof ytPlayer.getDuration === "function") {
            const dur = ytPlayer.getDuration() || 0;
            const target = (dur * percent) / 100;
            try { ytPlayer.seekTo(target, true); } catch (e) {}
        } else if (mode === "file" && audioEl && audioEl.duration) {
            audioEl.currentTime = (audioEl.duration * percent) / 100;
        } else {            
            if (seekSlider) seekSlider.value = percent;
        }
    };
    
    const updateProgressLoop = () => {
        const step = () => {
            if (!isSeeking) {
                let current = 0, duration = 0;
                if (mode === "youtube" && ytPlayer && typeof ytPlayer.getCurrentTime === "function") {
                    try {
                    current = ytPlayer.getCurrentTime() || 0;
                    duration = ytPlayer.getDuration() || 0;
                    } catch (e) { current = 0; duration = 0; }
                } else if (mode === "file" && audioEl) {
                    current = audioEl.currentTime || 0;
                    duration = audioEl.duration || 0;
                }

                if (duration > 0) {
                    const percent = (current / duration) * 100;
                    if (seekSlider) {
                    if (percent >= 99.5 || current >= duration) seekSlider.value = 100;
                    else seekSlider.value = percent;
                    }
                    if (durationEl) durationEl.textContent = formatTime(duration);
                }

                if (currentTimeEl) currentTimeEl.textContent = formatTime(current);
            }

            animationFrameId = requestAnimationFrame(step);
        };

        if (!animationFrameId) step();
    };

    const stopProgressLoop = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };
    
    const ensureYouTubeApi = () => {
        if (window.YT && window.YT.Player) return;
        if (document.querySelector('script[data-audio-yt]')) return;
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.setAttribute('data-audio-yt', '1');
        document.head.appendChild(tag);
    };
    
    window.onYouTubeIframeAPIReady = function () {
        try {
            safeLog("YouTube Iframe API ready");
            if (!pendingYouTubeVideoId) return;
            createYouTubePlayer(pendingYouTubeVideoId);
            pendingYouTubeVideoId = null;
        } catch (e) {
            console.error("OnlyAudio.onYouTubeIframeAPIReady error:", e);
        }
    };

    const createYouTubePlayer = (videoId) => {
        if (!youtubeContainer) return;
        try {
            ytPlayer = new YT.Player("youtubePlayer", {
            height: "0",
            width: "0",
            videoId,
            playerVars: { autoplay: 0, controls: 0, rel: 0 },
            events: {
                onReady: (event) => {
                    hideLoader();
                    const waitForDuration = setInterval(() => {
                            try {
                                const dur = ytPlayer.getDuration();
                                if (dur > 0) {
                                    if (durationEl) durationEl.textContent = formatTime(dur);
                                    clearInterval(waitForDuration);
                                }
                            } catch (err) {}
                        }, 300);
                },
                onStateChange: (event) => {
                    const state = event.data;
                    if (state === YT.PlayerState.PLAYING) {
                        updateButton(true);
                        updateProgressLoop();
                    } else if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED) {
                        updateButton(false);
                        stopProgressLoop();
                        if (state === YT.PlayerState.ENDED && seekSlider) seekSlider.value = 100;
                    }
                }
            }
            });
        } catch (e) {
            console.error("OnlyAudio.createYouTubePlayer error:", e);
        }
    };
    
    const init = (questionId) => {
        try {
            const source = Activity.getData(questionId)?.content?.src;

            if (!source || typeof source !== "string") {
                alert("Audio.init requires a source string (audio file URL or YouTube URL).");
                return;
            }
            
            if (initialized) destroy();

            renderUI(questionId);
            cacheElements();
            attachEvents();
            
            if (isYouTube(source)) {
                const vid = extractVideoId(source);
                if (!vid) {
                    alert("Invalid YouTube URL provided to Audio.init()");
                    return;
                }
                mode = "youtube";
                pendingYouTubeVideoId = vid;
                showLoader();
                ensureYouTubeApi();
            } else {
                mode = "file";
                if (!audioEl) {
                    console.error("Audio.init: audio element not found");
                    return;
                }
                audioEl.src = source;
                showLoader();
                audioEl.load();
            }

            initialized = true;
            safeLog("Audio initialized in mode:", mode);
        } catch (err) {
            console.error("OnlyAudio.init error:", err);
        }
    };
    
    const destroy = () => {
        try {
            stopProgressLoop();
            clearInterval(loaderInterval);
            loaderInterval = null;
            
            if (audioEl) {
                try {
                    audioEl.pause();
                } catch (e) {}
                
                const cloned = audioEl.cloneNode(true);
                audioEl.parentNode && audioEl.parentNode.replaceChild(cloned, audioEl);
            }
            
            if (playPauseBtn) {
                try { playPauseBtn.removeEventListener("click", togglePlay); } catch (e) {}
            }

            if (ytPlayer && typeof ytPlayer.destroy === "function") {
                try { ytPlayer.destroy(); } catch (e) {}
                ytPlayer = null;
            }
            
            const container = Define && typeof Define.get === "function" ? Define.get('questionContainer') : null;
            const parent = container ? document.querySelector(container) : null;
            if (parent) parent.innerHTML = "";
            
            audioEl = seekSlider = currentTimeEl = durationEl = loader = playPauseBtn = replayBtn = youtubeContainer = null;
            pendingYouTubeVideoId = null;
            mode = "";
            initialized = false;
        } catch (e) {
            console.error("OnlyAudio.destroy error:", e);
        }
    };

    return {
        render:init,
        destroy
    };
})();

const DropDown = (() => {

    Activity.css('dd.css');

    const quesClass = 'questionSections';

    const getQid = () => {
        return  $(`.${quesClass}`)[0].dataset.qid;
    }

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
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

            const submitBtn = parent.querySelector( '.submit-btn' );
            const showBtn   = parent.querySelector( '.show-btn' );
            const resetBtn  = parent.querySelector( '.reset-btn' );

            if( submitBtn ) submitBtn.addEventListener("click", checkAnswersDD );
            if( showBtn ) showBtn.addEventListener("click", showAnswersDD );
            if( resetBtn ) resetBtn.addEventListener("click", resetActivityDD );
        } catch (e) {
            console.error( 'DropDown.ui :', e );
        }
    }

    const renderQuestions = (questionId) => {
        ui(questionId);
        Activity.setQuestionDetails( questionId );

        const container     = document.querySelector(`.${quesClass}`);
        container.innerHTML = "";

        $(`.${quesClass}`)[0].dataset.qid = questionId;
        
        const content     = Activity.getData(questionId)?.content;
        const questions   = content?.questions;
        const replacement = content?.replacement;

        questions.forEach((q, i) => {
            const wrapper     = document.createElement("div");
            wrapper.className = "qLines";
            
            const parts = q.text.split( replacement );
            
            if( Array.isArray(q.options[0]) ) {
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
        if( blankIndex !== null ) select.setAttribute("data-blank", blankIndex);

        const lang = Activity.getData(getQid())?.lang;
        const optionSelect = lang == 'hi' ? 'चुनें' : 'choose';

        const def = document.createElement("option");
        def.value = "";
        def.disabled = true;
        def.selected = true;
        def.hidden = true;
        def.textContent = optionSelect;
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

        const content = Activity.getData(getQid())?.content;
        const lang    = content?.lang;
        const data    = content?.questions;
        const isHindi = lang == 'hi' ? true : false;

        const headings = isHindi
            ? { yourAns: "आपका उत्तर", correctAns: "सही उत्तर", status: "स्थिति", correct: "✔ सही", incorrect: "❌ गलत", unattempted: "उत्तर नहीं दिया", statusText: "सही उत्तर" }
            : { yourAns: "Your Answer", correctAns: "Correct Answer", status: "Status", correct: "✔ Correct", incorrect: "❌ Incorrect", unattempted: "Unattempted", statusText: "Correct" };

        const numbering = isHindi
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
        const parent    = document.querySelector(container);
        const btn       = parent.querySelector( '.show-btn' )
        const btnGroup  = btn.closest(".buttons");
        if (btnGroup) {
            const submitBtn = btnGroup.querySelector(".submit-btn");
            if (submitBtn) submitBtn.classList.add("disable");
        }

        const data = Activity.getData(getQid())?.content?.questions;
        const selects = document.querySelectorAll(`select`);
        selects.forEach(sel => {
            const qIdx     = parseInt(sel.getAttribute("data-index"), 10) || 0;
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
        const parent    = document.querySelector(container);
        const btn       = parent.querySelector( '.reset-btn' )
        const btnGroup  = btn.closest(".buttons");
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
        render:renderQuestions
    };

})();

const Circle = (() => {

    Activity.css('clickTo.css');

    const quesClass = 'questInCHeading';
    const dataKey   = 'c1';
    let activitiesClicked = {};
    let userSelections    = {};
    
    const getQid = () => {
        const el = document.querySelector(`.${quesClass}`);
        return el ? el.dataset.qid : undefined;
    };
    
    const ui = (questionId) => {
        try {
            const containerSelector = Define.get('questionContainer');
            const parent = document.querySelector(containerSelector);
            if (!parent) {
                console.error("ui container not found:", containerSelector);
                return;
            }
            
            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
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

            const submitBtn = parent.querySelector( '.submit-btn' );
            const showBtn   = parent.querySelector( '.show-btn' );
            const resetBtn  = parent.querySelector( '.reset-btn' );
            const closepop  = parent.querySelector( '#pop-close' );

            if( submitBtn ) submitBtn.addEventListener("click", () => checkCircle(dataKey) );
            if( showBtn ) showBtn.addEventListener("click", (ev) => showCircle(dataKey, ev.currentTarget) );
            if( resetBtn ) resetBtn.addEventListener("click", () => resetCircle(dataKey) );
            if( closepop ) closepop.addEventListener("click", closeReportClick );
        } catch (e) {
            console.error('Circle.ui :', e);
        }
    };
    
    const renderQuestions = (questionId) => {
        ui(questionId);
        Activity.setQuestionDetails(questionId);

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

        const activity = Activity.getData(questionId);
        const content  = activity?.content;
        const lang     = activity?.lang ?? 'en';

        if (!Array.isArray(content)) {
            console.error("renderQuestions: activity content should be an array", content);
            return;
        }

        activitiesClicked[dataKey] = {
            mode: activity.mode || activity?.content?.mode || activity?.mode || 'multi',
            questions: content,
            lang: activity?.content?.lang || activity.lang || 'en'
        };
        
        if( !userSelections[dataKey] ) userSelections[dataKey] = {};
        
        content.forEach((item, ind) => {
            const parts = item.text.split(/(\s+|,)/);
            const html = parts.map((part) => {
            if (part.trim() === "" || part === ",") return part;
                return `<span class="clickable" data-act="${dataKey}" data-id="${item.id}" data-word="${part.trim()}">${part}</span>`;
            }).join("");
            renderDiv.innerHTML += `
            <div class="questInC" data-id="${item.id}">
                <span class="label">(${Activity.translateBulletLabels({lang:lang, ind:ind})})</span> ${html}
            </div>`;
        });
        
        if( !document.__circle_click_attached ) {
            document.addEventListener("click", function (e) {
                if (!e.target || !e.target.classList) return;
                if (e.target.classList.contains("clickable")) {
                    const span = e.target;
                    const act = span.dataset.act;
                    const qId = span.dataset.id;
                    const word = span.dataset.word;

                    const activityMeta = activitiesClicked[act];
                    if (!activityMeta) {                    
                        const qid = getQid();
                        const actActivity = Activity.getData(qid);
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

        showClickReportClick(activity.questions, userSelections[key], activity.lang || 'en');
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

const ShravanKaushal = (() => {

    Activity.css('shrvan.css');

    const inputDataId = 'showrowInputsData1';

    let curntInd = -1;
    let audioPlayer = null;

    const getQid = () => {
        const el = document.querySelector(`#${inputDataId}`);
        return el ? el.dataset.qid : undefined;
    };

    const ui = (questionId) => {
        try {
            const containerSelector = Define.get('questionContainer');
            const btnid  = 'shravanPopupClose'
            const parent = document.querySelector(containerSelector);
            if (!parent) {
                console.error("ui container not found:", containerSelector);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            const buttonLabel = Activity.translateButtonLabels(lang);

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
                                                    <button class="buttShar" id="prevBtns">Previous</button>
                                                    <button class="buttShar" id="nextBtns">Next</button>
                                                    <button class="buttShar" id="replayBtns">Replay</button>
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
        Activity.setQuestionDetails(questionId);
        
        const dataSet = Activity.getData(getQid())?.content?.questions || [];

        const rowDiv = document.getElementById(inputDataId);
        rowDiv.innerHTML = "";
        
        const popupcontainer = document.querySelector('.ansViews');
        const popupContent   = [];
        dataSet.forEach((item, ind) => {
            const html = `
                <div class="columan shadow-lg">
                    <div class="textHindiOpt">${item.text}</div>
                    <input id="f${inputDataId}_${item.id}" type="text" maxlength="1" class="inputTSharavan" />
                </div>
            `;
            rowDiv.innerHTML += html;

            const popuprow = `<div class="viewsDivs">${ind+1}. ${item.popuptext} — ${item.text}</div>`;
            popupContent.push( popuprow );
        });
        popupcontainer.innerHTML = popupContent.join( '' );
       
    }

    const startShravan = () => {
        if (!audioPlayer) {
            
            audioPlayer = document.getElementById('audioPlayer');
            if (!audioPlayer) {
                console.error('audioPlayer not found');
                return;
            }
        }

        const src = Activity.getData(getQid())?.content?.audio?.headsrc
            ?? Activity.getData(getQid())?.content?.audio?.options?.[0];
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
        const audioList = Activity.getData(getQid())?.content?.audio?.options || [];
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

        if( curntInd >= audioList.length - 1 ) {
            nextBtn.classList.add('cNotAll');
            nextBtn.disabled = true;
        } else {
            nextBtn.classList.remove('cNotAll');
            nextBtn.disabled = false;
        }
    };

    const nextStep = () => {
        const audioList = Activity.getData(getQid())?.content?.audio?.options || [];
        if( curntInd < audioList.length ) {
            if (!audioPlayer) audioPlayer = document.getElementById('audioPlayer');

            if( curntInd < audioList.length - 1 ) {
                curntInd++;
            }

            audioPlayer.src = audioList[curntInd].src;
            audioPlayer.currentTime = 0;
            audioPlayer.play().catch(() => {});
        }
        updateButtons();
    };

    const prevStep = () => {
        const audioList = Activity.getData(getQid())?.content?.audio?.options || [];
        if( curntInd > 0 ) {
            if (!audioPlayer) audioPlayer = document.getElementById('audioPlayer');
            curntInd--;
            audioPlayer.src = audioList[curntInd].src;
            audioPlayer.currentTime = 0;
            audioPlayer.play().catch(() => {});
        }
        updateButtons();
    };

    const replayAudio = () => {
        if (!audioPlayer) audioPlayer = document.getElementById('audioPlayer');
        if (!audioPlayer) return;
        audioPlayer.currentTime = 0;
        audioPlayer.play().catch(() => {});
    };

    const checkAns = () => {
        const data    = Activity.getData(getQid());
        const dataSet = data?.content?.questions || [];
        const isHindi = (data?.lang === 'hi');

        let correctCount = 0;
        const totalQues = dataSet.length;

        let tableHTML = `<div class="table-responsive p-2">
            <table class="table table-bordered" style="font-size:18px">
            <thead class="text-light" style="white-space: nowrap;">
                <tr>
                <th>${isHindi ? "प्रश्न संख्या" : "Q. No."}</th>
                <th>${isHindi ? "आपका उत्तर" : "Your Answer"}</th>
                <th>${isHindi ? "सही उत्तर" : "Correct Answer"}</th>
                <th>${isHindi ? "परिणाम" : "Result"}</th>
                </tr>
            </thead>
            <tbody>`;

        dataSet.forEach((q, i) => {
            const inputEl = document.getElementById(`f${inputDataId}_${q.id}`);
            const userAns = parseInt( inputEl.value );
            const correctAnswers = Array.isArray(q.ans) ? q.ans : [q.ans];
            
            const isCorrect = userAns && correctAnswers.includes(userAns);
            if (isCorrect) correctCount++;

            const userAnswerText =
                userAns.length > 0 ? userAns : (isHindi ? "प्रयास नहीं किया" : "Not Attempted");
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
            scoreTextEl.innerText = isHindi
                ? `आपको ${correctCount} अंक मिले हैं (कुल ${totalQues})`
                : `You scored ${correctCount} out of ${totalQues}`;
        }

        const clickAct = document.getElementById("clickActShravan");
        if (clickAct) clickAct.style.display = "block";
    };

    const closeReportShravan = () => {
        const el = document.getElementById("clickActShravan");
        if (el) el.style.display = "none";
    };

    const showAns = () => {
        const dataSet = Activity.getData(getQid())?.content?.questions || [];
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

    const getQid = () => {
        const el = document.querySelector(`#${inputDataId}`);
        return el ? el.dataset.qid : undefined;
    };

    const ui = (questionId) => {
        try {
            const containerSelector = Define.get('questionContainer');
            const parent = document.querySelector(containerSelector);
            if (!parent) {
                console.error("ui container not found:", containerSelector);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container">
                                        <div class="qSections">
                                            <div class="font18 fontBold ${Define.get('head')}"></div>
                                            <div class="runingHead ${Define.get('subhead')}"></div>
                                        </div>
                                        <hr/>
                                        <div class="marTop5">
                                            <div id="${inputDataId}"></div>
                                        </div>
                                    </div>
                                    <div class="buttons machiNgs">
                                        <button class="submit-btn disable" id="submit4">${buttonLabel.check}</button>
                                        <button class="show-btn">${buttonLabel.show}</button>
                                        <button class="reset-btn">${buttonLabel.try}</button>
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
            
            const inputEl = document.getElementById(inputDataId);
            if (inputEl) inputEl.dataset.qid = questionId;
            
            const submiBtn = parent.querySelector('.submit-btn');
            const showBtn  = parent.querySelector('.show-btn');
            const resetBtn = parent.querySelector('.reset-btn');
            const closePopUpBtn = parent.querySelector('.popUp-close-btn');
           
            if (submiBtn) submiBtn.addEventListener('click', showPopUp );
            if (showBtn) showBtn.addEventListener('click', showAnswersTandF );
            if (resetBtn) resetBtn.addEventListener('click', resetTrueFalse );
            if (closePopUpBtn) closePopUpBtn.addEventListener('click', closePopUp );
        } catch (e) {
            console.error('TrueAndFalse.ui :', e);
        }
    };    

    const renderQues = (questionId) => {
        ui(questionId);
        const headElem = Activity.setQuestionDetails( getQid() );
        if( !headElem.head && !headElem.subhead ) {
            document.querySelector('hr').remove();
        }

        const activity = Activity.getData(getQid()) ?? {};
        const lang     = activity?.lang ?? 'en';
        const dataSet  = activity?.content ?? [];

        userAns = new Array(dataSet.length).fill(null);

        const btnLabels  = Activity.translateBooleanLabels(lang);
        
        const rowDiv     = document.getElementById(inputDataId);
        rowDiv.innerHTML = "";
        const rowContent = [];
        dataSet.forEach( (item, ind) => {
            const html = `
                <div class="row m-0 mb-3 question-block">
                    <div style="width:40px">(${Activity.translateBulletLabels({lang:lang, ind:ind})})</div>
                    <div class="col p-0">
                        <div class="row m-0">
                            <div class="col-lg-7 col-md-7 col-sm-8 col-10 p-0">&nbsp; ${item.question}</div>
                            <div class="col-auto options mb-2">
                                <button class="btn btn-sm btn-outline-success tnfBtn" data-answer="true" data-ind="${ind}">${btnLabels[0]}</button>
                                <button class="btn btn-sm btn-outline-danger tnfBtn" data-answer="false" data-ind="${ind}">${btnLabels[1]}</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            rowContent.push( html );
        });
        rowDiv.innerHTML = rowContent.join( '' );

        const containerSelector = Define.get('questionContainer');
        const parent  = document.querySelector(containerSelector);
        const tnfBtns = parent.querySelectorAll('.tnfBtn');

        if( tnfBtns.length > 0 ) {
            tnfBtns.forEach(btn => {
                btn.addEventListener('click', (e) => selectAnswer(e.currentTarget));
            });
        }
    }

    const selectAnswer = (thisObj) => {
        const ind    = $(thisObj).attr('data-ind');
        const answer = $(thisObj).attr('data-answer');
        userAns[ind] = answer;

        const btnGroup = thisObj.parentElement.querySelectorAll("button");
        btnGroup.forEach(b => b.classList.remove("active"));
        thisObj.classList.add("active");
        checkIfAllAttempt();
    }

    const checkIfAllAttempt = () => {
        const allAnswered = userAns.every(ans => ans !== null);
        const submitBtn   = document.getElementById(`submit4`);
        if( allAnswered ) {
            submitBtn.classList.remove("disable");
        }
    }

    const showAnswersTandF = () => {
        const questions = Activity.getData(getQid())?.content || [];
        $(`.options`).css('pointer-events', 'none');
        $(`#submit4`).addClass('disable');
        questions.map((item, index) => {
            const opt1 = $(`.options`).eq(index).children().eq(0);
            const opt2 = $(`.options`).eq(index).children().eq(1);

            const opt1ans = opt1.attr( 'data-answer' );
            
            $(`.options`).eq(index).children('button').removeClass('active');
            
            if (item.answer === (opt1ans === 'true')) {
                $(opt1).removeClass('active').addClass('active');
            } else {
                $(opt2).addClass('active');
            }
        })
    }

    const resetTrueFalse = () => {
        const questions = Activity.getData(getQid())?.content || [];  
        $(".tnfBtn").removeClass('active');
        $(`.options`).css('pointer-events', 'all');
        userAns = new Array(questions.length).fill(null);
        $(`#submit4`).addClass('disable');
    }

    const showPopUp = () => {
        const activity   = Activity.getData(getQid()) ?? {};
        const lang       = activity?.lang ?? 'en';
        const headLabels = Activity.translateAnswerTableHeads(lang);
        const questions  = activity?.content;

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
        table.push( tableBodyF );

        questions.forEach((item, i) => {
            const userAnswer = userAns[i];
            const correctAnswerText = item.answer;
            let count = 0;
            let isCorrect = false;
            
            if( item.answer === (userAnswer === 'true') ) {
                isCorrect = true;
                count++;
                correctCount++;
            }

            const userAnswerText = (userAnswer !== undefined && userAnswer !== null) ? `${userAnswer}` : lang == 'hi' ? "उत्तर नहीं दिया" : "Not Attempted";

            const textLabels = Activity.translateBooleanLabels(lang);

            const tempUserAnswer    = userAnswer == 'true' ? textLabels[0] : ( userAnswer == 'false' ? textLabels[1] : userAnswerText );
            const tempCorrectAnswer = correctAnswerText == true ? textLabels[0] : textLabels[1];
            
            const body = `
                <tr clsss='trData'>
                    <th>(${Activity.translateBulletLabels({lang:lang, ind:i})})</th>
                    <td class="${isCorrect ? 'text-success' : 'text-danger'}">${tempUserAnswer}</td>
                    <td class="text-success">${tempCorrectAnswer}</td>
                    <td class="${isCorrect ? 'text-success' : 'text-danger'} ">${isCorrect ? '✔' : '✘'}</td>
                </tr>
            `;
            table.push( body );
        });

        const tableBodyL = `</tbody></table></div>`;
        table.push( tableBodyL );

        document.getElementById("answer-review").innerHTML = table.join( '' );
        document.getElementById("popupDialogAns").style.display = "block";

        const finalText = lang == 'en' ?
            `You answered ${correctCount} out of ${totalQues} questions correctly!` :
            `आपको ${totalQues} में से ${correctCount} मिले है`;
        // ..

        document.getElementById("scoreTextQ1").innerText = finalText;
    }

    const closePopUp = () => {
        document.getElementById("popupDialogAns").style.display = "none";
    }

    return {
        render: renderQues
    };

})();

const DragAndDrop = (() => {

    Activity.css('dnd.css');

    const containerId       = 'dragItemsQ1';
    const containerSelector = '#question1';

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent = document.querySelector(container);
            if (!parent) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            
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
			
			const checkBtn = parent.querySelector( '.submit-btn' );
			const showBtn  = parent.querySelector( '.show-btn' );
			const resetBtn = parent.querySelector( '.reset-btn' );
            const playSvg  = parent.querySelector( '#playSvg' );
            const pauseSvg = parent.querySelector( '#pauseSvg' );

			if (checkBtn) checkBtn.addEventListener("click", checkAnswersDnd);
			if (showBtn) showBtn.addEventListener("click", showAnswersDnd);
			if (resetBtn) resetBtn.addEventListener("click", resetActivityDnd);

			if (playSvg)  playSvg.addEventListener("click", () => toggleAudio(true));
            if (pauseSvg) pauseSvg.addEventListener("click", () => toggleAudio(false));
		} catch (e) {
            console.error( 'DragAndDrop.ui :', e );
        }
    }
    
    const renderDataDND = (questionId) => {
        try {
            ui(questionId);
            const data    = Activity.getData( questionId );
            const content = data?.content || {};

            const hasAudio = content?.audio;
            if( !hasAudio ) $('.playsBtns').remove();

            const headElem       = Activity.setQuestionDetails( questionId );
            const audioBtnExists = document.contains(document.querySelector('.playsBtns'));
            if( !headElem.head && !headElem.subhead && !audioBtnExists ) {
                document.querySelector('.rowWithAudios').remove();
            }

            const dragItems = document.getElementById(containerId);
            dragItems.dataset.qid = questionId;
            
            const head     = [ '<div class="row w-100 justify-content-center">' ];
            const headings = Activity.shuffleQuestions( content?.heading );

            const defaultCol = {
                md : 4,
                sm : 6,
                om : 12
            };
            const col = {
                md: content?.col?.md ?? defaultCol.md,
                sm: content?.col?.sm ?? defaultCol.sm,
                om: content?.col?.om ?? defaultCol.om
            };

            headings.forEach((item) => {
                const html = `<div class="col-md-${col.md} col-sm-${col.sm} col-${col.om}">
                                <div class="wh1">
                                    ${(item.text != '' && item.text ) ? `<div class="headingsDND">${item.text}</div>` : ''}
                                    <div class="dropSect" data-accept="${item.accept}"></div> 
                                </div>
                            </div>`;
                // ..
                head.push( html );
            });
            head.push( '</div>' );
            $('.dropItems').html( head.join('') );

            const opt     = [];
            const options = Activity.shuffleQuestions( data?.content?.options );
            options.forEach((item) => {
                const html = `<div class="wordDrag" data-ans="${item.ans}" data-id="${item.id}">${item.text}</div>`;
                opt.push( html );
            });            
            dragItems.innerHTML = opt.join('');

            makeDraggable(`#${containerId} .wordDrag`);
            initDroppable(containerSelector);
        } catch (e) {
            console.error( 'DragAndDrop.renderDataDND :', e );
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
            console.error( 'DragAndDrop.makeDraggable :', e );
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
            console.error( 'DragAndDrop.initDroppable :', e );
        }
    }

    const checkAnswersDnd = () => {
        try {
            let correct = 0;
            const total = $(`${containerSelector} .wordDrag`).length;

            $(`${containerSelector} .dropSect`).each(function () {
                const accept = $(this).attr( 'data-accept' );
                const droppedItems = $(this).children('.wordDrag');
                droppedItems.each(function() {
                    let background = '#ffcdd2';
                    if( $(this).attr( 'data-ans' ) == accept ) {
                        background = '#c8e6c9';
                        correct++;
                    }
                    $(this).css( 'background',  background);
                });
            });

            Swal.fire({
                title: correct === total ? "All Correct!" : "Check your answers",
                text: `You got ${correct} out of ${total} correct!`,
                icon: correct === total ? "success" : "info",
                confirmButtonText: "OK"
            });
        } catch (e) {
            console.error( 'DragAndDrop.checkAnswersDnd :', e );
        }
    }

    const showAnswersDnd = () => {
        try {
            Activity.toggleCheckBtn( '.submit-btn', true );

            const dragItems  = document.getElementById(containerId);
            const questionId = dragItems.dataset.qid;

            renderDataDND(dragItems.dataset.qid);

            $(`${containerSelector} .dropSect`).empty();
            const data = Activity.getData( questionId )?.content?.options;
            
            data.forEach((item) => {
                const $clone = $(`<div class="wordDrag">${item.text}</div>`)
                    .css({ background: "#c8e6c9", position: "relative" })
                    .attr("data-ans", item.ans);
                $(`${containerSelector} .dropSect[data-accept='${item.ans}']`).append($clone);
            });
        } catch (e) {
            console.error( 'DragAndDrop.showAnswersDnd :', e );
        }
    }

    const resetActivityDnd = () => {
        try {
            Activity.toggleCheckBtn( '.submit-btn', false );

            const dragItems = document.getElementById(containerId);
            renderDataDND(dragItems.dataset.qid);
            $(`${containerSelector} .dropSect`).empty();
            $(`${containerSelector} .wordDrag`);
        } catch (e) {
            console.error( 'DragAndDrop.resetActivityDnd :', e );
        }
    }

    const toggleAudio = ( play=true ) => {
        try {
            const dragItems  = document.getElementById(containerId);
            const questionId = dragItems.dataset.qid;

            const src   = Activity.getData( questionId )?.content?.audio;
            const audio = new Audio(src);
            if( play ) {
                $("#playSvg").hide();
                $("#pauseSvg").show();
                audio.play();
            } else {
                $("#playSvg").show();
                $("#pauseSvg").hide();
                audio.pause();
            }
        } catch (e) {
            console.error( 'DragAndDrop.toggleAudio :', e );
        }
    }
    
    return {
        render:renderDataDND,
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

    const getQid = () => {
        const el = document.querySelector(`#${containerId}`);
        return el ? el.dataset.qid : undefined;
    };

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent    = document.querySelector(container);

            if( !parent ) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container">
                                        <div class="rowWithAudios border-bottom font18 fontBold ${Define.get('head')}"></div>
                                        <div class="question-block">
                                            <div class="dragItems drag-container2" id="${containerId}"></div>
                                            <div class="drag-question-box2 mt-3"></div>
                                        </div>
                                        <div class="buttons machiNgs">
                                            <button class="submit-btn disable" id="submit2">${buttonLabel.check}</button>
                                            <button class="show-btn" id="showAns2">${buttonLabel.show}</button>
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
                                </div>`;
            // ..
			
			const submitBtn = parent.querySelector( '.submit-btn' );
			const showBtn   = parent.querySelector( '.show-btn' );
			const resetBtn  = parent.querySelector( '.reset-btn' );
			const popUpCloseBtn = parent.querySelector( '.popUp-close-btn' );

			if (submitBtn) submitBtn.addEventListener("click", showPopUp);
			if (showBtn) showBtn.addEventListener("click", showDropAnswers);
			if (resetBtn) resetBtn.addEventListener("click", resetDropBox);
			if (popUpCloseBtn) popUpCloseBtn.addEventListener("click", closePopUp);
		} catch (e) {
            console.error( 'DragAndDropMulti.ui :', e );
        }
    }

    const showPopUp = () => {
        const activity   = Activity.getData(getQid()) ?? {};
        const lang       = activity?.lang ?? 'en';
        const questions  = activity?.content?.questions ?? [];
        const headLabels = Activity.translateAnswerTableHeads(lang);

        const strictMatch = activity?.content?.strictMatch;
        const option_side = activity?.content?.option_side ?? 'top';

        const type_set    = activity?.content?.set ?? {};
        const hasTypeSet  = Object.keys(type_set).length > 0;

        let correctCount = 0;
        let totalQues    = questions.length;
        const table      = [];

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
        table.push( tableBodyF );

        if( hasTypeSet ) {
            totalQues = type_set?.answers.length || 0;
            const compareAnswerArrays = (correctAns=[], userAns=[]) => {
                const setUserAns = new Set(userAns);
                const missing    = correctAns.filter(x => !setUserAns.has(x));
                
                const counts = userAns.reduce((acc, cur) => {
                    acc[cur] = (acc[cur] || 0) + 1;
                    return acc;
                }, {});
                const duplicates = Object.keys(counts).filter(k => counts[k] > 1);
                
                const setCorrectAns = new Set(correctAns);
                const extras = userAns.filter(x => !setCorrectAns.has(x));

                const ok = missing.length === 0 && duplicates.length === 0;

                userAns.map( (ans, key) => {
                    let isCorrect = false;
                    if( setCorrectAns.has(ans) ) {
                        isCorrect = true;
                        correctCount++;
                    }

                    const body = `
                        <tr clsss='trData'>
                            <th>(${Activity.translateBulletLabels({lang:lang, key:key})})</th>
                            <td class="${isCorrect ? 'text-success' : 'text-danger'}">${ans.toString()}</td>
                            <td></td>
                            <td class="${isCorrect ? 'text-success' : 'text-danger'} ">${isCorrect ? '✔' : '✘'}</td>
                        </tr>
                    `;
                    table.push( body );
                });

                return { ok, missing, duplicates, extras };
            }
            compareAnswerArrays( type_set?.answers, userAns )
        } else {
            shuffledQuestions.forEach((item, i) => {
                const userAnswer = userAns[i];
                let count = 0;
                let isCorrect = false;

                let correctAnswerText = item.options;
                if ( option_side == 'right' ) {
                    correctAnswerText = item.options[item.answer] ?? '';
                }

                if( strictMatch ) {
                    isCorrect = userAnswer.toString() === correctAnswerText.toString();
                    if( isCorrect ) {
                        count++;
                        correctCount++;
                    }
                } else {
                    const remaining = [...correctAnswerText];
                    const match = userAnswer.map(userWord => {
                        const id    = remaining.indexOf(userWord);
                        const match = id !== -1;
                        if (match) remaining.splice(id, 1);
                        return match;
                    });

                    match.map( (item) => {
                        if( item == true ) {
                            count++;
                        }
                        if( count == correctAnswerText.length ) {
                            isCorrect = true;
                            correctCount++;
                        }
                    });
                }

                const body = `
                    <tr clsss='trData'>
                        <th>(${Activity.translateBulletLabels({lang:lang, ind:i})})</th>
                        <td class="${isCorrect ? 'text-success' : 'text-danger'}">${userAnswer.toString()}</td>
                        <td class="text-success">${correctAnswerText.toString()}</td>
                        <td class="${isCorrect ? 'text-success' : 'text-danger'} ">${isCorrect ? '✔' : '✘'}</td>
                    </tr>
                `;
                table.push( body );
            });
        }

        const tableBodyL = `</tbody></table></div>`;
        table.push( tableBodyL );

        document.getElementById("answer-review").innerHTML = table.join( '' );

        if( hasTypeSet ) {
            document.querySelectorAll("tr").forEach(row => {
                const cells = row.querySelectorAll("th, td");
                if( cells.length >= 3 ) {
                    cells[2].remove();
                }
            });
        }

        document.getElementById("popupDialogAns").style.display = "block";

        const finalText = lang == 'en' ?
            `You answered ${correctCount} out of ${totalQues} questions correctly!` :
            `आपको ${totalQues} में से ${correctCount} मिले है`;
        // ..

        document.getElementById("scoreTextQ1").innerText = finalText;
    }

    const closePopUp = () => {
        document.getElementById("popupDialogAns").style.display = "none";
    }

    const showDropAnswers = () => {
        const activity    = Activity.getData(getQid()) || {};
        const option_side = activity?.content?.option_side || 'top';

        const type_set    = activity?.content?.set || {};
        const hasTypeSet  = Object.keys(type_set).length > 0;
        
        $(`#submit2`).addClass('disable');
        DragEnabled = false;
        if( option_side == 'right' ) {
            shuffledQuestions.map( (item, ind) => {
                $(`.dropBox_2`).eq(ind).html( item.options[item.answer] );
            });
        } else if( hasTypeSet ) {
            type_set.answers.map( (ans,ind) => {
                $(`.dropBox_2`).eq(ind).html( ans );
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
    
    const renderDataDND = (questionId) => {
        try {
            ui(questionId);
            Activity.setQuestionDetails( questionId );

            const data = Activity.getData( questionId );
            const lang = data?.lang ?? 'en';

            const dragItems = document.getElementById(containerId);
            dragItems.dataset.qid = questionId;

            const content     = data?.content || {};
            const replacement = content?.replacement || '#_#';
            const option_side = content?.option_side || 'top';
            const type_set    = content?.set || {};
            const hasTypeSet  = Object.keys(type_set).length > 0;
            const isShuffle   = content?.shuffle ?? true;
            
            const questions_temp = content?.questions || [];

            const optionHtml = [];
            const questions  = isShuffle == true ? Activity.shuffleQuestions( questions_temp ) || [] : questions_temp;

            const drag_option_html = (item, ind) => `<div class="drag_${ind} wordDrag font17" data-text="${item}" data-ans="${item}">${item}</div>`;

            if( option_side == 'top' && !hasTypeSet ) {
                const options       = Activity.shuffleQuestions( questions || [] )?.flatMap( obj => obj.options ) || [];
                const addOptions    = Activity.shuffleQuestions( content?.addOptions || [] ) || [];
                const mergedOptions = Activity.shuffleQuestions( [...new Set([...options, ...addOptions])] || [] ) || [];
                mergedOptions.forEach((item, ind) => {
                    const html = drag_option_html(item, ind);
                    optionHtml.push( html );
                });
                $('.drag-container2').html( optionHtml.join( '' ) );
            }

            if( hasTypeSet ) {
                const options       = Activity.shuffleQuestions( type_set?.options || [] ) || [];
                const uniqueOptions = [...new Set(options)];
                uniqueOptions.forEach((item, ind) => {
                    const html = drag_option_html(item, ind);
                    optionHtml.push( html );
                });
                $('.drag-container2').html( optionHtml.join( '' ) );
            }

            const questionHtml = [];
            if( hasTypeSet ) {
                type_set?.answers.map((item, ind) => {
                    const html = `
                        <div class="row g-0 my-3">
                            <div class="col-auto me-2">
                                (${Activity.translateBulletLabels({lang:lang, ind:ind})})
                            </div>
                            <div class="col question-container_2 d-flex flex-wrap align-items-center" style="gap: 5px" data-queindex="${ind}">
                                <div class="drop-Box dropBox_2 ui-droppable"></div>
                            </div>
                        </div>
                    `;
                    questionHtml.push( html );
                });
            } else {
                shuffledQuestions = questions;
                questions.forEach((item, ind) => {
                    const quesOptions = item.options || [];

                    let replacedText = item.text;
                    quesOptions.forEach(ans => {
                        replacedText = replacedText.replace(
                            replacement,
                            `<div class="drop-Box dropBox_2 ui-droppable" data-ans="${ans}"></div>`
                        );
                    });
                    
                    const image = [];
                    if( item.image != undefined ) {
                        const image_width = item.width ?? '200px';
                        const img = `<img class="" style="width: ${image_width};" src="${Activity.pathToCWD()}${item.image}" ondragstart="return false;"></img>`
                        image.push( img );
                    }
                        
                    if( option_side == 'right' ) {
                        const options = [];
                        quesOptions.map((item,ind) => {
                            options.push( drag_option_html(item, ind) );
                        });
                        const html = `
                            <div class="row g-0 my-3 align-items-center">
                                <div class="col-auto me-1">
                                    (${Activity.translateBulletLabels({lang:lang, ind:ind})})
                                </div>
                                <div class="col d-flex flex-wrap align-items-center question-container_2" data-queindex="${ind}">
                                    ${image.join( '' )}
                                    ${replacedText}
                                    <div class="ms-3 d-flex">
                                        ${options.join( '' )}
                                    </div>
                                </div>
                            </div>
                        `;
                        questionHtml.push( html );
                    } else {
                        const html = `
                            <div class="row g-0 my-3">
                                <div class="col-auto me-1">
                                    (${Activity.translateBulletLabels({lang:lang, ind:ind})})
                                </div>
                                <div class="col question-container_2 d-flex flex-wrap align-items-center" style="gap: 5px" data-queindex="${ind}">
                                    ${image.join( '' )}
                                    ${replacedText}
                                </div>
                            </div>
                        `;
                        questionHtml.push( html );
                    }
                });
            }
            $('.drag-question-box2').html( questionHtml.join( '' ) );

            userAns = Array(questions.length).fill([]);
            
            makeDraggable(`.wordDrag`);
            initDroppable('.dropBox_2');
            DragEnabled = true;
        } catch (e) {
            console.error( 'DragAndDropMulti.renderDataDND :', e );
        }
    }

    const makeDraggable = (selector) => {
        try {
            $(selector).draggable({
                revert: true,
                containment: '.container-sub',
                start: function () {
                    if( !DragEnabled ) {
                        return false;
                    }
                }
            });
        } catch (e) {
            console.error( 'DragAndDropMulti.makeDraggable :', e );
        }
    }

    const initDroppable = (selector) => {
        try {
            $(selector).droppable({
                revert: true,
                drop: function (event, ui) {
                    const dragVal = ui.draggable.attr('data-ans');
                    $(this).html(dragVal).attr('data-val', `${dragVal}`);
                    const index = $(this).parent().attr('data-queIndex');

                    if( Array.isArray(userAns[index]) ) {
                        const totalDropBox = $(`.question-container_2`).eq(index).children(selector);
                        let tempArr = [];
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
            console.error( 'DragAndDropMulti.initDroppable :', e );
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
    
    return {
        render:renderDataDND,
    }

})();

const Sorting = (() => {

    const containerId = 'sorting-container';

    const sequenceClass    = 'sort-options';
    const quesHeadingClass = 'sort-ques-heading';

    const getQid = () => {
        const el = document.querySelector(`#${containerId}`);
        return el ? el.dataset.qid : undefined;
    };

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent    = document.querySelector(container);

            if( !parent ) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            
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
			
			const submitBtn = parent.querySelector( '.submit-btn' );
			const showBtn   = parent.querySelector( '.show-btn' );
			const resetBtn  = parent.querySelector( '.reset-btn' );

			if (submitBtn) submitBtn.addEventListener("click", checkAnswer);
			if (showBtn) showBtn.addEventListener("click", showAnswer);
			if (resetBtn) resetBtn.addEventListener("click", tryAgain);
		} catch (e) {
            console.error( 'Sorting.ui :', e );
        }
    }

    const renderQuestion = (questionId) => {
        try {
            ui(questionId);
            Activity.setQuestionDetails( questionId );

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity?.lang ?? 'en';

            const dragContainer = document.getElementById(containerId);
            dragContainer.dataset.qid = questionId;

            const content  = activity?.content ?? {};
            const quesHead = content?.question ?? '';
            const sequence = Activity.shuffleQuestions(content?.sequence ?? [] ) ?? [];

            renderSequence(sequence);
            
            $('.'+quesHeadingClass).html( quesHead );

            dragContainer.querySelectorAll(`.${sequenceClass} li`).forEach(li => {
                li.addEventListener("dragstart", () => li.classList.add("dragging"));
                li.addEventListener("dragend", () => li.classList.remove("dragging"));
            });

            const ul = dragContainer.querySelector('.'+sequenceClass);
            if( ul ) ul.addEventListener("dragover", handleDragOver);

        } catch (e) {
            console.error( 'Sorting.renderQuestion :', e );
        }
    }

    const renderSequence = (seqArray, seqClass='') => {
        try {
            const seqHtml = [];
            seqArray.map( (item) => {
                const li = `<li draggable="true" data-text="${item}" class="ddg ${seqClass}">${item}</li>`;
                seqHtml.push( li );
            });

            $('.'+sequenceClass).html( seqHtml.join( '' ) );
        } catch( e ) {
            console.error( 'Sorting.renderSequence :', e );
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
            const box    = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) return { offset, element: child };
            else return closest;
        }, { offset: -Infinity }).element;
    }

    const showAnswer = () => {
        const activity = Activity.getData(getQid()) || {};
        const content  = activity?.content ?? {};
        const sequence = content?.sequence ?? [];

        renderSequence( sequence, 'text-success border-success' );

        const ul = document.querySelector('.' + sequenceClass);
        if (ul) ul.removeEventListener('dragover', handleDragOver);

        $(`.${sequenceClass} li`).map( (i,item) => {
            $(item).on('dragstart', (e) => { e.preventDefault(); return false; })
        });

        $( '.submit-btn' ).addClass( 'disable' );
    }

    const tryAgain = () => {
        const activity = Activity.getData(getQid()) || {};
        const content  = activity?.content ?? {};
        const sequence = Activity.shuffleQuestions( content?.sequence ?? [] ) ?? [];

        renderSequence( sequence );

        const ul = document.querySelector('.' + sequenceClass);
        if (ul) {
            ul.removeEventListener('dragover', handleDragOver);
            ul.addEventListener('dragover', handleDragOver);
        }

        $(`.${sequenceClass} li`).map( (i,item) => {
            $(item).on('dragstart', (e) => {});
        });

        document.querySelectorAll(`.${sequenceClass} li`).forEach(li => {
            li.addEventListener("dragstart", () => li.classList.add("dragging"));
            li.addEventListener("dragend", () => li.classList.remove("dragging"));
        });

        $( '.submit-btn' ).removeClass( 'disable' );
    }

    const checkAnswer = () => {
        const activity = Activity.getData(getQid()) || {};
        const content  = activity?.content ?? {};
        const sequence = content?.sequence ?? [];

        const attempt = [];
        [...$(`.${sequenceClass} li`)]?.map( (item,ind) => {
            attempt.push( item.innerHTML );
        });

        if( sequence.toString() === attempt.toString() ) {
            Swal.fire({
                title: "Well Done",
                icon: "success"
            });

            renderSequence( sequence, 'text-success border-success' );
        } else {            
            attempt?.map( (item, ind) => {
                let dragClass = 'text-success border-success';
                if( sequence[ind] != item ) {
                    dragClass = 'text-danger border-danger';
                }
                $('.ddg').eq(ind).addClass( dragClass );
            });

            Swal.fire({
                title: "Try again",
                icon: "error"
            });
        }
    }

    return {
        render : renderQuestion,
    }

})();

const Pdf = (() => {
    const containerId = 'pdf-container';

    const getQid = () => {
        const el = document.querySelector(`#${containerId}`);
        return el ? el.dataset.qid : undefined;
    };

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent    = document.querySelector(container);

            if( !parent ) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            
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
            console.error( 'Pdf.ui :', e );
        }
    };

    const toggle_loader = ( show=true ) => {
        try {
            $( '.spinner-container' ).remove();
            $( '.viewer' ).addClass( 'position-relative' );
            const html = `<div class="spinner-container position-absolute top-0 end-0 start-0 bottom-0 bg-white opacity-75 z-3 d-flex align-items-start justify-content-center" style="border-radius:20px;padding-top:25vh;">
                            <div class="spinner-border text-primary" role="status"></div>
                        </div>`;
            // ..
            if( show ) {
                $( '.viewer' ).append( html );
            }
        } catch( err ) {
            console.log( 'ERROR : Pdf.toggle_loader', err );
        }
    };

    const renderPdf = async (questionId) => {
        try {
            ui(questionId);
            
            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity?.lang ?? 'en';
            const path     = activity?.content?.pdf ? Activity.pathToCWD()+activity?.content?.pdf : '';

            if( !path ) {
                console.warn('No PDF path found');
                return;
            }

            const downloadBtn     = document.getElementById("downloadBtn");
            const downloadAllowed = activity?.content?.download;
            if( downloadBtn && downloadAllowed ) {
                downloadBtn.onclick = () => {
                    const a    = document.createElement("a");
                    a.href     = path;
                    a.download = path;
                    a.click();
                };
            } else {
                downloadBtn.remove();
            }
            
            toggle_loader(true);
            await Define.get( 'loadScript' )('js/pdf.js');
            await Define.get( 'loadScript' )('js/pdf.worker.js');

            if( window.pdfjsLib && pdfjsLib.GlobalWorkerOptions ) {
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/pdf.worker.js';
            }
            
            const canvas    = document.getElementById("pdfCanvas");
            const ctx 		= canvas.getContext("2d");
            const pageNumInput = document.getElementById("pageNum");
            const pageCountEl  = document.getElementById("pageCount");
            
            let pdfDoc      = null;
            let currentPage = 1;
            let scale       = 1.2;
            let rotation    = 0;

            const loadingTask = pdfjsLib.getDocument(path);
            loadingTask.onProgress = (data) => {
                if( data.total && data.loaded === data.total ) toggle_loader(false);
            };

            try {
                pdfDoc = await loadingTask.promise;
                console.info( '[OK] ', 'PDF loaded.');
            } catch (err) {
                console.info( '[ERROR]', 'Failed to load PDF =>', err.message ?? err );
                return;
            }

            const togglePdfControls = (enabled) => {
                const ids = ['prevBtn','nextBtn','zoomInBtn','zoomOutBtn','resetBtn'];
                ids.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.disabled = !enabled;
                });
                if (pageNumInput) pageNumInput.disabled = !enabled;
            }

            const renderPage = async () => {
                toggle_loader(true);

                if( !pdfDoc ) return;

                let currentRenderTask = null;
                let isRendering = false;

                if( currentRenderTask ) {
                    try {
                        currentRenderTask.cancel();
                        await new Promise(r => setTimeout(r, 0));
                    } catch (e) {}
                    currentRenderTask = null;
                }

                togglePdfControls(false);
                isRendering = true;
                
                try {
                    const page 	        = await pdfDoc.getPage(currentPage);
                    const viewport      = page.getViewport({ scale, rotation });
                    const outputScale   = window.devicePixelRatio || 1;
                    canvas.width        = viewport.width * outputScale;
                    canvas.height       = viewport.height * outputScale;
                    canvas.style.width  = viewport.width + "px";
                    canvas.style.height = viewport.height + "px";
                    const transform 	= outputScale !== 1
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
                    if( err && err.name === 'RenderingCancelledException' ) {
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
            document.getElementById("zoomInBtn").onclick  = () => { scale *= 1.2; renderPage(); };
            document.getElementById("zoomOutBtn").onclick = () => { scale /= 1.2; renderPage(); };
            document.getElementById("resetBtn").onclick   = () => { scale=1.2; rotation=0; renderPage(); };            

        } catch (e) {
            toggle_loader(true);
            console.error( 'Pdf.renderPdf :', e );
        }
    };

    return { render : renderPdf }
})();

const Shabdkosh = (() => {
    Activity.css('shabdkosh.css');

    const containerId = 'shabdkosh-container';

    const getQid = () => {
        const el = document.querySelector(`#${containerId}`);
        return el ? el.dataset.qid : undefined;
    };

    const setQid = (questionId) => {
        const dragItems = document.getElementById(containerId);
        if( dragItems ) {
            dragItems.dataset.qid = questionId;
            return true;
        } else {
            console.warn( '[WARNING]', 'Unable to set qid' );
            return false;
        }
    }

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent    = document.querySelector(container);

            if( !parent ) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="pt-3" id="${containerId}">
                                        <div class="tab-container">
                                            <div class="tab-content">
                                                <div class="tab-buttons" id="tabButtons"></div>
                                                <div class="content-bg" id="tabPanes"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            // ..

		} catch (e) {
            console.error( 'Shabdkosh.ui :', e );
        }
    };   

    const renderQuestion = (questionId) => {
        try {
            ui(questionId);
            
            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity?.lang ?? 'en';
            const content  = Activity.shuffleQuestions( activity?.content ?? [] ) ?? [];

            if( !setQid(questionId) ) return false;

            const tabs = [];
            content.forEach((item, ind) => {

                if( !item.tabtitle || !item.id ) return;

                const tab = `
                    <button class="tab-btn" data-id="${item.id}" data-title="${item.tabtitle}">
                        ${item.tabtitle}
                    </button>
                `;
                tabs.push( tab );
            });
            const tabBtn = document.getElementById("tabButtons");
            if( tabBtn && tabs.length ) tabBtn.innerHTML = tabs.join( '' );

            const tabBtns = document.querySelectorAll( '#tabButtons button' );
            tabBtns.forEach( (item, ind) => {
                item.addEventListener('click', (e) => {
                    renderTabContent(e);
                    toggleTabActive(e);
                });
                if( ind === 0 ) {
                    item.click();
                }
            });

        } catch (e) {
            console.error( 'Shabdkosh.renderQuestion :', e );
        }
    };

    const renderTabContent = (thisObj) => {
        if( typeof thisObj != 'object' &&  typeof thisObj.target != 'object' ) {
            console.warn( '[WARNING]', 'Invalid selector' );
        }

        const id = thisObj.target.dataset.id;

        const activity = Activity.getData(getQid()) ?? {};
        const lang     = activity?.lang ?? 'en';
        const content  = activity?.content ?? [];
        const tabitem  = content.filter( x => x.id == id );
        const item     = tabitem[0];

        if( !tabitem.length ) {
            console.warn( '[WARNING]', 'Invalid tab-id' );
            return;
        }

        if( !item?.tabtitle || !item?.id ) return;

        const tabpanecontent = `
            <div class="tab-pane active">
            ${item?.tabtitle ? `<div class="over"><b>${item.tabtitle}</b></div>` : '' }
            ${item?.meaning ? `<div class="meaning me-1"><b class="me-1">अर्थ :</b>${item.meaning}</div>` : ''}
            ${item?.sentence ? 
                `<div class="sentence-use">
                    <b class="sent-head">${Activity.translateSentenceLabel(lang)} -</b> 
                    ${
                        item?.sentence ? 
                            item?.sentence.replace(item?.tabtitle, `<span class="blinking-underline sometextcolor">${item?.tabtitle}</span>`)
                            : ''
                    }
                </div>` : ''
            }
            ${item?.image && item?.image?.path ?
                `<div class="img-box">
                    <img style="width:${ item?.image?.width ?? '40%' };" src="${item?.image?.path}" class="photo animate__animated animate__bounceInRight">
                </div>` 
                : ''
            }
            </div>
        `;
        const tabPanes = document.getElementById("tabPanes");
        if( tabPanes ) tabPanes.innerHTML = tabpanecontent;
    };

    const toggleTabActive = (thisObj) => {
        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        thisObj.target.classList.add("active");
    };

    return { render : renderQuestion }
})();

const Shrutlekh = (() => {

    Activity.css('shrutlekh.css');

    const containerId            = 'shrutlekh-container';
    const responseAudioContId    = 'response-audio-cont';
    const correctionBoxContId    = 'correct-box-cont';
    const questionBtnContId      = 'question-button';
    const textInputId            = 'singleInput';
    const textInputParenId       = 'singleSection';
    const correctionBoxSectionId = 'correctionSection';
    const correctWordHintId      = 'correctWordDisplay';

    const tickIconPath = './img/right1.png';
    
    let questionIndex  = 0;
    const currentAudio = new Audio();
    
    const audioBasePath = './audio/commonDictationSong/';
    const audioBundle   = {
        clickBtn:          { hi: `${audioBasePath}clickOnbtn-Hn.mp3`, en: `${audioBasePath}clickOnbtn.mp3` },
        clickNextBtn:      { hi: `${audioBasePath}clickOnNextbtn-Hn.mp3`, en: `${audioBasePath}clickOnNextbtn.mp3` },
        box1:              { hi: `${audioBasePath}correctInbox1-Hn.mp3`, en: `${audioBasePath}correctInbox1.mp3` },
        box2:              { hi: `${audioBasePath}correctInbox2-Hn.mp3`, en: `${audioBasePath}correctInbox2.mp3` },
        box3:              { hi: `${audioBasePath}correctInbox3-Hn.mp3`, en: `${audioBasePath}correctInbox3.mp3` },
        correct:           { hi: `${audioBasePath}right_ans-Hn.mp3`, en: `${audioBasePath}right_ans.mp3` },
        incorrect:         { hi: `${audioBasePath}wrong_ans-Hn.mp3`, en: `${audioBasePath}wrong_ans.mp3` },
        writeCorrectBelow: { hi: `${audioBasePath}secondAttemptStatement-Hn.mp3`, en: `${audioBasePath}secondAttemptStatement.mp3` }
    };
    const _constructAudio = () => {
        for( const key in audioBundle ) {
            for( const lang in audioBundle[key] ) {
                const audio = new Audio(audioBundle[key][lang]);
                audioBundle[key][lang] = audio;
            }
        }
    };

    const playAudio = async (key, lang='en') => {
        await pauseAllAudio();
        const audio = audioBundle[key]?.[lang];        
        if( audio instanceof HTMLAudioElement ) {
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
                    if( audio instanceof HTMLAudioElement ) {
                        audio.currentTime = 0;
                        audio.pause();
                    }
                }
            }

            resolve();
        });
    };

    const getQid = () => {
        const el = document.querySelector(`#${containerId}`);
        return el ? el.dataset.qid : undefined;
    };

    const setQid = (questionId) => {
        const dragItems = document.getElementById(containerId);
        if( dragItems ) {
            dragItems.dataset.qid = questionId;
            return true;
        } else {
            console.warn( '[WARNING]', 'Unable to set qid' );
            return false;
        }
    };

    const ui = (questionId) => {
        try {
            _constructAudio();

            const container = Define.get('questionContainer');
            const parent    = document.querySelector(container);

            if( !parent ) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';            
            
            const btnLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="qq-Box" id="${containerId}">
                                        <div class="play-btn">
                                            <div class="icon"></div>
                                        </div>
                                    </div>
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
                                </div>`;
            // ..
            Activity.setQuestionDetails( questionId );
            if( !setQid(questionId) ) return false;
			
			const playBtn  = parent.querySelector( '.play-btn' );
            const checkBtn = parent.querySelector( '#checkSingleBtn' );
            const checkPracBtn = parent.querySelector( '#checkPracticeBtn' );
            
			if (playBtn) playBtn.addEventListener("click", openQuestions);
			if (checkBtn) checkBtn.addEventListener("click", checkAnswer);
			if (checkPracBtn) checkPracBtn.addEventListener("click", checkPracAnswer);
		} catch (err) {
            console.error( 'Shrutlekh.ui :', err );
        }
    };

    const openQuestions = () => {
        try {
            const activity = Activity.getData(getQid()) ?? {};
            const lang     = activity?.lang ?? 'en';

            playAudio('clickBtn', lang);
            
            $('.qq-Box').hide();
            $('.question-section').show();
            
            renderWordButton();
        } catch( err ) {
            console.log( 'Shrutlekh.openQuestions', err );
        }
    };

    const renderWordButton = () => {
        try {
            const activity  = Activity.getData(getQid()) ?? {};
            const lang      = activity?.lang ?? 'en';
            const content   = activity?.content ?? {};
            const questions = content?.questions ?? [];
            const label     = Activity.translateWordLabel(lang);

            if( questionIndex < questions.length ) {
                const btn = `<div class="word-btn active" data-index="${questionIndex}">
                                ${label} ${Number( questionIndex + 1 )}
                            </div>`;
                // ..
                $('#'+questionBtnContId).append(btn);
                $(`.word-btn[data-index='${questionIndex}']`)[0].addEventListener('click', playAudio_focusInput );
            }
        } catch( err ) {
            console.log( 'Shrutlekh.renderWordButton', err );
        }
    };

    const toggleNextWord = () => {
        const activity  = Activity.getData( getQid() ) ?? {};
        const lang      = activity?.lang ?? 'en';
        const content   = activity?.content ?? {};
        const questions = content?.questions ?? [];

        questionIndex++;

        if( questionIndex != questions.length ) {
            playAudio('clickNextBtn',lang);
            renderWordButton();
        }

        if( $('.word-btn.done').length == questionIndex && questions.length == questionIndex ) {
            showFinalCongrats();
        }
    };
    
    const playAudio_focusInput = () => {
        try {
            const activity  = Activity.getData( getQid() ) ?? {};
            const lang      = activity?.lang ?? 'en';
            const content   = activity?.content ?? {};
            const questions = content?.questions ?? [];
            const curQues   = questions[questionIndex] ?? {};

            if( !Object.keys(curQues).length ) return;
            
            $('#'+textInputParenId).css('display','block');

            pauseAllAudio();
            
            if( currentAudio instanceof HTMLAudioElement ) {
                currentAudio.src = Activity.pathToCWD()+curQues.audio;
                currentAudio.currentTime = 0;
                currentAudio.play();
            }

            if( lang == 'hi' ) {
                $.keyboard.layouts['hindi'] = Activity.hindiKeyboard();
                
                $('#'+textInputId)
                .keyboard({
                    layout     : 'hindi',
                    usePreview : false,
                    autoAccept : true,
                })
                .addTyping({ showTyping: true, delay: 70 })
                .on('keydown', e => e.preventDefault());
            }

            $('#'+textInputId).focus().val('');

        } catch( err ) {
            console.log( 'Shrutlekh.playAudio_focusInput', err );
        }
    };

    const checkAnswer = () => {
        try {
            const activity  = Activity.getData( getQid() ) ?? {};
            const content   = activity?.content ?? {};
            const questions = content?.questions ?? [];
            const curQues   = questions[questionIndex] ?? {};
            
            const userInput = $('#'+textInputId)[0].value.trim();
            if( userInput === curQues?.answer ) correctPopUp();
            else wrongPopUp();
        } catch( err ) {
            console.log( 'Shrutlekh.checkAnswer', err );
        }
    };

    const checkPracAnswer = async () => {
        try {
            const activity  = Activity.getData( getQid() ) ?? {};
            const lang      = activity?.lang ?? 'en';
            const content   = activity?.content ?? {};
            const questions = content?.questions ?? [];
            const curQues   = questions[questionIndex] ?? {};
            const answer    = curQues?.answer;

            let boxID;
            let boxInput;
            let correctCount = 0;
            $('.correction-input').each( (ind, item) => {
                if( item.value == answer ) {
                    correctCount++;                    
                    item.style.borderColor = 'green';
                } else {
                    item.style.borderColor = 'red';
                    boxID = `box${ind+1}`;
                    boxInput = item;
                    return false;
                }
            });

            if( $('.correction-input').length == correctCount && correctCount > 1 ) {

                const correctAudio = await playAudio('correct', lang);
                const timeout      = Math.round( correctAudio.duration * 1000 );

                Swal.fire({
                    icon: 'success',
                    title: lang == 'hi' ? 'बहुत बढ़िया! सही उत्तर 👏' : 'Very good! Correct answer 👏',
                    color: '#2e7d32',
                    timer: timeout,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                }).then((res) => {
                    if( res.isDismissed ) {
                        $('#'+correctionBoxSectionId).css( 'display', 'none' );
                        correctPopUp({skipAlert:true});
                    }
                });

            } else {
                const boxAudio = await playAudio(boxID,lang);
                const duration = boxAudio instanceof HTMLAudioElement ? boxAudio.duration : 2;                
                const timeout  = Math.round( duration * 1000 );
                Swal.fire({
                    icon: 'error',
                    title: lang == 'hi' ? 'फिर से कोशिश करें!' : 'Try Again!',
                    color: '#c62828',
                    timer: timeout,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                }).then((res) => {
                    if( res.isDismissed ) {
                        boxInput.focus();
                    }
                });
            }

        } catch( err ) {
            console.log( 'Shrutlekh.checkPracAnswer', err );
        }
    };

    const correctPopUp = async ({skipAlert=false}={}) => {
        const activity  = Activity.getData( getQid() ) ?? {};
        const lang      = activity?.lang ?? 'en';
        const content   = activity?.content ?? {};
        const questions = content?.questions ?? [];
        const curQues   = questions[questionIndex] ?? {};

        const btnHtml = `${curQues?.answer}
                        <span class="right-icon">
                            <img src="${tickIconPath}" alt="correct" class="icon-img">
                        </span>`;
        // ..

        $(`.word-btn[data-index='${questionIndex}']`).addClass('done').html( btnHtml );
        $(`.word-btn[data-index='${questionIndex}']`)[0].removeEventListener('click', playAudio_focusInput );

        $('#'+textInputParenId)[0].style.display = "none";

        if( !skipAlert ) {
            const correctAudio = await playAudio('correct',lang);
            const timeout      = Math.round( correctAudio.duration ) * 1000;

            Swal.fire({
                icon: 'success',
                title: lang == 'hi' ? 'शाबाश! सही उत्तर 👏' : 'Well done! Correct answer.👏',
                color: '#2e7d32',
                timer: timeout,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then( (res) => {
                if( res.isDismissed ) {
                    toggleNextWord();
                }
            });
        } else {
            toggleNextWord();
        }
    };

    const wrongPopUp = async () => {
        const activity  = Activity.getData( getQid() ) ?? {};
        const lang      = activity?.lang ?? 'en';

        const incorrectAudio = await playAudio('incorrect',lang);

        const timeout = Math.round( incorrectAudio.duration ) * 1000;
        Swal.fire({
            icon: "error",
            title: lang == 'hi' ? 'गलत उत्तर!' : 'Wrong Answer',
            html: lang == 'hi' ? '<small>फिर से कोशिश करें।</small>' : '<small>Try Again</small>',
            timer: timeout,            
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        }).then((res) => {
            if( res.isDismissed ) {
                renderCorrectionBox();
            }
        });
    };

    const showFinalCongrats = () => {
        const activity  = Activity.getData( getQid() ) ?? {};
        const lang      = activity?.lang ?? 'en';

        const hiHtml = '<b>आपने सभी शब्द सही लिखे!</b><br><small>शानदार प्रदर्शन!</small>';
        const enHtml = '<b>You wrote all the words correctly!</b><br><small>Excellent performance!</small>';

        Swal.fire({
            icon: 'success',
            title: lang == 'hi' ? 'बहुत बढ़िया! 🏆' : 'Excellent 🏆',
            html: lang == 'hi' ? hiHtml : enHtml,
            confirmButtonText: lang == 'hi' ? 'फिर से खेलें' : 'Play again',
            color: '#333',
            confirmButtonColor: '#3085d6',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        }).then( (res) => {
            if( res.isConfirmed && res.value ) {
                playAudio('clickBtn', lang);

                $('#'+questionBtnContId).html( '' );
                questionIndex = 0;
                renderWordButton();
            }
        });
    };

    const renderCorrectionBox = async () => {
        const activity  = Activity.getData(getQid()) ?? {};
        const lang      = activity.lang ?? 'en';
        const content   = activity?.content ?? {};
        const questions = content?.questions ?? [];
        const curQues   = questions[questionIndex] ?? {};

        await playAudio('writeCorrectBelow',lang);
            
        const boxLabel = Activity.translateBoxLabel(lang);

        $('#'+textInputParenId).css( 'display', 'none' ).val('');
        $('#'+correctionBoxSectionId).css( 'display', 'block' );

        $('#'+correctWordHintId).html( curQues?.answer );

        const box = [];
        for( let i=1; i<=3; i++ ) {
            const html = `<div class="col-sm-4">
                            <div class="box-wrap">
                                <label class="box-label">${boxLabel} ${i}</label>
                                <input id="box1" class="word-input correction-input dictationInput hindiInput" autocomplete="off" />
                            </div>
                        </div>`;
            // ..
            box.push( html );
        }
        $('#'+correctionBoxContId).html( box.join('') );

        if( lang == 'hi' ) {
            $.keyboard.layouts["hindi"] = Activity.hindiKeyboard();
            
            $('.correction-input')
            .keyboard({
                layout     : "hindi",
                usePreview : false,
                autoAccept : true,
            })
            .addTyping({ showTyping: true, delay: 70 })
            .on('keydown', e => e.preventDefault());
        }
    };
    
    return {
        render:ui
    }

})();

const WordSearch = (() => {

    Activity.css('wordSearch.css');

    const containerId  = 'word-search-container';
    const puzzleTextId = 'puzzle-text';
    const puzzleAnsId  = 'answer';
    const puzzleContId = 'puzzle';

    const color_blue   = '#31cde2';

    let _grid;

    const getQid = () => {
        const el = document.querySelector(`#${containerId}`);
        return el ? el.dataset.qid : undefined;
    };

    const setQid = (questionId) => {
        const dragItems = document.getElementById(containerId);
        if( dragItems ) {
            dragItems.dataset.qid = questionId;
            return true;
        } else {
            console.warn( '[WARNING]', 'Unable to set qid' );
            return false;
        }
    };

    const ui = (questionId) => {
        try {
            const container = Define.get('questionContainer');
            const parent    = document.querySelector(container);

            if( !parent ) {
                console.error("ui container not found:", container);
                return;
            }

            const activity = Activity.getData(questionId) ?? {};
            const lang     = activity.lang ?? 'en';
            
            const buttonLabel = Activity.translateButtonLabels(lang);

            parent.innerHTML = `<div class="question">
                                    <div class="container" id="${containerId}">
                                        <div class="${Define.get('head')}"></div>
                                        <div class="ps-2 hints">Hints</div>
                                        <div class="divDisplay">
                                            <ol id="${puzzleTextId}" class="text"></ol>
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
			
			const resetBtn  = parent.querySelector( '.reset-btn' );
			const showBtn   = parent.querySelector( '.show-btn' );
			const submitBtn = parent.querySelector( '.submit-btn' );

			if(resetBtn) resetBtn.addEventListener("click", clearGrid);
			if(showBtn) showBtn.addEventListener("click", showAnswer);
			if(submitBtn) submitBtn.addEventListener("click", checkAnswer);
		} catch (err) {
            console.error( 'WordSearch.ui :', err );
        }
    };

    const render = (questionId) => {
        try {
            ui(questionId);
            Activity.setQuestionDetails( questionId );
                        
            if( !setQid(questionId) ) return false;

            const activity = Activity.getData( questionId );
            const lang     = activity?.lang ?? 'en';
            const content  = Activity.shuffleQuestions( activity?.content ?? [] ) ?? [];

            const puzzle = [];
            const words  = [];
            content.forEach( (item, ind) => {
                puzzle.push( `<li class="hint-item">${item.text}</li>` );
                words.push( `<div>${Number(ind+1)}. ${item.answer}</div>` );
            });
            $('#'+puzzleTextId).html( puzzle.join( '' ) );
            $('#'+puzzleAnsId).html( words.join( '' ) );

            renderGrid(content, lang);
        } catch (e) {
            console.error( 'WordSearch.render :', e );
        }
    }

    const renderGrid = () => {
        try {
            const activity = Activity.getData( getQid() );
            const content  = activity?.content ?? [];

            const words     = content.filter( puz => puz?.answer ).map( puz => puz.answer.toUpperCase() );            
            const longest   = Math.max(...words.map(w => w.length));
            const maxRow    = Math.max(...content.map(p => p.direction === 'h' ? p.row : p.row + (p.answer?.length || 0) - 1));
            const maxCol    = Math.max(...content.map(p => p.direction === 'v' ? p.col : p.col + (p.answer?.length || 0) - 1));
            const size      = Math.max(longest + 4, maxRow + 1, maxCol + 1, 15);
            const grid      = Array.from({ length: size }, () => Array.from({ length: size }, () => ''));            
            const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            content.forEach((item, index) => {
                const { row, col, answer, direction } = item;
                if( !answer || (direction !== 'h' && direction !== 'v') ) return;

                const up = answer.toUpperCase();
                [...up].forEach( (ch, i) => {
                    const r = direction === 'h' ? row : row + i;
                    const c = direction === 'h' ? col + i : col;
                    const cell = grid[r][c];
                    if( cell === '' || cell === ch ) grid[r][c] = ch;
                });
            });

            const pool = alphabets.toUpperCase();
            for( let r = 0; r < size; r++ ) {
                for( let c = 0; c < size; c++ ) {
                    if( grid[r][c] === '' ) {
                        const rand = Math.floor( Math.random() * pool.length );
                        grid[r][c] = pool[rand];
                    }
                }
            }

            const gridHtml = [ '<table>' ];
            grid.forEach((rowArr, row) => {
                gridHtml.push('<tr>');
                rowArr.forEach((cell, col) => {
                    const data = `<td><input type="button" value="${cell}" data-row="${row}" data-col="${col}" data-selected="0"></td>`;
                    gridHtml.push( data );
                })
                gridHtml.push('</tr>');
            });
            gridHtml.push('</table>');

            const puzzleCont     = document.getElementById(puzzleContId);
            puzzleCont.innerHTML = gridHtml.join('');
            
            puzzleCont.querySelectorAll('input[type="button"]').forEach(btn => {
                btn.addEventListener('click', selectCell);
            });

            _grid = grid.map(row => [...row]);

        } catch( err ) {
            console.log( 'WordSearch.renderGrid', err );
        }
    }

    const selectCell = (e) => {
        const btn = e.currentTarget;

        if( btn.dataset.selected == 2 ) return;
        btn.dataset.selected = btn.dataset.selected == 0 ? 1 : 0;
        btn.style.background = btn.dataset.selected == 1 ? 'yellow' : color_blue;
    }

    const clearGrid = () => {

        document.querySelectorAll('input[type="button"]').forEach(btn => {
            btn.dataset.selected = 0;
            btn.style.color      = 'black';
            btn.style.background = color_blue;
        });

        const checkBtn    = document.getElementById('c-check');
        checkBtn.disabled = false;
        checkBtn.style.opacity = 1;
    }

    const showAnswer = () => {
        try {
            const activity = Activity.getData(getQid());
            const content  = activity?.content ?? [];
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
                    btn.style.color      = 'white';
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

            const activity = Activity.getData( getQid() );
            const lang     = activity?.lang ?? 'en';
            const content  = activity?.content ?? [];

            const checkBtn = document.getElementById("c-check");
            
            const selected = [...document.querySelectorAll('input[data-selected="1"]')];
            if (selected.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Choose a word!',
                    text: 'Please choose a word from the box before checking your answer.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                });
                checkBtn.disabled      = false;
                checkBtn.style.opacity = 1;
                return;
            }
            
            const matchedButtons = new Set();

            let correct      = false;
            let correctCount = 0;
            const totalCount = content.length;

            content.forEach((item, index) => {
                let formed  = '';
                let buttons = [];

                const { row, col, answer, direction } = item;
                if( !answer || (direction !== 'h' && direction !== 'v') ) return;

                const up = answer.toUpperCase();
                [...up].forEach( (ch, i) => {
                    const r = direction === 'h' ? row : row + i;
                    const c = direction === 'h' ? col + i : col;
                    const btn = document.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
                    if ( btn ) buttons.push( btn );
                    if (btn && btn.dataset.selected == 1 ) formed += btn.value;
                });

                if( formed === up ) {
                    correct = true;
                    correctCount++;
                    buttons.forEach(btn => {
                        if( btn.dataset.selected == 1 ) {
                            btn.style.background = 'limegreen';
                            btn.style.color      = 'white';
                            btn.dataset.selected = 2;
                            matchedButtons.add(btn);
                        }
                    });
                }
            });

            selected.forEach(btn => {
                if( !matchedButtons.has(btn) ) {
                    btn.style.background = 'red';
                    btn.style.color      = 'white';
                    btn.dataset.selected = 3;
                }
            });

            let complete = false;
            if( correctCount === totalCount ) {
                complete = true;
                if (checkBtn) {
                    checkBtn.disabled = true;
                    checkBtn.style.opacity = '0.5';
                }
            }

            popup({ complete:complete, correct:correctCount, total:totalCount, lang:lang });
            
        } catch (err) {
            console.error('WordSearch.checkAnswer', err);
        }
    };

    const popup = ({complete=false, correct=0, total=0, lang='en'} = {}) => {
        if( complete ) {
            Swal.fire({
                title: lang == 'en' ? '🎉 Well Done!' : '🎉बहुत बढ़िया!',
                text: lang == 'en' ? 'You found all the words!' : 'आपने सारे शब्द ढूँढ लिए!',
                icon: 'success',
                confirmButtonText: lang == 'en' ? 'Replay' : 'दुबारा खेलें',
                confirmButtonColor: '#28a745',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then( (res) => {
                if( res.isConfirmed ) {
                    clearGrid();
                }
            });
        } else {
            const en = `You found <strong>${correct}</strong> words out of <strong>${total}</strong>.`;
            const hi = `आपने <strong>${total}</strong> में से <strong>${correct}</strong> शब्द ढूँढ लिए हैं.`;
            Swal.fire({
                title: lang == 'en' ? 'Result' : 'परिणाम',
                html: lang == 'en' ? en : hi,
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then( (res) => {
                if( res.isConfirmed ) {
                    clearGrid();
                }
            });
        }
    }

    return {
        render
    }
    
})();

Modules.get().map(({ module }) => {
    try {        
        const mod = eval(module);
        if( !mod || (typeof mod !== 'function' && typeof mod !== 'object') ) {
            console.error(`FATAL :: Couldn't register ${module} :`, mod);
            return;
        }
        Activity.register(module, mod);
    } catch( err ) {
        console.error( `FATAL :: Couldn't register ${module} :`, err );
    }
});
