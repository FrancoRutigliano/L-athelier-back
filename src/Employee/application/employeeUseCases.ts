
import { Result } from "../../shared/infrastructure/result/result";
import { employeeCreate } from "../domain/dto/employeeCreate";
//import { employeeOrderInput } from "../domain/dto/employeeOrderInput";
import { employeeUpdate } from "../domain/dto/employeeUpdate";
import { employeeUpdatePassword } from "../domain/dto/employeeUpdatePassword";
import { employeeEntity } from "../domain/employeeEntity";
//import { employeeEntity } from "../domain/employeeEntity";
import { employeeRepository } from "../domain/employeeRepository";
import bcrypt from "bcrypt"
export class employeeUseCases {
    constructor(private readonly employeeRepository: employeeRepository){}


    public async getEmployees() : Promise<Result<employeeEntity[]>> {
        const employees = await this.employeeRepository.getEmployees();

        if (!employees) {
            return Result.failure("Employees not found", 404);
        }

        return Result.success(employees, 200);
    }

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

        if (find) {
            return Result.failure("Email already in use", 400);
        }
            
        const employeeCreated = await this.employeeRepository.createEmployee(employee)
        
        if (employeeCreated == null) {
            return Result.failure("Oops, something went wrong", 500);
        }

        return Result.success(employeeCreated, 201);

    }


    public async editEmployee(id:string,name:string, lastName:string, email:string, role:boolean): Promise<Result<employeeEntity>> {

        const find = await this.employeeRepository.getEmployeeById(id);
        
        if(!find){
            return Result.failure("Employee not found", 404);
        }

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
        const find = await this.employeeRepository.getEmployeeById(id);
        
        if(!find){
            return Result.failure("Employe not found",404)
        }

        const employeeDeleted = await this.employeeRepository.deleteEmployee(id)

        if (!employeeDeleted) {
            return Result.failure("Oops, something went wrong", 500);
        }

        return Result.success(employeeDeleted, 200);
    }


    public async editPassword(email:string,newPassword:string):Promise<Result<employeeEntity>>{
        const find = await this.employeeRepository.getEmployeeByEmail(email);
        
        if(!find){
            return Result.failure("Employe not found",404)
        }
        
        const hashPass = await this.encriptPassword(newPassword);
        if (!hashPass.isSuccess) {
            return Result.failure(hashPass.error!, hashPass.statusCode);
        }
        
        const employee:employeeUpdatePassword={
            password:hashPass.value!
        }

        const employeeUpdated= await this.employeeRepository.editPassword(email,employee);

        if (!employeeUpdated) {
            return Result.failure("Oops, something went wrong", 500);
        }

        return Result.success(employeeUpdated,200);
    }


    private async encriptPassword(password:string):Promise<Result<string>>{
            const passwordHashed = await bcrypt.hash(password, 10);
            if (passwordHashed) {
                return Result.success(passwordHashed, 200);
            }
            return Result.failure("Oops, something went wrong", 500);
    }
}