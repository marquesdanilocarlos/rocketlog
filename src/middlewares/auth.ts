import {Request, Response, NextFunction} from "express";
import AppError from "@/error/AppError";
import {verify} from "jsonwebtoken";
import authConfig from "@/config/auth";

interface TokenPayload {
    sub: string;
    role: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token não informado', 401);
    }

    const [, token] = authHeader.split(' ');
    const {role, sub: userId} = verify(token, authConfig.jwt.secret) as TokenPayload;

    request.user = {
        id: userId,
        role
    }

    return next();
}

export function verifyUserAuthorization(roles: string[]) {

    return (request: Request, response: Response, next: NextFunction) => {
        const {user} = request;

        if (!user || !roles.includes(user?.role)) {
            throw new AppError('Não autorizado', 401);
        }

        return next();
    };
}