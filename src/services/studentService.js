import Database from "../config/database.js";
import uuid from "../generateur.js";
import Repository from "../repositories/repository.js";
import StudentRepository from "../repositories/studentRepository.js";
export default class StudentService {

    students=[
        {
            "id":1000,
            "firstname":"tchalla",
            "lastname":"phanie",
            "sexe":"F",
            "birth_day":"01/02/2000"
        },

        {
            "id":2,
            "firstname":"tcha",
            "lastname":"mous",
            "sexe":"M",
            "birth_day":"01/02/1999"
        }
    ];

    uuidGen;
    studentRepository;
    constructor(){
        this.uuidGen=uuid(1000);
        this.studentRepository= new StudentRepository();
        //this.repository= new Repository;
    }


    async getAll(){
        /*const db=await Database.getDatabaseInstance();
        return await db.connection.all("SELECT * FROM students");*/
        return this.studentRepository.findAll();

        
    }



    async create(student_data){
        /*const db=await Database.getDatabaseInstance();
        const {firstname,lastname,sexe,birth_day}=student_data;
        const ddl_sql=`INSERT INTO students(firstname,lastname,sexe,birth_day) 
                VALUES(:firstname,:lastname,:sexe,:birth_day)`;
        const {lastID}=await db.connection.run(ddl_sql,{
            ":firstname":firstname,
            ":lastname":lastname,
            ":sexe":sexe,
            ":birth_day":birth_day
        })*/
        this.studentRepository.save(student_data);
        return await this.get(student_data)
        
        
    }



    async get(id){
        /*const db=await Database.getDatabaseInstance();
        return await db.connection.get("SELECT * FROM students WHERE id=:student_id",
            {
            ":student_id": id
            }
        )*/
       return this.studentRepository.find(id);
        
    }



    async update(id,student){
        /*const db=await Database.getDatabaseInstance();
        const {firstname,lastname,sexe,birth_day}=student_data;
        const update_sql=`UPDATE students SET firstname=:firstname,
            lastname=:lastname,sexe=:sexe,birth_day=:birth_day WHERE id=:student_id`;
        const {lastID}=await db.connection.run(update_sql,{
            ":student_id":id,
            ":firstname":firstname,
            ":lastname":lastname,
            ":sexe":sexe,
            ":birth_day":birth_day
        })   */ 

        this.studentRepository.update(id,student);
        return await this.get(lastID);
        

            
    }



    async delete(id){
        /*const db=await Database.getDatabaseInstance();
        const delete_sql=`DELETE FROM students WHERE id=:student_id`;
        await db.connection.run(delete_sql,{
            ":student_id":id
        })*/

        return this.studentRepository.delete(id)
          
    }
}
