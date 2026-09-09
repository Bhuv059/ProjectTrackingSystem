import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const filePath = path.join(process.cwd(), "app", "data", "projects.ts");
    const file = await fs.readFile(filePath, "utf8");

    const projectRegex = new RegExp(
      `\\{\\s*id:\\s*"${id}"[\\s\\S]*?\\n\\s*\\},`,
      "m"
    );

    const match = file.match(projectRegex);

    if (!match) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
          id,
        },
        { status: 404 }
      );
    }

    const projectText = match[0].replace(/,\s*$/, "").trim();

    // Convert the TypeScript object syntax into JSON
    const jsonText = projectText
      .replace(/(\w+):/g, '"$1":')
      .replace(/,\s*}/g, "}");

    const project = JSON.parse(jsonText);

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET project error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to get project",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const updatedProject = await request.json();

    const filePath = path.join(process.cwd(), "app", "data", "projects.ts");

    const file = await fs.readFile(filePath, "utf8");

    const projectRegex = new RegExp(
      `\\{\\s*id:\\s*"${id}"[\\s\\S]*?\\n\\s*\\},`,
      "m"
    );

    const match = file.match(projectRegex);

    if (!match) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    const projectString = JSON.stringify(updatedProject, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/^/gm, "  ");

    const updatedFile = file.replace(projectRegex, `${projectString},`);

    await fs.writeFile(filePath, updatedFile, "utf8");

    return NextResponse.json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    console.error("PUT project error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update project",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const filePath = path.join(process.cwd(), "app", "data", "projects.ts");

    const file = await fs.readFile(filePath, "utf8");

    const projectRegex = new RegExp(
      `\\s*\\{\\s*id:\\s*"${id}"[\\s\\S]*?\\n\\s*\\},`,
      "m"
    );

    if (!projectRegex.test(file)) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    const updatedFile = file.replace(projectRegex, "");

    await fs.writeFile(filePath, updatedFile, "utf8");

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE project error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}
