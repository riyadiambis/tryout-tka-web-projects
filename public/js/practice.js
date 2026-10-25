(function () {
  var form = document.getElementById('practice-attempt-form');
  if (!form) return;

  var answeredLabel = document.getElementById('practice-answered-label');
  var progressBar = document.getElementById('practice-progress-bar');
  var modal = document.getElementById('modal-confirm-practice');
  var modalAnswered = document.getElementById('modal-practice-answered');
  var modalEmptyContainer = document.getElementById('modal-practice-empty-numbers');
  var confirmSubmitBtn = document.getElementById('btn-confirm-submit-practice');
  var forceSubmit = false;

  function openModal() {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  function updateCardStatusBadge(card, isAnswered) {
    var qId = card.getAttribute('data-question-id');
    card.setAttribute('data-answered', isAnswered ? 'true' : 'false');
    if (!qId) return;

    var badge = card.querySelector('[data-answer-badge="' + qId + '"]');
    var dot = card.querySelector('[data-answer-dot="' + qId + '"]');
    var text = card.querySelector('[data-answer-status-text="' + qId + '"]');

    if (badge) {
      badge.classList.toggle('bg-stabilo-soft', isAnswered);
      badge.classList.toggle('text-ink', isAnswered);
      badge.classList.toggle('bg-paper-soft', !isAnswered);
      badge.classList.toggle('text-ink-soft', !isAnswered);
    }
    if (dot) {
      dot.classList.toggle('bg-stabilo', isAnswered);
      dot.classList.toggle('bg-card', !isAnswered);
    }
    if (text) {
      text.textContent = isAnswered ? 'Sudah diisi' : 'Belum dijawab';
    }
  }

  function evaluateQuestionCard(card) {
    var qType = card.getAttribute('data-question-type');
    var isAnswered = false;

    if (qType === 'single') {
      var optionCards = card.querySelectorAll('[data-option-card][data-option-type="single"]');
      for (var i = 0; i < optionCards.length; i++) {
        var optCard = optionCards[i];
        var radio = optCard.querySelector('input[type="radio"]');
        var checked = Boolean(radio && radio.checked);
        if (checked) isAnswered = true;

        // STRICT RULE: Only stabilo yellow & navy ink
        optCard.classList.toggle('bg-stabilo', checked);
        optCard.classList.toggle('bg-card', !checked);
        optCard.classList.toggle('hover:bg-paper-soft', !checked);

        var keyBadge = optCard.querySelector('[data-option-badge]');
        if (keyBadge) {
          keyBadge.classList.toggle('bg-ink', checked);
          keyBadge.classList.toggle('text-white', checked);
          keyBadge.classList.toggle('bg-paper-soft', !checked);
          keyBadge.classList.toggle('text-ink', !checked);
        }

        var radioDot = optCard.querySelector('[data-radio-dot]');
        if (radioDot) {
          radioDot.classList.toggle('hidden', !checked);
        }
      }
    } else if (qType === 'multiple') {
      var multiCards = card.querySelectorAll('[data-option-card][data-option-type="multiple"]');
      for (var j = 0; j < multiCards.length; j++) {
        var mCard = multiCards[j];
        var checkbox = mCard.querySelector('input[type="checkbox"]');
        var mChecked = Boolean(checkbox && checkbox.checked);
        if (mChecked) isAnswered = true;

        mCard.classList.toggle('bg-stabilo-soft', mChecked);
        mCard.classList.toggle('bg-card', !mChecked);
        mCard.classList.toggle('hover:bg-paper-soft', !mChecked);

        var box = mCard.querySelector('[data-checkbox-box]');
        if (box) {
          box.classList.toggle('bg-stabilo', mChecked);
          box.classList.toggle('text-ink', mChecked);
          box.classList.toggle('bg-card', !mChecked);
          box.classList.toggle('text-transparent', !mChecked);
        }

        var mark = mCard.querySelector('[data-checkbox-mark]');
        if (mark) {
          mark.classList.toggle('hidden', !mChecked);
        }
      }
    } else if (qType === 'category') {
      var rows = card.querySelectorAll('[data-statement-row]');
      var allFilled = rows.length > 0;
      for (var k = 0; k < rows.length; k++) {
        var hiddenInput = rows[k].querySelector('[data-category-input]');
        var val = hiddenInput ? hiddenInput.value : '';
        if (val !== 'true' && val !== 'false') {
          allFilled = false;
        }
      }
      isAnswered = allFilled;
    }

    updateCardStatusBadge(card, isAnswered);
    return isAnswered;
  }

  function refreshAllProgress() {
    var cards = form.querySelectorAll('[data-question-card]');
    var total = cards.length;
    var answeredCount = 0;
    var emptyNumbers = [];

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var answered = evaluateQuestionCard(card);
      if (answered) {
        answeredCount++;
      } else {
        emptyNumbers.push(card.getAttribute('data-question-number') || String(i + 1));
      }
    }

    if (answeredLabel) {
      answeredLabel.textContent = answeredCount + ' dari ' + total + ' terjawab';
    }
    if (progressBar && total > 0) {
      var pct = Math.round((answeredCount / total) * 100);
      progressBar.style.width = pct + '%';
    }

    return { total: total, answeredCount: answeredCount, emptyNumbers: emptyNumbers };
  }

  form.addEventListener('change', function () {
    refreshAllProgress();
  });

  form.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;

    var catBtn = target.closest('[data-category-btn]');
    if (catBtn) {
      var row = catBtn.closest('[data-statement-row]');
      if (!row) return;
      var val = catBtn.getAttribute('data-bool-value') || '';
      var input = row.querySelector('[data-category-input]');
      if (input) {
        input.value = val;
      }

      var siblingBtns = row.querySelectorAll('[data-category-btn]');
      for (var i = 0; i < siblingBtns.length; i++) {
        var btn = siblingBtns[i];
        var active = btn.getAttribute('data-bool-value') === val;
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        btn.classList.toggle('bg-stabilo', active);
        btn.classList.toggle('text-ink', active);
        btn.classList.toggle('shadow-solid-sm', active);
        btn.classList.toggle('bg-card', !active);
        btn.classList.toggle('text-ink-soft', !active);
        btn.classList.toggle('hover:bg-paper', !active);
      }

      refreshAllProgress();
    }
  });

  form.addEventListener('submit', function (event) {
    if (forceSubmit) return;
    var state = refreshAllProgress();
    if (state.emptyNumbers.length > 0 && modal) {
      event.preventDefault();
      if (modalAnswered) {
        modalAnswered.textContent = String(state.answeredCount);
      }
      if (modalEmptyContainer) {
        modalEmptyContainer.innerHTML = '';
        for (var i = 0; i < state.emptyNumbers.length; i++) {
          var num = state.emptyNumbers[i];
          var badge = document.createElement('a');
          badge.href = '#soal-' + num;
          badge.className =
            'min-w-[40px] h-10 px-2.5 rounded-badge bg-card border-2 border-ink font-title font-extrabold text-[16px] text-ink inline-flex items-center justify-center hover:bg-stabilo';
          badge.textContent = 'No. ' + num;
          badge.addEventListener('click', closeModal);
          modalEmptyContainer.appendChild(badge);
        }
      }
      openModal();
    }
  });

  if (confirmSubmitBtn) {
    confirmSubmitBtn.addEventListener('click', function () {
      forceSubmit = true;
      closeModal();
      form.submit();
    });
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;
    if (
      target.closest('[data-modal-close="modal-confirm-practice"]') ||
      target.closest('[data-action="close-modal"][data-target="modal-confirm-practice"]') ||
      target.hasAttribute('data-modal-backdrop')
    ) {
      closeModal();
    }
  });

  refreshAllProgress();
})();
