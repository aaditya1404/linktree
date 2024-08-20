import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linktree",
  description: "Create your social profile, contact info and more on one page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Header />
          <div className="max-w-4xl mx-auto p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
