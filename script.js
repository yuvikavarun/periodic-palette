document.addEventListener('DOMContentLoaded', () => {
    const periodicTableGrid = document.getElementById('periodic-table-grid');
    const searchBar = document.getElementById('search-bar');
    const themeToggle = document.getElementById('theme-toggle');
    const tooltip = document.getElementById('tooltip');
    const randomElementInfo = document.getElementById('random-element-info');

    let elements = []; // This will store our simplified element data

    // Fetch elements data
    fetch('elements.json')
        .then(response => response.json())
        .then(data => {
            elements = data;
            renderPeriodicTable(elements);
            setRandomElementOfDay();
        })
        .catch(error => console.error('Error fetching elements:', error));

    // Function to render the periodic table
    function renderPeriodicTable(elementsToRender) {
        periodicTableGrid.innerHTML = ''; // Clear existing elements
        elementsToRender.forEach(element => {
            const card = createElementCard(element);
            periodicTableGrid.appendChild(card);
        });
    }

    // Function to create an individual element card
    function createElementCard(element) {
        const card = document.createElement('div');
        card.classList.add('element-card');
        // Set grid position directly from xpos and ypos
        card.style.gridColumn = element.xpos;
        card.style.gridRow = element.ypos;

        // No category class as we don't have category data
        // No phase class as we don't have phase data

        card.innerHTML = `
            <div class="atomic-number">${element.atomicNumber}</div>
            <div class="symbol">${element.symbol}</div>
            <div class="name">${element.name}</div>
        `;

        card.addEventListener('mouseenter', (e) => showTooltip(e, element));
        card.addEventListener('mouseleave', hideTooltip);
        card.addEventListener('mousemove', updateTooltipPosition);

        return card;
    }

    // --- Tooltip Functions (Simplified) ---
    function showTooltip(e, element) {
        // Updated innerHTML to match the simplified data
        tooltip.innerHTML = `
            <h4>${element.name}</h4>
            <p><strong>Symbol:</strong> ${element.symbol}</p>
            <p><strong>Atomic Number:</strong> ${element.atomicNumber}</p>
            <p><strong>Group:</strong> ${element.group}</p>
            <p class="fact">"${element.quirkyFact}"</p>
        `;
        tooltip.classList.add('active');
        updateTooltipPosition(e);

        // Easter egg for Oganesson
        if (element.atomicNumber === 118 && element.easterEgg) {
            window.location.href = element.easterEgg; // Redirect to Rickroll
        }
    }

    function hideTooltip() {
        tooltip.classList.remove('active');
    }

    function updateTooltipPosition(e) {
        const x = e.clientX + 15;
        const y = e.clientY + 15;

        // Ensure tooltip stays within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const tooltipRect = tooltip.getBoundingClientRect();

        let finalX = x;
        let finalY = y;

        if (x + tooltipRect.width > viewportWidth) {
            finalX = e.clientX - tooltipRect.width - 15;
        }
        if (y + tooltipRect.height > viewportHeight) {
            finalY = e.clientY - tooltipRect.height - 15;
        }

        tooltip.style.left = `${finalX}px`;
        tooltip.style.top = `${finalY}px`;
    }

    // --- Search Functionality ---
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredElements = elements.filter(element =>
            element.name.toLowerCase().includes(searchTerm) ||
            element.symbol.toLowerCase().includes(searchTerm) ||
            element.atomicNumber.toString().includes(searchTerm)
        );
        renderPeriodicTable(filteredElements);
    });

    // --- Theme Toggle Functionality ---
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
        // Store theme preference
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });

    // Apply saved theme on load
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.remove('light-theme', 'dark-theme'); // Clear existing classes
            document.body.classList.add(`${savedTheme}-theme`);
        }
    }
    applySavedTheme();

    // --- Random Element of the Day ---
    function setRandomElementOfDay() {
        if (elements.length > 0) {
            const today = new Date();
            const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate(); // YYYYMMDD
            Math.seedrandom(seed); // Seed the random number generator
            const randomIndex = Math.floor(Math.random() * elements.length);
            const randomElement = elements[randomIndex];

            randomElementInfo.innerHTML = `
                <p><strong>${randomElement.name} (${randomElement.symbol})</strong></p>
                <p>Atomic No. ${randomElement.atomicNumber}</p>
                <p class="fact">"${randomElement.quirkyFact}"</p>
            `;
        }
    }

    // Polyfill for Math.seedrandom to ensure daily random element is consistent
    // (This ensures the random element is the same for a given day)
    (function(global, factory) {
        if (typeof define === 'function' && define.amd) {
            define(['exports'], factory);
        } else if (typeof exports === 'object' && typeof module !== 'undefined') {
            factory(exports);
        } else {
            factory((global.seedrandom = {}));
        }
    }(this, function(exports) {
        var stringEntropy = function(str) {
            var seed = 0;
            for (var i = 0; i < str.length; i++) {
                seed = ((seed << 5) - seed) + str.charCodeAt(i);
                seed |= 0; // To 32bit integer
            }
            return seed;
        };

        var sr = function(seed, options) {
            options = options || {};
            var key = [];

            // Flatten the seed if it is an object or array
            if (seed && typeof seed === 'object') {
                for (var i in seed) {
                    try {
                        key.push(stringEntropy(String(seed[i])));
                    } catch (e) { /* ignore */ }
                }
            } else {
                key.push(stringEntropy(String(seed)));
            }

            var mash = Mash();
            var random = pure_lcg(mash(key.join('')));

            return random;
        };

        // LCG for deterministic random numbers
        function pure_lcg(seed) {
            var A = 1103515245;
            var C = 12345;
            var M = 2**32; // Modulo 2^32

            var state = seed;

            var random = function() {
                state = (A * state + C) % M;
                return state / M;
            };
            return random;
        }

        // Hash function for seed string
        function Mash() {
            var n = 0xefc8249d;

            return function(data) {
                data = String(data);
                for (var i = 0; i < data.length; i++) {
                    n += data.charCodeAt(i);
                    var h = 0.02519603282416938 * n;
                    n = h >>> 0;
                    h -= n;
                    h *= n;
                    n = h >>> 0;
                    h -= n;
                    n += h * 0x100000000; // 2^32
                }
                return (n >>> 0) * 2.3283064365386963e-10; // C: 2^-32
            };
        }

        exports.seedrandom = sr; // Attach to exports for access
        if (typeof Math !== 'undefined') {
            Math.seedrandom = sr; // Attach to Math for direct use
        }
    }));

}); // End DOMContentLoaded
