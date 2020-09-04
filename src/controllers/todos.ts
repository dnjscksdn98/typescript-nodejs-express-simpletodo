import { RequestHandler } from 'express';

import getDatabase from '../database';

const todos = getDatabase().getTodo();

export const createTodo: RequestHandler = async (req, res, next) => {
    const text = (req.body as { text: string }).text;

    const newTodo = await todos.create({ text: text });

    res.status(201).json({
        message: 'created a new todo',
        createdTodo: newTodo
    });
};

export const getTodos: RequestHandler = async (req, res, next) => {
    const todoFindAll = await todos.findAll();
    
    res.status(200).json({
        todos: todoFindAll
    });
};

export const getTodo: RequestHandler<{ id: number }> = async (req, res, next) => {
    const todoId = req.params.id;

    const todo = await todos.findOne({ where: { id: todoId }});

    if (!todo) {
        throw new Error('Could not find todo');
    }

    res.status(200).json({
        todo: todo
    });
};

export const updateTodo: RequestHandler<{ id: number }> = async (req, res, next) => {
    const todoId = req.params.id;

    const updatedText = (req.body as { text: string}).text;

    const todo = await todos.findOne({ where: { id: todoId }});

    if (!todo) {
        throw new Error('Could not find todo');
    }

    await todos.update({ text: updatedText}, { where: { id: todoId }});

    res.status(200).json({
        message: 'successfully updated todo',
        updatedTodo: {
            id: todoId,
            text: updatedText
        }
    });
};

export const deleteTodo: RequestHandler<{ id: number }> = async (req, res, next) => {
    const todoId = req.params.id;

    const todo = await todos.findOne({ where: { id: todoId }});

    if (!todo) {
        throw new Error('Could not find todo');
    }

    await todos.destroy({ where: { id: todoId }});

    res.status(200).json({
        message: 'successfully deleted todo'
    });
};