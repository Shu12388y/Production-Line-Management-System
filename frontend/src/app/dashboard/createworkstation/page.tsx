"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

// Define types
interface Workstation {
  name: string;
  status: "Active" | "Inactive";
}

const WorkstationPage: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [newWorkstation, setNewWorkstation] = useState<Workstation>({
    name: "",
    status: "Active",
  });

  async function fetchWorkstation() {
    try {
      const { data } = await axios.get<{ message: Workstation[] }>(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/workstations`
      );
      setWorkstations(data.message);
    } catch (error) {
      console.log("Error fetching workstations:", error);
    }
  }

  useEffect(() => {
    fetchWorkstation();
  }, []);

  const handleCreateWorkstation = async () => {
    if (newWorkstation.name.trim() === "") return;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/createworkstation`,
        newWorkstation
      );
      setNewWorkstation({ name: "", status: "Active" });
      setToggle(false);
      fetchWorkstation();
    } catch (error) {
      console.log("Error creating workstation:", error);
    }
  };

  return (
    <div className="w-full px-5 py-6">
      {/* Create New Workstation Modal */}
      {toggle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-1/3 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Create New Workstation
            </h2>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
              value={newWorkstation.name}
              onChange={(e) =>
                setNewWorkstation({ ...newWorkstation, name: e.target.value })
              }
            />

            <label className="block text-sm font-medium text-gray-700 mt-2">
              Status
            </label>
            <select
              className="w-full mt-1 p-2 border rounded-md"
              value={newWorkstation.status}
              onChange={(e) =>
                setNewWorkstation({
                  ...newWorkstation,
                  status: e.target.value as "Active" | "Inactive",
                })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={() => setToggle(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleCreateWorkstation}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Workstations</h1>
        <button
          className="bg-blue-500 px-4 py-2 rounded-md text-white"
          onClick={() => setToggle(true)}
        >
          Create New Workstation
        </button>
      </div>

      {/* Workstations Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {workstations.map((workstation, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-gray-900">{workstation.name}</td>
                <td className="px-4 py-2 text-gray-700">{workstation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkstationPage;
