import { useState } from 'react';
import { X, Check } from 'lucide-react';
import Recipe from './Recipe';
import { getRecipeFromMistral } from './ai';

export default function Ingredients({ ingredients, removeIngredient }) {
  const [showConfirmation, setShowConfirmation] = useState({}); // Store confirmation state per ingredient
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleShowRecipe = async () => {
    setIsLoading(true); // Set loading to true
    const recipe = await getRecipeFromMistral(ingredients.map((i) => i.name));
    console.log(recipe);
    setRecipe(recipe);
    setIsLoading(false); // Set loading to false after fetching
  };

  const toggleConfirmation = (id) => {
    setShowConfirmation((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the confirmation state for the specific ingredient
    }));
  };

  const ingredientsList = ingredients.map((ingredient) => {
    return (
      <li
        className="flex items-center justify-between"
        key={ingredient.id}
      >
        {ingredient.name}
        {showConfirmation[ingredient.id] ? (
          <div className="flex gap-2 items-center">
            <Check
              onClick={() => {
                removeIngredient(ingredient.id);
                toggleConfirmation(ingredient.id); // Reset the confirmation state after removing
              }}
              className="cursor-pointer"
            />
            <X
              onClick={() => toggleConfirmation(ingredient.id)}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <X
            onClick={() => toggleConfirmation(ingredient.id)}
            className="cursor-pointer"
          />
        )}
      </li>
    );
  });

  return (
    <section>
      <h1 className="text-2xl font-bold">Ingredients on hand:</h1>
      {/* Add proper list-disc with padding and margin adjustments */}
      <ul className="mt-8 list-disc list-inside text-lg font-medium space-y-4">
        {ingredientsList}
      </ul>
      <section className="flex flex-col md:flex-row md:items-center gap-4 mt-8 p-6 bg-gray-100">
        <section className="flex flex-col gap-2 w-full">
          <h2 className="font-bold text-lg">Ready for a recipe?</h2>
          <p>Generate a recipe from your list of ingredients.</p>
        </section>
        <button
          className="bg-orange-600 text-gray-50 font-bold text-nowrap py-2 px-4 rounded-md"
          onClick={handleShowRecipe}
        >
          {isLoading ? 'Getting recipe...' : 'Get a recipe'} {/* Update button text based on loading */}
        </button>
      </section>
      {
        isLoading ? (
          <p className="mt-4 text-orange-600 font-medium">Getting recipe...</p> // Show loading message
        ) : (
          recipe.length > 0 && <Recipe recipe={recipe} /> // Show recipe if available
        )
      }
    </section>
  );
}
