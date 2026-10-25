(function () {
  // Password visibility toggle
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;

    var pwBtn = target.closest('[data-toggle-password]');
    if (pwBtn) {
      var inputId = pwBtn.getAttribute('data-toggle-password');
      var inputEl = inputId ? document.getElementById(inputId) : null;
      if (inputEl && inputEl instanceof HTMLInputElement) {
        var nextType = inputEl.type === 'password' ? 'text' : 'password';
        inputEl.type = nextType;
        var openIcon = pwBtn.querySelector('[data-eye-open]');
        var closedIcon = pwBtn.querySelector('[data-eye-closed]');
        if (openIcon && closedIcon) {
          openIcon.classList.toggle('hidden', nextType === 'text');
          closedIcon.classList.toggle('hidden', nextType === 'password');
        }
      }
      return;
    }

    var openModalBtn = target.closest('[data-action="open-modal"]');
    if (openModalBtn) {
      var modalId = openModalBtn.getAttribute('data-target');
      var modal = modalId ? document.getElementById(modalId) : null;
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
      return;
    }

    var closeModalTrigger = target.closest('[data-modal-close], [data-modal-backdrop], [data-action="close-modal"]');
    if (closeModalTrigger) {
      var closeId =
        closeModalTrigger.getAttribute('data-modal-close') ||
        closeModalTrigger.getAttribute('data-modal-backdrop') ||
        closeModalTrigger.getAttribute('data-target');
      var modalToClose = closeId ? document.getElementById(closeId) : null;
      if (modalToClose) {
        modalToClose.classList.add('hidden');
        modalToClose.classList.remove('flex');
      }
      return;
    }

    var openSheetBtn = target.closest('[data-action="open-sheet"]');
    if (openSheetBtn) {
      var sheetId = openSheetBtn.getAttribute('data-target');
      var sheet = sheetId ? document.getElementById(sheetId) : null;
      if (sheet) {
        sheet.classList.remove('hidden');
        sheet.classList.add('flex');
      }
      return;
    }

    var closeSheetTrigger = target.closest('[data-sheet-close], [data-sheet-backdrop]');
    if (closeSheetTrigger) {
      var sheetCloseId =
        closeSheetTrigger.getAttribute('data-sheet-close') ||
        closeSheetTrigger.getAttribute('data-sheet-backdrop');
      var sheetEl = sheetCloseId ? document.getElementById(sheetCloseId) : null;
      if (sheetEl) {
        sheetEl.classList.add('hidden');
        sheetEl.classList.remove('flex');
      }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-modal], [data-bottom-sheet]').forEach(function (el) {
        el.classList.add('hidden');
        el.classList.remove('flex');
      });
    }
  });

  // Interactive QuestionCard selection demo in catalog
  document.addEventListener('change', function (e) {
    var input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    var card = input.closest('[data-question-card]');
    if (!card) return;

    if (input.type === 'radio') {
      card.querySelectorAll('[data-option-card][data-option-type="single"]').forEach(function (label) {
        var radio = label.querySelector('input[type="radio"]');
        var selected = radio instanceof HTMLInputElement && radio.checked;
        label.classList.toggle('bg-stabilo', selected);
        label.classList.toggle('bg-card', !selected);
        var badge = label.querySelector('[data-option-badge]');
        if (badge) {
          badge.classList.toggle('bg-ink', selected);
          badge.classList.toggle('text-white', selected);
          badge.classList.toggle('bg-paper-soft', !selected);
          badge.classList.toggle('text-ink', !selected);
        }
        var dot = label.querySelector('[data-radio-dot]');
        if (dot) dot.classList.toggle('hidden', !selected);
      });
    } else if (input.type === 'checkbox') {
      var optCard = input.closest('[data-option-card][data-option-type="multiple"]');
      if (optCard) {
        var checked = input.checked;
        optCard.classList.toggle('bg-stabilo-soft', checked);
        optCard.classList.toggle('bg-card', !checked);
        var box = optCard.querySelector('[data-checkbox-box]');
        if (box) {
          box.classList.toggle('bg-stabilo', checked);
          box.classList.toggle('bg-card', !checked);
        }
        var mark = optCard.querySelector('[data-checkbox-mark]');
        if (mark) mark.classList.toggle('hidden', !checked);
      }
    }
  });

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;
    var catBtn = target.closest('[data-category-btn]');
    if (!catBtn) return;
    var row = catBtn.closest('[data-statement-row]');
    if (!row) return;
    var chosen = catBtn.getAttribute('data-bool-value');
    row.querySelectorAll('[data-category-btn]').forEach(function (btn) {
      var active = btn.getAttribute('data-bool-value') === chosen;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('bg-stabilo', active);
      btn.classList.toggle('text-ink', active);
      btn.classList.toggle('shadow-solid-sm', active);
      btn.classList.toggle('bg-card', !active);
      btn.classList.toggle('text-ink-soft', !active);
    });
  });
})();
