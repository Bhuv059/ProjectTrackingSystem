"use client";

import AppLayout from "@/app/Components/AppLayout";
import ProjectForm from "@/app/Components/projects/ProjectForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProject, ProjectFormData } from "@/app/lib/project";

export default function AddProject() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleAddProject = async (newProject: ProjectFormData) => {
    try {
      await createProject(newProject);
      router.push("/projects");
    } catch (error) {
      console.error("Failed to add project:", error);

      setError(error instanceof Error ? error.message : "Failed to save project.");
    }
  };

  return (
    <AppLayout>
      <div className="projects-container">
        <section>
          <h1 className="text-4xl font-normal tracking-tight text-pink-100">New Project</h1>

          <p className="mt-3 text-gray-400">Create a new freelance project.</p>

          {error && <p className="error-message">{error}</p>}

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
