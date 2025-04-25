import {Router} from "express";
import usersRoutes from "@/routes/users.routes";
import authRoutes from "@/routes/auth.routes";
import deliveriesRoutes from "@/routes/deliveries.routes";
import logsRoutes from "@/routes/logs.routes";

const router = Router();
router.use('/users', usersRoutes);
router.use('/login', authRoutes);
router.use('/deliveries', deliveriesRoutes);
router.use('/logs', logsRoutes);

export default router;