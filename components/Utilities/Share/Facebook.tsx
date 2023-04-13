import React from "react";
import Link from "next/link";
import FacebookIcon from "../../../public/icons/facebook.svg";
import {asPath} from "../../../interfaces/Utilities/asPath";

const base_url = process.env.BASE_URL;

const Facebook = ({asPath}: asPath) => (
    <div>
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${base_url}${asPath}`}>
            <a>
                <FacebookIcon className="w-6 h-6 hover:scale-125 transform-gpu fill-blue-700 cursor-pointer"/>
            </a>
        </Link>
    </div>
);

export default Facebook;