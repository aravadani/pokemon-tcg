"use client"

import { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import PokemonCard from "@/components/pokemon-card"
import type { Card } from "pokemon-tcg-sdk-typescript/dist/sdk"
import { Pokemon } from "pokemon-tcg-sdk-typescript"

export default function PokemonCardGrid() {
  const [cards, setCards] = useState<Card[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchCards = async () => {
    try {
      const fetchedCards = await Pokemon.where({ page, pageSize: 20 })
      if (fetchedCards.length === 0) {
        setHasMore(false)
      } else {
        setCards((prevCards) => [...prevCards, ...fetchedCards])
        setPage((prevPage) => prevPage + 1)
      }
    } catch (error) {
      console.error("Error fetching Pokemon cards:", error)
      setHasMore(false)
    }
  }

  useEffect(() => {
    fetchCards()
  }, []) // Removed page from dependencies

  return (
    <InfiniteScroll
      dataLength={cards.length}
      next={fetchCards}
      hasMore={hasMore}
      loader={<h4 className="text-center mt-4">Loading...</h4>}
      endMessage={<p className="text-center mt-4">You've seen all the cards!</p>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {cards.map((card) => (
          <PokemonCard key={card.id} card={card} />
        ))}
      </div>
    </InfiniteScroll>
  )
}

