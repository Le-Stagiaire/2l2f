import React, { useState } from "react";

import SearchForm from './SearchForm';
import Recipes from './Recipes';
import SiteHeader from './SiteHeader';

import './Home.scss';

export default function Home() {
  const [searchIngredients, setSearchIngredients] = useState([]);

  function handleSubmit(chosenIngredients) {
    setSearchIngredients([...chosenIngredients]);
  }

  return (
    <div className="Home">
      <SiteHeader />
      <main className="Home__main">
        <SearchForm onSubmit={handleSubmit} />
        <Recipes ingredients={searchIngredients} />
      </main>
    </div>
  )
}
