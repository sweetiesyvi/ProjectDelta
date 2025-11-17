/* const selectEl = document.getElementById('classicSelect');
const searchInput = document.getElementById('searchInput');
const bubblesContainer = document.getElementById('bubblesContainer');
const clickCounterEl = document.getElementById('clickCounter');

let clicks = 0;
let options = [];

/*
fetch('data/data.json')
    .then(res => res.json())
    .then(data => {

     options = data.options || [];
        
        options.forEach(opt => {
            const optionEl = document.createElement('option');
            optionEl.value = opt;
            optionEl.textContent = opt;
            selectEl.appendChild(optionEl);
            
            const bubbleImg = document.createElement('img');
            bubbleImg.src = normalizeUrl(item.img) || 'images/placeholder.png';
            bubbleImg.alt = item.appName;
            bubbleImg.style.width = '40px'; 
            bubbleImg.style.height = 'auto';
            bubble.appendChild(bubbleImg);

        });
       
        renderBubbles(options); 
    })
  .catch(err => console.error('Failed to load options:', err));

function renderFruitOptions(game) {
    const container = document.getElementById('imageContainer');
    container.innerHTML = ''; // vider l'ancien contenu

    if (!game.options) return;

    game.options.forEach(option => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = option.name;

        // Image cachée
        const img = document.createElement('img');
        img.src = option.img;
        img.alt = option.name;
        img.style.width = '150px';
        img.style.height = 'auto';
        img.style.display = 'none'; // cachée au départ

        // Affiche l'image au clic
        bubble.addEventListener('click', () => {
            img.style.display = 'block';
        });

        bubble.appendChild(img);
        container.appendChild(bubble);
    });
}


function renderBubbles(list) {
    bubblesContainer.innerHTML = '';
    list.forEach(opt => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = opt;
        bubble.addEventListener('click', () => {
            clicks++;
            clickCounterEl.textContent = `Clicks: ${clicks}`;
            console.log(`Selected: ${opt}`);
        });
        bubblesContainer.appendChild(bubble);
    });
}
*/

/*fetch('data/data.json')
  .then(res => res.json())
  .then(data => {
    const options = data.options || [];
    // populate classic select
    options.forEach(opt => {
      const optionEl = document.createElement('option');
      optionEl.value = opt.name;
      optionEl.textContent = opt.name;
      selectEl.appendChild(optionEl);
    });
    // render bubbles with images
    renderOptions(options);
  })
  .catch(err => console.error('Failed to load options:', err));

function renderOptions(optionsList) {
  bubblesContainer.innerHTML = '';
  optionsList.forEach(opt => {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    // image
    const img = document.createElement('img');
    img.src = opt.img;
    img.alt = opt.name;
    img.width = 40; // small thumb
    img.height = 'auto';
    bubble.appendChild(img);
    // label
    const label = document.createElement('div');
    label.textContent = opt.name;
    label.className = 'bubble-label';
    bubble.appendChild(label);
    // click handler...
    bubble.addEventListener('click', () => {
      clicks++;
      clickCounterEl.textContent = `Clicks: ${clicks}`;
      console.log('Selected:', opt.name);
    });
    bubblesContainer.appendChild(bubble);
  });
}
*/

/*fetch("data/data.json")
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";

    data.options.forEach(opt => {
      const bubble = document.createElement("div");
      bubble.className = "bubble";

      // Image
      const img = document.createElement("img");
      img.src = opt.img; 
      img.alt = opt.name;
      img.classList.add("bubble-img");

      // Text
      const label = document.createElement("span");
      label.textContent = opt.name;

      bubble.appendChild(img);
      bubble.appendChild(label);
      container.appendChild(bubble);
    });
  })
  .catch(err => console.error("JSON load error:", err));


searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = options.filter(opt => opt.toLowerCase().includes(term));
    renderBubbles(filtered);
});

*/

const selectEl = document.getElementById("classicSelect");
const bubblesContainer = document.getElementById("bubblesContainer");
const clickCounterEl = document.getElementById("clickCounter");
const imageDisplay = document.getElementById("imageDisplay");

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
            imageDisplay.alt = opt.name;
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
    imageDisplay.alt = selected.name;
});
