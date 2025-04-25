import {Request, Response} from "express";
import prisma from "@/database/prisma";
import authValidator from "@/validators/authValidator";
import AppError from "@/error/AppError";
import bcrypt from "bcryptjs";
import authConfig from "@/config/auth";
import { sign } from "jsonwebtoken";

export default class AuthController {
    async login(request: Request, response: Response): Promise<any> {
        const {email, password} = authValidator.parse(request.body);
        const user = await prisma.user.findFirst({
            where: {email}
        });
        const errorMessage: string = 'Email ou senhas incorretos.';

        if (!user) {
            throw new AppError(errorMessage, 401);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError(errorMessage, 401);
        }

        const {secret, expiresIn} = authConfig.jwt;
        /*@ts-ignore*/
        const token = sign({role: user.role ?? 'customer'}, secret, {
            expiresIn: expiresIn,
            subject: user.id
        });

        const {password: _, ...userWithoutPassword} = user;

        return response.json({token, ...userWithoutPassword});
    }
}