(function () {
  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;

    var toggleBtn = target.closest('[data-toggle-password]');
    if (!toggleBtn) return;

    var inputId = toggleBtn.getAttribute('data-toggle-password');
    if (!inputId) return;

    var input = document.getElementById(inputId);
    if (!input) return;

    var isPassword = input.getAttribute('type') === 'password';
    input.setAttribute('type', isPassword ? 'text' : 'password');

    var eyeOpen = toggleBtn.querySelector('[data-eye-open]');
    var eyeClosed = toggleBtn.querySelector('[data-eye-closed]');
    if (eyeOpen) eyeOpen.classList.toggle('hidden', isPassword);
    if (eyeClosed) eyeClosed.classList.toggle('hidden', !isPassword);
  });
})();
