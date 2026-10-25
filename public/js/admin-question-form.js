// Admin Question Form Interactivity (Live Preview Debounce & Tab Switcher)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-question');
  const previewContainer = document.getElementById('live-preview-container');
  const tabBtnAttempt = document.getElementById('tab-btn-attempt');
  const tabBtnResult = document.getElementById('tab-btn-result');
  const btnInspectPreview = document.getElementById('btn-inspect-preview');
  const btnPublish = document.getElementById('btn-publish-question');
  const previewNote = document.getElementById('preview-requirement-note');

  let activeTab = 'attempt'; // 'attempt' or 'result'

  // 1. Question Type Switcher
  const typeRadios = document.querySelectorAll('input[name="questionType"]');
  const editorSingle = document.getElementById('editor-single');
  const editorMultiple = document.getElementById('editor-multiple');
  const editorCategory = document.getElementById('editor-category');
  const hintBentukSoal = document.getElementById('hint-bentuk-soal');

  function updateTypeEditor(type) {
    if (editorSingle) editorSingle.classList.toggle('hidden', type !== 'single');
    if (editorMultiple) editorMultiple.classList.toggle('hidden', type !== 'multiple');
    if (editorCategory) editorCategory.classList.toggle('hidden', type !== 'category');

    if (hintBentukSoal) {
      if (type === 'single') hintBentukSoal.textContent = 'Pilih 1 kunci benar';
      else if (type === 'multiple') hintBentukSoal.textContent = 'Centang semua kunci benar';
      else hintBentukSoal.textContent = 'Tentukan Benar/Salah tiap baris';
    }
  }

  typeRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        updateTypeEditor(radio.value);
        triggerLivePreview();
      }
    });
  });

  // 2. Tab Switcher (Saat Mengerjakan vs Setelah Submit)
  function setPreviewTab(tab) {
    activeTab = tab;
    const tabAttempt = document.getElementById('preview-tab-attempt');
    const tabResult = document.getElementById('preview-tab-result');

    if (tab === 'attempt') {
      if (tabAttempt) tabAttempt.classList.remove('hidden');
      if (tabResult) tabResult.classList.add('hidden');
      if (tabBtnAttempt) {
        tabBtnAttempt.className =
          'px-2.5 py-1 rounded text-[11px] font-bold bg-stabilo text-ink border border-ink shadow-solid-sm';
      }
      if (tabBtnResult) {
        tabBtnResult.className =
          'px-2.5 py-1 rounded text-[11px] font-bold text-ink-soft hover:text-ink';
      }
    } else {
      if (tabAttempt) tabAttempt.classList.add('hidden');
      if (tabResult) tabResult.classList.remove('hidden');
      if (tabBtnResult) {
        tabBtnResult.className =
          'px-2.5 py-1 rounded text-[11px] font-bold bg-stabilo text-ink border border-ink shadow-solid-sm';
      }
      if (tabBtnAttempt) {
        tabBtnAttempt.className =
          'px-2.5 py-1 rounded text-[11px] font-bold text-ink-soft hover:text-ink';
      }
    }
  }

  if (tabBtnAttempt) tabBtnAttempt.addEventListener('click', () => setPreviewTab('attempt'));
  if (tabBtnResult) tabBtnResult.addEventListener('click', () => setPreviewTab('result'));

  // 3. Inspect Preview Button unlocks Publish
  if (btnInspectPreview) {
    btnInspectPreview.addEventListener('click', () => {
      if (btnPublish) {
        btnPublish.disabled = false;
        btnPublish.classList.remove('opacity-50', 'cursor-not-allowed', 'shadow-none');
      }
      if (previewNote) {
        previewNote.innerHTML =
          '<span class="text-correct font-bold">Pratinjau telah diperiksa. Soal siap diterbitkan!</span>';
      }
      // Scroll to preview container on small screens
      if (previewContainer && window.innerWidth < 1024) {
        previewContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // 4. Debounced Live Preview Server Request
  let debounceTimeout = null;

  async function triggerLivePreview() {
    if (!form || !previewContainer) return;

    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      const formData = new FormData(form);
      const payload = {
        level: formData.get('level') || 'smp',
        elementId: formData.get('elementId') || '',
        topicId: formData.get('topicId') || '',
        questionType: formData.get('questionType') || 'single',
        bodyRaw: formData.get('bodyRaw') || '',
        imageUrl: formData.get('imageUrl') || '',
        explanationRaw: formData.get('explanationRaw') || '',
        shortsId: formData.get('shortsId') || '',
        longVideoId: formData.get('longVideoId') || '',
        longVideoTime: formData.get('longVideoTime') || '',
      };

      // Collect options according to questionType
      if (payload.questionType === 'single') {
        payload.choiceOptions = ['A', 'B', 'C', 'D'].map((k) => ({
          key: k,
          textRaw: formData.get(`option_${k}`) || `Pilihan ${k}`,
        }));
        payload.answerKey = {
          questionType: 'single',
          key: formData.get('keySingle') || 'A',
        };
      } else if (payload.questionType === 'multiple') {
        payload.choiceOptions = ['A', 'B', 'C', 'D'].map((k) => ({
          key: k,
          textRaw: formData.get(`option_mult_${k}`) || `Pilihan ${k}`,
        }));
        const selectedKeys = formData.getAll('keysMultiple[]');
        payload.answerKey = {
          questionType: 'multiple',
          keys: selectedKeys.length > 0 ? selectedKeys : ['A'],
        };
      } else if (payload.questionType === 'category') {
        payload.statements = [1, 2, 3].map((num) => ({
          statementId: `stmt-${num}`,
          textRaw: formData.get(`stmt_${num}`) || `Pernyataan ${num}`,
        }));
        payload.answerKey = {
          questionType: 'category',
          answers: {
            'stmt-1': formData.get('cat_ans_1') === 'true',
            'stmt-2': formData.get('cat_ans_2') === 'true',
            'stmt-3': formData.get('cat_ans_3') === 'true',
          },
        };
      }

      try {
        const resp = await fetch('/admin/soal/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (resp.ok) {
          const html = await resp.text();
          previewContainer.innerHTML = html;
          // Re-apply active tab state
          setPreviewTab(activeTab);
        }
      } catch (err) {
        console.error('Failed to update live preview', err);
      }
    }, 350);
  }

  // Listen to inputs
  if (form) {
    form.querySelectorAll('input, textarea, select').forEach((input) => {
      input.addEventListener('input', triggerLivePreview);
      input.addEventListener('change', triggerLivePreview);
    });
  }
});
