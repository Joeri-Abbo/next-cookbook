import React from "react";
import Link from "next/link";
import Envelope from "../../../public/icons/circle-envelope-solid.svg";
import {asPath} from "../../../interfaces/Utilities/asPath";

const base_url = process.env.BASE_URL;

const Mail = ({asPath}: asPath) => (
    <div>
        <Link href={`mailto:?subject=Check this out&body=${base_url}${asPath}`}>
            <Envelope className="h-6 w-6 transform-gpu cursor-pointer fill-blue-500 hover:scale-125"/>
        </Link>
    </div>
);

export default Mail;