import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function SetCompletion({ set, collection }) {
  const setCards = collection[set.id] || []
  const completionPercentage = (setCards.length / set.cardCount.total) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>{set.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={completionPercentage} className="w-full" />
        <p className="mt-2">
          {setCards.length} / {set.cardCount.total} cards collected
        </p>
      </CardContent>
    </Card>
  )
}

