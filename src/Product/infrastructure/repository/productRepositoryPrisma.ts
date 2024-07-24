import { prisma } from "../../../shared/infrastructure/data/prisma";
import { productCreate } from "../../domain/dto/productCreate";
import { productUpdate } from "../../domain/dto/productUpdate";
import { productEntity } from "../../domain/productEntity";
import { productRepository } from "../../domain/productRepository";

export class productRepositoryPrisma implements productRepository{
    
    async getProducts(): Promise<productEntity[] | null> {
       return await prisma.product.findMany()
    }
    async getProductById(id: string): Promise<productEntity | null> {
        return await prisma.product.findUnique({
            where:{
                id:id
            }
        })
    }

    async findProductByName(name: string): Promise<productEntity | null> {
        return await prisma.product.findFirst({
            where:{
                name:name
            }
        })
    }
    async createProduct(product: productCreate): Promise<productEntity> {
        return await prisma.product.create(
            {data:product}
        )
    }
    async editProduct(id: string, product: productUpdate): Promise<productEntity | null> {
        return prisma.product.update({
            where:{id:id},
                 data:product
        })
    }
    async deleteProduct(id: string): Promise<productEntity | null> {
        return await prisma.product.delete({
            where:{id:id}
        })
    }

}