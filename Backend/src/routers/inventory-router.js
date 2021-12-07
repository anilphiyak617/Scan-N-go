const express = require("express");
const Inventory = require("../models/Inventory");
const auth = require("../middlewares/authentication");
//!------ROUTES
const router = new express.Router();
//!------READ
router.get("/user/inventory/code", auth, async (req, res) => {
  try {
    const { uid } = req.body;
    //*********finding required product data in inventory*/
    const product = await Inventory.findOne({ uid, owner: req.user._id });
    if (!product) res.status(404).send("product not found");
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});
//**? READ all products */
router.get("/user/inventory", auth, async (req, res) => {
  try {
    //*********finding required product data in inventory*/
    const product = await Inventory.find({ owner: req.user._id });
    if (!product) res.status(404).send("product not found");
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});
//!------ADD
router.post("/user/inventory/add", auth, async (req, res) => {
  //***create new product */
  const productData = { ...req.body, owner: req.user._id };
  const newProduct = new Inventory(productData);
  try {
    const product = await newProduct.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send();
  }
});
//!------UPDATE
router.patch("/user/inventory/update", auth, async (req, res) => {
  const uid = req.body.uid;

  try {
    const product = await Inventory.findOne({ uid, creator: req.user._id });
    if (!product) {
      res.status(404).send();
    }
    //***update product */
    const updates = Object.keys(req.body);
    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    //*--response
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send();
  }
});
//!------------DELETE
router.delete("/user/inventory/delete/:uid", auth, async (req, res) => {
  const uid = req.params.uid;
  try {
    const product = await Inventory.findOne({ uid, owner: req.user._id });
    await product.remove();
    res.status(200).send("product deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
