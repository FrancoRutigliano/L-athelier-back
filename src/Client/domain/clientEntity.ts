export interface clientEntity{
    id:string
    fullName:  string
    descriptionProducts?:string | null | undefined
    phone?: string | null | undefined 
    createdAt: Date
    updatedAt: Date
}