from flask import Flask, request
# Para usar las variables declaradas en el archivo .env
from dotenv import load_dotenv
from os import environ
load_dotenv()

app = Flask(__name__)
# https://docs.sqlalchemy.org/en/14/core/engines.html
# https://flask-sqlalchemy.palletsprojects.com/en/2.x/config/#connection-uri-format
# dialect://username:password@host:port/database
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get("DATABASE_URI")


@app.route("/")
def initial_controller():
    return {
        "message": "Bienvenido a mi API de RECETAS DE POSTRES 🎂"
    }


if __name__ == '__main__':
    app.run(debug=True)
