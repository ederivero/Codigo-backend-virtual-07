# las excepciones son formas de evitar que nuestros programas se crasheen (se caigan) y asi controlar de una mejor manera el ciclo de nuestro programa
# try:
#     numero = input("Ingresa un numero")
#     print(int(numero)+10)
#     print(10/0)
# except ZeroDivisionError:
#     print("No se puede dividir entre 0")
# except ValueError:
#     print("Debiste ingresar un numero!!!")
# except:
#     print("Algo salio mal")
# print("Yo soy el codigo restante")

# finally => no le importa si todo salio bien o si hubo un error, igual se ejecutara, PERO luego mostrara el error si es que no se declaro un except
# else => para usar el else tenemos que obligatoriamente declara un except, y este se ejecutara cuando no ingresa a ningun except, osea la operacion fue exitosa
# try:
#     print(10/1)
# except:
#     print("Error!")
# else:
#     print("Todo bien")
# finally:
#     print("Yo me ejecuto si o si")

# Ingresar 4 numeros, si uno o varios de ellos no es un formato correcto entonces indicar, pero continuar con los demas y al final mostrar todos los que fueron ingresados correctamente
numeros = []
for numero in range(1, 5):
    try:
        ingreso = int(input(f"Ingrese el numero {numero}: "))
        numeros.append(ingreso)
    except:
        print("Numero incorrecto!")
print("Los numeros ingresados son: ", numeros)
