import express from "express";
import { authRouter } from "./routes/auth.js";
import { materialRouter } from "./routes/material.js";
import { workstationRoute } from "./routes/workstation.js";
import { orderRoute } from "./routes/order.js";
import analyticsRouter from "./routes/analysis.js";

import cors from "cors"


export const app = express();


app.use(express.json());
app.use(cors({
    origin:['https://production-line-management-system.vercel.app','localhost:3000']
}));

app.use('/api',authRouter);
app.use('/api',materialRouter);
app.use('/api',workstationRoute);
app.use('/api',orderRoute);
app.use("/api",analyticsRouter);


