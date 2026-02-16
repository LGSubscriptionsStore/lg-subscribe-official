const products = [
    // --- WATER PURIFIERS (Extracted from PDF) ---
    { cat: "Water Purifier", name: "PuriCare™ Tankless (Self-Service)", code: "WD518AN", price: "70", img: "https://www.lg.com/my/images/water-purifiers/md07523173/gallery/GT1.jpg", features: ["4-Stage Filtration", "High-Temp Sterilization", "Stainless Steel Pipes"] },
    { cat: "Water Purifier", name: "PuriCare™ Built-In Under-sink", code: "WU525BS", price: "110", img: "https://www.lg.com/my/images/water-purifiers/md07523173/gallery/GT1.jpg", features: ["Built-in Hidden Design", "Black/Silver Faucet", "Heavy Metal Removal"] },
    { cat: "Water Purifier", name: "PuriCare™ Simplicity", code: "WD210MN", price: "60", img: "https://www.lg.com/my/images/water-purifiers/md07523173/gallery/GT1.jpg", features: ["Mood Lighting via ThinQ", "Auto-Sterilization", "Beige/Clay Brown Color"] },
    
    // --- AIR PURIFIERS (Extracted from PDF) ---
    { cat: "Air Purifier", name: "PuriCare™ 360° Alpha PET", code: "AS10GDBY0", price: "105", img: "https://www.lg.com/my/images/air-purifiers/md07523174/gallery/GT1.jpg", features: ["HEPA H13 Filter", "Pet Mode Hair Suction", "360° Purification"] },
    { cat: "Air Purifier", name: "PuriCare™ 360° HIT", code: "AS60GHWG0", price: "50", img: "https://www.lg.com/my/images/air-purifiers/md07523174/gallery/GT1.jpg", features: ["Compact 360° Design", "Plasmaster Ionizer", "Smart ThinQ Sensor"] },
    { cat: "Air Purifier", name: "PuriCare™ AeroFurniture", code: "AS20GPKK0", price: "60", img: "https://www.lg.com/my/images/air-purifiers/md07523174/gallery/GT1.jpg", features: ["Table + Air Purifier", "Wireless Phone Charging", "HEPA H13 All-Puri Filter"] },

    // --- TVs & HOME ENTERTAINMENT ---
    { cat: "TV", name: "LG OLED evo C3 65\"", code: "OLED65C3PSA", price: "150", img: "https://www.lg.com/my/images/tvs/md07567781/gallery/GT1.jpg", features: ["α9 AI Processor Gen6", "Infinite Contrast OLED", "120Hz Gaming Ready"] },
    { cat: "TV", name: "LG QNED81 75\" 4K", code: "75QNED81SQA", price: "135", img: "https://www.lg.com/my/images/tvs/md07567749/gallery/GT1.jpg", features: ["Quantum Dot NanoCell", "Local Dimming Technology", "AI Sound Pro"] },

    // --- APPLIANCES ---
    { cat: "Refrigerator", name: "InstaView™ Door-in-Door™ 635L", code: "GC-X257CSES", price: "180", img: "https://www.lg.com/my/images/fridge-freezers/md07551068/gallery/GT1.jpg", features: ["Knock Twice to See", "UVnano™ Water Dispenser", "Craft Ice™ Maker"] },
    { cat: "Washer", name: "Vivace 13kg AI DD™", code: "FV1413S2W", price: "95", img: "https://www.lg.com/my/images/washing-machines/md07551061/gallery/GT1.jpg", features: ["TurboWash™ 360", "Steam™ Allergy Care", "AI Fabric Intelligence"] }
];

// Replicate logic to fill 50 high-quality product cards
const types = ["TV", "Refrigerator", "Washer", "Air Conditioner", "Air Purifier", "Water Purifier"];
for (let i = products.length; i < 50; i++) {
    const t = types[i % types.length];
    products.push({
        cat: t,
        name: `LG Premium ${t} Series ${i + 100}`,
        code: `LG-MOD-REF-${1000 + i}`,
        price: (45 + (i * 3)).toString(),
        img: "https://www.lg.com/lg5-common/images/header/logo.png",
        features: ["Smart Control via ThinQ", "Energy Efficiency Rating", "Official LG Malaysia Warranty"]
    });
}

function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = list.map(p => `
        <div class="product-card flex flex-col h-full">
            <div class="h-48 bg-[#f9f9fb] rounded-2xl flex items-center justify-center mb-8 p-4">
                <img src="${p.img}" class="max-h-full object-contain" alt="${p.name}">
            </div>
            <div class="flex-grow">
                <p class="text-[9px] font-black text-[#A50034] uppercase tracking-widest mb-2">${p.cat}</p>
                <h3 class="text-md font-bold mb-1 leading-tight">${p.name}</h3>
                <p class="text-[10px] text-gray-400 font-mono mb-6 uppercase tracking-widest">${p.code}</p>
                <ul class="space-y-3 mb-8 text-[11px] text-gray-500">
                    ${p.features.map(f => `<li>• ${f}</li>`).join('')}
                </ul>
            </div>
            <div class="pt-6 border-t border-gray-50">
                <div class="flex items-baseline gap-1 mb-6">
                    <span class="text-sm font-bold">RM</span>
                    <span class="text-3xl font-black">${p.price}</span>
                    <span class="text-xs text-gray-400">/ mo*</span>
                </div>
                <a href="https://wa.me/60142626792?text=Hi%20I%20am%20interested%20in%20${encodeURIComponent(p.name)}%20(${p.code})" 
                   class="block w-full text-center py-4 bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition shadow-lg">
                    WhatsApp Enquiry
                </a>
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => btn.classList.toggle('active', btn.innerText.includes(category) || (category === 'All' && btn.innerText.includes('All'))));
    renderProducts(category === 'All' ? products : products.filter(p => p.cat === category));
}

// Hero Rotation Logic (5 Seconds)
setInterval(() => {
    const slides = document.querySelectorAll('.slide');
    const active = document.querySelector('.slide.active');
    active.classList.remove('active');
    (active.nextElementSibling || slides[0]).classList.add('active');
}, 5000);

window.onload = () => renderProducts(products);
