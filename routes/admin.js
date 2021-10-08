const express = require("express");
const router = express.Router();

// Import controllers
const productController = require("../controllers/product");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");


// Auth Routes
router.post("/addProduct", 
            authController.authorization,
            authController.checkRoleAdmin, 
            productController.create);
router.get("/getAllProduct", 
            authController.checkRoleAdmin, 
            (productController.getAll));
router.get("/getSingleProduct/:id", 
            authController.checkRoleAdmin,
            (productController.getSingle));
router.put("/updateProduct/:id", 
            authController.checkRoleAdmin,
            productController.update);
router.delete("/deleteProduct/:id", 
            authController.checkRoleAdmin, 
            productController.delete);

router.post("/blockUser", 
            authController.checkRoleAdmin,
            userController.blockUser)
router.get("/userList", 
            authController.checkRoleAdmin,
            userController.userList)

// Export Router
module.exports = router;