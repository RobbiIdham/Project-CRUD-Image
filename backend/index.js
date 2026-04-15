import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import ProductRooute from "./routes/ProductRoute.js"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"))
app.use(ProductRooute);

app.listen(5000, ()=> console.log("Server running at port 5000"));