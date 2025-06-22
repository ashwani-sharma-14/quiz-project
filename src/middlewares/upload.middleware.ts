import multer from "multer";
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only Excel files are allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});
