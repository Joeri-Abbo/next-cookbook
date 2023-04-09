import React, {ReactNode} from "react";
import Link from "next/link";

type Props = {
    asPath: string
    text: string
}
const base_url = process.env.BASE_URL;

const Whatsapp = ({asPath, text}: Props) => (
    <div>
        <Link href={"whatsapp://send?text=" + base_url + asPath + text}>
            {"whatsapp://send?text=" + base_url + asPath + text}
        </Link>
    </div>
)

export default Whatsapp
