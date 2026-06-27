import multer from "multer";

// Configure how uploaded files are stored
const storage = multer.diskStorage({
  destination: "src/uploads",

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
});
