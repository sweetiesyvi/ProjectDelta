document.addEventListener("DOMContentLoaded", () => {
    const selectEl = document.getElementById("classicSelect");
    const imageDisplay = document.getElementById("displayImage");
    const clickCounterEl = document.getElementById("clickCounter");
    const bubblesContainer = document.getElementById("bubblesContainer");
    const searchInput = document.getElementById("searchInput");

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

            // afficher toutes les bulles
            renderBubbles(options);
        })
        .catch(err => console.error("JSON load error:", err));

    // ----------------------
    // 2. Afficher bulles
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

            bubble.addEventListener("click", () => {
                clicks++;
                clickCounterEl.textContent = `Clicks: ${clicks}`;

                imageDisplay.src = opt.img;
                imageDisplay.style.display = "block";

                // fade-in
                imageDisplay.classList.remove("show");
                setTimeout(() => imageDisplay.classList.add("show"), 10);
            });

            bubblesContainer.appendChild(bubble);
        });
    }

    // ----------------------
    // 3. Recherche
    // ----------------------
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        let filtered = options;

        if (query !== "") {
            filtered = options.filter(opt =>
                opt.name.toLowerCase().includes(query)
            );
        }

        renderBubbles(filtered);
    });

    // ----------------------
    // 4. Dropdown
    // ----------------------
    selectEl.addEventListener("change", () => {
        const selected = options.find(o => o.name === selectEl.value);
        if (!selected) return;

        clicks++;
        clickCounterEl.textContent = `Clicks: ${clicks}`;

        imageDisplay.src = selected.img;
        imageDisplay.style.display = 'block';

        // fade-in
        imageDisplay.classList.remove("show");
        setTimeout(() => imageDisplay.classList.add("show"), 10);
    });
});

