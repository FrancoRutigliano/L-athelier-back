//import { Prisma } from "@prisma/client";
import { prisma } from "../../../shared/infrastructure/data/prisma";
import { employeeCreate } from "../../domain/dto/employeeCreate";
//import { employeeOrderInput } from "../../domain/dto/employeeOrderInput";
import { employeeUpdate } from "../../domain/dto/employeeUpdate";
import { employeeEntity } from "../../domain/employeeEntity";
import { employeeRepository } from "../../domain/employeeRepository";


export class employeeRepositoryPrisma implements employeeRepository{
    
    
    // async getEmployees(order?: employeeOrderInput): Promise<employeeEntity[] | null> {
    //     let orderBy: Prisma.EmployeeOrderByWithRelationInput | undefined;

    //     if (order) {
    //         orderBy = {
    //             [order.sort]: order.order,
    //         };
    //     }

    //     const employees = await prisma.employee.findMany({
    //         orderBy, // Si orderBy es undefined, no se aplica ordenamiento
    //     });

    //     return employees;
    // }

    async getEmployeeById(id: string): Promise<employeeEntity | null> {  
        return await prisma.employee.findUnique({
            where:{
                id:id,
            }
        })
    }

    async getEmployeeByEmail(email: string): Promise<employeeEntity | null> {
        return await prisma.employee.findUnique({
            where:{
                email:email
            }
        })
    }
    async  createEmployee(employee: employeeCreate): Promise<employeeEntity | null> {
        return await prisma.employee.create(
            { data:employee }
        )
    }
    async editEmployee(id:string, employee: employeeUpdate): Promise<employeeEntity | null> {
        return await prisma.employee.update({
            where:{id:id},
            data: employee,
        })
    }

    async  deleteEmployee(id: string): Promise<employeeEntity | null> {
        return await prisma.employee.delete({
        where:{id:id}
       })
    }
    
}