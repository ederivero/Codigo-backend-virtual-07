import { Tarea } from "../config/modelos";
// https://sequelize.org/v5/manual/querying.html#operators
import { Op } from "sequelize";

export const serializadorTarea = (req, res, next) => {
  // analizamos el body
  const { tareaNombre } = req.body;

  // console.log(tareaNombre.trim().length);
  // si no hay el tareaNombre
  if (tareaNombre && tareaNombre.trim().length > 0) {
    next();
  } else {
    return res
      .json({
        success: false,
        content: "Se necesita un nombre",
        message: "error al crear la nueva tarea",
      })
      .status(400);
  }
};

export const crearTarea = async (req, res) => {
  // para registrar una nueva tarea
  // si usamos el build() se tendra que realizar en dos pasos el guardado del registro, primero construyo el objeto y luego llamaria al metodo save()
  // Tarea.build({tareaNombre: 'Hacer el MER',...}).save()

  // El segundo metodo (1 solo paso)
  //{
  //   nombre:"hacer el mer",...
  // }
  try {
    const { tareaId, tareaNombre } = await Tarea.create(req.body);
    const datos = { tareaId, tareaNombre };
    // const nuevaTarea = await Tarea.create(req.body);
    // console.log(nuevaTarea.toJSON());

    return res
      .json({
        success: true,
        content: datos,
        message: "Nueva tarea creada con exito",
      })
      .status(201);
  } catch (error) {
    return res
      .json({
        success: false,
        content: error,
        message: "error al crear la nueva tarea",
      })
      .status(400);
  }
};

export const listarTareas = async (req, res) => {
  // para seleccionar que atributos queremos mostrar usaremos la clausula attributes y tendremos que indicar en forma de un array todos los elementos a mostrar (tienen que ser los que definimos en el modelo) y si queremos modificar el nombre entonces usaremos un array para indicar en la primera posicion el nombre de la columna en la bd y luego el nombre a mostrar
  const tareas = await Tarea.findAll({
    // attributes: ["tareaNombre", ["id", "id de la tarea"]],
    attributes: {
      exclude: ["createdAt"],
    },
  });
  return res.json({
    success: true,
    content: tareas,
    message: null,
  });
};

export const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  // UPDATE TAREAS set col1=val1 WHERE id = 1
  const resultado = await Tarea.update(req.body, {
    where: {
      tareaId: id,
    },
    // returning: true, // Solo funciona en postgresql
  });
  // luego de haber actualizado retornar la tarea actualizada, caso contrario indicar que no se encontro la tarea y un estado 400
  if (resultado[0] === 1) {
    return res.json({
      success: true,
      content: await Tarea.findByPk(id),
    });
  } else {
    return res
      .json({
        success: false,
        content: null,
        message: "No se encontro la tarea a actualizar",
      })
      .status(400);
  }
};

export const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  // const { id } = req.body;
  const resultado = await Tarea.destroy({
    where: { tareaId: id },
  });
  // validar la eliminacion indicar si se elimino o si no se encontro
  console.log(resultado);
  if (resultado === 1) {
    return res.json({
      success: true,
      content: null,
      message: "Tarea eliminada con exito",
    });
  } else {
    return res
      .json({
        success: false,
        content: null,
        message: "No se encontro la tarea a eliminar",
      })
      .status(400);
  }
};

export const tareaBusqueda = async (req, res) => {
  // SELECT * FROM TAREAS WHERE NOMBRE LIKE '%python%';
  const { nombre, estado, id } = req.query;
  // me mande el estado , el nombre y el id y dependiendo de lo que me mande realizare la busqueda
  // validaria si hay un nombre, estado o id
  let filtro = [];

  if (nombre) {
    // si hay el nombre
    filtro = [...filtro, { tareaNombre: { [Op.like]: "%" + nombre + "%" } }];
  }
  if (id) {
    // si hay el id
    filtro = [...filtro, { tareaId: id }];
  }
  if (estado) {
    // si hay el estado
    filtro = [...filtro, { tareaEstado: estado }];
  }

  const resultado = await Tarea.findAll({
    where: {
      [Op.and]: filtro,
      // tareaNombre: {
      //   [Op.like]: "%" + nombre + "%",
      // },
    },
  });

  console.log(filtro);

  return res.json({
    success: true,
    content: resultado,
  });
};
