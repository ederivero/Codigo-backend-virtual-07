CREATE DATABASE zapateria;

USE ZAPATERIA;

CREATE TABLE categorias(
	id	int	not null	unique auto_increment,
    nombre varchar(50),
    abbr varchar(10),
    imagen text
);

CREATE TABLE productos (
	id	int not null unique auto_increment,
    nombre varchar(50),
    precio decimal(5,2), # para guardar precios de hasta 999.00
    #al final de cuentas un boolean es un tinyint en el cual 1 = TRUE y 0 = FALSE
    disponible boolean,
    categoria_id int,
    # constraint sirve para modificar el nombre con el cual se creara la relacion entre 
    # la tabla categoria y la tabla producto, el valor por defecto es:
    # categorias_productos_ibfk_n => n es el numero de creacion de la constraint
    # ibfk => innodb foreign key
    constraint relacion_producto_categoria 
    foreign key (categoria_id) references categorias(id)    
);
    

INSERT INTO categorias (nombre, abbr, imagen) VALUE
						("ZAPATO","ZAP", "url1"),
						("ZAPATILLA","ZAPT","url2"),
                        ("BOTIN","BOT","url3"),
                        ("BOTA","BOTA","url4");
                        
INSERT INTO PRODUCTOS (nombre, precio, disponible, categoria_id) VALUES
					  ("ZAPATO VERANO", 99.90, true, 1),
                      ("ZAPATO HOMBRE", 120.00, true, 1),
                      ("ZAPATO MUJER", 199.00, false, 1),
                      ("ZAPATILLA TREKKIN HOMBRE", 189.90, true, 2),
                      ("ZAPATILLA RUN MUJER", 220.00, true, 2),
                      ("ZAPATILLA OFFROAD MUJER", 320.89, true, 2),
                      ("BOTIN TACO 4", 520.00, true, 3),
                      ("BOTA TACO 10", 710, false, 4);


SELECT * from categorias where nombre LIKE '%A%';
-- select * from productos where precio >= 100;
-- 
-- 1. DEVOLVER TODOS LOS PRODUCTOS CUYO PRECIO SEA ENTRE 100 y 250 soles
SELECT * FROM PRODUCTOS WHERE precio BETWEEN 100 and 250;
SELECT * FROM PRODUCTOS WHERE precio > 100 and precio < 250;
-- 2. DEVOLVER TODOS LOS PRODUCTOS DISPONIBLES
SELECT * FROM productos where disponible = true;
-- 3. DEVOLVER TODOS LOS PRODUCTOS QUE SEAN PARA HOMBRE
SELECT * from productos where nombre like '%hombre%';
-- 4. DEVOLVER TODOS LOS PRODUCTOS QUE TENGAN "TACO 4"
SELECT * from productos where nombre like '%taco 4%';
-- 5. DEVOLVER TODAS LAS ZAPATILLAS
SELECT * from productos where nombre like '%zapatilla%';
-- 6. DEVOLVER TODOS LOS PRODUCTOS QUE CUESTEN MAS DE 500 y NO ESTEN DISPONIBLES
SELECT * from productos where precio > 500 AND disponible = false;
-- 7. DEVOLVER TODAS LAS ZAPATILLAS Y LAS BOTAS
SELECT * FROM productos where nombre like '%zapatilla%' OR nombre like '%bota%';









