// Pull in required dependencies
const router = require("express").Router();
const db = require("../models");
const passport = require("../config/passport");



//query just markets, for drop down
router.get("/api/markets", async (req, res) => {
    const markets = await db.Market.findAll({});
    res.json(markets);
});

router.get("/api/markets/:id", async (req, res) => {
    const markets = await db.Market.findAll({ where: [{ id: +req.params.id }] });
    console.log(markets);
    res.json(markets);
});

router.get("/api/farmerData", async (req, res) => {
    console.log(req.user.email);
    const farmerData = await db.Farmer.findOne({ where: [{ email: req.user.email }] });
    res.json(farmerData);

});
//query Farmers and Products filtering by market
router.get("/api/farmer/:marketId", async (req, res) => {

    const FarmerProducts = await db.Farmer.findAll({ where: [{ MarketId: req.params.MarketId }, { open_close: true }] }, { include: [db.Product] });
    res.json(FarmerProducts);

});

router.get("/api/customer/:id", async (req, res) => {

    const customer = await db.Customer.findOne({ where: [{ id: req.params.id }] }, { include: [db.PaymentMethod] });
    res.json(customer);

});

//orders to be prepare by shopper, or are ready to be picked up, or they have been picked up
router.get("/api/orders/:marketId/:status/:date", async (req, res) => {
    const orders = await db.Order.findAll({ where: [{ MarketId: req.params.marketId }, { status: req.params.status }] }, { include: [db.Order_Detail, db.Customer] });
    res.json(orders);
});

router.get("/api/product-farmer", async (req, res) => {
    console.log(req.body.id);
    const products = await db.Product.findAll({ where: [{ FarmerId: req.body.id }] });
    res.json(products);
});

router.get("/api/product-farmer/:id", async (req, res) => {
    console.log(req.body.id);
    const products = await db.Product.findAll({ where: [{ FarmerId: req.params.id }] });
    res.json(products);
});

router.get("/api/farmers-products", async (req, res) => {
    const farmer = await db.Farmer.findAll({ include: [db.Market] });
    res.json(farmer);
});


router.get("/api/test", (req, res) => {
    let farmersProducts = [];
    db.Farmer.findAll({ include: [db.Market] }).then((farmers) => {
        /*farmers.forEach(farmer => {
            db.Product.findAll({ where: { farmerId: farmer.id } }).then((products) => {
                farmersProducts.push({ farmer: farmer, products: products });
            });
        });
        console.table("json response");*/
        res.json(farmers);
    });
});
/*router.get("api/category", async (req, res) => {
    const category = await db.Category.findAll({});
    res.json(category);
});*/

/*router.get("/api/userFarmer", (req, res) => {
    console.log("error here");
    console.log(req.session.userFarmer);
    res.send(req.session.userFarmer);
});*/


router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;