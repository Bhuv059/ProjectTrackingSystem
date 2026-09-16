"use client";

import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1b1026] text-white">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="min-h-[calc(100vh-64px)] min-w-0 flex-1 bg-linear-to-br from-[#21102f] via-[#351337] to-[#180d25] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
