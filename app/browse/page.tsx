"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getCardImageUrl } from "@/utils/imageUrl"

export default function BrowseCards() {
  const [sets, setSets] = useState([])
  const [selectedSet, setSelectedSet] = useState(null)
  const [cards, setCards] = useState([])
  const [collection, setCollection] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch sets from TCGDex API
    fetch("https://api.tcgdex.net/v2/en/sets")
      .then((res) => res.json())
      .then((data) => setSets(data))
      .catch((err) => setError("Failed to load sets. Please try again."))

    // Load collection from local storage
    const savedCollection = localStorage.getItem("pokemonCollection")
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection))
    }
  }, [])

  const fetchCards = (setId) => {
    setLoading(true)
    setError(null)
    fetch(`https://api.tcgdex.net/v2/en/sets/${setId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.cards)) {
          console.log("Fetched cards:", data.cards)
          setCards(data.cards)
        } else {
          console.error("Invalid data structure:", data)
          setCards([])
          setError("No cards found for this set.")
        }
        setSelectedSet(setId)
      })
      .catch((err) => {
        console.error("Error fetching cards:", err)
        setError("Failed to load cards. Please try again.")
        setCards([])
      })
      .finally(() => setLoading(false))
  }

  const addToCollection = (card) => {
    const updatedCollection = { ...collection }
    if (!updatedCollection[selectedSet]) {
      updatedCollection[selectedSet] = []
    }
    if (!updatedCollection[selectedSet].includes(card.id)) {
      updatedCollection[selectedSet].push(card.id)
      setCollection(updatedCollection)
      localStorage.setItem("pokemonCollection", JSON.stringify(updatedCollection))
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Browse Cards</h1>
      <div className="mb-4">
        <select className="border p-2 rounded" onChange={(e) => fetchCards(e.target.value)}>
          <option value="">Select a set</option>
          {sets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Loading cards...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.id}>
            <CardHeader>
              <CardTitle>{card.name || "Unknown Card"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full pt-[139.38%]">
                <Image
                  src={getCardImageUrl(card, "low", "jpg") || "/placeholder.svg"}
                  alt={card.name || "Pokemon Card"}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                  onError={(e) => {
                    console.error("Image failed to load:", e.currentTarget.src)
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                  unoptimized // Add this to bypass Next.js Image optimization for external URLs
                />
              </div>
              <Button
                className="mt-2 w-full"
                onClick={() => addToCollection(card)}
                disabled={collection[selectedSet]?.includes(card.id)}
              >
                {collection[selectedSet]?.includes(card.id) ? "In Collection" : "Add to Collection"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

