import {Request, Response} from "express";
import {createValidator, updateParamsValidator, updateStatusValidator} from "@/validators/deliveriesValidator";
import prisma from "@/database/prisma";

export default class DeliveriesController {
    async index(request: Request, response: Response): Promise<any> {
        const deliveries = await prisma.delivery.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        return response.json(deliveries);
    }

    async create(request: Request, response: Response): Promise<any> {
        const {userId, description} = createValidator.parse(request.body);

        await prisma.delivery.create({data: {userId, description}});

        return response.status(201).json();
    }

    async updateStatus(request: Request, response: Response): Promise<any> {
        const {id} = updateParamsValidator.parse(request.params);
        const {status} = updateStatusValidator.parse(request.body);

        await prisma.delivery.update({where: {id}, data: {status}});

        await prisma.deliveryLog.create(
            {
                data: {deliveryId: id, description: status}
            }
        );

        return response.json();
    }
}