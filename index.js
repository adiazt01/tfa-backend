import { App } from "./app.js";
import { connectDB } from "./database.js";
import './config.js'

const port = process.env.PORT
App.listen(port, () => {
  connectDB();
  console.log("Server listen on the port 3000");
});
