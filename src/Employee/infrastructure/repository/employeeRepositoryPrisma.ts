//import { prisma } from "../../../shared/infrastructure/data/prisma";
import { employeeCreate } from "../../domain/dto/employeeCreate";
import { employeeUpdate } from "../../domain/dto/employeeUpdate";

import { employeeEntity } from "../../domain/employeeEntity";
import { employeeRepository } from "../../domain/employeeRepository";

export class employeeRepositoryPrisma implements employeeRepository{

    
    
    async getEmployees(): Promise<employeeEntity[] | null> {
        throw new Error("Method not implemented.");
    }
    async getEmployeeById(id: number): Promise<employeeEntity | null> {
        throw new Error("Method not implemented.");
    }
    async  createEmployee(employee: employeeCreate): Promise<employeeEntity | null> {
        throw new Error("Method not implemented.");
    }
    async editEmployee(employee: employeeUpdate): Promise<employeeEntity | null> {
        throw new Error("Method not implemented.");
    }
    
}