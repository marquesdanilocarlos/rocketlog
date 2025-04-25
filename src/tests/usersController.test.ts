import request from "supertest";
import app from "@/app";
import prisma from "@/database/prisma";

describe("UsersController", () => {

    let userId: string;

    afterAll(async () => {
        await prisma.user.delete({
            where: {id: userId}
        });
    });

    it('should throw error if user with same email', async () => {
        const response = await request(app).post('/users').send({
            name: 'Duplicated Doe',
            email: 'marquesdanilocarlos@gmail.com',
            password: '123456'
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Já existe um usuário cadastrado com esse e-mail.');
    });

    it('should throw error if invalid email', async() => {
        const response = await request(app).post('/users').send({
            name: 'Teste email',
            email: 'invalid-email',
            password: '123456'
        });

        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Erro de validação');
    });

    it('should create a new user', async () => {
        const response = await request(app).post('/users').send({
            name: 'John Doe',
            email: 'o0m5t@example.com',
            password: '123456'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('John Doe');

        userId = response.body.id;
    });
});