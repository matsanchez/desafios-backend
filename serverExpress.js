const http = require("http");
const Manager = require("./manager.js");
const express = require("express");
const app = express();
const PORT = 8000;
const manager = new Manager("products.txt");

app.get("/", (req, res) => {
  const model = `
    <style type="text/css">
        h1 { font-size: 80px; color: red}
        h2 { font-size: 50px}
        section { display: flex; justify-content:center; flex-direction:column;text-align: center}
        button{width: 200px; padding: 25px; font-size: 15px}
    </style>
    <section>
        <h1>Desafio Clase 3</h1>
        <h2>Matias Sanchez</h2>
        <div>
            <button onclick="window.location.href='/productos'">Productos</button>
            <button onclick="window.location.href='/productoRandom'">Producto Random</button>
        </div>
    </section>
    `;
  res.send(model);
});

app.get("/productos", async (req, res) => {
  const allProducts = await manager.getAll();
  res.send(allProducts);
});

app.get("/productoRandom", async (req, res) => {
  const allProducts = await manager.getAll();
  const productRandom = allProducts.message[Math.floor(Math.random() * allProducts.message.length)];
  res.send(productRandom);
});

app.get("*", (req, res) => {
  const model = `
    <style type="text/css">
        h1 { font-size: 80px; text-align:center; color:red; margin-top:150px}
        section { display: flex; justify-content:center; flex-direction:column;text-align: center}
        button{width: 200px; padding: 25px; font-size: 15px}
    </style>
    <section>
        <div>
            <h1>Ruta no encontrada<br>ERROR 404!</h1>
            <button onclick="window.location.href='/'">Volver</button>
        </div>
    </section>
    `;
  res.send(model);
});

const server = app.listen(PORT, () => {
  console.log(`>>>> Server started at http://localhost:${PORT}`);
});
