CREATE DATABASE IF NOT EXISTS clinica;

USE clinica;

CREATE TABLE IF NOT EXISTS doctors (
    doc_id INT NOT NULL AUTO_INCREMENT,
    doc_name VARCHAR (30) NOT NULL,
    doc_app VARCHAR (30) NOT NULL,
    doc_apm VARCHAR (30),
    doc_email VARCHAR (50) NOT NULL,
    doc_password VARCHAR (1000) NOT NULL,
    doc_phone VARCHAR (30) NOT NULL,

    PRIMARY KEY (doc_id),
    UNIQUE (doc_email),
    UNIQUE (doc_phone)
);

CREATE TABLE IF NOT EXISTS patients (
pat_id INT NOT NULL AUTO_INCREMENT,
pat_name VARCHAR (30),
pat_lastname VARCHAR (50),
pat_email VARCHAR(30),
pat_phone VARCHAR(10),
pat_birth DATE, 
pat_gender ENUM('Male','Female','Other'),
pat_treatment VARCHAR (50),
pat_bloodgroup ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),

PRIMARY KEY (pat_id),
UNIQUE (pat_email),
UNIQUE (pat_phone)
);

CREATE TABLE IF NOT EXISTS appointment(
app_id INT NOT NULL AUTO_INCREMENT,
app_name VARCHAR(30) NOT NULL,
app_email VARCHAR(50) NOT NULL,
app_phone VARCHAR(10) NOT NULL,
app_date DATE NOT NULL,
app_hour TIME NOT NULL,

PRIMARY KEY (app_id),
UNIQUE(app_date , app_hour),
INDEX(app_date),

);

INSERT INTO doctors(doc_name , doc_app , doc_apm , doc_email , doc_password , doc_phone)
		VALUES('Eduardo' , 'Pacheco' , 'Martinez' , 'eduardo@gmail.com' , 'eduardo123 ' , '4622367023'),
                ('Alejandro', 'Garcia', 'Garcia', 'alejandro@gmail.com', 'alejandro123', '4623292256'),
                ('Yair', 'Sanabria', 'Porras', 'yair@gmail.com', 'yair1234', '4623292200'),
                ('Fernando', 'Castillo', 'Rodriguez', 'fernando@gmail.com', 'fernando123', '4622362200');