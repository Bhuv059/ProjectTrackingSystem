"use client";

import { useState } from "react";
import AppLayout from "@/app/Components/AppLayout";
import Dashboard from "@/app/Components/Dashboard";

export default function Home() {
  const [currentPage] = useState("Dashboard");

  return (
    <AppLayout currentPage={currentPage}>
      <Dashboard />
    </AppLayout>
  );
}
