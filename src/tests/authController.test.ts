import request from "supertest";
import app from "@/app";
import prisma from "@/database/prisma";

describe('AuthController', () => {
    let userId: string;

    afterAll(async () => {
        await prisma.user.delete({
            where: {id: userId}
        });
    });

    it('should authenticate and get access token', async() => {
        const userResponse = await request(app).post('/users').send({
            name: 'John Doe',
            email: 'oloco@example.com',
            password: '123456'
        });

        userId = userResponse.body.id;

        const authResponse = await request(app).post('/login').send({
            email: 'oloco@example.com',
            password: '123456'
        });

        expect(authResponse.status).toBe(200);
        expect(authResponse.body).toHaveProperty('token');
        expect(authResponse.body.token).toEqual(expect.any(String));
    });
});