import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import AppSideBar from "@/components/layout/AppSideBar";
import { Toaster } from "react-hot-toast";
import { Page } from "@/models/Page";
import { FaLink } from "react-icons/fa6";
import mongoose from "mongoose";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin"]
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function AppTemplate({ children, ...rest }) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/');
  }

  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session.user.email })

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster />
        <main className="flex min-h-screen">
          <aside className="bg-white w-48 p-4 pt-4 shadow">
            <div className="sticky top-0 pt-2">
              <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto">
                <Image
                  src={session?.user?.image}
                  width={256}
                  height={256}
                  alt={'Avatar'}
                />
              </div>
              {page && (
                <Link
                  target="_blank"
                  href={'/' + page.uri}
                  className="text-center flex gap-1 items-center justify-center mt-4"
                >
                  <FaLink className="text-blue-500 text-xl" />
                  <span className="text-lg text-gray-300">/</span>
                  <span>{page.uri}</span>
                </Link>
              )}
              <div className="text-center">
                <AppSideBar />
              </div>
            </div>
          </aside>
          <div className="grow">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}


