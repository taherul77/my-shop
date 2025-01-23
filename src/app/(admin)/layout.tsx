import Navbar from "@/components/shared/Navbar";
import { SidebarM } from "@/components/shared/sidebar/SidebarM";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarM>
      <Navbar />

      {children}
    </SidebarM>
  );
};

export default layout;
