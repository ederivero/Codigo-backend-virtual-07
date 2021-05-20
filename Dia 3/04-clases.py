class Mueble:
    tipo = ""
    valor = 00.00
    colores = []
    especificaciones = []

    def indicar_tipo(self):
        return self.tipo

    def mostrar_especificaciones(self):
        self.indicar_tipo()
        # print(Mueble.especificaciones)
        # print(self.especificaciones)
        return self.especificaciones
    # setter


# para crear una instancia de una clase se hace de la sgte manera:
objeto_mueble = Mueble()
otro_mueble = Mueble()
objeto_mueble.tipo = "SOFA"
otro_mueble.tipo = "FUTON"
print(objeto_mueble.tipo)
print(otro_mueble.tipo)
print(Mueble.tipo)
