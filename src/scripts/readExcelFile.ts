import { Workbook } from "exceljs";

/**
 * Reads an Excel file and returns a 2D array of its content.
 * @param pathname The full path to the Excel (.xlsx) file.
 * @returns A 2D array containing cell values, or null if the worksheet isn't found.
 */
export const readExcelFile = async (pathname: string): Promise<string[][] | null> => {
  const workbook = new Workbook();
  await workbook.xlsx.readFile(pathname);

  const worksheet = workbook.getWorksheet(1); // First sheet

  if (!worksheet) {
    return null;
  }

  const data: string[][] = [];

  worksheet.eachRow({ includeEmpty: false }, (row, _rowNumber) => {
    const rowData: string[] = [];
    row.eachCell({ includeEmpty: true }, (cell, _colNumber) => {
      const cellValue = cell.value;
      rowData.push(cellValue?.toString() ?? "");
    });
    data.push(rowData);
  });

  return data;
};
