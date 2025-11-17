const selectEl = document.getElementById('classicSelect');
const searchInput = document.getElementById('searchInput');
const bubblesContainer = document.getElementById('bubblesContainer');
const clickCounterEl = document.getElementById('clickCounter');

let clicks = 0;
let options = [];


fetch('data/data.json')
    .then(res => res.json())
    .then(data => {

        const firstGame = data.gameSort[0]; // ou choisir le jeu que tu veux
        renderFruitOptions(firstGame);

        
      /*  options = data.options || [];
        
    
        
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
       
        renderBubbles(options); */
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


searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = options.filter(opt => opt.toLowerCase().includes(term));
    renderBubbles(filtered);
});

