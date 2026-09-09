"use client";
import AppLayout from "@/app/Components/AppLayout";
import ProjectForm from "@/app/Components/projects/ProjectForm";
import { Project } from "@/app/types";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const router = useRouter();
  const handleAddProject = async (newProject: Project) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });
    console.log("response", response);

    if (!response.ok) {
      console.error("Failed to add project");
      return;
    }

    router.push("/projects");
  };
  return (
    <AppLayout currentPage="Projects">
      <div className="projects-container">
        <section>
          <h1 className="text-4xl font-normal tracking-tight text-pink-100">
            New Project
          </h1>

          <p className="mt-3 text-gray-400">Create a new freelance project.</p>

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
