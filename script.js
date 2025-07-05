document.addEventListener('DOMContentLoaded', () => {
    const periodicTableGrid = document.getElementById('periodic-table-grid');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const phaseFiltersContainer = document.getElementById('phase-filters');
    const searchBar = document.getElementById('search-bar');
    const themeToggle = document.getElementById('theme-toggle');
    const tooltip = document.getElementById('tooltip');
    const randomElementInfo = document.getElementById('random-element-info');

    let elements = []; // To store fetched element data
    let currentFilters = { categories: new Set(), phases: new Set() };

    // --- Helper Functions ---

    // Function to get color class based on category
    function getCategoryColorClass(category) {
        // Normalize category name for CSS class
        const normalizedCategory = category.toLowerCase().replace(/\s/g, '-');
        return `category-${normalizedCategory}`;
    }

    // Function to render a single element card
    function createElementCard(element) {
        const card = document.createElement('div');
        card.classList.add('element-card', getCategoryColorClass(element.category));
        card.setAttribute('data-atomic-number', element.atomicNumber);
        card.setAttribute('data-category', element.category.toLowerCase().replace(/\s/g, '-'));
        card.setAttribute('data-phase', element.phase.toLowerCase());
        card.setAttribute('data-name', element.name.toLowerCase());
        card.setAttribute('data-symbol', element.symbol.toLowerCase());

        card.innerHTML = `
            <div class="atomic-number">${element.atomicNumber}</div>
            <div class="symbol">${element.symbol}</div>
            <div class="name">${element.name}</div>
        `;

        // Handle tooltip display on hover
        card.addEventListener('mouseenter', (e) => showTooltip(e, element));
        card.addEventListener('mouseleave', hideTooltip);
        card.addEventListener('mousemove', updateTooltipPosition);

        // Easter Egg for Oganesson (Uuo/Og)
        if (element.symbol === 'Og' || element.symbol === 'Uuo') {
            card.addEventListener('click', () => {
                if (element.easterEgg) {
                    window.open(element.easterEgg, '_blank');
                }
            });
        }

        return card;
    }

    // Function to render the entire periodic table
    function renderPeriodicTable(filteredElements = elements) {
        periodicTableGrid.innerHTML = ''; // Clear existing elements

        // Create an array to hold all elements in their correct grid position
        const orderedElements = Array(118).fill(null);
        filteredElements.forEach(element => {
            // Adjust for grid layout (e.g., Hydrogen is at grid-column: 1, grid-row: 1)
            // This part is crucial and requires careful mapping.
            // For a perfect layout, you'd need to know the specific grid positions.
            // For simplicity, let's assume atomicNumber - 1 is a good starting point for a flat grid
            // and then manually adjust for groups/periods with CSS grid-column/grid-row.
            // A more robust solution would involve adding 'xpos' and 'ypos' to your JSON data.

            // Dummy positioning for basic grid
            // This will NOT give a proper periodic table layout by itself.
            // You'd need specific grid-column/grid-row values in CSS or via JS for each element.
            // A common approach is to add `xpos` and `ypos` to your JSON data.
            // For now, let's just append. For a proper grid, you'll apply `grid-column` and `grid-row`
            // directly to each `element-card` via JavaScript or CSS for specific elements.
            // Example: card.style.gridColumn = element.xpos; card.style.gridRow = element.ypos;
            periodicTableGrid.appendChild(createElementCard(element));
        });
    }

    // Function to show tooltip
    function showTooltip(e, element) {
        tooltip.innerHTML = `
            <h4>${element.name} ${element.emoji || ''}</h4>
            <p><strong>Symbol:</strong> ${element.symbol}</p>
            <p><strong>Atomic Number:</strong> ${element.atomicNumber}</p>
            <p><strong>Atomic Mass:</strong> ${element.atomicMass.toFixed(3)}</p>
            <p><strong>Category:</strong> ${element.category}</p>
            <p><strong>Phase:</strong> ${element.phase}</p>
            <p class="fact">"${element.quirkyFact}"</p>
        `;
        tooltip.classList.add('active');
        updateTooltipPosition(e);
    }

    // Function to update tooltip position
    function updateTooltipPosition(e) {
        const x = e.clientX + 15; // Offset from mouse cursor
        const y = e.clientY + 15;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;

        // Keep tooltip within viewport
        const tooltipRect = tooltip.getBoundingClientRect();
        if (x + tooltipRect.width > window.innerWidth - 20) {
            tooltip.style.left = `${e.clientX - tooltipRect.width - 15}px`;
        }
        if (y + tooltipRect.height > window.innerHeight - 20) {
            tooltip.style.top = `${e.clientY - tooltipRect.height - 15}px`;
        }
    }

    // Function to hide tooltip
    function hideTooltip() {
        tooltip.classList.remove('active');
    }

    // --- Filtering Logic ---
    function applyFiltersAndSearch() {
        const searchTerm = searchBar.value.toLowerCase();
        const filtered = elements.filter(element => {
            const matchesSearch = element.name.toLowerCase().includes(searchTerm) ||
                                  element.symbol.toLowerCase().includes(searchTerm) ||
                                  element.atomicNumber.toString().includes(searchTerm);

            const matchesCategory = currentFilters.categories.size === 0 ||
                                    currentFilters.categories.has(element.category.toLowerCase().replace(/\s/g, '-'));

            const matchesPhase = currentFilters.phases.size === 0 ||
                                 currentFilters.phases.has(element.phase.toLowerCase());

            return matchesSearch && matchesCategory && matchesPhase;
        });
        renderPeriodicTable(filtered);
    }

    // --- Event Listeners ---

    // Fetch elements data
    async function fetchElements() {
        try {
            const response = await fetch('elements.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            elements = await response.json();
            populateCategoryFilters(); // Populate filters after fetching data
            renderPeriodicTable(); // Initial render
            displayRandomElement(); // Display random element on load
        } catch (error) {
            console.error('Error fetching elements:', error);
            periodicTableGrid.innerHTML = '<p>Failed to load periodic table data. Please try again later.</p>';
        }
    }

    // Populate category filters dynamically
    function populateCategoryFilters() {
        const categories = new Set(elements.map(e => e.category.toLowerCase().replace(/\s/g, '-')));
        categoryFiltersContainer.innerHTML = ''; // Clear existing
        categories.forEach(category => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" data-filter="category" value="${category}"> ${category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}`;
            categoryFiltersContainer.appendChild(label);
        });
        addFilterEventListeners(); // Add listeners after populating
    }

    // Add event listeners for filters
    function addFilterEventListeners() {
        document.querySelectorAll('input[type="checkbox"][data-filter="category"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    currentFilters.categories.add(e.target.value);
                } else {
                    currentFilters.categories.delete(e.target.value);
                }
                applyFiltersAndSearch();
            });
        });

        document.querySelectorAll('input[type="checkbox"][data-filter="phase"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    currentFilters.phases.add(e.target.value);
                } else {
                    currentFilters.phases.delete(e.target.value);
                }
                applyFiltersAndSearch();
            });
        });
    }

    // Search bar event listener
    searchBar.addEventListener('input', applyFiltersAndSearch);

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // Load saved theme preference
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }

    // Random Element of the Day
    function displayRandomElement() {
        if (elements.length > 0) {
            const randomIndex = Math.floor(Math.random() * elements.length);
            const randomElement = elements[randomIndex];
            randomElementInfo.innerHTML = `
                <strong>${randomElement.name} (${randomElement.symbol})</strong>
                <br>Atomic Number: ${randomElement.atomicNumber}
                <br>Fact: ${randomElement.quirkyFact}
            `;
        }
    }

    // --- Initialization ---
    loadThemePreference();
    fetchElements();
});
