"use client";

import AppLayout from "@/app/Components/AppLayout";
import Dashboard from "@/app/Components/Dashboard";

export default function NewProjectPage() {
  return (
    <AppLayout currentPage="Projects">
      <section>
        <Dashboard />
      </section>
    </AppLayout>
  );
}
