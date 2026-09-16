"use client";

import "../../styles/addProjectForm.css";

import { useState } from "react";
import { ArrowLeft, Briefcase, BarChart3, GitFork } from "lucide-react";
import { Project } from "@prisma/client";
import { ProjectFormData, ProjectStatus } from "@/app/lib/project";

interface ProjectFormProps {
  mode: "add" | "edit";
  project?: Project;

  onCancel: () => void;
  onAdd?: (project: ProjectFormData) => void;
  onUpdate?: (project: ProjectFormData) => void;
}

const projectIcons = [
  {
    name: "chart",
    label: "Chart",
    Icon: BarChart3,
  },
  {
    name: "portfolio",
    label: "Portfolio",
    Icon: Briefcase,
  },
  {
    name: "fork",
    label: "Git Fork",
    Icon: GitFork,
  },
];

export default function ProjectForm({
  mode,
  project,
  onCancel,
  onAdd,
  onUpdate,
}: ProjectFormProps) {
  const [name, setName] = useState(project?.name ?? "");
  const [client, setClient] = useState(project?.client ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  //const [status, setStatus] = useState(project?.status ?? "In Progress");
  const [status, setStatus] = useState<ProjectStatus>(
    ProjectStatus.IN_PROGRESS
  );
  const [value, setValue] = useState(project?.value?.toString() ?? "");
  const [progress, setProgress] = useState(
    project?.progress?.toString() ?? "0"
  );
  const [dueDate, setDueDate] = useState(project?.dueDate ?? "");
  const [icon, setIcon] = useState(project?.icon ?? "chart");
  const [color, setColor] = useState(project?.color ?? "purple");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saving) return;
    const projectData: ProjectFormData = {
      name,
      client,
      description,
      value: Number(value),
      status,
      icon,
      color,
      progress: status === "Completed" ? 100 : Number(progress),
      dueDate,
    };

    try {
      setSaving(true);

      if (mode === "edit") {
        await onUpdate?.(projectData);
      } else {
        await onAdd?.(projectData);
      }
    } finally {
      setSaving(false);
    }
  };

  const isEditMode = mode === "edit";

  return (
    <div className="add-project-page">
      <div className="add-project-container">
        {/* Back */}
        <button
          type="button"
          onClick={onCancel}
          className="back-button cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </button>

        {/* Form Card */}
        <div className="form-card">
          {/* Header */}
          <div className="form-header">
            <h1 className="form-title">
              {isEditMode
                ? "Update project details below"
                : "Enter details of  new project below."}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="project-form">
            {/* Project Name */}
            <div className="form-field">
              <label htmlFor="name">Project Name</label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Admin Dashboard"
                required
                className="form-input"
              />
            </div>

            {/* Client */}
            <div className="form-field">
              <label htmlFor="client">Client</label>

              <textarea
                id="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Enter client name..."
                rows={4}
                required
                className="form-input form-textarea"
              />
            </div>

            {/* Description */}
            <div className="form-field">
              <label htmlFor="client">Description</label>

              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
                rows={4}
                required
                className="form-input form-textarea"
              />
            </div>

            {/* Status + Color + Value */}
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="status">Status</label>

                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                  className="form-input"
                >
                  {Object.values(ProjectStatus).map((projectStatus) => (
                    <option key={projectStatus} value={projectStatus}>
                      {projectStatus}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="color">Project Color</label>

                <input
                  id="color"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. purple"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label htmlFor="value">Project Value ($)</label>

                <input
                  id="value"
                  type="number"
                  min="0"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="800"
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Progress + Due Date */}
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="progress">Progress (%)</label>

                <input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  disabled={status !== "In Progress"}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label htmlFor="dueDate">Due Date</label>

                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Project Icon */}
            <div className="form-field">
              <label>Project Icon</label>

              <div className="form-icon-grid">
                {projectIcons.map(({ name, label, Icon }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setIcon(name)}
                    className={`form-icon-button ${
                      icon === name ? "active" : ""
                    }`}
                  >
                    <Icon className="form-icon" />

                    <span className="form-icon-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="project-actions">
              <div className="form-actions">
                <button
                  type="button"
                  onClick={onCancel}
                  className="cancel-button"
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={saving}
                >
                  {/* {isEditMode ? "Update Project" : "Add Project"} */}
                  {saving
                    ? isEditMode
                      ? "Updating..."
                      : "Saving..."
                    : isEditMode
                      ? "Update Project"
                      : "Add Project"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
