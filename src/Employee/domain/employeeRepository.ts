import { employeeCreate } from "./dto/employeeCreate";
import { employeeUpdate } from "./dto/employeeUpdate";
import { employeeEntity } from "./employeeEntity";

export interface employeeRepository{
    getEmployees(): Promise<employeeEntity[]| null>;
    getEmployeeById(id:number) : Promise<employeeEntity | null>;
    createEmployee(employee:employeeCreate):Promise<employeeEntity|null>;
    editEmployee(employee:employeeUpdate):Promise<employeeEntity|null>;
}