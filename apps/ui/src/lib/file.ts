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
  const joinedPath = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(joinedPath, "utf8");

  return content;
};
