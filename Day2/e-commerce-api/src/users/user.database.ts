import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { User, UnitUser, Users } from './user.interface';

const usersFilePath = path.join(__dirname, '../../users.json');

const loadUsers = (): Users => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log(`Error loading users: ${error}`);
        return {};
    }
};

const saveUsers = (users: Users): void => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.log(`Error saving users: ${error}`);
    }
};

export const findAll = async (): Promise<UnitUser[]> => {
    const users = loadUsers();
    return Object.values(users);
};

export const findOne = async (id: string): Promise<UnitUser | null> => {
    const users = loadUsers();
    return users[id] || null;
};

export const create = async (userData: User): Promise<UnitUser | null> => {
    const users = loadUsers();
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const newUser: UnitUser = {
        id,
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    };
    
    users[id] = newUser;
    saveUsers(users);
    return newUser;
};

export const findByEmail = async (email: string): Promise<UnitUser | null> => {
    const users = loadUsers();
    return Object.values(users).find(user => user.email === email) || null;
};

export const comparePassword = async (email: string, suppliedPassword: string): Promise<boolean> => {
    const user = await findByEmail(email);
    if (!user) return false;
    return bcrypt.compare(suppliedPassword, user.password);
};

export const update = async (id: string, updateValues: User): Promise<UnitUser | null> => {
    const users = loadUsers();
    if (!users[id]) return null;
    
    if (updateValues.password) {
        updateValues.password = await bcrypt.hash(updateValues.password, 10);
    }
    
    users[id] = { ...users[id], ...updateValues };
    saveUsers(users);
    return users[id];
};

export const remove = async (id: string): Promise<boolean> => {
    const users = loadUsers();
    if (!users[id]) return false;
    
    delete users[id];
    saveUsers(users);
    return true;
};
