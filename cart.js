/**
 * Created by oscar on 10/11/16.
 */

// utilities is an object that holds various functions that are used throughout code where needed
var utilities = {
   find: function (list, id) {
      var i = 0;
      var found = false;

      while (!found && i < list.length) {
         if (list[i].id === id) {
            found = true;
         }
         i++;
      }

      if (found) {
         return i - 1;
      } else {
         return -1;
      }

   },

   cartTotalItems: function (list) {
      var i = 0;
      var num = 0;

      while (i < list.length) {
         num += list[i].quantity;
         i++;
      }
      return num;
   },

   findByProductName: function (list, name) {
      var i = 0;
      var found = false;

      while (!found && i < list.length) {
         if (list[i].name === name) {
            found = true;
         }
         i++;
      }
      if (found) {
         return i - 1;
      }
      else {
         return null;
      }
   },
   findByProductBrand: function (list, brand) {
      var i = 0;
      var found = false;

      while (!found && i < list.length) {
         if (list[i].brand === brand) {
            found = true;
         }
         i++;
      }
      if (found) {
         return i - 1;
      }
      else {
         return null;
      }
   }


};

// random promo generator text for top fixed nav 
(function () {
   var randomGeneratorNavPromo = [
      {
         text: "Use <span class='navPromoListing'>MANIA10</span> for 10% off one item"
      },
      {
         text: "Use <span class='navPromoListing'>IPHONE15</span> for 15% off all Iphone Cases"
      },
      {
         text: "Use <span class='navPromoListing'>FANTASTIC5</span> for 5% off your total order"
      }
   ];
   var randomGeneratorNavPromo = randomGeneratorNavPromo[Math.floor(Math.random() * randomGeneratorNavPromo.length)];
   document.querySelector(".fixedHeading").innerHTML = randomGeneratorNavPromo.text;
})();


// setting up cart with empty array
var cart = {
   "itemsCart": [],
   "promos": {
      "MANIA10": 0.9,
      "IPHONE15": 0.85,
      "FANTASTIC5": 0.95
   },
   "promoMemory1": [],
   "promoMemory2": [],
   "promoMemory3": []
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

// creates a bounce effect when item is clicked to add to cart
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
   var itemName = parent.querySelector(".itemName").innerText;
   var itemImage = parent.querySelector(".zoom").childNodes[1].src;
   var type = parent.querySelector(".type").innerHTML.toLowerCase().replace(" ", "").trim();
   console.log(type);
   var itemPrice = parseFloat(parent.querySelector(".price").innerHTML.replace("$", ""));
   var count = 1;
   var cartLength = cart.itemsCart.length;
   // find is a function that verifies if itemId exist in cart if it does we skip and add to quantity
   var cartIndex = utilities.find(cart.itemsCart, itemId);
   var inputFieldId = cart.itemsCart.length;


   if (cartLength === 0 || cartIndex === -1) {
      cart.itemsCart.push({
             "id": itemId,
             "name": itemName,
             "featuredImage": itemImage,
             "price": itemPrice,
             "totalPrice": itemPrice,
             "quantity": 1,
             "inputId": inputFieldId,
             "brand": type
          }
      );

   }
   else {
      // update the quantity and price by 1 every time we click on add to cart but do not exceed 10
      if (cart.itemsCart[cartIndex].quantity < 10) {
         cart.itemsCart[cartIndex].quantity += 1;
         cart.itemsCart[cartIndex].totalPrice += itemPrice;
      }
   }




   // use a function from utilities object to update our cart number in fixed nav bar on each click
   document.querySelector(".quantityUpdate").innerHTML = utilities.cartTotalItems(cart.itemsCart);


   displayInCart();
   updateTotalPrice();

}


// function that adds html to cart when items are added
function displayInCart() {

   var itemsInCart = document.getElementById("checkoutNameUl");

   itemsInCart.innerHTML = "";

   for (var i = 0; i < cart.itemsCart.length; i++) {
      if (i >= 1) {
         itemsInCart.innerHTML += "<hr id='line" + i + "'><br>"
      }

      itemsInCart.innerHTML +=
          '<li class="checkoutContentsLi" id="product' + cart.itemsCart.length + '">' +
          '<div class="cartInfo imageDiv">' +
          '<img class="imageCart" src="' + cart.itemsCart[i].featuredImage + '">' +
          '</div>' +
          '<div class="cartInfo itemDiv">' +
          '<p>' + cart.itemsCart[i].name + '</p>' +
          '</div>' +
          '<div class="cartInfo priceDiv">' +
          '<p>' + '$ ' +
          cart.itemsCart[i].price +
          '</p>' +
          '</div>' +
          '<div class="cartInfo quantityDiv">' +
          '<button class="button1" onclick="decrementValue(this)" value="-">-</button>' +
          '<input id ="' + cart.itemsCart[i].inputId + '" readonly="readonly" class="quantityInput" type="text" min="0" max="10" value="' + cart.itemsCart[i].quantity + '">' +
          '<button class="button2" onclick="incrementValue(this)" value="+">+</button>' +
          '</div>' +
          '<div class="cartInfo priceTotalDiv">' +
          '<p>' +
          '$' + cart.itemsCart[i].totalPrice +
          '</p>' +
          '</div>' +
          '<div class="cartInfo removeDiv">' +
          '<a class="removeItem" href="#" onclick="remove(this)">x</a>' +
          '</div>' +
          '<li>'


   }


}

// remove object when the x symbol is pressed for that item
function remove(ele) {
   if (cart.promoMemory1.length > 0 || cart.promoMemory2.length > 0 || cart.promoMemory3.length > 0) {
      alert("Please reapply your discount code.")
   }
   var product = ele.parentNode.previousSibling.previousSibling.previousSibling;
   var productName = product.firstChild.innerHTML;
   cart.promoMemory1.splice(0,1);
   cart.promoMemory2.splice(0,1);
   cart.promoMemory3.splice(0,1);

   var cartObject = utilities.findByProductName(cart.itemsCart, productName);

   cart.itemsCart.splice(cartObject, 1);

   document.querySelector(".quantityUpdate").innerHTML = utilities.cartTotalItems(cart.itemsCart);
   updateTotalPrice();
   displayInCart();

}

// lowers the quantity of item by 1
// will remove item from cart when trying to decrement past zero
function decrementValue(ele) {
   var product = ele.parentNode.previousSibling.previousSibling;
   var productName = product.firstChild.innerHTML;
   var inputTag = ele.nextSibling;
   var inputValue = Number(inputTag.value);
   var cartIndex = utilities.findByProductName(cart.itemsCart, productName);

   if (cart.itemsCart[cartIndex].name === productName && inputValue > 0) {
      cart.itemsCart[cartIndex].quantity -= 1;
      cart.itemsCart[cartIndex].totalPrice -= cart.itemsCart[cartIndex].price;
      inputValue = isNaN(inputValue) ? 0 : inputValue;
      inputValue -= 1;
      inputTag.setAttribute("value", inputValue);
      document.querySelector(".quantityUpdate").innerHTML = utilities.cartTotalItems(cart.itemsCart);
      updateTotalPrice();
      displayInCart();
   }
   else {
      cart.itemsCart.splice(cartIndex, 1);
      updateTotalPrice();
      displayInCart();
   }


}

// increases the items in cart by one using the plus sign in shopping cart
function incrementValue(ele) {
   var product = ele.parentNode.previousSibling.previousSibling;
   var productName = product.firstChild.innerHTML;
   var inputTag = ele.previousSibling;
   var inputValue = Number(inputTag.value);
   var cartIndex = utilities.findByProductName(cart.itemsCart, productName);
   if (cart.itemsCart[cartIndex].name === productName && inputValue > 0) {
      cart.itemsCart[cartIndex].quantity += 1;
      cart.itemsCart[cartIndex].totalPrice += cart.itemsCart[cartIndex].price;
      inputValue = isNaN(inputValue) ? 0 : inputValue;
      inputValue += 1;
      inputTag.setAttribute("value", inputValue);
      document.querySelector(".quantityUpdate").innerHTML = utilities.cartTotalItems(cart.itemsCart);
      updateTotalPrice();
      displayInCart();
   }
   else {
      cart.itemsCart.splice(cartIndex, 1);
      updateTotalPrice();
      displayInCart();
   }

}


// calculate promo code to total price
// also will apply another code if it will return a lower price
function calculatePromo(el) {
   var parent = el.parentNode;
   var input = parent.previousSibling.previousSibling.firstChild.nextSibling;
   var inputValue = input.value.toUpperCase();
   var totalPricePromo = Number(document.getElementById("checkoutPrice").innerHTML.replace("$", "").replace("USD", "").trim());

   var totalPrice = document.getElementById("checkoutPrice");
   var subtotalDiv = document.getElementById("checkoutPrice");
   var totalItems = utilities.cartTotalItems(cart.itemsCart);
   var phoneBrand = utilities.findByProductBrand(cart.itemsCart, "iphone7");

   // alert box if trying to apply promo code to empty cart
   if (totalItems === 0) {
      alert("Your cart is empty");
   }
   // alert box if trying to apply promo code without inputting anything
   if (!inputValue) {
      alert("No promo code typed");
   }

   // start for loop that compares input to stored promo codes in cart
   for (var promo in cart.promos) {

      if (inputValue == promo) {
         if (phoneBrand !== -1 && cart.itemsCart[phoneBrand].brand === "iphone7" && inputValue === "IPHONE15" && cart.promoMemory1.length < 1) {
            if (cart.promoMemory2.length === 0 && cart.promoMemory3.length === 0) {
               cart.promoMemory1.push(inputValue);
               totalPricePromo *= cart.promos[promo];
               totalPrice.innerHTML = '$ ' + totalPricePromo.toFixed(2) + ' USD';
               console.log(cart.promoMemory1);
            }
         }
         else if (inputValue === 'MANIA10' && cart.promoMemory1.length > 0) {
            if ((neutralTotalPrice() * .85) > ((neutralTotalPrice() - cart.itemsCart[0].price) + (cart.itemsCart[0].price * .90)) && inputValue === "MANIA10") {
               totalPrice.innerHTML = '$ ' + ((neutralTotalPrice() - cart.itemsCart[0].price) + (cart.itemsCart[0].price * .90)).toFixed(2) + ' USD';
               cart.promoMemory1.splice(0, 1);
               cart.promoMemory2.push(inputValue);
            }
            else {
               alert("Another code has already been entered.This price will not be lower with this code.")
            }

         }
         else if (inputValue === "MANIA10" && cart.promoMemory2.length < 1) {
            if (cart.promoMemory1.length === 0 && cart.promoMemory3.length === 0) {
               cart.promoMemory2.push(inputValue);
               totalPricePromo -= cart.itemsCart[0].price;
               totalPricePromo += cart.itemsCart[0].price * cart.promos[promo];
               totalPrice.innerHTML = '$ ' + totalPricePromo.toFixed(2) + ' USD';
            }

         }
         if (inputValue === 'IPHONE15' && cart.promoMemory2[0] === 'MANIA10') {
            if ((neutralTotalPrice() * .85) < (neutralTotalPrice() - cart.itemsCart[0].price) + (cart.itemsCart[0].price * .90)) {
               totalPrice.innerHTML = '$ ' + (neutralTotalPrice() * .85).toFixed(2) + ' USD';
               cart.promoMemory2.splice(0, 1);
               cart.promoMemory1.push(inputValue);
            }
         }
         else if (inputValue === "FANTASTIC5" && cart.promoMemory3.length < 1 && cart.promoMemory1.length === 0 && cart.promoMemory2.length === 0) {
            cart.promoMemory3.push(inputValue);
            console.log(cart.promoMemory3);
            totalPricePromo *= cart.promos[promo];
            totalPrice.innerHTML = '$ ' + totalPricePromo.toFixed(2) + ' USD';

         }
         if (inputValue === 'IPHONE15' && cart.promoMemory3[0] === 'FANTASTIC5') {
            if ((neutralTotalPrice() * .85) < (neutralTotalPrice() * .95)) {
               totalPrice.innerHTML = '$ ' + (neutralTotalPrice() * .85).toFixed(2) + ' USD';
               cart.promoMemory3.splice(0, 1);
               cart.promoMemory1.push(inputValue);
            }

         }
         if (inputValue === 'MANIA10' && cart.promoMemory3[0] === 'FANTASTIC5') {
            if (((neutralTotalPrice() * .90) < (neutralTotalPrice() * .95)) && (cart.promoMemory1.length === 0)) {
               totalPrice.innerHTML = '$ ' + (neutralTotalPrice() * .90).toFixed(2) + ' USD';
               cart.promoMemory3.splice(0, 1);
               cart.promoMemory2.push(inputValue);
            }
         }
         else if (inputValue === 'FANTASTIC5' && (cart.promoMemory2.length > 0 || cart.promoMemory1.length > 0)) {
            alert("Another code has already been applied. This price will not be lower with this code.");
         }
      }


   }
}


// function that return a neutral value
function neutralTotalPrice() {
   var counterNum = 0;
   var i = 0;

   while (i < cart.itemsCart.length) {
      counterNum += cart.itemsCart[i].totalPrice;
      i++;
   }
   return counterNum;
}


// function that updates the total price
function updateTotalPrice() {
   var totalPrice = document.getElementById("checkoutPrice");

   var counterNum = 0;
   var i = 0;
   totalPrice.innerHTML = "";

   while (i < cart.itemsCart.length) {
      counterNum += cart.itemsCart[i].totalPrice;
      i++;
   }

   if (cart.promoMemory1.length === 0 && cart.promoMemory2.length === 0 && cart.promoMemory3.length === 0) {
      totalPrice.innerHTML += '$ ' + counterNum + ' USD';
   }
   else if (cart.promoMemory1.length === 1 && cart.promoMemory1[0] === "IPHONE15") {
      totalPrice.innerHTML += '$ ' + (counterNum * .85).toFixed(2) + ' USD';
   }
   else if (cart.promoMemory3.length === 1 && cart.promoMemory3[0] === "FANTASTIC5") {
      totalPrice.innerHTML += '$ ' + (counterNum * .95).toFixed(2) + ' USD';
   }
   else if (cart.promoMemory2.length === 1 && cart.promoMemory2[0] === "MANIA10") {
      totalPrice.innerHTML += '$ ' + ((counterNum - cart.itemsCart[0].price) + (cart.itemsCart[0].price * .9)).toFixed(2) + ' USD';
   }
}










