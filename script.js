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
    const root = document.getElementById('detail-root');
    if (!root) return; // Exit if we aren't on the product page

    // 1. Parse the URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    // 2. Error Check: No ID in URL
    if (!productId) {
        root.innerHTML = `<div class="container" style="padding:100px 0; text-align:center;">
            <h2>Product Not Specified</h2>
            <p>Please select a product from our gallery.</p>
            <a href="products.html" class="btn" style="margin-top:20px;">Back to Products</a>
        </div>`;
        return;
    }

    // 3. Find Product (Case-Insensitive for robustness)
    const p = products.find(x => x.id.toLowerCase() === productId.toLowerCase());

    // 4. Error Check: ID exists but isn't in data.js (Typo check)
    if (!p) {
        root.innerHTML = `<div class="container" style="padding:100px 0; text-align:center;">
            <h2>Model "${productId}" Not Found</h2>
            <p>This product may be discontinued or the link is incorrect.</p>
            <a href="products.html" class="btn" style="margin-top:20px;">View Current Catalog</a>
        </div>`;
        return;
    }

    // 5. Success: Render Content
    root.innerHTML = `
        <div class="join-grid">
            <div class="product-image-container">
                <img src="${p.img}" alt="${p.name}" style="width:100%; max-height:500px; object-fit:contain;">
            </div>
            <div class="product-info">
                <span style="color:var(--lg-red); font-weight:700; text-transform:uppercase;">${p.category}</span>
                <h1 style="font-size:42px; margin:10px 0;">${p.name}</h1>
                <p style="color:#888; margin-bottom:20px;">Model: ${p.model}</p>
                <div class="price" style="font-size:48px; margin-bottom:30px;">RM${p.subPrice}<small style="font-size:16px; color:#333;">/mth</small></div>
                
                <h3 style="margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">Specifications</h3>
                <ul style="margin:20px 0; padding-left:20px; line-height:2;">
                    ${p.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                
                <a href="https://wa.me/${CONTACT_WA}?text=I%20am%20interested%20in%20the%20${encodeURIComponent(p.name)}%20(${p.model})" class="btn" style="width:100%; text-align:center;">Apply via WhatsApp</a>
            </div>
        </div>`;
}

init();
