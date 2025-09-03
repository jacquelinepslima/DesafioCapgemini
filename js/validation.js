// Validação modular de formulários
export function setupRealTimeValidation(form) {
    const fields = {
        'adName': { type: 'text', required: true, minLength: 2 },
        'startDate': { type: 'date', required: true },
        'endDate': { type: 'date', required: true },
        'investment': { type: 'number', required: true, min: 0.01, max: 1000000 }
    };

    Object.keys(fields).forEach(id => {
        const field = form.querySelector(`#${id}`);
        if (!field) return;
        field.addEventListener('blur', () => validateField(field, fields[id]));
        field.addEventListener('input', () => clearFieldError(field));
    });
}

export function validateField(field, rules) {
    let value = field.value.trim();
    let error = '';

    if (rules.required && !value) error = 'This field is required';
    if (rules.minLength && value.length < rules.minLength) error = `Minimum ${rules.minLength} characters`;
    if (rules.min !== undefined && parseFloat(value) < rules.min) error = `Minimum value: ${rules.min}`;
    if (rules.max !== undefined && parseFloat(value) > rules.max) error = `Maximum value: ${rules.max}`;

    if (rules.type === 'date' && value && isNaN(new Date(value).getTime())) error = 'Invalid date';

    if (error) showFieldError(field, error);
    else showFieldSuccess(field);

    return !error;
}

function showFieldError(field, message) {
    field.classList.add('error-field');
    field.classList.remove('success-field');
    let errorEl = field.parentNode.querySelector('.field-error');
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        field.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

function showFieldSuccess(field) {
    field.classList.remove('error-field');
    field.classList.add('success-field');
    const errorEl = field.parentNode.querySelector('.field-error');
    if (errorEl) errorEl.remove();
}

function clearFieldError(field) {
    field.classList.remove('error-field', 'success-field');
    const errorEl = field.parentNode.querySelector('.field-error');
    if (errorEl) errorEl.remove();
}