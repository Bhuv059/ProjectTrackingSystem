"use client";
import AppLayout from "@/app/Components/AppLayout";
import ProjectForm from "@/app/Components/projects/ProjectForm";
import { ProjectFormData } from "@/app/lib/project";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProject() {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleAddProject = async (newProject: ProjectFormData) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });
    console.log("response", response);

    console.log("HTTP status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to add project", errorData);
      setError("Failed to save project.");
      //      throw new Error(`API error: ${response.status}`);
    }

    router.push("/projects");
  };
  return (
    <AppLayout>
      <div className="projects-container">
        <section>
          <h1 className="text-4xl font-normal tracking-tight text-pink-100">
            New Project
          </h1>

          <p className="mt-3 text-gray-400">Create a new freelance project.</p>
          {error && <p className="error-message">{error}</p>}
          {/* Your form/content goes here */}
          <ProjectForm
            onCancel={() => router.push("/projects")}
            onAdd={handleAddProject}
            onUpdate={() => {}}
            mode="add"
          />
        </section>
      </div>
    </AppLayout>
  );
}
