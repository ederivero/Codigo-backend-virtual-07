from faker import Faker
from faker.providers import internet
fake = Faker()
fake.add_provider(internet)
# GENERA GRACIAS AL PROVIDE DE internet, una imagen cuyo ancho y alto sera de 100px
print(fake.image_url(width=100, height=100))
# GENERAR 500 empleados
print(fake.unique.first_name())
# GENERA UN APELLIDO ALEATORIO
print(fake.last_name())
# GENERA UN CORREO ALEATORIO
print(fake.email())
# GENERA UN NOMBRE ALEATORIO
print(fake.first_name())
# GENERA UN NUMERO RANDOM ALEATORIO
print(fake.random_int(min=1, max=501))
print(fake.uuid())

# GENERAR DATA SIMULADA DE 500 personales
# 670b9562-b30d-52d5-b827-655787665500
# INSERT INTO PERSONALES VALUES (1, "EDUARDO", "DE RIVERO", uuid, 2, null);
