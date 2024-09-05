import { PrismaClient } from '@prisma/client'

// Crear una instancia del cliente Prisma
const client = new PrismaClient()

// Exportar la instancia para usarla en otros módulos
export default client
