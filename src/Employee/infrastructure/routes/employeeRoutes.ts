import { Router, Request, Response } from "express";
import { employeeRepositoryPrisma } from "../repository/employeeRepositoryPrisma";
import { employeeController } from "../controller/employeeController";
import { employeeUseCases } from "../../application/employeeUseCases";

const EmployeeRouter= Router();
const path ="/api/employee";

const EmployeeRepositoryPrisma = new employeeRepositoryPrisma();

const EmployeeUseCases = new employeeUseCases(EmployeeRepositoryPrisma);

const EmployeeController = new employeeController(EmployeeUseCases)


// EmployeeRouter.get(`${path}`,(req:Request,res:Response) => {
//     EmployeeController.getEmployees(req,res);
//  });


 EmployeeRouter.get(`${path}/:id`,(req:Request,res:Response) => {
    EmployeeController.getEmployeeById(req,res);
 });


EmployeeRouter.post(`${path}/new`,(req:Request,res:Response) => {
    EmployeeController.createEmployee(req,res);
 });

 
 EmployeeRouter.patch(`${path}/edit/:id`,(req:Request,res:Response) => {
    EmployeeController.editEmployee(req,res);
 });

 
 EmployeeRouter.delete(`${path}/delete/:id`,(req:Request,res:Response) => {
    EmployeeController.deleteEmployee(req,res);
 });

 export default EmployeeRouter