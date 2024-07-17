import { Router, Request, Response } from "express";
import { employeeRepositoryPrisma } from "../repository/employeeRepositoryPrisma";
import { employeeUseCases  } from "../../application/employeeUseCases";
import { employeeController } from "../controller/employeeController";

const EmployeeRouter= Router();
const path ="/api/employee";

const EmployeeRepositoryPrisma = new employeeRepositoryPrisma();

const EmployeeUseCases = new employeeUseCases(EmployeeRepositoryPrisma);

const EmployeeController = new employeeController(EmployeeUseCases)


EmployeeRouter.post(`${path}/new`,(req:Request,res:Response) => {
    EmployeeController.createUser(req,res);
 });


export default EmployeeRouter