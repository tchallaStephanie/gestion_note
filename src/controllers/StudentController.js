
import { json } from "node:stream/consumers";
import uuid from "../generateur.js";
import StudentService from "../services/studentService.js";
import { HTTP_SATTUS_CODE } from "../constants/httpStatus.js";
import dotenv from 'dotenv';
dotenv.config();

export default class StudentsController {
    /*students=[
        {"id":1000,"firstname":"tchalla","lastname":"phanie","sexe":"F","birth_day":"01/02/2000"},
        {"id":2,"firstname":"tcha","lastname":"mous","sexe":"M","birth_day":"01/02/1999"}
    ];

    uuidGen;*/
    studentService;
    constructor(){
        this.studentService=new StudentService;
        
    }

    async create(req,res){
        /*let body="";
        req.on('data',(chunk)=>{
            //console.log(chunk.toString());
            body += chunk.toString();
        });
        req.on('close',()=>{
            console.log(JSON.stringify(body));
            
        })
        res.end("");*/

        const {firstname,lastname,sexe,birth_day}= await json(req);
        const student =  {
            "firstname":firstname !==undefined ? firstname:"",
            "lastname":lastname !==undefined ? lastname:"",
            "sexe":sexe !==undefined ? sexe:"",
            "birth_day":birth_day !==undefined ? birth_day:"",
        }

        const newStudent=await this.studentService.create(student);
        res.writeHead(HTTP_SATTUS_CODE.SUCCCES);
        res.end(JSON.stringify(newStudent));
        

        
    }
    
    
    async get(req,res){
        const url=new URL(req.url,`http://${req.headers.host}`);
        const id=url.searchParams.get("id");
        const student=await this.studentService.get(parseInt(id))
        
        //let student;
        //Rechercher l'etudiant 
        /*this.students.forEach((elt)=>{
            if (elt.id==id) {
                student=elt;
            }
        })*/


        if (student===undefined) {
            res.writeHead(HTTP_SATTUS_CODE.NOT_FOUND);
            res.end(JSON.stringify({
                "message":"Ressource not-found"
            }))
        }else{
            res.writeHead(HTTP_SATTUS_CODE.SUCCCES);
            res.end(JSON.stringify(student));
        }
        res.end("");

    }


    async update(req,res){
        const url=new URL(req.url,`http://${req.headers.host}`);
        const id=Number.parseInt(url.searchParams.get("id"));
        //console.log(id);
        
        const {firstname,lastname,sexe,birth_day} = await json(req)

        const student =  {
            "id":null,
            "firstname":firstname !==undefined ? firstname:"",
            "lastname":lastname !==undefined ? lastname:"",
            "sexe":sexe !==undefined ? sexe:"",
            "birth_day":birth_day !==undefined ? birth_day:"",
        }
        const newStudent=await this.studentService.update(id,student);

        /*const body= await json(req);
        let student;
        this.students.forEach((elt)=>{
            if (elt.id==id) {
                student=elt;
                this.students.forEach(element => {
                    element.firstname=body.firstname,
                    element.lastname=body.lastname,
                    element.birth_day=body.birth_day
                });
                
            }

            
        })*/

        if (newStudent) {
            res.writeHead(HTTP_SATTUS_CODE.SUCCCES);
            res.end(JSON.stringify(newStudent));
            return;
        }else{
            /*const {firstname,lastname,sexe,birth_day} = json(req);
            student.firstname=firstname,
            student.lastname=lastname,
            student.sexe=sexe,
            student.birth_day=birth_day,*/
            res.writeHead(HTTP_SATTUS_CODE.NOT_FOUND);
            res.end(JSON.stringify({
                "message":"Ressource not-found"
            }))
           
        }
       
    }

    delete(req,res){
        const url=new URL(req.url,`http://${req.headers.host}`);
        const id=url.searchParams.get("id");
        this.studentService.delete(id);
        res.writeHead(HTTP_SATTUS_CODE.SUCCCES);
        res.end("Student successfuly deleted.....")


        /*let student; 
        this.students.forEach((elt)=>{
            if (elt.id==id) {
                
                //console.log(id);
                
                const suppStudent=this.students.indexOf(id)
                //console.log(suppStudent);
                
                this.students.splice(suppStudent)
                
            }
            
        })
        if (student===undefined) {
            res.writeHead(404);
            res.end(JSON.stringify({
                "message":"Ressource not-found"
            }))
        }else{
            res.end(JSON.stringify(student));
        }
        res.end("");*/
    }


    async read(req,res){
        res.writeHead(HTTP_SATTUS_CODE.SUCCCES);
        res.end(JSON.stringify(await this.studentService.getAll())) ;
    }
}