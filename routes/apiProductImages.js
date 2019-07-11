const uuidv4 = require('uuid/v4');
const fs = require("fs");
const AWS = require('aws-sdk');
const model = require("../models");
const router = require("express").Router();


const BUCKET_NAME = "fnf2020"
const BUCKET_BASE_URL = `https://fnf2020.s3.us-east-2.amazonaws.com/${BUCKET_NAME}`;


AWS.config.update({
  accessKeyId: "AKIAIKF5LFN4QYLKE3UQ",
  secretAccessKey: "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",
  subregion: 'us-east-2'
});

// AWS S3
const S3 = new AWS.S3();

router.post("/api/product", (req, res) => {
  console.log("enter post");
  let newProduct = req.body;
  const buffer = new Buffer.from(
    newProduct.file.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
  const pictureName = uuidv4() + '-product';
  S3.putObject({
    Bucket: BUCKET_NAME,
    Key: pictureName,
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: 'image/png',
    ContentDisposition: 'inline',
    ACL: 'public-read'
  }, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log("image loaded");
    console.log(data);
    const newProductRow = {
      name: newProduct.name,
      price: newProduct.price,
      price_per: newProduct.price_per,
      picture_name: pictureName,
      picture_url: `${BUCKET_BASE_URL}/${pictureName}`,
      FarmerId: newProduct.FarmerId
    }
    console.log(newProductRow);
    model.Product.create(
      newProductRow
    ).then((product) => {
      console.log(product);
      return ({ success: true, product });
    }).catch(err => {
      return ({ success: false, error: err });
    });

  });
});

function deleteProduct(oldProduct) {
  S3.deleteObject({
    Bucket: '${BUCKET_NAME}',
    Key: oldProduct
  }, err => {
    if (err) return reject(err);
  });
}

module.exports = router;
