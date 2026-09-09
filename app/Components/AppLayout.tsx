"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function AppLayout({
  children,
  currentPage = "Dashboard",
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handlePageChange = (page: string) => {
    setSidebarOpen(false);

    switch (page) {
      case "Dashboard":
        router.push("/");
        break;

      case "Projects":
        router.push("/projects");
        break;

      case "Completed":
        router.push("/projects?status=completed");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1026] text-white">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="min-h-[calc(100vh-64px)] min-w-0 flex-1 bg-linear-to-br from-[#21102f] via-[#351337] to-[#180d25] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
