import "./globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sam",
  description: "Video calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/icons/sam-logo.svg",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1c1f2e",
          colorInputBackground: "#252a41",
          colorInputText: "#fff",
        },
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={`bg-dark-2 text-white`}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
