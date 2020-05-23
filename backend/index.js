const Koa = require('koa');
const Router = require("koa-router");
const koaBody = require('koa-body');
const serve = require("koa-static");
const mount = require("koa-mount");
const axios = require('axios');
const cors = require('koa-cors');

const app = module.exports = new Koa();

// Can be useful to debug
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const PORT = 5000;

const router = new Router();

const MarmitonParser = require('./parser/marmiton.parser.js');

//These are the new change
const static_pages = new Koa();
static_pages.use(serve(__dirname + "/build")); //serve the build directory
app.use(mount("/", static_pages));

app.use(cors());

router.post("/api/test", koaBody(), async ctx => {
  const parser = new MarmitonParser();
  const { ingredients } = ctx.request.body;
  const recipes = await axios.get(
    "https://www.marmiton.org/recettes/recherche.aspx",
    {
      params: {
        type: 'season',
        aqt: ingredients.join('-')
      }
    }
  ).then(response => parser.parseSearch(response.data));
  ctx.body = recipes;
});

router.get("/api/detail", koaBody(), async ctx => {
  const parser = new MarmitonParser();
  const { detail } = ctx.request.query;
  const recipe = await axios.get(
    `https://www.marmiton.org/recettes/recette_${detail}.aspx`,
  ).then(response => parser.parseDetail(response.data));
  console.log(recipe);
  ctx.body = recipe;
})

app.use(router.routes());

if (!module.parent) app.listen(
  PORT, () => console.log("Listening, go to http://localhost:%s", PORT)
);
