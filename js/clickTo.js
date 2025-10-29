document.addEventListener("click", function (e) {
  if (e.target.classList.contains("clickable")) {
    const span = e.target;
    const act = span.dataset.act; // c1 / c2
    const qId = span.dataset.id;
    const word = span.dataset.word;

    const activity = activitiesClicked[act];
    const mode = activity.mode; // "single" or "multi"

    if (!userSelections[act][qId]) userSelections[act][qId] = [];

    if (mode === "single") {
      // remove circle from all options of same question
      const siblings = document.querySelectorAll(
        `[data-act="${act}"][data-id="${qId}"]`
      );
      siblings.forEach(sib => sib.classList.remove("circle"));

      // reset and add only this
      userSelections[act][qId] = [word];
      span.classList.add("circle");
    } else {
      // MULTI mode
      span.classList.toggle("circle");

      if (span.classList.contains("circle")) {
        if (!userSelections[act][qId].includes(word)) {
          userSelections[act][qId].push(word);
        }
      } else {
        userSelections[act][qId] = userSelections[act][qId].filter(
          w => w !== word
        );
      }
    }
  }
});

function checkCircle(containerId, dataKey) {
  const container = document.getElementById(containerId);
  const activity = activitiesClicked[dataKey];
  const data = activity.questions; // ✅ पहले सिर्फ array था, अब questions array है

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

  showClickReportClick(data, userSelections[dataKey]);
}

function showCircle(containerId, dataKey, btn) {
  const container = document.getElementById(containerId);
  const activity = activitiesClicked[dataKey];
  const data = activity.questions; // ✅

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
  if (btn) {
    btn.classList.add("clicked-show");
  }
}

function resetCircle(containerId, dataKey) {
  const container = document.getElementById(containerId);
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

  userSelections[dataKey] = {};
}

function showClickReportClick(clickData, selections = {}) {
  $("#clickAct").css("display", "block");
  let correctCount = 0;
  let totalQues = clickData.length;

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

  clickData.forEach((q, i) => {
    const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
    const userAns = selections[q.id] || [];
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

  document.getElementById("datapendReportClick").innerHTML = tableHTML;

  document.getElementById("scoreTextQ1Click").innerText =
    typeLang === "hi"
      ? `आपको ${totalQues} में से ${correctCount} अंक मिले हैं`
      : `You scored ${correctCount} out of ${totalQues}`;
}

function closeReportClick() {
  $("#clickAct").css("display", "none");
  document.getElementById("datapendReportClick").innerHTML = "";
}



