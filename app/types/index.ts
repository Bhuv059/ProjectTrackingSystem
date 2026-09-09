import { projects } from "@/app/data/projects";

export type ProjectStatus =
  | "Planning"
  | "In Progress"
  | "Completed"
  | "On Hold";

export type ProjectIcon = "chart" | "portfolio" | "fork";

export type ProjectColor = "green" | "purple" | "orange";

export interface Project {
  id: string;
  name: string;
  client: string;
  price: number;
  status: string;
  icon: string;
  color: string;
  progress?: number;
  deadline?: string;
  completed?: string;
}

export const projectFilter = ["All", "In Progress", "Completed"] as const;

export type ProjectFilter = (typeof projectFilter)[number];

export const completed: number = projects.filter(
  (project) => project.status === "Completed"
).length;

export const getFilteredProjects = (
  projects: Project[],
  filter: ProjectFilter
): Project[] => {
  return filter === "All"
    ? projects
    : projects.filter((project) => project.status === filter);
};

export const getTotalValue = (filteredProjects: Project[]): number => {
  return filteredProjects.reduce((total, project) => total + project.price, 0);
};

export const totalAll: number = projects.reduce(
  (total, project) => total + project.price,
  0
);
