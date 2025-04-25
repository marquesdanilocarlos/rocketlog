import {Request, Response} from "express";
import userValidator from "@/validators/userValidator";
import {hash} from "bcryptjs";
import prisma from "@/database/prisma";
import AppError from "@/error/AppError";

export default class UsersController {
    async create(request: Request, response: Response): Promise<any> {
        const {name, email, password} = userValidator.parse(request.body);

        let user  = await prisma.user.findFirst({where: {email}});

        if (user) {
            throw new AppError("Já existe um usuário cadastrado com esse e-mail.");
        }

        const hashedPassword = await hash(password, 8);
        user = await prisma.user.create({data: {name, email, password: hashedPassword}});

        const {password: _, ...userWithoutPassword} = user;
        return response.status(201).json(userWithoutPassword);
    }
}