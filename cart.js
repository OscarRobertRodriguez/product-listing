/**
 * Created by oscar on 10/11/16.
 */

// utilities is an object that holds various functions that are used throughout code where needed
var utilities = {
   find: function (list, id) {
      var i = 0;
      var found = false;

      while(!found && i < list.length) {
         if(list[i].id === id) {
            found = true;
         }
         i++;
      }

      if(found){
         return i-1;
      }else {
         return -1;
      }

   },

   cartTotalItems: function (list) {
      var i = 0;
      var num = 0;

      while(i < list.length) {
         num += list[i].quantity;
         i++;
      }
      return num;
   }

};





// setting up cart with empty array
var cart = {
   "itemsCart" : []
};


var addButtons = document.getElementsByClassName("zoom");
var modal = document.querySelector(".modal");
var cartBtn = document.querySelector(".cart");
var closeCart = document.querySelector(".close");
var itemContainer = document.getElementById("item1");




// opens cart in a modal window when cart link is pressed
function openCart() {
   var modal = document.querySelector(".modal");
   var cartBtn = document.querySelector(".cart");
   var closeCart = document.querySelector(".close");

   modal.style.display = "block";
// closes modal window when you click on window
   window.onclick = function (event) {
      if (event.target == modal) {
         modal.style.display = "none";
      }
   }

}





// === add event listeners to add to cart buttons === //
for (i = 0; i < addButtons.length; i++) {
   addButtons[i].addEventListener('click', addToCart);
   addButtons[i].addEventListener('click', animateBounce);
}

function animateBounce(event) {
   var topParent = event.target.parentNode;
   var parent = event.target;
   parent.classList.add("animated");
   parent.classList.add("bounce");
   window.setTimeout(function () {
        parent.classList.remove("animated");
        parent.classList.remove("bounce");
   }, 1000);
}




// we use event for parameter as it references our click
function addToCart(event) {

// when we use event.target we get the child that we clicked on and with parentnode we get the parent container for our layout
   var parent = event.target.parentNode;

   // get the id name
   var itemId = parent.getAttribute("id");
   var itemName =  parent.querySelector(".itemName").innerText;
   var itemImage = parent.querySelector(".zoom").childNodes[1].src;
   var itemPrice = parseFloat(parent.querySelector(".price").innerHTML.replace("$",""));
   var count = 1;
   var cartLength = cart.itemsCart.length;
   // find is a function that verifies if itemId exist in cart if it does we skip and add to quantity
   var cartIndex = utilities.find(cart.itemsCart, itemId);


if (cartLength === 0 || cartIndex === -1 ) {
   cart.itemsCart.push({
          "id": itemId,
          "name": itemName,
          "featuredImage": itemImage,
          "price": itemPrice,
          "quantity": count
       }
   );

}
else {
   // update the quantity and price by 1 every time we click on add to cart but do not exceed 10
   if( cart.itemsCart[cartIndex].quantity < 10) {
      cart.itemsCart[cartIndex].quantity += 1;
      cart.itemsCart[cartIndex].price += itemPrice;
   }
}

   console.log(cart);


  
 // use a function from utilities object to update our cart number in fixed nav bar on each click
 document.querySelector(".quantityUpdate").innerHTML = utilities.cartTotalItems(cart.itemsCart);

displayInCart();
updateTotalPrice();

}


// function that add html to cart when items are added
function displayInCart() {

   var itemsInCart = document.getElementById("checkoutNameUl");

   itemsInCart.innerHTML = "";

   for(var i = 0; i < cart.itemsCart.length; i++) {
      if (i >= 1) {
         itemsInCart.innerHTML +=  "<hr><br>"
      }

         itemsInCart.innerHTML +=
             '<li class="checkoutContentsLi">' +
                 '<div class="cartInfo imageDiv">' +
                    '<img class="imageCart" src="' + cart.itemsCart[i].featuredImage + '">' +
                 '</div>' +
                 '<div class="cartInfo itemDiv">' +
                    '<p>'+  cart.itemsCart[i].name  + '</p>' +
                 '</div>' +
                 '<div class="cartInfo priceDiv">' +
                   '<p>' + '$ ' +
                        cart.itemsCart[i].price +
                   '</p>' +
                 '</div>' +
                 '<div class="cartInfo quantityDiv">' +
                   '<input class=" quantityInput" type="number" min="0" max="10" value="'+ cart.itemsCart[i].quantity +'">' +
                 '</div>' +
                 '<div class="cartInfo removeDiv">' +
                   '<a class="removeItem" href="http://www.case-mate.com/cart/change?line=1&quantity=0">x</a>' +
                 '</div>' +
             '<li>'






   }



}


function updateTotalPrice() {
   var totalPrice = document.getElementById("checkoutPrice");
   var counterNum = 0;
   var i = 0;
   totalPrice.innerHTML = "";
   while (i < cart.itemsCart.length) {
      counterNum += cart.itemsCart[i].price;
      i++;
   }

   totalPrice.innerHTML += '$ ' + counterNum + ' USD'
}

/*
 <li class="checkoutContentsLi">

 <div class="cartInfo imageDiv">
 <img class="imageCart" src="http://lorempixel.com/300/300/abstract">
 </div>


 <div class="cartInfo itemDiv">
 <p class=""> tough case - clear</p>
 </div>

 <div class="cartInfo priceDiv">
 <p class="">$ 35</p>
 </div>

 <div class="cartInfo quantityDiv">
 <input class=" quantityInput" type="number" min="0" max="10" value="1">
 </div>

 <div class="cartInfo removeDiv">
 <a class="removeItem" href="http://www.case-mate.com/cart/change?line=1&quantity=0">x</a>
 </div>
 </li>
 */



// addItemToCart(name,price,count);

// removeItemFromCart(name); // removes 1 item

// removeItemFromCartAll(name); // removes all item name

// clearCart();

// countCart(); -> return count

// totalCart(); -> return total cost

// listCart();  -> array of Items
