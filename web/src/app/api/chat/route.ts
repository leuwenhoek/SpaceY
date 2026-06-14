import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { message, mode = "archives" } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string." },
        { status: 400 }
      );
    }

    // Resolve paths relative to process.cwd() (which is the 'web' folder)
    const rootDir = path.resolve(process.cwd(), "..");
    const pythonExe = path.join(rootDir, ".venv", "Scripts", "python.exe");
    const scriptPath = path.join(rootDir, "query.py");

    const result = await new Promise<{ answer: string; sources: string[] }>((resolve, reject) => {
      const child = spawn(pythonExe, [scriptPath, message, mode], {
        cwd: rootDir,
        env: { ...process.env }, // Pass environment variables
      });

      let stdoutData = "";
      let stderrData = "";

      child.stdout.on("data", (data) => {
        stdoutData += data.toString();
      });

      child.stderr.on("data", (data) => {
        stderrData += data.toString();
      });

      child.on("error", (error) => {
        reject(error);
      });

      child.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Python process exited with code ${code}. Stderr: ${stderrData}`));
        } else {
          const rawResult = stdoutData.trim();
          try {
            const parsed = JSON.parse(rawResult);
            resolve(parsed);
          } catch {
            // Robust check: extract JSON structure if libraries printed extra text to stdout
            const startIdx = rawResult.indexOf("{");
            const endIdx = rawResult.lastIndexOf("}");
            if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
              try {
                const cleanJson = rawResult.substring(startIdx, endIdx + 1);
                resolve(JSON.parse(cleanJson));
                return;
              } catch {}
            }
            reject(new Error(`Failed to parse Python JSON stdout. Raw output: ${rawResult}`));
          }
        }
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in chat API route:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred on the server.";
    return NextResponse.json(
      { error: errorMessage, sources: [] },
      { status: 500 }
    );
  }
}
