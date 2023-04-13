import React from "react";
import Link from "next/link";
import Envelope from "../../../public/icons/circle-envelope-solid.svg";
import {asPath} from "../../../interfaces/Utilities/asPath";

const base_url = process.env.BASE_URL;

const Mail = ({asPath}: asPath) => (
    <div>
        <Link href={`mailto:?subject=Check this out&body=${base_url}${asPath}`}>
            <Envelope className="w-6 h-6 hover:scale-125 transform-gpu fill-blue-500 cursor-pointer"/>
        </Link>
    </div>
);

export default Mail;