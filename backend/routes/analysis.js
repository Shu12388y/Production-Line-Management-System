import express from "express";
import {Order} from "../models/models.js"; // Assuming you have an Order model
import {Material} from "../models/models.js"; // Assuming material usage is tracked

const analyticsRouter = express.Router();

analyticsRouter.get("/analytics/overview", async (req, res) => {
  try {
    // Total number of orders
    const totalOrders = await Order.countDocuments();

    // Orders grouped by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Material usage statistics
    const materialUsage = await Material.aggregate([
      {
        $group: {
          _id: "$minimumStockLevel",
          totalUsed: { $sum: "$currentStock" },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        ordersByStatus,
        materialUsage,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default analyticsRouter;
