const Controller = (() => {
    const config = {
        DEPENDENCIES_BLOCKED : true,
    };

    const importScript = ({src=null, version=true}={}) => {
        return new Promise((resolve, reject) => {
            if (!src) {
                reject(new Error('No script src provided'));
                return;
            }

            const exists = [...document.querySelectorAll('script')].some(script => script.src.includes(src));
            if (exists) {
                resolve('already-loaded');
                return;
            }

            const s   = document.createElement('script');
            s.src     = version === true ? `${src}?v=${Date.now()}` : src;
            s.onload  = () => resolve(s);
            s.onerror = (err) => {
                s.remove();
                reject(new Error(`Failed to load script: ${src}`));
            };
            document.body.appendChild(s);
        });
    };

    const filterByQids = ({filterIds=[], buttons}) => {
        try {
            if (!filterIds.length) return buttons;

            filterIds = filterIds.map(id => parseInt(id));
            return buttons.filter(btn => filterIds.includes(parseInt(btn.qid)));
        } catch (err) {
            console.warn(err);
            return buttons;
        }
    };

    (() => {
        const originalAppendChild = Node.prototype.appendChild;
        Node.prototype.appendChild = function(node) {
            if ( 
                node.tagName === 'SCRIPT' 
                && /\/(modules|templates|ui)\.js/.test(node.src) 
                && config.DEPENDENCIES_BLOCKED === true
            ) {
                queueMicrotask(() => node.onload?.());
                const src = node.src.replace( node.baseURI, '' )
                console.warn(`Dependency intercepted and voided: "${src}"`);
                return node;
            }
            return originalAppendChild.call(this, node);
        };
    })();

    const timer = setInterval( async () => {
        if (Define !== undefined) {
            clearInterval(timer);

            config.DEPENDENCIES_BLOCKED = false;

            const basePath = 'js/newActJS';
            await importScript({src:`${basePath}/modules.js`, version:true});
            await importScript({src:`${basePath}/templates.js`, version:true});
            await importScript({src:`${basePath}/ui.js`, version:true});
        }
    }, 10);

    return {
        importScript,
        filterByQids
    }
})();