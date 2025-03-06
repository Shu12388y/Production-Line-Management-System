"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Order {
  _id: string;
  productName: string;
  quantity: number;
  priority: string;
  status: string;
}

function Page() {
  const [order, setOrder] = useState<Order[]>([]);

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

  async function deleteOrder(id: string) {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/api/order/${id}`);
      setOrder((prevOrders) => prevOrders.filter((ele) => ele._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }

  return (
    <div className="w-full px-5 py-6">
      <h1 className="font-medium text-4xl">Orders</h1>
      <div className="flex flex-row items-center justify-end">
        <Link href="/dashboard/createorders">
          <button className="bg-blue-500 px-4 py-2 rounded-md text-white">
            Create New Order
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
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
            {order.map((ele) => (
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
                    onClick={() => deleteOrder(ele._id)}
                    className="mr-2 rounded-sm bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
