// "use client";
import Link from "next/link";
import LogoutButton from "../buttons/LogoutButton";

export default function AppSideBar() {

    return (
        <nav className="flex flex-col text-center mt-12 gap-4">
            <Link href={"/account"} className={'text-blue-500 font-bold'}>
                My Page
            </Link>
            <LogoutButton />
            <Link href={"/"} className="border-t pt-4 text-xs">
                Back to website
            </Link>
        </nav>
    );
}
