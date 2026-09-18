"use client";

import { useSearchParams, useRouter } from "next/navigation";
import AppLayout from "@/app/Components/AppLayout";
import Projects from "@/app/Components/projects/Projects";

export default function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const handleNewProject = () => {
    router.push("/projects/new");
  };

  return (
    <AppLayout>
      <div className="projects-container">
        <section>
          <h1 className="text-4xl font-normal tracking-tight text-pink-100">
            {status === "completed" ? "Completed Projects" : "Projects"}
          </h1>

          <p className="mt-3 text-gray-400">
            {status === "completed" ? "Your completed projects will appear here." : "Manage and track your projects."}
          </p>

          <div className="flex justify-end">
            <button type="button" onClick={handleNewProject} className="flex w-fit items-center gap-2 rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-teal-800">
              <span className="text-lg leading-none">+</span>
              <span>New project</span>
            </button>
          </div>

          <Projects projectpage={status === "completed" ? "Completed" : "All"} />
        </section>
      </div>
    </AppLayout>
  );
}