import { Storage } from "@google-cloud/storage";
import { Express } from "express";

// Creao la instancia de la clase Storage con la configuracion de las credenciales y el id del proyecto
const storage = new Storage({
  projectId: "zapateria-codigo-eduardo",
  keyFilename: "./credenciales_firebase.json",
});
// Enlazo mi bucket (donde se almacenaran todas las imagenes)
// se copia el link que muestra el bucket PERO sin el protocolo gs ni el / del final
const bucket = storage.bucket("zapateria-codigo-eduardo.appspot.com");

export const subirArchivoUtil = (
  archivo: Express.Multer.File,
  path: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!archivo) {
      reject("No se encontro el archivo");
    }
    // comienza el proceso de subida de imagenes

    const newFile = bucket.file(`${path}/${archivo.originalname}`);

    // agregar configuracion adicional de nuestro archivo como su metadata
    const blobStream = newFile.createWriteStream({
      metadata: {
        contentType: archivo.mimetype,
      },
    });

    // ahora puedo escuchar sus eventos (socket)
    blobStream.on("error", (error) => {
      reject(error.message);
    });

    // veremos el evento si es que la carga termino exitosamente
    blobStream.on("finish", async () => {
      try {
        const link = await newFile.getSignedUrl({
          action: "read",
          // La fecha actual + 1000 ms * segundos * minutos => cuantoas horas durara la token
          expires: Date.now() + 1000 * 60 * 60, // caducara en una hora
        }); // MM-DD-YYYY
        // return link;
        return resolve(link.toString());
      } catch (error) {
        reject(error);
      }
    });

    // aca se le indica que el procedimiento terminara pero que para que gestione todo la transferencia del archivo se el enviara sus bytes
    blobStream.end(archivo.buffer);
  });
};

export const generarUrl = async (
  carpeta: string,
  fileName: string
): Promise<string> => {
  try {
    const url = await bucket.file(`${carpeta}/${fileName}`).getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 60,
    });
    return url.toString();
  } catch (error) {
    return error;
  }
};

export const eliminarArchivoUtitl = async (
  carpeta: string,
  archivo: string
) => {
  try {
    const respuesta = await bucket
      .file(`${carpeta}/${archivo}`)
      .delete({ ignoreNotFound: true });

    console.log(respuesta);

    return respuesta;
  } catch (error) {
    return error;
  }
};
