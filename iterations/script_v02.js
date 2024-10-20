'use strict';

// dark mode toggle
    const toggle = document.querySelector("#toggle");
    const body = document.body;

    toggle.addEventListener("click", () => {
        body.classList.toggle("darkMode");
    });

// shopping functions
    // bag array
    let bag = [];

    // acquire the buttons
    const btns = document.querySelectorAll(".addBtn"); 

    // loopy loop through buttons
    btns.forEach(button => {

        //event listener
        button.addEventListener("click", () => {
            
        // more aquiring
        const item = button.closest(".balls, .meds, .evo");
        const productName = item.querySelector(".productName").textContent;   
        const price = item.querySelector(".itemPrice").textContent;
        const img = item.querySelector(".productImg").getAttribute("src");

        // create the objects/details
        const itemDetails = {
            name: productName,
            price: price, 
            img: img
        };

        // adding stuff to array
        bag.push(itemDetails);

        // add to subtotal
        subtotal += parseInt(itemDetails.price);

        // temp style the add to bag btn
        button.classList.add("addedToBag");
        button.innerHTML = "Added!";

        // the temp style timer
        setTimeout(() => {
            button.classList.remove("addedToBag");
            button.innerHTML = "Add to Bag";
            }, 1500);
                
        // show in the shopping list
            displayShoppingList();
            console.log(bag);
        });
            
    });

    // well first we have to clear the list
        function displayShoppingList(){
            const bagList = document.querySelector(".shoppingList");   
         
            bagList.innerHTML = "";
        
            // now we make a loop
            bag.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("itemCard");
                div.innerHTML = `
                    <div class="cartProductName">${item.name}</div>
                    <dv class="cartProductImg"><img src="${item.img}"></div>
                    <divi class="cartItemPrice">${item.price}</div>
                    `;

                bagList.appendChild(div);
            });

            // update subtotal
            subtotalP.innerHTML = `
            <img src="images/PokeCoin.png" class="checkoutCoin"> ${subtotal}
            `;
            
            // update total
            updateTotal();
        };

    // remove items from cart ??

    // bag math
        // declare the rates
        const taxRate = 0.065;
        const shipping = 50;
        let tax = 0; 
        let subtotal = 0;
        let total = 0;

        // outputPs (even though they are spans)
        const subtotalP = document.querySelector(".subtotal");
        const taxP = document.querySelector(".tax");
        const shippingP = document.querySelector(".shipping");
        const totalP = document.querySelector(".total");
        
        // now the function
        function updateTotal() {
            // first calc tax since subtotal is already taken care of
            let tax = subtotal * taxRate;

            // outputP
            taxP.innerHTML = `
                <img src="images/PokeCoin.png" class="checkoutCoin"> ${tax.toFixed(0)}
            `;
            // please note that I rounded because there aren't partial cents in Poke coins

            // next output the shipping rate (currently flat rate 50 pokecoins)
            shippingP.innerHTML = `
                <img src="images/PokeCoin.png" class="checkoutCoin"> ${shipping.toFixed(0)}
            `;

            // calculate the total
            let total = subtotal + tax + shipping;

            // output P
            totalP.innerHTML = `
                <img src="images/PokeCoin.png" class="checkoutCoin"> ${total.toFixed(0)}
            `;
        }
        // I may have over commented on this function lol

    // checkout (clears bag)
        const checkoutBtn = document.querySelector("#checkoutBtn");
        checkoutBtn.addEventListener("click", checkout);

        function checkout() {
            // acquiring elements so I can create the alert
            let totalP = document.querySelector(".total");
            let checkoutCoin = totalP.querySelector("img");
            checkoutCoin.remove();
            let total = totalP.innerHTML.trim();
            console.log(total);

            // alert/kthnxbai
            alert(`Thank you for your order, trainer! You spent ${total} Poké Coins on some top quality products!`); 

            // clear cart
            bag = [];

            // clear DOM
            displayShoppingList();           
            
            // reset the math fields
            subtotal = 0; 

            // reset the outputPs 
            subtotalP.textContent = subtotal;
            taxP.textContent = tax;
            shippingP.innerHTML = "0";
            totalP.innerHTML = "0";
        }

// form validation
    // acquire the elements needed
    const form = document.querySelector("#contactForm");
    const fName = document.querySelector("#fName");
    const lName = document.querySelector("#lName");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const message = document.querySelector("#message");
    // and error spans
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

        // validate first name is at least 3 characters (cause Bob is a name)
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

    // format the phone number after the user types it for a lil better UX
        // acquire the phone input
        const phoneInput = document.querySelector("#phone");

        // add the event listener
        phoneInput.addEventListener("input", formatPhone);
    
        // the function 
        function formatPhone(e) {
            // remove formatting
            let phone = e.target.value.replace(/[^\d]/g, "");

            // length test
            if(phone.length < 10) {
                return;
            }

            // format pretty
            phone = "(" + phone.substring(0,3) + ")" + phone.substring(3,6) + "-" + phone.substring(6);

            // update input
            e.target.value = phone;
        }