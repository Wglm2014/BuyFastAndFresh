
$(document).ready(function () {

  $.get("/api/farmers-products", function (sellers) {
    console.log(sellers)
    sellers.forEach(farmer => {

      $("#sellers-info").append(`<tr><td class ="search" id = "${farmer.id}"><a href = "#" >${farmer.name}, ${farmer.brand}</a></td></tr>`);

    }); //foreach*/
  }); // end get
}); //end function

$("#sellers-info").on("click", ".search", function (event) {
  event.preventDefault();
  $("#products-area").html("");

  const searchId = $(this).attr("id");
  console.log(searchId);
  $.get("/api/product-farmer/" + searchId, function (products) {
    products.forEach(product => {
      const productPicture = $(`<img src= "${product.picture_url}">`);
      const productName = $("<p>" + product.name + "</p>");
      const productPrice = $("<p>" + product.price + "</p>");
      const productUnity = $("<p>" + product.price_per + "</p>");
      const addBtn = $(
        "<button id='add-car'><i class='fas fa-shopping-cart'></i></button>"
      );
      const card = $("<div class='card'>");
      card.append(productPicture, productName, productPrice, productUnity, addBtn);
      $("#products-area").append(card);
    });

  });


});