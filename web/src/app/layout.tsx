import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "WorkTracker Dashboard",
  description: "An app for tracking the work sessions, both at job and at faculty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
