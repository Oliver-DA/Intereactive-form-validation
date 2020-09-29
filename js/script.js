document.addEventListener('DOMContentLoaded',() => {


    //HELPER FUNCTIONS

    //Takes an array of ids an returns a new array with all the elements that matched the id
    function getByIds (ids) {

        const elements = [];

        for (let id of ids) {
            let element = document.getElementById(id);
            elements.push(element);
        }
        return elements;
    }

    //Creates a p tag with an erorr message(text) and inserts it to (father).
    function createError (text,father) {

        const error = document.createElement("p");
        error.textContent = text;
        error.style.color = "red";
        error.hidden = true;
        father.insertAdjacentElement("afterend",error);
        return error
    }

    //Takes a "e" (short for element) and a value if value == hide.
    //returns e.hidden property set to true else set to false.
    const hideOrshow = (e,value) => e.hidden = value == "hide" ? true:false;

    //Array descructuring to assign the matches from (getByIds)
    //expample => 'const[userNameInput] will be assign the value of
    //the first element of ids(Array) which is "name" then emailInput
    //the value found with the id "mail" (second id in ids) and so on...
    const [userNameInput,emailInput,title,
        jobRole,design,colors,shirtColors] = getByIds(
        ["name","mail","title","other-title",
        "design","color","shirt-colors"]);



    //Focus name field and hide  jobRole input
    hideOrshow(jobRole,'hide');
    userNameInput.focus();

    //Job Role field.
    title.addEventListener('change', e => {
        const titleChoice = e.target.value;
        //if titleChoice is equal to "other" set jobRole's hidden property to false otherwise true.
        jobRole.hidden = titleChoice === "other" ? false: true;
    });

    //Hide color selection and label
    hideOrshow(shirtColors,'hide');

    //Parsing html collection(colors) to an array and split it the colors with the Array.slice(start,end)
    const colorsArr = Object.values(colors);
    const js_puns = colorsArr.slice(0,3);
    const love_js = colorsArr.slice(3,);


    design.addEventListener("change",e => {
        const designChoice = e.target.value;

        if (designChoice === design[1].value){

            //Show colors and selection
            hideOrshow(shirtColors,'show');

            //Hide love_js colors and show js_puns Colors
            js_puns.forEach(e => hideOrshow(e,"show"));
            love_js.forEach(e => hideOrshow(e,"hide"));
            
            //Selects the fisrt color by default
            js_puns[0].selected = true
        }
        else if(designChoice === design[2].value) {

            //Show colors and selection
            hideOrshow(shirtColors,'show');

            //Hide js_puns colors and show love_js Colors
            love_js.forEach(e => hideOrshow(e,"show"));
            js_puns.forEach(e => hideOrshow(e,"hide"));
            
            //Selects the first color by default
            love_js[0].selected = true;

        } else {
            //Hide colors as well as all the options
            hideOrshow(shirtColors,'hide')
            colorsArr.forEach(option => hideOrshow(option,'hide'));
        }
    })

    //Activities
    const actControl = document.querySelector(".activities");
    const activities = document.querySelectorAll(".activities input");
    const costElement = document.createElement("span");
    let totalCost = 0;

    actControl.insertAdjacentElement("beforeend",costElement);

    actControl.addEventListener('change', e => {
        const target = e.target;
        const attr = "data-day-and-time";

        //If the current checkbox is checked add the value of "data-cost" to totalCost else substract it
        target.checked
        ? totalCost += Number(target.getAttribute("data-cost"))
        : totalCost -= Number(target.getAttribute("data-cost"))

        costElement.textContent = `Total: $${totalCost}`;
        
        for (let a of activities) {
            const label = a.parentNode;
            //if the target's "data-day-and-time" attribute matches the current's
            //and also are different activities then proceed.
            if (a.getAttribute(attr) === target.getAttribute(attr) && target !== a){

                //if current target is checked
                //assigns true or false to a.disabled(property)-(a = activitie with same data-day-and-time as current)
                //Change label's color to red.
                if (target.checked) {

                    a.disabled = true;
                    label.style.color = "red";

                } else {
                    a.disabled = false;
                    label.style.color = 'black'
                }
            }
        }

    });


    //PAYMENT INFORMATION

    const [paymentInfo,paypal,bitCoin,creditCard] = getByIds(["payment","paypal","bitcoin","credit-card"]);
    const paymentMethods = [paypal,bitCoin,creditCard];

    //Credit Card method selected by default
    paymentInfo[1].selected = true

    //Disables the "select payment" option from the select field.
    paymentInfo[0].disabled = true;

    //The value of select will be the payment information to dispay once the page loads.
    function showPayment(methods,select){
        
        //loops trough the methods(Array)
        for (let method of methods){
            
            //if the id of method is equal to select(argument) the current's method hidden property
            //is set to false otherwise to true.
            method.hidden = method.id === select ? false:true
        }
    }

    //Credit card willd be the first payment information to display.
    showPayment(paymentMethods,"credit-card");

    paymentInfo.addEventListener('change', e => {
        const method = e.target.value;
        
        //Call to the showPayment functoin with the user's selected paymet method as argument
        showPayment(paymentMethods,method)
    });


    //VALIDATION

    //Payment error are very similar so this function will take care of them by taking their value,regex,input and error messages
    //as arguments. since not all the erorr's are the same the switch statement helps to catch where we're at
    //and update the textContent Based on that.
    function paymenErorControl (value,regex,input,error,e) {

        if (value.trim("") === "") {

            hideOrshow(error,"show");
            //Updates Error message.
            switch (input.id) {
                case "cc-num":
                error.textContent = "Please provide a credir card number";
                break;

                case "zip":
                error.textContent ="Please provide a zipCode";
                break;

                case "cvv":
                cvvErorr.textContent = "Please provide cvv code";
                break;

                default:
                break;
            }
            input.style.border = "2px solid red";
            return e.preventDefault()
        }
        else if (!regex.test(value)) {

            hideOrshow(error,"show");
            //Update Error Message
            switch (input.id) {
                case "cc-num":
                error.textContent = "Card number must be between 13 and 16 digits long";
                break;

                case "zip":
                error.textContent ="Zip code must have at least 5 digits";
                break;

                case "cvv":
                cvvErorr.textContent = "cvv must be 3 digits long";
                break;

                default:
                break;
            }
            input.style.border = "2px solid red";
            return e.preventDefault()
        }
        input.style.border = "2px solid rgb(111, 157, 220)";
        hideOrshow(error,"hide");
        return true
    }

    //UserName Validation
    const nameErorr = createError("Please enter a name",userNameInput);

    function isValidName (e) {
        const name = userNameInput.value;

        if (name.length > 0) {

            //Hide Erorr
            hideOrshow(nameErorr,"hide")
            userNameInput.style.border = "2px solid rgb(111, 157, 220)";
            return true
        }

        userNameInput.style.border = "2px solid red";
        //Show Error
        hideOrshow(nameErorr,"show");
        return e.preventDefault()
    }

    //EmailAddress validation
    const emailError = createError("Please include an (@) and a domain like so example@example.com",emailInput);

    function isValidEmail(e){
        const email = emailInput.value;
        const regex = /^\w+@\w+\.(com|net|org)$/ig

        if (regex.test(email)) {
            emailInput.style.border = "2px solid rgb(111, 157, 220)";
            hideOrshow(emailError,"hide");
            return true
        }

        hideOrshow(emailError,"show");
        emailInput.style.border = "2px solid red";
        return e.preventDefault()
    }

    //Activitie Validation
    const activitieError = createError("Please select 1 or more activities",actControl);

    function isValidActtivitie (e) {
        
        //Loops trough the activities and if anyone's checked returns true, otherwise false.
        for (let a of activities) {
            
            if (a.checked) {
                hideOrshow(activitieError,"hide")
                return true
            }
        }

        hideOrshow(activitieError,"show");
        return e.preventDefault()
    }

    //Declaration of the paymentMethods INPUTS
    const [zipCodeInput,cvvInput,creditCardInput] = getByIds(["zip","cvv","cc-num"])

    //CreditCard Validation
    const cardErorr = createError("",creditCardInput);

    function isValidCreditCard (e) {

        const creditCard = creditCardInput.value;

        paymenErorControl(creditCard,/^\d{13,16}$/,creditCardInput,cardErorr,e)
    }

    //ZipCode Validation
    const zipError = createError("",zipCodeInput);
    function isValidZipcode (e) {
        const zipCode = zipCodeInput.value
        paymenErorControl(zipCode,/\d{5,}/,zipCodeInput,zipError,e)
    }

    //CVV code Validation
    const cvvErorr = createError("",cvvInput);
    function isValidCvv (e) {
        const cvv = cvvInput.value
        paymenErorControl(cvv,/^\d{3}$/,cvvInput,cvvErorr,e)
    }

    //Event listeners
    userNameInput.addEventListener("keyup",isValidName);
    emailInput.addEventListener("keyup",isValidEmail);
    actControl.addEventListener("change",isValidActtivitie);
    creditCardInput.addEventListener("blur",isValidCreditCard);
    zipCodeInput.addEventListener("keyup",isValidZipcode);
    cvvInput.addEventListener("keyup",isValidCvv);

    const form = document.querySelector('form');

    form.addEventListener('submit',e => {
        isValidName(e);
        isValidEmail(e);
        isValidActtivitie(e);
        if (paymentInfo[1].selected == true) {
            isValidCreditCard(e);
            isValidZipcode(e);
            isValidCvv(e);
        }

    })
});

