# crear una clase Persona en la cual se guarden su nombre, fecha nacimiento, nacionalidad, dni, ademas tambien una clase Alumno y una clase Docente en la cual el alumno , a diferencia del docente, tenga una serie de cursos matriculados, y el docente por su parte tenga un numero del seguro social y su cuenta de la CTS. En base a lo visto de herencia codificar las clases y ademas ver si hay algun atributo o metodo que deba de ser privado.
class Persona:
    def __init__(self, nombre, fec_nac, dni, nacionalidad="PERUANO"):
        self.nombre = nombre
        self.fec_nac = fec_nac
        self.nacionalidad = nacionalidad
        self.dni = dni

    def saludar(self):
        print("Hola, me llamo {}".format(self.nombre))


class Alumno(Persona):
    def __init__(self, nombre, fec_nac, dni, nacionalidad="PERUANO"):
        super().__init__(nombre, fec_nac, dni, nacionalidad)
        self.__cursos = ''

    def __setCursos(self, cursos):
        self.__cursos = cursos

    def __getCursos(self):
        return self.__cursos

    def mostrar_cursos(self):
        print("Los cursos son {}".format(self.cursos))

    cursos = property(__getCursos, __setCursos)


class Docente(Persona):
    def __init__(self, nombre, fec_nac, dni, seguro_social, nacionalidad="PERUANO"):
        super().__init__(nombre, fec_nac, dni, nacionalidad)
        self.__cts = ''
        self.seguro_social = seguro_social

    def ingresar_cts(self, cts):
        self.__cts = cts

    def mostrar_cts(self):
        print("Su cta cts es {}".format(self.__cts))


# ahora en base a esas clases se pide hacer los siguientes cambios,
# 1. crear un getter y un setter para mostrar y agregar los cursos de los alumnos ✔
# 2. hacer que el cts sea un atributo privado y que solamente se pueda ingresar su valor mediante el metodo ingresar_cts() ✔
# 3. que la nacionalidad tenga un valor predeterminado de PERUANO si es que no se asigna uno ✔

objDocente = Docente("Michael", "1985-05-01", 29562148, 1594846)
objAlumno = Alumno("Sandra", "1995-11-06", 59345196, "COLOMBIANA")

objAlumno.cursos = ["MATEMATICA", "CTA"]
objDocente.ingresar_cts(15000)
objDocente.mostrar_cts()
objAlumno.mostrar_cursos()

objPersona = Persona("Raul", "1993-11-19", "CHILENO", 48596235)
objPersona.saludar()
objAlumno.saludar()
objDocente.saludar()
