window.addEventListener("load", function(){

    let errors = {}; // Contenedor global de errores

    // ************* Elementos *************

    let userInput = document.getElementById("user-input");
    let password = document.getElementById("password");
    let userInputAlert = document.getElementById("user-input-alert");
    let passwordAlert = document.getElementById("password-alert");

    let form = document.getElementById("login-form");

    // ************* Validaciones *************

    function validateUserInput(){
        // Se evitan los espacios por delante y por detras
        userInput.value = userInput.value.trim();
        
        let feedback;

        if(userInput.value == "") {
            feedback = "Campo obligatório";
        } else if(userInput.value.length < 2 || userInput.value.length > 255 ) feedback = "Debe tener entre 2 y 255 caracteres";

        if (feedback) {
            userInput.classList.add("input-alert");
            userInputAlert.innerText = feedback;
        } else {
            userInput.classList.remove("input-alert");
            userInputAlert.innerText = "";
        }
    }

    function validatePassword(){
        
        let feedback;

        if(password.value == "") {
            feedback = "Campo obligatório";
        } else if(password.value.length > 255) {
            feedback = "La contraseña no puede tener más de 255 caracteres";
        } else if(password.value.length < 8) {
            feedback = "Debe tener al menos 8 caracteres";
        } 

        if (feedback) {
            password.classList.add("input-alert");
            passwordAlert.innerText = feedback;
        } else {
            password.classList.remove("input-alert");
            passwordAlert.innerText = "";
        }
    }

    // ************* Controladores de eventos *************

    userInput.addEventListener("blur", validateUserInput);
    password.addEventListener("blur", validatePassword);

    form.addEventListener("submit", function(event){
        // Ataja el caso en que se intente enviar el formulario sin haber interactuado con los campos
        validateUserInput();
        validatePassword();

        if(Object.keys(errors).length){
            event.preventDefault();
        }

    });

});