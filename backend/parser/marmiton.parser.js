const HTMLParser = require('node-html-parser');

module.exports = class MarmitonParser {
  getContent(parent, query, attr) {
    try {
      const child = parent.querySelector(query);
      if (attr) {
        return child.getAttribute(attr);
      }
      return child ? child.innerHTML : '';
    } catch (e) {
      console.log(`canʼt find ${query}`, e)
    }
  }

  parseSearch(body) {
    const parsedBody = HTMLParser.parse(body);
    return parsedBody
    .querySelectorAll('.recipe-card').slice(0, 10)
    .map(recipeHtml => {
      let recipe = {};
      recipe.title = this.getContent(recipeHtml, '.recipe-card__title');
      recipe.ingredients = this
        .getContent(recipeHtml, '.recipe-card__description')
        .trim().replace('<b>Ingrédients</b> : ', '').split('<br />')[0]
        .split(',').join(', ');
      recipe.description = this
        .getContent(recipeHtml, '.recipe-card__description')
        .trim().split('<br />')[1];
      recipe.detail =
        this.getContent(recipeHtml, '.recipe-card-link', 'href')
        .replace('/recettes/recette_', '').replace('.aspx', '');
      recipe.duration =
        this.getContent(recipeHtml, '.recipe-card__duration__value');
      recipe.picture =
        this.getContent(recipeHtml, '.recipe-card__picture img', 'data-src');
      return recipe
    })
  }

  parseDetail(body) {
    const parsedBody = HTMLParser.parse(body);
    const recipe = {};
    recipe.title = parsedBody.querySelector('.main-title').innerHTML;
    const picture = this.getContent(parsedBody, '.diapo picture img', 'data-src');
    if (picture) {
      recipe.picture = picture;
    } else {
      recipe.picture = 'default-image'
    }
    const infos = parsedBody.querySelector('.recipe-infos__container');
    const ingredients = parsedBody.querySelectorAll('.recipe-ingredients__list__item');
    const preparationSteps = parsedBody.querySelectorAll('.recipe-preparation__list__item');
    const timmings = parsedBody.querySelector('.recipe-infos__timmings');
    const tags = parsedBody.querySelectorAll('.content-recipe .mrtn-tag');
    recipe.infos = {
      timings: {
        total: this.getContent(infos, '.recipe-infos__total-time__value'),
        preparation:
          this.getContent(timmings, '.recipe-infos__timmings__preparation')
          .split('</strong>')[1].trim(),
        cooking:
          this.getContent(timmings, '.recipe-infos__timmings__value')
          .trim(),
      },
      person: this.getContent(infos, '.recipe-infos__quantity__value'),
      difficulty: this.getContent(infos, '.recipe-infos__level .recipe-infos__item-title'),
      budget: this.getContent(infos, '.recipe-infos__budget .recipe-infos__item-title')
    }
    recipe.ingredients = [];
    ingredients.forEach(ingredient => {
      recipe.ingredients.push({
        quantity: this.getContent(ingredient, '.recipe-ingredient-qt', 'data-base-qt'),
        ingredient: this.getContent(ingredient, '.ingredient')
      });
    });
    recipe.preparationSteps = [];
    preparationSteps.forEach(step =>
      recipe.preparationSteps.push(step.innerHTML.trim())
    );
    recipe.tags = [];
    tags.forEach(tag => {
      if (tag.querySelector('a')) {
        recipe.tags.push(tag.querySelector('a').innerHTML);
      } else {
        recipe.tags.push(tag.innerHTML);
      }
    });
    console.log(recipe);
    return recipe;
  }
}
