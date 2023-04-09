import React, {ReactNode} from "react";
import Link from "next/link";
import Envelope from "../../../public/icons/circle-envelope-solid.svg"

type Props = {
    asPath: string
}
const base_url = process.env.BASE_URL;

const Mail = ({asPath}: Props) => (
    <div>
        <Link href={"https://www.facebook.com/sharer/sharer.php?u=" + base_url + asPath}>
            {"https://www.facebook.com/sharer/sharer.php?u=" + base_url + asPath}
            <Envelope className={"w-6 h-6 hover:scale-125 transform-gpu fill-blue-500"}/>
        </Link>
    </div>
)

export default Mail
