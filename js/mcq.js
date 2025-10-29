


let userAnswers = new Array(questionLevel1.length).fill(null);

function renderAllQuestionsMCQ() {
  const container = document.getElementById("quiz-container");  
  container.innerHTML = questionLevel1.map((q, qi) => `
    <div class="p-2">
      <div class="row m-0" style="font-size:18px">
        <div style="width:30px" class="questionHeadingMCQ"><strong>${qi + 1}.</strong></div>
        <div class="col questionHeadingMCQ">${q.question}</div>
      </div>
      <div class="row mt-2 ml-4">      
        ${q.options.map((opt, oi) => {
    // const optionLabel = String.fromCharCode(65 + oi);
    const isSelected = userAnswers[qi] === oi ? "selected" : "";
    const lable = lang == "hi" ? ['(क)', '(ख)', '(ग)', '(घ)'] : ["A.", 'B.', 'C.', 'D.']
    return `
            <div class="col-md-6 col-sm-12 mb-2">
              <label class="option-btn ${isSelected}" onclick="selectOptionMCQ(${qi}, ${oi})">
                <input type="radio" name="question-${qi}" ${userAnswers[qi] === oi ? "checked" : ""}>
                <strong>${lable[oi]}</strong> ${opt}
              </label>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `).join('');
}


function selectOptionMCQ(qIndex, optIndex) {

  userAnswers[qIndex] = optIndex;
  updateAttemptedCountMCQ();
  renderAllQuestionsMCQ();
  checkIfAllAnsweredMCW();
}

function updateAttemptedCountMCQ() {
  const attempted = userAnswers.filter(a => a !== null).length;
}

function checkIfAllAnsweredMCW() {
  const allAnswered = userAnswers.every(ans => ans !== null);
  if (allAnswered) {
    showAnswerPopupMCQ();  // auto show result
  }
}
function showAnswerPopupMCQ() {
  // const optionLabel = index => String.fromCharCode(65 + index);
  let correctCount = 0;
  let totalQues = questionLevel1.length;

  // ✅ Language detect (मान लो पहले question की lang property से)
  // const lang = questionLevel1[0].lang || "hi";

  let tableHTML = `<div class="table-responsive p-2">
    <table class="table table-bordered" style="font-size:20px">
      <thead class="text-light" style="white-space: nowrap;">
        <tr>
          <th>${lang === "hi" ? "प्रश्‍न संख्या" : "Q. No."}</th>
          <th>${lang === "hi" ? "आपका उत्तर" : "Your Answer"}</th>
          <th>${lang === "hi" ? "सही उत्तर" : "Correct Answer"}</th>
          <th>${lang === "hi" ? "परिणाम" : "Result"}</th>
        </tr>
      </thead>
      <tbody>`;
  const lable = lang == "hi" ? ['(क)', '(ख)', '(ग)', '(घ)'] : ["A.", 'B.', 'C.', 'D.', "E", 'F']
  questionLevel1.forEach((q, i) => {
    const userIndex = userAnswers[i];
    const userAnswerText =
      userIndex !== null && userIndex !== undefined
        ? `${lable[userIndex]} ${q.options[userIndex]}`
        : (lang === "hi" ? "प्रयास नहीं किया" : "Not Attempted");

    const correctAnswerText = `${lable[q.answer]} ${q.options[q.answer]}`;
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

  document.getElementById("answerShowMCW").innerHTML = tableHTML;
  $("#popupDialogAns").css("display", "block");

  // ✅ Score text bhi Hindi/English me
  document.getElementById("scoreTextQ1").innerText =
    lang === "hi"
      ? `आपको ${totalQues} में से ${correctCount} अंक मिले हैं`
      : `You scored ${correctCount} out of ${totalQues}`;
}




function closeFnMCQ() {
  document.getElementById("popupDialogAns").style.display = "none";
  // reset answers
  userAnswers = new Array(questionLevel1.length).fill(null);
  // re-render fresh quiz
  renderAllQuestionsMCQ();
}


// Initial render
renderAllQuestionsMCQ();
