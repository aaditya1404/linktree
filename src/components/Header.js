import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { SessionContext } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";

const Header = async () => {

    const session = await getServerSession(authOptions);

    return (
        <header
            className="bg-white border-b py-4">
            <div
                className="max-w-4xl flex justify-between mx-auto px-6 items-center">
                <div
                    className="flex gap-6 ">
                    <Link
                        href={'/'}
                        className="text-blue-600 font-bold text-xl"
                    >
                        LinkList
                    </Link>
                    <nav
                        className="flex gap-4 text-gray-500 text-sm items-center"
                    >
                        <Link href={'/about'}>About</Link>
                        <Link href={'/pricing'}>Pricing</Link>
                        <Link href={'/contact'}>Contact</Link>
                    </nav>
                </div>
                <nav className="flex gap-4 text-sm text-slate-500 items-center">
                    {!!session && (
                        <>
                            <Link href={'/account'}>Hello, {session?.user?.name}</Link>
                            <LogoutButton />
                        </>
                    )}
                    {!session && (
                        <>
                            <Link href={'/login'}>Sign In</Link>
                            <Link href={'/login'}>Create Account</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
