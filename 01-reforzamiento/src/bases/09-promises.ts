// promesa estandar
const prom1 = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve('Promesa resuelta');
  }, 2000);
});

prom1.then((res) => console.log(res)); // Promesa resuelta sin caso de rechazo. En caso de error, la promesa se quedaría pendiente para siempre.

// promesa con async/await
const prom2 = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promesa resuelta con async/await');
    }, 2000);
  });
};

prom2().then((res) => console.log(res));// Promesa resuelta con async/await sin caso de rechazo. En caso de error, la promesa se quedaría pendiente para siempre.

// promesa con manejo de errores
const prom3 = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    const error = Math.random() < 0.5; // Simula un error aleatorio
    if (error) {
      reject('Error en la promesa');
    } else {
      resolve('Promesa resuelta con manejo de errores');
    }
  }, 2000);
});

prom3
  .then((res) => console.log(res))
  .catch((err) => console.error(err)); // Manejo de errores con catch. En caso de error, se muestra el mensaje de error en la consola.