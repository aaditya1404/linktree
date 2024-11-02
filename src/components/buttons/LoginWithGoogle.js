"use client";
import { signIn} from "next-auth/react";
import { FaGoogle } from "react-icons/fa6";

const LoginWithGoogle = () => {

    return (
        <button
            onClick={() => signIn("google")}
            className="bg-white shadow text-center w-full py-4 flex gap-3 items-center justify-center"
        >
            <FaGoogle className="h-6"/>
            <span>Sign In with Google</span>
        </button>
    );
};

export default LoginWithGoogle;
