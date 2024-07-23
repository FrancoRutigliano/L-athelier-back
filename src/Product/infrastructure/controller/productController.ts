import { Request, Response } from "express";
import { productUseCase } from "../../application/productUseCases";

export class productController {
  constructor(private readonly productUseCases: productUseCase) {}

  public getProducts = async (req: Request, res: Response) => {
    const result = await this.productUseCases.getProducts();

    if (result.isSuccess) {
      return res
        .status(result.statusCode)
        .json({ message: result.value, details: true });
    }
    return res
      .status(result.statusCode)
      .json({ message: result.value, details: false });
  };

  public getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.productUseCases.getProductById(id);

    if (result.isSuccess) {
      return res.status(result.statusCode).json({ message: result.value, details: true });
    }
    return res.status(result.statusCode).json({ message: result.value, details: false });
  };

  public createProduct = async (req: Request, res: Response) => {
    const {name}=req.body
    const result = await this.productUseCases.createProduct(name);
    
    if(result.isSuccess){
        return res.status(result.statusCode).json({message:result.value,details:true})
    }
    return res.status(result.statusCode).json({ message: result.value, details: false });
  };

  public editProduct = async (req: Request, res: Response) => {
    const{id}=req.params
    const {name}= req.body
    const result = await this.productUseCases.editProduct(id,name);

    if(result.isSuccess){
        return res.status(result.statusCode).json({message:result.value,details:true})
    }
    return res.status(result.statusCode).json({ message: result.value, details: false });
  };

  public deleteProduct = async (req: Request, res: Response) => {
    const{id}=req.params
    const result = await this.productUseCases.deleteProduct(id);

    if(result.isSuccess){
        return res.status(result.statusCode).json({message:result.value,details:true})
    }
    return res.status(result.statusCode).json({ message: result.value, details: false });
  };
}
