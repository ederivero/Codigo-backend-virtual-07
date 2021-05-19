# metodo que sirve para ingresar datos por la terminal
# edad = input("Ingresa tu edad: ")
# print(type(edad))
# para convertir datos simplemente indicamos a que tipo de dato queremos convertir, y si se puede se realizara exitosamente, sino, lanzara un error
# edadEntero = int(edad)
# print(type(edadEntero))
# \n => salto de linea
# \t => tabulacion
# edad = int(input("Ingresa otra vez tu edad: \t"))
# print(float(10))

# CONDICION
# IF (SI) ELSE (SINO) ELIF (SINOSI)
# el ELIF siempre va antes del else , el else ya es como ultima medida si no logro hacer match con alguna de las anteriores condiciones
# restriccion_edad = 18
# if edadEntero >= restriccion_edad and edadEntero < 65:
#     print("Eres mayor de edad, ya puedes viajar ✈")
# elif edadEntero >= 65:
#     print("Puedes irte a un crucero ")
# else:
#     print("Eres menor de edad, aun no puedes hacer nada 😣")


# print("Yo soy el codigo comun y corriente")

# OPERADOR TERNARIO
# es una forma de hacer una validacion en una sola linea de codigo con uno o varios condicionales en el if
# SIEMPRE TIENE QUE HABER UN IF Y UN ELSE
#         "RESPUESTA SI LA CONDICION ES VERDADERA" if (condicion(es)) else "RESPUESTA SI LA CONDICION ES FALSA"
# respuesta = "ERES MAYOR DE EDAD" if(edadEntero >= 18) else "ERES MENOR DE EDAD"

# print(respuesta)

# INGRESAR UN NUMERO Y QUE DIGA SI ES POSITIVO, NEGATIVO o CERO
# numero = int(input("Ingresa un numero"))

# if numero > 0:
#     print("El numero es positivo")
# elif numero < 0:
#     print("El numero es negativo")
# elif numero == 0:
#     # else:
#     print("El numero es 0")


# BUCLES
# FOR => repite desde hasta, es un bucle repetitivo que tiene un inicio y un final
meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO"]
# for mes in meses:
#     print(mes)
# for (let i=0; i<10; i++){...}
# cuando usamos range se pueden pasar la siguiente cantidad de parametos
# range(n) => n sera el tope y la serie comenzara en 0
# range(n,m) => n sera el piso o la cantidad inicial y m sera el tope
# range(n,m,p) => n sera el piso o la cantidad inicial, m sera el tope y p sera el cuanto se modifica en cada ciclo ese valor
# for numero in range(1, 5, 1):
#     print(numero)

# el for tambien sirve para iterar todas las colecciones de datos
diccionario = {
    "nombre": "eduardo",
    "apellido": "Martinez"
}
# en el caso de un diccionario al momento de iterar, iterara las llaves
# for llave in diccionario:
#     print(diccionario[llave])
# ingresar una tupla o diccionario

# numeros = [1, -5, 8, -14, 16, 20]
# for numero in numeros:
#     print(numero)

# for segundo in range(10):
#     print("El segundo es", segundo)

# de los siguientes numeros indicar cuantos son positivos y cuantos son negativos
numeros = [1, -4, 5, -14, -16, -50, 6, -100]
numeros_positivos = 0
numeros_negativos = 0
for numero in numeros:
    if numero > 0:
        numeros_positivos += 1
    else:
        numeros_negativos += 1
# print(f"Hay {numeros_positivos} positivos y {numeros_negativos} negativos")
# rpta: Hay 3 positivos y 5 negativos

# break => hace que el bucle finalice de manera repentina sin terminar todo el ciclo completo
# for i in range(10):
#     print(i)
#     if i == 5:
#         break

# continue => salta la iteracion actual y no permite que el resto del codigo se ejecute
# for i in range(10):
#     if i == 5:
#         continue
#     print(i)

# dados los siguientes numeros
numeros = [1, 2, 5, 9, 12, 15, 10, 34, 867, 67]
# indicar cuantos de ellos son multiplos de 3 y de 5, ademas, si hay un multiplo de 3 y de 5 no contabilizarlo
multiplo3 = 0
multiplo5 = 0
for numero in numeros:
    if numero % 3 == 0 and numero % 5 == 0:
        continue
    elif numero % 3 == 0:
        multiplo3 += 1
    elif numero % 5 == 0:
        multiplo5 += 1
# print("Hay {} multiplos de 3, {} multiplos de 5 ".format(
#     multiplo3, multiplo5))
# m3 = 3
# m5 = 2

# WHILE (MIENTRAS)
# si nunca modificamos la condicion, se ejecutara por siempre y entraremos a un bucle infinito
# edad = 25
# while edad > 18:
#     print(edad)
#     edad -= 1
# en python no hay el do while

# ingresar por teclado 3 nombres y de acuerdo a ello indicar cuantos pertenecen a la siguiente lista de personas inscritas
inscritos = ["raul", "pedro", "maria", "roxana", "margioret"]
# HINT: use in para buscar en la lista 👀
for nombre in range(1, 4):
    nombre_ingresado = input("Ingrese el nombre {}: ".format(nombre))
    if(nombre_ingresado in inscritos):
        print("Bienvenido(a) {}".format(nombre_ingresado))
