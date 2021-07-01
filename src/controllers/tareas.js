import { tareas } from "../../tareas.json";
const tareas_temporales = [];
// arrow function
export const crearTarea = (req, res) => {
  // el req.body sirve para luego de haberle declarado el parser me retornara todo lo que el cliente me mando mediante el body
  const tarea = req.body;
  tarea.estado = true;

  console.log(tarea);
  tareas_temporales.push(tarea);
  res.json({
    success: true,
    content: tarea,
    message: "Tarea creada exitosamente",
  });
};

export const listarTareas = (req, res) => {
  console.log(tareas);
  console.log(tareas_temporales);
  // fusionar las dos tareas y retornar en el content la combinacion de ambas
  // Forma 1
  //   tareas.concat(tareas_temporales);
  //   res.json({
  //     success: true,
  //     content: tareas.concat(tareas_temporales),
  //     message: null,
  //   });

  // Forma 2
  res.json({
    success: true,
    content: [...tareas, ...tareas_temporales],
    message: null,
  });

  // Forma 3
  //   tareas.map((tarea) => {
  //     tareas_temporales.push(tarea);
  //   });
  //   res.json({
  //     success: true,
  //     content: tareas_temporales,
  //     message: null,
  //   });
};

export const devolverTarea = (req, res) => {
  // el req.params sirve para capturar los valores pasados por la url
  console.log(req.params);
  const { id } = req.params;
  console.log(id);
  //   req.params;
  // usando el .filter() devolver la tarea que coincida con el id si no existe indicar que no existe
  const tarea = [...tareas, ...tareas_temporales].filter(
    (tarea) => tarea.id === +id
  );
  console.log(tarea);
  // NOTA: tiene que validar tanto las tareas como las tareas_temporales
  res.json({
    success: true,
    content: tarea,
    message: null,
  });
};
