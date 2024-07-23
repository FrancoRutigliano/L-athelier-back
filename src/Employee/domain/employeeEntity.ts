export interface employeeEntity{
    id: string,
    name:string,
    lastName:string,
    email:string,
    password?:string,
    role:boolean,
    createdAt :Date
}