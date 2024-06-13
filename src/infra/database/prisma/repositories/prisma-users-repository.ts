import { UsersRepository } from '@/domain/auth/application/repositories/users-repository'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { User } from '@/domain/auth/enterprise/entities/user'
import { prisma } from '../prisma-client'

export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user)
    }

    async create({ name, email, password }: User) {
        const user = User.create({
            name,
            email,
            password,
        })

        await prisma.user.create({ data: PrismaUserMapper.toRaw(user) })
    }
}
