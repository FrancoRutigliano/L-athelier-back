import { productRepository } from "../domain/productRepository";

export class productUseCase{
    constructor(private readonly productsRepository: productRepository){}

    public async getProducts():Promise<any>{

    }

    public async getProductById(id:string):Promise<any>{
        
    }

    public async createProduct(name:string):Promise<any>{
        
    }
    public async editProduct(id:string,name:string):Promise<any>{
        
    }

    public async deleteProduct(id:string):Promise<any>{
        
    }
}