$(document).ready(function () {
    marketList = $("#markets-list");

    $.get("/api/markets", function (marketData) {

        marketData.forEach(element => {
            marketInfo = `${element.address}, ${element.schedule}`;
            ///client-markets/${element.id}
            marketList.append(
                `<a class="dropdown-item individual-market" href="#" id="${element.id}">
                <p style="font-size:12px;">${marketInfo}</p><br><p style="font-size:10px;">${element.products}</p></a>`);
        });

    });

});

$("#login").on("click", function (event) {

    event.preventDefault();
    $("#Modal-login").modal("toggle");
})

$("#login-button").on("click", function () {
    const email = $("#email").val();
    const password = $("#password").val();
    const user = { email, password };
    $.post("/api/login", user, function (userResult) {
        console.log("back");
        console.log(userResult);
        if (userResult) {
            $("#email").val("");
            $("#password").val("");
            window.location.href(userResult);
            $("Modal-login").modal("hide");
        }
        else {
            console.log("user not found");
        }
    });
});


