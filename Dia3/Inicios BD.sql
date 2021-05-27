-- ESTO ES UN COMENTARIO
-- SQL ES UN LENGUAJE DE SENTENCIAS ESTRUCTURADO en el cual, mediante
-- unas sentencias podemos extraer, agregar, eliminar, actualizar info.
-- de una bd
# ESTO ES OTRO COMENTARIO
CREATE DATABASE pruebas;
USE pruebas;

CREATE TABLE alumnos(
  # ACA AHORA VENDRA TODAS LAS COLUMNAS DE ESA TABLA ALUMNOS
  # solamente puede haber una columna auto incrementable por tabla
  id int primary key not null auto_increment,
  nombre varchar(40),
  apellido varchar(25),
  sexo varchar(10),
  numero_emergencia int,
  religion varchar(10),
  fecha_nacimiento date
);

# LA FORMA CORRECTA DE INGRESAR LOS DATOS A UNA TABLA ES:
INSERT INTO alumnos (nombre, apellido, sexo, numero_emergencia, religion, fecha_nacimiento)
VALUES              ("Eduardo", "de rivero", "M", 974207075, "CATOLICO", "1990-08-14");

INSERT INTO alumnos (nombre, apellido, sexo, numero_emergencia, religion, fecha_nacimiento)
VALUES              ("Fiorella", "Ccalla", "F", 948592619, "ATEO", "1993-01-07");

INSERT INTO alumnos (nombre, apellido, sexo, numero_emergencia, religion, fecha_nacimiento)
VALUES              ("Matheus", "Peña", "M", 264859, "EVANGELICO", "1989-04-06");


INSERT INTO alumnos values (2, "Aldo","Cotrina Lozano", "M",92219087, "CATOLICO", "1990-08-14");

# LA FORMA PARA VISUALIZAR LOS DATOS QUE HAY EN UNA TABLA ES:

SELECT * FROM alumnos;

# PARA HACER FILTROS DE BUSQUEDA:
# LA FORMA DE USAR CONDICIONALES EN BASE DE DATOS ES LUEGO DE INDICAR LAS TABLAS QUE USAMOS,
# PONEMOS LA CLAUSULA WHERE Y LUEGO LA COLUMNA A HACER LA BUSQUEDA CON SU RESPECTIVO VALOR
SELECT * FROM alumnos WHERE nombre = "Eduardo" and SEXO="M";

# ELIMINA TODOS LOS REGISTROS DE LA TABLA ALUMNO CUANDO EL NOMBRE SEA EDUARDO Y EL ID 
# SEA DIFERENTE DE 1
DELETE FROM alumnos WHERE nombre = "Eduardo" and id != 1;

DELETE FROM alumnos where nombre != "Eduardo";

# SENTENCIA QUE HABILITA / DESHABILITA EL MODO SEGURO QUE NO NOS PERMITE HACER ELIMINACIONES
# O ACTUALIZACIONES EN UN GRAN BLOQUE POR TEMOR A QUE COMETAMOS UN ERROR GARRAFAL
# 0 => FALSE | 1 => TRUE
SET SQL_SAFE_UPDATES = 1;


CREATE TABLE habilidades(
	id int auto_increment not null unique primary key,
    descripcion varchar(100) not null,
    nivel varchar(15)
);

CREATE TABLE habilidades_alumnos(
	id int auto_increment not null unique primary key,
    alumno_id int not null,
    habilidad_id int not null,
    foreign key (habilidad_id) references habilidades(id),
    foreign key (alumno_id) references alumnos(id)
);
