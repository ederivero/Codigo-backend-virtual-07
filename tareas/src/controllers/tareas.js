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

export const buscarTarea = (req, res) => {
  // utilizar los query params.
  console.log(req.query);
  const filters = req.query;
  let resultado = [];

  resultado = tareas.filter((tarea) => {
    let isValid = true;
    for (let key in filters) {
      console.log(key, tarea[key], filters[key]);
      // el operador logico AND (&&) lo que hace es que compara las dos condicionales, si ambas son verdaderas, todo sera verdadero, caso contrario sera Falso
      isValid = isValid && tarea[key] == filters[key];
    }
    return isValid;
  });

  // buscar la tarea segun el valor, si es nombre buscar x el nombre, si es estado, buscar por el estado y si es id buscar por el id, y si manda todos buscar todos
  res.json({
    message: "Ok",
    content: resultado,
  });
};
