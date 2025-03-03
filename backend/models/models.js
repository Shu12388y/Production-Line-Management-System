import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  orderid: {
    type: String,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  priority: {
    type: String,
  },
  status: {
    type: String,
  },
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "material",
  },
  workstationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workstation",
  },
});

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  currentStock: {
    type: Number,
  },
  minimumStockLevel: {
    type: Number,
  },
});

const workStationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
  },
});

export const User = mongoose.models.User || mongoose.models("User", userSchema);
export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
export const Material =
  mongoose.models.Material || mongoose.model("Material", materialSchema);
export const WorkStation =
  mongoose.models.WorkStation ||
  mongoose.model("WorkStation", workStationSchema);
