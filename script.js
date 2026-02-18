// script.js - FINAL UPDATED VERSION (with image onerror fallback + WhatsApp 60142626792)
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');

function initSliderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
}

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
}

function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); }
function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); }
function goToSlide(i) { currentSlide = i; showSlide(currentSlide); }

let slideInterval;
function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
}

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger) hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Forms (demo alerts)
function handleQuickApply(e) { e.preventDefault(); alert('✅ Application received!'); e.target.reset(); }
function subscribeNewsletter(e) { e.preventDefault(); alert('🎉 Subscribed!'); e.target.reset(); }
function openEnquiry() { alert('📞 Enquiry sent!'); }

// FAQ toggle
function toggleFaq(el) {
    const answer = el.nextElementSibling;
    document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
    if (!answer.style.maxHeight) answer.style.maxHeight = answer.scrollHeight + "px";
}

// FULL OFFICIAL PRODUCTS ARRAY (49 models)
const allProducts = [
    { id:1, category:"Water Purifier", name:"PuriCare™ WD210MN", price:60, img:["https://www.lg.com/my/images/water-purifiers/wd210mn/main/wd210mn-01.jpg"] },
    { id:2, category:"Water Purifier", name:"PuriCare™ WD516AN", price:70, img:["https://www.lg.com/my/images/water-purifiers/wd516an/main/wd516an-01.jpg"] },
    { id:3, category:"Water Purifier", name:"PuriCare™ WD518AN", price:70, img:["https://www.lg.com/my/images/water-purifiers/wd518an/main/wd518an-01.jpg"] },
    { id:4, category:"Water Purifier", name:"PuriCare™ WU525BS", price:110, img:["https://www.lg.com/my/images/water-purifiers/wu525bs/main/wu525bs-01.jpg"] },
    { id:5, category:"Water Purifier", name:"PuriCare™ WS410GN", price:110, img:["https://www.lg.com/my/images/water-purifiers/ws410gn/main/ws410gn-01.jpg"] },
    { id:6, category:"Water Purifier", name:"PuriCare™ WS510SN", price:130, img:["https://www.lg.com/my/images/water-purifiers/ws510sn/main/ws510sn-01.jpg"] },
    { id:7, category:"Air Purifier", name:"PuriCare™ AS35GGW10", price:45, img:["https://www.lg.com/my/images/air-purifiers/as35ggw10/main/as35ggw10-01.jpg"] },
    { id:8, category:"Air Purifier", name:"PuriCare™ AS60GHWG0", price:50, img:["https://www.lg.com/my/images/air-purifiers/as60ghwg0/main/as60ghwg0-01.jpg"] },
    { id:9, category:"Air Purifier", name:"PuriCare™ AS60GHCG0", price:50, img:["https://www.lg.com/my/images/air-purifiers/as60ghcg0/main/as60ghcg0-01.jpg"] },
    { id:10, category:"Air Purifier", name:"PuriCare™ AS55GGWX0", price:65, img:["https://www.lg.com/my/images/air-purifiers/as55ggwx0/main/as55ggwx0-01.jpg"] },
    { id:11, category:"Air Purifier", name:"PuriCare™ AS20GPHK0", price:60, img:["https://www.lg.com/my/images/air-purifiers/as20gphk0/main/as20gphk0-01.jpg"] },
    { id:12, category:"Air Purifier", name:"PuriCare™ AS20GPBK0", price:60, img:["https://www.lg.com/my/images/air-purifiers/as20gpbk0/main/as20gpbk0-01.jpg"] },
    { id:13, category:"Air Purifier", name:"PuriCare™ AS20GPKK0", price:60, img:["https://www.lg.com/my/images/air-purifiers/as20gpkk0/main/as20gpkk0-01.jpg"] },
    { id:14, category:"Air Purifier", name:"PuriCare™ AS10GDBYO", price:105, img:["https://www.lg.com/my/images/air-purifiers/as10gdbyo/main/as10gdbyo-01.jpg"] },
    { id:15, category:"Air Purifier", name:"PuriCare™ AS65GDBYO", price:75, img:["https://www.lg.com/my/images/air-purifiers/as65gdbyo/main/as65gdbyo-01.jpg"] },
    { id:16, category:"Air Purifier", name:"PuriCare™ AS25GCBZ0", price:70, img:["https://www.lg.com/my/images/air-purifiers/as25gcbz0/main/as25gcbz0-01.jpg"] },
    { id:17, category:"Dehumidifier", name:"PuriCare™ DD16GMWE1", price:70, img:["https://www.lg.com/my/images/dehumidifiers/dd16gmwe1/main/dd16gmwe1-01.jpg"] },
    { id:18, category:"Clothing Care", name:"Styler™ S3WF", price:90, img:["https://www.lg.com/my/images/styler/s3wf/main/s3wf-01.jpg"] },
    { id:19, category:"Vacuum Cleaner", name:"CordZero™ A9X-RSTEAM", price:130, img:["https://www.lg.com/my/images/vacuum-cleaners/a9x-rsteam/main/a9x-rsteam-01.jpg"] },
    { id:20, category:"Washing Machine", name:"Front Loader FV1450S2W", price:90, img:["https://www.lg.com/my/images/washer-dryers/fv1450s2w/main/fv1450s2w-01.jpg"] },
    { id:21, category:"Washing Machine", name:"Front Loader F2520SNEKR", price:120, img:["https://www.lg.com/my/images/washer-dryers/f2520snekr/main/f2520snekr-01.jpg"] },
    { id:22, category:"Washing Machine", name:"Front Loader F2515RNTKAR", price:140, img:["https://www.lg.com/my/images/washer-dryers/f2515rntkar/main/f2515rntkar-01.jpg"] },
    { id:23, category:"Washer Dryer", name:"FV1410H3P", price:150, img:["https://www.lg.com/my/images/washer-dryers/fv1410h3p/main/fv1410h3p-01.jpg"] },
    { id:24, category:"Washer Dryer", name:"FV1209D4W", price:120, img:["https://www.lg.com/my/images/washer-dryers/fv1209d4w/main/fv1209d4w-01.jpg"] },
    { id:25, category:"WashTower", name:"WT2520NHEGR", price:280, img:["https://www.lg.com/my/images/washer-dryers/wt2520nhba/main/wt2520nhba-01.jpg"] },
    { id:26, category:"WashTower", name:"WT1410NHB", price:210, img:["https://www.lg.com/my/images/washer-dryers/wt1410nhb/main/wt1410nhb-01.jpg"] },
    { id:27, category:"Top Loader", name:"TV2517DV3B", price:85, img:["https://www.lg.com/my/images/washer-dryers/tv2517dv3b/main/tv2517dv3b-01.jpg"] },
    { id:28, category:"Top Loader", name:"TV2520SV9KR", price:100, img:["https://www.lg.com/my/images/washer-dryers/tv2520sv9kr/main/tv2520sv9kr-01.jpg"] },
    { id:29, category:"Dryer", name:"VD-H9066WSR", price:100, img:["https://www.lg.com/my/images/dryers/vd-h9066wsr/main/vd-h9066wsr-01.jpg"] },
    { id:30, category:"Air Conditioner", name:"DualCool S3-Q09JAPPA", price:80, img:["https://www.lg.com/my/images/residential-air-conditioners/s3-q09jappa/main/s3-q09jappa-01.jpg"] },
    { id:31, category:"Air Conditioner", name:"DualCool S3-Q12JAPPA", price:90, img:["https://www.lg.com/my/images/residential-air-conditioners/s3-q12jappa/main/s3-q12jappa-01.jpg"] },
    { id:32, category:"Air Conditioner", name:"DualCool S3-Q18KLPP A", price:110, img:["https://www.lg.com/my/images/residential-air-conditioners/s3-q18klppa/main/s3-q18klppa-01.jpg"] },
    { id:33, category:"Air Conditioner", name:"DualCool S3-Q24K2PPA", price:120, img:["https://www.lg.com/my/images/residential-air-conditioners/s3-q24k2ppa/main/s3-q24k2ppa-01.jpg"] },
    { id:34, category:"Air Conditioner", name:"Artcool S3-Q12JARPA", price:100, img:["https://www.lg.com/my/images/residential-air-conditioners/s3-q12jarpa/main/s3-q12jarpa-01.jpg"] },
    { id:35, category:"Refrigerator", name:"InstaView GC-X24FFC7R", price:200, img:["https://www.lg.com/my/images/refrigerators/gc-x24ffc7r/main/gc-x24ffc7r-01.jpg"] },
    { id:36, category:"Refrigerator", name:"Multi-Door GV-K25FFGER", price:180, img:["https://www.lg.com/my/images/refrigerators/gv-k25ffger/main/gv-k25ffger-01.jpg"] },
    { id:37, category:"Refrigerator", name:"Multi-Door GC-G22FFQAB", price:160, img:["https://www.lg.com/my/images/refrigerators/gc-g22ffqab/main/gc-g22ffqab-01.jpg"] },
    { id:38, category:"Refrigerator", name:"Multi-Door GC-B24FFCPB", price:130, img:["https://www.lg.com/my/images/refrigerators/gc-b24ffcpb/main/gc-b24ffcpb-01.jpg"] },
    { id:39, category:"Refrigerator", name:"Side-by-Side GC-J257SQNW", price:130, img:["https://www.lg.com/my/images/refrigerators/gc-j257sqnw/main/gc-j257sqnw-01.jpg"] },
    { id:40, category:"Refrigerator", name:"Top Freezer GN-F452PQAK", price:80, img:["https://www.lg.com/my/images/refrigerators/gn-f452pqak/main/gn-f452pqak-01.jpg"] },
    { id:41, category:"Dishwasher", name:"QuadWash DFC335HM", price:150, img:["https://www.lg.com/my/images/dishwashers/dfc335hm/main/dfc335hm-01.jpg"] },
    { id:42, category:"Dishwasher", name:"QuadWash DFC533FV", price:130, img:["https://www.lg.com/my/images/dishwashers/dfc533fv/main/dfc533fv-01.jpg"] },
    { id:43, category:"Microwave", name:"NeoChef MJ3965BGP", price:60, img:["https://www.lg.com/my/images/microwaves/mj3965bgp/main/mj3965bgp-01.jpg"] },
    { id:44, category:"TV", name:"65\" QNED87ASA", price:135, img:["https://www.lg.com/my/images/televisions/65qned87asa/main/65qned87asa-01.jpg"] },
    { id:45, category:"TV", name:"75\" QNED87ASA", price:200, img:["https://www.lg.com/my/images/televisions/75qned87asa/main/75qned87asa-01.jpg"] },
    { id:46, category:"TV", name:"65\" NanoCell 83ASB", price:85, img:["https://www.lg.com/my/images/televisions/65nano83asb/main/65nano83asb-01.jpg"] },
    { id:47, category:"TV", name:"75\" NanoCell 83ASB", price:110, img:["https://www.lg.com/my/images/televisions/75nano83asb/main/75nano83asb-01.jpg"] },
    { id:48, category:"TV", name:"77\" OLED77B5PSA evo AI", price:560, img:["https://www.lg.com/my/images/televisions/oled77b5psa/main/oled77b5psa-01.jpg"] },
    { id:49, category:"Soundbar", name:"S90TY Dolby Atmos", price:60, img:["https://www.lg.com/my/images/soundbars/s90ty/main/s90ty-01.jpg"] }
];

function renderProducts(filtered) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img[0]}" alt="${p.name}" loading="lazy" 
                 onerror="this.src='https://via.placeholder.com/800x600/eeeeee/666666?text=LG+${encodeURIComponent(p.name.replace(/™/g,'').replace(/"/g,''))}';this.onerror=null;">
            <div class="card-body">
                <span class="category">${p.category}</span>
                <h3>${p.name}</h3>
                <div class="price">From <strong>RM ${p.price}</strong>/month</div>
                <a href="https://wa.me/60142626792?text=Interested in ${encodeURIComponent(p.name)}" target="_blank" class="btn-primary small">Subscribe Now</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterProducts() {
    const search = (document.getElementById('searchInput')?.value?.toLowerCase() || '');
    const cat = (document.getElementById('categoryFilter')?.value || '');
    const filtered = allProducts.filter(p => 
        (p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search)) &&
        (!cat || p.category === cat)
    );
    renderProducts(filtered);
}

function init() {
    if (slides.length > 0) {
        initSliderDots();
        showSlide(0);
        startAutoSlide();
    }
    if (document.getElementById('productGrid')) {
        renderProducts(allProducts);
        document.getElementById('searchInput')?.addEventListener('input', filterProducts);
        document.getElementById('categoryFilter')?.addEventListener('change', filterProducts);
    }
}

document.addEventListener('DOMContentLoaded', init);
