let compareList = JSON.parse(sessionStorage.getItem('compareList')) || [];

function init() {
    const list = document.getElementById('product-list');
    if (list) renderGallery(products);
    
    const detail = document.getElementById('detail-root');
    if (detail) renderDetail();
    
    const table = document.getElementById('compare-table');
    if (table) renderComparePage();

    updateTrayUI();
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
    if (compareList.includes(id)) {
        compareList = compareList.filter(i => i !== id);
    } else {
        if (compareList.length < 3) compareList.push(id);
        else { alert("Maximum 3 items allowed."); return; }
    }
    sessionStorage.setItem('compareList', JSON.stringify(compareList));
    updateTrayUI();
}

function updateTrayUI() {
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
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:60px; padding:100px 0;">
            <img src="${p.img}" style="width:100%;">
            <div>
                <h1 style="font-size:42px;">${p.name}</h1>
                <p style="color:#888;">Model: ${p.model}</p>
                <div class="price" style="font-size:48px;">RM${p.subPrice}<span>/mth</span></div>
                <ul style="margin:40px 0; padding-left:20px;">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
                <a href="https://wa.me/${CONTACT_WA}?text=Inquiry for ${p.model}" class="btn">Apply via WhatsApp</a>
            </div>
        </div>`;
}

init();
