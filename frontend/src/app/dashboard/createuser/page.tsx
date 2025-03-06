"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    department: "",
    role: "operator",
  });

  async function handleSignup() {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/register`,
        user
      );

      if (data.data.message == "Created") {
        toast.success("Created");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  }
  return (
    <div className="w-full">
      <section className="bg-white w-full">
        <h1 className="text-4xl font-semibold px-4 py-10">
          Create New Operator Account
        </h1>
        <div className="">
          <main className="flex items-center justify-center px-8 py-8  ">
            <div className="">
              <div className="mt-8 grid grid-cols-1  gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    type="text"
                    id="username"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    type="password"
                    id="Password"
                    name="password"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <input
                    onChange={(e) =>
                      setUser({ ...user, department: e.target.value })
                    }
                    type="text"
                    id="department"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <input
                    value="operator"
                    type="text"
                    disabled
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 text-sm text-gray-700 shadow-sm px-3 py-2"
                  />
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline">
                      {" "}
                      terms and conditions{" "}
                    </a>
                    and
                    <a href="#" className="text-gray-700 underline">
                      {" "}
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    onClick={handleSignup}
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                  >
                    Create an account
                  </button>
    
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
