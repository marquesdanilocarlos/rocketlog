import {z} from "zod";

export default z.object({
    name: z.string().trim().min(3),
    email: z.string().email(),
    password: z.string().min(6)
});