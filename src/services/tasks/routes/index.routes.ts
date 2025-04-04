import {Router} from "express";
import Tasks_controllers from "../controllers/tasks_controllers";
import {getTaskId, taskCreateMiddleware, updateTaskMiddleware} from "../middleware/task_middleware";

const routes = Router();

routes.get('/getAll', Tasks_controllers.getAllTasks)
routes.post('/create', taskCreateMiddleware, Tasks_controllers.createTask)
routes.get('/getTask/:id', getTaskId, Tasks_controllers.getTask)
routes.put('/update/:id', updateTaskMiddleware, Tasks_controllers.updateTask)
routes.delete('/delete/:id', Tasks_controllers.deleteTask)

export default routes;