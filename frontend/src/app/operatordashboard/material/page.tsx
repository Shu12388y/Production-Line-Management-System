"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the Material type
interface Material {
  name: string;
  currentStock: number;
  minimumStockLevel: number;
}

// Define the form data type
interface FormData {
  name: string;
  currentStock: string;
  minimumStockLevel: string;
}

const MaterialsPage: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    currentStock: "",
    minimumStockLevel: "",
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  async function fetchMaterials() {
    try {
      const response = await axios.get<{ message: Material[] }>(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/materials`
      );
      setMaterials(response.data.message);
    } catch (error) {
        console.log(error)
      setMaterials([]);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/creatematerials`,
      formData
    );
    setFormData({ name: "", currentStock: "", minimumStockLevel: "" });
    setToggle(false);
    fetchMaterials();
  };

  return (
    <div className="w-full px-5 py-6">
      {/* Modal */}
      {toggle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New Material</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Stock
                </label>
                <input
                  type="number"
                  name="currentStock"
                  value={formData.currentStock}
                  onChange={(e) =>
                    setFormData({ ...formData, currentStock: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum Stock Level
                </label>
                <input
                  type="number"
                  name="minimumStockLevel"
                  value={formData.minimumStockLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minimumStockLevel: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Material
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => setToggle(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <h1 className="font-medium text-4xl mb-4">Materials</h1>

      {/* Add Material Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setToggle(true)}
          className="bg-blue-500 px-4 py-2 rounded-md text-white"
        >
          Add Material
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="px-4 py-2 font-medium text-gray-900">
                Current Stock
              </th>
              <th className="px-4 py-2 font-medium text-gray-900">
                Min Stock Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {materials.map((material, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-gray-900">{material.name}</td>
                <td className="px-4 py-2 text-gray-700">
                  {material.currentStock}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {material.minimumStockLevel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialsPage;
