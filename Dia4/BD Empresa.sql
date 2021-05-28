CREATE DATABASE IF NOT EXISTS EMPRESA;
use EMPRESA;
# Crear una Base de Datos para la gestión de los empleados de una empresa, en la cual está distribuida por departamenteos (Informática, Publicidad, Marketing, Créditos)
# Además se requiere controlar al personal (Nombre, Apellidos, Identificiador, Pertenece a un departamento), además un empleado tiene varios subordinados, cada departamenteo tiene su nombre,
# su nivel (en que piso de la empresa se encuentra)
# NOTA: No todos los empleados tiene departamento.
CREATE TABLE IF NOT EXISTS departamentos(
	id int not null unique auto_increment primary key,
    nombre varchar(50),
    piso int
);
CREATE TABLE IF NOT EXISTS personales(
	id int not null unique primary key auto_increment,
    nombre varchar(50),
    apellido varchar(50),
    identificador int,
    departamento_id int,
    supervisor_id int,
    constraint departamentos_personales foreign key (departamento_id) references departamentos(id),
    constraint personales_personales foreign key (supervisor_id) references personales(id)
);

INSERT INTO departamentos (nombre, piso)VALUES 
						 ('Ventas',1),
						 ('Administracion',2),
                         ('Finanzas',2),
                         ('Marketing',3);
                         
                         