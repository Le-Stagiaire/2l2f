const axios = require('axios');
const HTMLParser = require('node-html-parser');

function httpsHandler(body) {
  var parser = new HTMLParser.parse(body);
  return parser
  .querySelectorAll('.recipe-card').slice(-4)
  .map(recipeHtml => {
    let recipe = {};
    recipe.title = recipeHtml.querySelector('.recipe-card__title').innerHTML;
    recipe.description =
    recipeHtml.querySelector('.recipe-card__description').innerHTML
    .replace(/\t/g, '').replace('\n', '');
    recipe.detail = recipeHtml.querySelector('.recipe-card-link').getAttribute('href');
    recipe.duration = recipeHtml.querySelector('.recipe-card__duration__value').innerHTML;
    recipe.picture = recipeHtml.querySelector('.recipe-card__picture img').getAttribute('src');
    return recipe
  })
}

const init = async () => {
  const url =
    "https://www.marmiton.org/recettes/recherche.aspx" +
    "?type=all&aqt=patate-chou-tomate";
  const recipes = await axios.get(url).then(response => httpsHandler(response.data));
  console.log(recipes);
}

init()
