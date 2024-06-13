import { EmailAlreadyRegisteredDomainError } from '@/domain/auth/application/errors/email-already-registered-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { EmailAlreadyRegisteredHttpError } from '../errors/email-already-registered-http-error'
import { BadRequestHttpError } from '../errors/bad-request-http-error'
import { RegisterUserUseCase } from '@/domain/auth/application/use-cases/register-user'

export class RegisterUserController {
    private registerUserUseCase: RegisterUserUseCase

    constructor({
        registerUserUseCase,
    }: {
        registerUserUseCase: RegisterUserUseCase
    }) {
        this.registerUserUseCase = registerUserUseCase
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
        })

        const { name, email, password } = bodySchema.parse(request.body)

        const result = await this.registerUserUseCase.execute({
            name,
            email,
            password,
        })

        if (result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                case EmailAlreadyRegisteredDomainError:
                    throw new EmailAlreadyRegisteredHttpError()
                default:
                    throw new BadRequestHttpError()
            }
        }

        return reply.status(201).send()
    }
}
