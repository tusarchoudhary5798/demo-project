const express = require("express");
const router = express.Router();

// Import controllers
const productController = require("../controllers/product");
const userController = require("../controllers/user");



// Auth Routes
router.post("/payment", userController.payment);
router.put("/updateUserProfile/:id", userController.updateProfile);
router.post("/addToCart/:id", userController.addToCart);

// Export Router
module.exports = router;