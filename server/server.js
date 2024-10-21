import express from "express";
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import categoryRoute from "./src/routes/CategoryRoute.js";
import productRoute from "./src/routes/ProductRoute.js";  
import cors from "cors";
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));

export default app;
