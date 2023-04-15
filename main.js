let carts = document.querySelectorAll('.add-cart');
let inc = document.querySelectorAll('.rightarrow');

console.log(carts);


let products = [
  {
    name: 'Olive Oil',
    tag: 'image/corn-oil.jpg',
    price: 1000,
    incart: 0,
  },
  {
    name: 'Wheat Flour',
    tag: 'image/flour.jpg',
    price: 105,
    incart: 0,
  },
  {
    name: 'Rice',
    tag: 'image/rice.jpg',
    price: 185,
    incart: 0,
  },
  {
    name: 'Sugar',
    tag: 'image/sugar.jpg',
    price: 99,
    incart: 0,
  },
  {
    name: 'Milk',
    tag: 'image/milk.jpg',
    price: 170,
    incart: 0,
  },
  {
    name: 'Bread',
    tag: 'image/bread.jpeg',
    price: 90,
    incart: 0,
  },
  {
    name: 'Butter',
    tag: 'image/butter.jpg',
    price: 145,
    incart: 0,
  },
  {
    name: 'Strawberry Jam',
    tag: 'image/Jam.jpg',
    price: 350,
    incart: 0,
  }]



//========================================loading number of products that were added before on loading page=======================================

function onloadpage() {
  let productNumber = localStorage.getItem("cartNumbers");
  if (productNumber) {
    document.querySelector('.shopcartinheader span').textContent = productNumber;
  }
}





//========================================counting number of products added in cart and showing it in carticon header=======================================

function cartsNumberUpdate(product) {
  productNumber = localStorage.getItem("cartNumbers");

  if (productNumber) {
    productNumber = parseInt(productNumber);
    productNumber += 1
    console.log(productNumber)
    localStorage.setItem("cartNumbers", productNumber);
    document.querySelector('.shopcartinheader span').textContent = productNumber;
  }
  else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector('.shopcartinheader span').textContent = 1;
  }
  console.log("the product clicked is", product.name);

  setElementCart(product);


}




//========================================setting element in local storage,loading it and updating its incart value=======================================

function setElementCart(product) {
  //pehlae hum check karain gae k agr koi hae pehlae sae incart mae ya nahi 
  let cartItems = localStorage.getItem('productInCart');
  cartItems = JSON.parse(cartItems);
  console.log(product.tag);

  if (cartItems != null) {
   
    if (cartItems[product.tag] == undefined) {
      
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].incart += 1
  }
  else {
    product.incart = 1;
    cartItems = {
      [product.tag]: product
                };
        }



  localStorage.setItem('productInCart', JSON.stringify(cartItems))
 
}





//========================================CALCULATING=TOTAL=AMOUNT=SAVING,LOADING=AND=UPDATING=IT=IN=LOCAL=STORAGE=======================================
function total(product) {
  let price = localStorage.getItem('totalCost');

  if (price != null) {
    price = parseInt(price);
    console.log(price + product.price);
    localStorage.setItem("totalCost", price + product.price);

  }
  else {
    localStorage.setItem("totalCost", product.price);

  }
}



//====================================Displaying items in cart.html=================================

function display(){
    let cartItem = localStorage.getItem('productInCart');
    cartItem = JSON.parse(cartItem);
    let productContainer = document.querySelector(".products")

    if(cartItem && productContainer){
        productContainer.innerHTML="";

        Object.values(cartItem).map(item=>{
            console.log(item.name)
            productContainer.innerHTML+= `
                <div class="product">
                    <i class="fa-solid fa-circle-xmark remove-btn" data-tag="${item.tag}"></i>
                    <img src="${item.tag}"/>
                    <span> ${item.name}</span>

                    <div class="price">
                        <span>RS ${item.price}</span>
                    </div>
                    <div class="quantity">
                        <i class="fa-solid fa-circle-arrow-left dec-btn" data-tag="${item.tag}"></i>
                        <span>${item.incart}</span>
                        <i class="fa-solid fa-circle-arrow-right inc-btn" data-tag="${item.tag}"></i>
                    </div>

                    <div class="total">
                        <span>${item.incart * item.price}</span>
                    </div>
                </div>
            `

        });
        cartCost = localStorage.getItem("totalCost");
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
            Basket Total
             </h4>
             <h4 class="basketTotal">
                PKR ${cartCost}
            </h4>
             </div>`


        let removeBtns = document.querySelectorAll(".remove-btn");
        let incBtns = document.querySelectorAll(".inc-btn");
        let decBtns = document.querySelectorAll(".dec-btn");

        function remove(){
        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let tag = btn.getAttribute("data-tag");
                let cartItems = JSON.parse(localStorage.getItem("productInCart"));
                let product = cartItems[tag];
                let productNumber = parseInt(localStorage.getItem("cartNumbers"));
                let cartCost = parseInt(localStorage.getItem("totalCost"));
                productNumber -= product.incart;
                cartCost -= product.price * product.incart;
                delete cartItems[tag];
                localStorage.setItem("productInCart", JSON.stringify(cartItems));
                localStorage.setItem("cartNumbers", productNumber);
                localStorage.setItem("totalCost", cartCost);
                document.querySelector('.shopcartinheader span').textContent = productNumber;
                display();
            });
        });
      }
      remove()

        incBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let tag = btn.getAttribute("data-tag");
                let cartItems = JSON.parse(localStorage.getItem("productInCart"));
                let product = cartItems[tag];
                product.incart += 1;
                cartItems[tag] = product;
                localStorage.setItem("productInCart", JSON.stringify(cartItems));
                let productNumber = parseInt(localStorage.getItem("cartNumbers"));
                let cartCost = parseInt(localStorage.getItem("totalCost"));
                productNumber += 1;
                cartCost += product.price;
                localStorage.setItem("cartNumbers", productNumber);
                localStorage.setItem("totalCost", cartCost);
                document.querySelector('.shopcartinheader span').textContent = productNumber;
                display();
            });
        });

        decBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let tag = btn.getAttribute("data-tag");
                let cartItems = JSON.parse(localStorage.getItem("productInCart"));
                let product = cartItems[tag];
                if(product.incart>0){
                    product.incart -= 1;
                    cartItems[tag] = product;
                    localStorage.setItem("productInCart", JSON.stringify(cartItems));
                    let productNumber = parseInt(localStorage.getItem("cartNumbers"));
                    let cartCost = parseInt(localStorage.getItem("totalCost"));
                    productNumber -= 1;
                    cartCost -= product.price;
                    localStorage.setItem("cartNumbers", productNumber);
                    localStorage.setItem("totalCost", cartCost);
                    document.querySelector('.shopcartinheader span').textContent = productNumber;
                    display();
              }
              
            });
        });


}
}










//====================================setting eventlistener on every button and calling functions=======================
for (let i = 0; i < carts.length; i++) {

  carts[i].addEventListener('click', () => {
    cartsNumberUpdate(products[i]);
    total(products[i]);


  })
}


//===================================calling-onloadpage-function================================================
onloadpage()
display()

