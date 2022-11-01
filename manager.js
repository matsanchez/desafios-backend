const fs = require("fs");
const pathToFile = "./products.txt";

class Manager {
  save = async (product) => {
    if (!product.title || !product.price) return { status: "error", message: "missing Fields" };
    try {
      if (fs.existsSync(pathToFile)) {
        let data = await fs.promises.readFile(pathToFile, "utf-8");
        let products = JSON.parse(data);
        let id = products[products.length - 1].id + 1;
        product.id = id;
        products.push(product);
        await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2));
        return { status: "success", message: "Producto Agregado" };
      } else {
        product.id = 1;
        await fs.promises.writeFile(pathToFile, JSON.stringify([product], null, 2));
        return { status: "success", message: "Producto Agregado", product };
      }
    } catch (error) {
      return { status: "error", message: error.message };
    }
  };
  getById = async (id) => {
    if (!id) return { status: "error", message: "Indique el Id por favor" };
    if (fs.existsSync(pathToFile)) {
      let data = await fs.promises.readFile(pathToFile, "utf-8");
      let products = JSON.parse(data);
      let productId = products.find((prod) => prod.id === id);
      if (productId) return { status: "success", message: productId };
      return { status: "error", message: "Producto no Encontrado" };
    } else {
      return { status: "error", message: err.message };
    }
  };
  getAll = async () => {
    if (fs.existsSync(pathToFile)) {
      let data = await fs.promises.readFile(pathToFile, "utf-8");
      let products = JSON.parse(data);
      return { status: "success", message: products };
    } else {
      return { status: "error", message: err.message };
    }
  };
  deleteById = async (id) => {
    if (!id) return { status: "error", message: "Indique el Id por favor" };
    if (fs.existsSync(pathToFile)) {
      let data = await fs.promises.readFile(pathToFile, "utf-8");
      let products = JSON.parse(data);
      let validation = products.some((prod) => prod.id === id);
      if (validation) {
        let newProductsArray = products.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(pathToFile, JSON.stringify(newProductsArray, null, 2));
        if (newProductsArray.length === 0) {
          this.deleteAll();
          return { status: "Success", message: "Producto Eliminado, no hay mas productos" };
        }
        return { status: "success", message: "Producto Eliminado" };
      } else {
        return { status: "error", message: "No existe producto con ese ID" };
      }
    } else {
      return { status: "error", message: err.message };
    }
  };
  deleteAll = async () => {
    if (fs.existsSync(pathToFile)) {
      await fs.promises.unlink(pathToFile);
      return { status: "Success", message: "Todos los productos fueron eliminados" };
    } else {
      return { status: "error", message: err.message };
    }
  };
}

module.exports = Manager;
