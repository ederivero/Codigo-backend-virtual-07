from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
# esto sirve para que si tenemos un archivo .env jale todas las variables como si fuesen variables de entorno
from dotenv import load_dotenv
from os import environ
load_dotenv()

app = Flask(__name__)
app.config['MYSQL_HOST'] = environ.get("HOST")
app.config['MYSQL_USER'] = environ.get("USER")
app.config['MYSQL_PASSWORD'] = environ.get("PASSWORD")
app.config['MYSQL_DB'] = environ.get("DATABASE")
app.config['MYSQL_PORT'] = int(environ.get("PORT"))

# Crearmos una instancia de la clase MySQL y le pasamos a su constructor la configuracion
mysql = MySQL(app)

# ALTER USER 'username'@'url' IDENTIFIED WITH mysql_native_password BY 'password';
# si es que nos sale un error de conexion


@app.route("/alumnos")
def gestion_alumnos():
    # primero creo mi cursor que se conectara a la bd
    cur = mysql.connection.cursor()
    # registro la sentencia ya sea un DDL o DML
    cur.execute("SELECT * FROM ALUMNOS")
    # capturo la informacion a partir de la consulta
    # retornar la data de la siguiente forma
    # [
    #     {
    #         "id":1,
    #         "matricula":"4389",
    #         "nombre":"Heidi",
    #         "apellido":"Jenkins",
    #         "localidad":"New Autumnside",
    #         "fecha_nacimiento":"Thu, 15 Aug 1996 00:00:00 GMT"
    #     },
    #     {
    #         ...
    #     }
    # ]
    data = cur.fetchall()
    return {
        "data": data
    }


app.run(debug=True)
