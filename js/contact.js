/* =============================================
   CONTACT.JS — EmailJS Form Handler
   Setup steps:
   1. Sign up at https://www.emailjs.com/
   2. Add a Gmail service → copy the Service ID
   3. Create an email template → copy the Template ID
   4. Go to Account → copy your Public Key
   5. Replace the three placeholder values below
   ============================================= */

const EMAILJS_PUBLIC_KEY  = '4AEoEA391J3SEj0Fk';   // ← replace
const EMAILJS_SERVICE_ID  = 'service_nvdyagn';   // ← replace
const EMAILJS_TEMPLATE_ID = 'template_o4n8q6g';  // ← replace

document.addEventListener('DOMContentLoaded', () => {

  if (typeof emailjs === 'undefined') return;

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const btn    = form ? form.querySelector('button[type="submit"]') : null;

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    btn.disabled    = true;
    btn.textContent = 'Sending…';
    status.className = 'form-status';
    status.textContent = '';

    const params = {
      from_name:  form.from_name.value.trim(),
      from_email: form.from_email.value.trim(),
      subject:    form.subject.value.trim(),
      message:    form.message.value.trim(),
      to_name:    'Naveen Dudhyal'
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
      status.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
      status.className   = 'form-status success';
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      status.textContent = '✗ Something went wrong. Please email me directly at naveen.dudhyal.qa@gmail.com';
      status.className   = 'form-status error';
    } finally {
      btn.disabled    = false;
      btn.innerHTML   = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  });

});
