import FixedLayout from "@/components/common/FixedLayout";
import ReactQueryProvider from "./ReactQueryProvider";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

const noto = Noto_Sans_KR({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Admin",
  description: "money-bridge",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <ReactQueryProvider>
          <FixedLayout>
            <section className="mt-[50px] p-10">{children}</section>
          </FixedLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
