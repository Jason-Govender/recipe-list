document.addEventListener('DOMContentLoaded', () => {
  const store = sessionStorage.getItem('recipeData');
  const parse = JSON.parse(store);
  const recipes = parse.hits.slice(0, 6);
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
    recipeCard.innerHTML = `
     <section class="recipe-body">
      <img src="${recipe.image}" alt=${recipe.label} class="recipe-image"></img>
      <h2 class="recipe-title">${recipe.label}</h2>
      <p class="recipe-source">By ${recipe.source}</p>
      
      <a href="${recipe.url}" target="_blank" class="recipe-link">
        View full recipe
      </a>
      <footer class='recipe-footer'>
        <i class="fa-solid fa-plus"></i>
        <i class="fa-regular fa-star"></i>
      </footer>
     </section>
    `;
    container.appendChild(recipeCard);
  });
}

let lastScrollY = window.scrollY;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    // scrolling down → hide nav
    nav.classList.add('hide');
  } else {
    // scrolling up → show nav
    nav.classList.remove('hide');
  }

  lastScrollY = window.scrollY;
});
