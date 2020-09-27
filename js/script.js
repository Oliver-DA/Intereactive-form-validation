document.addEventListener('DOMContentLoaded',() => {

    const getById = id => document.getElementById(id);

    const userNameInput = getById('name');
    const title = getById("title");
    const jobRole = getById('other-title');
    const design = getById("design");
    const colors = getById("color");

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







});

