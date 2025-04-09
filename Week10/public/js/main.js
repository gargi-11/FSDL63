// main.js - Client-side JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Hide alert messages after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    if (alerts.length > 0) {
        setTimeout(() => {
            alerts.forEach(alert => {
                alert.style.opacity = '0';
                alert.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    alert.style.display = 'none';
                }, 500);
            });
        }, 5000);
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            const requiredFields = form.querySelectorAll('[required]');
            let valid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('input-error');
                    
                    // Create error message if it doesn't exist
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.classList.remove('input-error');
                    
                    // Remove error message if it exists
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });

            // Validate price field if it exists
            const priceField = form.querySelector('#price');
            if (priceField && priceField.value) {
                const price = parseFloat(priceField.value);
                if (isNaN(price) || price < 0) {
                    valid = false;
                    priceField.classList.add('input-error');
                    
                    let errorMsg = priceField.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'Please enter a valid positive number';
                        priceField.parentNode.insertBefore(errorMsg, priceField.nextSibling);
                    }
                }
            }

            if (!valid) {
                event.preventDefault();
            }
        });
    });

    // Delete confirmation
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                event.preventDefault();
            }
        });
    });

    // Dynamic quantity field
    const inStockCheckbox = document.querySelector('#inStock');
    const quantityField = document.querySelector('#quantity');
    
    if (inStockCheckbox && quantityField) {
        inStockCheckbox.addEventListener('change', function() {
            if (this.checked) {
                quantityField.removeAttribute('disabled');
            } else {
                quantityField.setAttribute('disabled', 'disabled');
                quantityField.value = '0';
            }
        });
        
        // Initialize on page load
        if (!inStockCheckbox.checked) {
            quantityField.setAttribute('disabled', 'disabled');
        }
    }
});