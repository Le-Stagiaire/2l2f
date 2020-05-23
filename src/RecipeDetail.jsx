import React, { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import axios from "axios";

import Box from './Box';
import Loading from './Loading';
import DefaultLogo from './static/default.png';

import './RecipeDetail.scss';

const b = cn('RecipeDetail');

export default function RecipeDetail({match: { params: detail }}) {
  console.log(detail);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeDetail, setRecipeDetail] = useState({})

  useEffect(() => {
    setIsLoading(true);
    async function fetch() {
      const response = await axios.get(
        "http://localhost:5000/api/detail",
        {
          params: detail
        }
      );
      console.log(response);
      setRecipeDetail(response.data);
      setIsLoading(false);
    };
    fetch().catch(e => setError(e));
  }, [detail]);

  if (error) {
    console.log(error);
    return
  }
  if (!isLoading && !Object.keys(recipeDetail).length) {
    return <div className={b()}>Cette recette nʼexiste pas</div>
  }

  if (isLoading) {
    return (
      <Box className={b()}>
        <Loading />
      </Box>
    )
  }
  return (
    <Box className={b()}>
      <header className={b('header')}>
        <h2 className={b('title')}>{recipeDetail.title}</h2>
        <ul className={b('tags')}>
          {recipeDetail.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <img
          src={ recipeDetail.picture.match('default') ? DefaultLogo : recipeDetail.picture }
          alt={recipeDetail.title}
        />
      </header>
      <div className={b('content')}>
        <div className={b('ingredients')}>
          <h3>Ingrédients</h3>
          <ul>
            {recipeDetail.ingredients.map((ingredient, index) =>
              <li key={`ingredient-${index}`}>
                {ingredient.quantity ? <span>{ingredient.quantity}</span> : null}
                {ingredient.ingredient}
              </li>
            )}
          </ul>
        </div>
        <div className={b('preparation')}>
          <h3>Préparation</h3>
          <ol>
            {recipeDetail.preparationSteps.map((step, index) =>
              <li key={`step-${index}`}>{step}</li>
            )}
          </ol>
        </div>
      </div>
    </Box>
  )
}
