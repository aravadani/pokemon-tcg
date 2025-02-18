import Link from "next/link"
import "../app/fonts.css"

export default function Navbar() {
  return (
    <nav className="bg-red-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold" style={{ fontFamily: "'Pokemon Solid', sans-serif" }}>
          Pokemon Collection
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
            <Link href="/browse">Browse Cards</Link>
          </li>
          <li>
            <Link href="/collection">My Collection</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

