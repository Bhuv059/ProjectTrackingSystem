"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { fetchProjects, Project } from "@/app/lib/project";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface ProjectsProps {
  projectpage: string;
}

export default function Projects({ projectpage }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      setError("");

      const projectToast = sessionStorage.getItem("projectToast");
      if (projectToast === "deleted") {
        toast.success("Project deleted successfully");
        sessionStorage.removeItem("projectToast");
      }

      try {
        const data = await fetchProjects(
          projectpage === "Completed" ? "Completed" : undefined
        );

        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [projectpage]);

  if (loading) {
    return <p className="py-10">Loading projects...</p>;
  }

  if (error) {
    return <p className="py-10 text-red-400">{error}</p>;
  }
  return (
    <section>
      <div className="grid gap-6 py-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/edit/${encodeURIComponent(project.id)}`}
            className="block h-full transition hover:scale-[1.01]"
          >
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </section>
  );
}
