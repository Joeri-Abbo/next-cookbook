import React, {ReactNode} from "react";
import Link from "next/link";
import DownloadIcon from "../../../public/icons/download-solid.svg"

type Props = {
    asPath: string
    text: string
}
const base_url = process.env.BASE_URL;

const Download = ({asPath, text}: Props) => (
    <div>
        <Link href={"whatsapp://send?text=" + base_url + asPath + text}>
            {"whatsapp://send?text=" + base_url + asPath + text}
            <DownloadIcon className={"w-6 h-6 hover:scale-125 transform-gpu fill-blue-500"}/>
        </Link>
    </div>
)

export default Download
