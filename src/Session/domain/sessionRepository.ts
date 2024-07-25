import { employeeEntity } from "../../Employee/domain/employeeEntity"
import { sessionLogin } from "./dto/sessionLogin"

export interface sessionRepository{
    login(employee:sessionLogin):Promise<employeeEntity|null>
    
}