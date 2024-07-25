import { Result } from "../../../shared/infrastructure/result/result";
import { sessionUseCase } from "../../application/sessionUseCases";
import { Request,Response } from "express";

export class sessionController{
    constructor(private readonly sessionUseCase:sessionUseCase){}

    public login=async (req:Request,res:Response)=>{
       const {email,password}= req.body;
       const result = await this.sessionUseCase.login(email,password);

        if (result.isSuccess) { 
            return res.status(result.statusCode).json({'message': result.value, 'details': true});
        } 

        return res.status(result.statusCode).json({'message': result.error, 'details': false});
    }
    
}