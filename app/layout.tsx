import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leostream",
  description: "Verificacion de codigos",
};
export const dynamic = 'force-dynamic';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased   w-[100vw] h-[100vh]`}
      ><section className="bg-gradient-to-t from-0% from-gray-950 via-40% via-transparent to-90% to-gray-950 overflow-hidden  absolute w-full h-full z-0"></section>
      <section className="absolute w-full h-full  z-10 flex  flex-col items-center ">
      <GoogleOAuthProvider clientId="237109682849-2n8jbde9uj9opb0pklhn4nk8pgdhgfva.apps.googleusercontent.com">
    
      <Navbar/>
        {children}
       <Toaster 
       position="top-right"
      reverseOrder={false} />
      </GoogleOAuthProvider>
      </section>
      </body>
    </html>
  );
}
