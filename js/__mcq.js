
let questionLevel1 = [
  {
    question: "Sector focuses on processing and manufacturing.",
    options: ['Primary', 'Secondary', 'Tertiary', 'Quinary'],
    answer: 2
  },
  {
    question: "Sector is primarily concerned with providing services rather than goods.",
    options: ['Primary', 'Secondary', 'Tertiary', 'None of these'],
    answer: 0
  },
  {
    question: "Which of the following is an example of an activity in the primary sector?",
    options: ['Mining', 'Manufacturing', 'Retail', 'Healthcare'],
    answer: 2
  },
  {
    question: "The quaternary sector focuses on.",
    options: ['Raw material extraction', 'Manufacturing of goods', 'Knowledge-based activities', 'High-level decision-making'],
    answer: 2
  },
  {
    question: "The quinary sector is an extension of the sector.",
    options: ['Primary', 'Secondary', 'Tertiary', 'Quinary'],
    answer: 3
  }
];

let userAnswers = new Array(questionLevel1.length).fill(null);


function renderAllQuestions() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = questionLevel1.map((q, qi) => `
    <div class="p-2">
      <div class="row m-0" style="font-size:18px">
        <div style="width:30px" class="questionHeadingMCQ"><strong>${qi + 1}.</strong></div>
        <div class="col questionHeadingMCQ">${q.question}</div>
      </div>
      <div class="row mt-2 ml-4">
        ${q.options.map((opt, oi) => {
    const optionLabel = String.fromCharCode(65 + oi);
    const isSelected = userAnswers[qi] === oi ? "selected" : "";
    return `
            <div class="col-md-6 col-sm-12 mb-2">
              <label class="option-btn ${isSelected}" onclick="selectOption(${qi}, ${oi})">
                <input type="radio" name="question-${qi}" ${userAnswers[qi] === oi ? "checked" : ""}>
                <strong>${optionLabel}.</strong> ${opt}
              </label>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `).join('');
}


function selectOption(qIndex, optIndex) {
  userAnswers[qIndex] = optIndex;
  updateAttemptedCount();
  renderAllQuestions();
  checkIfAllAnswered();
}

function updateAttemptedCount() {
  const attempted = userAnswers.filter(a => a !== null).length;
}

function checkIfAllAnswered() {
  const allAnswered = userAnswers.every(ans => ans !== null);
  if (allAnswered) {
    showAnswerPopup();  // auto show result
  }
}

function showAnswerPopup() {
  const optionLabel = index => String.fromCharCode(65 + index);
  let correctCount = 0;
  let totalQues = questionLevel1.length;

  let tableHTML = `
  <div class="table-responsive p-2">
        <table class="table table-bordered" style="font-size:20px">
            <thead class="thead-light" style="white-space: nowrap;">
                <tr>
                    <th>Ques. No.</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;


  questionLevel1.forEach((q, i) => {


    const userIndex = userAnswers[i];
    const userAnswerText = userIndex !== undefined ? `${optionLabel(userIndex)}. ${q.options[userIndex]}` : "Not Attempted";
    const correctAnswerText = `${optionLabel(q.answer)}. ${q.options[q.answer]}`;
    const isCorrect = userIndex === q.answer;
    if (isCorrect) {
      correctCount++;
    }

    // for question heading render
    // <td>${q.question}</td>

    tableHTML += `
            <tr clsss='trData'>
                <th>Q${i + 1}.</th>
                <td class="${isCorrect ? 'text-success' : 'text-danger'}">${userAnswerText}</td>
                <td class="text-success">${correctAnswerText}</td>
                <td class="${isCorrect ? 'text-success' : 'text-danger'} ">${isCorrect ? '✔' : '✘'}</td>
            </tr>
        `;
  });




  tableHTML += `
            </tbody>
        </table>
        </div>
    `;


  document.getElementById("answer-review").innerHTML = tableHTML;
  document.getElementById("popupDialogAns").style.display = "block";
  document.getElementById("scoreTextQ1").innerText = `You got : ${correctCount} out of ${totalQues}`;
}


function closeFn() {
  document.getElementById("popupDialogAns").style.display = "none";
  // reset answers
  userAnswers = new Array(questionLevel1.length).fill(null);
  // re-render fresh quiz
  renderAllQuestions();
}


// Initial render
renderAllQuestions();
