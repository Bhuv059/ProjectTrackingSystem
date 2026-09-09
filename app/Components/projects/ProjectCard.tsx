import "../../styles/projectcard.css";
import { Check, BarChart3, Briefcase, GitFork } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  status: string;
  value: number;
  progress: string | number | undefined;
  dueDate: string | undefined;
  icon?: string | undefined;
}

export default function ProjectCard({
  name,
  description,
  status,
  value,
  progress,
  dueDate,
  icon,
}: ProjectCardProps) {
  const iconMap = {
    chart: BarChart3,
    portfolio: Briefcase,
    fork: GitFork,
  };

  const Icon = iconMap[icon as keyof typeof iconMap];

  return (
    <div className="project-card">
      {/* Header */}
      <div className="project-card-header">
        <div className="project-icon">
          <Icon />
        </div>

        <span className="project-status">{status}</span>
      </div>

      {/* Project name */}
      <h3 className="project-name">{name}</h3>

      {/* Description */}
      <p className="project-description">{description}</p>

      <hr className="project-divider" />

      {/* Project value */}
      <div className="project-value">
        <p className="project-value-label">Project Value</p>

        <p className="project-value-amount">${value}</p>
      </div>

      {/* Progress */}
      <div className="project-progress">
        {status === "In Progress" ? (
          <>
            <div className="progress-header">
              <span className="progress-label">Project progress</span>
              <span className="progress-percentage">{progress}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <p className="project-due-date">Due {dueDate}</p>
          </>
        ) : (
          <>
            <div className="project-progress">
              <p className="project-due-date">
                <Check />
                Delivered on {dueDate}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
