import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./realworld.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | next.js realworld example app",
  description: "real world example app with next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
