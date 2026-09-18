import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

const allowedStatuses = ["In Progress", "Completed", "Pending"];

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project }, { status: 200 });
  } catch (error) {
    console.error("GET project error:", error);

    return NextResponse.json({ success: false, error: "Failed to get project" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    let formData;

    try {
      formData = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON request body" }, { status: 400 });
    }

    if (!formData.name || !formData.client || !formData.status) {
      return NextResponse.json({ success: false, error: "Name, client, and status are required" }, { status: 400 });
    }

    if (!allowedStatuses.includes(formData.status)) {
      return NextResponse.json({ success: false, error: "Invalid project status" }, { status: 400 });
    }

    const value = Number(formData.value);

    if (Number.isNaN(value)) {
      return NextResponse.json({ success: false, error: "Value must be a valid number" }, { status: 400 });
    }

    const progress = formData.progress !== undefined && formData.progress !== null ? Number(formData.progress) : null;

    if (progress !== null && Number.isNaN(progress)) {
      return NextResponse.json({ success: false, error: "Progress must be a valid number" }, { status: 400 });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name: formData.name,
        client: formData.client,
        description: formData.description,
        status: formData.status,
        value,
        progress,
        dueDate: formData.dueDate ?? null,
        icon: formData.icon ?? null,
        color: formData.color ?? null,
      },
    });

    return NextResponse.json({ success: true, project: updatedProject }, { status: 200 });
  } catch (error) {
    console.error("PUT project error:", error);

    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE project error:", error);

    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
  }
}