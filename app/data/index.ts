export type ProjectStatus = "In Progress" | "Completed";

export type ProjectIcon = "chart" | "portfolio" | "fork";

export type ProjectColor = "blue" | "purple" | "orange";

export interface Project {
  name: string;
  client: string;
  price: number;
  status: ProjectStatus;
  icon: ProjectIcon;
  color: ProjectColor;
  progress?: number;
  deadline?: string;
  completed?: string;
}

export const projects: Project[] = [
  {
    name: "Admin Dashboard",
    client: "Papertrail Studio",
    price: 800,
    status: "In Progress",
    icon: "chart",
    color: "blue",
    progress: 65,
    deadline: "Sep 18, 2024",
  },
  {
    name: "Portfolio",
    client: "Maya Chen",
    price: 300,
    status: "Completed",
    icon: "portfolio",
    color: "purple",
    deadline: "Aug 16, 2024",
  },
  {
    name: "Task Manager",
    client: "Landing Page",
    price: 500,
    status: "Completed",
    icon: "fork",
    color: "orange",
    deadline: "Aug 28, 2024",
  },
];

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
