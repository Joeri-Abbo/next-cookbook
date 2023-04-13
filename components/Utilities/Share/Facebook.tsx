import React from "react";
import Link from "next/link";
import FacebookIcon from "../../../public/icons/facebook.svg";
import {asPath} from "../../../interfaces/Utilities/asPath";

const base_url = process.env.BASE_URL;

const Facebook = ({asPath}: asPath) => (
    <div>
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${base_url}${asPath}`}>
            <FacebookIcon className="h-6 w-6 transform-gpu cursor-pointer fill-blue-700 hover:scale-125"/>
        </Link>
    </div>
);

export default Facebook;