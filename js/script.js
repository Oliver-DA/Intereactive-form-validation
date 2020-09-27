document.addEventListener('DOMContentLoaded',() => {

    const getById = id => document.getElementById(id);

    const userNameInput = getById('name');
    const emailInput = getById("mail");
    const title = getById("title");
    const jobRole = getById('other-title');
    const design = getById("design");
    const colors = getById("color");
    const paymentInfo = getById("payment")
    const paypal = getById("paypal");
    const bitCoin = getById("bitcoin");
    const creditCard = getById("credit-card")

    //Starting the form
    jobRole.hidden = true;
    const colorsArr = Object.values(colors);
    colorsArr.every(option => option.hidden = true);
    userNameInput.focus();

    //Job Role field.
    title.addEventListener('change', e => {
        const titleChoice = e.target.value;
        jobRole.hidden = titleChoice === "other" ? false: true;
    });

    const js_puns = colorsArr.slice(1,4);
    const love_js = colorsArr.slice(4,);


    design.addEventListener("change",e => {
        const designChoice = e.target.value;

        if (designChoice === design[1].value){

            for (let i = 0; i < js_puns.length; i++) {
                js_puns[i].hidden = false;
                love_js[i].hidden = true;
                
            };
            js_puns[0].selected = true
        }
        else if(designChoice === design[2].value) {

            for (let i = 0; i < love_js.length; i++) {
                love_js[i].hidden = false;
                js_puns[i].hidden = true;
            };
            love_js[0].selected = true;

        } else {
            colorsArr.every(option => option.hidden = true);
            colorsArr[0].selected = true;
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


    function isValidName () {
        const name = userNameInput.value;

        if (name.length > 0) {
            userNameInput.style.border = "2px solid rgb(111, 157, 220)";
            return true
        }
        userNameInput.style.border = "2px solid red";
        return false
    }

    userNameInput.addEventListener("blur",e => {
        isValidName();
    })

    function isValidEmail(){
        const email = emailInput.value;
        const ad = email.indexOf("@");
        const dot = email.lastIndexOf(".");

        if (ad > 0 && dot > ad + 1){
            emailInput.style.border = "2px solid rgb(111, 157, 220)";
            return true
        }
        emailInput.style.border = "2px solid red";
        return false
    }
    emailInput.addEventListener("blur",e =>{
        isValidEmail()
    })

    function isValidActtivitie () {

    }

    function isValidCreditCard () {

    }




});

