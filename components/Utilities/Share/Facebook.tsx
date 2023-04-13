import React, {ReactNode} from "react";
import Link from "next/link";
import FacebookIcon from "../../../public/icons/facebook.svg"
import {asPath} from "../../../interfaces/asPath";

const base_url = process.env.BASE_URL;

const Facebook = ({asPath}: asPath) => (
    <div>
        <Link href={"https://www.facebook.com/sharer/sharer.php?u=" + base_url + asPath}>
            {"https://www.facebook.com/sharer/sharer.php?u=" + base_url + asPath}
            <FacebookIcon className={"w-6 h-6 hover:scale-125 transform-gpu fill-blue-500"}/>
        </Link>
    </div>
)

export default Facebook
