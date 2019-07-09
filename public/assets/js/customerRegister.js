$("#add").on("click", function(event) {
  event.preventDefault();

  let newCustomerAccount = {
    first_name: $("#first-name").val(),
    last_name: $("#last-name").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    telephone: $("#phone-number").val(),
    address: $("#address").val(),
    zip: $("#zip-code").val(),
    city: $("#city").val(),
    state: $("#state").val()
  };

  console.log(newCustomerAccount);

  $.post("api/customer", newCustomerAccount);
});
