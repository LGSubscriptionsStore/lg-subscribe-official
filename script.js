let compareList = JSON.parse(sessionStorage.getItem('compareList')) || [];

function init() {
    const list = document.getElementById('product-list');
    if (list) renderGallery(products);
    
    const detail = document.getElementById('detail-root');
    if (detail) renderDetail();
    
    updateTray();
}

function renderGallery(items) {
    const container = document.getElementById('product-list');
    container.innerHTML = items.map(p => `
        <div class="card">
            ${p.isNew ? '<div class="badge">NEW</div>' : ''}
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p class="price">RM${p.subPrice}<span>/mth</span></p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
                <a href="product.html?id=${p.id}" style="color:var(--lg-red); font-weight:600; text-decoration:none;">Details →</a>
                <label style="font-size:12px;"><input type="checkbox" onchange="toggleCompare('${p.id}')" ${compareList.includes(p.id) ? 'checked' : ''}> Compare</label>
            </div>
        </div>
    `).join('');
}

function toggleCompare(id) {
    if (compareList.includes(id)) compareList = compareList.filter(i => i !== id);
    else if (compareList.length < 3) compareList.push(id);
    else { alert("Select up to 3 products."); return; }
    
    sessionStorage.setItem('compareList', JSON.stringify(compareList));
    updateTray();
}

function updateTray() {
    const tray = document.getElementById('tray');
    if (!tray) return;
    tray.style.display = compareList.length > 0 ? 'flex' : 'none';
    document.getElementById('tray-count').innerText = `${compareList.length} Selected`;
}

function renderDetail() {
    const id = new URLSearchParams(window.location.search).get('id');
    const p = products.find(x => x.id === id);
    if (!p) return;
    document.getElementById('detail-root').innerHTML = `
        <div class="join-grid">
            <img src="${p.img}" style="width:100%;">
            <div>
                <h1 style="font-size:42px;">${p.name}</h1>
                <p class="price" style="font-size:48px;">RM${p.subPrice}/mth</p>
                <ul style="margin:30px 0;">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
                <a href="https://wa.me/${CONTACT_WA}?text=Order%20${p.model}" class="btn">Apply via WhatsApp</a>
            </div>
        </div>`;
}

init();
