import Fastify from 'fastify'
import { ZodError } from 'zod'
import { HttpError } from '@/core/errors/http-error'
import { usersRoutes } from './routes/users-routes'
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix'
import { asClass } from 'awilix'
import { RegisterUserController } from './controllers/register-user'
import { RegisterUserUseCase } from '@/domain/auth/application/use-cases/register-user'
import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users-repository'

const app = Fastify()

app.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
})

diContainer.register({
    registerUserController: asClass(RegisterUserController),
    registerUserUseCase: asClass(RegisterUserUseCase),
    usersRepository: asClass(PrismaUsersRepository),
})

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })
    }

    if (error instanceof HttpError) {
        return reply.status(error.statusCode).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})

app.register(usersRoutes)

export { app }
