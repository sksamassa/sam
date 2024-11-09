import "./globals.css";
import React from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={`bg-dark-2 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
