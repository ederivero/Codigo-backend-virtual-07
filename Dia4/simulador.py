from faker import Faker
from faker.providers import internet, misc
fake = Faker()
fake.add_provider(internet)
fake.add_provider(misc)
# GENERAR DATA SIMULADA DE 500 personales
# 670b9562-b30d-52d5-b827-655787665500
# INSERT INTO PERSONALES VALUES (1, "EDUARDO", "DE RIVERO", uuid, 2, null);

for id in range(1, 501):
    nombre = fake.first_name()
    apellido = fake.last_name()
    identificador = fake.uuid4()
    departamento_id = fake.random_int(min=1, max=5)
    if id == 1:
        supervisor_id = "null"
    else:
        supervisor_id = fake.random_int(min=-10, max=id)
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
