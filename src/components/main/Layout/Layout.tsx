"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { ReactNode } from "react";
import MainNav from "../MainNav/MainNav";

const Layout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        " flex-1 rounded-tl-2xl min-h-screen  bg-white dark:bg-black dark:bg-[url('/bg.png')] bg-cover bg-center flex flex-col w-full h-full ",
        theme === "light"
          ? "border-Tertiary text-brandColorSecondary"
          : "border-gray-700 text-white"
      )}
    >
      <MainNav />
      {children}
    </div>
  );
};

export default Layout;
