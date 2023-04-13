import Facebook from "../../public/icons/facebook.svg"
import Envelope from "../../public/icons/circle-envelope-solid.svg"
import Linkedin from "../../public/icons/linkedin-in.svg"
import Github from "../../public/icons/github.svg"
import Link from "next/link";

const Socials = () => {
    let iconClass = "w-6 h-6 hover:scale-125 transform-gpu fill-blue-500"
    return (
        <div className="my-2 flex gap-2.5">
            <Link href="https://www.facebook.com/joeri.abbo.1" target="_blank">
                <Facebook className={iconClass}/>
            </Link>
            <Link href={`mailto:${"joeriabbo@hotmail.com"}?subject=Hello Joeri`} target="_blank">
                <Envelope className={iconClass}/>
            </Link>
            <Link href="https://www.linkedin.com/in/joeri-abbo-43a457144/" target="_blank">
                <Linkedin className={iconClass}/>
            </Link>
            <Link href="https://github.com/Joeri-Abbo" target="_blank">
                <Github className={iconClass}/>
            </Link>
        </div>
    )
}
export default Socials;