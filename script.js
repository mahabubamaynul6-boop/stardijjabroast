

const menu=window.MENU;
let cat="all",q="",cart=[],lang="ar";

const UI={
 ar:{dir:"rtl",label:"English",search:"ابحث في القائمة...",empty:"لا توجد نتائج.",add:"+ أضف للسلة",
 deliveryTitle:"توصيل حي الروضة مجاناً",deliveryText:"خارج حي الروضة: أرسل موقعك لمعرفة الرسوم",
 specialOffer:"عرض خاص",promoTitle:"وفّر أكثر، واستمتع أكثر",promoText:"وجبة برجر دجاج صغير — برجر دجاج + بطاطس + بيبسي",
 fullMenu:"القائمة الكاملة",chooseMeal:"اختر وجبتك",menuNote:"الأسعار والمكونات مطابقة للقائمة المرجعية.",
 orderNow:"إتمام الطلب",orderTitle:"أرسل طلبك مباشرة إلى المطعم",orderText:"أضف المنتجات للسلة ثم أرسلها على واتساب بالعربي والإنجليزي.",
 openCart:"فتح السلة",cartTitle:"سلة طلبك",total:"الإجمالي",sendWhatsapp:"إرسال الطلب عبر واتساب",
 visitUs:"زورونا",visitTitle:"ننتظركم في ستار دجاج",location:"حي الروضة · تبوك",scanTitle:"امسح الباركود واطلب فوراً",scanText:"يفتح موقع المطعم وقائمة الطعام.",
 emptyCart:"السلة فارغة — أضف أطباقك من القائمة.",addFail:"السلة فارغة",currency:"ر.س"},
 en:{dir:"ltr",label:"العربية",search:"Search the menu...",empty:"No results found.",add:"+ Add to cart",
 deliveryTitle:"Free delivery in Al Rawdah",deliveryText:"Outside Al Rawdah: send your location to check the delivery fee.",
 specialOffer:"SPECIAL OFFER",promoTitle:"Save more, enjoy more",promoText:"Small Chicken Burger Meal — Chicken Burger + Fries + Pepsi",
 fullMenu:"FULL MENU",chooseMeal:"Choose your meal",menuNote:"Prices and menu items match the reference menu.",
 orderNow:"ORDER NOW",orderTitle:"Send your order directly to the restaurant",orderText:"Add items to your cart and send your order on WhatsApp in Arabic and English.",
 openCart:"Open cart",cartTitle:"Your order",total:"Total",sendWhatsapp:"Send order on WhatsApp",
 visitUs:"VISIT US",visitTitle:"We are waiting for you at Star Dijaj",location:"Al Rawdah · Tabuk",scanTitle:"Scan & order instantly",scanText:"Opens the restaurant location and menu.",
 emptyCart:"Your cart is empty — add items from the menu.",addFail:"Your cart is empty",currency:"SAR"}
};

const descEn={
"Broast":"4 chicken pieces, fries, bread, ketchup & garlic",
"Spicy Broast":"4 chicken pieces, fries, bread, ketchup & garlic",
"Nuggets":"7 chicken nuggets, fries, bread, ketchup & garlic",
"Spicy Nuggets":"7 chicken nuggets, fries, bread, ketchup & garlic",
"Cheese Nuggets":"7 chicken nuggets with cheese, fries, bread & sauce",
"Chicken Kabab":"5 chicken kebab pieces, fries, bread, ketchup & garlic",
"Chicken Royal":"7 royal chicken pieces, fries, bread & sauce",
"Fish Fillet":"6 fish fillet pieces, fries, bread & sauce",
"Shrimp Broast":"10 shrimp pieces, fries, bread & sauce",
"Fresh Fish Broast":"6 fresh fish fillet pieces, fries, bread & sauce",
"Beef Burger":"Burger bun, fresh beef, lettuce, sauce & mayonnaise",
"Beef Cheeseburger":"Fresh beef, cheese, lettuce, sauce & mayonnaise",
"Double Beef Burger":"Two fresh beef patties, cheese, lettuce & sauce",
"Chicken Burger":"Burger bun, fresh chicken, lettuce & sauce",
"Chicken Cheeseburger":"Fresh chicken, cheese, lettuce, sauce & mayonnaise",
"Double Chicken Burger":"Two chicken patties, cheese, lettuce & sauce",
"Zinger Burger":"Fresh zinger, lettuce, cheese, sauce & mayonnaise",
"Double Zinger Burger":"Double zinger, cheese, lettuce & sauce",
"Nuggets Burger":"3 nuggets, lettuce, cheese & sauce",
"Fish Burger":"3 fish fillets, lettuce, cheese & sauce",
"Burger Hut":"Star Dijaj special burger",
"Chicken Fries":"3 chicken strips, fries, cheese, mayonnaise & BBQ",
"Cheese Fries":"Fries with cheese sauce",
"Medium Fries":"Medium fries",
"Large Fries":"Large fries",
"Family Meal":"5 chicken sandwiches with a family-size drink",
"Children Meal":"Chicken burger, Al Rabie juice & toy car",
"Large Kudu Sandwich":"Bread roll, chicken, mayonnaise, cheese, ketchup & garlic",
"Medium Kudu Sandwich":"Bread roll, chicken, mayonnaise, cheese, ketchup & garlic",
"Large Nuggets Sandwich":"4 nuggets, bread roll, mayonnaise & cheese",
"Medium Nuggets Sandwich":"3 nuggets, bread roll, mayonnaise & cheese",
"Large Shrimp Sandwich":"5 shrimp, bread roll, mayonnaise & cheese",
"Medium Shrimp Sandwich":"4 shrimp, bread roll, mayonnaise & cheese",
"Zinger Sandwich":"Zinger, bread roll, mayonnaise, cheese & garlic",
"Fish Sandwich":"Fish, bread roll, mayonnaise, cheese & garlic",
"Chicken Tortilla":"Chicken, tortilla bread, mayonnaise & cheese",
"Nuggets Tortilla":"Chicken nuggets, tortilla, mayonnaise & cheese",
"Zinger Tortilla":"Zinger, tortilla, mayonnaise & cheese",
"Fish Tortilla":"Fish, tortilla, mayonnaise & cheese",
"Twister":"Chicken, bread, mayonnaise, cheese & garlic",
"Pepsi":"240 ml","Diet Pepsi":"330 ml","Mirinda":"Soft drink","Mountain Dew":"Soft drink","7UP":"Soft drink","Water":"Bottled water","Al Rabie Orange":"250 ml"
};

const tabs=document.getElementById("tabs"),grid=document.getElementById("grid"),search=document.getElementById("search");
const cartEl=document.getElementById("cart"),overlay=document.getElementById("overlay");

function money(x){return lang==="ar"?`${x} ر.س`:`${x} SAR`}

function applyLang(){
 const u=UI[lang];
 document.documentElement.lang=lang;
 document.documentElement.dir=u.dir;
 document.getElementById("langBtn").textContent=u.label;
 document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(u[k]!==undefined)el.textContent=u[k]});
 search.placeholder=u.search;
 tabs.querySelectorAll("button").forEach(b=>b.textContent=lang==="ar"?b.dataset.ar:b.dataset.en);
 render();renderCart();
}

function render(){
 const list=menu.filter(x=>(cat==="all"||x.c===cat)&&(`${x.ar} ${x.en} ${x.d}`).toLowerCase().includes(q.toLowerCase()));
 grid.innerHTML=list.map(x=>{
   const i=menu.indexOf(x), enDesc=descEn[x.en]||x.d;
   return `<article class="card">
     <img src="${x.img}" alt="${x.en}" loading="lazy">
     <div class="card-body">
       <div><h3>${x.ar}</h3><div class="en">${x.en}</div></div>
       <div class="desc">${lang==="ar"?x.d:enDesc}</div>
       <div class="card-bottom"><span class="price">${money(x.price)}</span><button class="add" onclick="add(${i})">${UI[lang].add}</button></div>
     </div>
   </article>`
 }).join("")||`<p>${UI[lang].empty}</p>`;
}

function add(i){cart.push(i);renderCart();openCart()}
function removeAt(i){cart.splice(i,1);renderCart()}
function changeQty(index,delta){if(index<0||index>=cart.length)return;if(delta>0)cart.splice(index,0,cart[index]);else cart.splice(index,1);renderCart()}

function renderCart(){
 const counts={};cart.forEach(i=>counts[i]=(counts[i]||0)+1);
 const entries=Object.entries(counts);
 document.getElementById("count").textContent=cart.length;
 document.getElementById("cartItems").innerHTML=entries.length?entries.map(([id,n])=>{
   const x=menu[id], first=cart.indexOf(+id);
   return `<div class="cart-row"><img src="${x.img}"><div><b>${x.ar}</b><div class="en">${x.en}</div><small class="en">${lang==="ar"?x.d:(descEn[x.en]||x.d)}</small><div class="qty"><button onclick="removeAt(${first})">−</button><span>${n}</span><button onclick="changeQty(${first},1)">+</button></div></div><strong>${money(x.price*n)}</strong></div>`
 }).join(""):`<p style="color:#746b64">${UI[lang].emptyCart}</p>`;
 const total=cart.reduce((s,i)=>s+menu[i].price,0);
 document.getElementById("total").textContent=money(total);
}

function openCart(){cartEl.classList.add("open");overlay.classList.add("show")}
function closeCart(){cartEl.classList.remove("open");overlay.classList.remove("show")}

tabs.onclick=e=>{
 if(e.target.tagName==="BUTTON"){
   tabs.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
   e.target.classList.add("active");cat=e.target.dataset.cat;render();
 }
}
search.oninput=e=>{q=e.target.value;render()}
document.getElementById("openCart").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
overlay.onclick=closeCart;

document.getElementById("langBtn").onclick=()=>{lang=lang==="ar"?"en":"ar";applyLang()};

document.getElementById("whatsapp").onclick=()=>{
 if(!cart.length)return alert(UI[lang].addFail);
 const counts={};cart.forEach(i=>counts[i]=(counts[i]||0)+1);
 let text="طلب جديد من بروست ستار دجاج / New order from Star Dijaj Broast\n\n";
 text+="الطلب / Order:\n";
 Object.entries(counts).forEach(([id,n])=>{
   const x=menu[id];
   text+=`${n} × ${x.ar} / ${x.en} — ${x.price*n} SAR\n`;
 });
 const total=cart.reduce((s,i)=>s+menu[i].price,0);
 text+=`\nالإجمالي / Total: ${total} SAR\n`;
 text+="\nالعنوان / Location: 4058-4040 شارع المتنبي، حي الروضة، تبوك 47711 / 4058-4040 Al Mutanabbi, Al Rawdah, Tabuk 47711";
 text+="\nهاتف / Phone: 054 651 0807";
 location.href=`https://wa.me/966546510807?text=${encodeURIComponent(text)}`;
};

applyLang();
