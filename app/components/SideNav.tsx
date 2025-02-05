import Link from "next/link"
import { Home, DollarSign, FileText, Settings, Bot } from "lucide-react"

const SideNav = () => {
  return (
    <nav className="bg-black text-white w-64 min-h-screen p-4">
      <ul className="space-y-2">
        <li>
          <Link href="/" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 transition-colors">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/loans" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 transition-colors">
            <DollarSign size={20} />
            <span>Loans</span>
          </Link>
        </li>
        <li>
          <Link
            href="/documents"
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 transition-colors"
          >
            <FileText size={20} />
            <span>Documents</span>
          </Link>
        </li>
        <li>
          <Link
            href="/ai-agent"
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 transition-colors"
          >
            <Bot size={20} />
            <span>AI Agent</span>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 transition-colors"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default SideNav

