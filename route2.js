const express = require("express");
const cartRoutes = express.Router();

const carts = [
  {
    id: 0,
    product: "iphone",
    price: "$500",
    quantity: "2"
  },
  {
    id: 1,
    product: "Socks",
    price: "$10",
    quantity: "10"
  },
  {
    id: 2,
    product: "Perfume",
    price: "$40",
    quantity: "1"
  },
  {
    id: 3,
    product: "EyeShadow",
    price: "$75",
    quantity: "1"
  },
  {
    id: 4,
    product: "Boots",
    price: "$80",
    quantity: "1"
  }
];

// GET
cartRoutes.get("/cart", (request, response) => {
  response.json(carts);
  response.status(200);
});

// GET ID

cartRoutes.get("/cart/:id", (request, response) => {
  // save the id parameter as a number
  let id = parseInt(request.params.id);
  let foundCart = carts.find(cart => id === cart.id);
  if (foundCart) {
    response.json(foundCart);
  } else {
    response.status(404);
    response.send(`No cart by this ID: ${id} `);
  }
});

let nextId = 4;
// Adding a new item through PUT
cartRoutes.post("/cart", (request, response) => {
  let newCart = request.body;
  console.log(request.body);
  //   add the next to the newCart
  newCart.id = nextId;
  //   increment our nextID
  nextId++;
  //   add food to the carts array
  carts.push(newCart);
  response.status(201);
  response.json(carts);
});

// PUT
// create an endpoint for PUT of carts (update cart)
cartRoutes.put("/cart/:id", (request, response) => {
  // get the id parameter
  let id = parseInt(request.params.id);
  // create an object from the body of the request
  let updatedCart = request.body;
  //   add the id property to the updatedCart
  updatedCart.id = id;
  //   find the cart
  let index = carts.findIndex(cart => id === cart.id);
  if (index >= 0) {
    //   remove the old cart and add the updated cart
    carts.splice(index, 1, updatedCart);
    response.json(carts);
    response.status(200);
  } else {
    response.status(404);
    response.send(`There's no cart by id: ${id}`);
  }
});

// DELETE
// create an endpoint for DELETE of carts
cartRoutes.delete("/cart/:id", (request, response) => {
  // get the id parameter
  let id = parseInt(request.params.id);
  // find the cart's index
  let index = carts.findIndex(cart => cart.id === id);
  if (index >= 0) {
    // delete this cart
    carts.splice(index, 1);
    response.sendStatus(204);
  } else {
    response.status(404);
    response.send(`There’s no cart by id: ${id}`);
  }
});

module.exports = cartRoutes;
