import React, { useState } from "react";
import { cn } from '@bem-react/classname';

import SearchForm from './SearchForm';
import Recipes from './Recipes';

import './Home.scss';

const b = cn('Home')

export default function Home() {
  const [searchIngredients, setSearchIngredients] = useState([]);

  function handleSubmit(chosenIngredients) {
    setSearchIngredients([...chosenIngredients]);
  }

  return (
    <div className={b()}>
      <SearchForm onSubmit={handleSubmit} />
      <Recipes ingredients={searchIngredients} />
    </div>
  )
}
