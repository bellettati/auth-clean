import { UsersRepository } from '@/domain/auth/application/repositories/users-repository'
import { RegisterUserUseCase } from '@/domain/auth/application/use-cases/register-user'

declare module '@fastify/awilix' {
    interface Cradle {
        usersRepository: UsersRepository
        registerUserUseCase: RegisterUserUseCase
        registerUserController: RegisterUserController
    }
}
