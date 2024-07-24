import { Router, Request, Response } from "express";
import { productRepositoryPrisma } from "../repository/productRepositoryPrisma";
import { productUseCase } from "../../application/productUseCases";
import { productController } from "../controller/productController";

const ProductRouter = Router();
const path ="/api/product"

const ProductRepositoryPrisma = new productRepositoryPrisma();

const ProductUseCases = new productUseCase(ProductRepositoryPrisma)

const ProductController = new productController(ProductUseCases);


ProductRouter.get(`${path}`, (req:Request,res:Response)=>{
    ProductController.getProducts(req,res);
})


ProductRouter.get(`${path}/:id`, (req:Request,res:Response)=>{
    ProductController.getProductById(req,res);
})


ProductRouter.post(`${path}/new`, (req:Request,res:Response)=>{
    ProductController.createProduct(req,res);
})


ProductRouter.patch(`${path}/edit/:id`, (req:Request,res:Response)=>{
    ProductController.editProduct(req,res);
})


ProductRouter.delete(`${path}/delete/:id`, (req:Request,res:Response)=>{
    ProductController.deleteProduct(req, res);
})

export default ProductRouter