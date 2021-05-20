# una funcion es un bloque de codigo que se puede reutilizar cuantas veces sea necesario

def saludar():
    """Funcion que te saluda cordialmente"""
    print("Hola amigos buenas tardes")


saludar()

print("Ya es algo tarde")


# las funciones TAMBIEN pueden recibir parametros que son variables que solamente existiran dentro de las mismas
def saludarConNombre(nombre):
    """Funcion que recibe un nombre e imprime un saludo con ese nombre"""
    # al poner la f antes de un texto significa que lo que vaya dentro de las llaves sera codigo python
    print(f"Hola {nombre} buenas tardes")


saludarConNombre("Eduardo")


# para definir parametros opcionales se tiene que indicar cual sera su valor en el caso que al llamar a la funcion no se provea dicho parametro
def saludoOpcional(nombre=None):
    print(f"Hola {nombre} como estas")


saludoOpcional("Fernando")
saludoOpcional()

# en python no se puede volver a declarar la misma funcion, ya que, como las variables, estas se sobreescribiran y perdera su definicion anterior


# si nosotros queremos recibir parametros obligatoriamente y algunos opcionalmente, los parametros opcionales SIEMPRE tienen que ir al final de la declaracion
def registro(correo, nombre=None):
    print("Registro exitoso")


registro("ederiveroman@gmail.com")


# funcion que recibe dos numeros y si la sumatoria de ambos es par indicar su mitad y si es impar, retornar el resultado de la sumatoria
def ejercicio01(numero1, numero2):
    suma = numero1 + numero2
    if(suma % 2 == 0):
        print(suma/2)
    else:
        print(suma)


ejercicio01(10, 4)

nombre = "Eduardo"


# el parametro *args es una tupla dinamica de elementos para recibir un numero ilimitado de valores
def inscritos(*args):
    global nombre
    nombre = "Maria"
    print(nombre)
    print(args)
# si queremos modificar una variable que se encuentra de manera global (en todo el documento) en una funcion, tendremos que definir dicha variable de manera global para que, si existe fuera de la funcion, la sobreescriba, si no cambiamos el valor, mantendra el mismo que se declaro fuera de la funcion


inscritos("Eduardo", "Carlos", "Ricardo", "Gmelina", "Jesus")
inscritos(1, False, "Eduardo", 12.5)
print(nombre)


def tareas(nombre, *args):
    print(nombre)
    print(args)


tareas("TAREA BACKEND", "crear un archivo python",
       "hacer la suma de 3 numeros", "hacer la serie fibonacci")


# definir una funcion para que reciba una N cantidad de alumnos y que indique cuantos fueron aprobados y cuandos desaprobaron
def alumnos(*args):
    total = len(args)
    aprobados = 0
    desaprobados = 0
    for alumno in args:
        print(alumno["nota"])
        if alumno["nota"] > 10:
            aprobados += 1
        else:
            desaprobados += 1
    print(
        f"Hay {aprobados} aprobados y {desaprobados} desaprobado de un total de {total}")
# pass sirve para indicar que aun no esta definido alguna logica en ese bloque de codigo


alumnos({"nombre": "Eduardo", "nota": 7},
        {"nombre": "Fidel", "nota": 16},
        {"nombre": "Raul", "nota": 18},
        {"nombre": "Marta", "nota": 20},
        {"nombre": "Juliana", "nota": 14},
        {"nombre": "Fabiola", "nota": 16},
        {"nombre": "Lizbeth", "nota": 15})

# Hay 6 aprobados y 1 desaprobado de un total de 7
