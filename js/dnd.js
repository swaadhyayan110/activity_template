

function renderDataDND(containerId, data) {
  const dragItems = document.getElementById(containerId);
  dragItems.innerHTML = '';
  data.forEach((item) => {
    const html = `<div class="wordDrag" data-ans="${item.ans}" data-id="${item.id}">${item.text}</div>`;
    dragItems.innerHTML += html;
  });
  makeDraggable(`#${containerId} .wordDrag`);
}

function makeDraggable(selector) {
  $(selector).draggable({
    helper: "original",
    revert: "invalid",
    start: function () { $(this).addClass("dragging"); },
    stop: function () { $(this).removeClass("dragging"); }
  });

  $(selector).on("touchstart", function (e) {
    const touch = e.originalEvent.touches[0];
    const $this = $(this);
    $this.addClass("dragging");
    $this.data("touchOffsetX", touch.pageX - $this.offset().left);
    $this.data("touchOffsetY", touch.pageY - $this.offset().top);

    $(document).on("touchmove.drag", function (e) {
      const moveTouch = e.originalEvent.touches[0];
      $this.css({
        position: "absolute",
        left: moveTouch.pageX - $this.data("touchOffsetX"),
        top: moveTouch.pageY - $this.data("touchOffsetY"),
        zIndex: 9999
      });
    });

    $(document).on("touchend.drag", function () {
      $(document).off(".drag");
      $this.removeClass("dragging");
    });
  });
}


function initDroppable(containerSelector) {
  $(`${containerSelector} .dropSect`).droppable({
    accept: ".wordDrag",
    drop: function (event, ui) {
      const $dragged = ui.draggable;
      $dragged.removeClass("ui-draggable ui-draggable-handle dragging");
      $dragged.css({ top: "auto", left: "auto", position: "relative" });
      $(this).append($dragged);
    }
  });

  $(`${containerSelector} .dragItems`).droppable({
    accept: ".wordDrag",
    drop: function (event, ui) {
      const $dragged = ui.draggable;
      $dragged.removeClass("ui-draggable ui-draggable-handle dragging");
      $dragged.css({ top: "auto", left: "auto", position: "relative" });
      $(this).append($dragged);
    }
  });
}

function checkAnswersDnd(containerSelector) {
  let correct = 0;
  let total = $(`${containerSelector} .dropSect`).length;

  $(`${containerSelector} .dropSect`).each(function () {
    const correctAnswer = $(this).data("accept");
    const droppedItem = $(this).children(".wordDrag").first();
    if (droppedItem.length && droppedItem.data("ans") === correctAnswer) {
      droppedItem.css("background", "#c8e6c9");
      correct++;
    } else if (droppedItem.length) {
      droppedItem.css("background", "#ffcdd2");
    }
  });

  Swal.fire({
    title: correct === total ? "All Correct!" : "Check your answers",
    text: `You got ${correct} out of ${total} correct!`,
    icon: correct === total ? "success" : "info",
    confirmButtonText: "OK"
  });
}

function showAnswersDnd(containerSelector, data) {
  // reset + render
  const dragBox = $(`${containerSelector} .dragItems`).attr("id");
  renderDataDND(dragBox, data);
  $(`${containerSelector} .dropSect`).empty();

  // correct placement
  data.forEach((item) => {
    const $clone = $(`<div class="wordDrag">${item.text}</div>`)
      .css({ background: "#c8e6c9", position: "relative" })
      .attr("data-ans", item.ans);
    $(`${containerSelector} .dropSect[data-accept='${item.ans}']`).append($clone);
  });
}

function resetActivityDnd(containerSelector, containerId, data) {
  renderDataDND(containerId, data);
  $(`${containerSelector} .dropSect`).empty();
  $(`${containerSelector} .wordDrag`);
}



let audio = new Audio("./bg.mp3")
function playAudia(p) {
  if (p == 1) {
    $("#playSvg").hide();
    $("#pauseSvg").show();
    audio.play();
  }
  else if (p == 2) {
    $("#playSvg").show();
    $("#pauseSvg").hide();
    audio.pause();
  }
}


