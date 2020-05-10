import React, { useState } from "react";

import { products } from './dataProvider/products';
import { fullMonthLabel } from './dataProvider/products';

import './SearchForm.scss';

export default function SearchForm({ onSubmit }) {

  const [chosenIngredients, setChosenIngredients] = useState([]);

  const handleChosenIngredients = (event) => {
    const { name: vegetableName, checked } = event.target;
    const vegetable = vegetableName.split('-')[1];
    if (checked) {
      setChosenIngredients([...chosenIngredients, vegetable])
      return;
    }
    const actualIngredients = [...chosenIngredients];
    actualIngredients.splice(actualIngredients.indexOf(vegetable), 1)
    setChosenIngredients(actualIngredients)
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
          onSubmit(chosenIngredients);
        }}
      >
        <div className="SearchForm__subpart">
          <h2>Légumes</h2>
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
          <h2>Fruits</h2>
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
