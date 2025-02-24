// import { Noto_Sans_TC } from "@next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";
import "../styles/animations.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/hooks/use-cart";
import Footer from "../app/components/layout/footer"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// const fontNoto = Noto_Sans_TC({
//   variable: "--font-Noto-Sans-TC",
//   subsets: ["latin"],
//   weight: "100 200 300 400 500 600 700 800 900",
// });

export const metadata = {
  title: "Lazy Dog",
  description:
    "website for Lazy Dog, an online store offer high quality dog stuff and services",
  icons: {
    icon: "/lazydog.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
