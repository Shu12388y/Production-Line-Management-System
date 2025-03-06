import React from "react";
import Sidebar from "@/components/sidebar";
import Auth from "@/context/Auth";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <Auth>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </Auth>
  );
}

export default layout;
