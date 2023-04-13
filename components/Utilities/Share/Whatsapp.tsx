import React from "react";
import Link from "next/link";
import WhatsappIcon from "../../../public/icons/whatsapp.svg";
import { asPathText } from "../../../interfaces/Utilities/asPathText";

const base_url = process.env.BASE_URL;

const Whatsapp = ({ asPath, text }: asPathText) => (
    <div>
        <Link href={`whatsapp://send?text=${base_url}${asPath} ${text}`}>
            <a>
                <WhatsappIcon className="w-6 h-6 hover:scale-125 transform-gpu fill-green-600 cursor-pointer" />
            </a>
        </Link>
    </div>
);

export default Whatsapp;