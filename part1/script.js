const ratingInput = document.getElementById('rating');
const form = document.querySelector('form');
const container = ratingInput.parentElement;
let currentRating = ratingInput.value;
const messageDiv = document.createElement('div'); // Create a div for the message
container.appendChild(messageDiv); // Append the message div to the container

// Function to get the message based on rating
function getMessage(rating) {
    const messages = {
        5: "Thanks for the 5 star rating!",
        4: "Thanks for the 4 star rating!",
        3: "Thank you for the feedback of 3 stars, we will try to do better!",
        2: "Thank you for your feedback of 2 stars, we will work on improving!",
        1: "We appreciate your feedback of 1 star and will strive to improve."
    };
    return messages[rating] || ""; // Return the corresponding message or empty string
}

// Create and append stars
for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.innerHTML = '☆';
    star.style.cursor = 'pointer';
    star.dataset.value = i;

    star.onmouseover = function() {
        updateStars(container, star.dataset.value);
    };

    star.onclick = function() {
        currentRating = star.dataset.value;
        ratingInput.value = currentRating;
        submitFormWithRating(currentRating);
        messageDiv.textContent = getMessage(currentRating); // Update the message
    };

    container.insertBefore(star, ratingInput);
}

// Reset to current rating when not hovering
container.onmouseout = function() {
    updateStars(container, currentRating);
};

// Hide the original numeric input
ratingInput.style.display = 'none';

// Function to submit the form with JavaScript
function submitFormWithRating(rating) {
    fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Sent-By': 'JS' // Custom header
        },
        body: `rating=${rating}&sentBy=js` // Form data with custom value
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Function to update the visual appearance of stars
function updateStars(container, value) {
    const stars = container.querySelectorAll('span');
    // stars.forEach(star => {
    //     star.innerHTML = star.dataset.value <= value ? '★' : '☆';
    // });
    stars.forEach(star => {
        if (star.dataset.value <= value) {
            star.innerHTML = getComputedStyle(document.documentElement).getPropertyValue('--star-symbol');
            star.style.color = getComputedStyle(document.documentElement).getPropertyValue('--star-selected-color');
        } else {
            star.innerHTML = getComputedStyle(document.documentElement).getPropertyValue('--star-symbol');
            star.style.color = getComputedStyle(document.documentElement).getPropertyValue('--star-unselected-color');
        }
    });
}