import { HttpError } from '@/core/errors/http-error'

export class BadRequestHttpError extends HttpError {
    constructor() {
        super(500, 'Internal server error.')
    }
}
