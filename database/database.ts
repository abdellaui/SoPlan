import { async } from '@angular/core/testing';
import { User } from './entity/user/user.entity';
import { init as initSlots } from './autoload';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { shell, app, dialog } from 'electron';
import * as Settings from 'electron-settings';

export class Database {

    private options: ConnectionOptions;

    constructor(config?: Object) {
        if (!Settings.has('dbconfig')) {
            const defaultDatabaseConfigs = {
                host: 'localhost',
                port: '3306',
                username: 'root',
                password: 'password',
                database: 'database'
            };
            Settings.set('dbconfig', defaultDatabaseConfigs);

            this.installationsQuit();
        }

        let dbConfig: any;
        if (config) {
            dbConfig = config;
        } else {
            dbConfig = Settings.get('dbconfig');
        }
        this.options = {
            name: 'default',
            type: 'mysql',
            host: dbConfig.host,
            port: dbConfig.port,
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            entities: [User],
            synchronize: true,
            logging: false,
        };


        createConnection(this.options).then((conn: Connection) => {
            this.slots();
        }).catch((e: Error) => {
            this.installationsQuit();
            console.log(e);
        });

    }
    static initialize(config?: Object): Database {
        return new Database(config);
    }

    installationsQuit(): any {
        const settingsFilePath = Settings.file();
        const title = 'Datenbankverbindung überprüfen!';
        const content = `Bitte konfigurieren Sie Ihre Datenbankverbindung! \nDie Konfiguration finden sie unter: \n${settingsFilePath}`;

        dialog.showErrorBox(title, content);
        if (shell.openItem(settingsFilePath)) { app.quit(); }

    }


    private slots(): void {
        try {
            initSlots();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
