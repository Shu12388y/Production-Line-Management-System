"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define User type
interface User {
  _id: string;
  username: string;
  department: string;
  email: string;
  role: string;
}

function Page() {
  const [users, setUsers] = useState<User[]>([]); // Define state with User type

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get<{ message: User[] }>(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/user`
        );
        setUsers(response.data.message);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl py-4 px-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Department
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Role
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {users.map((user) => (
              <tr key={user._id} className="odd:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {user.department}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {user.role}
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
