document.addEventListener('DOMContentLoaded',() => {

    const form = document.querySelector("form");

    function getByIds (ids) {
        const elements = [];

        for (let id of ids) {
            let element = document.getElementById(id);
            elements.push(element);
        }
        return elements;
    }

    function getById(id) {
        return document.getElementById(id)
    }

    const [
        userNameInput,emailInput,title,
        jobRole,design,colors,paymentInfo,
        paypal,bitCoin,creditCard,shirtColors,
        ] = getByIds(
        ["name","mail","title","other-title",
        "design","color","payment","paypal",
        "bitcoin","credit-card","shirt-colors"]);

    //Helper Functions
    function createError (text,father) {

        const error = document.createElement("p");
        error.textContent = text;
        error.style.color = "red";
        error.hidden = true;
        father.insertAdjacentElement("afterend",error);
        return error
    }

    const hideOrshow = e => e.hidden = e.hidden ? false:true;


    //Starting the form
    hideOrshow(jobRole);
    userNameInput.focus();

    //Job Role field.
    title.addEventListener('change', e => {
        const titleChoice = e.target.value;
        jobRole.hidden = titleChoice === "other" ? false: true;
    });

    //Hide color selection and label
    hideOrshow(shirtColors);

    //Parsing html collection to an array and split it the colors with the Array.slice(start,end)
    const colorsArr = Object.values(colors);
    const js_puns = colorsArr.slice(0,3);
    const love_js = colorsArr.slice(3,);

    design.addEventListener("change",e => {
        const designChoice = e.target.value;

        if (designChoice === design[1].value){

            shirtColors.hidden = false;
            
            for (let i = 0; i < js_puns.length; i++) {

                js_puns[i].hidden = false;
                love_js[i].hidden = true;
                
            };

            js_puns[0].selected = true
        }
        else if(designChoice === design[2].value) {

            shirtColors.hidden = false;

            for (let i = 0; i < love_js.length; i++) {
                love_js[i].hidden = false;
                js_puns[i].hidden = true;
            };
            
            love_js[0].selected = true;

        } else {
            hideOrshow(shirtColors)
            colorsArr.every(option => hideOrshow(option));
        }
    })

    //Activities
    const actControl = document.querySelector(".activities");
    const activities = document.querySelectorAll(".activities input");
    let totalCost = 0;
    const costElement = document.createElement("span");

    actControl.insertAdjacentElement("beforeend",costElement);


    actControl.addEventListener('change', e => {
        const target = e.target;
        const attr = "data-day-and-time";

        target.checked
        ? totalCost += Number(target.getAttribute("data-cost"))
        : totalCost -= Number(target.getAttribute("data-cost"))

        costElement.textContent = `Total: $${totalCost}`;
        
        for (let a of activities) {

            if (a.getAttribute(attr) === target.getAttribute(attr) && target !== a){

                (a.disabled = target.checked ? true:false )
            }
        }
    });


    //Payment Information

    const paymentMethods = [paypal,bitCoin,creditCard];

    function showPayment(methods,select){
        
        for (let method of methods){
            method.hidden = method.id === select ? false:true
        }
    }

    showPayment(paymentMethods,"credit-card")

    paymentInfo[1].selected = true;
    paymentInfo[0].disabled = true;

    paymentInfo.addEventListener('change', e => {
        const target = e.target.value;
        showPayment(paymentMethods,target)
    });

    //Validations
    const nameErorr = createError("Please enter a name",userNameInput);

    function isValidName () {
        const name = userNameInput.value;

        if (name.length > 0) {
            nameErorr.hidden = true;
            userNameInput.style.border = "2px solid rgb(111, 157, 220)";
            return true
        }
        userNameInput.style.border = "2px solid red";
        nameErorr.hidden = false;
        return false
    }

    userNameInput.addEventListener("input",e => {
        isValidName();
    });

    const emailError = createError("Please include an (@) and a (.)",emailInput);

    function isValidEmail(){
        const email = emailInput.value;
        const ad = email.indexOf("@");
        const dot = email.lastIndexOf(".");

        if (ad > 0 && dot > ad + 1){
            emailInput.style.border = "2px solid rgb(111, 157, 220)";
            emailError.hidden = true;
            return true
        }
        emailError.hidden = false;
        emailInput.style.border = "2px solid red";
        return false
    }
    emailInput.addEventListener("keyup",e =>{
        isValidEmail()
    })


    const activitieError = createError("Please select 1 or more activities",actControl);
    function isValidActtivitie () {
        
        for (let a of activities) {
            
            if (a.checked) {
                activitieError.hidden = true
                return true
            }
        }
        activitieError.hidden = false;
        return false
    }

    actControl.addEventListener("change",e =>{
        isValidActtivitie()
    })

    const zipCodeInput = getById("zip");
    const cvvInput = getById("cvv");
    const creditCardInput = getById("cc-num");

    const cardErorr = createError("",creditCardInput)
    function isValidCreditCard () {
        const card = creditCardInput.value;
        const reg = /^\d{13,16}$/;

        if (card.trim("") === ""){
            cardErorr.hidden = false;
            cardErorr.textContent = "Please provide a credir card number";
            creditCardInput.style.border = "2px solid red";
            return false
        }
        else if(!reg.test(card)) {
            cardErorr.hidden = false;
            cardErorr.textContent = "Card number must be between 13 and 16 digits long";
            creditCardInput.style.border = "2px solid red";
            return false
        }
        creditCardInput.style.border = "2px solid rgb(111, 157, 220)";
        cardErorr.hidden = true;
        return true
    }

    const zipError = createError("",zipCodeInput)
    function isValidZipcode(){
        const zipCode = zipCodeInput.value;
        const reg = /\d{5,}/;

        if (zipCode.trim("") === "") {
            zipError.hidden = false
            zipError.textContent = "Please enter a zip Code"
            zipCodeInput.style.border = "2px solid red";
            return false
        }

        if (!reg.test(zipCode)) {
            zipError.hidden = false
            zipError.textContent = "Zip code must have at least 5 digits"
            zipCodeInput.style.border = "2px solid red";
            return false
        }
        zipError.hidden = true
        zipCodeInput.style.border = "2px solid rgb(111, 157, 220)";
        return true
        
    }

    const cvvErorr = createError("",cvvInput);
    function isValidCvv () {
        const cvv = cvvInput.value;
        const reg = /^\d{3}$/;

        if (cvv.trim("") === "") {
            cvvErorr.hidden = false
            cvvErorr.textContent = "Please enter a cvv Code"
            cvvInput.style.border = "2px solid red";
            return false
        }

        if (!reg.test(cvv)) {
            cvvErorr.textContent = "CVV must be 3 digits long";
            cvvInput.style.border = "2px solid red";
            cvvErorr.hidden = false
            return false
        }
        cvvErorr.hidden = true
        cvvInput.style.border = "2px solid rgb(111, 157, 220)";
        return true

    }

    creditCardInput.addEventListener("blur", () => {
        isValidCreditCard()
    });

    zipCodeInput.addEventListener("keyup", () => {
        isValidZipcode();
    });

    cvvInput.addEventListener("keyup", () => {
        isValidCvv()
    });


    



});

