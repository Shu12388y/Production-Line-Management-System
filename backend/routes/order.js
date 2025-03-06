import { Order, WorkStation } from "../models/models.js";
import { managerMiddleware } from "../middlewares/middleware.js";

import { Router } from "express";

export const orderRoute = Router();

orderRoute.post("/createorders", managerMiddleware, async (req, res) => {
  try {
    const {
      productName,
      quantity,
      priority,
      status,
      materialId,
      workstationId,
    } = req.body;

    if (!productName || !quantity || !priority || !status || !workstationId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      productName,
      quantity,
      priority,
      status,
      materialId,
      workstationId,
    });

    await newOrder.save();

    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);

    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
});

orderRoute.get("/orders", async (req, res) => {
  try {
    const status = await req.query.status;
    const workstation = await req.query.workstation;
    if (!status || !workstation) {
      const orderInfo = await Order.find({})
      return res.status(200).json({ message: orderInfo });
    }
    const findWorkStation = await WorkStation.findOne({
      name: workstation,
    });
    const orderInfo = await Order.find({
      status,
      workstationId: findWorkStation._id,
    })
    if (!orderInfo) {
      return res.status(404).json({ message: "No Orders" });
    }
    return res.status(200).json({ message: orderInfo });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});

orderRoute.get("/order/:id", async (req, res) => {
  try {
    const id = await req.params.id;
    const findOrder = await Order.findById(id);
    if (!findOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: findOrder });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});

orderRoute.put("/order/:id", async (req, res) => {
  try {
    const data = await req.body;
    const id = await req.params.id;
    if (!data) {
      return res.status(402).json({ message: "Empty request" });
    }
    await Order.findByIdAndUpdate(id, data);
    return res.status(200).json({ message: "Updated" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});

orderRoute.delete("/order/:id", async (req, res) => {
  try {
    const id = await req.params.id;
    await Order.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});
