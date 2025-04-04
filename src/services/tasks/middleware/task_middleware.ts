import {NextFunction, Request, Response} from "express";
import Task from "../models/tasks_model";

export const taskCreateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {title, description} = req.body;

        const existingTask = await Task.findOne({where: {title: title}})

        if (existingTask) res.status(400).json({message: "Tasks already exists"});

        if (!title || !description) {
            res.status(400).json({message: "Please input title and description"})
            throw new Error(`Please input ${title} and ${description}`)
        }
        next()
    } catch (e) {
        res
            .status(412)
            .json({message: "validation failed", error: (e as Error).message});
    }
}

export const getTaskId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const taskId = await Task.findOne({where: {id: id}})
        if (!taskId) res.status(400).json({message: "Task not found"})
        next()
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Failed to fetch booking",
            error: (e as Error).message,
        });
    }
}

export const updateTaskMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.params.id;
        const {title, description} = req.body;

        const tasks = await Task.findOne({where: {id: id}});

        if (!tasks) return res.status(404).json({message: "Task not found"});

        if (!title || !description) {
            res.status(400).json({message: "Please input title and description"})
            throw new Error(`Please input ${title} and ${description}`)
        }
        next()
    } catch (e) {
        res
            .status(412)
            .json({message: "validation failed", error: (e as Error).message});
    }
}