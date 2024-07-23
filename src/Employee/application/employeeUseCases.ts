
import { Result } from "../../shared/infrastructure/result/result";
import { employeeCreate } from "../domain/dto/employeeCreate";
//import { employeeOrderInput } from "../domain/dto/employeeOrderInput";
import { employeeUpdate } from "../domain/dto/employeeUpdate";
import { employeeEntity } from "../domain/employeeEntity";
//import { employeeEntity } from "../domain/employeeEntity";
import { employeeRepository } from "../domain/employeeRepository";
import bcrypt from "bcrypt"
export class employeeUseCases {
    constructor(private readonly employeeRepository: employeeRepository){}


    // public async getEmployees(sort?: "name" | "lastname" | "email" | "role", order?: "asc" | "desc"): Promise<employeeEntity[] | null> {
    //     let employees: employeeEntity[] | null = null;

    //     if (sort && order) {
    //         const orderBy: employeeOrderInput = {
    //             sort:sort,
    //             order: order
    //         };

    //         employees = await this.employeeRepository.getEmployees(orderBy)
    //     } else {
    //         employees = await this.employeeRepository.getEmployees();
    //     }

    //     return employees ?? []; // Return an empty array if employees is null
    // }

    public async getEmployeeById(id:string): Promise<Result<employeeEntity>> {
        const employee =  await this.employeeRepository.getEmployeeById(id);

        if (!employee) {
            return Result.failure("Employee not found", 404);
        }

        return Result.success(employee, 200);
    }

    public async createEmployee(name:string, lastName:string,email:string, role:boolean, password:string): Promise<Result<employeeEntity>> {
        const hashPass = await this.encriptPassword(password);
        if (!hashPass.isSuccess) {
            return Result.failure(hashPass.error!, hashPass.statusCode);
        }
        const employee:employeeCreate={
            name:name,
            lastName:lastName,
            email:email,
            password: hashPass.value!,
            role:role,
        }

        const find = await this.employeeRepository.getEmployeeByEmail(email)

        if (!find) {
            return Result.failure("Email already in use", 400);
        }
            
        const employeeCreated = await this.employeeRepository.createEmployee(employee)
        
        if (employeeCreated == null) {
            return Result.failure("Oops, something went wrong", 500);
        }

        return Result.success(employeeCreated, 201);

    }


    public async editEmployee(id:string,name:string, lastName:string, email:string, role:boolean): Promise<Result<employeeEntity>> {
        const employe: employeeUpdate={
            name,
            lastName,
            email,
            role
        }

        const employeeUpdated = await this.employeeRepository.editEmployee(id,employe)
        if (!employeeUpdated) {
            return Result.failure("Oops, something went wrong", 500);
        }

        return Result.success(employeeUpdated, 200);
    }

    public async deleteEmployee(id:string): Promise<Result<employeeEntity>> {
        const employeeDeleted = await this.employeeRepository.deleteEmployee(id)

        if (!employeeDeleted) {
            return Result.failure("Oops, something went wrong", 500);
        }

        return Result.success(employeeDeleted, 200);
    }



    private async encriptPassword(password:string):Promise<Result<string>>{
            const passwordHashed = await bcrypt.hash(password, 10);
            if (passwordHashed) {
                return Result.success(passwordHashed, 200);
            }
            return Result.failure("Oops, something went wrong", 500);
    }
}