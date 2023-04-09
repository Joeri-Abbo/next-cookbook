import React, {ReactNode} from "react";
import Link from "next/link";

type Props = {
    asPath: string
    text: string
}
const base_url = process.env.BASE_URL;

const Whatsapp = ({asPath, text}: Props) => (
    <div>
        <Link href={"https://www.facebook.com/sharer/sharer.php?u=" + base_url + asPath}>
            {"https://www.facebook.com/sharer/sharer.php?u=" + base_url + asPath}
        </Link>
    </div>
)

export default Whatsapp
