"use client";

import AppLayout from "@/app/Components/AppLayout";
import ProjectForm from "@/app/Components/projects/ProjectForm";
import { Project } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectFormData } from "@/app/lib/project";
export default function UpdateProject() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);

        console.log("HTTP status:", response.status);
        if (!response.ok) {
          console.error("Failed to fetch project");
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setProject(data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [id]);

  const handleUpdateProject = async (updatedProject: ProjectFormData) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });

      console.log("HTTP status", response.status);

      if (!response.ok) {
        console.error("Failed to update project");
        throw new Error(`API error: ${response.status}`);
      }

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <section>
          <h1 className="text-4xl font-normal tracking-tight text-pink-100">
            Edit Project
          </h1>

          <p className="mt-3 text-gray-400">Loading project...</p>
        </section>
      </AppLayout>
    );
  }

  const handleDeleteProject = async () => {
    if (!project?.id) return;

    const confirmed = window.confirm(
      "Are you sure want to delete this project?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      console.log("HTTP status:", response.status);
      if (!response.ok) {
        console.error("Failed to delete project");
        return;
      }
      router.push("/projects");
      setDeleting(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  if (!project) {
    return (
      <AppLayout>
        <section>
          <h1 className="text-4xl font-normal tracking-tight text-pink-100">
            Project Not Found
          </h1>

          <button
            onClick={() => router.push("/projects")}
            className="mt-4 rounded-md bg-teal-700 px-4 py-2 text-white"
          >
            Back to Projects
          </button>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="projects-container">
        <section>
          <h1 className="text-4xl font-normal tracking-tight text-pink-100">
            Edit Project
          </h1>
          <p className="mt-3 text-gray-400">Edit your freelance project.</p>
          <div className="project-actions">
            <button
              type="button"
              className="delete-project-button"
              onClick={handleDeleteProject}
              disabled={deleting}
            >
              <span className="text-lg leading-none">
                {deleting ? "..." : "x"}
              </span>
              <span>Delete project</span>
            </button>
          </div>

          <ProjectForm
            mode="edit"
            project={project}
            onCancel={() => router.push("/projects")}
            onUpdate={handleUpdateProject}
          />
        </section>
      </div>
    </AppLayout>
  );
}
