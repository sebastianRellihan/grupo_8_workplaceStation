window.addEventListener("load", function(){

    let errors = {}; // Contenedor global de errores
    const ALLOWED_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"];

    // ************* Elementos *************
    let name = document.getElementById("name");
    let lastName = document.getElementById("last-name");
    let email = document.getElementById("email");
    let userName = document.getElementById("user-name");
    let password = document.getElementById("password");
    let passwordCheck = document.getElementById("password-check");
    let birth = document.getElementById("birth");
    let address = document.getElementById("address");
    let profilePhoto = document.getElementById("profile-photo");

    let form = document.getElementById("user-form");

    /**
     * Función que se encarga de dar un feedback visual al usuario. Esta toma el elemento
     * siguiente al input y muestra el mensaje de errores provisto por la validación.
     * @param {Object} element La instancia del DOM que representa el input en el que se
     *                         originó el error de validación.
     * @param {String} feedback El mensaje de feedback para el usuario.
     */
    function handleFeedback(element, feedback){
        // Referencia al elemento que muestra las alertas, siendo un "p" con clase "alert-label"
        let feedbackElement = element.nextElementSibling;
        
        if(feedback){
            element.classList.add("input-alert");
            feedbackElement.innerHTML = feedback;
            errors[element.name] = feedback;
        } else {
            element.classList.remove("input-alert");
            feedbackElement.innerHTML = "";
            delete errors[element.name];
        }
        
    }

    // ************* Validaciones *************

    function validateName(){
        name.value = name.value.trim(); // Evita el relleno con espacios
        let feedback;

        if(name.value == "") feedback = "Campo obligatório";
        else if(name.value.length < 2 || name.value.length > 255 ) feedback = "Debe tener entre 2 y 255 caracteres";

        handleFeedback(name, feedback);
    }

    function validateLastName(){
        lastName.value = lastName.value.trim();
        let feedback;

        if(lastName.value == "") feedback = "Campo obligatório";
        else if(lastName.value.length < 2 || lastName.value.length > 255 ) feedback = "Debe tener entre 2 y 255 caracteres";

        handleFeedback(lastName, feedback);
    }
    
    function validateEmail(){
        email.value = email.value.trim();
        let feedback;

        // Expresión regular para validar la estructura del email
        // https://www.w3resource.com/javascript/form/email-validation.php
        let regexpEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

        if(email.value == "") feedback = "Campo obligatório";
        else if(!regexpEmail.test(email.value)) feedback = "Debe ingresar un mail válido";
        else if(email.value.length > 255 ) feedback = "Debe tener menos de 255 caracteres";

        handleFeedback(email, feedback);
    }

    function validateUserName(){
        userName.value = userName.value.trim();
        let feedback;

        if(userName.value == "") feedback = "Campo obligatório";
        else if(/\s/.test(userName.value)) feedback = "No puede contener espacios intermedios";
        
        handleFeedback(userName, feedback);
    }

    function validatePassword(){
        let feedback;
        // Expresiones regulares para el checkeo del formato
        let upper = new RegExp("[A-Z]");
        let lower = new RegExp("[a-z]");
        let number = new RegExp("[0-9]");

        if(password.value == "") feedback = "Campo obligatório";
        else if(password.value.length < 8 || password.value.length > 20) feedback = "Debe contener entre 8 y 20 caracteres";
        // Checkea que se cumplan todas las condiciones del formato
        else if(
                !(upper.test(password.value) && lower.test(password.value) && number.test(password.value))
               )
            feedback = "Debe contener al menos una minúscula, una mayúscula y un número";
        
        handleFeedback(password, feedback);
    }

    function validatePasswordCheck(){
        let feedback;

        if(passwordCheck.value == "") feedback = "Campo obligatório";
        else if(passwordCheck.value != password.value) feedback = "Ambas contraseñas deben coincidir";

        handleFeedback(passwordCheck, feedback);
    }

    function validateAddress(){
        address.value = address.value.trim();
        let feedback;

        if(address.value == "") feedback = "Campo obligatório";
        else if(address.value.length < 2 || address.value.length > 255 ) feedback = "Debe tener entre 2 y 255 caracteres";

        handleFeedback(address, feedback);
    }

    function validateBirth(){
        let feedback;

        if(birth.value == "") feedback = "Campo obligatório";

        handleFeedback(birth, feedback);
    }

    function validateProfilePhoto(){
        
        let feedback;
        let file = profilePhoto.files[0];

        if(!file) feedback = "Campo obligatório";
        if(!ALLOWED_MIME_TYPES.includes(file.type)) feedback = "Imagen de formato inválido";

        // Por la estructura del documento, la etiqueta de feedback es relativa al contenedor
        // del input (el elemento padre)
        handleFeedback(profilePhoto.parentElement, feedback);
    }

    // ************* Suscripción a eventos *************
    name.addEventListener("blur", validateName);
    lastName.addEventListener("blur", validateLastName);
    userName.addEventListener("blur", validateUserName);
    address.addEventListener("blur", validateAddress);
    birth.addEventListener("blur", validateBirth);
    //profilePhoto.addEventListener("change", validateProfilePhoto);
    // Campos específicos del formulario de registro que no existen en el de edición de perfil
    if(email) email.addEventListener("blur", validateEmail);
    if(password) password.addEventListener("blur", validatePassword);
    if(passwordCheck) passwordCheck.addEventListener("blur", validatePasswordCheck);

    form.addEventListener("submit", function(event){
        // Ataja el caso en que se intente enviar el formulario sin haber interactuado con los campos
        validateName();
        validateLastName();
        validateUserName();
        validateAddress();
        validateBirth();
        //validateProfilePhoto();

        if(email) validateEmail();
        if(password) validatePassword();
        if(passwordCheck) validatePasswordCheck();

        if(Object.keys(errors).length){
            event.preventDefault();
        }

    });

});