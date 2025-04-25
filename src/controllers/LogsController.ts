import {Request, Response} from "express";
import {createValidator, showParamsValidator} from "@/validators/logsValidator";
import prisma from "@/database/prisma";
import AppError from "@/error/AppError";

export default class LogsController {
    async create(request: Request, response: Response): Promise<any> {

        const {deliveryId, description} = createValidator.parse(request.body);
        const delivery = await prisma.delivery.findUnique({where: {id: deliveryId}});

        if (!delivery) {
            throw new AppError('Pedido não encontrado', 404);
        }

        if (delivery.status === 'processing') {
            throw new AppError('Pedido ainda não enviado');
        }

        if (delivery.status === 'delivered') {
            throw new AppError('Esse pedido já foi entregue.');
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId,
                description
            }
        });

        return response.status(201).json();
    }

    async show(request: Request, response: Response): Promise<any> {
        const {deliveryId} = showParamsValidator.parse(request.params);
        const delivery = await prisma.delivery.findUnique({
            where: {id: deliveryId},
            include: {
                user: true,
                logs: true
            }
        });

        if (request.user?.role === 'customer' && delivery?.userId !== request.user?.id) {
            throw new AppError('Você não pode visualizar este pedido.', 401);
        }

        return response.json(delivery);
    }
}