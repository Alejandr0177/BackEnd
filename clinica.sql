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
INDEX(app_date)

);

INSERT INTO doctors(doc_name , doc_app , doc_apm , doc_email , doc_password , doc_phone)
		VALUES('Eduardo' , 'Pacheco' , 'Martinez' , 'eduardo@gmail.com' , 'eduardo123 ' , '4622367023'),
                ('Alejandro', 'Garcia', 'Garcia', 'alejandro@gmail.com', 'alejandro123', '4623292256'),
                ('Yair', 'Sanabria', 'Porras', 'yair@gmail.com', 'yair1234', '4623292200'),
                ('Fernando', 'Castillo', 'Rodriguez', 'fernando@gmail.com', 'fernando123', '4622362200');

USE clinica;

INSERT INTO patients (pat_name, pat_lastname, pat_email, pat_phone, pat_birth, pat_gender, pat_treatment, pat_bloodgroup)
VALUES 
    ('Luis', 'Hernández', 'luis.hernandez@example.com', '123456789', '1980-05-12', 'Male', 'Fisioterapia', 'A+'),
    ('María', 'González', 'maria.gonzalez@example.com', '987654321', '1992-09-20', 'Female', 'Consulta Dental', 'O-'),
    ('Javier', 'López', 'javier.lopez@example.com', '456789012', '1985-11-15', 'Male', 'Examen de la Vista', 'B+'),
    ('Ana', 'Martínez', 'ana.martinez@example.com', '789012345', '1990-03-08', 'Female', 'Consulta de Ortopedia', 'AB-'),
    ('Carlos', 'Sánchez', 'carlos.sanchez@example.com', '234567890', '1988-07-27', 'Male', 'Terapia de Salud Mental', 'O+'),
    ('Laura', 'Ramírez', 'laura.ramirez@example.com', '567890123', '1994-01-03', 'Female', 'Tratamiento de Alergias', 'A-'),
    ('Roberto', 'Díaz', 'roberto.diaz@example.com', '890123456', '1982-06-18', 'Male', 'Consulta Cardiológica', 'B+'),
    ('Sofía', 'Fernández', 'sofia.fernandez@example.com', '321098765', '1987-12-25', 'Female', 'Cita con Dermatólogo', 'AB+'),
    ('Daniel', 'Pérez', 'daniel.perez@example.com', '654321098', '1998-04-30', 'Male', 'Asesoría Nutricional', 'O-'),
    ('Paola', 'Torres', 'paola.torres@example.com', '210987654', '1996-08-10', 'Female', 'Control Prenatal', 'A+'),
    ('Miguel', 'Vargas', 'miguel.vargas@example.com', '876543210', '1983-02-14', 'Male', 'Servicios de Rehabilitación', 'B-'),
    ('Valentina', 'Rojas', 'valentina.rojas@example.com', '543210987', '1991-10-05', 'Female', 'Consulta de Urología', 'AB+'),
    ('Francisco', 'Cruz', 'francisco.cruz@example.com', '109876543', '1989-04-22', 'Male', 'Chequeo Pediátrico', 'A-'),
    ('Alejandra', 'Gómez', 'alejandra.gomez@example.com', '432109876', '1993-07-01', 'Female', 'Terapia del Habla', 'O+'),
    ('Eduardo', 'Molina', 'eduardo.molina@example.com', '6543210987', '1986-09-17', 'Male', 'Ajuste Quiropráctico', 'B+'),
    ('Isabella', 'Reyes', 'isabella.reyes@example.com', '9876543210', '1997-12-07', 'Female', 'Examen Ginecológico', 'AB-'),
    ('Andrés', 'Gutiérrez', 'andres.gutierrez@example.com', '7654321098', '1981-03-29', 'Male', 'Asesoría Dietética', 'O-'),
    ('Fernanda', 'Díaz', 'fernanda.diaz@example.com', '8765432109', '1995-05-26', 'Female', 'Consulta Oncológica', 'A+'),
    ('Ricardo', 'Mendoza', 'ricardo.mendoza@example.com', '3210987654', '1984-11-11', 'Male', 'Evaluación de Trastornos del Sueño', 'B-'),
    ('Camila', 'Castillo', 'camila.castillo@example.com', '5432109876', '1999-02-02', 'Female', 'Tratamiento Ortodóncico', 'AB+');