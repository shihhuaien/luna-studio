import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Luna Studio",
  description: "eyelasher from Taiwan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
        <title>{metadata.title}</title>
      </head>
      <body className={outfit.className}>
        <div className="md:px-20">
          <Header />
          {children}
          <Toaster />
        </div>
        <Footer />
      </body>
    </html>
  );
}
