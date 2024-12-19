import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import Ingredients from './Ingredients';

export default function Form() {
  const [ingredients, setIngredients] = useState([]);
  const inputRef = useRef(); // Reference to the input field

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const ingredient = formData.get('ingredient');

    // Create a new ingredient object with a unique ID
    const newIngredient = {
      id: uuidv4(), // Generate a unique ID
      name: ingredient[0].toUpperCase() + ingredient.slice(1).toLowerCase(),
    };

    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);

    // Reset the input field using the ref
    inputRef.current.value = '';
  }

  return (
    <section className="flex justify-center items-start w-full bg-gray-50 h-screen py-28 px-4">
      <section className="flex flex-col gap-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row items-center">
          <input
            type="text"
            className="py-2 px-4 bg-white text-align-left rounded-md border-2
            border-gray-200 focus:outline-gray-800 w-full md:w-1/2"
            aria-label="Add an ingredient"
            placeholder="e.g oregano"
            name="ingredient"
            ref={inputRef} // Attach the ref to the input field
          />
          <button
            type="submit"
            className="bg-gray-800 font-bold text-gray-100 py-2 px-4 rounded-md w-full md:w-auto"
          >
            + Add ingredient
          </button>
        </form>
        <Ingredients ingredients={ingredients} />
      </section>
    </section>
  );
}