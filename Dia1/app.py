from flask import Flask, request
# Para usar las variables declaradas en el archivo .env
from dotenv import load_dotenv
from os import environ
from config.conexion_bd import base_de_datos
from models.postre import PostreModel
from models.preparacion import PreparacionModel
from models.ingrediente import IngredienteModel
from models.receta import RecetaModel

load_dotenv()

app = Flask(__name__)
# https://docs.sqlalchemy.org/en/14/core/engines.html
# https://flask-sqlalchemy.palletsprojects.com/en/2.x/config/#connection-uri-format
# dialect://username:password@host:port/database
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get("DATABASE_URI")
# si se establece en TRUE, Flask-SQLAlchemy rastreara las modificaciones de los objetos y lanzara señales . su valor predeterminado es None, igual habilita el tracking pero emite una advertencia que se dehabilitara de manera predeterminada en futuras versiones. esto consume memoria adicional y si no se va a utilizar es mejor desactivarlo (False)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# iniciar la bd, para darle las credenciales definidas en el config
base_de_datos.init_app(app)

# crea todas las tablas definidas en los modelos en el proyecto
base_de_datos.create_all(app=app)


@app.route("/")
def initial_controller():
    return {
        "message": "Bienvenido a mi API de RECETAS DE POSTRES 🎂"
    }


if __name__ == '__main__':
    app.run(debug=True)
