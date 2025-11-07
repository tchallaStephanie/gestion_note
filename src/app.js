import http from "node:http";
import fs from "node:fs"
import StudentsController from "./controllers/StudentController.js";
import Database from "./config/database.js";

const db_path="/home/light/L3/S5/Node_API_REST/GestionNotes/src/db.sqlite";

const db= await Database.getDatabaseInstance();
//await db.openDb(db_path);
//console.log(db);


    /**
     * GET /students -> students list
     * POST /student/:id -> students created
     * PUT /student -> students updated
     * DELETE /student/:id -> student deleted
     */
const studentsController=new StudentsController();

const server=http.createServer(async (req,res)=>{
    const method=req.method;
    
    const url=new URL(req.url,`http://${req.headers.host}`);
    
    
    //console.log(url);
    
    const endpoint=method+":"+url.pathname;
    
    res.setHeader('content-Type','application/json');
    //console.log(method);
    //console.log(endpoint);
    

    switch (endpoint) {
        case 'GET:/students':
            console.log("Liste des etudiants");
            studentsController.read(req,res);
            break;


        case 'GET:/student':
            console.log("Information d'un etudiant");
            studentsController.get(req,res);
            break;
            
            
        case 'POST:/students':
            console.log("Création d'un nouvel etudiant");
            studentsController.create(req,res);
            break;
            
            
        case 'PUT:/student':
            console.log("Modification d'un etudiant");
            studentsController.update(req,res);
            break;   
            
            
        case 'DELETE:/student':
            console.log("Suppression d'un etudiant");
            
            studentsController.delete(req,res);
            break;       
    
        default:
            res.writeHead(404)
            res.end(JSON.stringify({
                "mesage":"Page not found !"
            }));
            break;
    }
  
    
   
});
//console.log(process.env.PORT);

server.listen(process.env.PORT || 3000,()=>{
    console.log("server start");
    
})