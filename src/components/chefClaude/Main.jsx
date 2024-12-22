import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import Ingredients from './Ingredients';

export default function Form() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientExists, setIngredientExists] = useState(false);

  function addIngredient(formData) {
    // const { ingredient } = Object.fromEntries(formData);
    const ingredient = formData.get('ingredient');

    // Check if the ingredient already exists
    const exists = ingredients.some(
      (item) => item.name === ingredient[0].toUpperCase() + ingredient.slice(1).toLowerCase()
    );

    if (exists) {
      setIngredientExists(true); // Show error message

      // Set a timeout to hide the error message after 20 seconds
      setTimeout(() => {
        setIngredientExists(false);
      }, 10000);

      return;
    }

    // Create a new ingredient object with a unique ID
    const newIngredient = {
      id: uuidv4(), // Generate a unique ID
      name: ingredient[0].toUpperCase() + ingredient.slice(1).toLowerCase(),
    };

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    setIngredientExists(false); // Reset error message after successful addition
  }

  function removeIngredient(id) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  }

  return (
    <section className="flex justify-center items-start w-full min-h-full bg-gray-50 py-28 px-4 md:px-32 lg:px-52 xl:px-96">
      <section className="flex flex-col gap-8 w-full">
        <section className='w-full'>
          <form
            action={addIngredient}
            className="flex flex-col gap-4 md:flex-row items-center w-full"
          >
            <input
              type="text"
              className="py-2 px-4 bg-white text-align-left rounded-md border-2 
              border-gray-200 focus:outline-gray-800 w-full"
              aria-label="Add an ingredient"
              placeholder="e.g oregano"
              name="ingredient"
            />
            <button
              type="submit"
              className="bg-gray-800 font-bold text-gray-100 py-2 text-nowrap px-4 rounded-md w-full md:w-auto"
            >
              + Add ingredient
            </button>
          </form>
          {ingredientExists && (
            <p className="text-red-500 text-sm mt-2">
              Ingredient is already on the list. Please add a different ingredient.
            </p>
          )}
        </section>
        {ingredients.length > 0 && (
          <Ingredients
            removeIngredient={removeIngredient}
            ingredients={ingredients}
          />
        )}
      </section>
    </section>
  );
}