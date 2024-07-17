
import { employeeCreate } from "../domain/dto/employeeCreate";
import { employeeEntity } from "../domain/employeeEntity";
import { employeeRepository } from "../domain/employeeRepository";

export class employeeUseCases {
    constructor(private readonly employeeRepositoy: employeeRepository){}

    public async createEmployee(name:string, lastName:string,email:string, role:boolean){
        const employee:employeeCreate={
            name,
            lastName,
            email,
            role
        }
        const employeeCreated = await this.employeeRepositoy.createEmployee(employee)
        return employeeCreated;
    }
}