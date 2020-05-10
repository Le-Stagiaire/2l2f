const HTMLParser = require('node-html-parser');

module.exports = class MarmitonParser {
  getContent(parent, query, attr) {
    let child = parent.querySelector(query);
    if (attr) {
      return child.getAttribute(attr);
    }
    return child.innerHTML;
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
        .replace(/\t/g, '').replace('\n', '').replace('<b>Ingrédients</b> : ', '').split('<br />')[0]
        .split(',').join(', ');
      recipe.description = this
        .getContent(recipeHtml, '.recipe-card__description')
        .replace(/\t/g, '').replace('\n', '').split('<br />')[1];
      recipe.detail = this.getContent(recipeHtml, '.recipe-card-link', 'href');
      recipe.duration =
        this.getContent(recipeHtml, '.recipe-card__duration__value');
      recipe.picture =
        this.getContent(recipeHtml, '.recipe-card__picture img', 'src');
      return recipe
    })
  }
}
