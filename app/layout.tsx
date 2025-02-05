// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import TopNav from "./components/TopNav"
import SideNav from "./components/SideNav"
import Providers from "./Providers" // Import the Providers component

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vehicle Financing App",
  description: "Manage your car financing loans with ease",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Providers> {/* Wrap the entire app with Providers */}
          <TopNav />
          <div className="flex">
            <SideNav />
            <main className="flex-1 p-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}