import { productCreate } from "./dto/productCreate";
import { productUpdate } from "./dto/productUpdate";
import { productEntity } from "./productEntity";

export interface productRepository{
    getProducts():Promise<productEntity[]|null>
    getProductById(id:string):Promise<productEntity|null>
    createProduct(product:productCreate):Promise<productEntity>
    editProduct(id:string, product: productUpdate):Promise<productEntity |null>
    deleteProduct(id:string):Promise<productEntity|null>
}