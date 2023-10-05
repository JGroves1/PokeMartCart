"use strict";

// dark mode toggle
    const toggle = document.querySelector("#toggle");
    const body = document.body;

    toggle.addEventListener("click", () => {
        body.classList.toggle("darkMode");
    });

// add to cart

// form validation
    // acquire the elements needed
    const form = document.querySelector("#contactForm");
    const fName = document.querySelector("#fName");
    const lName = document.querySelector("#lName");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const message = document.querySelector("#message");

    let errorSpans = document.querySelectorAll("#contactForm .errorMessage");
    const fNameError = errorSpans[0];
    const lNameError = errorSpans[1];
    const emailError = errorSpans[2];
    const phoneError = errorSpans[3];
    const messageError = errorSpans[4];

    // event listener
    form.addEventListener("submit", validateForm);

    // function
    function validateForm(e){
        // resets
        fNameError.style.display = "none";
        lNameError.style.display = "none";
        emailError.style.display = "none";
        phoneError.style.display = "none";
        messageError.style.display = "none";
        let isValid = true;

        // validate first name is at least 3 characters
        if(fName.value.length < 3) {
            fNameError.style.display = "block";
            isValid = false;
            e.preventDefault();
        }

        // validate last name is at least 3 character
        if(lName.value.length < 3) {
            lNameError.style.display = "block";
            isValid = false;
            e.preventDefault();
        }

        // get the contact method
        const contactMethod = document.querySelector("input[name=preferredContact]:checked").value;

        // if email -- validate email
        // email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(contactMethod === "email" && (!email.value || !emailRegex.test(email.value))) {
            emailError.style.display = "block";
            isValid = false;
            e.preventDefault();
        }

        // if phone or text -- validate phone
        // phone regex
        const phoneRegex = /^\(\d{3}\)\d{3}-\d{4}$/;
        if((contactMethod === "text" || contactMethod === "phone") && (!phone.value || !phoneRegex.test(phone.value))) {
            phoneError.style.display = "block";
            isValid = false;
            e.preventDefault();
        }
        
        if(message.value.length === 0){
            console.log("message error");
            messageError.style.display = "block";
            isValid = false;
            e.preventDefault();
        }
    }