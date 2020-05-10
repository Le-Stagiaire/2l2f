import React from "react";

import './Recipe.scss'

export default function Recipe({ recipe }) {
  return (
    <article className="Recipe">
      <div className="Recipe__content">
        <header>
          <h3>{ recipe.title }</h3> - <span>{ recipe.duration }</span>
        </header>
        <p><b>Ingrédients</b> : { recipe.ingredients }</p>
        <p>{ recipe.description }</p>
      </div>
      <div class="Recipe__content">
        <img src={ recipe.picture } alt={ recipe.title } />
      </div>
    </article>
  )
}
