import { FastifyInstance } from 'fastify'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', async (request, reply) => {
        const controller = request.diScope.resolve('registerUserController')
        await controller.execute(request, reply)
    })
}
