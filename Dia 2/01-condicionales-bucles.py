# metodo que sirve para ingresar datos por la terminal
edad = input("Ingresa tu edad: ")
print(type(edad))
# para convertir datos simplemente indicamos a que tipo de dato queremos convertir, y si se puede se realizara exitosamente, sino, lanzara un error
edadEntero = int(edad)
# print(type(edadEntero))
# \n => salto de linea
# \t => tabulacion
# edad = int(input("Ingresa otra vez tu edad: \t"))
# print(float(10))

# CONDICION
# IF (SI) ELSE (SINO) ELIF (SINOSI)
# el ELIF siempre va antes del else , el else ya es como ultima medida si no logro hacer match con alguna de las anteriores condiciones
restriccion_edad = 18
if edadEntero >= restriccion_edad and edadEntero < 65:
    print("Eres mayor de edad, ya puedes viajar ✈")
elif edadEntero >= 65:
    print("Puedes irte a un crucero ")
else:
    print("Eres menor de edad, aun no puedes hacer nada 😣")


print("Yo soy el codigo comun y corriente")

# OPERADOR TERNARIO
# es una forma de hacer una validacion en una sola linea de codigo con uno o varios condicionales en el if
# SIEMPRE TIENE QUE HABER UN IF Y UN ELSE
#         "RESPUESTA SI LA CONDICION ES VERDADERA" if (condicion(es)) else "RESPUESTA SI LA CONDICION ES FALSA"
# respuesta = "ERES MAYOR DE EDAD" if(edadEntero >= 18) else "ERES MENOR DE EDAD"

# print(respuesta)

# INGRESAR UN NUMERO Y QUE DIGA SI ES POSITIVO, NEGATIVO o CERO
numero = int(input("Ingresa un numero"))

if numero > 0:
    print("El numero es positivo")
elif numero < 0:
    print("El numero es negativo")
elif numero == 0:
    # else:
    print("El numero es 0")
