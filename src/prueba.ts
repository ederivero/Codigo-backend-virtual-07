let nombre: string = "eduardo";

enum ESexo {
  MASCULINO = "MASCULINO",
  FEMENINO = "FEMENINO",
}

// las interfaces son lo mismos que el type pero las interfaces se pueden sobreescribir mientras que los types no, ademas en el caso de usar una interfaz dentro de otra simplemente se usa el extends a diferencia del type que tienes que usar el &, para mas informacion:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
interface IPersona {
  nombre: string;
  edad: number;
  sexo?: ESexo;
}

type TPersona = {
  nombre: string;
  edad: number;
  sexo?: ESexo;
};

let persona: IPersona = {
  edad: 18,
  nombre: "raul",
  sexo: ESexo.FEMENINO,
};

function prueba<T>(personas: T[]): T {
  return personas[0];
}

function prueba2(personas: any[]): any {
  return personas[0];
}

let respersona = prueba(["eduardo", "jose", "ricardo"]);
const edades = prueba([18, 20, 30, 50]);
edades.toExponential();

const nota = prueba2([1, 2, 3]);
nota.toExponential();
prueba([1, 2, 3]);
prueba(["raul", "carlos", "daniel", "ricardo"]);
prueba([true, false, "true"]);
