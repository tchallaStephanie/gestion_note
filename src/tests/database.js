import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file
export async function openDb () {
  return open({
    filename: '/home/light/L3/S5/Node_API_REST/GestionNotes/src/db.sqlite',
    driver: sqlite3.Database
  })
  
}
const db=await openDb();

const ddl=`
`;


const dml=``;
//await db.exec(ddl);
await db.exec(dml)
console.log(db);
