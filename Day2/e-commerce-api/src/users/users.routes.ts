import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as database from './user.database';

export const userRouter = express.Router();

// Get all users
userRouter.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await database.findAll();
        if (!users.length) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No users found' });
        }
        res.status(StatusCodes.OK).json({ total_users: users.length, users });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

// Get user by ID
userRouter.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const user = await database.findOne(req.params.id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }
        res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

// Register user
userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide username, email and password' });
        }
        
        const existingUser = await database.findByEmail(email);
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already exists' });
        }
        
        const newUser = await database.create({ username, email, password });
        res.status(StatusCodes.CREATED).json({ user: newUser });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

// Login user
userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide email and password' });
        }
        
        const user = await database.findByEmail(email);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }
        
        const isPasswordValid = await database.comparePassword(email, password);
        if (!isPasswordValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid password' });
        }
        
        res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

// Update user
userRouter.put('/user/:id', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide username, email and password' });
        }
        
        const updatedUser = await database.update(req.params.id, { username, email, password });
        if (!updatedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }
        
        res.status(StatusCodes.CREATED).json({ user: updatedUser });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

// Delete user
userRouter.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await database.remove(req.params.id);
        if (!deleted) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }
        
        res.status(StatusCodes.OK).json({ msg: 'User deleted successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});
