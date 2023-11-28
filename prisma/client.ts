// i dont write this code just copy from "Best practice for instantiating PrismaClient with Next.js"
// so dont touch it
//Lots of users have come across this warning while working with Next.js in development:
//warn(prisma-client) There are already 10 instances of Prisma Client actively running.
//////The solution in this//////
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma