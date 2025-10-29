function normalizeHindi(str) {
  return (str || "").normalize("NFC").replace(/\s+/g, "")
    .replace(/[।|,.;:'"!?]/g, "").trim().toLowerCase();
}
function checkAnswersHandler(quest_1) {
  let score = 0;
  const inputs = document.querySelectorAll(".inPutHindiNew");

  inputs.forEach(el => {
    const qIndex = el.dataset.qindex;
    const blankIndex = el.dataset.blankindex;
    const val = normalizeHindi(el.value);
    const correctAns = normalizeHindi(quest_1[qIndex].answers[blankIndex]);

    if (val === correctAns) {
      score++;
      el.style.borderColor = "limegreen";
    } else {
      el.style.borderColor = "red";
    }
  });

  let totalBlanks = quest_1.reduce((acc, q) => acc + q.answers.length, 0);

  let swalIcon = (score === totalBlanks) ? "success" : "info";
  let swalTitle = (score === totalBlanks) ? "🎉 सभी सही!" : "अरे नहीं...";

  Swal.fire({
    icon: swalIcon,
    title: swalTitle,
    text: `✅ आपका स्कोर: ${score}/${totalBlanks}`,
    confirmButtonColor: "#00bfff"
  });
}

function showAnswersHandler(quest_1) {
  $(".check_1").addClass("disable");
  const inputs = document.querySelectorAll(".inPutHindiNew");
  inputs.forEach(el => {
    const qIndex = el.dataset.qindex;
    const blankIndex = el.dataset.blankindex;
    el.value = quest_1[qIndex].answers[blankIndex];
    el.style.borderColor = "dodgerblue";
  });
}

function resetQuizHandler() {
  $(".check_1").removeClass("disable")
  const inputs = document.querySelectorAll(".inPutHindiNew");
  inputs.forEach(el => {
    el.value = "";
    el.style.borderColor = "#444";
  });
}
