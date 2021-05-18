# Esto es un comentario
# Variables numericas
numero = 1
numeroDecimal = 10.5

# Variables de texto
nombre = "eduardo"
apellido = 'de rivero'
apellido_materno = 'o"really'
texto = """
Hola:
    ¿Como estan?
 asdasdasd
"""
# sirve para saber que tipo de dato es esa variable
# recordemos que en python el tipo de dato de la variable esta definida por su contenido
# type(variable)
print(type(numeroDecimal))
print(type(texto))

# print => para imprimir en la consola todo lo que querramos
# para declarar una variable sin valor seria de la siguiente manera:
nombrecito = None  # None => null | undefined

# Para definir una variable SIEMPRE tiene que comenzar con una letra NUNCA con numeros

# Para eliminar una variable
del nombrecito

# Para definir varias variables en una sola linea
nombre, nacionalidad = "Eduardo", "peruano"
