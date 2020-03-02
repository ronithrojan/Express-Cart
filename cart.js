// require the Express Module
const express = require("express");
// create an instance of an Express server
// require the cors module
const cors = require("cors");
const app = express();
// accept json from requests
app.use(express.json());
// allow CORS
app.use(cors());
// import our routes.js our food endpoints
const cartRoutes = require("./route2.js");
// tell the server to use our cartRoutes/make our endpoints avaliable on this server
app.use("/", cartRoutes);
// define a port
const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
