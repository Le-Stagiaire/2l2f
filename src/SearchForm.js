import React, { useState } from "react";

import { products } from './dataProvider/products';
import { fullMonthLabel } from './dataProvider/products';

import './SearchForm.scss';

export default function SearchForm({ onSubmit }) {

  const [chosenIngredients, setChosenIngredients] = useState({
    vegetables: [],
    fruits: [],
    ingredients: []
  });

  const handleChosenIngredients = (event) => {
    const { name: foodName, checked } = event.target;
    const [type, food] = foodName.split('-');

    if (checked) {
      setChosenIngredients({
        ...chosenIngredients,
        [`${type}s`]: [...chosenIngredients[`${type}s`], food],
        ingredients: [...chosenIngredients.ingredients, food]
      })
      return;
    }

    const actualFoodOfType = [...chosenIngredients[`${type}s`]];
    actualFoodOfType.splice(actualFoodOfType.indexOf(food), 1)
    const actualIngredients = [...chosenIngredients.ingredients];
    actualIngredients.splice(actualIngredients.indexOf(food), 1)
    setChosenIngredients({
      ...chosenIngredients,
      [`${type}s`]: actualFoodOfType,
      ingredients: actualIngredients
    });
  }

  const currentMonth = new Date().getMonth();
  const seasonalFood = products[currentMonth];
  return (
    <div className="SearchForm">
      <header>
        <h2>Voici les produits de saison pour le mois de {fullMonthLabel[currentMonth]}</h2>
      </header>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(chosenIngredients.ingredients);
        }}
      >
        <div className="SearchForm__subpart">
          <h2>Légumes ({chosenIngredients['vegetables'].length})</h2>
          {seasonalFood.vegetables.map(vegetable =>
            <div key={vegetable}>
              <input
                id={vegetable}
                name={`vegetable-${vegetable}`}
                onChange={handleChosenIngredients}
                type="checkbox"
              />
              <label htmlFor={vegetable}>{vegetable}</label>
            </div>
          )}
        </div>
        <div className="SearchForm__subpart">
          <h2>Fruits ({chosenIngredients['fruits'].length})</h2>
          {seasonalFood.fruits.map(fruit =>
            <div key={fruit}>
              <input
                id={fruit}
                name={`fruit-${fruit}`}
                onChange={handleChosenIngredients}
                type="checkbox"
              />
              <label htmlFor={fruit}>{fruit}</label>
            </div>
          )}
        </div>
        <input type="submit" value="Rechercher avec ces ingrédients" />
      </form>
    </div>
  )
}
