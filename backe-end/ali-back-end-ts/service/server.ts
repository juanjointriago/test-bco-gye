import express, { Express } from "express";
import { createServer, Server as HttpServer } from "http";
import db from "../db/connection";
import cors from "cors";
import path from 'path';
import fileUpload from 'express-fileupload';
import auth from '../routes/auth.routes'
import products from '../routes/product.routes'

export class MainServer {
    private app: Express | null;
    private port: string;
    private server: HttpServer | null;
    private apiPaths = {
        auth: '/api/auth',
        users: '/api/users',
        products: '/api/products',
        orders: '/api/orders'
    }

    constructor() {
        this.app = express();
        this.port = '8080' || process.env.PORT
        this.middlewares();
        this.server = createServer(this.app)
    }

    middlewares(): void {
        this.app?.use(express.json());
        this.app?.use(express.static(path.join(__dirname, 'public')));
        //for upload files
        this.app?.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
        this.app?.use(cors());
    }
    //for db connection
    async dbConnection(): Promise<void> {
        try {
            await db.authenticate();
            console.log(`Base de datos online 🚀`)
        } catch (error: any) {
            console.log(JSON.stringify(error));
            throw new Error(`Error en dbConnection ${error.message}`)
        }
    }

    routes(): void {
        this.app?.use(this.apiPaths.auth, auth);
        this.app?.use(this.apiPaths.products, products);
    }
    async execute() {
        await this.dbConnection();
        this.routes();
        this.server?.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        })
    }

}