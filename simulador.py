# hacer una Factory para generar 1000 usuarios aleatoriamente
from faker import Faker
from faker.providers import internet

faker = Faker()
faker.add_provider(internet)


def usuarios_fake(limite):
    for id in range(0, limite):
        nombre = faker.first_name()
        apellido = faker.last_name()
        dni = faker.random_int(min=10000000, max=99999999)
        email = faker.ascii_free_email()
        print("INSERT INTO usuarios VALUES (%s, '%s', '%s', '%s', '%s');" %
              (id+1, nombre, apellido, email, dni))


usuarios_fake(1000)
