import { Result } from "../../../shared/infrastructure/result/result";
import { sessionUseCase } from "../../application/sessionUseCases";
import { Request,Response } from "express";

export class sessionController{
    constructor(private readonly sessionUseCase:sessionUseCase){}

    public login=async (req:Request,res:Response)=>{
       const {email,password}= req.body;
       const result = await this.sessionUseCase.login(email,password);

        if (result.isSuccess) { 
            const token = result.value;
            const cookies = res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 14 * 24 * 60 * 60 * 1000,
                
            });

            if (token !== undefined){
                let resultRole = await this.sessionUseCase.decodeJwt(token);

                return res.status(resultRole.statusCode).json({ 'role': resultRole.value, 'details': true });
            }
        } 

        return res.status(result.statusCode).json({'message': result.error, 'details': false});
    }
    
}