"use strict";
document.getElementById('loan-form').addEventListener('submit', function(e) {
    // Prevent default behavior
    e.preventDefault();

    // Show loading to better UI experience
    showLoading();

    // After two seconds, calculate the results and clear the loading
    setTimeout(function() {
        calculateResults();
        clearLoading();
    }, 2000);
});

// Calculate Results
function calculateResults() {
    // UI Elements
    const amount = getFromUI('#amount');
    const interest = getFromUI('#interest');
    const years = getFromUI('#years');
    const monthlyPayment = getFromUI('#monthly-payment');
    const totalPayment = getFromUI('#total-payment');
    const totalInterest = getFromUI('#total-interest');

    // Set values
    const principal = getValue(amount);
    const calculatedInterests = getValue(interest) / 100 / 12;
    const calculatedPayments = getValue(years) * 12;

    // Calculate monthly payment
    const x = Math.pow(1 + calculatedInterests, calculatedPayments);
    const monthly = (principal * x * calculatedInterests) / (x - 1);

    // If monthly is a legal number, display results
    if (isFinite(monthly)) {
        // Set values of each input
        setValue(monthlyPayment, monthly);
        setValue(totalPayment, (monthly * calculatedPayments));
        setValue(totalInterest, (monthly * calculatedPayments) - principal);
        // Display results
        getFromUI('#results').style.display = 'block';
    } else {
        // If the error is not being displayed, show it
        if (!getFromUI('.alert')) {
            // Show error message
            showError('Please check your numbers');
        }  
    }
}

// UTILS
function getFromUI(selector) {
    return document.querySelector(selector);
}

function getValue(element) {
    return parseFloat(element.value);
}

function setValue(element, newValue) {
    element.value = newValue.toFixed(2);
}

function clearError() {
    getFromUI('.alert').remove();
}

function showError(error) {
    // UI Elements
    const card = getFromUI('.card');
    const heading = getFromUI('.heading');

    // Create a div, add class and set error text
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Hide results
    getFromUI('#results').style.display = 'none';

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function showLoading() {
    // Hide results
    getFromUI('#results').style.display = 'none';
    // Show loader
    getFromUI('#loading').style.display = 'block';
    // Reset results
    clearResults();
}

function clearLoading() {
    // Hide loader
    getFromUI('#loading').style.display = 'none';
}

function clearResults() {
    getFromUI('#monthly-payment').value = '';
    getFromUI('#total-payment').value = '';
    getFromUI('#total-interest').value = '';
}