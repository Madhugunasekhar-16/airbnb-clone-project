(() => {
  'use strict';

  // Select all forms with class 'needs-validation'
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // If the form is invalid, prevent submission
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Add Bootstrap's was-validated class to trigger red borders
      form.classList.add('was-validated');
    }, false);
  });
})();
