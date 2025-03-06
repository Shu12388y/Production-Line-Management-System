import { WorkStation } from "../models/models.js";

import { Router } from "express";

export const workstationRoute = Router();

workstationRoute.post("/createworkstation", async (req, res) => {
  try {
    const data = await req.body;
    if (!data) {
      return res.status(402).json({ message: "Empty request" });
    }
    const workstationInfo = await new WorkStation(data);
    await workstationInfo.save();
    return res.status(201).json({ message: "Created Workstation" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});

workstationRoute.get("/workstations", async (req, res) => {
  try {
    const workstationInfo = await WorkStation.find({});
    if (!workstationInfo) {
      return res.status(404).json({ message: "No Workstation" });
    }
    return res.status(200).json({ message: workstationInfo });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});

workstationRoute.get("/workstation/:id", async (req, res) => {
  try {
    const id = await req.params.id;
    const findWorkStation = await WorkStation.findById(id);
    if(!findWorkStation){
        return res.status(404).json({message:"Workstation not found"})
    }
    return res.status(200).json({ message: findWorkStation });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});

workstationRoute.put("/workstation/:id", async (req, res) => {
  try {
    const data = await req.body;
    const id = await req.params.id;
    if (!data) {
      return res.status(402).json({ message: "Empty request" });
    }
    await WorkStation.findByIdAndUpdate(id,data);
    return res.status(200).json({ message: "Updated" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" + error });
  }
});
