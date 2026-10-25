(function () {
  var form = document.getElementById('tryout-attempt-form');
  if (!form) return;

  var totalQuestions = parseInt(form.getAttribute('data-total-questions') || '1', 10);
  var activeNumber = parseInt(form.getAttribute('data-active-number') || '1', 10);
  var flaggedMap = {};
  var answeredMap = {};

  var stepIndicator = document.getElementById('tryout-step-indicator');
  var prevBtn = document.getElementById('btn-prev-question');
  var nextBtn = document.getElementById('btn-next-question');
  var mobileAnsweredPill = document.getElementById('tryout-mobile-answered-pill');
  var desktopAnsweredBadge = document.getElementById('tryout-desktop-answered-badge');
  var autosaveLabel = document.getElementById('tryout-autosave-label');

  var bottomSheet = document.getElementById('sheet-tryout-numbers');
  var openSheetBtn = document.getElementById('btn-open-tryout-sheet');
  var confirmModal = document.getElementById('modal-confirm-tryout');
  var confirmSubmitBtn = document.getElementById('btn-confirm-submit-tryout');

  var modalAnsweredEl = document.getElementById('modal-tryout-answered');
  var modalEmptyEl = document.getElementById('modal-tryout-empty');
  var modalFlaggedEl = document.getElementById('modal-tryout-flagged');
  var modalWarningBox = document.getElementById('modal-tryout-warning-box');

  function openSheet() {
    if (!bottomSheet) return;
    bottomSheet.classList.remove('hidden');
    bottomSheet.classList.add('flex');
  }

  function closeSheet() {
    if (!bottomSheet) return;
    bottomSheet.classList.add('hidden');
    bottomSheet.classList.remove('flex');
  }

  function openConfirmModal() {
    closeSheet();
    var summary = computeSummary();
    if (modalAnsweredEl) modalAnsweredEl.textContent = String(summary.answeredCount);
    if (modalEmptyEl) modalEmptyEl.textContent = String(summary.emptyCount);
    if (modalFlaggedEl) modalFlaggedEl.textContent = String(summary.flaggedCount);
    if (modalWarningBox) {
      modalWarningBox.classList.toggle(
        'hidden',
        summary.emptyCount === 0 && summary.flaggedCount === 0
      );
    }
    if (confirmModal) {
      confirmModal.classList.remove('hidden');
      confirmModal.classList.add('flex');
    }
  }

  function closeConfirmModal() {
    if (!confirmModal) return;
    confirmModal.classList.add('hidden');
    confirmModal.classList.remove('flex');
  }

  function pulseAutosave() {
    if (!autosaveLabel) return;
    autosaveLabel.textContent = 'Pilihan tercatat';
    setTimeout(function () {
      if (autosaveLabel) autosaveLabel.textContent = 'Tersimpan otomatis';
    }, 900);
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

  function evaluateCard(card) {
    var qId = card.getAttribute('data-question-id') || '';
    var qType = card.getAttribute('data-question-type');
    var isAnswered = false;

    if (qType === 'single') {
      var optionCards = card.querySelectorAll('[data-option-card][data-option-type="single"]');
      for (var i = 0; i < optionCards.length; i++) {
        var optCard = optionCards[i];
        var radio = optCard.querySelector('input[type="radio"]');
        var checked = Boolean(radio && radio.checked);
        if (checked) isAnswered = true;

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

    answeredMap[qId] = isAnswered;
    updateCardStatusBadge(card, isAnswered);
  }

  function computeSummary() {
    var cards = form.querySelectorAll('[data-question-card]');
    var answeredCount = 0;
    var flaggedCount = 0;

    for (var i = 0; i < cards.length; i++) {
      var qId = cards[i].getAttribute('data-question-id') || '';
      if (answeredMap[qId]) answeredCount++;
      if (flaggedMap[qId]) flaggedCount++;
    }

    return {
      answeredCount: answeredCount,
      emptyCount: Math.max(0, totalQuestions - answeredCount),
      flaggedCount: flaggedCount,
    };
  }

  function syncGridAndNavigation() {
    var cards = form.querySelectorAll('[data-question-card]');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var num = parseInt(card.getAttribute('data-question-number') || '0', 10);
      card.classList.toggle('hidden', num !== activeNumber);
      evaluateCard(card);
    }

    if (stepIndicator) {
      stepIndicator.textContent = 'Soal ' + activeNumber + ' dari ' + totalQuestions;
    }

    if (prevBtn) {
      prevBtn.disabled = activeNumber <= 1;
      prevBtn.classList.toggle('opacity-50', activeNumber <= 1);
      prevBtn.classList.toggle('cursor-not-allowed', activeNumber <= 1);
    }

    if (nextBtn) {
      var isLast = activeNumber >= totalQuestions;
      var spanLabel = nextBtn.querySelector('span');
      if (spanLabel) {
        spanLabel.textContent = isLast ? 'Kumpulkan' : 'Berikutnya';
      }
    }

    var summary = computeSummary();
    if (mobileAnsweredPill) {
      mobileAnsweredPill.textContent = summary.answeredCount + '/' + totalQuestions + ' terjawab';
    }
    if (desktopAnsweredBadge) {
      desktopAnsweredBadge.textContent = summary.answeredCount + ' / ' + totalQuestions;
    }

    // Sync all QuestionNumberGrid buttons (both desktop sticky panel & mobile bottom sheet)
    var jumpButtons = document.querySelectorAll('[data-jump-number]');
    for (var j = 0; j < jumpButtons.length; j++) {
      var btn = jumpButtons[j];
      var bNum = parseInt(btn.getAttribute('data-jump-number') || '0', 10);
      var qId = btn.getAttribute('data-grid-question-id') || '';
      var isCurrent = bNum === activeNumber;
      var isAns = Boolean(answeredMap[qId]);
      var isFlag = Boolean(flaggedMap[qId]);

      btn.classList.remove(
        'bg-stabilo',
        'text-ink',
        'shadow-solid-sm',
        'ring-2',
        'ring-ink',
        'bg-ink',
        'text-white',
        'bg-card',
        'hover:bg-paper-soft'
      );

      if (isCurrent) {
        btn.classList.add('bg-stabilo', 'text-ink', 'shadow-solid-sm', 'ring-2', 'ring-ink');
        btn.setAttribute('aria-current', 'step');
      } else if (isAns) {
        btn.classList.add('bg-ink', 'text-white');
        btn.removeAttribute('aria-current');
      } else {
        btn.classList.add('bg-card', 'text-ink', 'hover:bg-paper-soft');
        btn.removeAttribute('aria-current');
      }

      var flagDot = btn.querySelector('[data-flag-dot="' + qId + '"]');
      if (flagDot) {
        flagDot.classList.toggle('hidden', !isFlag);
      }
    }
  }

  function jumpToQuestion(targetNum) {
    if (targetNum < 1 || targetNum > totalQuestions) return;
    activeNumber = targetNum;
    syncGridAndNavigation();
    closeSheet();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Event listeners for options & navigation
  form.addEventListener('change', function () {
    pulseAutosave();
    syncGridAndNavigation();
  });

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;

    // Category binary buttons
    var catBtn = target.closest('[data-category-btn]');
    if (catBtn && form.contains(catBtn)) {
      var row = catBtn.closest('[data-statement-row]');
      if (!row) return;
      var val = catBtn.getAttribute('data-bool-value') || '';
      var input = row.querySelector('[data-category-input]');
      if (input) input.value = val;

      var siblingBtns = row.querySelectorAll('[data-category-btn]');
      for (var i = 0; i < siblingBtns.length; i++) {
        var b = siblingBtns[i];
        var active = b.getAttribute('data-bool-value') === val;
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
        b.classList.toggle('bg-stabilo', active);
        b.classList.toggle('text-ink', active);
        b.classList.toggle('shadow-solid-sm', active);
        b.classList.toggle('bg-card', !active);
        b.classList.toggle('text-ink-soft', !active);
        b.classList.toggle('hover:bg-paper', !active);
      }
      pulseAutosave();
      syncGridAndNavigation();
      return;
    }

    // Ragu-ragu flag toggle
    var flagBtn = target.closest('[data-flag-button]');
    if (flagBtn) {
      var qId = flagBtn.getAttribute('data-flag-button') || '';
      flaggedMap[qId] = !flaggedMap[qId];
      var flaggedNow = Boolean(flaggedMap[qId]);
      flagBtn.setAttribute('aria-pressed', flaggedNow ? 'true' : 'false');
      flagBtn.classList.toggle('bg-stabilo', flaggedNow);
      flagBtn.classList.toggle('text-ink', flaggedNow);
      flagBtn.classList.toggle('shadow-solid-sm', flaggedNow);
      flagBtn.classList.toggle('bg-paper-soft', !flaggedNow);
      flagBtn.classList.toggle('text-ink-soft', !flaggedNow);
      syncGridAndNavigation();
      return;
    }

    // Jump grid number
    var jumpBtn = target.closest('[data-jump-number]');
    if (jumpBtn) {
      var num = parseInt(jumpBtn.getAttribute('data-jump-number') || '1', 10);
      jumpToQuestion(num);
      return;
    }

    // Open submit modal
    if (target.closest('[data-action="open-submit-tryout"]')) {
      openConfirmModal();
      return;
    }

    // Close modal
    if (
      target.closest('[data-modal-close="modal-confirm-tryout"]') ||
      target.closest('[data-action="close-modal"][data-target="modal-confirm-tryout"]') ||
      target.hasAttribute('data-modal-backdrop')
    ) {
      closeConfirmModal();
      return;
    }

    // Close bottom sheet
    if (
      target.closest('[data-sheet-close="sheet-tryout-numbers"]') ||
      target.hasAttribute('data-sheet-backdrop')
    ) {
      closeSheet();
      return;
    }
  });

  if (openSheetBtn) {
    openSheetBtn.addEventListener('click', openSheet);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      if (activeNumber > 1) {
        jumpToQuestion(activeNumber - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (activeNumber < totalQuestions) {
        jumpToQuestion(activeNumber + 1);
      } else {
        openConfirmModal();
      }
    });
  }

  if (confirmSubmitBtn) {
    confirmSubmitBtn.addEventListener('click', function () {
      closeConfirmModal();
      form.submit();
    });
  }

  // Countdown Timer (Display-only in ISSUE-01; server deadline enforced in ISSUE-03)
  var timerEl = document.getElementById('tryout-timer');
  if (timerEl) {
    var remaining = parseInt(timerEl.getAttribute('data-remaining-seconds') || '1800', 10);
    var displaySpan = timerEl.querySelector('[data-timer-display]');

    function formatTime(sec) {
      var clamped = Math.max(0, sec);
      var m = Math.floor(clamped / 60);
      var s = clamped % 60;
      var mm = m < 10 ? '0' + m : String(m);
      var ss = s < 10 ? '0' + s : String(s);
      return mm + ':' + ss;
    }

    function applyTimerVisual() {
      if (displaySpan) displaySpan.textContent = formatTime(remaining);
      timerEl.setAttribute('data-remaining-seconds', String(remaining));
      var urgent = remaining <= 300;
      timerEl.classList.toggle('bg-wrong-bg', urgent);
      timerEl.classList.toggle('border-wrong', urgent);
      timerEl.classList.toggle('text-wrong', urgent);
      timerEl.classList.toggle('bg-card', !urgent);
      timerEl.classList.toggle('border-ink', !urgent);
      timerEl.classList.toggle('text-ink', !urgent);
    }

    applyTimerVisual();

    var intervalId = setInterval(function () {
      if (remaining > 0) {
        remaining -= 1;
        applyTimerVisual();
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    var demoUrgentBtns = document.querySelectorAll('[data-timer-demo-urgent="tryout-timer"]');
    for (var d = 0; d < demoUrgentBtns.length; d++) {
      demoUrgentBtns[d].addEventListener('click', function () {
        remaining = 295;
        applyTimerVisual();
      });
    }
  }

  syncGridAndNavigation();
})();
