import { Router, Request, Response } from "express";
import { employeeRepositoryPrisma } from "../repository/employeeRepositoryPrisma";
import { employeeController } from "../controller/employeeController";
import { employeeUseCases } from "../../application/employeeUseCases";
import { verifySessionAdmin } from "../../../shared/infrastructure/middlewares/authAdmin/midlewareAdminJWT";

const EmployeeRouter= Router();
const path ="/api/employee";

const EmployeeRepositoryPrisma = new employeeRepositoryPrisma();

const EmployeeUseCases = new employeeUseCases(EmployeeRepositoryPrisma);

const EmployeeController = new employeeController(EmployeeUseCases)

EmployeeRouter.get(`${path}`, verifySessionAdmin,(req: Request, res: Response) => {
   EmployeeController.getEmployees(req, res);
})

 EmployeeRouter.get(`${path}/:id`, verifySessionAdmin,(req:Request,res:Response) => {
    EmployeeController.getEmployeeById(req,res);
 });


EmployeeRouter.post(`${path}/new`,(req:Request,res:Response) => {
    EmployeeController.createEmployee(req,res);
 });

 
 EmployeeRouter.patch(`${path}/edit/:id`, verifySessionAdmin,(req:Request,res:Response) => {
    EmployeeController.editEmployee(req,res);
 });

 
 EmployeeRouter.delete(`${path}/delete/:id`, verifySessionAdmin,(req:Request,res:Response) => {
    EmployeeController.deleteEmployee(req,res);
 });

 EmployeeRouter.patch(`${path}/change/password`,(req:Request,res:Response) => {
   EmployeeController.editPassword(req,res);
});

 export default EmployeeRouter