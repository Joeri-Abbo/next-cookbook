import React, {ReactNode} from 'react'
import Head from 'next/head'
import Socials from "./Utilities/Socials";
import {ChildrenTitle} from "../interfaces/Utilities/ChildrenTitle";
import Link from "next/link";
import HatChef from "../public/icons/hat-chef-thin.svg";


const Layout = ({children, title = 'Page', description = '', image = ''}: ChildrenTitle) => (
    <div>
        <Head>
            <title>{title + " | Cookbook"}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <meta name="description" content={description}/>
            <meta property="og:title" content={title + " | Cookbook"}/>
            <meta property="og:description" content={description}/>
            {image && <meta property="og:image" content={image}/>}
            <link rel="icon" href="/icons/hat-chef-thin.svg" type="image/svg+xml"/>
        </Head>

        <header
            className="h-15 relative sticky top-0 z-30 w-full bg-white px-2 py-4 shadow-sm shadow-xl dark:bg-black sm:px-4">
            <div className="z-100 flex items-center justify-between px-2 py-2 sm:px-3">
                <Link href={"/"}>
                    <div>

                        <HatChef className={"w-6 h-6 hover:scale-125 transform-gpu fill-black inline -mt-2"}/>
                        <div className="ml-2 inline">
                            Cookbook
                        </div>
                    </div>
                </Link>
                <div className="flex items-center gap-6">
                    <Socials/>
                </div>
            </div>
        </header>

        <div className="mx-4 mt-4">
            {children}
        </div>

        <footer className="relative mt-24 pt-6">
            <div className="text-center text-sm text-gray-500">
                <span className="mr-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                    Joeri Abbo
                </span>
                &copy; {new Date().getFullYear()} alle rechten voorbehouden
            </div>
        </footer>
    </div>
)

export default Layout
