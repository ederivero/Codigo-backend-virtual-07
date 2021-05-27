from flask import Flask, request
from flask_cors import CORS

# __name__ => muestra si el archivo en el cual se esta llamando a la clase Flask, es el archivo principal del proyecto, para evitar que la instancia de la clase de Flask se pueda crear varias veces (patron Singleton)
# si estamos en el archivo principal nos imprimira => __main__, caso contrario imprimira otra cosa
# print(__name__)
app = Flask(__name__)
# hacerlo de esta manera hara que todos los valores se seteen a un que permita absolutamente TODOS los origenes, metodos y cabeceras
CORS(app, methods=['GET', 'POST'], origins=['*'])
productos = []


# un decorador es un patron de software que se utiliza para modificar el funcionamiento de una funcion o clase en particular sin la necesidad de emplear otro metodos como la herencia
@app.route("/")
def inicio():
    print("Me hicieron un llamado")
    return "Saludos desde mi API", 200


@app.route("/productos", methods=['GET', 'post'])
def gestion_productos():
    # print(request.method)
    # request.get_json() => podemos ver la informacion que me esta brindando el frontend mediante el body
    if request.method == "POST":
        data = request.get_json()
        print(data)
        productos.append(data)
        return {
            "message": "Producto creado exitosamente",
            "content": data
        }, 201
    elif request.method == "GET":
        return {
            "message": "Estos son los productos registrados",
            "content": productos
        }, 200


# NOTA! Al hacer un get queda PROHIBIDO enviar informacion mediante el BODY
@app.route("/productos/<int:id>", methods=['PUT', 'DELETE', 'GET'])
def gestion_producto(id):
    print(id)
    if len(productos) <= id:
        return {
            "message": "Producto no encontrado"
        }, 404

    if request.method == "GET":
        return {
            "content": productos[id]
        }, 200

    elif request.method == "DELETE":
        productos.pop(id)
        return {
            "message": "Producto eliminado exitosamente"
        }

    elif request.method == "PUT":
        data = request.get_json()
        productos[id] = data
        return {
            "message": "Producto actualizado exitosamente",
            "content": productos[id]
        }, 201


@app.route("/productos/buscar")
def buscar_productos():
    print(request.args.get("nombre"))
    return "ok"


# debug = True => que cada vez que hagamos un cambio y lo guardemos automaticamente se reiniciara mi servidor con los nuevos cambios
app.run(debug=True)
# NOTA!: todo codigo que pongamos DESPUES del metodo run NUNCA SE ejecutara, porque el metodo run() hace que se quede "colgado" mi programa levantando un servidor
