"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Order {
  _id: string;
  productName: string;
  quantity: number;
  priority: string;
  status: string;
  workstation: string;
}

interface Workstation {
  _id: string;
  name: string;
}

function Page() {
  const [order, setOrder] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState("");
  const [workstation, setWorkStation] = useState<Workstation[]>([]);
  const [getworkstation, setWorkStations] = useState("");

  const router = useRouter();

  // Fetch Orders on status or workstation change
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get<{ message: Order[] }>(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/orders`
        );
        setOrder(response.data.message);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  // Fetch Workstations on component mount
  useEffect(() => {
    async function fetchWorkstations() {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/workstations`
        );
        setWorkStation(data.message);
      } catch (error) {
        console.error("Error fetching workstations:", error);
      }
    }
    fetchWorkstations();
  }, []);

  // Filter orders dynamically when status or workstation changes
  useEffect(() => {
    const filtered = order.filter((o) => {
      return (
        (status ? o.status === status : true) &&
        (getworkstation ? o.workstation === getworkstation : true)
      );
    });

    setFilteredOrders(filtered);
  }, [status, getworkstation, order]);

  // Navigate to Update Page
  async function updateOrder(id: string) {
    try {
      router.push(`/operatordashboard/update/${id}`);
      setOrder((prevOrders) => prevOrders.filter((ele) => ele._id !== id));
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }

  return (
    <div className="w-full px-5 py-6">
      <h1 className="font-medium text-4xl">Orders</h1>
      <div className="flex flex-row items-center justify-end space-x-4">
        {/* Status Filter */}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Choose status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Workstation Filter */}
        <select
          value={getworkstation}
          onChange={(e) => setWorkStations(e.target.value)}
        >
          <option value="">Choose workstation</option>
          {workstation.map((ele) => (
            <option key={ele._id} value={ele._id}>
              {ele.name}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="px-4 py-2 font-medium text-gray-900">Quantity</th>
              <th className="px-4 py-2 font-medium text-gray-900">Priority</th>
              <th className="px-4 py-2 font-medium text-gray-900">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((ele) => (
                <tr key={ele._id}>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {ele.productName}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {ele.quantity}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {ele.priority}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {ele.status}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button
                      onClick={() => updateOrder(ele._id)}
                      className="mr-2 rounded-sm bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
