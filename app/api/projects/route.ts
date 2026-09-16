import { NextResponse } from "next/server";
import { prisma } from "../..//lib/prisma";

const projects = await prisma.project.findMany();

console.log("Projects from database:", projects);

//GET /api/projects
//GET /api/projects?status=Completed
//GET /api/projects?status=In%20Progress
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const allowedStatuses = ["In Progress", "Completed"];

    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid status filter",
        },
        { status: 400 }
      );
    }

    const projects = await prisma.project.findMany({
      where: status ? { status: status } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, projects }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    if (!formData.name || !formData.client || !formData.status) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, client, and status are required",
        },
        { status: 400 }
      );
    }
    const value = Number(formData.value);
    if (Number.isNaN(value)) {
      return NextResponse.json(
        {
          success: false,
          error: "Value must be a valid number",
        },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        name: formData.name,
        client: formData.client,
        description: formData.description,
        status: formData.status,
        value: Number(formData.value),
        progress:
          formData.progress !== undefined && formData.progress !== null
            ? Number(formData.progress)
            : null,
        dueDate: formData.dueDate ?? null,
        icon: formData.icon ?? null,
        color: formData.color ?? null,
      },
    });

    return Response.json({ newProject }, { status: 201 });
  } catch (error) {
    console.error("Failed to create project", error);

    return NextResponse.json(
      { success: false, error: "Failed to create projects" },
      { status: 500 }
    );
  }
}
