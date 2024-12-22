import { useState } from 'react';
import { X, Check } from 'lucide-react';
import Recipe from './Recipe';
import { getRecipeFromMistral } from './ai';

export default function Ingredients({ ingredients, removeIngredient }) {
  const [showConfirmation, setShowConfirmation] = useState({}); // Store confirmation state per ingredient
  const [recipe, setRecipe] = useState('');
  const [loadingButton, setLoadingButton] = useState(false); // Track loading state for the button

  const getRecipe = async () => {
    setLoadingButton(true); // Set loading to true
    const recipe = await getRecipeFromMistral(ingredients.map((i) => i.name));
    console.log(recipe);
    setRecipe(recipe);
    setLoadingButton(false); // Set loading to false after fetching
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

  const removeIngredients = () => { 
    ingredients.forEach((ingredient) => {
      removeIngredient(ingredient.id);
    });
  };

  return (
    <section>
      <section className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold">Ingredients on hand:</h1>
        <button 
        className='flex items-center gap-2 bg-gray-100 py-2 px-4 rounded-md text-red-500'
        onClick={() => removeIngredients()}
        >
          <X />
          Remove all ingredients
        </button>
      </section>
      <ul className="mt-8 list-disc list-inside text-lg font-medium space-y-4">
        {ingredientsList}
      </ul>
      {/* Show the section only if there are at least three ingredients */}
      {ingredients.length >= 3 && (
        <section className="flex flex-col md:flex-row md:items-center gap-4 mt-8 p-6 bg-gray-100">
          <section className="flex flex-col gap-2 w-full">
            <h2 className="font-bold text-lg">Ready for a recipe?</h2>
            <p>Generate a recipe from your list of ingredients.</p>
          </section>
          <button
            className="bg-orange-600 text-gray-50 font-bold text-nowrap py-2 px-4 rounded-md"
            onClick={getRecipe}
            disabled={loadingButton} // Disable button while loading
          >
            {loadingButton ? 'Getting recipe...' : 'Get a recipe'}
          </button>
        </section>
      )}
      {recipe && <Recipe recipe={recipe} />}
    </section>
  );
}
