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
    const markets = await db.Market.findAll({ where: [{ id: req.params.id }] });
    res.json(markets);
});

//query Farmers and Products filtering by market
router.get("/api/farmer/:marketId", async (req, res) => {
    if (req.user.email) {
        const FarmerProducts = await db.Farmer.findAll({ where: [{ MarketId: req.params.MarketId }, { open_close: true }] }, { include: [db.Product] },
            { order: ['category', 'DESC'] });
        res.json(FarmerProducts);
    } else {
        res.json(false);
    }
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
    if (req.user.email) {
        const products = await db.Product.findAll({ where: [{ FarmerId: 1 }] }, { include: [db.Farmer] });
        res.json(products);
    } else {
        res.json(false);
    }
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
