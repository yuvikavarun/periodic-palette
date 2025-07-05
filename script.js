document.addEventListener('DOMContentLoaded', () => {
    const periodicTableGrid = document.getElementById('periodic-table-grid');
    const categoryFilter = document.getElementById('category-filter');
    const stateFilter = document.getElementById('state-filter');
    const colorIndexDiv = document.getElementById('color-index'); // Get the new color index div

    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const modalElementName = document.getElementById('modal-element-name');
    const modalElementSymbol = document.getElementById('modal-element-symbol');
    const modalElementAtomicNumber = document.getElementById('modal-element-atomic-number');
    const modalElementAtomicMass = document.getElementById('modal-element-atomic-mass');
    const modalElementCategory = document.getElementById('modal-element-category');
    const modalElementState = document.getElementById('modal-element-state');
    const modalElementDiscoveryYear = document.getElementById('modal-element-discovery-year');
    const modalElementFunFact = document.getElementById('modal-element-fun-fact');

    // Element data (This is a complete list of 118 elements with fun facts)
    const elements = [
        { atomicNumber: 1, symbol: "H", name: "Hydrogen", atomicMass: 1.008, category: "nonmetal", state: "gas", discoveryYear: "1766", funFact: "The most abundant chemical substance in the universe." },
        { atomicNumber: 2, symbol: "He", name: "Helium", atomicMass: 4.0026, category: "noble-gas", state: "gas", discoveryYear: "1868", funFact: "Makes your voice sound funny and is lighter than air!" },
        { atomicNumber: 3, symbol: "Li", name: "Lithium", atomicMass: 6.94, category: "alkali-metal", state: "solid", discoveryYear: "1817", funFact: "Used in batteries for phones and electric cars." },
        { atomicNumber: 4, symbol: "Be", name: "Beryllium", atomicMass: 9.0122, category: "alkaline-earth-metal", state: "solid", discoveryYear: "1798", funFact: "Its compounds are sweet-tasting but highly toxic." },
        { atomicNumber: 5, symbol: "B", name: "Boron", atomicMass: 10.81, category: "metalloid", state: "solid", discoveryYear: "1808", funFact: "Used in heat-resistant glass like Pyrex." },
        { atomicNumber: 6, symbol: "C", name: "Carbon", atomicMass: 12.011, category: "nonmetal", state: "solid", discoveryYear: "Ancient", funFact: "The basis of all known life on Earth, found in diamonds and graphite." },
        { atomicNumber: 7, symbol: "N", name: "Nitrogen", atomicMass: 14.007, category: "nonmetal", state: "gas", discoveryYear: "1772", funFact: "Makes up about 78% of Earth's atmosphere." },
        { atomicNumber: 8, symbol: "O", name: "Oxygen", atomicMass: 15.999, category: "nonmetal", state: "gas", discoveryYear: "1774", funFact: "Essential for breathing and combustion." },
        { atomicNumber: 9, symbol: "F", name: "Fluorine", atomicMass: 18.998, category: "halogen", state: "gas", discoveryYear: "1886", funFact: "The most reactive chemical element." },
        { atomicNumber: 10, symbol: "Ne", name: "Neon", atomicMass: 20.180, category: "noble-gas", state: "gas", discoveryYear: "1898", funFact: "Used in bright, glowing advertising signs." },
        { atomicNumber: 11, symbol: "Na", name: "Sodium", atomicMass: 22.990, category: "alkali-metal", state: "solid", discoveryYear: "1807", funFact: "Reacts violently with water; found in table salt." },
        { atomicNumber: 12, symbol: "Mg", name: "Magnesium", atomicMass: 24.305, category: "alkaline-earth-metal", state: "solid", discoveryYear: "1755", funFact: "Burns with a brilliant white light, used in fireworks." },
        { atomicNumber: 13, symbol: "Al", name: "Aluminum", atomicMass: 26.982, category: "post-transition-metal", state: "solid", discoveryYear: "1825", funFact: "Lightweight and strong, used in aircraft and soda cans." },
        { atomicNumber: 14, symbol: "Si", name: "Silicon", atomicMass: 28.085, category: "metalloid", state: "solid", discoveryYear: "1823", funFact: "The main component of computer chips and sand." },
        { atomicNumber: 15, symbol: "P", name: "Phosphorus", atomicMass: 30.974, category: "nonmetal", state: "solid", discoveryYear: "1669", funFact: "Essential for life, found in DNA and bones. Glows in the dark when white phosphorus." },
        { atomicNumber: 16, symbol: "S", name: "Sulfur", atomicMass: 32.06, category: "nonmetal", state: "solid", discoveryYear: "Ancient", funFact: "Smells like rotten eggs and is found near volcanoes." },
        { atomicNumber: 17, symbol: "Cl", name: "Chlorine", atomicMass: 35.45, category: "halogen", state: "gas", discoveryYear: "1774", funFact: "Used to disinfect swimming pools and purify water." },
        { atomicNumber: 18, symbol: "Ar", name: "Argon", atomicMass: 39.948, category: "noble-gas", state: "gas", discoveryYear: "1894", funFact: "Used in light bulbs to prevent the filament from burning out." },
        { atomicNumber: 19, symbol: "K", name: "Potassium", atomicMass: 39.098, category: "alkali-metal", state: "solid", discoveryYear: "1807", funFact: "Essential for plant growth and nerve function in humans." },
        { atomicNumber: 20, symbol: "Ca", name: "Calcium", atomicMass: 40.078, category: "alkaline-earth-metal", state: "solid", discoveryYear: "1808", funFact: "A major component of bones, teeth, and shells." },
        { atomicNumber: 21, symbol: "Sc", name: "Scandium", atomicMass: 44.956, category: "transition-metal", state: "solid", discoveryYear: "1879", funFact: "Used in aerospace components and sports equipment like bicycle frames." },
        { atomicNumber: 22, symbol: "Ti", name: "Titanium", atomicMass: 47.867, category: "transition-metal", state: "solid", discoveryYear: "1791", funFact: "Strong as steel but much lighter, used in aircraft and medical implants." },
        { atomicNumber: 23, symbol: "V", name: "Vanadium", atomicMass: 50.942, category: "transition-metal", state: "solid", discoveryYear: "1801", funFact: "Used to make strong, durable steel alloys for tools and engine parts." },
        { atomicNumber: 24, symbol: "Cr", name: "Chromium", atomicMass: 51.996, category: "transition-metal", state: "solid", discoveryYear: "1797", funFact: "Gives rubies their red color and used in chrome plating." },
        { atomicNumber: 25, symbol: "Mn", name: "Manganese", atomicMass: 54.938, category: "transition-metal", state: "solid", discoveryYear: "1774", funFact: "Essential for human health and used in steel production." },
        { atomicNumber: 26, symbol: "Fe", name: "Iron", atomicMass: 55.845, category: "transition-metal", state: "solid", discoveryYear: "Ancient", funFact: "The most common element on Earth by mass; forms the core of our planet." },
        { atomicNumber: 27, symbol: "Co", name: "Cobalt", atomicMass: 58.933, category: "transition-metal", state: "solid", discoveryYear: "1735", funFact: "Used to create strong magnets and in blue pigments for glass and ceramics." },
        { atomicNumber: 28, symbol: "Ni", name: "Nickel", atomicMass: 58.693, category: "transition-metal", state: "solid", discoveryYear: "1751", funFact: "Often used in coins and to make stainless steel." },
        { atomicNumber: 29, symbol: "Cu", name: "Copper", atomicMass: 63.546, category: "transition-metal", state: "solid", discoveryYear: "Ancient", funFact: "An excellent electrical conductor, widely used in wiring." },
        { atomicNumber: 30, symbol: "Zn", name: "Zinc", atomicMass: 65.38, category: "post-transition-metal", state: "solid", discoveryYear: "Ancient", funFact: "Used to galvanize steel to prevent rust and in batteries." },
        { atomicNumber: 31, symbol: "Ga", name: "Gallium", atomicMass: 69.723, category: "post-transition-metal", state: "solid", discoveryYear: "1875", funFact: "Melts in the palm of your hand (melting point 29.76 °C)." },
        { atomicNumber: 32, symbol: "Ge", name: "Germanium", atomicMass: 72.63, category: "metalloid", state: "solid", discoveryYear: "1886", funFact: "Used in fiber optic cables and infrared optics." },
        { atomicNumber: 33, symbol: "As", name: "Arsenic", atomicMass: 74.922, category: "metalloid", state: "solid", discoveryYear: "1250", funFact: "Known for its toxicity, historically used as a poison." },
        { atomicNumber: 34, symbol: "Se", name: "Selenium", atomicMass: 78.971, category: "nonmetal", state: "solid", discoveryYear: "1817", funFact: "Its electrical conductivity increases with light, used in photocopiers." },
        { atomicNumber: 35, symbol: "Br", name: "Bromine", atomicMass: 79.904, category: "halogen", state: "liquid", discoveryYear: "1826", funFact: "One of only two elements that are liquid at room temperature." },
        { atomicNumber: 36, symbol: "Kr", name: "Krypton", atomicMass: 83.798, category: "noble-gas", state: "gas", discoveryYear: "1898", funFact: "Used in some types of photographic flashes and lighting." },
        { atomicNumber: 37, symbol: "Rb", name: "Rubidium", atomicMass: 85.468, category: "alkali-metal", state: "solid", discoveryYear: "1861", funFact: "Highly reactive and ignites spontaneously in air." },
        { atomicNumber: 38, symbol: "Sr", name: "Strontium", atomicMass: 87.62, category: "alkaline-earth-metal", state: "solid", discoveryYear: "1790", funFact: "Gives fireworks a brilliant red color." },
        { atomicNumber: 39, symbol: "Y", name: "Yttrium", atomicMass: 88.906, category: "transition-metal", state: "solid", discoveryYear: "1794", funFact: "Used in red phosphors for color televisions (older TVs)." },
        { atomicNumber: 40, symbol: "Zr", name: "Zirconium", atomicMass: 91.224, category: "transition-metal", state: "solid", discoveryYear: "1789", funFact: "Highly resistant to corrosion, used in nuclear reactors." },
        { atomicNumber: 41, symbol: "Nb", name: "Niobium", atomicMass: 92.906, category: "transition-metal", state: "solid", discoveryYear: "1801", funFact: "Used in superconducting magnets and jet engines." },
        { atomicNumber: 42, symbol: "Mo", name: "Molybdenum", atomicMass: 95.95, category: "transition-metal", state: "solid", discoveryYear: "1778", funFact: "Essential for many enzymes and used in high-strength alloys." },
        { atomicNumber: 43, symbol: "Tc", name: "Technetium", atomicMass: 98, category: "transition-metal", state: "solid", discoveryYear: "1937", funFact: "The lightest element with no stable isotopes; all its forms are radioactive." },
        { atomicNumber: 44, symbol: "Ru", name: "Ruthenium", atomicMass: 101.07, category: "transition-metal", state: "solid", discoveryYear: "1844", funFact: "Used to harden platinum and palladium in electrical contacts." },
        { atomicNumber: 45, symbol: "Rh", name: "Rhodium", atomicMass: 102.91, category: "transition-metal", state: "solid", discoveryYear: "1803", funFact: "One of the most expensive precious metals, used in catalytic converters." },
        { atomicNumber: 46, symbol: "Pd", name: "Palladium", atomicMass: 106.42, category: "transition-metal", state: "solid", discoveryYear: "1803", funFact: "Can absorb up to 900 times its own volume of hydrogen." },
        { atomicNumber: 47, symbol: "Ag", name: "Silver", atomicMass: 107.87, category: "transition-metal", state: "solid", discoveryYear: "Ancient", funFact: "The best electrical and thermal conductor of all metals." },
        { atomicNumber: 48, symbol: "Cd", name: "Cadmium", atomicMass: 112.41, category: "post-transition-metal", state: "solid", discoveryYear: "1817", funFact: "Toxic, but used in rechargeable batteries (NiCd) and nuclear reactor control rods." },
        { atomicNumber: 49, symbol: "In", name: "Indium", atomicMass: 114.82, category: "post-transition-metal", state: "solid", discoveryYear: "1863", funFact: "Used in transparent conductive coatings for touchscreens (ITO)." },
        { atomicNumber: 50, symbol: "Sn", name: "Tin", atomicMass: 118.71, category: "post-transition-metal", state: "solid", discoveryYear: "Ancient", funFact: "Used to coat steel cans to prevent corrosion (tin cans)." },
        { atomicNumber: 51, symbol: "Sb", name: "Antimony", atomicMass: 121.76, category: "metalloid", state: "solid", discoveryYear: "Ancient", funFact: "Used in flame retardants, ceramics, and some semiconductors." },
        { atomicNumber: 52, symbol: "Te", name: "Tellurium", atomicMass: 127.60, category: "metalloid", state: "solid", discoveryYear: "1782", funFact: "Can be found in trace amounts in the human body." },
        { atomicNumber: 53, symbol: "I", name: "Iodine", atomicMass: 126.90, category: "halogen", state: "solid", discoveryYear: "1811", funFact: "Essential for thyroid function; added to table salt." },
        { atomicNumber: 54, symbol: "Xe", name: "Xenon", atomicMass: 131.29, category: "noble-gas", state: "gas", discoveryYear: "1898", funFact: "Used in high-intensity discharge lamps and some spacecraft propulsion systems." },
        { atomicNumber: 55, symbol: "Cs", name: "Cesium", atomicMass: 132.91, category: "alkali-metal", state: "solid", discoveryYear: "1860", funFact: "The most reactive metal; used in atomic clocks due to its precise vibrations." },
        { atomicNumber: 56, symbol: "Ba", name: "Barium", atomicMass: 137.33, category: "alkaline-earth-metal", state: "solid", discoveryYear: "1808", funFact: "Used in medical imaging for X-rays of the digestive system." },
        // Lanthanide Series - These will be in the separate block below
        { atomicNumber: 57, symbol: "La", name: "Lanthanum", atomicMass: 138.91, category: "lanthanide", state: "solid", discoveryYear: "1839", funFact: "Used in camera lenses and lighter flints." },
        { atomicNumber: 58, symbol: "Ce", name: "Cerium", atomicMass: 140.12, category: "lanthanide", state: "solid", discoveryYear: "1803", funFact: "Used in catalytic converters and self-cleaning ovens." },
        { atomicNumber: 59, symbol: "Pr", name: "Praseodymium", atomicMass: 140.91, category: "lanthanide", state: "solid", discoveryYear: "1885", funFact: "Used in special glasses that filter out yellow light." },
        { atomicNumber: 60, symbol: "Nd", name: "Neodymium", atomicMass: 144.24, category: "lanthanide", state: "solid", discoveryYear: "1885", funFact: "Used in powerful magnets for headphones and wind turbines." },
        { atomicNumber: 61, symbol: "Pm", name: "Promethium", atomicMass: 145, category: "lanthanide", state: "solid", discoveryYear: "1945", funFact: "Only radioactive lanthanide, used in atomic batteries." },
        { atomicNumber: 62, symbol: "Sm", name: "Samarium", atomicMass: 150.36, category: "lanthanide", state: "solid", discoveryYear: "1879", funFact: "Used in Samarium-Cobalt magnets, which resist demagnetization." },
        { atomicNumber: 63, symbol: "Eu", name: "Europium", atomicMass: 151.96, category: "lanthanide", state: "solid", discoveryYear: "1901", funFact: "Used in red and blue phosphors in TV screens and fluorescent lamps." },
        { atomicNumber: 64, symbol: "Gd", name: "Gadolinium", atomicMass: 157.25, category: "lanthanide", state: "solid", discoveryYear: "1886", funFact: "Used in MRI contrast agents and neutron absorption in nuclear reactors." },
        { atomicNumber: 65, symbol: "Tb", name: "Terbium", atomicMass: 158.93, category: "lanthanide", state: "solid", discoveryYear: "1843", funFact: "Used in green phosphors for color TVs and fluorescent lamps." },
        { atomicNumber: 66, symbol: "Dy", name: "Dysprosium", atomicMass: 162.50, category: "lanthanide", state: "solid", discoveryYear: "1886", funFact: "Used in magnets for electric vehicle motors and wind turbines." },
        { atomicNumber: 67, symbol: "Ho", name: "Holmium", atomicMass: 164.93, category: "lanthanide", state: "solid", discoveryYear: "1878", funFact: "Has the highest magnetic strength of any element." },
        { atomicNumber: 68, symbol: "Er", name: "Erbium", atomicMass: 167.26, category: "lanthanide", state: "solid", discoveryYear: "1843", funFact: "Used in fiber optic communication systems." },
        { atomicNumber: 69, symbol: "Tm", name: "Thulium", atomicMass: 168.93, category: "lanthanide", state: "solid", discoveryYear: "1879", funFact: "Used in some laser applications." },
        { atomicNumber: 70, symbol: "Yb", name: "Ytterbium", atomicMass: 173.04, category: "lanthanide", state: "solid", discoveryYear: "1878", funFact: "Used in some specialized stainless steels and stress gauges." },
        { atomicNumber: 71, symbol: "Lu", name: "Lutetium", atomicMass: 174.97, category: "lanthanide", state: "solid", discoveryYear: "1907", funFact: "Used in some medical imaging detectors." },

        { atomicNumber: 72, symbol: "Hf", name: "Hafnium", atomicMass: 178.49, category: "transition-metal", state: "solid", discoveryYear: "1923", funFact: "Used in control rods for nuclear reactors due to its high neutron absorption." },
        { atomicNumber: 73, symbol: "Ta", name: "Tantalum", atomicMass: 180.95, category: "transition-metal", state: "solid", discoveryYear: "1802", funFact: "Highly corrosion-resistant, used in surgical implants and capacitors." },
        { atomicNumber: 74, symbol: "W", name: "Tungsten", atomicMass: 183.84, category: "transition-metal", state: "solid", discoveryYear: "1783", funFact: "Has the highest melting point of all metals, used in light bulb filaments." },
        { atomicNumber: 75, "symbol": "Re", "name": "Rhenium", "atomicMass": 186.207, "category": "transition-metal", "state": "solid", "discoveryYear": "1925", "funFact": "One of the rarest elements, used in high-temperature superalloys for jet engines." },
        { atomicNumber: 76, "symbol": "Os", "name": "Osmium", "atomicMass": 190.23, "category": "transition-metal", "state": "solid", "discoveryYear": "1803", "funFact": "The densest naturally occurring element." },
        { atomicNumber: 77, "symbol": "Ir", "name": "Iridium", "atomicMass": 192.217, "category": "transition-metal", "state": "solid", "discoveryYear": "1803", "funFact": "The most corrosion-resistant metal, found in meteorites." },
        { atomicNumber: 78, "symbol": "Pt", "name": "Platinum", "atomicMass": 195.084, "category": "transition-metal", "state": "solid", "discoveryYear": "1735", "funFact": "A precious metal used in jewelry, catalytic converters, and laboratory equipment." },
        { atomicNumber: 79, "symbol": "Au", "name": "Gold", "atomicMass": 196.967, "category": "transition-metal", "state": "solid", "discoveryYear": "Ancient", "funFact": "Highly malleable and ductile, does not corrode, used in jewelry and electronics." },
        { atomicNumber: 80, "symbol": "Hg", "name": "Mercury", "atomicMass": 200.59, "category": "post-transition-metal", "state": "liquid", "discoveryYear": "Ancient", "funFact": "The only metal that is liquid at room temperature." },
        { atomicNumber: 81, "symbol": "Tl", "name": "Thallium", "atomicMass": 204.38, "category": "post-transition-metal", "state": "solid", "discoveryYear": "1861", "funFact": "Highly toxic, historically used as a rat poison." },
        { atomicNumber: 82, "symbol": "Pb", "name": "Lead", "atomicMass": 207.2, "category": "post-transition-metal", "state": "solid", "discoveryYear": "Ancient", "funFact": "Used in car batteries and radiation shielding, but its use is declining due to toxicity." },
        { atomicNumber: 83, "symbol": "Bi", "name": "Bismuth", "atomicMass": 208.98, "category": "post-transition-metal", "state": "solid", "discoveryYear": "1753", "funFact": "Has a low melting point and is used in cosmetics and some pharmaceuticals." },
        { atomicNumber: 84, "symbol": "Po", "name": "Polonium", atomicMass: 209, category: "metalloid", state: "solid", discoveryYear: "1898", funFact: "Highly radioactive, discovered by Marie Curie." },
        { atomicNumber: 85, "symbol": "At", "name": "Astatine", atomicMass: 210, category: "halogen", state: "solid", discoveryYear: "1940", funFact: "The rarest naturally occurring element on Earth." },
        { atomicNumber: 86, "symbol": "Rn", "name": "Radon", atomicMass: 222, category: "noble-gas", state: "gas", discoveryYear: "1900", funFact: "A radioactive gas that can accumulate in homes, posing a health risk." },
        { atomicNumber: 87, "symbol": "Fr", "name": "Francium", atomicMass: 223, category: "alkali-metal", state: "solid", discoveryYear: "1939", funFact: "The second-rarest naturally occurring element, extremely radioactive." },
        { atomicNumber: 88, "symbol": "Ra", "name": "Radium", atomicMass: 226, category: "alkaline-earth-metal", state: "solid", discoveryYear: "1898", funFact: "Discovered by Marie Curie, used in luminous paints (now mostly phased out)." },
        // Actinide Series - These will be in the separate block below
        { atomicNumber: 89, symbol: "Ac", name: "Actinium", atomicMass: 227, category: "actinide", state: "solid", discoveryYear: "1899", funFact: "Highly radioactive, glows in the dark due to its radioactivity." },
        { atomicNumber: 90, symbol: "Th", name: "Thorium", atomicMass: 232.038, category: "actinide", state: "solid", discoveryYear: "1828", funFact: "Potentially a future nuclear fuel source." },
        { atomicNumber: 91, symbol: "Pa", name: "Protactinium", atomicMass: 231.036, category: "actinide", state: "solid", discoveryYear: "1913", funFact: "Highly toxic and radioactive, very difficult to handle." },
        { atomicNumber: 92, symbol: "U", name: "Uranium", atomicMass: 238.029, category: "actinide", state: "solid", discoveryYear: "1789", funFact: "The primary fuel for nuclear power plants and nuclear weapons." },
        { atomicNumber: 93, symbol: "Np", name: "Neptunium", atomicMass: 237, category: "actinide", state: "solid", discoveryYear: "1940", funFact: "The first transuranic element discovered (heavier than uranium)." },
        { atomicNumber: 94, symbol: "Pu", name: "Plutonium", atomicMass: 244, category: "actinide", state: "solid", discoveryYear: "1940", funFact: "Used in nuclear weapons and some nuclear power sources." },
        { atomicNumber: 95, symbol: "Am", name: "Americium", atomicMass: 243, category: "actinide", state: "solid", discoveryYear: "1944", funFact: "Found in smoke detectors." },
        { atomicNumber: 96, symbol: "Cm", name: "Curium", atomicMass: 247, category: "actinide", state: "solid", discoveryYear: "1944", funFact: "Named after Marie and Pierre Curie." },
        { atomicNumber: 97, symbol: "Bk", name: "Berkelium", atomicMass: 247, category: "actinide", state: "solid", discoveryYear: "1949", funFact: "Named after Berkeley, California, where it was first synthesized." },
        { atomicNumber: 98, symbol: "Cf", name: "Californium", atomicMass: 251, category: "actinide", state: "solid", discoveryYear: "1950", funFact: "Used in metal detectors and to start nuclear reactors." },
        { atomicNumber: 99, symbol: "Es", name: "Einsteinium", atomicMass: 252, category: "actinide", state: "solid", discoveryYear: "1952", funFact: "Named after Albert Einstein." },
        { atomicNumber: 100, symbol: "Fm", name: "Fermium", atomicMass: 257, category: "actinide", state: "solid", discoveryYear: "1952", funFact: "Named after Enrico Fermi, a pioneer of nuclear energy." },
        { atomicNumber: 101, symbol: "Md", name: "Mendelevium", atomicMass: 258, category: "actinide", state: "solid", discoveryYear: "1955", funFact: "Named after Dmitri Mendeleev, creator of the periodic table." },
        { atomicNumber: 102, symbol: "No", name: "Nobelium", atomicMass: 259, category: "actinide", state: "solid", discoveryYear: "1966", funFact: "Named after Alfred Nobel, founder of the Nobel Prizes." },
        { atomicNumber: 103, symbol: "Lr", name: "Lawrencium", atomicMass: 262, category: "actinide", state: "solid", discoveryYear: "1961", funFact: "Named after Ernest Lawrence, inventor of the cyclotron." },

        { atomicNumber: 104, symbol: "Rf", name: "Rutherfordium", atomicMass: 267, category: "transition-metal", state: "solid", discoveryYear: "1964", funFact: "Named after Ernest Rutherford, father of nuclear physics." },
        { atomicNumber: 105, symbol: "Db", name: "Dubnium", atomicMass: 268, category: "transition-metal", state: "solid", discoveryYear: "1968", funFact: "Named after Dubna, Russia, where it was first synthesized." },
        { atomicNumber: 106, symbol: "Sg", name: "Seaborgium", atomicMass: 271, category: "transition-metal", state: "solid", discoveryYear: "1974", funFact: "Named after Nobel laureate Glenn T. Seaborg." },
        { atomicNumber: 107, symbol: "Bh", name: "Bohrium", atomicMass: 272, category: "transition-metal", state: "solid", discoveryYear: "1976", funFact: "Named after Niels Bohr, a pioneer of quantum mechanics." },
        { atomicNumber: 108, symbol: "Hs", name: "Hassium", atomicMass: 277, category: "transition-metal", state: "solid", discoveryYear: "1984", funFact: "Named after the German state of Hesse." },
        { atomicNumber: 109, symbol: "Mt", name: "Meitnerium", atomicMass: 276, category: "transition-metal", state: "unknown", discoveryYear: "1982", funFact: "Named after Lise Meitner, physicist." },
        { atomicNumber: 110, symbol: "Ds", name: "Darmstadtium", atomicMass: 281, category: "transition-metal", state: "unknown", discoveryYear: "1994", funFact: "Named after Darmstadt, Germany." },
        { atomicNumber: 111, symbol: "Rg", name: "Roentgenium", atomicMass: 282, category: "transition-metal", state: "unknown", discoveryYear: "1994", funFact: "Named after Wilhelm Conrad Röntgen, discoverer of X-rays." },
        { atomicNumber: 112, symbol: "Cn", name: "Copernicium", atomicMass: 285, category: "transition-metal", state: "unknown", discoveryYear: "1996", funFact: "Named after astronomer Nicolaus Copernicus." },
        { atomicNumber: 113, symbol: "Nh", name: "Nihonium", atomicMass: 286, category: "post-transition-metal", state: "unknown", discoveryYear: "2003", funFact: "Named after Japan (Nihon)." },
        { atomicNumber: 114, symbol: "Fl", name: "Flerovium", atomicMass: 289, category: "post-transition-metal", state: "unknown", discoveryYear: "1999", funFact: "Named after the Flerov Laboratory of Nuclear Reactions." },
        { atomicNumber: 115, symbol: "Mc", name: "Moscovium", atomicMass: 290, category: "post-transition-metal", state: "unknown", discoveryYear: "2003", funFact: "Named after Moscow Oblast, Russia." },
        { atomicNumber: 116, symbol: "Lv", name: "Livermorium", atomicMass: 293, category: "post-transition-metal", state: "unknown", discoveryYear: "2000", funFact: "Named after Lawrence Livermore National Laboratory." },
        { atomicNumber: 117, symbol: "Ts", name: "Tennessine", atomicMass: 294, category: "halogen", state: "unknown", discoveryYear: "2010", funFact: "Named after Tennessee, USA." },
        { atomicNumber: 118, symbol: "Og", name: "Oganesson", atomicMass: 294, category: "noble-gas", state: "unknown", discoveryYear: "2006", funFact: "Named after nuclear physicist Yuri Oganessian." }
    ];

    const generateElementCard = (element) => {
        const card = document.createElement('div');
        card.classList.add('element-card');
        card.classList.add(`category-${element.category.replace(/\s+/g, '-')}`); // For CSS coloring
        card.setAttribute('data-atomic-number', element.atomicNumber); // Use atomic number for positioning
        card.setAttribute('data-category', element.category);
        card.setAttribute('data-state', element.state);

        card.innerHTML = `
            <div class="atomic-number">${element.atomicNumber}</div>
            <div class="symbol">${element.symbol}</div>
            <div class="name">${element.name}</div>
        `;

        card.addEventListener('click', () => {
            showModal(element);
        });
        return card;
    };

    const showModal = (element) => {
        modalElementName.textContent = element.name;
        modalElementSymbol.textContent = element.symbol;
        modalElementAtomicNumber.textContent = element.atomicNumber;
        modalElementAtomicMass.textContent = element.atomicMass + " amu";
        // Format category name for display
        modalElementCategory.textContent = element.category.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        modalElementState.textContent = element.state.charAt(0).toUpperCase() + element.state.slice(1);
        modalElementDiscoveryYear.textContent = element.discoveryYear;
        modalElementFunFact.textContent = element.funFact;
        modal.style.display = 'flex'; // Use flex to center
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Function to generate and display the color index
    const generateColorIndex = () => {
        colorIndexDiv.innerHTML = ''; // Clear existing content
        const categories = [...new Set(elements.map(e => e.category))]; // Get unique categories

        // Define display names for categories for better readability
        const categoryDisplayNames = {
            "alkali-metal": "Alkali Metals",
            "alkaline-earth-metal": "Alkaline Earth Metals",
            "transition-metal": "Transition Metals",
            "post-transition-metal": "Post-Transition Metals",
            "metalloid": "Metalloids",
            "nonmetal": "Nonmetals",
            "halogen": "Halogens",
            "noble-gas": "Noble Gases",
            "lanthanide": "Lanthanides",
            "actinide": "Actinides",
            "unknown": "Unknown" // Fallback for any 'unknown' category
        };

        categories.sort((a, b) => categoryDisplayNames[a].localeCompare(categoryDisplayNames[b])); // Sort alphabetically by display name

        categories.forEach(category => {
            const item = document.createElement('div');
            item.classList.add('color-index-item');

            const swatch = document.createElement('div');
            swatch.classList.add('color-swatch');
            swatch.classList.add(`swatch-${category.replace(/\s+/g, '-')}`); // Add class for CSS color

            const text = document.createElement('span');
            text.textContent = categoryDisplayNames[category] || category.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            item.appendChild(swatch);
            item.appendChild(text);
            colorIndexDiv.appendChild(item);
        });
    };


    const applyFilters = () => {
        const selectedCategory = categoryFilter.value;
        const selectedState = stateFilter.value;

        periodicTableGrid.innerHTML = ''; // Clear existing elements

        // Filter elements based on selection
        const filteredElements = elements.filter(element => {
            const matchesCategory = selectedCategory === 'all' || element.category === selectedCategory;
            const matchesState = selectedState === 'all' || element.state === selectedState;
            return matchesCategory && matchesState;
        });

        // Add main block elements to the grid first
        filteredElements.filter(element => {
            return !(element.category === 'lanthanide' || element.category === 'actinide');
        }).forEach(element => {
            periodicTableGrid.appendChild(generateElementCard(element));
        });

        // Add Lanthanide and Actinide TEXT LABELS directly to the main grid
        // These will occupy the placeholder positions as defined by their CSS grid-row/column
        const lanthanideLabel = document.createElement('div');
        lanthanideLabel.classList.add('lanthanide-label');
        lanthanideLabel.textContent = '57-71'; // More precise label
        periodicTableGrid.appendChild(lanthanideLabel);

        const actinideLabel = document.createElement('div');
        actinideLabel.classList.add('actinide-label');
        actinideLabel.textContent = '89-103'; // More precise label
        periodicTableGrid.appendChild(actinideLabel);

        // Create and append the separate lanthanides/actinides block below the main table
        const lanthanidesActinidesBlock = document.createElement('div');
        lanthanidesActinidesBlock.classList.add('lanthanides-actinides');
        lanthanidesActinidesBlock.id = 'lanthanides-actinides-block';

        filteredElements.filter(element => {
            const category = element.category;
            return (category === 'lanthanide' || category === 'actinide');
        }).forEach(element => {
            lanthanidesActinidesBlock.appendChild(generateElementCard(element));
        });

        // Only append the f-block container if it actually contains elements
        // OR if the 'all' category is selected (to maintain structure)
        if (lanthanidesActinidesBlock.childElementCount > 0 || selectedCategory === 'all') {
            periodicTableGrid.appendChild(lanthanidesActinidesBlock);
        }
    };
    
    // Initial render calls
    generateColorIndex(); // Generate color index on load
    applyFilters(); // Apply filters and render periodic table on load

    // Add event listeners for filters
    categoryFilter.addEventListener('change', applyFilters);
    stateFilter.addEventListener('change', applyFilters);
});
