import React from "react";
import Whatsapp from "./Whatsapp";
import Facebook from "./Facebook";
import Mail from "./Mail";
import Pinterest from "./Pintrest";
import Twitter from "./Twitter";
import Download from "./Download";

type Props = {
    asPath: string;
    text: string;
};

const Items = ({asPath, text}: Props) => (
    <div className="flex space-x-2">
        <Whatsapp asPath={asPath} text={text}/>
        <Facebook asPath={asPath}/>
        <Mail asPath={asPath}/>
        <Pinterest asPath={asPath}/>
        <Twitter asPath={asPath} text={text}/>
        <Download asPath={asPath} text={text}/>
    </div>
);

export default Items;
