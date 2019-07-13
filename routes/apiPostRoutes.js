const router = require("express").Router();
const db = require("../models");
const passport = require("../config/passport");

router.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json("/");
});

//create new record for market
router.post("/api/market/", (req, res) => {
    db.Market.create({ id: req.body.id, address: req.body.address, products: req.body.products, schedule: req.body.schedule }).then((market) => {
        console.log(market);
        res.json({ success: true, market: market });
    }).catch(err => {
        res.json({ success: false, error: err });
    });
});

//create new record for farmer
router.post("/api/farmer", (req, res) => {
    console.log("req.body " + req.body);
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function (user) {
        console.log(user);
        if (user) {
            db.Farmer.create({
                name: req.body.name,
                email: user.email, password: user.password, address: req.body.address,
                city: req.body.city, zip: req.body.zip, state: req.body.state, telephone: req.body.telephone,
                category: req.body.category, brand: req.body.brand, account_number: req.body.account_number,
                account_status: req.body.account_status, open_close: req.body.open_close, MarketId: req.body.marketId
            }).then((farmerData) => {
                console.log(farmerData);
                res.json({ success: true, farmerData: farmerData });
            }).catch(err => {
                res.json({ success: false, error: err });
            });
        } else { res.json(user); }

    }).catch(function (err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
    });
});

router.post("/api/shopper", (req, res) => {
    console.log(req.body);

    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function (user) {
        console.log(user);
        if (user) {
            db.Shopper.create(req.body).then(shopper => {
                res.json({ success: true, shopper });
            }).catch(err => {
                res.json({ success: false, error: err });
            });
        } else { res.json(user); }

    }).catch(function (err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
    });
});

router.post("/api/customer", (req, res) => {
    console.log("add c");

    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function (user) {
        console.log(user);
        if (user) {
            console.log("user if");
            db.Customer.create(req.body).then(customer => {
                res.json({ success: true, customer });
            }).catch(err => {
                res.json({ success: false, error: err });
            });
        } else { res.json(user); }

    }).catch(function (err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
    });



});

router.post("/api/payment_method", (req, res) => {
    db.PaymentMethod.create(req.body).then(paymentMethod => {
        res.json({ success: true, paymentMethod });
    }).catch(err => {
        res.json({ success: false, error: err });
    });
});

router.post("/api/order", (req, res) => {
    db.Order.create(req.body).then(order => {
        res.json({ success: true, order });
    }).catch(err => {
        res.json({ success: false, error: err });
    });
});

router.post("/api/order_detail", (req, res) => {
    db.OrderDetail.create(
        req.body
    ).then(order => {
        res.json({ success: true, order });
    }).catch(err => {
        res.json({ success: false, error: err });
    });
});


module.exports = router;