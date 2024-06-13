import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { EmailAlreadyRegisteredDomainError } from '../errors/email-already-registered-error'
import { UsersRepository } from '../repositories/users-repository'

interface RegisterUserUseCaseInput {
    name: string
    email: string
    password: string
}

type RegisterUserUseCaseOutput = Either<
    EmailAlreadyRegisteredDomainError,
    { user: User }
>

export class RegisterUserUseCase {
    private usersRepository: UsersRepository

    constructor({ usersRepository }: { usersRepository: UsersRepository }) {
        this.usersRepository = usersRepository
    }

    async execute({
        name,
        email,
        password,
    }: RegisterUserUseCaseInput): Promise<RegisterUserUseCaseOutput> {
        const emailIsRegistered = await this.usersRepository.findByEmail(email)

        if (emailIsRegistered) {
            return left(new EmailAlreadyRegisteredDomainError())
        }

        const user = User.create({ name, email, password })

        await this.usersRepository.create(user)

        return right({ user })
    }
}
