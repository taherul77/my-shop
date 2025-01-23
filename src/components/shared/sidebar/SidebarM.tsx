"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { TbBrandDatabricks } from "react-icons/tb";
import { BiCategoryAlt, BiSolidCategory } from "react-icons/bi";
import { IoIosColorPalette } from "react-icons/io";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const myShopLogo = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent("Sofia Davis")}`;

export function SidebarM({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();
  const { theme } = useTheme();


  const isMenuActive =
    pathName === "/admin/category" || pathName === "/admin/subCategory";

  const links = [
    {
      label: "Brand",
      href: "/admin/brand",
      icon: <TbBrandDatabricks className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Menu",
      href: "#",
      icon: <RiMenuUnfoldFill className="h-5 w-5 flex-shrink-0" />,
      subLinks: [
        {
          label: "Category",
          href: "/admin/category",
          icon: <BiCategoryAlt className="h-5 w-5 flex-shrink-0" />,
        },
        {
          label: "Sub Category",
          href: "/admin/subCategory",
          icon: <BiSolidCategory className="h-5 w-5 flex-shrink-0" />,
        },
      ],
    },
    {
      label: "Color",
      href: "/admin/color",
      icon: <IoIosColorPalette className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Product ",
      href: "/admin/product",
      icon: (
        <MdOutlineProductionQuantityLimits className="h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: <FiLogOut className="h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row w-full h-screen flex-1 bg-white dark:bg-gray-900" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen} className={`bg-white dark:bg-gray-900`}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx}>
                  {link.subLinks ? (
                    <div>
                      <SidebarLink
                        link={{
                          label: link.label,
                          href: link.href,
                          icon: link.icon,
                        }}
                        className={`hover:text-brandColor text-black dark:text-white ${
                          isMenuActive ? "text-brandColor dark:text-brandColor" : ""
                        }`}
                        onClick={() => setMenuOpen(!menuOpen)}
                      />
                      {menuOpen &&
                        link.subLinks.map((subLink, subIdx) => (
                          <SidebarLink
                            key={subIdx}
                            link={subLink}
                            className={`ml-4 hover:text-brandColor text-black dark:text-white dark:hover:text-brandColor ${
                              pathName === subLink.href && "text-brandColor dark:text-brandColor"
                            }`}
                          />
                        ))}
                    </div>
                  ) : (
                    <SidebarLink
                      key={idx}
                      link={link}
                      className={`hover:text-brandColor dark:hover:text-brandColor text-black dark:text-white ${
                        pathName === link.href && "text-brandColor dark:text-brandColor"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "My Shop",
                href: "#",
                icon: (
                  <Image
                    src={myShopLogo}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                    unoptimized
                  />
                ),
              }}
            />
          </div>
        
        </SidebarBody>
      </Sidebar>
      <div
        className={cn(
          " flex-1 p-2 md:p-10 rounded-tl-2xl border bg-backgroundColor dark:bg-black dark:bg-[url('/bg.png')] bg-cover bg-center flex flex-col gap-2 w-full h-full overflow-hidden overflow-y-scroll",
          theme === "light" ? "border-Tertiary text-brandColorSecondary" : "border-gray-700 text-white"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/admin/dashboard"
      className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <Image
        src={myShopLogo}
        alt="kitchen logo"
        width={100}
        height={100}
        unoptimized
      />
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href="/admin/dashboard"
      className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <Image src={myShopLogo} alt="kitchen logo" width={60} height={60} unoptimized />
    </Link>
  );
};