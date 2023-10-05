import { App } from "./app.js";
import { connectDB } from "./database.js";

App.listen(3000, () => {
  connectDB();
  console.log("Server listen on the port 3000");
});
