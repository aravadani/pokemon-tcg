import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Collection
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                About
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-2">
          <Input type="text" placeholder="Search Pokemon" className="w-64" />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

