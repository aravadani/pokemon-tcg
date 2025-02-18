"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getCardImageUrl } from "@/utils/imageUrl"

export default function MyCollection() {
  const [collection, setCollection] = useState({})
  const [sets, setSets] = useState([])
  const [selectedSet, setSelectedSet] = useState(null)
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Load collection from local storage
    const savedCollection = localStorage.getItem("pokemonCollection")
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection))
    }

    // Fetch sets from TCGDex API
    fetch("https://api.tcgdex.net/v2/en/sets")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSets(data)
        } else {
          setError("Failed to load sets data")
          setSets([])
        }
      })
      .catch((err) => {
        setError("Failed to load sets. Please try again.")
        setSets([])
      })
  }, [])

  const fetchCards = async (setId) => {
    if (!setId) return

    setLoading(true)
    setError(null)
    setCards([])

    try {
      const response = await fetch(`https://api.tcgdex.net/v2/en/sets/${setId}`)
      const data = await response.json()

      if (data && Array.isArray(data.cards)) {
        // Filter cards that are in your collection
        const collectedCardIds = collection[setId] || []
        const collectedCards = data.cards.filter((card) => collectedCardIds.includes(card.id))
        setCards(collectedCards)
      } else {
        setError("Invalid data received from the API")
        setCards([])
      }

      setSelectedSet(setId)
    } catch (err) {
      setError("Failed to load cards. Please try again.")
      setCards([])
    } finally {
      setLoading(false)
    }
  }

  const removeFromCollection = (card) => {
    if (!selectedSet || !card.id) return

    const updatedCollection = { ...collection }
    if (updatedCollection[selectedSet]) {
      updatedCollection[selectedSet] = updatedCollection[selectedSet].filter((id) => id !== card.id)
      setCollection(updatedCollection)
      localStorage.setItem("pokemonCollection", JSON.stringify(updatedCollection))

      // Update the displayed cards
      setCards(cards.filter((c) => c.id !== card.id))
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Collection</h1>
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

      {loading && (
        <div className="text-center py-4">
          <p>Loading cards...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 py-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && cards.length === 0 && selectedSet && (
        <div className="text-center py-4">
          <p>No cards collected from this set yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.id}>
            <CardHeader>
              <CardTitle>{card.name || "Unknown Card"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full pt-[139.38%]">
                <Image
                  src={getCardImageUrl(card, "high", "jpg") || "/placeholder.svg"}
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
              <Button className="mt-2 w-full bg-red-500 hover:bg-red-600" onClick={() => removeFromCollection(card)}>
                Remove from Collection
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

