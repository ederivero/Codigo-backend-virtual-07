class Persona:
    nombre = "eduardo"
    apellido = "de rivero"

    def imprimir_nombre(cls):
        print("El nombre es:"+cls.nombre)


Persona.imprimir_nombre = classmethod(Persona.imprimir_nombre)

# Persona.imprimir_nombre()


class Plato:
    def __init__(self, nombre, precio):
        self.nombre = nombre
        self.precio = precio

    @classmethod
    def mostrar_precio(cls, nombre, precio):
        return cls(nombre, precio)

    def mostrar_nombre(self):
        print("el nombre es %s" % self.nombre)


plato1 = Plato("chanfainita", "30.00")
plato2 = Plato("anticuchos", "10.00")
plato3 = Plato.mostrar_precio("seco", "50")
print(plato1.precio)
print(plato2.precio)
print(plato3.nombre)
print(plato3.precio)
plato3.mostrar_nombre()
