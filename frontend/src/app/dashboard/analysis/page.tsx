"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Define types
interface OrderStatus {
  _id: string;
  count: number;
}

interface MaterialUsage {
  _id: string;
  totalUsed: number;
}

interface AnalyticsData {
  totalOrders: number;
  ordersByStatus: OrderStatus[];
  materialUsage: MaterialUsage[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const AnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalOrders: 0,
    ordersByStatus: [],
    materialUsage: [],
  });

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const { data } = await axios.get<{ data: AnalyticsData }>(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/analytics/overview`
        );
        setAnalytics(data.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    }
    fetchAnalytics();
  }, []);

  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600">{analytics.totalOrders}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Orders by Status</h2>
          {analytics.ordersByStatus.map((status, index) => (
            <div key={index} className="flex justify-between text-gray-600">
              <span>{status._id}</span>
              <span className="font-semibold">{status.count}</span>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Material Usage</h2>
          {analytics.materialUsage.map((material, index) => (
            <div key={index} className="flex justify-between text-gray-600">
              <span>{material._id}</span>
              <span className="font-semibold">{material.totalUsed}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Orders by Status - Pie Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={analytics.ordersByStatus}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {analytics.ordersByStatus.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
