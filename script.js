// 1. Ohsem Timer
const deadline = new Date("Feb 28, 2026 23:59:59").getTime();
function runTimer() {
    const now = new Date().getTime();
    const t = deadline - now;
    if (t < 0) return;
    const d = Math.floor(t / 86400000), h = Math.floor((t % 86400000) / 3600000), m = Math.floor((t % 3600000) / 60000), s = Math.floor((t % 60000) / 1000);
    document.getElementById("countdown").innerText = `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(runTimer, 1000);

// 2. Slider
let idx = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
function setSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    idx = n;
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
}
setInterval(() => { idx = (idx + 1) % slides.length; setSlide(idx); }, 6000);

// 3. WhatsApp Catalog
function init() {
    const grid = document.getElementById('product-list');
    if (!grid) return;
    grid.innerHTML = products.map(p => {
        const isRaya = p.id.includes('raya');
        const msg = encodeURIComponent(`Hi! I'm interested in the ${isRaya ? 'Raya Promo' : 'Ohsem Promo'} for LG ${p.name} (RM${p.subPrice}/mth).`);
        return `
            <div class="card">
                ${isRaya ? '<div style="position:absolute; top:10px; right:10px; background:#2e7d32; color:#fff; padding:5px 10px; font-size:10px; font-weight:700; border-radius:4px;">RAYA DEAL</div>' : ''}
                <img src="${p.img}">
                <h3 style="margin:10px 0;">${p.name}</h3>
                <p style="color:var(--lg-red); font-weight:800; font-size:1.4rem;">RM${p.subPrice}/mth</p>
                <div style="margin-top:20px;">
                    <a href="product.html?id=${p.id}" class="btn-main" style="width:100%; text-align:center; padding:10px;">Details</a>
                    <a href="https://wa.me/60142626792?text=${msg}" class="btn-wa"><i class="fab fa-whatsapp"></i> WhatsApp Inquiry</a>
                </div>
            </div>`;
    }).join('');
}
window.onload = init;
