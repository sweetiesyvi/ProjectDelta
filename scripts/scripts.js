document.addEventListener("DOMContentLoaded", () => {
const selectEl = document.getElementById("classicSelect");
const imageDisplay = document.getElementById("displayImage");
const clickCounterEl = document.getElementById("clickCounter");
const bubblesContainer = document.getElementById("bubblesContainer");



let clicks = 0;
let options = [];

// ----------------------
// 1. Charger le JSON
// ----------------------
fetch("data/data.json")
    .then(res => res.json())
    .then(data => {

        options = data.options;

        // remplir la liste déroulante
        options.forEach(opt => {
            const optionEl = document.createElement("option");
            optionEl.value = opt.name;
            optionEl.textContent = opt.name;
            selectEl.appendChild(optionEl);
        });

        // afficher les bulles
        renderBubbles(options);
    })
    .catch(err => console.error("JSON load error:", err));


// ----------------------
// 2. Fonction pour afficher les bulles
// ----------------------
function renderBubbles(list) {
    bubblesContainer.innerHTML = "";

    list.forEach(opt => {
        const bubble = document.createElement("div");
        bubble.className = "bubble";

        const img = document.createElement("img");
        img.src = opt.img;
        img.alt = opt.name;
        img.classList.add("bubble-img");

        const label = document.createElement("span");
        label.textContent = opt.name;

        bubble.appendChild(img);
        bubble.appendChild(label);

        // clic sur la bulle
        bubble.addEventListener("click", () => {
            clicks++;
            clickCounterEl.textContent = `Clicks: ${clicks}`;

            // afficher l’image sélectionnée
            imageDisplay.src = opt.img;
            /*imageDisplay.alt = opt.name; */
            imageDisplay.style.display = "block";
        });

        bubblesContainer.appendChild(bubble);
    });
}


// ----------------------
// 3. Sélection dans la liste déroulante
// ----------------------
selectEl.addEventListener("change", () => {
    const selected = options.find(o => o.name === selectEl.value);
    if (!selected) return;

    clicks++;
    clickCounterEl.textContent = `Clicks: ${clicks}`;
    
    imageDisplay.src = selected.img;
   /* imageDisplay.alt = selected.name; */
    imageDisplay.style.display = 'block';

    });
});
