import "../../styles/projectcard.css";

import { Check, BarChart3, Briefcase, GitFork } from "lucide-react";

import type { Project, ProjectIcon } from "@/app/lib/project";

interface ProjectCardProps {
  project: Project;
}

const iconMap: Record<ProjectIcon, React.ElementType> = {
  chart: BarChart3,
  portfolio: Briefcase,
  fork: GitFork,
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { name, description, client, status, value, progress, dueDate, icon } = project;

  const Icon = icon && icon in iconMap ? iconMap[icon as ProjectIcon] : BarChart3;

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-icon">
          <Icon />
        </div>

        <span className="project-status">{status}</span>
      </div>

      <h3 className="project-name">{name}</h3>

      <p className="project-description">{client}</p>
      <p className="project-description">{description}</p>

      <hr className="project-divider" />

      <div className="project-value">
        <p className="project-value-label">Project Value</p>
        <p className="project-value-amount">${value}</p>
      </div>

      <div className="project-progress">
        {status === "In Progress" ? (
          <>
            <div className="progress-header">
              <span className="progress-label">Project progress</span>
              <span className="progress-percentage">{progress ?? 0}%</span>
            </div>

            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${progress ?? 0}%` }} />
            </div>

            <p className="project-due-date">Due {dueDate}</p>
          </>
        ) : status === "Completed" ? (
          <p className="project-due-date">
            <Check />
            Delivered on {dueDate}
          </p>
        ) : (
          <p className="project-due-date">Due {dueDate}</p>
        )}
      </div>
    </div>
  );
}
