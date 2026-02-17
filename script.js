function toggleMenu(){
 document.getElementById("navMenu")?.classList.toggle("active");
}

async function loadProducts(){
 const res = await fetch("products.json");
 return await res.json();
}

document.addEventListener("DOMContentLoaded", async()=>{
 const products = await loadProducts();

 const featuredContainer = document.getElementById("featured-products");
 if(featuredContainer){
  const featured = products.filter(p=>p.featured);
  featuredContainer.innerHTML = featured.map(p=>`
   <div class="product-card">
    <img src="${p.images[0]}">
    <h3>${p.name}</h3>
    <p>RM${p.price}/month</p>
    <a href="product.html?model=${p.model}" class="btn-primary">View</a>
   </div>
  `).join("");
 }

 const productList = document.getElementById("product-list");
 if(productList){
  productList.innerHTML = products.map(p=>`
   <div class="product-card">
    <img src="${p.images[0]}">
    <h3>${p.name}</h3>
    <p>RM${p.price}/month</p>
    <a href="product.html?model=${p.model}" class="btn-primary">View</a>
   </div>
  `).join("");
 }

 const params = new URLSearchParams(window.location.search);
 const model = params.get("model");
 const product = products.find(p=>p.model===model);

 if(product){
  document.getElementById("mainImage").src = product.images[0];

  document.getElementById("thumbnails").innerHTML =
   product.images.map(img=>
    `<img src="${img}" onclick="document.getElementById('mainImage').src='${img}'">`
   ).join("");

  document.getElementById("productInfo").innerHTML = `
   <h1>${product.name}</h1>
   <h2>RM${product.price}/month</h2>
   <ul>${product.features.map(f=>`<li>${f}</li>`).join("")}</ul>
   <a href="https://wa.me/60142626792?text=Hi I am interested in ${product.name}" class="btn-primary">
    WhatsApp Now
   </a>
  `;
 }
});
