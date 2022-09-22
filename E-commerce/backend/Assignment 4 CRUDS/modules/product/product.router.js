import { Router } from "express";
import { addProduct,  getProducts, changeProduct, getProductByID, getProductsByFilter} from './controller/product.js';

const router = Router();

router.post('/addproduct',addProduct);
router.get('/allproducts',getProducts);
router.put('/:id',changeProduct);
router.delete('/:id',changeProduct);
router.get('/:id',getProductByID);
router.get('',getProductsByFilter);


export default router;