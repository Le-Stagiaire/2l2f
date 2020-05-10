import React, { useEffect, useState } from "react";
import axios from "axios";

import Recipe from './Recipe';
import './Recipes.scss';

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
    return <div>Veuillez choisir une liste dʼingrédients puis lancer la recherche</div>
  }
  return (
    <div className="Recipes">
      <h2>Recettes avec les ingrédients « {ingredients.join(', ')} » :</h2>
      {
        isLoading
        ? 'Je cherche wesh'
        : content.length
          ? <div>{content.map(recipe => <Recipe recipe={recipe} />)}</div>
          : 'Jʼai rien trouvé chef'
      }
    </div>
  )
}
