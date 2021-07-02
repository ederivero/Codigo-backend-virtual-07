const miPromesa = new Promise((resolve, reject) => {
  let x = 0;
  x++;
  reject("la promesa fallo 😢");
  //   resolve(x);
});
// el then se ejecutara cuando la promesa sea satisfactoria (resolve)
const respuestaDeLaPromesa = miPromesa
  .then((respuesta) => {
    return respuesta;
  })
  .catch((error) => {
    return error;
  });

async function esperar() {
  try {
    const respuestaDeLaPromesaAwait = await miPromesa;
    console.log(respuestaDeLaPromesaAwait);
  } catch (error) {
    console.log(error);
  }
}
esperar();
console.log(respuestaDeLaPromesa);
