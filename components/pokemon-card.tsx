"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { Card as PokemonCard } from "pokemon-tcg-sdk-typescript/dist/sdk"
import { getCardImageUrl } from "@/utils/imageUrl"

interface PokemonCardProps {
  card: PokemonCard
  collected?: boolean
}

export default function PokemonCard({ card, collected = true }: PokemonCardProps) {
  const [imgSrc, setImgSrc] = useState(getCardImageUrl(card, "high", "jpg"))

  const handleImageError = () => {
    console.error("Image failed to load:", imgSrc)
    setImgSrc("/placeholder.svg")
  }

  return (
    <Card
      className={`overflow-hidden transition-transform hover:scale-105 cursor-pointer ${collected ? "" : "opacity-50"}`}
    >
      <CardContent className="p-4">
        <div className="relative w-full pt-[139.38%]">
          <Image
            src={imgSrc || "/placeholder.svg"}
            alt={card.name || "Pokemon Card"}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            onError={handleImageError}
            unoptimized // Add this to bypass Next.js Image optimization for external URLs
          />
        </div>
        <h2 className="text-lg font-semibold mt-2">{card.name || "Unknown Card"}</h2>
        <p className="text-sm text-gray-600">Set: {card.set?.name || "Unknown Set"}</p>
        <p className="text-sm text-gray-600">Rarity: {card.rarity || "Unknown"}</p>
      </CardContent>
    </Card>
  )
}

