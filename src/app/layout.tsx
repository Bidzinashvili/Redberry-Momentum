'use client'

import "./globals.css";

import Header from "@/components/Header";
import { clearFiltersOnRouteChange } from "@/utils/clearFiltersOnRouteChange";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()

  useEffect(() => {
    clearFiltersOnRouteChange(pathname)
  }, [pathname])

  return (
    <html lang="en">
      <head>
        <link href="https://free.bboxtype.com/embedfonts/?family=FiraGO:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
