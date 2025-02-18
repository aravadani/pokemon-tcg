import PokemonCard from "@/components/pokemon-card"

const pokemonData = [
  { id: 1, name: "Bulbasaur", type: "Grass" },
  { id: 4, name: "Charmander", type: "Fire" },
  { id: 7, name: "Squirtle", type: "Water" },
  { id: 25, name: "Pikachu", type: "Electric" },
  { id: 39, name: "Jigglypuff", type: "Fairy" },
  { id: 52, name: "Meowth", type: "Normal" },
  { id: 54, name: "Psyduck", type: "Water" },
  { id: 63, name: "Abra", type: "Psychic" },
  { id: 94, name: "Gengar", type: "Ghost" },
  { id: 133, name: "Eevee", type: "Normal" },
  { id: 143, name: "Snorlax", type: "Normal" },
  { id: 150, name: "Mewtwo", type: "Psychic" },
]

export default function PokemonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  )
}

