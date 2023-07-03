// select elements
const productsEl = document.querySelector(".products");
const cartItemEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

// renderProducts
function renderProdcuts() {
    products.forEach((product) => {
      productsEl.innerHTML += `
              <div class="item">
                  <div class="item-container">
                      <div class="item-img">
                          <img src="${product.imgSrc}" alt="${product.name}">
                      </div>
                      <div class="desc">
                          <h2>${product.name}</h2>
                          <h2><small>$</small>${product.price}</h2>
                          <p>
                              ${product.description}
                          </p>
                      </div>
                      <div class="add-to-wishlist">
                          <img src="./icons/heart.png" alt="add to wish list">
                      </div>
                      <div class="add-to-cart" onclick="addToCart(${product.id})">
                          <img src="./icons/bag-plus.png" alt="add to cart">
                      </div>
                  </div>
              </div>
          `;
    });
  }
  renderProdcuts();

  //cart array
  let cart=[]

//add to cart

function addToCart(id){
     // check if prodcut already exist in cart
     // if (cart.some((item) => item.id === id))
if(cart.some((item)=> item.id === id)){
   changeUnite('plus',id)
}else{
    let item=  products.find((product)=>product.id == id)
    cart.push({
      ...item,
      numberOfUnits: 1,
    }
    )
 
 }
 updateCart()
 renderSubTotal()
}



//// update cart

function updateCart(){
    cartItemEl.innerHTML = ""; // clear cart element
   cart.forEach((item)=>{
    cartItemEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" >
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeUnite('minus',${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeUnite('plus',${item.id})">+</div>           
            </div>
        </div>
      `;

   })
    
  
}

//calcullate subtotal 

function renderSubTotal(){
    let totalPrice = 0,
    totalItems = 0;
    cart.forEach((item)=>{
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    })

    subtotalEl.innerHTML=`Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`
    totalItemsInCartEl.innerHTML=totalItems;

}

// change number of units for an item
 // Initialize the cart variable as an empty array

function changeUnite(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === 'minus' && numberOfUnits > 1 ) {
        numberOfUnits--;
      }
      if (action === 'plus' && numberOfUnits < item.instock ) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart(cart);
}


