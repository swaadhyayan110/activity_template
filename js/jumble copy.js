
// second Activity Function start

const words = [
  "SCHOOL", "TEACHER", "STUDENT", "BOOK", "CLASS",
  "COLLEGE", "SUBHASH", "EXAM", "LEARN", "STUDY"
];

function shuffle(word) {
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
}

let isDragging = false;
let lastDragTime = 0;

function loadAllQuestions() {
  $("#letterContainer").empty();

  words.forEach((word, index) => {
    const jumbled = shuffle(word);

    const gameBox = $(`
          <div class="col-md-6 col-12 col-sm-12">
            <div class="rowLines">
              <div class="numb">${index + 1}.</div>
              <div class="letterRow" id="letters-${index}" aria-label="Arrange the letters for ${word}"></div>
            </div>
          </div>
        `);

    const $row = gameBox.find(`#letters-${index}`);
    jumbled.forEach(letter => {
      $row.append(`<div class="letter" role="button" tabindex="0">${letter}</div>`);
    });

    $("#letterContainer").append(gameBox);

    $row.sortable({
      placeholder: "letter-placeholder",
      tolerance: "pointer",
      helper: "clone",
      appendTo: "body",
      zIndex: 999999,
      revert: 100,
      distance: 8,
      delay: 80,
      scroll: true,
      containment: "#letterContainer",
      start: function (e, ui) {
        isDragging = true;
        // ensure placeholder is visually sized
        try {
          ui.placeholder.width(ui.helper.outerWidth());
          ui.placeholder.height(ui.helper.outerHeight());
        } catch (err) { /* noop */ }
      },
      stop: function (e, ui) {
        // brief pause before allowing tap/swap
        lastDragTime = Date.now();
        // small timeout to ensure click events suppressed
        setTimeout(() => { isDragging = false; }, 30);
      }
    }).disableSelection();

    // Tap-to-swap fallback (per-row)
    enableTapSwapFallback($row[0]);
  });
}

function enableTapSwapFallback(container) {
  let selected = null;

  $(container).on("click touchend", ".letter", function (e) {
    // If a drag just finished, ignore
    if (Date.now() - lastDragTime < 400) return;
    if (isDragging) return;

    // prevent ghost clicks on touch
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
      parent.insertBefore(b, a); // adjacent
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

// Submit check
function submit2() {
  let score = 0;

  words.forEach((word, index) => {
    let isCorrect = true;

    $(`#letters-${index} .letter`).each(function (i) {
      if ($(this).text() === word[i]) {
        $(this).removeClass("wrong").addClass("correct");
      } else {
        $(this).removeClass("correct").addClass("wrong");
        isCorrect = false;
      }
    });

    if (isCorrect) score++;
  });

  if (score === words.length) {
    Swal.fire({ title: "Good!", text: "Congratulations! All are correct!", icon: "success" });
  } else {
    Swal.fire({ icon: "error", title: "Oops...", text: `You got ${score} out of ${words.length} correct. Please try again.` });
  }
}

// Reset
function reset2() {
  $("#submit2").removeClass("disable");
  loadAllQuestions();
}

// Show answers
function showAns2() {
  $("#submit2").addClass("disable");
  words.forEach((word, index) => {
    const letterRow = $(`#letters-${index}`);
    letterRow.empty();
    word.split('').forEach(letter => {
      letterRow.append(`<div class="letter correct">${letter}</div>`);
    });
  });
}

// Initialize
$(function () {
  loadAllQuestions();
});









