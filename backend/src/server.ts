import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import clientRoutes from "./routes/ClientRoutes";
import authRoutes from "./routes/AuthRoutes";

AppDataSource.initialize()
  .then(() => {
    console.log("dbconn sucess");

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/auth", authRoutes);
    app.use("/clients", clientRoutes);

    app.get("/", (req, res) => res.send("Backend OK"));

    app.listen(3001, () => console.log("SV running on port:3001"));
  })
  .catch((error) => console.error("dbconn failed", error));