from email.mime.text import MIMEText
import smtplib
# MIME = Multi-Propose Internet Mail Extensions
from email.mime.multipart import MIMEMultipart
from os import environ
from dotenv import load_dotenv
load_dotenv()

mensaje = MIMEMultipart()
password = environ.get("EMAIL_PASSWORD")  # contraseña del correo
mensaje['From'] = environ.get("EMAIL")  # correo del remitente
mensaje['Subject'] = "Solicitud de olvido de contraseña"  # Titulo del correo


def enviarCorreo(destinatario, nombre, link):
    """Funcion que sirve para enviar un correo"""
    mensaje['To'] = destinatario
    texto = """Hola {}!
    Has solicitado recuperar tu contraseña. Para tal efececto te enviamos el siguiente link al que deberás ingresar para completar el cambio:
    {}

    Si no fuiste tu, ignora este mensaje.
    """.format(nombre, link)
    # luego de definir el cuerpo del correo, lo agregamos al mensaje mediante su metodo attach y en formato MIMEText en el cual recibira el texto y luego el formato a convertir, si queremos enviar un html entonces deberemos de poner en 'html' , caso contrario si enviamos un texto plano (puro texto) su formato sera 'plain'
    mensaje.attach(MIMEText(texto, 'plain'))
    try:
        # configuro mi servidor SMTP
        servidorSMTP = smtplib.SMTP('smtp.gmail.com', 587)
        # indico que el protocolo sera tls
        servidorSMTP.starttls()
        # inicio sesion en mi servidor de correo con las credenciales asignadas previamente
        servidorSMTP.login(mensaje['From'], password)
        servidorSMTP.sendmail(
            from_addr=mensaje['From'],
            to_addrs=mensaje['To'],
            msg=mensaje.as_string()
        )
        servidorSMTP.quit()
        return True
    except Exception as e:
        print(e)
        return False
