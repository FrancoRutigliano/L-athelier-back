import { employeeEntity } from "../../../Employee/domain/employeeEntity";
import { prisma } from "../../../shared/infrastructure/data/prisma";
import { sessionLogin } from "../../domain/dto/sessionLogin";
import { sessionRepository } from "../../domain/sessionRepository";

export class sessionRepositoryPrisma implements sessionRepository{
    login(employee: sessionLogin): Promise<employeeEntity | null> {
        return prisma.employee.findUnique({
            where:{
                email:employee.email
            }
        })
    }
} 