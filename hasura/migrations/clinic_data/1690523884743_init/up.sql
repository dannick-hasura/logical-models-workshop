SET check_function_bodies = false;
CREATE SEQUENCE public.appts_id_seq
    START WITH 600
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE public.appts (
    id integer DEFAULT nextval('public.appts_id_seq'::regclass) NOT NULL,
    patient_id integer,
    doctor_id integer,
    appointment_date timestamp without time zone,
    appointment_status character varying(20)
);
CREATE SEQUENCE public.doctors_id_seq
    START WITH 20
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE public.doctors (
    id integer DEFAULT nextval('public.doctors_id_seq'::regclass) NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    specialization character varying(100),
    contact_number character varying(15),
    email character varying(100)
);
CREATE SEQUENCE public.patients_id_seq
    START WITH 300
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE public.patients (
    id integer DEFAULT nextval('public.patients_id_seq'::regclass) NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    date_of_birth date,
    gender character varying(10),
    contact_number character varying(15),
    address character varying(255)
);
CREATE SEQUENCE public.records_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
CREATE TABLE public.records (
    id integer DEFAULT nextval('public.records_id_seq'::regclass) NOT NULL,
    patient_id integer,
    doctor_id integer,
    visit_date date,
    diagnosis character varying(255),
    treatment character varying(255),
    notes text
);
ALTER TABLE ONLY public.appts
    ADD CONSTRAINT appts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_pkey PRIMARY KEY (id);
CREATE INDEX ifk_appt_doctor_id ON public.appts USING btree (doctor_id);
CREATE INDEX ifk_appt_patient_id ON public.appts USING btree (patient_id);
CREATE INDEX ifk_record_doctor_id ON public.records USING btree (doctor_id);
CREATE INDEX ifk_record_patient_id ON public.records USING btree (patient_id);
ALTER TABLE ONLY public.appts
    ADD CONSTRAINT appts_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);
ALTER TABLE ONLY public.appts
    ADD CONSTRAINT appts_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);
ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);
ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);
