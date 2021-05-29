SELECT * FROM PERSONALES;
-- FUNCION DE AGREGACION
-- PROMEDIO avg(columna)
-- MAXIMO max(col)
-- MINIMO min(col)
-- CONTAR count(col)
-- SUMAR sum(col)
-- PRIMERO first(col)
-- ULTIMO last(col)

-- CUANDO USAMOS FUNCIONES DE AGREGACION (AGGREGATE FUNCTIONS) TIENE 
-- QUE IR DE LA MANO CON UNA CLAUSULA DE AGRUPAMIENTO (GROUP BY)
-- EN EL GROUP BY va todas las columnas que no son funciones de agregacion
select departamento_id,nombre, count(departamento_id) 
from personales 
where apellido = "Johnson"
GROUP BY departamento_id, nombre;

-- ORDER BY => es para simple ordenamiento solamente ordenara segun las columnas
-- indicadas en el select
select apellido, count(apellido) 
from personales 
group by apellido
order by count(apellido) desc;


SELECT departamento_id, nombre, apellido, count(departamento_id)
from personales 
where apellido = "Williams" 
GROUP BY departamento_id, nombre, apellido;

update personales set departamento_id = 4, nombre = 'Lindsay' 
WHERE departamento_id=1 and nombre='Tyler';

-- 1. MOSTRAR DE LOS NOMBRES MAS USADOS e indicar cuantos son

-- 2. MOSTRAR CUANTOS EMPLEADOS HAY EN EL DEPARTAMENTO = 2
-- 3. MOSTRAR cuantas personas no tienen jefe
-- 4. MOSTRAR EN FORMA DESCENDENTE LOS JEFES CON LA CANTIDAD DE SUBORDINADOS
-- 5. MOSTRAR el nombre del departamento y su cantidad de empleados

-- DEPARTAMENTO 	|  CANTIDAD DE EMPLEADOS
-- Ventas			|   		150
-- Administracion	|   		200
-- Finanzas			|   		85
-- Marketing		|   		56











