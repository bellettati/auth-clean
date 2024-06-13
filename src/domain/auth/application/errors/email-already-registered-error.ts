import { UseCaseError } from '@/core/errors/use-case-errors'

export class EmailAlreadyRegisteredDomainError
    extends Error
    implements UseCaseError
{
    constructor() {
        super('Email already registered.')
    }
}
