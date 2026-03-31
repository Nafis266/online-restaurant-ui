let currentRating = 0;

function initStars() {
  const stars = document.querySelectorAll('.star');

  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.value);
      stars.forEach((s, i) => s.classList.toggle('active', i < val));
    });

    star.addEventListener('mouseleave', () => {
      stars.forEach((s, i) => s.classList.toggle('active', i < currentRating));
    });

    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.value);
      stars.forEach((s, i) => s.classList.toggle('active', i < currentRating));
    });
  });
}

function handleFeedback(e) {
  e.preventDefault();

  if (currentRating === 0) {
    showToast('Please select a star rating before submitting.');
    return;
  }

  const name = document.getElementById('fb-name').value;
  const ratingLabel = ['', '★', '★★', '★★★', '★★★★', '★★★★★'][currentRating];
  showToast(`Thank you, ${name}! Your ${ratingLabel} feedback means a lot to us.`);

  e.target.reset();
  currentRating = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
}

document.addEventListener('DOMContentLoaded', initStars);
