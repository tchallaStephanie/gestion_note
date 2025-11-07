import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fs from "fs/promises"
import { dirname,join } from 'node:path';
import path from 'node:path';
const url=new URL(import.meta.url)
const parent_dir=dirname(url.pathname)
const base_dir=join(parent_dir,'..');
const file_path=join(base_dir,'db.sqlite');
//console.log(url);

export default class Database {
    db;
    connection;
    static db_path=file_path;
    static instance;
    static ddl_path="src/config/ddl.sql";
    
    
    
    constructor() {}


    static async getDatabaseInstance(){
        if (Database.instance== undefined) {
            Database.instance=new Database();
            await Database.instance.openDb(Database.db_path);
        }
        return Database.instance;
    }
    

    async  openDb (db_path) {
        this.connection= await open({
            filename: db_path,
            driver: sqlite3.Database
        });
        await this.initDb();
  
    }

    


    async initDb(){
        const base_dir=path.dirname(new URL(import.meta.url).pathname);

        //Lire et Créer une tables 
        console.log("Création des tables");
        const ddl_sql=await fs.readFile(path.join(base_dir,"ddl.sql"),{
            encoding:"utf8"
        });
        //console.log(ddl_sql);


        await this.connection.exec(ddl_sql)
        //Lire et insere des n-uplets
        console.log("Insertion des données");
        const dml_sql=await fs.readFile(path.join(base_dir,"dml.sql"),{
            encoding:"utf8"
        });
        await this.connection.exec(dml_sql)
        
        
        
    }

   


}