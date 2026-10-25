// Admin Quiz Form Interactivity (Question Counter & Min/Max Validation)
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.quiz-question-checkbox');
  const countEl = document.getElementById('selected-count');
  const warningEl = document.getElementById('quiz-validation-warning');
  const publishBtn = document.getElementById('btn-publish-quiz');
  const counterBadge = document.getElementById('question-counter-badge');

  const isTryout = window.location.pathname.includes('/tryout');
  const minCount = isTryout ? 10 : 5;
  const maxCount = isTryout ? 15 : 10;

  function updateValidation() {
    let count = 0;
    checkboxes.forEach((cb) => {
      if (cb.checked) count++;
    });

    if (countEl) countEl.textContent = count.toString();

    const isValid = count >= minCount && count <= maxCount;

    if (warningEl) {
      warningEl.classList.toggle('hidden', isValid);
    }

    if (publishBtn) {
      publishBtn.disabled = !isValid;
      if (isValid) {
        publishBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'shadow-none');
      } else {
        publishBtn.classList.add('opacity-50', 'cursor-not-allowed', 'shadow-none');
      }
    }

    if (counterBadge) {
      if (isValid) {
        counterBadge.className =
          'px-2.5 py-0.5 rounded-chip text-[12px] font-bold border-2 border-ink bg-correct-bg text-correct';
      } else {
        counterBadge.className =
          'px-2.5 py-0.5 rounded-chip text-[12px] font-bold border-2 border-ink bg-stabilo text-ink';
      }
    }
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener('change', updateValidation);
  });

  updateValidation();
});
