
const tabData = [
    {
        id: "jumping",
        title: "फुदक-फुदककर",
        meaning: "कूद-कूदकर",
        sentence: "छोटी चिड़ियाँ फुदक-फुदककर चलना सीखती हैं।",
        image: "images/4.png"
    },
    {
        id: "care",
        title: "लालन-पालन",
        meaning: "पालन-पोषण",
        sentence: "चिड़ियाँ भी अपने बच्चों का लालन-पालन करती हैं।",
        image: "images/3.png"
    },
    {
        id: "love",
        title: "दुलार",
        meaning: "प्रेम",
        sentence: "गाय बछड़े को दुलार कर रही है।",
        image: ""
    },
    {
        id: "security",
        title: "चौकसी",
        meaning: "पहरेदारी",
        sentence: "चिड़िया अपने छोटे बच्चों की चौकसी करती है।",
        image: ""
    },
    {
        id: "nature",
        title: "कुदरत",
        meaning: "प्रकृति",
        sentence: "कुदरत ही सभी प्राणियों को जीने का तरीका सिखाती है।",
        image: "images/6.png"
    },
    {
        id: "part",
        title: "अंश",
        meaning: "भाग",
        sentence: "सभी में अपने माता-पिता का अंश होता है।",
        image: ""
    },
    {
        id: "tree",
        title: "तरु",
        meaning: "पेड़",
        sentence: "चिड़ियाँ तरु पर अपना घोंसला बनाती हैं।",
        image: ""
    },
    {
        id: "family",
        title: "वंशज",
        meaning: "वंश में उत्पन्न",
        sentence: "हम सभी ईश्वर के वंशज हैं।",
        image: ""
    },
    {
        id: "nest",
        title: "घोंसले",
        meaning: "पक्षियों का घर",
        sentence: "चिड़ियाँ तिनके जमा करके घोंसले बनाती हैं।",
        image: "images/7.png"
    }
];


const tabButtons = document.getElementById("tabButtons");
const tabPanes = document.getElementById("tabPanes");


tabData.forEach((tab, index) => {

  tabButtons.innerHTML += `
    <button class="tab-btn ${index === 0 ? 'active' : ''}" data-tab="${tab.id}">
      ${tab.title}
    </button>
  `;

  tabPanes.innerHTML += `
    <div class="tab-pane ${index === 0 ? 'active' : ''}" id="${tab.id}">
      <h2 class="over"><b>${tab.title}</b></h2>
      <div class="meaning"><b>अर्थ:</b> ${tab.meaning}</div>
      <div class="sentence-use">
        <b class="sent-head">वाक्य -</b> ${tab.sentence.replace(tab.title, `<span class="blinking-underline sometextcolor">${tab.title}</span>`)}
      </div>
      ${tab.image 
        ? `<div class="img-box">
             <img class="photo animate__animated animate__bounceInRight" src="${tab.image}">
           </div>` 
        : ""
      }
    </div>
  `;
});



document.addEventListener("click", e => {
    if (e.target.classList.contains("tab-btn")) {
        const id = e.target.dataset.tab;

        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");

        document.querySelectorAll(".tab-pane").forEach(pane => {
            pane.classList.remove("active");
        });
        document.getElementById(id).classList.add("active");
    }
});


