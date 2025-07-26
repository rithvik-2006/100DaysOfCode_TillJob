import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { userRouter } from './users/users.routes';
import { productRouter } from './products/products.routes';

dotenv.config();

if (!process.env.PORT) {
    console.log('PORT environment variable is not defined');
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Routes
app.use('/', userRouter);
app.use('/', productRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
