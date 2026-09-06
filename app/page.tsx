"use client";

import { useState } from "react";

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import Projects from "./Components/Projects";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
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

        <main className="min-h-[calc(100vh-64px)] min-w-0 flex-1 bg-gradient-to-br from-[#21102f] via-[#351337] to-[#180d25] p-4 sm:p-6 lg:p-8">
          {currentPage === "Dashboard" && <Dashboard />}

          {currentPage === "Projects" && (
            <section>
              <Projects projectpage={"Projects"} />
            </section>
          )}

          {currentPage === "Completed" && (
            <section>
              <Projects projectpage={"Completed"} />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
