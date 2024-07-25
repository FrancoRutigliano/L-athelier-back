export interface clientEntity{
    id:string
    fullName:  string
    email: string | null | undefined;
    descriptionProducts?:string | null | undefined
    createdAt: Date
    updatedAt: Date
}