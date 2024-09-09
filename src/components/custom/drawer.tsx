'use client'
import React from "react";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  NodeIcon,
  ProcessIcon,
  InventoryIcon,
  MessageIcon,
  SettingIcon,
  StaffIcon,
} from "../../assets/icons";
import Link from "next/link";

const drawerData = [
  {
    label: "Dashboard",
    path: "/",
    Icon: DashboardIcon,
  },
  {
    label: "Process Management",
    path: "process",
    Icon: ProcessIcon,
  },
  {
    label: "Node Management",
    path: "node",
    Icon: NodeIcon,
  },
  {
    label: "Inventory Management",
    path: "inventory",
    Icon: InventoryIcon,
  },
  {
    label: "Staff Management",
    path: "user",
    Icon: StaffIcon,
  },
  {
    label: "Message System",
    path: "chat",
    Icon: MessageIcon,
  },
  {
    label: "Settings",
    path: "settings",
    Icon: SettingIcon,
  },
];

const Drawer = () => {
  const pathname = usePathname();
  const activePath = pathname.split("/")[1] || "/";
  return (
    <div className="h-auto w-full flex bg-white flex-col gap-0">
      {drawerData.map((e) => {
        const { Icon, label, path } = e;
        const isActive = activePath === path;
        const navigatePath = path === "/" ? "/" : `/${path}`;
        return (
          <Link
            key={path}
            className={`p-5 w-full flex align-center gap-4 cursor-pointer ${
              isActive
                ? "active"
                : "hover:text-[var(--primary)]-600 hover:bg-[var(--primary)]-50"
            }`}
            href={navigatePath}
          >
            <span>
              <Icon color={isActive ? "white" : ""} />
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Drawer;
