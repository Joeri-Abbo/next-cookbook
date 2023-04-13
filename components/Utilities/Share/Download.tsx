// Download.tsx
import React from "react";
import Link from "next/link";
import DownloadIcon from "../../../public/icons/download-solid.svg";
import { asPathText } from "../../../interfaces/Utilities/asPathText";

const base_url = process.env.BASE_URL;

const Download = ({ asPath, text }: asPathText) => (
    <div>
        <Link href="#">
            <a onClick={() => {
                // Download functionality here
            }}>
                <DownloadIcon className="w-6 h-6 hover:scale-125 transform-gpu fill-blue-500 cursor-pointer" />
            </a>
        </Link>
    </div>
);

export default Download;





