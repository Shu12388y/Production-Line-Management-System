import React from "react";
import OperatorSidebar from "@/components/operatorsidebar";
import Auth from "@/context/Auth";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <Auth>
      <div className="flex">
        <OperatorSidebar />
        {children}
      </div>
    </Auth>
  );
}

export default layout;
