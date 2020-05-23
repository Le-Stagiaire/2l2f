import React from "react";
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';

import DefaultLogo from './static/default.png';

import './Recipe.scss'

const b = cn('Recipe')

export default function Recipe({ recipe }) {
  return (
    <article className={b()}>
      <Link to={`detail/${recipe.detail}`} className={b('detail')}>
        <div className={b('content')}>
          <header>
            <h3>{ recipe.title }</h3>
            <span><strong>Durée :</strong> { recipe.duration }</span>
          </header>
          <p><b>Ingrédients :</b> { recipe.ingredients }</p>
          <p><strong>Description :</strong> { recipe.description }</p>
        </div>
        <div className={b('picture')}>
          <img
            alt={ recipe.title }
            src={ recipe.picture.match('default') ? DefaultLogo : recipe.picture }
          />
        </div>
      </Link>
    </article>
  )
}
