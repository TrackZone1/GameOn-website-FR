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

// fermer la modal
function closeModal() {
    modalbg.style.display = "none";
}

// Fonction pour effacer tous les messages d'erreur
function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
        element.textContent = "";
        element.style.display = "none";
    });
}

// Fonction pour afficher un message d'erreur
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + "-error");
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }
}

// Fonction pour afficher le message de confirmation
function showConfirmation() {
    const confirmationElement = document.getElementById("confirmation-message");
    if (confirmationElement) {
        confirmationElement.textContent =
            "Merci ! Votre réservation a été reçue.";
        confirmationElement.style.display = "block";
    }
}

// Fonction pour masquer le message de confirmation
function hideConfirmation() {
    const confirmationElement = document.getElementById("confirmation-message");
    if (confirmationElement) {
        confirmationElement.textContent = "";
        confirmationElement.style.display = "none";
    }
}

function validate() {
    const form = document.querySelector('form[name="reserve"]');
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);

    // Effacer tous les messages d'erreur précédents
    clearErrors();

    // Masquer le message de confirmation précédent
    hideConfirmation();

    // Validation des champs
    let isValid = true;

    // (1) Prénom - minimum 2 caractères
    if (!formDataObject.first || formDataObject.first.trim().length < 2) {
        isValid = false;
        showError(
            "first",
            "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
        );
    }

    // (2) Nom de famille - minimum 2 caractères
    if (!formDataObject.last || formDataObject.last.trim().length < 2) {
        isValid = false;
        showError(
            "last",
            "Veuillez entrer 2 caractères ou plus pour le champ du nom."
        );
    }

    // (3) Email valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formDataObject.email || !emailRegex.test(formDataObject.email)) {
        isValid = false;
        showError("email", "Veuillez saisir une adresse email valide.");
    }

    // (4) Date de naissance
    if (!formDataObject.birthdate) {
        isValid = false;
        showError("birthdate", "Vous devez entrer votre date de naissance.");
    }

    // (5) Nombre de concours - valeur numérique
    if (
        !formDataObject.quantity ||
        isNaN(formDataObject.quantity) ||
        formDataObject.quantity < 0
    ) {
        isValid = false;
        showError("quantity", "Veuillez saisir un nombre valide de concours.");
    }

    // (6) Bouton radio sélectionné
    if (!formDataObject.location) {
        isValid = false;
        showError("location", "Vous devez choisir une option.");
    }

    // (7) Case des conditions générales cochée
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
        closeModal();
        showConfirmation();
        return false;
    } else {
        return false;
    }
}
