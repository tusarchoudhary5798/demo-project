const express = require("express");
const router = express.Router();

// Import controllers
const productController = require("../controllers/product");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");



// Auth Routes
router.post("/payment", userController.payment);
router.put("/updateUserProfile/", 
            authController.authorization,
            userController.updateProfile);
router.post("/addToCart/", 
            authController.authorization,
            userController.addToCart);

// Export Router
module.exports = router;