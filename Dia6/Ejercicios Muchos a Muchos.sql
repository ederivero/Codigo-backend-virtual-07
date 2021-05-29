-- VISUALIZAR TODOS LOS ALUMNOS CON SUS CURSOS
SELECT * -- selecciono todas las columnas
from alumnos -- su tabla base sera alumnos
    inner join alumnos_cursos -- join (coincidencia) alumnos_cursos
    on alumnos.id = alumnos_cursos.alumnos_id -- CUANDO alumnos.id sea igual alumnos_cursos.alumnos_id
    inner join cursos -- join cursos (todavia no estoy indicando con que tabla voy a hacer la coincidencia)
    on alumnos_cursos.cursos_id = cursos.id;
-- CUANDO alumnos_cursos.cursos_id sea igual cursos.id
-- 1. Los cursos con su cantidad de alumnos
select nombre,
    count(nombre) as 'cantidad de alumnos'
from cursos as c
    inner join alumnos_cursos as ac on c.id = ac.cursos_id
group by nombre;
-- 2. El alumno con mas cursos matriculados
-- El metodo concat_ws funciona de la sgte manera
-- minimo 3 parametros como minimo en el cual el 1er parametro sera para indicar cual es el separador entre
-- columna y columna, y luego los demas parametros sirven para concatenar
select concat_ws(' ', matricula, nombre, apellido) as 'ALUMNO',
    count(*) 'CURSOS MATRICULADOS'
from alumnos as a
    inner join alumnos_cursos as ac on a.id = ac.alumnos_id
group by concat_ws(' ', matricula, nombre, apellido)
order by count(*) desc;
-- 3. El alumno mas viejo y sus cursos
select *
from alumnos
    inner join alumnos_cursos on alumnos.id = alumnos_cursos.alumnos_id
    inner join cursos on alumnos_cursos.cursos_id = cursos.id
group by alumnos.id
order by fecha_nacimiento asc
limit 1;
-- 4. los cursos que empezaron entre el 01 de mayo y el 01 de junio
select *
from cursos
where fecha_inicio between "2021-05-01" and "2021-06-01";