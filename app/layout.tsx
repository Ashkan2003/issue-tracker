// npm i react-icons
// npm i classnames //A simple JavaScript utility for conditionally joining classNames together.
// npm i prisma@5.3.1 // npx prisma init for the first amount
// npm i zod@3.22.2 for the data-validation
// npm i @radix-ui/themes // for the beutifull built in components
// npm install --save react-simplemde-editor easymde // this is for the editor
// npm i react-hook-form@7.46.1
// npm i axios // to handle http-request
// npm i @hookform/resolvers@3.3.1 // this package allows hookform to integrait with so many data-validation-library like "zod"
// npm i react-loading-skeleton@3.3.1// this pachage make a beutifull skeleton in the loading-state // this is a common use in real-world applications
//  npm i delay // this package use is only in development-mode// we use this packege to see a delay in project
// npm i react-markdown@8.0.7 //React component to render markdown.
// npm install -D @tailwindcss/typography // Beautiful typographic defaults for HTML you don't control.The official Tailwind CSS Typography plugin provides a set of prose classes you can use to add beautiful typographic defaults to any vanilla HTML you don’t control, like HTML rendered from Markdown, or pulled from a CMS.
// npm i @radix-ui/react-icons
// npm install next-auth
//  npm i @next-auth/prisma-adapter@1.0.7
import "@radix-ui/themes/styles.css";

import "./theme-config.css";
import "./globals.css";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Theme accentColor="violet">
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
