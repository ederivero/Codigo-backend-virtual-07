# una forma de almacenar varios valores en una misma variable
# LISTAS
colores = ['azul', 'negro', 'amarillo', 'purpura']
misc = ['eduardo', 18, False, 14.5, '2015-04-14', ['1', 2, 3]]
# imprimir la primera posicion
print(colores[1])
# imprimir la ultima posicion de la lista
print(colores[len(colores)-1])
print(colores[-1])
# imprimir desde la 0 hasta la <2
print(colores[0:2])
# imprimir desde la posicion 1
print(colores[1:])

# la forma de copiar el contenido y ya no utilizar la misma posicion de memoria para ambas variables es:
# en js se usaria colores2= [...colores]
colores2 = colores[:]
colores2[0] = "violeta"
print(colores)

nombre = "Juanito"
print(nombre[1])
# solamente se puede usar las posiciones de una variable str(STRING) para leer mas no para modificar su contenido
# nombre[1] = "e"

# metodo para agregar un nuevo elemento a una lista
colores.append('indigo')
print(colores)
# metodo para eliminar un valor solamente si existe lo eliminara, sino indicara un error
colores.remove("azul")
print(colores)
# el metodo pop ademas de eliminarlo, lo podemos almacenar en una variable
colore_eliminado = colores.pop(0)
print(colores)
print(colore_eliminado)
