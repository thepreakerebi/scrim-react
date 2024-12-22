import { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function Ingredients({ ingredients, removeIngredient }) {
  const [showConfirmation, setShowConfirmation] = useState({}); // Store confirmation state per ingredient

  const toggleConfirmation = (id) => {
    setShowConfirmation((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the confirmation state for the specific ingredient
    }));
  };

  const ingredientsList = ingredients.map((ingredient) => {
    return (
      <li className="flex items-center w-full justify-between" key={ingredient.id}>
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
      <ul className="mt-8 list-disc text-lg font-medium w-full flex flex-col gap-4">
        {ingredientsList}
      </ul>
      <section className='flex items-center gap-4 mt-8 p-6 bg-gray-100'>
        <section className='flex flex-col gap-2 w-full'>
            <h2 className='font-bold text-lg'>Ready for a recipe?</h2>
            <p>Generate a recipe from your list of ingredients.</p>
        </section>
        <button className='bg-orange-600 text-gray-50 font-bold text-nowrap py-2 px-4 rounded-md'>Get a recipe</button>
      </section>
    </section>
  );
}