const idioms = [
  "A/short,/statement/expressing/an/opinion.",
  "A/stance/where/both/feet/are/placed/in/line,/often/used/for/balance.",
  "Actions/speak/louder/than/words.",
  "A/picture/is/worth/a/thousand/words.",
  "Practice/makes/perfect.",
  "Better/late/than/never.",
  "Knowledge/is/power.",
  "Honesty/is/the/best/policy."
];

/* ---------- helpers ---------- */
function splitWords(sentence) {
  return sentence.split("/").map(s => s.trim());
}

// Fisher-Yates shuffle (ensure not same order)
function shuffleWords(words) {
  let shuffled;
  if (!Array.isArray(words)) return words;
  do {
    shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (JSON.stringify(shuffled) === JSON.stringify(words) && words.length > 1);
  return shuffled;
}

/* ---------- drag state (per-activity flags) ---------- */
let isDraggingIdioms = false;
let lastDragTimeIdioms = 0;

/* ---------- render ---------- */
function renderIdioms() {
  const $container = $("#idiomContainer");
  $container.empty();

  idioms.forEach((sentence, index) => {
    const words = splitWords(sentence);
    const jumbled = shuffleWords(words);

    const $row = $(`
      <div class="rowWordLet" data-index="${index}">
        <div style="display:flex; gap:12px;">
          <div class="numLe">${index + 1}.</div>
          <div>
            <div class="wordStance" id="words-${index}" aria-label="Arrange the words for idiom ${index + 1}" role="list"></div>
             <div class="finalOutput" aria-live="polite"></div>
          </div>
        </div>
      </div>
    `);
    $container.append($row);

    const $wordStance = $row.find(`#words-${index}`);
    jumbled.forEach(w => {
      // add each word element (keep text exactly so later comparison works)
      const $el = $(`<div class="word2" role="listitem" tabindex="0">${w}</div>`);
      $wordStance.append($el);
    });

    // enable sortable on the row
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
        // ensure placeholder matches helper size
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

    // enable tap-to-swap fallback for touch
    enableTapSwapFallback($wordStance[0], index);
  });
}

/* ---------- tap-to-swap fallback (mobile) ---------- */
function enableTapSwapFallback(container, rowIndex) {
  let selected = null;
  $(container).off("click.touchSwap").on("click.touchSwap touchend.touchSwap", ".word2", function (e) {
    // prevent immediate click right after drag
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

    // swap nodes
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
}

/* ---------- check & show ---------- */
function checkAnswersWORD() {
  let allRowsCorrect = true; // Track all rows

  $(".rowWordLet").each(function () {
    const index = $(this).data("index");
    const correct = splitWords(idioms[index]);
    const user = $(this).find(".word2").map(function () {
      return $(this).text().trim();
    }).get();

    const $out = $(this).find(".finalOutput");
    // visual marking
    $(this).find(".word2").removeClass("correctWord wrongwrongRORD");

    let allGood = true;
    $(this).find(".word2").each(function (i) {
      if ($(this).text().trim() === correct[i]) {
        $(this).addClass("correctWord");
      } else {
        $(this).addClass("wrongwrongRORD");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Some Answer are uncompleted please try again.!",
        });
        allGood = false;
        allRowsCorrect = false; // if one wrong, overall fails
      }
    });

    if (allGood) {
      // $out.text("✅ Correct!").css("color", "green");
    } else {
      // $out.text("❌ Try again").css("color", "red");
    }
  });

  // Show alert if all rows correct
  if (allRowsCorrect) {
    Swal.fire({
      title: "Correct!",
      text: " All answers are correct!",
      icon: "success"
    });

  }
}


// show answers but move existing nodes rather than replace
function showAnswersWORD() {
  $(".rowWordLet").each(function () {
    const index = $(this).data("index");
    const words = splitWords(idioms[index]);
    const $stance = $(this).find(".wordStance");

    // map existing elements by text to preserve element references
    const map = {};
    $stance.find(".word2").each(function () {
      const txt = $(this).text().trim();
      if (!map[txt]) map[txt] = [];
      map[txt].push(this);
    });
    $(".word2").addClass("correctWord");

    // clear and re-append existing nodes in correct order; if missing create new
    $stance.empty();
    words.forEach(w => {
      if (map[w] && map[w].length) {
        $stance.append(map[w].shift());
      } else {
        $stance.append(`<div class="word2">${w}</div>`);
      }
    });
    $stance.sortable("disable");
    // $(this).find(".finalOutput").text("✅ Answer shown").css("color", "blue");
  });
}

/* ---------- reset ---------- */
function resetActivityWORD() {
  renderIdioms();
}

/* ---------- init ---------- */
$(function () {
  renderIdioms();

  $("#checkBtn").on("click", checkAnswersWORD);
  $("#showBtn").on("click", showAnswersWORD);
  $("#resetBtn").on("click", resetActivityWORD);
});