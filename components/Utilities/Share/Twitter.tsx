import React from "react";
import Link from "next/link";
import TwitterIcon from "../../../public/icons/twitter.svg";
import {asPathText} from "../../../interfaces/Utilities/asPathText";

const base_url = process.env.BASE_URL;

const Twitter = ({asPath, text}: asPathText) => (
    <div>
        <Link href={`https://twitter.com/intent/tweet?text=${text}&url=${base_url}${asPath}`}>
            <TwitterIcon className="h-6 w-6 transform-gpu cursor-pointer fill-blue-500 hover:scale-125"/>
        </Link>
    </div>
);

export default Twitter;