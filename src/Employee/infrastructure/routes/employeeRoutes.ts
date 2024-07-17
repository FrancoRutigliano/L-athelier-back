import { Router, Request, Response } from "express";
import { employeeRepositoryPrisma } from "../repository/employeeRepositoryPrisma";
import { employeeController } from "../controller/employeeController";
import { employeeUseCases } from "../../application/employeeUseCases";

const EmployeeRouter= Router();
const path ="/api/employee";

const EmployeeRepositoryPrisma = new employeeRepositoryPrisma();

const EmployeeUseCases = new employeeUseCases(EmployeeRepositoryPrisma);

const EmployeeController = new employeeController(EmployeeUseCases)


EmployeeRouter.post(`${path}/new`,(req:Request,res:Response) => {
    EmployeeController.createUser(req,res);
 });


export default EmployeeRouter