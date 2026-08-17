const products=[
{name:'Forge Performance Tee',category:'Apparel',price:899,tag:'BEST SELLER'},
{name:'Forge Training Shorts',category:'Apparel',price:1099,tag:'NEW'},
{name:'Heavy Resistance Bands',category:'Equipment',price:749,tag:'TRAINING'},
{name:'Adjustable Hand Gripper',category:'Equipment',price:599,tag:'ESSENTIAL'},
{name:'Forge Shaker Bottle',category:'Accessories',price:649,tag:'NEW'},
{name:'Performance Gym Bag',category:'Accessories',price:1499,tag:'BEST SELLER'},
{name:'Wrist Wraps',category:'Accessories',price:699,tag:'TRAINING'},
{name:'Forge Oversized Hoodie',category:'Apparel',price:1599,tag:'LIMITED'}
];
const money=n=>`₱${n.toLocaleString('en-PH')}`;const grid=document.querySelector('#product-grid');const search=document.querySelector('#product-search');const filters=document.querySelectorAll('#product-filters .filter');let active='All';
function getCart(){return JSON.parse(localStorage.getItem('forge-cart')||'[]')}
function saveCart(cart){localStorage.setItem('forge-cart',JSON.stringify(cart));updateCartCount()}
function updateCartCount(){const el=document.querySelector('#cart-count');if(el)el.textContent=getCart().reduce((s,p)=>s+p.qty,0)}
function render(){const q=search.value.toLowerCase();const items=products.filter(p=>(active==='All'||p.category===active)&&`${p.name} ${p.category} ${p.tag}`.toLowerCase().includes(q));grid.innerHTML=items.map(p=>`<article class="product-card"><div class="product-image"><span>${p.tag}</span><strong>FORGE</strong></div><div class="product-info"><small>${p.category}</small><h3>${p.name}</h3><div class="product-bottom"><b>${money(p.price)}</b><button class="add-cart" data-name="${p.name}">Add to Cart</button></div></div></article>`).join('')||'<p class="empty-state">No products found.</p>'}
filters.forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;filters.forEach(x=>x.classList.toggle('active',x===b));render()}));search.addEventListener('input',render);grid.addEventListener('click',e=>{const b=e.target.closest('.add-cart');if(!b)return;const product=products.find(p=>p.name===b.dataset.name);const cart=getCart();const existing=cart.find(p=>p.name===product.name);existing?existing.qty++:cart.push({...product,qty:1});saveCart(cart);b.textContent='Added ✓';setTimeout(()=>b.textContent='Add to Cart',900)});document.querySelectorAll('[data-category]').forEach(a=>a.addEventListener('click',()=>{active=a.dataset.category;filters.forEach(x=>x.classList.toggle('active',x.dataset.filter===active));render()}));render();updateCartCount();
