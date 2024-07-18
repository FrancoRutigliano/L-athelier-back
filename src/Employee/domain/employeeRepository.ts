import { employeeCreate } from "./dto/employeeCreate";
import { employeeOrderInput } from "./dto/employeeOrderInput";
import { employeeUpdate } from "./dto/employeeUpdate";
import { employeeEntity } from "./employeeEntity";


export interface employeeRepository{
    getEmployees(order?:employeeOrderInput): Promise<employeeEntity[]| null>;
    getEmployeeById(id:string) : Promise<employeeEntity | null>;
    createEmployee(employee:employeeCreate):Promise<employeeEntity|null>;
    editEmployee(id:string,employee:employeeUpdate):Promise<employeeEntity|null>;
    deleteEmployee(id:string):Promise<employeeEntity | null>
}