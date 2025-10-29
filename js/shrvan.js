function checkAns(dataSet, containerId) {
  let correctCount = 0;
  let totalQues = dataSet.length;

  let tableHTML = `<div class="table-responsive p-2">
    <table class="table table-bordered" style="font-size:18px">
      <thead class="text-light" style="white-space: nowrap;">
        <tr>
          <th>${lang === "hi" ? "प्रश्न संख्या" : "Q. No."}</th>
          <th>${lang === "hi" ? "आपका उत्तर" : "Your Answer"}</th>
          <th>${lang === "hi" ? "सही उत्तर" : "Correct Answer"}</th>
          <th>${lang === "hi" ? "परिणाम" : "Result"}</th>
        </tr>
      </thead>
      <tbody>`;

  dataSet.forEach((q, i) => {
    const userAns = document.getElementById(`f${containerId}_${q.id}`).value.trim();
    const correctAnswers = Array.isArray(q.ans) ? q.ans : [q.ans];

    let isCorrect = userAns && correctAnswers.includes(userAns);
    if (isCorrect) correctCount++;

    const userAnswerText =
      userAns.length > 0
        ? userAns
        : langeuage === "hi" ? "प्रयास नहीं किया" : "Not Attempted";
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

  // Fill report inside fixed div
  document.getElementById("dataReportShravan").innerHTML = tableHTML;

  // Update score text
  document.getElementById("scoreTextQ8Click").innerText =
    langeuage === "hi"
      ? `आपको ${totalQues} में से ${correctCount} अंक मिले हैं`
      : `You scored ${correctCount} out of ${totalQues}`;

  // Show the report box
  document.getElementById("clickActShravan").style.display = "block";
}

// Close Report function
function closeReportShravan() {
  document.getElementById("clickActShravan").style.display = "none";
}



// Show Answer
function showAns(dataSet, containerId) {
  dataSet.forEach(q => {
    document.getElementById(`f${containerId}_${q.id}`).value = q.ans;
  });
}

// Reset
function resetAns(containerId) {
  const inputs = document.querySelectorAll(`#${containerId} input`);
  inputs.forEach(inp => inp.value = "");
}

let currentActivity = "D1";
let audioList = audioLists[currentActivity];
let curntInd = 0;
let audioPlayer; // declare once

window.addEventListener("DOMContentLoaded", () => {
  // initialize audio player
  audioPlayer = document.getElementById("audioPlayer");

  // attach listeners
  audioPlayer.addEventListener("play", () => {
    $("#soundEffects").css("display", "block");
  });
  audioPlayer.addEventListener("ended", () => {
    $("#soundEffects").css("display", "none");
  });

  // initialize buttons
  updateButtons();
});

function updateButtons() {
  if (!audioList) return;
  if (curntInd === 0) {
    $("#prevBtns").addClass("cNotAll");
  } else {
    $("#prevBtns").removeClass("cNotAll");
  }
  if (curntInd === audioList.length - 1) {
    $("#nextBtns").addClass("cNotAll");
  } else {
    $("#nextBtns").removeClass("cNotAll");
  }
}

function nextStep() {
  if (curntInd < audioList.length - 1) {
    curntInd++;
    audioPlayer.src = audioList[curntInd];
    audioPlayer.play();
  }
  updateButtons();
}

function prevStep() {
  if (curntInd > 0) {
    curntInd--;
    audioPlayer.src = audioList[curntInd];
    audioPlayer.play();
  }
  updateButtons();
}

function replayAudio() {
  if (!audioPlayer) return;
  audioPlayer.currentTime = 0;
  audioPlayer.play();
}

function startShravan(activityKey) {
  if (!audioLists[activityKey]) return;

  currentActivity = activityKey;
  audioList = audioLists[currentActivity];
  curntInd = 0;
  $(".afterClicks").css("display", "block");
  $(".startActBtns").css("display", "none");
  audioPlayer.src = audioList[curntInd];
  audioPlayer.play();
  updateButtons();
}
