function renderQuestions(data, quizId) {
  const container = document.querySelector(`#${quizId} .questionSections`);
  container.innerHTML = "";

  data.forEach((q, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "qLines";

    // split text into chunks around ___
    const parts = q.text.split("___");

    // multiple blanks
    if (Array.isArray(q.options[0])) {
      parts.forEach((part, blankIndex) => {
        wrapper.appendChild(document.createTextNode(part));

        if (blankIndex < q.options.length) {
          const select = makeSelect(i, quizId, blankIndex, q.options[blankIndex]);
          wrapper.appendChild(select);
        }
      });
    }
    // single blank
    else {
      wrapper.appendChild(document.createTextNode(parts[0] || ""));
      const select = makeSelect(i, quizId, null, q.options);
      wrapper.appendChild(select);
      wrapper.appendChild(document.createTextNode(parts[1] || ""));
    }

    container.appendChild(wrapper);
  });
}

function makeSelect(qIndex, quizId, blankIndex, optionsArr) {
  const select = document.createElement("select");
  select.setAttribute("data-index", qIndex);
  select.setAttribute("data-quiz", quizId);
  if (blankIndex !== null) select.setAttribute("data-blank", blankIndex);

  const def = document.createElement("option");
  def.value = "";
  def.disabled = true;
  def.selected = true;
  def.hidden = true;
  def.textContent = defaultOptionText;
  select.appendChild(def);

  optionsArr.forEach(optValue => {
    const opt = document.createElement("option");
    opt.value = norm(optValue);
    opt.textContent = optValue;
    select.appendChild(opt);
  });

  return select;
}

function norm(s) {
  if (s === null || s === undefined) return "";
  return String(s).trim().normalize();
}

function checkAnswersDD(data, quizId) {
  document.getElementById("commonReport").style.display = "block";
  const selects = document.querySelectorAll(`#${quizId} select`);

  const isHindi = defaultOptionText === "चुनें";
  const headings = isHindi
    ? { yourAns: "आपका उत्तर", correctAns: "सही उत्तर", status: "स्थिति", correct: "✔ सही", incorrect: "❌ गलत", unattempted: "उत्तर नहीं दिया", statusText: "सही उत्तर" }
    : { yourAns: "Your Answer", correctAns: "Correct Answer", status: "Status", correct: "✔ Correct", incorrect: "❌ Incorrect", unattempted: "Unattempted", statusText: "Correct" };

  const numbering = isHindi
    ? ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श"]
    : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  let reportHtml = `
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead>
          <tr style="background:#f1f5f9; color:#000;">
            <th>#</th>
            <th>${headings.yourAns}</th>
            <th>${headings.correctAns}</th>
            <th>${headings.status}</th>
          </tr>
        </thead>
        <tbody>
  `;

  let correctCount = 0;
  let questionTracker = {};

  selects.forEach(sel => {
    const qIdx = parseInt(sel.getAttribute("data-index"), 10);
    const blankIdx = parseInt(sel.getAttribute("data-blank"), 10) || 0;

    const yourAns = sel.value ? norm(sel.value) : headings.unattempted;
    const correctRaw = Array.isArray(data[qIdx].answer) ? data[qIdx].answer[blankIdx] : data[qIdx].answer;
    const correctAns = norm(correctRaw);

    let status = yourAns === correctAns
      ? headings.correct
      : (yourAns === headings.unattempted ? headings.unattempted : headings.incorrect);

    sel.classList.remove("correct", "incorrect");
    if (status === headings.correct) {
      sel.classList.add("correct");
      correctCount++;
    } else if (status === headings.incorrect) {
      sel.classList.add("incorrect");
    }

    if (!questionTracker[qIdx]) questionTracker[qIdx] = { yourAns: [], correctAns: [], status: [] };
    questionTracker[qIdx].yourAns.push(yourAns);
    questionTracker[qIdx].correctAns.push(correctAns);
    questionTracker[qIdx].status.push(status);
  });

  Object.keys(questionTracker).forEach(qIdx => {
    const q = questionTracker[qIdx];
    reportHtml += `
      <tr>
        <td>${numbering[parseInt(qIdx)] || (parseInt(qIdx) + 1)}</td>
        <td>${q.yourAns.join(", ")}</td>
        <td>${q.correctAns.join(", ")}</td>
        <td>${q.status.join(", ")}</td>
      </tr>
    `;
  });

  reportHtml += `</tbody></table></div>`;
  document.getElementById("reportBoxRender").innerHTML = reportHtml;

  const statusIfallgood = document.getElementById("statusIfallgood");
  if (statusIfallgood) {
    statusIfallgood.innerHTML = `
      <span class="blinkMe" style="font-weight:bold; color:${correctCount === selects.length ? "green" : "red"}">
        ${correctCount} / ${selects.length} ${headings.statusText} 
        (${selects.length ? Math.round((correctCount / selects.length) * 100) : 0}%)
      </span>
    `;
  }
}

function showAnswersDD(data, quizId, btn) {
  // disable only the submit button inside same button group
  const btnGroup = btn.closest(".buttons");
  if (btnGroup) {
    const submitBtn = btnGroup.querySelector(".submit-btn");
    if (submitBtn) submitBtn.classList.add("disable");
  }

  const selects = document.querySelectorAll(`#${quizId} select`);
  selects.forEach(sel => {
    let qIdx = parseInt(sel.getAttribute("data-index"), 10) || 0;
    let blankIdx = parseInt(sel.getAttribute("data-blank"), 10) || 0;

    const correctRaw = Array.isArray(data[qIdx].answer)
      ? data[qIdx].answer[blankIdx]
      : data[qIdx].answer;
    const correctAns = norm(correctRaw);

    let matched = Array.from(sel.options).find(opt => norm(opt.value) === correctAns);
    if (!matched) {
      matched = Array.from(sel.options).find(opt => norm(opt.textContent) === correctAns);
    }
    if (matched) sel.value = matched.value;

    sel.classList.remove("incorrect");
    sel.classList.add("correct");
  });
}

function resetActivityDD(data, quizId, btn) {
  // enable submit button again for that quiz
  const btnGroup = btn.closest(".buttons");
  if (btnGroup) {
    const submitBtn = btnGroup.querySelector(".submit-btn");
    if (submitBtn) submitBtn.classList.remove("disable");
  }

  const selects = document.querySelectorAll(`#${quizId} select`);
  selects.forEach(sel => {
    sel.selectedIndex = 0;
    sel.classList.remove("correct", "incorrect");
  });
}

