-- ESTO ES UN COMENTARIO
-- SQL ES UN LENGUAJE DE SENTENCIAS ESTRUCTURADO en el cual, mediante
-- unas sentencias podemos extraer, agregar, eliminar, actualizar info.
-- de una bd
# ESTO ES OTRO COMENTARIO
CREATE DATABASE pruebas;
USE pruebas;

CREATE TABLE alumnos(
  # ACA AHORA VENDRA TODAS LAS COLUMNAS DE ESA TABLA ALUMNOS
  nombre varchar(40),
  apellido varchar(25),
  sexo varchar(10),
  numero_emergencia int,
  religion varchar(10),
  fecha_nacimiento date
);
