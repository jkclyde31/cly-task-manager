import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cly Task Manager",
  description: "Task Manager",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <AuthProvider>
          <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
