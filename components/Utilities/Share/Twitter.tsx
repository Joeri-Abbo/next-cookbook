import React from "react";
import Link from "next/link";
import TwitterIcon from "../../../public/icons/twitter.svg";
import { asPathText } from "../../../interfaces/Utilities/asPathText";

const base_url = process.env.BASE_URL;

const Twitter = ({ asPath, text }: asPathText) => (
    <div>
        <Link href={`https://twitter.com/intent/tweet?text=${text}&url=${base_url}${asPath}`}>
            <a>
                <TwitterIcon className="w-6 h-6 hover:scale-125 transform-gpu fill-blue-500 cursor-pointer" />
            </a>
        </Link>
    </div>
);

export default Twitter;