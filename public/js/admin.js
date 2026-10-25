// Admin UI Interactivity (Vanilla JS)
document.addEventListener('DOMContentLoaded', () => {
  // 1. Preview Modal on Bank Soal (/admin/soal)
  const previewModal = document.getElementById('modal-preview-soal');
  const previewBody = document.getElementById('modal-preview-body');

  document.querySelectorAll('.btn-open-preview').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const qId = btn.getAttribute('data-preview-id');
      if (!previewModal || !previewBody) return;

      previewBody.innerHTML =
        '<div class="py-12 text-center text-ink-soft font-body font-bold text-[14px]">Memuat preview soal dari server...</div>';
      previewModal.classList.remove('hidden');

      try {
        const resp = await fetch(`/admin/soal/${qId}/preview-fragment`);
        if (resp.ok) {
          const html = await resp.text();
          previewBody.innerHTML = html;
        } else {
          previewBody.innerHTML =
            '<div class="py-8 text-center text-wrong font-body font-bold text-[14px]">Gagal memuat pratinjau soal.</div>';
        }
      } catch (err) {
        previewBody.innerHTML =
          '<div class="py-8 text-center text-wrong font-body font-bold text-[14px]">Terjadi kesalahan koneksi server.</div>';
      }
    });
  });

  // Close preview modal buttons
  if (previewModal) {
    previewModal.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        previewModal.classList.add('hidden');
      });
    });
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) {
        previewModal.classList.add('hidden');
      }
    });
  }

  // 2. Student Reset Password Modal (/admin/siswa)
  const resetModal = document.getElementById('modal-reset-password');
  const studentTarget = document.getElementById('reset-student-target');
  const usernameTarget = document.getElementById('reset-username-target');
  const btnCloseReset = document.getElementById('btn-close-reset-modal');
  const btnConfirmReset = document.getElementById('btn-confirm-reset');

  document.querySelectorAll('.btn-reset-password').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-student-name') || '';
      const username = btn.getAttribute('data-student-username') || '';
      if (studentTarget) studentTarget.textContent = name;
      if (usernameTarget) usernameTarget.textContent = username;
      if (resetModal) resetModal.classList.remove('hidden');
    });
  });

  if (btnCloseReset && resetModal) {
    btnCloseReset.addEventListener('click', () => {
      resetModal.classList.add('hidden');
    });
  }

  if (btnConfirmReset && resetModal) {
    btnConfirmReset.addEventListener('click', () => {
      btnConfirmReset.textContent = 'Password Berhasil Direset!';
      btnConfirmReset.classList.add('bg-correct-bg', 'text-correct');
      setTimeout(() => {
        btnConfirmReset.textContent = 'Konfirmasi Reset';
        btnConfirmReset.classList.remove('bg-correct-bg', 'text-correct');
        resetModal.classList.add('hidden');
      }, 1200);
    });
  }

  if (resetModal) {
    resetModal.addEventListener('click', (e) => {
      if (e.target === resetModal) {
        resetModal.classList.add('hidden');
      }
    });
  }
});
