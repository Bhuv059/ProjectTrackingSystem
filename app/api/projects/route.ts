import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

const allowedStatuses = ["In Progress", "Completed", "Pending"];

// GET /api/projects
// GET /api/projects?status=Completed
// GET /api/projects?status=In%20Progress
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: `Invalid status filter. Allowed values are: ${allowedStatuses.join(", ")}` }, { status: 400 });
    }

    const projects = await prisma.project.findMany({ where: status ? { status } : undefined, orderBy: { createdAt: "desc" } });

    return NextResponse.json({ success: true, projects }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST /api/projects
export async function POST(request: Request) {
  let formData;

  try {
    formData = await request.json();
  } catch (error) {
    console.log("POST error:", error);
    return NextResponse.json({ success: false, error: "Invalid JSON request body" }, { status: 400 });
  }

  try {
    if (!formData.name || !formData.client || !formData.status) {
      return NextResponse.json({ success: false, error: "Name, client, and status are required" }, { status: 400 });
    }

    if (!allowedStatuses.includes(formData.status)) {
      return NextResponse.json({ success: false, error: `Invalid status. Allowed values are: ${allowedStatuses.join(", ")}` }, { status: 400 });
    }

    const value = Number(formData.value);

    if (Number.isNaN(value)) {
      return NextResponse.json({ success: false, error: "Value must be a valid number" }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        name: formData.name,
        client: formData.client,
        description: formData.description,
        status: formData.status,
        value,
        progress: formData.progress !== undefined && formData.progress !== null ? Number(formData.progress) : null,
        dueDate: formData.dueDate ?? null,
        icon: formData.icon ?? null,
        color: formData.color ?? null,
      },
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);

    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 });
  }
}