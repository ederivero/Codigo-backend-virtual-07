# ejemplo:
# Para evitar que en cada impresion se ejecute en una nueva linea, se puede agregar el parametro end y este indicara como queremos que actue al finalizar la linea, su valor por defecto es \n, pero si le cambiamos a * entonces, al finalizar la impresion, colocara un asterisco en vez de un salto de linea
# for numero in range(5):
#     print(numero, end="*")

# Escriba una funcion que le pida al usuario ingresar la altura y el ancho de un rectangulo y
# que lo dibuje usando *, ejemplo:
# altura: 5
# ancho: 4
# Resultado:
# ****
# ****
# ****
# ****
# ****
def dibujar_rectangulo():
    altura = int(input("Ingrese la altura: "))
    ancho = int(input("Ingrese el ancho: "))
    for numero in range(altura):
        for numero2 in range(ancho):
            print("*", end="")
        print("")


# dibujar_rectangulo()
# Escribir una funcion que nosotros le ingresemos el grosor de un octagono y que lo dibuje
# Ejemplo:
# Grosor: 5
#       *****
#      *******
#     *********
#    ***********
#   *************
#   *************
#   *************
#   *************
#   *************
#    ***********
#     *********
#      *******
#       *****

def dibujar_octagono():
    grosor = int(input("Ingrese el grosor del octagono"))
    if grosor == 1:
        return print("No puede tener como grosor el valor de 1")
    # es el grosor maximo que va a tener mi octagono
    tope = (2*(grosor - 1)) + grosor
    espacio = grosor
    for numero in range(grosor, tope+1, 2):
        espacio -= 1
        espacios = " "*espacio
        simbolo = "*"*numero
        if(numero == tope):
            limite = 0
            while(limite < grosor):
                print(simbolo)
                limite += 1
            break
        print(espacios+simbolo)
    espacio += 1
    for numero in range(tope-2, grosor-1, -2):
        espacios = " "*espacio
        espacio += 1
        simbolo = "*"*numero
        print(espacios+simbolo)


# dibujar_octagono()
# De acuerdo a la altura que nosotros ingresemos, nos tiene que dibujar el triangulo
# invertido
# Ejemplo
# Altura: 4
# ****
# ***
# **
# *
def triangulo_invertido():
    altura = int(input("Ingresa la altura del triangulo: "))
    for fila in range(altura, 0, -1):
        print("*"*fila)


# Ingresar un numero entero y ese numero debe de llegar a 1 usando la serie de Collatz
# si el numero es par, se divide entre dos
# si el numero es impar, se multiplica por 3 y se suma 1
# la serie termina cuando el numero es 1
# Ejemplo 19
# 19 58 29 88 44 22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 12
def serie_collatz():
    numero = int(input("Ingresa un numero: "))
    while(numero != 1):
        if(numero % 2 == 0):
            numero /= 2
        else:
            numero = (numero * 3) + 1
        print(numero)


# Una vez resuelto todos los ejercicios, crear un menu de seleccion que permita escoger
# que ejercicio queremos ejecutar hasta que escribamos "salir" ahi recien va a terminar
# de escoger el ejercicio

while(True):
    opc = input("Escoga la opcion del ejercicio o escriba salir para salir del programa. \n\t1. Dibujar Rectangulo\n\t2. Dibujar Exagono\n\t3. Dibujar Triangulo Invertido\n\t4. Serie de Collatz\n\t5. Salir\n")
    if(opc == "1"):
        dibujar_rectangulo()
    elif(opc == "2"):
        dibujar_octagono()
    elif(opc == "3"):
        triangulo_invertido()
    elif(opc == "4"):
        serie_collatz()
    else:
        print("ADIOS!")
        break
