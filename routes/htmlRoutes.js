
const router = require("express").Router();

router.get("/", (req, res) => { res.sendFile("index.html") });

router.get("/farmer-register", (req, re) => {
    res.sendFile("farmerRegister.html");
});
router.get("/shopper-register", (req, re) => {
    res.sendFile("shopperRegister.html");
});
router.get("/customer-register", (req, re) => {
    res.sendFile("customerRegister.html");
});

module.exports = router;
