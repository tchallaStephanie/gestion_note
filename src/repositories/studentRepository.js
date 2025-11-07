import Repository from "../repositories/repository.js";
import Database from "../config/database.js";
export default class StudentRepository extends Repository {
   async save(student){
            const db=await Database.getDatabaseInstance();
            const {firstname,lastname,sexe,birth_day}=student;
            const ddl_sql=`INSERT INTO students(firstname,lastname,sexe,birth_day) 
                VALUES(:firstname,:lastname,:sexe,:birth_day)`;
            const {lastID}=await db.connection.run(ddl_sql,{
                        ":firstname":firstname,
                        ":lastname":lastname,
                        ":sexe":sexe,
                        ":birth_day":birth_day
                    })
            return lastID;
    
   };





    async delete(id){
        const db=await Database.getDatabaseInstance();
        const delete_sql=`DELETE FROM students WHERE id=:student_id`;
        await db.connection.run(delete_sql,{
            ":student_id":id
        })
    };

    async find(id){
        const db=await Database.getDatabaseInstance();
        return await db.connection.get("SELECT * FROM students WHERE id=:student_id",
            {
                ":student_id": id
            }
                )
    };

    async findAll(){
        const db=await Database.getDatabaseInstance();
        return await db.connection.all("SELECT * FROM students");
    };


    
    async update(id,student){
        if (parseInt(student.id)>0) {
            const db=await Database.getDatabaseInstance();
            const {firstname,lastname,sexe,birth_day}=student;
            const update_sql=`UPDATE students SET firstname=:firstname,
                lastname=:lastname,sexe=:sexe,birth_day=:birth_day WHERE id=:student_id`;
            const {lastID}=await db.connection.run(update_sql,{
                        ":student_id":id,
                        ":firstname":firstname,
                        ":lastname":lastname,
                        ":sexe":sexe,
                        ":birth_day":birth_day
                    })    
            
            return lastID;
        }
    };
}