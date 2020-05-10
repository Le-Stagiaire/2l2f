import React from "react";

export default function Recipe({ recipe }) {
  return (
    <article className="Recipe">
      <header>
        <h3>{ recipe.title }</h3> - <span>{ recipe.duration }</span>
      </header>
      <p><b>Ingrédients</b> : { recipe.ingredients }</p>
      <p>{ recipe.description }</p>
      <img src={ recipe.picture } alt={ recipe.title } />
    </article>
  )
}
