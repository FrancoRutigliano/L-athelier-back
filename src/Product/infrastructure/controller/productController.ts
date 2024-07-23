import { Request,Response } from "express";
import { productUseCase } from "../../application/productUseCases";

export class productController {
    constructor(private readonly productUseCases: productUseCase){}

    public getProducts=async(req:Request,res:Response)=>{

    }
    
    public getProductById=async(req:Request,res:Response)=>{
        
    }

    public createProduct=async(req:Request,res:Response)=>{
        
    }

    public editProduct=async(req:Request,res:Response)=>{
        
    }

    public deleteProduct=async(req:Request,res:Response)=>{
        
    }

}