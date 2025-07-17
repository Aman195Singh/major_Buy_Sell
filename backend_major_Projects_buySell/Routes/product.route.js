const express = require("express")
const router = express.Router();
const auth = require("../Middleware/auth.middleware")
const upload = require("../Middleware/upload")
const productController = require("../Controllers/product.controller");

// const{
//     listProduct,
//     getAllProduct,
//     getProductById,
//     updateProduct,
//     deleteProduct} = require("./Controllers/product.controller")

// const router =express.Router();

// router.post("/",listProduct)
router.post("/",auth,upload.single("image"),productController.createProduct);
// router.get("/",getAllProduct)
router.get("/",productController.getAllProduct)
// router.get("/:id",getProductById)
router.get("/:id",productController.getProductById)
// router.get("/:id",updateProduct)
router.get("/user/my",auth,productController.getMyProduct);
// router.get("/:id",deleteProduct)


router.put(
    '/:id',
    auth,
    upload.single("image"),
    productController.updateProduct
)

router.delete("/:id",auth,productController.deleteProduct);
router.get("/searchCategory",productController.searchByCategory);

module.exports = router;
    
