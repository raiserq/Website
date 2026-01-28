async function loadProducts(){
  try{
    const res = await fetch('data/products.json');
    const data = await res.json();
    window.PRODUCTS = data;
    renderProducts(data);
  }catch(err){
    console.error('加载商品失败', err);
    document.getElementById('products').innerHTML = '<p>无法加载商品数据。</p>';
  }
}

function money(n){
  return '¥' + Number(n).toLocaleString('zh-CN');
}

function renderProducts(items){
  const container = document.getElementById('products');
  if(!items.length){ container.innerHTML = '<p>未找到商品。</p>'; return }
  container.innerHTML = items.map(p=>`
    <article class="card" data-id="${p.id}">
      <img src="${p.image}" alt="${escapeHtml(p.title)}">
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(p.title)}</h3>
        <p class="card-desc">${escapeHtml(p.description)}</p>
      </div>
      <div class="card-footer">
        <div class="price">${money(p.price)}</div>
        <a class="buy" href="product.html?id=${p.id}">查看</a>
      </div>
    </article>
  `).join('');
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'
  })[c]);
}

function setupSearch(){
  const input = document.getElementById('search');
  input.addEventListener('input',()=>{
    const q = input.value.trim().toLowerCase();
    const filtered = (window.PRODUCTS||[]).filter(p=>
      p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
    renderProducts(filtered);
  });
}

// 初始化
loadProducts();
setupSearch();