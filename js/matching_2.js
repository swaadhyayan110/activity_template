// Matching activity (no window.* globals; uses SweetAlert if available)
function matchingMyfun(type) {
  const container = document.querySelector(`.matching-area[data-type="${type}"]`);
  if (!container) {
    console.error("No .matching-area found for type:", type);
    return;
  }

  const leftWrap = container.querySelector(".left-items");
  const rightWrap = container.querySelector(".right-items");
  const svg = container.querySelector("svg");

  if (!leftWrap || !rightWrap || !svg) {
    console.error("Required elements missing for type:", type);
    return;
  }

  // Buttons: prefer buttons inside the container, fallback to global elements
  const submitBtn = container.querySelector(".checkM1") || document.getElementById("submitM1");
  const checkBtn = container.querySelector(".check-btn") || submitBtn;
  const showBtn = container.querySelector(".show-btn") || document.querySelector(".show-btn");
  const resetBtn = container.querySelector(".reset-btn") || document.querySelector(".reset-btn");

  svg.style.pointerEvents = "none";

  // Build correct matches
  const correctMatches = {};
  leftWrap.querySelectorAll(".item").forEach((item) => {
    const leftId = item.getAttribute("data-id");
    const matchId = item.getAttribute("data-match");
    if (leftId && matchId) correctMatches[leftId] = matchId;
  });

  const userMatches = {};
  let selectedLeftItem = null;

  // Helper: safe SweetAlert wrapper
  function showAlert(options) {
    if (window.Swal?.fire) {
      // allow both shorthand and object usage
      if (typeof options === "string") {
        Swal.fire({ title: options });
      } else {
        Swal.fire(options);
      }
    } else {
      // fallback
      if (typeof options === "string") alert(options);
      else alert((options.title ? options.title + "\n" : "") + (options.text || ""));
    }
  }

  // LEFT select
  leftWrap.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;

    leftWrap.querySelectorAll(".item.selected").forEach((i) => i.classList.remove("selected"));
    item.classList.add("selected");
    selectedLeftItem = item;
  });

  // RIGHT select -> draw arrow
  rightWrap.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;

    if (!selectedLeftItem) {
      showAlert({ icon: "error", title: "Select left item first", text: "Please select an item from the left side first!" });
      return;
    }

    const leftId = selectedLeftItem.getAttribute("data-id");
    const rightId = item.getAttribute("data-id");
    userMatches[leftId] = rightId;

    drawArrow(selectedLeftItem, item);
    selectedLeftItem.classList.remove("selected");
    selectedLeftItem = null;
    checkIfAllAttempted();
  });

  // Draw arrow (keeps defs intact)
  function drawArrow(fromElement, toElement) {
    const leftId = fromElement.getAttribute("data-id");
    const rightId = toElement.getAttribute("data-id");

    // Remove old line from same left / same right
    const oldLeft = svg.querySelector(`line[data-from="${leftId}"]`);
    if (oldLeft) oldLeft.remove();
    const oldRight = svg.querySelector(`line[data-to="${rightId}"]`);
    if (oldRight) oldRight.remove();

    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const x1 = fromRect.right - containerRect.left;
    const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
    const x2 = toRect.left - containerRect.left;
    const y2 = toRect.top + toRect.height / 2 - containerRect.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#007bff");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("marker-end", "url(#arrowhead)");
    line.setAttribute("data-from", leftId);
    line.setAttribute("data-to", rightId);

    svg.appendChild(line);
    // store mapping
    userMatches[leftId] = rightId;
  }

  // Check Answers (scoped)
  function checkAnswersM1() {
    let correctCount = 0;
    const total = Object.keys(correctMatches).length;

    // clear previous colors
    container.querySelectorAll(".left-items .item, .right-items .item")
      .forEach((item) => (item.style.backgroundColor = ""));

    for (const leftId in correctMatches) {
      const leftEl = leftWrap.querySelector(`.item[data-id="${leftId}"]`);
      const rightId = userMatches[leftId];
      const rightEl = rightWrap.querySelector(`.item[data-id="${rightId}"]`);

      if (!rightId) continue;

      if (rightId === correctMatches[leftId]) {
        correctCount++;
        if (leftEl) leftEl.style.backgroundColor = "lightgreen";
        if (rightEl) rightEl.style.backgroundColor = "lightgreen";
      } else {
        if (leftEl) leftEl.style.backgroundColor = "lightcoral";
        if (rightEl) rightEl.style.backgroundColor = "lightcoral";
      }
    }

    if (correctCount === total) {
      if (submitBtn) {
        submitBtn.classList.remove("disable");
        submitBtn.disabled = false;
      }
      showAlert({
        title: "Good!",
        text: "Congratulations! All matches are correct!",
        icon: "success"
      });
    } else {
      showAlert({
        icon: "error",
        title: "Oops",
        text: `You got ${correctCount} out of ${total} correct. Try again.`
      });
    }
  }

  function showAnswers() {
    if (submitBtn) {
      submitBtn.classList.add("disable");
    }
    for (const leftId in correctMatches) {
      const leftItem = leftWrap.querySelector(`.item[data-id="${leftId}"]`);
      const rightItem = rightWrap.querySelector(`.item[data-id="${correctMatches[leftId]}"]`);
      if (leftItem && rightItem) drawArrow(leftItem, rightItem);
      userMatches[leftId] = correctMatches[leftId];
    }
    checkIfAllAttempted();
  }

  function resetActivityInner() {
    submitBtn.classList.remove("disable");
    const defs = svg.querySelector("defs");
    const defsClone = defs ? defs.cloneNode(true) : null;
    svg.innerHTML = "";
    if (defsClone) svg.appendChild(defsClone);

    Object.keys(userMatches).forEach((k) => delete userMatches[k]);
    selectedLeftItem = null;

    container.querySelectorAll(".item.selected").forEach((el) => el.classList.remove("selected"));
    container.querySelectorAll(".left-items .item, .right-items .item")
      .forEach((el) => (el.style.backgroundColor = ""));


    checkIfAllAttempted();
  }

  function resetActivity() {
    resetActivityInner();
  }

  function checkIfAllAttempted() {
    // if (!submitBtn) return;
    // const total = Object.keys(correctMatches).length;
    // const attempted = Object.keys(userMatches).filter((leftId) => userMatches[leftId]).length;

    // const shouldDisable = attempted !== total;
    // submitBtn.classList.toggle("disable", shouldDisable);
    // submitBtn.disabled = shouldDisable;
  }


  // Redraw arrows after resize
  function redrawAllArrows() {
    const defs = svg.querySelector("defs");
    const defsClone = defs ? defs.cloneNode(true) : null;
    svg.innerHTML = "";
    if (defsClone) svg.appendChild(defsClone);

    for (const leftId in userMatches) {
      const rightId = userMatches[leftId];
      const leftEl = leftWrap.querySelector(`.item[data-id="${leftId}"]`);
      const rightEl = rightWrap.querySelector(`.item[data-id="${rightId}"]`);
      if (leftEl && rightEl) drawArrow(leftEl, rightEl);
    }
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(redrawAllArrows, 10);
  });

  // Hook up buttons (local event listeners)
  if (checkBtn) checkBtn.addEventListener("click", (e) => { e.preventDefault(); checkAnswersM1(); });
  if (showBtn) showBtn.addEventListener("click", (e) => { e.preventDefault(); showAnswers(); });
  if (resetBtn) resetBtn.addEventListener("click", (e) => { e.preventDefault(); resetActivity(); });

  // initial toggles
  checkIfAllAttempted();
}

// Auto-init all matching areas on the page
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".matching-area[data-type]").forEach(area => {
    const t = area.getAttribute("data-type") || "one";
    matchingMyfun(t);
  });
});



function matchingMyfun(type) {
  const container = document.querySelector(`.matching-area[data-type="${type}"]`);
  if (!container) return;

  const leftWrap = container.querySelector(".left-items");
  const rightWrap = container.querySelector(".right-items");
  const svg = container.querySelector("svg");
  const correctMatches = {};
  leftWrap.querySelectorAll(".item").forEach(item => {
    correctMatches[item.dataset.id] = item.dataset.match;
  });

  const userMatches = {};
  let selectedLeft = null;

  leftWrap.addEventListener("click", e => {
    const item = e.target.closest(".item");
    if (!item) return;
    leftWrap.querySelectorAll(".item").forEach(i => i.classList.remove("selected"));
    item.classList.add("selected");
    selectedLeft = item;
  });

  rightWrap.addEventListener("click", e => {
    const item = e.target.closest(".item");
    if (!item || !selectedLeft) return;
    const leftId = selectedLeft.dataset.id;
    userMatches[leftId] = item.dataset.id;
    drawArrow(selectedLeft, item);
    selectedLeft.classList.remove("selected");
    selectedLeft = null;
  });

  function drawArrow(from, to) {
    const r1 = from.getBoundingClientRect();
    const r2 = to.getBoundingClientRect();
    const cr = container.getBoundingClientRect();
    const x1 = r1.right - cr.left, y1 = r1.top + r1.height / 2 - cr.top;
    const x2 = r2.left - cr.left, y2 = r2.top + r2.height / 2 - cr.top;

    const old = svg.querySelector(`line[data-from="${from.dataset.id}"]`);
    if (old) old.remove();
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1); line.setAttribute("y1", y1);
    line.setAttribute("x2", x2); line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#007bff"); line.setAttribute("stroke-width", "2");
    line.setAttribute("marker-end", "url(#arrowhead)");
    line.dataset.from = from.dataset.id;
    svg.appendChild(line);
  }

  function checkAnswersM1() {
    let correct = 0, total = Object.keys(correctMatches).length;
    for (let id in correctMatches) {
      if (userMatches[id] === correctMatches[id]) correct++;
    }
    alert(`You got ${correct} of ${total} correct`);
  }

  function showAnswers() {
    for (let id in correctMatches) {
      const left = leftWrap.querySelector(`.item[data-id="${id}"]`);
      const right = rightWrap.querySelector(`.item[data-id="${correctMatches[id]}"]`);
      if (left && right) drawArrow(left, right);
    }
  }

  function reset() {
    svg.querySelectorAll("line").forEach(l => l.remove());
    for (let k in userMatches) delete userMatches[k];
  }

  container.parentNode.querySelector(".checkM1").onclick = checkAnswersM1;
  container.parentNode.querySelector(".show-btn").onclick = showAnswers;
  container.parentNode.querySelector(".reset-btn").onclick = reset;
}

document.addEventListener("DOMContentLoaded", () => {
  matchingMyfun("one");
});

// ================= Activity 2 Script =================


function toSvgCoords(svg, x, y) {
  const pt = svg.createSVGPoint();
  pt.x = x; pt.y = y;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function drawLineM2(el1, el2, svg, opt = {}) {
  const r1 = el1.getBoundingClientRect(), r2 = el2.getBoundingClientRect();
  const c1x = r1.left + r1.width / 2, c1y = r1.top + r1.height / 2;
  const c2x = r2.left + r2.width / 2, c2y = r2.top + r2.height / 2;
  const p1 = toSvgCoords(svg, c1x, c1y), p2 = toSvgCoords(svg, c2x, c2y);
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y);
  line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
  line.setAttribute("stroke", opt.stroke || "green");
  line.setAttribute("stroke-width", opt.width || 2);
  line.setAttribute("marker-end", "url(#arrowhead)");
  svg.appendChild(line);
  return line;
}

function drawTempLineWrong(el1, el2, svg) {
  const l = drawLineM2(el1, el2, svg, { stroke: "red", width: 2 });
  // auto remove wrong line after 1.5 sec
  // setTimeout(() => l.remove(), 1500);
}

function matchItemsM2(e) {
  const act = document.querySelector('.matching-area2[data-type="two"]');
  const svg = act.querySelector("svg");
  const sel = e.currentTarget;

  if (!firstSelectedM2) {
    firstSelectedM2 = sel;
    sel.classList.add("selectedM2");
    return;
  }
  if (firstSelectedM2 === sel) {
    sel.classList.remove("selectedM2");
    firstSelectedM2 = null;
    return;
  }

  let imgEl = null, centerEl = null;
  if (firstSelectedM2.dataset.col !== "2" && sel.dataset.col === "2") {
    imgEl = firstSelectedM2; centerEl = sel;
  } else if (firstSelectedM2.dataset.col === "2" && sel.dataset.col !== "2") {
    imgEl = sel; centerEl = firstSelectedM2;
  } else {
    firstSelectedM2.classList.remove("selectedM2");
    firstSelectedM2 = null;
    return;
  }

  // 🔑 multi-match check
  const validMatches = imgEl.dataset.match.split(","); // e.g. "3,5" → ["3","5"]
  if (validMatches.includes(centerEl.dataset.id)) {
    connectionsM2.push({ imgId: imgEl.dataset.id, centerId: centerEl.dataset.id });
    drawLineM2(imgEl, centerEl, svg);
  } else {
    drawTempLineWrong(imgEl, centerEl, svg);
  }

  firstSelectedM2.classList.remove("selectedM2");
  firstSelectedM2 = null;
}

function checkAnswersM2() {
  const act = document.querySelector('.matching-area2[data-type="two"]');
  const allImgs = act.querySelectorAll('.imgBoxes');
  let ok = true;

  allImgs.forEach(img => {
    const validMatches = img.dataset.match.split(",");
    // check if at least one connection is valid
    const hasCorrect = connectionsM2.some(c => c.imgId === img.dataset.id && validMatches.includes(c.centerId));
    if (!hasCorrect) ok = false;
  });

  alert(ok ? "✅ All correct!" : "❌ Some wrong or missing.");
}

function showAnswersM2() {
  resetActivityM2();
  const act = document.querySelector('.matching-area2[data-type="two"]');
  const svg = act.querySelector("svg");

  act.querySelectorAll('.imgBoxes').forEach(img => {
    const validMatches = img.dataset.match.split(",");
    validMatches.forEach(mid => {
      const c = act.querySelector(`.centerItems[data-id="${mid}"]`);
      if (c) {
        connectionsM2.push({ imgId: img.dataset.id, centerId: mid });
        drawLineM2(img, c, svg);
      }
    });
  });
}

function resetActivityM2() {
  connectionsM2 = [];
  firstSelectedM2 = null;
  const act = document.querySelector('.matching-area2[data-type="two"]');
  act.querySelector("svg").querySelectorAll("line").forEach(l => l.remove());
}
function redrawLinesM2() {
  const act = document.querySelector('.matching-area2[data-type="two"]');
  const svg = act.querySelector("svg");

  // clear old lines
  svg.querySelectorAll("line").forEach(l => l.remove());

  // redraw all connections
  connectionsM2.forEach(conn => {
    const imgEl = act.querySelector(`.imgBoxes[data-id="${conn.imgId}"]`);
    const centerEl = act.querySelector(`.centerItems[data-id="${conn.centerId}"]`);
    if (imgEl && centerEl) {
      drawLineM2(imgEl, centerEl, svg);
    }
  });
}
window.addEventListener("resize", () => {
  redrawLinesM2();
});

