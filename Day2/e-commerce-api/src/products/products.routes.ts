import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as database from './products.database';

export const productRouter = express.Router();

// Get all products
productRouter.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await database.findAll();
        if (!products.length) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No products found' });
        }
        res.status(StatusCodes.OK).json({ total_products: products.length, products });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

// Get product by ID
productRouter.get('/product/:id', async (req: Request, res: Response) => {
    try {
        const product = await database.findOne(req.params.id);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
        }
        res.status(StatusCodes.OK).json({ product });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

// Create product
productRouter.post('/product', async (req: Request, res: Response) => {
    try {
        const { name, price, quantity, image } = req.body;
        
        if (!name || !price || !quantity || !image) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide name, price, quantity and image' });
        }
        
        const newProduct = await database.create({ name, price, quantity, image });
        res.status(StatusCodes.CREATED).json({ product: newProduct });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

// Update product
productRouter.put('/product/:id', async (req: Request, res: Response) => {
    try {
        const { name, price, quantity, image } = req.body;
        
        const updatedProduct = await database.update(req.params.id, { name, price, quantity, image });
        if (!updatedProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
        }
        
        res.status(StatusCodes.OK).json({ product: updatedProduct });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

// Delete product
productRouter.delete('/product/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await database.remove(req.params.id);
        if (!deleted) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
        }
        
        res.status(StatusCodes.OK).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});
