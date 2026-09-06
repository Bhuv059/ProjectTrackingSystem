import ProjectCard from "./ProjectCard";
import { getFilteredProjects, projects } from "../data/index";

export default function Projects({ projectpage }: { projectpage: string }) {
  const showProjects = getFilteredProjects(
    projects,
    projectpage === "Completed" ? "Completed" : "All"
  );

  return (
    <section>
      {projectpage === "Completed" ? (
        <>
          <h1 className="text-2xl font-bold text-pink-100 sm:text-3xl">
            Completed
          </h1>
          <p className="mt-2 text-sm text-purple-200/70 sm:text-base">
            Your completed projects will appear here.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-pink-100 sm:text-3xl">
            Projects
          </h1>
          <p className="mt-2 text-sm text-purple-200/70 sm:text-base">
            Manage and track your projects.
          </p>
        </>
      )}

      <div className="py-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {showProjects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.client}
            status={project.status}
            value={project.price}
            progress={project.progress}
            dueDate={project.deadline}
            icon={project.icon}
          />
        ))}
      </div>
    </section>
  );
}
