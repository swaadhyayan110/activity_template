const Modules = (() => {

    // MODULES MAP [ DO NOT CHANGE ]
    const modules = [
        { id : 1, module  : 'MatchLeftToRight', landscape : true },
        { id : 2, module  : 'MatchLeftRightToCenter' },
        { id : 3, module  : 'MatchTopToBottom' },
        { id : 4, module  : 'FillInTheBlanksWithImage' },
        { id : 5, module  : 'FillInTheBlanksHindiKb' },
        { id : 6, module  : 'JumbleLetters' },
        { id : 7, module  : 'JumbleWords' },
        { id : 8, module  : 'DragAndDrop' },
        { id : 9, module  : 'Mcq_PathKaSaar' },
        { id : 10, module : 'Adaptiv' },
        { id : 11, module : 'Audio' },
        { id : 12, module : 'DropDown' },
        { id : 13, module : 'Circle' },
        { id : 14, module : 'ShravanKaushal' },
        { id : 15, module : 'TrueAndFalse' },
        { id : 16, module : 'DragAndDropMulti' },
        { id : 17, module : 'Sorting' },
        { id : 18, module : 'Pdf' },
    ];

    const get = () => modules;

    return { get };
})();