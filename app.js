const filterElements = document.querySelectorAll('.filter-card');
const filterCards = Array.from(filterElements).map((cardElement) => new FilterCard(cardElement));
const mealTypeFilters = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const dishTypeFilters = ['Drinks', 'Desserts'];

const searchForm = document.querySelector('.search');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const filterRequest = filterCards
    .filter((filter) => filter.isActive)
    .map((filter) => filter.name);

  const mealType = filterRequest.filter((name) => mealTypeFilters.includes(name));
  const dishType = filterRequest.filter((name) => dishTypeFilters.includes(name));
  const searchQuery = document.querySelector('#recipeSearch').value;
  const appKey = '4223da09cba8f08dbbcc5b146d1e2a87';
  const appId = 'a3e22092';
  const userId = 'Jas8afrog';
  const params = new URLSearchParams();
  params.set('type', 'public');
  params.set('q', searchQuery);
  params.set('app_id', appId);
  params.set('app_key', appKey);
  if (mealType.length > 0) params.set('mealType', mealType);
  if (dishType.length > 0) params.set('dishType', dishType);

  const searchURL = `https://api.edamam.com/api/recipes/v2?${params.toString()}`;

  // Add the fetch call
  fetch(searchURL, {
    headers: {
      'Edamam-Account-User': userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem('recipeData', JSON.stringify(data));
      window.location.href = 'results.html';
    })
    .catch((error) => console.error('Error:', error));
});
