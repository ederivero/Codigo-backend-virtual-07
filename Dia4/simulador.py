from datetime import datetime
from faker import Faker
from faker.providers import internet, misc, address, date_time
fake = Faker()
fake.add_provider(internet)
fake.add_provider(misc)
fake.add_provider(address)
fake.add_provider(date_time)
# GENERAR DATA SIMULADA DE 500 personales
# 670b9562-b30d-52d5-b827-655787665500
# INSERT INTO PERSONALES VALUES (1, "EDUARDO", "DE RIVERO", uuid, 2, null);


def data_personales(limite):
    for id in range(1, limite):
        nombre = fake.first_name()
        apellido = fake.last_name()
        identificador = fake.uuid4()
        departamento_id = fake.random_int(min=1, max=4)
        if id == 1:
            supervisor_id = "null"
        else:
            supervisor_id = fake.random_int(min=-10, max=id-1)
            # haremos que el numero random pueda ir desde el -10 hasta < id actual, luego, si el numero es menor o igual a 0 entonces el empleado no tendra supervisor (null)
            if supervisor_id <= 0:
                supervisor_id = "null"
        print('INSERT INTO PERSONALES VALUES ({}, "{}", "{}", "{}", {}, {});'.format(
            id, nombre, apellido, identificador, departamento_id, supervisor_id))

# GENERA GRACIAS AL PROVIDE DE internet, una imagen cuyo ancho y alto sera de 100px
# print(fake.image_url(width=100, height=100))
# GENERAR 500 empleados
# print(fake.unique.first_name())
# GENERA UN APELLIDO ALEATORIO
# print(fake.last_name())
# GENERA UN CORREO ALEATORIO
# print(fake.email())
# GENERA UN NOMBRE ALEATORIO
# print(fake.first_name())
# GENERA UN NUMERO RANDOM ALEATORIO
# print(fake.random_int(min=1, max=501))


def data_muchos(alumnos):
    alumnos += 1
    for id in range(1, alumnos):
        matricula = fake.random_int(min=1000, max=5000)
        nombre = fake.first_name()
        apellido = fake.last_name()
        localidad = fake.city()
        fecha_nacimiento = fake.date_between_dates(date_start=datetime(
            1992, 12, 30), date_end=datetime(2000, 7, 12))
        print('INSERT INTO alumnos VALUES({}, "{}", "{}", "{}", "{}", "{}");'.format(
            id, matricula, nombre, apellido, localidad, fecha_nacimiento))

    cursos = ["MATEMATICA", "COMUNICACION",
              "INFORMATICA", "PSICOLOGIA", "FILOSOFIA"]
    id_curso = 1
    for curso in cursos:
        fecha_inicio = fake.date_between_dates(date_start=datetime(
            2021, 3, 1), date_end=datetime(2021, 12, 10))
        fecha_fin = fake.date_between_dates(
            date_start=fecha_inicio, date_end=datetime(2021, 12, 10))
        print('INSERT INTO CURSOS VALUES ({},"{}","{}","{}");'.format(
            id_curso, curso, fecha_inicio, fecha_fin))
        id_curso += 1


data_muchos(2)
