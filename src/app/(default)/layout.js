import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight:['200','300','400','500','600','700','800'],
  subsets: ["latin"]
});

export const metadata = {
  title: "Linktree",
  description: "Create your social profile, contact info and more on one page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
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
