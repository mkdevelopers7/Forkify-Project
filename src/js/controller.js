import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
// Control Recipes Function
const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  try {
    if (!id) return;
    recipeView.renderSpinner();

    // Update Results View
    resultsView.update(model.getSearchResultsPage());

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);

    // Update Bookmarks View

    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderErrorMessage();
    console.error(err);
  }
};

// Control Update Servings
const controlUpdateServings = function (updateTo) {
  model.updateServings(updateTo);

  // Update Recipe View
  recipeView.update(model.state.recipe);
};

// Control Search Results
const controlSearchResults = async function () {
  try {
    // Get Query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    // Load Search
    await model.loadSearchResults(query);
    // console.log(model.state.search.results);

    // Render Results
    const data = model.getSearchResultsPage();
    resultsView.render(data);

    // Render Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderErrorMessage();
    // console.error('Cannot find related recipe. Kindly search another name.');
  }
};

// Control Pagination
const controlPagination = function (goToPage) {
  // Render New Results
  const data = model.getSearchResultsPage(goToPage);
  resultsView.render(data);

  // Render New Pagination
  paginationView.render(model.state.search);
};

// Add/Remove Bookmarks
const controlAddBookmarks = function () {
  if (!model.state.recipe?.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // Update Recipe
  recipeView.update(model.state.recipe);

  // Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
  // if (model.state.bookmarks.length === 0) bookmarksView.renderErrorMessage();
};

// Control Form Upload Data
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload Data
    await model.uploadRecipe(newRecipe);

    // Bookmark New Recipe
    controlAddBookmarks(model.state.recipe);

    // Render New Recipe
    recipeView.render(model.state.recipe);

    // Render success message
    addRecipeView.renderMessage();

    // Render Bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close Upload Form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderErrorMessage(err.message);
  }
};

// Initialize App
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerAddBookmarks(controlAddBookmarks);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
