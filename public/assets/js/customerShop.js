//import { TableHints } from "sequelize/types";
const TAX_RATE = 0.0625;
const FEE_RATE = 0.03;
let orderObj = [];
let orderInfo = {};
let farmerInfo = {};
let items = 0;
$(document).ready(function () {

  $("#order").hide();

  $.get("/api/farmers-products", function (sellers) {
    console.log(sellers)
    sellers.forEach(farmer => {

      $("#sellers-info").append(`<tr><td class ="search" market-address = "${farmer.Market.address}" market-brand = "${farmer.Market.products}" 
      id = "${farmer.id}"><a href = "#" >${farmer.name}, ${farmer.brand}</a></td></tr>`);

    }); //foreach*/
  }); // end get
}); //end function

$("#sellers-info").on("click", ".search", function (event) {

  event.preventDefault();
  const marketInfo = $("#market-info");
  const productArea = $("#products-area");
  const searchId = $(this).attr("id");
  const marketAddress = $(this).attr("market-address");
  const marketBrand = $(this).attr("market-brand");
  marketInfo.html("");
  productArea.html("");

  marketInfo.html(`<div class="col-4"><p>${marketAddress}</p></div>
  <div class="col-8"><p>${marketBrand}</p></div>`);
  console.log(searchId);
  $.get("/api/product-farmer/" + searchId, function (products) {
    console.log(products);
    products.forEach(product => {
      const card = $(`<div class='card card-product'> 
      <img src= "${product.picture_url}" class="product-image">
      <p> ${product.name}, &#36;${product.price} ${product.price_per}</p>
      <div class="row"><div class = "col-9 text-right">
      <input type="number" placeholder = "quantity" id="quantity-${product.id}" step="0.01" value = 1.00></div>
      <div class="col-2 text-left m-0"><button  id = ${product.id}  name = "${product.name}", price = "${product.price}" price-per="${product.price_per}" farmerId = "${product.FarmerId}" 
      onClick="addToCart(this)" class="add-cart"><i class="fa fa-cart-plus" aria-hidden="true"></i></button></div></div>
      </div>`);
      productArea.append(card);
    });

  });

});//sellers info

function addToCart(product) {
  const id = product.getAttribute("id");
  const name = product.getAttribute("name");
  const quantity = $("#quantity-" + id).val();
  const price = product.getAttribute("price");
  const price_per = product.getAttribute("price-per");
  const farmerId = product.getAttribute("farmerId");
  items++;
  $("#items").text(items);
  console.log(farmerId);
  orderObj.push({ id, name, quantity, price, price_per, farmerId });
  console.log(orderObj);
}
$("#checkout").on("click", function (event) {
  if (items === 0) {
    $("#Modal-message").modal("toggle");

  } else {
    event.preventDefault();
    $(".card").css({ "width": "auto", "height": "auto" });
    $("#shopping").hide();
    $("#order").show();
    checkout(orderObj);
  }

});

//NEED TO START WORKING ON DISPLAY THE ORDER ON TABLE FORMAT
//1.add information to Table and accumilate totals
//2. insert information into json object ready for order post
//3.validate payment before attempting to complete order
// Order section from here
function checkout(data) {
  orderInfo = {};
  let subTotal_receipt = 0;
  $("#receipt-body").html("");

  data.forEach(product => {
    const total_item = +product.price * +product.quantity
    $("#receipt-body").append(`<tr><td>${product.quantity}</td><td  colspan="2">${product.name}</td><td>${product.price} ${product.price_per}</td><td>${total_item.toFixed(2)}</td></tr>`);
    subTotal_receipt += total_item;
  });

  const taxes = subTotal_receipt * TAX_RATE;
  const packFee = subTotal_receipt * FEE_RATE;
  const total_receipt = subTotal_receipt + taxes + packFee;
  $("#receipt-foot").html("");
  $("#receipt-foot").append(`<tr><td colspan="4"> subtotal</td><td>${subTotal_receipt.toFixed(2)}</td></tr>`);
  $("#receipt-foot").append(`<tr> <td colspan="4">tax</td><td>${taxes.toFixed(2)}</td></tr>`);
  $("#receipt-foot").append(`<tr><td colspan="4"> packing fee</td><td>${packFee.toFixed(2)}</td></tr>`);
  $("#receipt-foot").append(`<tr> <td colspan="4"> Total</td> <td>${total_receipt.toFixed(2)}</td></tr>`);

  $.get("/api/isLoggedin", function (userEmail) {
    //if user is logged in search for payment information else display form to add payment method
    console.log(userEmail);
    if (userEmail.success) {
      console.log(userEmail.userEmail);
      $.get("/api/customerByEmail", function (userData) {
        console.log(userData);
        $.get("/api/payments/" + userData.id, function (paymentData) {
          console.log(paymentData.lenght);
          if (paymentData.length > 0) {
            //if the user has payments
            console.log("lenght")
            paymentData.forEach(payment => {
              $("#payment").append(`<div class="card payments" id="${paymentData.CustomerId}"><h5 class="cc-number"><i class="fa fa-credit-card-alt" aria-hidden="true"></i>:${payment.credit_card}</h5>
                <h5 class="expiration-date">csv: ${payment.scv}</h5><h5 class="expiration-date">Expiration Date: ${payment.expiration_date}</h5> <input type="checkbox" value="${payment.primary_pay}"></input></div>`);
            });
          } else {
            console.log(userData);
            //user needs to add payment method
            $("#payment").append(`<div class="card payments>
              <form id = "payment-method">
                <div class ="form-group"><label>Name on Credit Card</label>
                <input id = "name-on-card" type= "text" class="form-control" value="${userData.first_name} ${userData.last_name}">
                <div class ="form-group"><label>Billing Address</label>
                <input id="address" type= "text" class="form-control" value="${userData.address}">
                <input id="city" type= "text" class="form-control" value="${userData.city}">
                <input id="state" type= "text" class="form-control" value="${userData.state}">
                <input id="zip" type= "text" class="form-control" value="${userData.zip}">
                <div class ="form-group"><label>Credita Card Infor</label>
                <input id="credit_card" type= "text" class="form-control" placeholder = "CC number">
                <input id="scv" type= "text" class="form-control" placeholder ="SCV">
                <input id="expiration_date" type= "date" class="form-control" placeholder="expiration date">
                <button id = "save-payment" type="submit" class="btn btn-info" customer-data="${userData.id}">Save Payment and Order!</button> </div>
              </form>
            </div>`);
          }
        });
      });

    } else {

    }
  });
};

$("#back").on("click", function () {
  event.preventDefault();
  $(".card").css({ "width": "300px", "height": "300px" });
  $("#shopping").show();
  $("#order").hide();
});

$("#payment").on("click", "#save-payment", function (event) {
  event.preventDefault();
  console.log($(this).attr("id"));
  orderObj = [];
  orderInfo = {};

  //save the post detail info, order info payment etc.
});