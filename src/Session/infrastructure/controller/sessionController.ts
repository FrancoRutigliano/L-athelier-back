import { sessionUseCase } from "../../application/sessionUseCases";
import { Request,Response } from "express";

export class sessionController{
    constructor(private readonly sessionUseCase:sessionUseCase){}

    public login=async (req:Request,res:Response)=>{
       const {email,password}= req.body;
       const token = await this.sessionUseCase.login(email,password);
       res.status(200).json({message:token,details:"true"})
    }

}