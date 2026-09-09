"use client";

import "../../styles/addProjectForm.css";

import { useState } from "react";
import { ArrowLeft, Briefcase, BarChart3, GitFork } from "lucide-react";

import { Project } from "../../types/index";

interface ProjectFormProps {
  mode: "add" | "edit";
  project?: Project;

  onCancel: () => void;
  onAdd?: (project: Project) => void;
  onUpdate?: (project: Project) => void;
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
  const [status, setStatus] = useState(project?.status ?? "In Progress");
  const [price, setPrice] = useState(project?.price?.toString() ?? "");
  const [progress, setProgress] = useState(
    project?.progress?.toString() ?? "0"
  );
  const [dueDate, setDueDate] = useState(project?.deadline ?? "");
  const [icon, setIcon] = useState(project?.icon ?? "chart");
  const [color, setColor] = useState(project?.color ?? "purple");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProject: Project = {
      id: project?.id ?? crypto.randomUUID(),
      name,
      client,
      price: Number(price),
      status,
      icon,
      color,
      progress: status === "Completed" ? 100 : Number(progress),
      deadline: dueDate,
    };

    if (mode === "edit") {
      onUpdate?.(updatedProject);
    } else {
      onAdd?.(updatedProject);
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
              {isEditMode ? "Edit Project" : "Add New Project"}
            </h1>

            <p className="form-description">
              {isEditMode
                ? "Update your freelance project details below."
                : "Enter the details of your new project below."}
            </p>
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

            {/* Status + Color + Value */}
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="status">Status</label>

                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-input"
                >
                  <option value="In Progress">In Progress</option>

                  <option value="Completed">Completed</option>

                  <option value="Pending">Pending</option>
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
                <label htmlFor="price">Project Value ($)</label>

                <input
                  id="price"
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
            <div className="form-actions">
              <button
                type="button"
                onClick={onCancel}
                className="cancel-button"
              >
                Cancel
              </button>

              <button type="submit" className="submit-button">
                {isEditMode ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
