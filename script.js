// 1. Countdown Logic
const target = new Date("Feb 28, 2026 23:59:59").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const gap = target - now;

    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((gap % (1000 * 60)) / 1000);

    const timerEl = document.getElementById("countdown");
    if (timerEl) {
        timerEl.innerHTML = `
            <div class="countdown-block"><span class="countdown-number">${d}</span><span class="countdown-label">Days</span></div>
            <div class="countdown-block"><span class="countdown-number">${h}</span><span class="countdown-label">Hrs</span></div>
            <div class="countdown-block"><span class="countdown-number">${m}</span><span class="countdown-label">Min</span></div>
            <div class="countdown-block"><span class="countdown-number">${s}</span><span class="countdown-label">Sec</span></div>
        `;
    }
}
setInterval(updateTimer, 1000);
updateTimer();

// 2. Slider Logic
let slideIdx = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slideIdx = n;
    slides[slideIdx].classList.add('active');
    dots[slideIdx].classList.add('active');
}

function nextSlide() {
    slideIdx = (slideIdx + 1) % slides.length;
    showSlide(slideIdx);
}

function currentSlide(n) {
    showSlide(n);
}
setInterval(nextSlide, 6000);

// 3. Product Gallery Logic
let compareList = JSON.parse(sessionStorage.getItem('compareList')) || [];

function renderGallery() {
    const container = document.getElementById('product-list');
    if (!container) return;

    container.innerHTML = products.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p style="color:var(--lg-red); font-weight:700;">RM${p.subPrice}/mth</p>
            <div style="margin-top:15px; display:flex; justify-content:space-between; align-items:center;">
                <a href="product.html?id=${p.id}" class="btn-main" style="padding:8px 15px; font-size:12px;">Details</a>
                <label style="font-size:12px;"><input type="checkbox" onchange="toggleCompare('${p.id}')" ${compareList.includes(p.id) ? 'checked' : ''}> Compare</label>
            </div>
        </div>
    `).join('');
    updateTray();
}

function toggleCompare(id) {
    if (compareList.includes(id)) {
        compareList = compareList.filter(i => i !== id);
    } else {
        if (compareList.length < 3) compareList.push(id);
        else alert("Select up to 3 items.");
    }
    sessionStorage.setItem('compareList', JSON.stringify(compareList));
    updateTray();
}

function updateTray() {
    const tray = document.getElementById('tray');
    if (!tray) return;
    tray.style.display = compareList.length > 0 ? 'flex' : 'none';
    document.getElementById('tray-count').innerText = `${compareList.length} Selected`;
}

renderGallery();
