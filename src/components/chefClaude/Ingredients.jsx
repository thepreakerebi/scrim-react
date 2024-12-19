export default function Ingredients({ ingredients }) {

    const ingredientsList = ingredients.map((ingredient) => {
        return (
            <li key={ingredient.id}>{ingredient.name}</li>
        )
    })

  return (
    <section>
        <h1 className="text-2xl font-bold">Ingredients on hand:</h1>
        <ul className="mt-8 list-disc text-lg font-medium">
            {ingredientsList}
        </ul>
    </section>
  )
}