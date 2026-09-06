interface ProjectCardProps {
  name: string;
  description: string;
  status: string;
  value: number;
  progress: string | number | undefined;
  dueDate: string | undefined;
  icon?: string | undefined;
}
import { Check } from "lucide-react";
import { BarChart3, Briefcase, GitFork } from "lucide-react";

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
  const Icon = iconMap[icon];

  return (
    <div
      className="
        rounded-xl border border-gray-200 bg-white p-6
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-teal-400
        hover:shadow-[0_0_8px_rgba(13,148,136,0.25),0_0_18px_rgba(13,148,136,0.12)]
      "
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
          <Icon className="h-6 w-6 text-teal-600" />
        </div>

        <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-green-700">
          {status}
        </span>
      </div>

      {/* Project name */}
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      <hr className="my-4 border-teal-500" />
      {/* Project value */}
      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
          Project Value
        </p>

        <p className="mt-1 text-xl font-semibold text-gray-800">${value}</p>
      </div>

      {/* Progress */}
      {status === "In Progress" ? (
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              Project progress
            </span>

            <span className="text-xs font-medium text-gray-700">
              {progress}%
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-indigo-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-xs text-gray-500">Due {dueDate}</p>
        </div>
      ) : (
        <div className="mt-5">
          <p className="mt-4 text-xs flex items-center text-gray-500">
            <Check className="h-5 w-5 text-green-500 shrink-0" />
            &nbsp;Delivered on {dueDate}
          </p>
        </div>
      )}

      {/* Due date */}
    </div>
  );
}
