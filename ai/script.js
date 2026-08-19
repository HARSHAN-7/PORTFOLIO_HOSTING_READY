/* ==========================================================================
   HARSHAN RASU PORTFOLIO — STANDALONE VANILLA JS CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. STATEMENT OF INTENT SCROLL WORD HIGHLIGHTER
  const intentSection = document.getElementById('intent');
  const wordSpans = document.querySelectorAll('.intent-word');

  if (intentSection && wordSpans.length > 0) {
    const handleScroll = () => {
      const rect = intentSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.25;
      
      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      wordSpans.forEach((span, index) => {
        const threshold = (index + 1) / wordSpans.length;
        if (progress >= threshold - 0.05) {
          span.style.color = '#050505';
          span.style.opacity = '1';
        } else {
          span.style.color = '#b0b0b0';
          span.style.opacity = '0.45';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  // 2. CASE STUDY INTERACTIVE SELECTOR
  const caseStudyItems = document.querySelectorAll('.casestudy-selector-item');
  const displayTitle = document.getElementById('cs-display-title');
  const displaySummary = document.getElementById('cs-display-summary');
  const displayCategory = document.getElementById('cs-display-category');
  const displayImpact = document.getElementById('cs-display-impact');
  const displayTechStack = document.getElementById('cs-display-tech');

  caseStudyItems.forEach(item => {
    item.addEventListener('click', () => {
      caseStudyItems.forEach(i => {
        i.style.background = '#F4F4F6';
        i.style.color = '#050505';
        i.classList.remove('active');
      });

      item.style.background = '#050505';
      item.style.color = '#FFFFFF';
      item.classList.add('active');

      if (displayTitle) displayTitle.innerText = item.dataset.title;
      if (displaySummary) displaySummary.innerText = item.dataset.summary;
      if (displayCategory) displayCategory.innerText = item.dataset.category;
      if (displayImpact) displayImpact.innerText = item.dataset.impact;

      if (displayTechStack && item.dataset.tech) {
        const techArr = item.dataset.tech.split(',');
        displayTechStack.innerHTML = techArr.map(t => `<span style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#FFF; font-size:0.78rem; font-weight:700; padding:0.35rem 0.75rem; border-radius:6px;">${t.trim()}</span>`).join('');
      }
    });
  });

  // 3. MODAL POPUP SYSTEM
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalSummary = document.getElementById('modal-summary');
  const modalImpact = document.getElementById('modal-impact');
  const modalClose = document.getElementById('modal-close');

  const openModal = (title, category, summary, impact) => {
    if (modalTitle) modalTitle.innerText = title;
    if (modalCategory) modalCategory.innerText = category;
    if (modalSummary) modalSummary.innerText = summary;
    if (modalImpact) modalImpact.innerText = impact;
    if (modalOverlay) modalOverlay.style.display = 'flex';
  };

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(
        btn.dataset.title || 'Project Case Study',
        btn.dataset.category || 'AI Agentic Pipeline',
        btn.dataset.summary || 'Detailed architecture implementation.',
        btn.dataset.impact || '90%+ Efficiency'
      );
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.style.display = 'none';
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.style.display = 'none';
    });
  }

  // 4. WEB3FORMS CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('web3forms-form');
  const submitBtn = document.getElementById('submit-btn');
  const successAlert = document.getElementById('form-success-alert');
  const errorAlert = document.getElementById('form-error-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'SENDING...';
      }
      if (errorAlert) errorAlert.style.display = 'none';

      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });

        const result = await response.json();

        if (result.success) {
          if (successAlert) successAlert.style.display = 'flex';
          contactForm.reset();
          if (submitBtn) submitBtn.innerText = 'MESSAGE SENT!';
          setTimeout(() => {
            if (successAlert) successAlert.style.display = 'none';
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerText = 'SEND INQUIRY';
            }
          }, 5000);
        } else {
          if (errorAlert) {
            errorAlert.innerText = result.message || 'Submission failed.';
            errorAlert.style.display = 'flex';
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = 'SEND INQUIRY';
          }
        }
      } catch (err) {
        if (errorAlert) {
          errorAlert.innerText = 'Network error. Please try again.';
          errorAlert.style.display = 'flex';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'SEND INQUIRY';
        }
      }
    });
  }

});
