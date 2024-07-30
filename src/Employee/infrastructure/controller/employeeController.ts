import { Request,Response } from "express";
import { employeeUseCases } from "../../application/employeeUseCases";
//import { employeeEntity } from "../../domain/employeeEntity";

export class employeeController{
    constructor(private employeeUseCase: employeeUseCases){}
    
    public getEmployees = async (req: Request, res: Response) => {
        const result = await this.employeeUseCase.getEmployees();
        if (result.isSuccess) {
            return res.status(result.statusCode).json({ 'message': result.value, 'details': true });
        }
        return res.status(result.statusCode).json({ 'message': result.error, 'details': false });
    }
    
    public getEmployeeById=async (req:Request, res:Response)=>{
        const {id} = req.params;
        const result = await this.employeeUseCase.getEmployeeById(id)
        
        if (result.isSuccess) {
            return res.status(result.statusCode).json({'message': result.value, 'details': true});
        }
        return res.status(result.statusCode).json({'message': result.error, 'details': false});
    }
    
    public createEmployee= async(req:Request, res:Response)=>{
        const {name, lastName,email,password, role,}= req.body;
        const result = await this.employeeUseCase.createEmployee(name,lastName,email,role,password);
        
        if (result.isSuccess) {
            return res.status(result.statusCode).json({'message': result.value, 'details': true});
        }
        return res.status(result.statusCode).json({'message': result.error, 'details': false});
    }
    
    public editEmployee=async (req:Request,res:Response)=>{
        const {id}= req.params;
        const {name, lastName,email, role}= req.body;
        const result = await this.employeeUseCase.editEmployee(id,name, lastName,email,role)
        
        if (result.isSuccess) {
            return res.status(result.statusCode).json({'message': result.value, 'details': true});
        }
        
        return res.status(result.statusCode).json({'message': result?.error, 'details': false});
        
    }
    
    public deleteEmployee = async(req:Request,res:Response)=>{
        const {id}= req.params;
        const result = await this.employeeUseCase.deleteEmployee(id);
        if(result.isSuccess) {
            return res.status(result.statusCode).json({'message': result.value, 'details': true});
        }
        
        return res.status(result.statusCode).json({'message': result.error, 'details': false});
    }



    public editPassword=async (req:Request,res:Response) =>{
       const {email,newPassword} =req.body
       const result= await this.employeeUseCase.editPassword(email,newPassword);

       if(result.isSuccess){
        return res.status(result.statusCode).json({'message': result.value, 'details': true});
       }
       return res.status(result.statusCode).json({'message': result.error, 'details':false});
       
    }

    private isValidSort(sort:any): sort is "name" | "lastname" | "email" | "role" {
        const lowerCaseSort = sort.toLowerCase();
        return ["name", "lastname", "email", "role"].includes(lowerCaseSort);
    }
    
    private isValidOrder(order: any): order is "asc" | "desc" {
        const lowerCaseOrder = order.toLowerCase();
        return ["asc", "desc"].includes(lowerCaseOrder);
    }
}