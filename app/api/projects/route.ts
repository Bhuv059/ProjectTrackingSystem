import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const newProject = await request.json();

    const filePath = path.join(process.cwd(), "app", "data", "projects.ts");

    const file = await fs.readFile(filePath, "utf8");

    const projectString = JSON.stringify(newProject, null, 2).replace(
      /"([^"]+)":/g,
      "$1:"
    );

    const updatedFile = file.replace(/\];\s*$/, `  ${projectString},\n];`);

    await fs.writeFile(filePath, updatedFile, "utf8");

    return NextResponse.json({
      success: true,
      project: newProject,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to update projects.ts" },
      { status: 500 }
    );
  }
}
