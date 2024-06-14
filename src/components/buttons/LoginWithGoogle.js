"use client";
import { signIn, useSession } from "next-auth/react";

const LoginWithGoogle = () => {
    return (
        <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white text-center w-full py-4"
        >
            Sign In with Google
        </button>
    );
};

export default LoginWithGoogle;
