class Electrodomestico:
    def __init__(self):
        self.__nombre = ''
        self.__color = ''
        self.__peso = 0

    def __setNombre(self, nombre):
        """El setter sirve para definir un atributo de una forma mas formal"""
        self.__nombre = nombre

    def __getNombre(self):
        """El getter sirve para retornar el valor del atributo privado"""
        return self.__nombre

    def __deleteNombre(self):
        """El deleter sirve para borrar ese atributo de la instancia de la clase"""
        del self.__nombre
    # el metodo property sirve para definir nuestras funciones, get, set, delete
    nombre = property(__getNombre, __setNombre, __deleteNombre)
    # si definimos correctamente el get, set, delete entonces no se debe de utilizar las funciones definidas previamente


objElectrodomestico = Electrodomestico()
objElectrodomestico.nombre = "Licuadora"  # aca utilizo el setter
print(objElectrodomestico.nombre)  # aca utilizo el getter
del objElectrodomestico.nombre  # aca utilizo el deleter
