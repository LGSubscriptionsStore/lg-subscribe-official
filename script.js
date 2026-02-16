let compareList = JSON.parse(sessionStorage.getItem('compareList')) || [];

// 1. Initial Render
function init() {
    const gallery = document.getElementById('product-list');
    if (gallery) renderGallery(products);
    
    const detailView = document.getElementById('product-detail-root');
    if (detailView) renderProductDetail();
    
    const compareTable = document.getElementById('comparisonTable');
    if (compareTable) renderComparePage();

    updateTrayUI();
}

// 2. Gallery Renderer
function renderGallery(items) {
    const container = document.getElementById('product-list');
    container.innerHTML = items.map(p => `
        <div class="card">
            ${p.isNew ? '<div class="badge-new">NEW</div>' : ''}
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">RM${p.subPrice}<span>/mth</span></p>
            <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:center;">
                <a href="product.html?id=${p.id}" style="color:var(--lg-red); text-decoration:none; font-weight:600;">Details →</a>
                <label style="font-size:12px;"><input type="checkbox" onchange="handleCompare('${p.id}')" ${compareList.includes(p.id) ? 'checked' : ''}> Compare</label>
            </div>
        </div>
    `).join('');
}

// 3. Filtering Logic
function filterUI() {
    const q = document.getElementById('search').value.toLowerCase();
    const cat = document.getElementById('cat').value;
    const isNew = document.getElementById('newCheck').checked;

    const filtered = products.filter(p => {
        return (p.name.toLowerCase().includes(q) || p.model.toLowerCase().includes(q)) &&
               (cat === 'all' || p.category === cat) &&
               (!isNew || p.isNew);
    });
    renderGallery(filtered);
}

// 4. Comparison Logic
function handleCompare(id) {
    if (compareList.includes(id)) {
        compareList = compareList.filter(i => i !== id);
    } else {
        if (compareList.length < 3) compareList.push(id);
        else { alert("Max 3 items"); return; }
    }
    sessionStorage.setItem('compareList', JSON.stringify(compareList));
    updateTrayUI();
}

function updateTrayUI() {
    const tray = document.getElementById('compare-tray');
    if (!tray) return;
    tray.style.display = compareList.length > 0 ? 'flex' : 'none';
    document.getElementById('comp-count').innerText = `${compareList.length} Selected`;
}

// 5. Comparison Page Renderer
function renderComparePage() {
    const table = document.getElementById('comparisonTable');
    const items = products.filter(p => compareList.includes(p.id));
    
    if(items.length === 0) return;

    table.innerHTML = `
        <tr><th>Product</th>${items.map(i => `<td><img src="${i.img}" style="height:100px;"><br><b>${i.name}</b></td>`).join('')}</tr>
        <tr><th>Price</th>${items.map(i => `<td class="price">RM${i.subPrice}/mth</td>`).join('')}</tr>
        <tr><th>Features</th>${items.map(i => `<td><ul style="list-style:none; font-size:12px;">${i.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul></td>`).join('')}</tr>
        <tr><th>Action</th>${items.map(i => `<td><a href="https://wa.me/${CONTACT_WA}?text=Order ${i.model}" class="btn-primary" style="padding:10px;">Order</a></td>`).join('')}</tr>
    `;
}

// 6. Detail Page Renderer
function renderProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const item = products.find(p => p.id === params.get('id'));
    if(!item) return;
    
    document.getElementById('product-detail-root').innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:60px; padding: 100px 0;">
            <img src="${item.img}" style="width:100%;">
            <div>
                <span style="color:var(--lg-red); font-weight:700;">${item.category.toUpperCase()}</span>
                <h1 style="font-size:48px; margin-bottom:20px;">${item.name}</h1>
                <p style="color:#888; margin-bottom:30px;">Model: ${item.model}</p>
                <div class="price" style="font-size:40px;">RM${item.subPrice}<small style="font-size:16px; color:#333;">/mth</small></div>
                <div style="margin:40px 0;">
                    <h3>Key Features:</h3>
                    <ul style="margin-top:20px; line-height:2;">${item.features.map(f => `<li>${f}</li>`).join('')}</ul>
                </div>
                <a href="https://wa.me/${CONTACT_WA}?text=Inquiry for ${item.model}" class="btn-primary">Inquiry via WhatsApp</a>
            </div>
        </div>
    `;
}

init();
