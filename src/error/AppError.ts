import {Request, Response, NextFunction} from "express";
import {ZodError} from "zod";

export default class AppError extends Error {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }

    public static errorHandler(error: Error, req: Request, res: Response, next: NextFunction): Response {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({error: error.message});
        }

        if (error instanceof ZodError) {
            return res.status(422).json({
                message: "Erro de validação",
                errors: error.format()
            });
        }

        return res.status(500).json({error: error.message});
    }
}