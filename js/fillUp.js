// Render inputs
const dataFills = [
	{ img: "img/ch4_2.png", ans: "Settlement" },
	{ img: "img/ch4_3.png", ans: "Forest" },
	{ img: "img/ch4_4.png", ans: "Places of Worship" },	
	{ img: "img/ch4_5.png", ans: "River" },
	{ img: "img/ch4_6.png", ans: "Pond" },
	{ img: "img/ch4_7.png", ans: "Metalled Road" },
	{ img: "img/ch4_8.png", ans: "Unmetalled road" },
	{ img: "img/ch4_9.png", ans: "Broad Gauge Railway Line" },
	{ img: "img/ch4_10.png", ans: "Railway Crossing" },
	{ img: "img/ch4_12.png", ans: "Restaurant" },
	{ img: "img/ch4_13.png", ans: "Police Station" },
	{ img: "img/ch4_14.png", ans: "Bridge" },
];

const container2 = document.getElementById("inputsContainer");
dataFills.forEach((item, i) => {
	if (item.img) {
		container2.innerHTML += `
      <div class="col-md-4">
        <div class="fillBox shadow-sm">
          <img class="imgInboxFill" src="${item.img}" alt="feature-${i + 1}" />
          <input class="inputsFills form-control" 
                 type="text" 
                 placeholder="Fill Answer" 
                 data-ans="${item.ans}" 
                 data-type="image">
        </div>
      </div>
    `;
	} else {
		container2.innerHTML += `
      <div class="col-md-4">
        <div class="fillBox shadow-sm">
          <p class="fw-bold">${item.text}</p>
          <input class="inputsFills form-control" 
                 type="text" 
                 placeholder="Fill Answer" 
                 data-ans="${item.ans}" 
                 data-type="text">
        </div>
      </div>
    `;
	}
});

// Check answers
function checkAnswerFill() {
	let correct = 0;
	const inputs = document.querySelectorAll(".inputsFills");
	inputs.forEach(input => {
		const type = input.dataset.type;
		const userVal = input.value.trim().toLowerCase();
		const correctVal = input.dataset.ans.toLowerCase();
		if (input.value.trim() === "") {
			input.classList.add("is-invalid");
			input.classList.remove("is-valid");
		} else {
			if (type === "image") {
				if (userVal === correctVal) {
					input.classList.add("is-valid");
					input.classList.remove("is-invalid");
					correct++;
				} else {
					input.classList.add("is-invalid");
					input.classList.remove("is-valid");
				}
			} else if (type === "text") {
				input.classList.add("is-valid");
				input.classList.remove("is-invalid");
				correct++;
			}
		}
	});
	Swal.fire({
		icon: correct === dataFills.length ? "success" : "info",
		title: correct === dataFills.length ? "Perfect!" : "Checked",
		text: `You got ${correct} / ${dataFills.length} correct.`
	});
}

// Show all answers
function showAnswersFill() {
	$("#checkBtnF").addClass("disable");
	disableAll();
	document.querySelectorAll(".inputsFills").forEach(input => {
		input.value = input.dataset.ans;
		input.classList.add("is-valid");
		input.classList.remove("is-invalid");
	});
}

// Reset
function resetFill() {
	$("#checkBtnF").removeClass("disable");
	enableAll();
	document.querySelectorAll(".inputsFills").forEach(input => {
		input.value = "";
		input.classList.remove("is-valid", "is-invalid");
	});
}
function disableAll() {
	document.querySelectorAll(".inputsFills").forEach(el => {
		el.setAttribute("disabled", true);
	});
}
function enableAll() {
	document.querySelectorAll(".inputsFills").forEach(el => {
		el.removeAttribute("disabled");
	});
}

