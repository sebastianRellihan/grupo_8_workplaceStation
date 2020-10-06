window.addEventListener("load", function(){

    let errors = {}; // Contenedor global de errores

    // ************* Elementos *************
    let address = document.getElementById("address");
    let comment = document.getElementById("comment");

    let form = document.getElementById("purchase-form");

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

    function validateAddress(){
        address.value = address.value.trim();
        let feedback;

        if(address.value == "") feedback = "Campo obligatório";
        else if(address.value.length < 2 || address.value.length > 255 ) feedback = "Debe tener entre 2 y 255 caracteres";

        handleFeedback(address, feedback);
    }

    function validateComment(){
        comment.value = comment.value.trim();
        let feedback;

        if(comment.value != "" && comment.value.length > 500)
            feedback = "Máximo 500 caracteres";

        handleFeedback(comment, feedback);
    }

    // ************* Suscripción a eventos *************
    address.addEventListener("blur", validateAddress);
    comment.addEventListener("blur", validateComment);

    form.addEventListener("submit", function(event){

        validateAddress();
        validateComment();

        if(Object.keys(errors).length){
            event.preventDefault();
        }

    });

});