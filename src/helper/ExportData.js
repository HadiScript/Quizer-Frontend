import * as XLSX from "xlsx";

export const exportDataToExcel = (data, fileName = "quiz_attempts.xlsx") => {
  // Convert JSON data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Attempts");

  // Export the workbook to a file
  XLSX.writeFile(workbook, fileName);
};
