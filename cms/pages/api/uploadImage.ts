import {NextApiRequest, NextApiResponse} from "next";
// @ts-ignore
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    // @ts-ignore
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "../public/recipe"));
    },
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage: storage}).single("file");

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        // @ts-ignore
        upload(req, res, function (err) {
            if (err) {
                console.error("Multer error:", err);
                return res.status(500).json({success: false, message: `Error uploading the file: ${err.message}`});
            }
            // @ts-ignore
            if (!req.file) {
                return res.status(400).json({success: false, message: "No file received"});
            }
            // @ts-ignore
            const filePath = `/recipe/${req.file.filename}`;
            res.status(200).json({success: true, message: "File uploaded successfully", filePath});
        });
    } else {
        res.status(405).json({success: false, message: "Method not allowed"});
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};
