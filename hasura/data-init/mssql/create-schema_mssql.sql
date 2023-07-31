CREATE SCHEMA doctors_data;

-- Create Doctors table
DROP TABLE IF EXISTS doctors;
CREATE TABLE doctors (
    id INT IDENTITY(20, 1) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    specialization VARCHAR(100),
    contact_number VARCHAR(15),
    email VARCHAR(100)
);

-- Create Patients table
DROP TABLE IF EXISTS patients;
CREATE TABLE patients (
    id INT IDENTITY(300, 1) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(10),
    contact_number VARCHAR(15),
    address VARCHAR(255)
);

-- Create Appointments table
DROP TABLE IF EXISTS appts;
CREATE TABLE appts (
    id INT IDENTITY(600, 1) PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_date DATETIME,
    appointment_status VARCHAR(20),
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Create MedicalRecords table
DROP TABLE IF EXISTS records;
CREATE TABLE records (
    id INT IDENTITY(1000, 1) PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    visit_date DATE,
    diagnosis VARCHAR(255),
    treatment VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);