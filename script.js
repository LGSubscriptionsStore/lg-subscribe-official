const products = [
    // TV & Audio
    { cat: "TV", name: "LG OLED evo C3 65 inch 4K Smart TV", code: "OLED65C3PSA", price: "150", img: "https://www.lg.com/my/images/tvs/md07567781/gallery/GT1.jpg", features: ["α9 AI Processor Gen6", "Self-Lit OLED", "120Hz Refresh Rate"] },
    { cat: "TV", name: "LG QNED81 75 inch 4K Smart TV", code: "75QNED81SRA", price: "130", img: "https://www.lg.com/my/images/tvs/md07567749/gallery/GT1.jpg", features: ["Quantum Dot NanoCell", "Local Dimming", "AI Sound Pro"] },
    { cat: "TV", name: "LG UHD 86 inch 4K Smart TV", code: "86UR8050PSB", price: "140", img: "https://www.lg.com/my/images/tvs/md07567735/gallery/GT1.jpg", features: ["α7 AI Processor Gen6", "ThinQ AI", "Game Optimizer"] },
    
    // Kitchen (Refrigerators)
    { cat: "Refrigerator", name: "LG InstaView™ Door-in-Door™ 635L", code: "GC-X257CSES", price: "180", img: "https://www.lg.com/my/images/fridge-freezers/md07551068/gallery/GT1.jpg", features: ["Knock Twice to See Inside", "Linear Cooling™", "Hygiene Fresh+™"] },
    { cat: "Refrigerator", name: "LG Side-by-Side 647L Flat Design", code: "GC-B257SLVL", price: "110", features: ["Linear Compressor", "Multi Air Flow", "Express Freeze"], img: "https://www.lg.com/my/images/fridge-freezers/md07551066/gallery/GT1.jpg" },
    
    // Laundry (Washer & Dryer)
    { cat: "Washer", name: "LG Vivace 13kg AI DD™ Washer", code: "FV1413S2W", price: "95", img: "https://www.lg.com/my/images/washing-machines/md07551061/gallery/GT1.jpg", features: ["AI Direct Drive", "TurboWash™ 360", "Steam™ Technology"] },
    { cat: "Washer", name: "LG 9kg Dual Inverter Heat Pump Dryer", code: "TD-H90VBD", price: "105", img: "https://www.lg.com/my/images/washing-machines/md07523171/gallery/GT1.jpg", features: ["Eco Hybrid™", "Auto Cleaning Condenser", "Allergy Care"] },
    
    // Air Care
    { cat: "Air Solution", name: "LG ARTCOOL™ Mirror 1.5HP Aircon", code: "A13BKC", price: "115", img: "https://www.lg.com/my/images/air-conditioning/md07523172/gallery/GT1.jpg", features: ["Plasmaster™ Ionizer", "Dual Inverter", "Smart ThinQ"] },
    { cat: "Water Purifier", name: "PuriCare™ Tankless (Hot/Cold/Ambient)", code: "WD518AN", price: "60", img: "https://www.lg.com/my/images/water-purifiers/md07523173/gallery/GT1.jpg", features: ["4-Stage Filtration", "Stainless Steel Pipe", "High Temp Sterilization"] },
    { cat: "Air Purifier", name: "PuriCare™ 360° Hit Air Purifier", code: "AS60GHWG0", price: "40", img: "https://www.lg.com/my/images/air-purifiers/md07523174/gallery/GT1.jpg", features: ["H13 HEPA Filter", "PM 1.0 Sensor", "360-degree Purification"] }
];

// Filling the list with more variants to hit 45 items
const subCategories = ["TV", "Refrigerator", "Washer", "Air Solution", "Water Purifier", "Vacuum"];
for (let i = 11; i <= 45; i++) {
    const category = subCategories[i % subCategories.length];
    products.push({
        cat: category,
        name: `LG Premium ${category} Series ${i + 100}`,
        code: `LG-MDL-${3000 + i}`,
        price: (45 + (i * 2)).toString(),
        img: "https://www.lg.com/lg5-common/images/header/logo.png", // Placeholder for others
        features: ["Premium Smart Tech", "Official LG Warranty", "Energy Saving Mode"]
    });
}

function renderProducts(list) {
    const grid = document.getElementById('product-grid');
    const count = document.getElementById('product-count');
    count.innerText = `Showing ${list.length} Products`;

    grid.innerHTML = list.map(p => `
        <div class="product-card reveal flex flex-col">
            <div class="img-box">
                <span class="badge-lg">Rent-Up™</span>
                <img src="${p.img || 'https://www.lg.com/lg5-common/images/header/logo.png'}" alt="${p.name}">
            </div>
            <div class="py-6 flex flex-col flex-grow">
                <p class="text-[10px] text-[#A50034] font-bold mb-1 uppercase tracking-widest">${p.cat}</p>
                <h3 class="font-bold text-sm text-black mb-1 line-clamp-2 cursor-pointer hover:text-[#A50034] transition">${p.name}</h3>
                <p class="text-[9px] text-gray-400 font-mono mb-4 tracking-tighter uppercase">${p.code}</p>
                <ul class="space-y-1 mb-6">
                    ${p.features.map(f => `<li class="text-[11px] text-gray-500 flex items-center"><span class="w-1 h-1 bg-gray-300 mr-2 rounded-full"></span> ${f}</li>`).join('')}
                </ul>
                <div class="price-box">
                    <p class="text-[9px] font-bold text-gray-400 uppercase mb-1">Monthly Plan</p>
                    <div class="flex items-baseline gap-1">
                        <span class="text-xs font-bold text-black">RM</span>
                        <span class="price-main">${p.price}</span>
                        <span class="text-[10px] text-gray-400 font-medium">/ month*</span>
                    </div>
                    <a href="https://wa.me/60142626792?text=Enquiry%20for%20${encodeURIComponent(p.name)}%20(${p.code})" 
                       class="mt-5 block w-full border border-black text-center py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition">
                        Subscribe Now
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function initFilters() {
    const categories = ["All", "TV", "Refrigerator", "Washer", "Air Solution", "Water Purifier", "Air Purifier"];
    const container = document.getElementById('filter-options');
    container.innerHTML = categories.map(c => `
        <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" class="filter-checkbox" onchange="filterByCategory('${c}')" ${c === 'All' ? 'checked' : ''}>
            <span class="text-xs font-medium group-hover:text-[#A50034] transition">${c}</span>
        </label>
    `).join('');
}

function filterByCategory(type) {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    checkboxes.forEach(cb => {
        const label = cb.nextElementSibling.innerText;
        cb.checked = (label === type);
    });

    if (type === 'All') renderProducts(products);
    else renderProducts(products.filter(p => p.cat === type));
    window.scrollTo({ top: 300, behavior: 'smooth' });
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('translate-x-full');
}

function filterAndClose(type) {
    filterByCategory(type);
    toggleMobileMenu();
}

window.onload = () => {
    initFilters();
    renderProducts(products);
};
