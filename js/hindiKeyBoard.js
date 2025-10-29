$(function () {
  $.keyboard.layouts["hindiQuiz"] = {
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

  // Attach keyboard to all inputs with class .hindiInput
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
