import { Request,Response } from "express";
import { employeeUseCases } from "../../application/employeeUseCases";
//import { employeeEntity } from "../../domain/employeeEntity";

export class employeeController{
    constructor(private employeeUseCase: employeeUseCases){}

    // public getEmployees=async(req:Request,res:Response)=>{
    //     const {sort,order}=req.query;

    //     let employees:employeeEntity[]=[];
        
    //     if(sort&&order&& this.isValidSort(sort)&& this.isValidOrder(order)){
    //         employees= await this.employeeUseCase.getEmployees(sort,order)??[];
    //     }else{
    //         employees = await this.employeeUseCase.getEmployees()??[];
    //     }

    //     return employees;
    // }

    public getEmployeeById=async (req:Request, res:Response)=>{
        const {id} = req.params;
        const employee = await this.employeeUseCase.getEmployeeById(id)
        res.status(200).json(employee);
    }

    public createEmployee= async(req:Request, res:Response)=>{
        const {name, lastName,email,password, role,}= req.body;
        const employeeCreated = await this.employeeUseCase.createEmployee(name,lastName,email,role,password);
        console.log(employeeCreated);
        res.status(201).json({'message':employeeCreated});
    }

    public editEmployee=async (req:Request,res:Response)=>{
        const {id}= req.params;
        const {name, lastName,email, role}= req.body;
        const employeEdited = await this.employeeUseCase.editEmployee(id,name, lastName,email,role)
        res.status(200).json(employeEdited);
    }

    public deleteEmployee = async(req:Request,res:Response)=>{
        const {id}= req.params;
        const employeeDeleted = await this.employeeUseCase.deleteEmployee(id);
        res.status(200).json({'message':'employee deleted successfully'});
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