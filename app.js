const filterCards = document.querySelectorAll('.filter-card');

filterCards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-active');
  });
});
