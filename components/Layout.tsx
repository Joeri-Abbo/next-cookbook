import React, {ReactNode} from 'react'
import Head from 'next/head'
import Socials from "./Socials";
import {ChildrenTitle} from "../interfaces/ChildrenTitle";


const Layout = ({children, title = 'Cookbook'}: ChildrenTitle) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <header
            className="h-15 relative sticky top-0 z-30 w-full bg-white px-2 py-4 shadow-sm shadow-xl dark:bg-black sm:px-4">
            <div className="z-100 flex items-center justify-between px-2 py-2 sm:px-3">
                <div>
                    Cookbook
                </div>
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
