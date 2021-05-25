class Persona:
    def __init__(self, nombre, fecha_nacimiento):
        """Metodo propio de las clases que sirve para que al instanciar la clase, OBLIGATORIAMENTE tenga que pasar los parametros indicados, sino no se podra continuar con la creacion de la instancia"""
        self.nombre = nombre
        self.fecha_nac = fecha_nacimiento

    def saludar(self):
        print("hola {}".format(self.nombre))

    def __str__(self):
        """Metodo que sirve para que cuando vayamos a imprimir el valor de la instancia se modifique a lo que el dev necesite"""
        return self.nombre + " su fecha de nacimiento es: " + self.fecha_nac


objPersona = Persona("Eduardo", "1991-04-22")
objPersona2 = Persona("Angel", "1989-01-14")
print(objPersona.nombre)
objPersona.saludar()
print(objPersona)
print(objPersona2)
