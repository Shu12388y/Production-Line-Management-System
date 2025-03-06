"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Material {
  _id: string;
  name: string;
}

interface Workstation {
  _id: string;
  name: string;
}

interface FormData {
  productName: string;
  quantity: string;
  priority: string;
  status: string;
  materialId: string[];
  workstationId: string;
}

export default function CreateOrderPage() {
  const id = useParams().id;
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    quantity: "",
    priority: "",
    status: "",
    materialId: [],
    workstationId: "",
  });
  const router = useRouter();
  const [material] = useState<Material[]>([]);
  const [workstation] = useState<Workstation[]>([]);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/order/${id}`
        );
        setFormData(data.data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrder();
  }, []);

  useEffect(() => {
    const tok = window.sessionStorage.getItem("token");
    if (tok) setToken(tok);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       await axios.put(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/order/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      toast.success("Order updated successfully");
      setFormData({
        productName: "",
        quantity: "",
        priority: "",
        status: "",
        materialId: [],
        workstationId: "",
      });
      router.back()
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    }
  };

  return (
    <div className="flex flex-col w-full px-5">
      <h1 className="text-4xl font-semibold py-8">Create New Order</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              disabled
              value={formData.productName}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              disabled
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              disabled
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">
              Material
            </label>
            {formData.materialId}
            <select
                disabled
              onChange={(e) =>
                setFormData({
                  ...formData,
                  materialId: [...formData.materialId, e.target.value],
                })
              }
              name="materialId"
              className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
            >
              <option value="">Choose material</option>
              {material.map((ele) => (
                <option key={ele._id} value={ele._id}>
                  {ele.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">
              Workstation
            </label>
            <select
            disabled
              onChange={(e) =>
                setFormData({ ...formData, workstationId: e.target.value })
              }
              name="workstationId"
              className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
            >
              <option value="">Choose Workstation</option>
              {workstation.map((ele) => (
                <option key={ele._id} value={ele._id}>
                  {ele.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-6">
            <button
              type="submit"
              className="rounded-md border bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-none"
            >
              Update Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
