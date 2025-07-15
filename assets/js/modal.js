function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal
function closeModal() {
    modalbg.style.display = "none";
    // Reset modal state
    hideConfirmation();
}

// Function to clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
        element.textContent = "";
        element.style.display = "none";
    });

    // Remove error class from all inputs
    const inputs = document.querySelectorAll(".text-control");
    inputs.forEach((input) => {
        input.classList.remove("error");
    });
}

// Function to display an error message
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + "-error");
    const inputElement = document.getElementById(fieldId);

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    // Add error class to the input
    if (inputElement && inputElement.classList.contains("text-control")) {
        inputElement.classList.add("error");
    }
}

// Function to display the confirmation message
function showConfirmation() {
    const confirmationElement = document.getElementById("confirmation-message");
    const form = document.querySelector('form[name="reserve"]');

    if (confirmationElement && form) {
        // Hide the form
        form.style.display = "none";

        // Display the confirmation message
        confirmationElement.innerHTML = `
            <h2>Merci pour<br/>votre inscription</h2>
            <button class="btn-submit" onclick="closeModal()">Fermer</button>
        `;
        confirmationElement.style.display = "block";
    }
}

// Function to hide the confirmation message
function hideConfirmation() {
    const confirmationElement = document.getElementById("confirmation-message");
    const form = document.querySelector('form[name="reserve"]');

    if (confirmationElement && form) {
        confirmationElement.innerHTML = "";
        confirmationElement.style.display = "none";
        // Show the form again
        form.style.display = "block";
    }
}

function validate() {
    const form = document.querySelector('form[name="reserve"]');
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);

    // Clear all previous error messages
    clearErrors();

    // Hide previous confirmation message
    hideConfirmation();

    // Field validation
    let isValid = true;

    // (1) First name - minimum 2 characters
    if (!formDataObject.first || formDataObject.first.trim().length < 2) {
        isValid = false;
        showError(
            "first",
            "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
        );
    }

    // (2) Last name - minimum 2 characters
    if (!formDataObject.last || formDataObject.last.trim().length < 2) {
        isValid = false;
        showError(
            "last",
            "Veuillez entrer 2 caractères ou plus pour le champ du nom."
        );
    }

    // (3) Valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formDataObject.email || !emailRegex.test(formDataObject.email)) {
        isValid = false;
        showError("email", "Veuillez saisir une adresse email valide.");
    }

    // (4) Birthdate
    if (!formDataObject.birthdate) {
        isValid = false;
        showError("birthdate", "Vous devez entrer votre date de naissance.");
    }

    // (5) Number of tournaments - numeric value
    if (
        !formDataObject.quantity ||
        isNaN(formDataObject.quantity) ||
        formDataObject.quantity < 0
    ) {
        isValid = false;
        showError("quantity", "Veuillez saisir un nombre valide de concours.");
    }

    // (6) Radio button selected
    if (!formDataObject.location) {
        isValid = false;
        showError("location", "Vous devez choisir une option.");
    }

    // (7) Terms and conditions checkbox checked
    const checkbox1 = document.getElementById("checkbox1");
    if (!checkbox1.checked) {
        isValid = false;
        showError(
            "checkbox1",
            "Vous devez vérifier que vous acceptez les termes et conditions."
        );
    }

    if (isValid) {
        console.log(formDataObject);
        form.reset();
        showConfirmation();
        return false;
    } else {
        return false;
    }
}
