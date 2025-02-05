"use client"

import Link from "next/link"
import { UserCircle } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const TopNav = () => {
  const { data: session } = useSession()

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Vehicle Finance Services
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/loans" className="hover:text-gray-300 transition-colors">
            Loans
          </Link>
          <Link href="/profile" className="hover:text-gray-300 transition-colors">
            Profile
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:text-gray-300 transition-colors" aria-label="User menu">
                <UserCircle size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {session ? (
                <>
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => signOut()}>Logout</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link href="/login" className="w-full">
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/register" className="w-full">
                      Register
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default TopNav

