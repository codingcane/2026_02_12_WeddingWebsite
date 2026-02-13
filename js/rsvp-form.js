// RSVP Form - Validation, conditional logic, and submission

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  initFormValidation();
  initConditionalFields();
  initFormSubmission();
});

/**
 * Initialize real-time form validation
 */
function initFormValidation() {
  const form = document.getElementById('rsvp-form');

  // Validate on blur for each input
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });

    // Clear error on input
    input.addEventListener('input', function() {
      clearFieldError(this);
    });
  });
}

/**
 * Validate individual field
 */
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let error = '';

  // Required field check
  if (field.hasAttribute('required') && !value) {
    error = 'This field is required.';
  }

  // Specific validation rules
  if (value && !error) {
    switch (fieldName) {
      case 'email':
        if (!isValidEmail(value)) {
          error = 'Please enter a valid email address.';
        }
        break;

      case 'phone':
        if (value && !isValidPhone(value)) {
          error = 'Please enter a valid phone number.';
        }
        break;

      case 'guestName':
        if (value.length < 2) {
          error = 'Name must be at least 2 characters.';
        } else if (value.length > 100) {
          error = 'Name must be less than 100 characters.';
        }
        break;

      case 'guestCount':
        const count = parseInt(value);
        if (isNaN(count) || count < 1 || count > CONFIG.MAX_GUESTS) {
          error = `Guest count must be between 1 and ${CONFIG.MAX_GUESTS}.`;
        }
        break;
    }
  }

  if (error) {
    showFieldError(field, error);
    return false;
  } else {
    showFieldSuccess(field);
    return true;
  }
}

/**
 * Show field error
 */
function showFieldError(field, message) {
  clearFieldError(field);

  field.classList.add('error');
  field.classList.remove('success');

  const errorElement = document.createElement('span');
  errorElement.className = 'form-error';
  errorElement.textContent = message;
  errorElement.id = `${field.name}-error`;

  field.parentElement.appendChild(errorElement);

  // Announce error to screen readers
  field.setAttribute('aria-invalid', 'true');
  field.setAttribute('aria-describedby', errorElement.id);
}

/**
 * Show field success
 */
function showFieldSuccess(field) {
  // Only show success for completed required fields
  if (field.hasAttribute('required') && field.value.trim()) {
    field.classList.add('success');
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
  }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
  field.classList.remove('error', 'success');
  field.removeAttribute('aria-invalid');
  field.removeAttribute('aria-describedby');

  const existingError = field.parentElement.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }
}

/**
 * Initialize conditional fields (show/hide based on attending status)
 */
function initConditionalFields() {
  const attendingRadios = document.querySelectorAll('input[name="attending"]');
  const conditionalFieldset = document.getElementById('conditional-fields');
  const guestCountInput = document.getElementById('guestCount');

  if (!attendingRadios.length || !conditionalFieldset) return;

  // Handle attending status change
  attendingRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      const isAttending = this.value === 'yes';

      if (isAttending) {
        conditionalFieldset.classList.remove('hidden');
        conditionalFieldset.querySelectorAll('input, textarea, select').forEach(field => {
          field.setAttribute('required', 'required');
        });
      } else {
        conditionalFieldset.classList.add('hidden');
        conditionalFieldset.querySelectorAll('input, textarea, select').forEach(field => {
          field.removeAttribute('required');
          clearFieldError(field);
        });
        // Clear meal preferences
        const mealContainer = document.getElementById('meal-preferences-container');
        if (mealContainer) {
          mealContainer.innerHTML = '';
        }
      }
    });
  });

  // Handle guest count change to generate meal preference fields
  if (guestCountInput) {
    guestCountInput.addEventListener('change', function() {
      generateMealPreferenceFields(parseInt(this.value) || 0);
    });
  }
}

/**
 * Generate meal preference fields based on guest count
 */
function generateMealPreferenceFields(guestCount) {
  const container = document.getElementById('meal-preferences-container');
  if (!container) return;

  container.innerHTML = '';

  if (guestCount < 1) return;

  for (let i = 1; i <= guestCount; i++) {
    const guestDiv = document.createElement('div');
    guestDiv.className = 'guest-meal-group';

    const title = document.createElement('div');
    title.className = 'guest-meal-title';
    title.textContent = `Guest ${i} Meal Preference`;

    const checkboxGroup = document.createElement('div');
    checkboxGroup.className = 'form-checkbox-group';

    CONFIG.MEAL_OPTIONS.forEach(option => {
      const checkboxDiv = document.createElement('div');
      checkboxDiv.className = 'form-checkbox';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `meal-guest-${i}`;
      input.value = option;
      input.id = `meal-guest-${i}-${option.toLowerCase()}`;
      input.required = true;

      const label = document.createElement('label');
      label.setAttribute('for', input.id);
      label.textContent = option;

      checkboxDiv.appendChild(input);
      checkboxDiv.appendChild(label);
      checkboxGroup.appendChild(checkboxDiv);
    });

    guestDiv.appendChild(title);
    guestDiv.appendChild(checkboxGroup);
    container.appendChild(guestDiv);
  }
}

/**
 * Initialize form submission
 */
function initFormSubmission() {
  const form = document.getElementById('rsvp-form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
      // Skip hidden fields
      if (input.closest('.hidden')) return;

      if (!validateField(input)) {
        isValid = false;
      }
    });

    // Check radio groups
    const attendingChecked = form.querySelector('input[name="attending"]:checked');
    if (!attendingChecked) {
      showAlert('Please select whether you will be attending.', 'error', form);
      isValid = false;
    }

    // Validate meal preferences if attending
    if (attendingChecked && attendingChecked.value === 'yes') {
      const guestCount = parseInt(document.getElementById('guestCount').value) || 0;
      for (let i = 1; i <= guestCount; i++) {
        const mealSelected = form.querySelector(`input[name="meal-guest-${i}"]:checked`);
        if (!mealSelected) {
          showAlert(`Please select a meal preference for Guest ${i}.`, 'error', form);
          isValid = false;
          break;
        }
      }
    }

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Collect form data
    const formData = collectFormData(form);

    // Submit to Google Apps Script
    await submitRSVP(formData, form, submitBtn);
  });
}

/**
 * Collect form data
 */
function collectFormData(form) {
  const formData = {
    timestamp: new Date().toISOString(),
    guestName: form.querySelector('[name="guestName"]').value.trim(),
    email: form.querySelector('[name="email"]').value.trim(),
    phone: form.querySelector('[name="phone"]').value.trim(),
    attending: form.querySelector('input[name="attending"]:checked').value,
  };

  // Only collect additional data if attending
  if (formData.attending === 'yes') {
    const guestCount = parseInt(form.querySelector('[name="guestCount"]').value);
    formData.guestCount = guestCount;
    formData.guestNames = form.querySelector('[name="guestNames"]')?.value.trim() || '';
    formData.dietaryRestrictions = form.querySelector('[name="dietaryRestrictions"]')?.value.trim() || '';
    formData.specialRequests = form.querySelector('[name="specialRequests"]')?.value.trim() || '';

    // Collect meal preferences
    const mealPreferences = [];
    for (let i = 1; i <= guestCount; i++) {
      const meal = form.querySelector(`input[name="meal-guest-${i}"]:checked`)?.value || '';
      mealPreferences.push(`Guest ${i}: ${meal}`);
    }
    formData.mealPreferences = mealPreferences.join('; ');
  } else {
    formData.guestCount = 0;
    formData.guestNames = '';
    formData.mealPreferences = 'Not attending';
    formData.dietaryRestrictions = '';
    formData.specialRequests = '';
  }

  return formData;
}

/**
 * Submit RSVP to Google Apps Script
 */
async function submitRSVP(formData, form, submitBtn) {
  // Check if Apps Script URL is configured
  if (!CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
    showAlert('RSVP form is not configured yet. Please set up Google Apps Script. See docs/SETUP.md for instructions.', 'error', form);
    return;
  }

  // Disable submit button
  submitBtn.disabled = true;
  const originalBtnText = submitBtn.textContent;
  submitBtn.innerHTML = '<span class="spinner spinner-small"></span> Submitting...';

  showLoading('Submitting your RSVP...');

  try {
    const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    // Note: With no-cors mode, we can't read the response
    // We assume success if no error is thrown
    hideLoading();

    // Show success message
    showSuccessMessage(form, formData.attending === 'yes');

    // Reset form
    form.reset();
    const mealContainer = document.getElementById('meal-preferences-container');
    if (mealContainer) {
      mealContainer.innerHTML = '';
    }
    const conditionalFields = document.getElementById('conditional-fields');
    if (conditionalFields) {
      conditionalFields.classList.add('hidden');
    }

  } catch (error) {
    hideLoading();
    console.error('Error submitting RSVP:', error);
    showAlert('There was an error submitting your RSVP. Please try again or contact us directly.', 'error', form);
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
}

/**
 * Show success message
 */
function showSuccessMessage(form, isAttending) {
  const message = isAttending
    ? 'Thank you for your RSVP! We look forward to celebrating with you.'
    : 'Thank you for letting us know. You will be missed!';

  const successDiv = document.createElement('div');
  successDiv.className = 'rsvp-success';
  successDiv.innerHTML = `
    <div class="rsvp-success-icon">✓</div>
    <h2>RSVP Received!</h2>
    <p>${message}</p>
    <p class="text-secondary text-sm">A confirmation has been sent to your email.</p>
    <button type="button" class="btn btn-primary" onclick="location.reload()">Submit Another RSVP</button>
  `;

  const formContainer = form.parentElement;
  form.style.display = 'none';
  formContainer.appendChild(successDiv);

  // Scroll to success message
  successDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
