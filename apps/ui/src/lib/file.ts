"use server";

import path from "path";
import fs from "fs";

export const getNumberOfFilesInsideDirectory = async (
  directoryPath: string
) => {
  try {
    const directoryFullPath = path.join(process.cwd(), directoryPath);

    const files = fs.readdirSync(directoryFullPath);
    const fileCount = files.filter((file) =>
      fs.statSync(path.join(directoryFullPath, file)).isFile()
    ).length;

    return fileCount;
  } catch (error) {
    console.error("error :", error);
    return 0;
  }
};

export const getFileContent = async (filePath: string) => {
  try {
    const resolvedPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`File not found: ${resolvedPath}`);
    }
    return fs.readFileSync(resolvedPath, "utf8");
  } catch (error) {
    console.error("Error reading file:", error);
    return "// File not found or error reading file.";
  }
};
