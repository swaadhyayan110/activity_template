const UI = (() => {
    const detectMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const normalizeLabel = (text) => {
        if( !text ) return ['', ''];
        
        if( Array.isArray( text ) ) {
            if( text.length === 1 ) return [ text[0], text[0] ];
            return [text[0] ?? '', text[1] ?? text[0] ?? ''];
        }
        const labels = [ String(text), String(text) ];
        return labels;
    };
    
    const requestFullscreen = async () => {
        const el = document.documentElement;
        const fn = el.requestFullscreen
            || el.webkitRequestFullscreen
            || el.mozRequestFullScreen
            || el.msRequestFullscreen;

        if( !fn ) {
            throw new Error('Fullscreen API not supported');
        }
        
        return fn.call(el);
    };

    const exitFullscreen = async () => {
        const fn = document.exitFullscreen
            || document.webkitExitFullscreen
            || document.mozCancelFullScreen
            || document.msExitFullscreen;

        if( !fn ) {            
            return;
        }
        return fn.call(document);
    };

    const lockOrientation = async (mode) => {
        const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
        if (orientation && typeof orientation.lock === 'function') {
            return orientation.lock(mode);
        }
        throw new Error('Orientation lock not supported');
    };
    
    const landscapeMode = async () => {
        const mobile = detectMobile();
        const isPortrait = window.matchMedia('(orientation: portrait)').matches;

        if (!mobile || !isPortrait) return;

        try {
            await requestFullscreen();
            await lockOrientation('landscape');
            console.log('Screen locked in landscape');
        } catch (err) {            
            console.log('Landscape lock failed:', err?.message || err);
        }
    };

    const portraitMode = async () => {
        try {
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                await exitFullscreen();
                try {
                    await lockOrientation('portrait');
                } catch (e) {                    
                    console.log('Portrait orientation lock not supported:', e?.message || e);
                }
                console.log('Exited fullscreen and attempted portrait lock');
            } else {                
                try {
                    await lockOrientation('portrait');
                    console.log('Locked portrait');
                } catch (err) {
                    console.log('Portrait lock failed:', err?.message || err);
                }
            }
        } catch (err) {
            console.log('Exiting fullscreen failed:', err?.message || err);
        }
    };

    const activity = (selector, id, moduleId, landscape=false) => {
        document.querySelectorAll('.boxQ').forEach(btn =>
            btn.classList.remove('activeBtns')
        );

        document.querySelector('.question-container').innerHTML = '';       

        if( landscape === true ) {
            landscapeMode();
        } else {
            portraitMode();
        }

        const quesEle = document.getElementById(selector);        
        if( quesEle ) {
            quesEle.classList.add('activeBtns');
        }
        
        const moduleName = Activity.template(moduleId);
        
        if (!moduleName) {
            console.error('No activity mapped for id:', moduleId);
        } else {
            const qObj = Define.get('questions')?.find(q => q.id === id);
            if (!qObj) {
                console.error('No data found for id:', id);
            } else {
                Activity.render(moduleId, id);
            }
        }
    };

    const buttons = (selector='qNumbers') => {
        try {            
            const container = document.getElementById(selector);
            if( !container ) {
                console.warn('UI.buttons: container not found:', selector);
                return;
            }            

            const mobile = detectMobile();

            const render = (tabs) => {
                if( tabs.length === 1 ) {
                    const item         = tabs[0];
                    const itemId       = item.qid;
                    const itemSelector = `q${itemId}`;
                    const moduleId     = item.module ?? '';
                    const landscape    = item.landscape ?? false;                
                    container.style.display = 'none';
                    
                    activity(itemSelector, itemId, moduleId, landscape);
                    return;
                }

                const frag   = document.createDocumentFragment();
                tabs.forEach((item, index) => {

                    const div       = document.createElement('div');
                    const [m, d]    = normalizeLabel(item.text);
                    div.className   = `boxQ ${index === 0 ? 'activeBtns' : ''} user-select-none`;
                    div.textContent = mobile ? m : (d || m);

                    const itemId       = item.qid;
                    const itemSelector = `q${itemId}`;
                    div.id             = itemSelector;
                    
                    const moduleId     = item.module ?? '';
                    div.dataset.module = moduleId;

                    const landscape = item.landscape ?? false;
                    div.addEventListener( 'click', () => {
                        activity( itemSelector, itemId, moduleId, landscape )
                    });

                    frag.appendChild(div);
                });

                container.style.overflow = 'auto';
                container.replaceChildren(frag);
                container.firstElementChild?.click();

                requestAnimationFrame(() => {
                    container.querySelectorAll('.boxQ').forEach((div) => {
                        if( div.scrollWidth > div.clientWidth ) {
                            const id   = Number( div.id.slice(1) );
                            const item = tabs.find( x => x.qid === id );
                            if( !item ) return;
                            const [m] = normalizeLabel(item.text);
                            div.textContent = m;
                        }
                    });
                });
            }

            const viaJson = () => {
                fetch('js/newActJS/tabs.json')
                .then(res => res.json())
                .then(tabs => {
                    render(tabs);
                })
                .catch(err => console.error('[FATAL]',err));
            }

            const viaJs = () => {
                const tabs = Define.get('buttons') ?? [];
                render(tabs);
            }
            
            viaJs();
        } catch( err ) {
            console.error( 'Error :: UI.(buttons) -', err );
        }
    };
    buttons();

    return { detectMobile, buttons }
})();
