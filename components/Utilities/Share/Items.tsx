import React, {ReactNode} from "react";
import Whatsapp from "./Whatsapp";
import Facebook from "./Facebook";
import Mail from "./Mail";
import Pintrest from "./Pintrest";
import Twitter from "./Twitter";

type Props = {
    asPath: string
    text: string
}
const Items = ({asPath, text}: Props) => (
    <>
        <Whatsapp asPath={asPath} text={text}/>
        <Facebook asPath={asPath}/>
        <Mail asPath={asPath}/>
        <Pintrest asPath={asPath}/>
        <Twitter asPath={asPath} text={text}/>
    </>
)

export default Items
