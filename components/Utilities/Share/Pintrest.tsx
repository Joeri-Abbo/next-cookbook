import React, {ReactNode} from "react";
import Link from "next/link";
import PintrestIcon from "../../../public/icons/pinterest.svg"

type Props = {
    asPath: string
}
const base_url = process.env.BASE_URL;

const Pintrest = ({asPath}: Props) => (
    <div>
        <Link href={"https://www.facebook.com/sharer/sharer.php?u=" + base_url + asPath}>
            {"https://www.facebook.com/sharer/sharer.php?u=" + base_url + asPath}
            <PintrestIcon className={"w-6 h-6 hover:scale-125 transform-gpu fill-blue-500"}/>
        </Link>
    </div>
)

export default Pintrest
