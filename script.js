document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  document.querySelectorAll('[data-course]').forEach(link => link.addEventListener('click', () => {
    try { sessionStorage.setItem('aciSelectedCourse', link.dataset.course); } catch (_) {}
  }));
  const form = document.getElementById('enquiry');
  if (!form) return;
  try {
    const selected = sessionStorage.getItem('aciSelectedCourse');
    const course = document.getElementById('course');
    if (selected && course) {
      const option = [...course.options].find(o => o.text === selected);
      if (option) course.value = option.value;
      sessionStorage.removeItem('aciSelectedCourse');
    }
  } catch (_) {}
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const phone = document.getElementById('studentPhone').value.trim();
    const course = document.getElementById('course').value;
    const message = document.getElementById('message').value.trim();
    const error = document.getElementById('formError');
    if (!name || !phone || !course || !message) {
      error.textContent = 'Please fill in all required fields.';
      return;
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      error.textContent = 'Please enter a valid mobile number.';
      return;
    }
    error.textContent = '';
    const text = `Admission Enquiry - Army Computer Institute\n\nStudent Name: ${name}\nStudent Mobile: ${phone}\nCourse Interested In: ${course}\nQuery: ${message}\n\nInstitute: Army Computer Institute\nDirector: Sanjay Kanojiya`;
    const whatsappUrl = `https://wa.me/918953128683?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
});
