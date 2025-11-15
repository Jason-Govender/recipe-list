document.addEventListener('DOMContentLoaded', () => {
  const store = sessionStorage.getItem('recipeData');
  const parse = JSON.parse(store);
  const recipes = parse.hits.slice(0, 10);
  renderRecipes(recipes);
});

function renderRecipes(recipes) {
  const container = document.getElementById('results-container');
  container.innerHTML = '';

  if (!recipes || recipes.length === 0) {
    container.innerHTML = '<p>No recipes found. Try a different search.</p>';
    return;
  }

  recipes.forEach((hit) => {
    const recipe = hit.recipe;
    const caloriesPerServing = recipe.yield
      ? Math.round(recipe.calories / recipe.yield)
      : Math.round(recipe.calories ?? 0);
    const recipeCard = document.createElement('article');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `<img src="${recipe.image}" alt=${recipe.label} class="recipe-image">
     <section class="recipe-body">
      <h2 class="recipe-title">${recipe.label}</h2>
      <p class="recipe-source">By ${recipe.source}</p>
      
      <a href="${recipe.url}" target="_blank" class="recipe-link">
        View full recipe
      </a>
     </section>
    `;
    container.appendChild(recipeCard);
  });
}
