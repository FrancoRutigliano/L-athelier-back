
import { employeeCreate } from "../domain/dto/employeeCreate";
//import { employeeOrderInput } from "../domain/dto/employeeOrderInput";
import { employeeUpdate } from "../domain/dto/employeeUpdate";
//import { employeeEntity } from "../domain/employeeEntity";
import { employeeRepository } from "../domain/employeeRepository";

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

    public async getEmployeeById(id:string){
        const employee=  await this.employeeRepository.getEmployeeById(id);
        return employee;
    }

    public async createEmployee(name:string, lastName:string,email:string, role:boolean){
        const employee:employeeCreate={
            name,
            lastName,
            email,
            role
        }
        const employeeCreated = await this.employeeRepository.createEmployee(employee)
        return employeeCreated;
    }


    public async editEmployee(id:string,name:string, lastName:string, email:string, role:boolean){
        const employe: employeeUpdate={
            name,
            lastName,
            email,
            role
        }

        const employeeUpdated = await this.employeeRepository.editEmployee(id,employe)
        return employeeUpdated
    }

    public async deleteEmployee(id:string){
        const employeeDeleted = await this.employeeRepository.deleteEmployee(id)
        return employeeDeleted;
    }
}