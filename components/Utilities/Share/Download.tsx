// Download.tsx
import React, {useCallback} from "react";
import Link from "next/link";
import DownloadIcon from "../../../public/icons/download-solid.svg";
import {asPathText} from "../../../interfaces/Utilities/asPathText";

const base_url = process.env.BASE_URL;

const Download = ({asPath, text}: asPathText) => {
    const downloadPDF = useCallback(async () => {
        const {default: html2pdf} = await import("html2pdf.js");
        const element = document.body;
        const opt = {
            margin: 1,
            filename: `${text}.pdf`,
            image: {type: "jpeg", quality: 0.98},
            html2canvas: {scale: 2},
            jsPDF: {unit: "in", format: "letter", orientation: "portrait"},
        };

        html2pdf().set(opt).from(element).save();
    }, []);

    return (
        <div>
            <Link href="#" onClick={downloadPDF}>
                <DownloadIcon className="w-6 h-6 hover:scale-125 transform-gpu fill-blue-500 cursor-pointer"/>
            </Link>
        </div>
    );
};

export default Download;
