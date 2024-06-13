import { HttpError } from '@/core/errors/http-error'

export class EmailAlreadyRegisteredHttpError extends HttpError {
    constructor() {
        super(400, 'Email already registered.')
    }
}
