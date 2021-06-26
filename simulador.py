from faker import Faker
from datetime import datetime
faker = Faker()


def mesas_fake(limite):
    texto = ""
    for id in range(1, limite+1):
        descripcion = id
        capacidad = faker.random_int(min=1, max=8)
        texto += "INSERT INTO MESAS VALUES (%s, '%s', %s, '%s'); \n" % (id,
                                                                        descripcion, capacidad, datetime.now())
    archivo = open("datafake.sql", "a")
    archivo.write(texto)
    archivo.close()


mesas_fake(10)
