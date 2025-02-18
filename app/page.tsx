"use client"

import { useState, useEffect } from "react"
import SetCompletion from "@/components/set-completion"
import Link from "next/link"

export default function Dashboard() {
  const [sets, setSets] = useState([])
  const [collection, setCollection] = useState({})

  useEffect(() => {
    // Fetch sets from TCGDex API
    fetch("https://api.tcgdex.net/v2/en/sets")
      .then((res) => res.json())
      .then((data) => setSets(data))

    // Load collection from local storage
    const savedCollection = localStorage.getItem("pokemonCollection")
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection))
    }
  }, [])

  const collectedSets = sets.filter((set) => collection[set.id] && collection[set.id].length > 0)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Collection Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collectedSets.map((set) => (
          <Link href={`/set/${set.id}`} key={set.id}>
            <SetCompletion set={set} collection={collection} />
          </Link>
        ))}
      </div>
    </div>
  )
}

