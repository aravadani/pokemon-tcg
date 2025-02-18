export function getCardImageUrl(
  card: { image?: string } | undefined,
  quality: "high" | "low" = "high",
  extension: "jpg" | "png" | "webp" = "jpg",
) {
  if (!card?.image) {
    console.error("Invalid card data:", card)
    return "/placeholder.svg"
  }

  return `${card.image}/${quality}.${extension}`
}

