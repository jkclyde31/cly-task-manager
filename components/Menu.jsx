'use client'

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, ListCheck } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { useSession, signOut } from 'next-auth/react'

const menuItems = [
  {
    title: "TASKS",
    items: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/admin",
        visible: ["admin"],
      },
      {
        icon: "/subject.png",
        label: "My Tasks",
        href: "/tasks/my-tasks",
        visible: ["admin"],
      },
      {
        icon: ListCheck,
        label: "My Activities",
        href: "/tasks/review",
        visible: ["admin"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="flex flex-col h-[95%]">
      <div className="flex-grow">
        {menuItems.map((section) => (
          <div className="flex flex-col gap-2" key={section.title}>
            <span className="hidden lg:block text-gray-400 font-light my-4">
              {section.title}
            </span>
            {section.items.map((item) => {
              if (item.visible.includes(role)) {
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                  >
                    {typeof item.icon === "string" ? (
                      <Image src={item.icon} alt={item.label} width={20} height={20} />
                    ) : (
                      <item.icon size={20} className="text-gray-500" />
                    )}
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                );
              }
            })}
          </div>
        ))}
      </div>
      
      <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                    transition-colors rounded-md w-full  bg-Sky'
                  role='menuitem'
                >
                  Sign Out
            </button>
    </div>
  );
};

export default Menu;