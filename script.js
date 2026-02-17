let compareList = JSON.parse(sessionStorage.getItem('compareList')) || [];

function init() {
    const galleryContainer = document.getElementById('product-list');
    if (galleryContainer) renderGallery(products);

    const detailContainer = document.getElementById('detail-root');
    if (detailContainer) renderProductDetail();

    updateTrayUI();
}

function renderGallery(items) {
    const container = document.getElementById('product-list');
    container.innerHTML = items.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">RM${p.subPrice}<span>/mth</span></p>
            <div style="margin-top:15px; display:flex; justify-content:space-between;">
                <a href="product.html?id=${p.id}" class="btn" style="padding:5px 10px; font-size:12px;">Details</a>
                <label><input type="checkbox" onchange="handleCompareToggle('${p.id}')" ${compareList.includes(p.id) ? 'checked' : ''}> Compare</label>
            </div>
        </div>
    `).join('');
}

function handleCompareToggle(id) {
    if (compareList.includes(id)) {
        compareList = compareList.filter(item => item !== id);
    } else if (compareList.length < 3) {
        compareList.push(id);
    } else {
        alert("Select up to 3 models.");
        return;
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

init();
