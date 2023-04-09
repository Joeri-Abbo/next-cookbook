import React, {ReactNode} from "react";
import Link from "next/link";
import WhatsappIcon from "../../../public/icons/whatsapp.svg"

type Props = {
    asPath: string
    text: string
}
const base_url = process.env.BASE_URL;

const Whatsapp = ({asPath, text}: Props) => (
    <div>
        <Link href={"whatsapp://send?text=" + base_url + asPath + text}>
            {"whatsapp://send?text=" + base_url + asPath + text}
            <WhatsappIcon className={"w-6 h-6 hover:scale-125 transform-gpu fill-blue-500"}/>
        </Link>
    </div>
)

export default Whatsapp
