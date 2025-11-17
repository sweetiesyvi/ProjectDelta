(() => {
  const selectEl = document.getElementById('classicSelect');
  const searchInput = document.getElementById('searchInput');
  const bubblesContainer = document.getElementById('bubblesContainer');
  const clickCounterEl = document.getElementById('clickCounter');

  let clicks = 0;
  let options = [];

  // Fetch the JSON from data/data.json
  fetch('data/data.json')
    .then(res => res.json())
    .then(data => {
      options = data.options || [];
      populateDropdown(options);
      renderBubbles(options);
    })
    .catch(err => console.error('Error loading JSON:', err));

  function populateDropdown(list) {
    list.forEach(opt => {
      const optionEl = document.createElement('option');
      optionEl.value = opt;
      optionEl.textContent = opt;
      selectEl.appendChild(optionEl);
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
        console.log('Selected:', opt);
      });
      bubblesContainer.appendChild(bubble);
    });
  }

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = options.filter(opt => opt.toLowerCase().includes(term));
    renderBubbles(filtered);
  });
})();
