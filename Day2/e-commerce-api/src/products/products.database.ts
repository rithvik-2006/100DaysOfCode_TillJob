import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Product, UnitProduct, Products } from './product.interface';

const productsFilePath = path.join(__dirname, '../../products.json');

const loadProducts = (): Products => {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log(`Error loading products: ${error}`);
        return {};
    }
};

const saveProducts = (products: Products): void => {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    } catch (error) {
        console.log(`Error saving products: ${error}`);
    }
};

export const findAll = async (): Promise<UnitProduct[]> => {
    const products = loadProducts();
    return Object.values(products);
};

export const findOne = async (id: string): Promise<UnitProduct | null> => {
    const products = loadProducts();
    return products[id] || null;
};

export const create = async (productData: Product): Promise<UnitProduct> => {
    const products = loadProducts();
    const id = uuidv4();
    
    const newProduct: UnitProduct = {
        id,
        ...productData
    };
    
    products[id] = newProduct;
    saveProducts(products);
    return newProduct;
};

export const update = async (id: string, updateValues: Product): Promise<UnitProduct | null> => {
    const products = loadProducts();
    if (!products[id]) return null;
    
    products[id] = { ...products[id], ...updateValues };
    saveProducts(products);
    return products[id];
};

export const remove = async (id: string): Promise<boolean> => {
    const products = loadProducts();
    if (!products[id]) return false;
    
    delete products[id];
    saveProducts(products);
    return true;
};
