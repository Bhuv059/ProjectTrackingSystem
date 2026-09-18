
"use client";

import "../../styles/addProjectForm.css";

import { useState } from "react";
import { ArrowLeft, Briefcase, BarChart3, GitFork } from "lucide-react";
import { Project } from "@prisma/client";
import { ProjectFormData, ProjectStatus, ProjectIcon } from "@/app/lib/project";
import toast from "react-hot-toast";

interface ProjectFormProps {
  mode: "add" | "edit";
  project?: Project;
  onCancel: () => void;
  onAdd?: (project: ProjectFormData) => void | Promise<void>;
  onUpdate?: (project: ProjectFormData) => void | Promise<void>;
}

export default function ProjectForm({ mode, project, onCancel, onAdd, onUpdate }: ProjectFormProps) {
  const [name, setName] = useState(project?.name ?? "");
  const [client, setClient] = useState(project?.client ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [status, setStatus] = useState<ProjectStatus>((project?.status as ProjectStatus) ?? ProjectStatus.IN_PROGRESS);
  const [value, setValue] = useState(project?.value?.toString() ?? "");
  const [progress, setProgress] = useState(project?.progress?.toString() ?? "0");
  const [dueDate, setDueDate] = useState(project?.dueDate ?? "");
  const [icon, setIcon] = useState<ProjectIcon>((project?.icon as ProjectIcon) ?? ProjectIcon.CHART);
  const [color, setColor] = useState(project?.color ?? "purple");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const iconMap = { [ProjectIcon.CHART]: BarChart3, [ProjectIcon.PORTFOLIO]: Briefcase, [ProjectIcon.FORK]: GitFork };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saving) return;
    setError("");

    const projectData: ProjectFormData = { name, client, description, value: Number(value), status, icon, color, progress: status === ProjectStatus.COMPLETED ? 100 : Number(progress), dueDate };

    try {
      setSaving(true);
      if (mode === "edit") { await onUpdate?.(projectData); toast.success("Project updated successfully!"); } else { await onAdd?.(projectData); toast.success("Project added successfully!"); }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      console.error("Project form error:", error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const isEditMode = mode === "edit";

  return (
    <div className="add-project-page">
      <div className="add-project-container">
        <button type="button" onClick={onCancel} className="back-button cursor-pointer" disabled={saving}><ArrowLeft className="h-4 w-4" />Back to Projects</button>

        <div className="form-card">
          <div className="form-header"><h1 className="form-title">{isEditMode ? "Update project details below" : "Enter details of new project below."}</h1></div>

          {error && <div className="form-error" role="alert">{error}</div>}

          <form onSubmit={handleSubmit} className="project-form">
            <div className="form-field">
              <label htmlFor="name">Project Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Admin Dashboard" required className="form-input" />
            </div>

            <div className="form-field">
              <label htmlFor="client">Client</label>
              <textarea id="client" value={client} onChange={(e) => setClient(e.target.value)} placeholder="Enter client name..." rows={4} required className="form-input form-textarea" />
            </div>

            <div className="form-field">
              <label htmlFor="description">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description..." rows={4} required className="form-input form-textarea" />
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="status">Status</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)} className="form-input">{Object.values(ProjectStatus).map((projectStatus) => (<option key={projectStatus} value={projectStatus}>{projectStatus}</option>))}</select>
              </div>

              <div className="form-field">
                <label htmlFor="color">Project Color</label>
                <input id="color" type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g. purple" required className="form-input" />
              </div>

              <div className="form-field">
                <label htmlFor="value">Project Value ($)</label>
                <input id="value" type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} placeholder="800" required className="form-input" />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="progress">Progress (%)</label>
                <input id="progress" type="number" min="0" max="100" value={progress} onChange={(e) => setProgress(e.target.value)} disabled={status !== ProjectStatus.IN_PROGRESS} className="form-input" />
              </div>

              <div className="form-field">
                <label htmlFor="dueDate">Due Date</label>
                <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="form-input" />
              </div>
            </div>

            <div className="form-field">
              <label>Project Icon</label>
              <div className="form-icon-grid">
                {Object.values(ProjectIcon).map((projectIcon) => { const IconComponent = iconMap[projectIcon]; return (<button key={projectIcon} type="button" onClick={() => setIcon(projectIcon)} className={`form-icon-button ${icon === projectIcon ? "active" : ""}`} disabled={saving}><IconComponent className="form-icon" /><span className="form-icon-label">{projectIcon}</span></button>); })}
              </div>
            </div>

            <div className="project-actions">
              <div className="form-actions">
                <button type="button" onClick={onCancel} className="cancel-button" disabled={saving}>Cancel</button>
                <button type="submit" className="submit-button" disabled={saving}>{saving ? (isEditMode ? "Updating..." : "Saving...") : isEditMode ? "Update Project" : "Add Project"}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
