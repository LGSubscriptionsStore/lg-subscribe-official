const products = [
    { 
        cat: "TV", 
        name: "LG OLED evo C3 65\"", 
        code: "OLED65C3PSA", 
        price: "150", 
        img: "https://www.lg.com/my/images/tvs/md07567781/gallery/GT1.jpg",
        features: ["α9 AI Processor Gen6", "Self-Lit OLED Pixels", "Brightness Booster Max"] 
    },
    { 
        cat: "Refrigerator", 
        name: "LG InstaView™ 635L", 
        code: "GC-X257CSES", 
        price: "180", 
        img: "https://www.lg.com/my/images/fridge-freezers/md07551068/gallery/GT1.jpg",
        features: ["Knock Twice to See Inside", "UVnano™ Water Dispenser", "Linear Cooling™"] 
    },
    { 
        cat: "Washer", 
        name: "LG Vivace 13kg AI DD™", 
        code: "FV1413S2W", 
        price: "95", 
        img: "https://www.lg.com/my/images/washing-machines/md07551061/gallery/GT1.jpg",
        features: ["AI DD™ Intelligence", "TurboWash™ 360", "Steam™ Allergy Care"] 
    }
];

// Generate 47 more products to reach 50 
const cats = ["TV", "Refrigerator", "Washer", "Air Conditioner", "Water Purifier", "Air Purifier"];
for (let i = 4; i <= 50; i++) {
    const category = cats[i % cats.length];
    products.push({
        cat: category,
        name: `LG Premium ${category} Model X${i}`,
        code: `LG-SUB-${2000 + i}`,
        price: (40 + (i * 2)).toString(),
        img: "https://www.lg.com/lg5-common/images/header/logo.png",
        features: ["Smart Connectivity", "Energy Saving Mode", "Inclusive Maintenance"]
    });
}

function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = list.map(p => `
        <div class="product-card bg-white p-8 rounded-[32px] border border-gray-100 flex flex-col h-full">
            <div class="h-52 bg-[#f9f9fb] rounded-2xl flex items-center justify-center mb-8 p-4">
                <img src="${p.img}" alt="${p.name}" class="max-h-full object-contain">
            </div>
            <div class="flex-grow">
                <p class="text-[10px] font-black text-[#A50034] uppercase tracking-[0.2em] mb-2">${p.cat}</p>
                <h3 class="text-lg font-bold mb-1 leading-tight">${p.name}</h3>
                <p class="text-[10px] text-gray-400 font-mono mb-6 uppercase tracking-widest">${p.code}</p>
                <ul class="space-y-3 mb-8">
                    ${p.features.map(f => `<li class="text-[12px] text-gray-500 flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-black"></span> ${f}</li>`).join('')}
                </ul>
            </div>
            <div class="pt-6 border-t border-gray-50">
                <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Monthly Plan</p>
                <div class="flex items-baseline gap-1 mb-6">
                    <span class="text-sm font-bold">RM</span>
                    <span class="text-4xl font-black tracking-tighter">${p.price}</span>
                    <span class="text-xs text-gray-400">/ mo*</span>
                </div>
                <a href="https://wa.me/60142626792?text=Hi%20I%20am%20interested%20in%20${encodeURIComponent(p.name)}%20(${p.code})" 
                   class="block w-full text-center py-4 bg-black text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-lg hover:bg-gray-800 transition">
                    Subscribe Now
                </a>
            </div>
        </div>
    `).join('');
}

function filterProducts(type) {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => btn.classList.toggle('active', btn.innerText.includes(type) || (type === 'All' && btn.innerText === 'All Products')));
    renderProducts(type === 'All' ? products : products.filter(p => p.cat === type));
}

window.onload = () => renderProducts(products);
