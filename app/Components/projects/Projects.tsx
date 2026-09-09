import ProjectCard from "./ProjectCard";
import { getFilteredProjects } from "../../types/index";
import { projects } from "../../data/projects";
import Link from "next/link";

interface ProjectsProps {
  projectpage: string;
}

export default function Projects({ projectpage }: ProjectsProps) {
  const showProjects = getFilteredProjects(
    projects,
    projectpage === "Completed" ? "Completed" : "All"
  );

  return (
    <section>
      <div className="grid gap-6 py-10 md:grid-cols-2 lg:grid-cols-3 padding: 1.5rem;">
        {showProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/edit/${encodeURIComponent(project.id)}`}
            className="block h-full transition hover:scale-[1.01]"
          >
            <ProjectCard
              name={project.name}
              description={project.client}
              status={project.status}
              value={project.price}
              progress={project.progress}
              dueDate={project.deadline}
              icon={project.icon}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
