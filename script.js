/**
 * LG Rent-Up™ Global Logic Engine
 * Version: 2.0.0 (Hardened)
 */

// 1. State Management: Remembers your comparison choices even after refresh
let compareList = JSON.parse(sessionStorage.getItem('compareList')) || [];

/**
 * 2. Initialization System
 */
function init() {
    // Gallery Check: Targets index.html and products.html
    const galleryContainer = document.getElementById('product-list');
    if (galleryContainer) {
        renderGallery(products);
    }
    
    // Detail Check: Targets product.html
    const detailContainer = document.getElementById('detail-root');
    if (detailContainer) {
        renderProductDetail();
    }
    
    // Always refresh the comparison tray UI
    updateTrayUI();
}

/**
 * 3. Gallery Renderer
 * This replaces your old tables with modern grid cards
 */
function renderGallery(items) {
    const container = document.getElementById('product-list');
    if (!container) return;
    
    if (items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 50px;">No products found.</p>`;
        return;
    }

    container.innerHTML = items.map(p => `
        <div class="card">
            ${p.isNew ? '<div class="badge">NEW</div>' : ''}
            <div class="img-wrapper" style="height: 200px; display: flex; align-items: center; justify-content: center;">
                <img src="${p.img}" alt="${p.name}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
            </div>
            <h3 style="margin: 15px 0 5px;">${p.name}</h3>
            <p style="color: #888; font-size: 12px; margin-bottom: 10px;">Model: ${p.model}</p>
            <p class="price">RM${p.subPrice}<span style="font-size: 14px; font-weight: 400;">/mth</span></p>
            
            <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:center;">
                <a href="product.html?id=${p.id}" class="btn" style="padding: 8px 15px; font-size: 12px;">View Details</a>
                <label style="font-size:12px; cursor:pointer; display: flex; align-items: center; gap: 5px;">
                    <input type="checkbox" onchange="handleCompareToggle('${p.id}')" ${compareList.includes(p.id) ? 'checked' : ''}> 
                    Compare
                </label>
            </div>
        </div>
    `).join('');
}

/**
 * 4. Comparison Logic
 */
function handleCompareToggle(id) {
    if (compareList.includes(id)) {
        compareList = compareList.filter(item => item !== id);
    } else {
        if (compareList.length < 3) {
            compareList.push(id);
        } else {
            alert("You can only compare up to 3 products at a time.");
            renderGallery(products); // Refresh to uncheck the box
            return;
        }
    }
    
    sessionStorage.setItem('compareList', JSON.stringify(compareList));
    updateTrayUI();
}

/**
 * 5. Tray UI Logic
 */
function updateTrayUI() {
    const tray = document.getElementById('tray');
    const countSpan = document.getElementById('tray-count');
    
    if (!tray || !countSpan) return;

    if (compareList.length > 0) {
        tray.style.display = 'flex';
        countSpan.innerText = `${compareList.length} Selected`;
    } else {
        tray.style.display = 'none';
    }
}

/**
 * 6. Product Detail Reader
 */
function renderProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.getElementById('detail-root').innerHTML = `
            <div style="text-align:center; padding: 100px 0;">
                <h2>Product Not Found</h2>
                <a href="products.html" class="btn">Return to Catalog</a>
            </div>`;
        return;
    }

    document.getElementById('detail-root').innerHTML = `
        <div class="join-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
            <div style="text-align: center;">
                <img src="${product.img}" alt="${product.name}" style="width: 100%; max-width: 500px;">
            </div>
            <div>
                <span style="color: var(--lg-red); font-weight: 700; letter-spacing: 1px;">LG RENT-UP™</span>
                <h1 style="font-size: 2.5rem; margin: 10px 0;">${product.name}</h1>
                <p class="price" style="font-size: 2rem;">RM${product.subPrice}/mth</p>
                <p style="margin: 20px 0; color: #555;">Model: ${product.model}</p>
                <ul style="margin-bottom: 40px; padding-left: 20px;">
                    ${product.features.map(f => `<li style="margin-bottom: 8px;">${f}</li>`).join('')}
                </ul>
                <a href="https://wa.me/${CONTACT_WA}?text=Inquiry%20for%20${encodeURIComponent(product.name)}" class="btn" style="width: 100%; text-align: center;">Apply via WhatsApp</a>
            </div>
        </div>
    `;
}

// Start the app
init();
