import { Material } from "../models/models.js";

import { Router } from "express";

export const materialRouter = Router();

materialRouter.post("/creatematerials", async (req, res) => {
  try {
    const data = await req.body;
    if (!data) {
      return res.status(402).json({ message: "Empty request" });
    }
    const materialInfo = await new Material({
        name:data.name,
        currentStock:parseInt(data.currentStock),
        minimumStockLevel:parseInt(data.minimumStockLevel)
    });
    await materialInfo.save();
    return res.status(201).json({ message: "Created material" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});

materialRouter.get("/materials", async (req, res) => {
  try {
    const materialInfo = await Material.find({});
    if (!materialInfo) {
      return res.status(404).json({ message: "No Material" });
    }
    return res.status(200).json({ message: materialInfo });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});

materialRouter.get("/material/:id", async (req, res) => {
  try {
    const id = await req.params.id;
    const findMaterial = await Material.findById(id);
    if(!findMaterial){
        return res.status(404).json({message:"Material not found"})
    }
    return res.status(200).json({ message: findMaterial });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});

materialRouter.put("/material/:id", async (req, res) => {
  try {
    const data = await req.body;
    const id = await req.params.id;
    if (!data) {
      return res.status(402).json({ message: "Empty request" });
    }
    await Material.findByIdAndUpdate(id,data);
    return res.status(200).json({ message: "Updated" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});
