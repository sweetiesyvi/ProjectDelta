const selectEl = document.getElementById('classicSelect');
const searchInput = document.getElementById('searchInput');
const bubblesContainer = document.getElementById('bubblesContainer');
const clickCounterEl = document.getElementById('clickCounter');

let clicks = 0;
let options = [];


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

