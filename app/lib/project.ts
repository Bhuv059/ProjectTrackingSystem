import { Project as PrismaProject } from "@prisma/client";

export type Project = PrismaProject;

//export type ProjectStatus = "In Progress" | "Completed" | "Pending";
export enum ProjectStatus {
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  PENDING = "Pending",
}
export type ProjectIcon = "chart" | "portfolio" | "fork";

export interface ProjectFormData {
  name: string;
  client: string;
  description: string;
  value: number;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  icon: ProjectIcon;
  color: string;
}

export async function fetchProjects(status?: string): Promise<Project[]> {
  const url = status
    ? `/api/projects?status=${encodeURIComponent(status)}`
    : "/api/projects";

  const response = await fetch(url);

  console.log("HTTP status:", response.status);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch projects");
  }

  return data.projects;
}

export async function fetchProject(id: string): Promise<Project> {
  const response = await fetch(`/api/projects/${encodeURIComponent(id)}`);

  console.log("HTTP status:", response.status);
  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const data = await response.json();

  return data.project;
}
