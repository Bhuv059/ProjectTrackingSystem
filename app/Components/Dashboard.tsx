"use client";

import { useEffect, useState } from "react";

import Intro from "./Intro";
import Projects from "./projects/Projects";
import Statistics from "./Statistics";

import { fetchProjects, type Project } from "@/app/lib/project";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();

        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("Failed to load projects.  Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return <p className="py-10">Loading projects...</p>;
  }

  const totalProjectValue = projects.reduce(
    (total, project) => total + project.value,
    0
  );

  const projectsCompleted = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const projectsInProgress = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  return (
    <section>
      <div className="dashboard-container">
        <Intro />
        <Statistics
          totalProjectValue={totalProjectValue}
          projectsCompleted={projectsCompleted}
          projectsInProgress={projectsInProgress}
          projectsLength={projects.length}
        />
        return (
        <div>
          {error && <p className="text-red-400">{error}</p>}

          {/* projects */}
          <Projects projectpage="All" />
        </div>
        );
      </div>
    </section>
  );
}
