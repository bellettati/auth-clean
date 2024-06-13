import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user'
import { makeUser } from 'test/factories/make-user'
import { EmailAlreadyRegisteredDomainError } from '../errors/email-already-registered-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUserUseCase(usersRepository)
    })

    it('should register user', async () => {
        const result = await sut.execute({
            name: 'John Doe',
            email: 'john.doe@email.com',
            password: 'some_password',
        })

        expect(result.isRight()).toBeTruthy()
        expect(usersRepository.items[0]).toMatchObject({ name: 'John Doe' })
    })

    it('should not register user if email is already taken', async () => {
        const user = makeUser({ email: 'john.doe@email.com' })
        usersRepository.create(user)

        const result = await sut.execute({
            name: 'John Doe',
            email: 'john.doe@email.com',
            password: 'some_password',
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(EmailAlreadyRegisteredDomainError)
    })
})
