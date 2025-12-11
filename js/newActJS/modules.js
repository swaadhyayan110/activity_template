const Templates = (() => {

    // TEMPLATE MAP [ DO NOT CHANGE ]
    const templates = [
        { id : 1, template  : 'MatchLeftToRight', landscape : true },
        { id : 2, template  : 'MatchLeftRightToCenter' },
        { id : 3, template  : 'MatchTopToBottom' },
        { id : 4, template  : 'FillInTheBlanksWithImage' },
        { id : 5, template  : 'FillInTheBlanksHindiKb' },
        { id : 6, template  : 'JumbleLetters' },
        { id : 7, template  : 'JumbleWords' },
        { id : 8, template  : 'DragAndDrop' },
        { id : 9, template  : 'Mcq_PathKaSaar' },
        { id : 10, template : 'Adaptiv' },
        { id : 11, template : 'OnlyAudio' },
        { id : 12, template : 'DropDown' },
        { id : 13, template : 'Circle' },
        { id : 14, template : 'ShravanKaushal' },
        { id : 15, template : 'TrueAndFalse' },
        { id : 16, template : 'DragAndDropMulti' },
        { id : 17, template : 'Sorting' },
        { id : 18, template : 'Pdf' },
        { id : 19, template : 'Shabdkosh' },
        { id : 20, template : 'Shrutlekh' },
        { id : 21, template : 'WordSearch' },
        { id : 22, template : 'TextArea' },
        { id : 23, template : 'CrossWord' },
        { id : 24, template : 'ShravanKaushalWithImages' },
        { id : 25, template : 'VideoPlayer' },
        { id : 26, template : 'RachnatmakParaWithImages' },
        { id : 27, template : 'RachnatmakWithKeyboard' },
        { id : 28, template : 'RachnatmakWithTabBtns' },
        { id : 29, template : 'RachnatmakWithInputs' },
        { id : 30, template : 'ClickOnImage' },
        { id : 31, template : 'FillOnClick' },
        { id : 32, template : 'Dictionary' },
        { id : 33, template : 'MentalMath' },
    ];

    const store = {
        templates
    };

    const get = (key) => store[key];

    return { get };
})();