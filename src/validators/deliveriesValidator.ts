import {z} from 'zod';

const createValidator = z.object({
    userId: z.string().uuid(),
    description: z.string()
});

const updateParamsValidator: z.ZodObject<z.ZodRawShape> = z.object({
    id: z.string().uuid()
});

const updateStatusValidator: z.ZodObject<z.ZodRawShape> = z.object({
    status: z.enum(['processing', 'shipped', 'delivered'])
});

export {createValidator, updateParamsValidator, updateStatusValidator};
