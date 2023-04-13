import React from "react";
import Link from "next/link";
import PinterestIcon from "../../../public/icons/pinterest.svg";
import {asPath} from "../../../interfaces/Utilities/asPath";

const base_url = process.env.BASE_URL;

const Pinterest = ({asPath}: asPath) => (
    <div>
        <Link href={`https://pinterest.com/pin/create/button/?url=${base_url}${asPath}`}>
            <a>
                <PinterestIcon className="w-6 h-6 hover:scale-125 transform-gpu fill-red-600 cursor-pointer"/>
            </a>
        </Link>
    </div>
);

export default Pinterest;