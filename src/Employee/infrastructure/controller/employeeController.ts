import { Request,Response } from "express";
import { employeeUseCases } from "../../application/employeeUseCases";

export class employeeController{
    constructor(private employeeUseCase: employeeUseCases){}

    public createUser= async(req:Request, res:Response)=>{
        const {name, lastName,email, role}= req.body;
        const employeeCreated = await this.employeeUseCase.createEmployee(name,lastName,email,role);
        console.log(employeeController);
    }
}