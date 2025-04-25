import {z} from 'zod';

const createValidator: z.ZodObject<z.ZodRawShape> =  z.object({
    deliveryId: z.string().uuid(),
    description: z.string()
});

const showParamsValidator: z.ZodObject<z.ZodRawShape> = z.object({
    deliveryId: z.string().uuid()
});

export {createValidator, showParamsValidator};