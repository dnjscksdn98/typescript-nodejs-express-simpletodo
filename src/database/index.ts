import { Sequelize } from 'sequelize-typescript';

import Todo from '../models/Todo.model';

export class Database {
    protected instance: Sequelize;
    
    constructor() {
        this.instance = new Sequelize('mysql', 'root', 'Dnjscksdn98@', {
            host: 'localhost',
            dialect: 'mysql'
        });

        this.instance.sync()
            .then(() => {
                console.log('Database connection success');
            })
            .catch((err) => {
                console.error('Database connection failure', err);
            })

        this.instance.addModels([Todo]);
    }

    getInstance() {
        return this.instance;
    }

    getTodo() {
        return Todo;
    }
}

let database: Database;

const getDatabase = () => {
    if (!database) {
        database = new Database();
    }

    return database;
}

export default getDatabase;