"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import PokemonCard from "@/components/pokemon-card"

export default function SetPage() {
  const params = useParams()
  const [set, setSet] = useState(null)
  const [collection, setCollection] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSet = async () => {
      try {
        const response = await fetch(`https://api.tcgdex.net/v2/en/sets/${params.id}`)
        const data = await response.json()
        setSet(data)
      } catch (err) {
        setError("Failed to load set data")
      }

      const savedCollection = localStorage.getItem("pokemonCollection")
      if (savedCollection) {
        setCollection(JSON.parse(savedCollection))
      }

      setLoading(false)
    }

    fetchSet()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!set) return <div>Set not found</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{set.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {set.cards.map((card) => (
          <PokemonCard key={card.id} card={card} collected={collection[set.id]?.includes(card.id)} />
        ))}
      </div>
    </div>
  )
}

