import {Router} from "express";
import taskRoutes from "./services/tasks/routes/index.routes";

const router = Router();

router.use('/task', taskRoutes);

export default router;