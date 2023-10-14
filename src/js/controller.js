import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //taking the hash dynamically from url
    const id = window.location.hash.slice(1);
    console.log(id);

    //if id is not their then simply return
    if (!id) return;
    recipeView.renderSpinner();

    //1) Loading recipe
    await model.loadRecipe(id);

    //2)rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

fetch(
  'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
);

//adding hashchange and load event
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
