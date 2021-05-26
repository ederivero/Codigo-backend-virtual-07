from flask import Flask, request

# __name__ => muestra si el archivo en el cual se esta llamando a la clase Flask, es el archivo principal del proyecto, para evitar que la instancia de la clase de Flask se pueda crear varias veces (patron Singleton)
# si estamos en el archivo principal nos imprimira => __main__, caso contrario imprimira otra cosa
# print(__name__)
app = Flask(__name__)


# un decorador es un patron de software que se utiliza para modificar el funcionamiento de una funcion o clase en particular sin la necesidad de emplear otro metodos como la herencia
@app.route("/")
def inicio():
    print("Me hicieron un llamado")
    return "Saludos desde mi API"


@app.route("/productos", methods=['GET', 'post'])
def gestion_productos():
    # print(request.method)
    # request.get_json() => podemos ver la informacion que me esta brindando el frontend mediante el body
    if request.method == "POST":
        data = request.get_json()
        print(data)
        return {
            "message": "Producto creado exitosamente"
        }
    elif request.method == "GET":
        return {
            "message": "Estos son los productos registrados"
        }


# debug = True => que cada vez que hagamos un cambio y lo guardemos automaticamente se reiniciara mi servidor con los nuevos cambios
app.run(debug=True)
# NOTA!: todo codigo que pongamos DESPUES del metodo run NUNCA SE ejecutara, porque el metodo run() hace que se quede "colgado" mi programa levantando un servidor
