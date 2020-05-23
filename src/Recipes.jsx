import React, { useEffect, useState } from "react";
import { cn } from '@bem-react/classname';
import axios from "axios";

import Recipe from './Recipe';
import Loading from './Loading';
import Box from './Box';

import './Recipes.scss';

const b = cn('Recipes');

export default function Recipes({ ingredients }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetch() {
      if (ingredients.length) {
        const response = await axios.post("http://localhost:5000/api/test", { ingredients });
        setContent(response.data);
      }
      setIsLoading(false);
    };
    fetch().catch(e => setError(e));
  }, [ingredients]);

  if (error) {
    console.log(error)
    return
  }

  if (!ingredients.length) {
    return (
      <Box className={b()}>
        <p className={b('empty-search')}>
          Veuillez choisir une liste dʼingrédients puis lancer la recherche.
        </p>
      </Box>
    )
  }
  return (
    <Box className={b()}>
      <h2 className={b('title')}>
        Recettes avec les ingrédients « {ingredients.join(', ')} »
      </h2>
      {
        isLoading
        ? <Loading />
        : content.length
          ? (<div className={b('results')}>
              {content.map(recipe => <Recipe key={recipe.detail} recipe={recipe} />)}
            </div>)
          : 'Jʼai rien trouvé chef'
      }
    </Box>
  )
}
