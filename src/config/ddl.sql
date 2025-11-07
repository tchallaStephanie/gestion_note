DROP TABLE IF EXISTS students;

CREATE TABLE IF NOT EXISTS students (id INTEGER primary key autoincrement, 
firstname TEXT, 
lastname TEXT,
sexe TEXT ,
birth_day DATE,
check(sexe in('F','M'))
);