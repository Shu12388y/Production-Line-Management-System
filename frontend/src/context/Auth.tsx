"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  role?: string;
}

function Auth({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string>("manager");
  const router = useRouter();
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token) as DecodedToken | null;
      if (decoded && decoded.role) {
        setRole(decoded.role);
      }
    }
    if(!token){
      router.push("/login")
    }
  }, []);

  useEffect(() => {
    setLoading(true)
    if (role !== "manager") {
      router.push("/operatordashboard/orders");
    }
    setLoading(false)
  }, [role, router]);

  return <div>{loading ? null : children}</div>;
}

export default Auth;
