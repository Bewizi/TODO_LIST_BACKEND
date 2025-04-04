import {NextFunction, Request, Response} from "express";
import Task from "../models/tasks_model";

class TaskControllers {

    getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tasks = await Task.findAll();
            res.status(200).json({message: "Tasks gotten successfully", tasks});
            next();
        } catch (e) {
            console.log(e as Error);
            res
                .status(400)
                .json({message: "Failed to get tasks", error: (e as Error).message});
        }
    }

    createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {title, description} = req.body;

            const newTasks = await Task.create({
                title: title,
                description: description,
            });


            res.status(201).json({message: "Tasks created successful", newTasks});
            next();
        } catch (e) {
            console.log(e as Error);
            res
                .status(400)
                .json({message: "Task already exists", error: (e as Error).message});
        }
    }

    getTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const taskId = await Task.findOne({where: {id: id}})
            res.status(200).json({message: "Task gotten", taskId})
        } catch (e) {
            console.log(e as Error);
            res
                .status(400)
                .json({message: "Task doesn't exist", error: (e as Error).message});
        }
    }


    updateTask = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const {id} = req.params;
            const {title, description} = req.body;

            const tasks = await Task.findByPk(id);

            if (!tasks) return res.status(404).json({message: "Task not found"});

            await tasks.update({title: title, description: description});

            res.status(200).json({message: "Task updated successfully", tasks});
            next();
        } catch (e) {
            console.error(e);
            res
                .status(500)
                .json({
                    message: "Failed to update task",
                    error: (e as Error).message,
                });
        }
    };

    deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const {id} = req.params; // Get the task ID from request params

            // Find the task by ID
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({message: "Task not found"});
            }
            await task.destroy({force: true});

            res.status(200).json({message: "Task deleted successfully", task});
            next();
        } catch (e) {
            console.error(e);
            return res.status(500).json({message: "Failed to delete task", error: (e as Error).message});
        }
    }
}

export default new TaskControllers();