"use client";
import Link from "next/link";
import LogoutButton from "../buttons/LogoutButton";
import { usePathname } from "next/navigation";

export default function AppSideBar() {

    const path = usePathname();
    console.log(path);

    return (
        <nav className="flex flex-col text-center mt-12 gap-4">
            <Link href={"/account"} className={"text-s " + (path === '/account' ? 'text-blue-500 font-bold' : '')}>
                My Page
            </Link>
            {/* <Link href={"/analytics"} className={"text-s " + (path === '/analytics' ? 'text-blue-500 font-bold' : '')}>
                Analytics
            </Link> */}
            <LogoutButton />
            <Link href={"/"} className="border-t pt-4 text-xs">
                Back to website
            </Link>
        </nav>
    );
}
