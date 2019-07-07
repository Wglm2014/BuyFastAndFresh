$("#save-market").on("click", function (event) {
    event.preventDefault();

    const brand = $("#brand");
    const address = $("#address");
    const city = $("#city");
    const state = $("#state");
    const zip = $("#zip");
    const date_open = $("#date_open");
    const date_close = $("#date_close");
    const time_open = $("#time_open");
    const time_close = $("#time_close");
    const marketData = { brand, address, city, state, zip, date_open, date_close, time_open, time_close };
    validate(marketData);
    $.post("/api/market", marketData, function (marketReturn) {
        if (marketReturn.success) {

        } else {
            console.log(marketReturn.err);
        }
    });
});

function validate(data) {
    const regeZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (!regeZip.test(data.zip)) {
        errorModal("Please enter a valid Zip Code");
    }
    $("#zip").focus();
}

function errorModal(message) {
    $("#modal-error").text(message);
    $("#modal").modal("toggle");
}