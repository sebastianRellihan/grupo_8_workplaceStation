window.addEventListener("load", function(){
    // Contenedor global de errores
    let errors = {};

    const ALLOWED_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"];

    // ************* Elementos *************
    let name = document.getElementById("name");
    let briefDescription = document.getElementById("briefDescription");
    let price = document.getElementById("price");
    let discount = document.getElementById("discount");
    let stock = document.getElementById("stock");
    let images = document.getElementById("imagesUpload");
    let description = document.getElementById("description");
    let aditionalInfo = document.getElementById("aditionalInfo");

    let form = document.getElementById("product-form");

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

        if(name.value == "") feedback = "Campo obligatorio";
        else if(name.value.length < 5 || name.value.length > 100 ) feedback = "El nombre debe tener entre 5 y 100 caracteres";

        handleFeedback(name, feedback);
    }

    function validateBriefDescription(){
        briefDescription.value = briefDescription.value.trim();
        let feedback;

        if(briefDescription.value == "") feedback = "Campo obligatorio";
        else if(briefDescription.value.length < 5 || briefDescription.value.length > 100 ) feedback = "La descripción breve debe tener entre 5 y 100 caracteres";

        handleFeedback(briefDescription, feedback);
    }

    function validatePrice(){
        price.value = price.value.trim();
        let feedback;

        if(price.value == "") feedback = "Campo obligatorio";
        else if(price.value < 0 ) price.value = 0 ;
        else if(price.value > 9999999.99) price.value = 9999999.99;

        handleFeedback(price, feedback);
    }

    function validateDiscount(){
        discount.value = discount.value.trim();
        let feedback;

        if(discount.value == "") feedback = "Campo obligatorio";
        else if(discount.value < 0) discount.value = 0;
        else if(discount.value > 100 ) discount.value = 100;

        handleFeedback(discount, feedback);
    }

    function validateStock(){
        stock.value = stock.value.trim();
        let feedback;

        if(stock.value == "") feedback = "Campo obligatorio";
        else if(stock.value < 0) stock.value = 0;
        else if(stock.value > 4294967295 ) stock.value = 4294967295;

        handleFeedback(stock, feedback);
    }

    function validateImages(){

        let files = images.files;
        let feedback;

        if(!files) feedback = "Campo obligatório";

        for (let i = 0; i < files.length; i++) {
            if(!ALLOWED_MIME_TYPES.includes(files[i].type)) {
                feedback = "Imagen/es de formato inválido";
                break;
            }
        }

        handleFeedback(images.parentElement, feedback);
    }

    function validateDescription(){
        description.value = description.value.trim();
        let feedback;

        if(description.value == "") feedback = "Campo obligatorio";
        else if(description.value.length < 20 || description.value.length > 500 ) feedback = "La descripción debe tener entre 20 y 500 caracteres";

        handleFeedback(description, feedback);
    }

    function validateAditionalInfo(){
        aditionalInfo.value = aditionalInfo.value.trim();
        let feedback;

        if(aditionalInfo.value.length > 500 ) feedback = "La información adicional no puede tener más de 500 caracteres";

        handleFeedback(aditionalInfo, feedback);
    }

    // ************* Controladores de eventos *************
    name.addEventListener("blur", validateName);
    briefDescription.addEventListener("blur", validateBriefDescription);
    price.addEventListener("blur", validatePrice);
    discount.addEventListener("blur", validateDiscount);
    stock.addEventListener("blur", validateStock);
    images.addEventListener("change", validateImages);
    description.addEventListener("blur", validateDescription);
    aditionalInfo.addEventListener("blur", validateAditionalInfo);

    form.addEventListener("submit", function(event){
        // Ataja el caso en que se intente enviar el formulario sin haber interactuado con los campos
        validateName();
        validateBriefDescription();
        validatePrice();
        validateDiscount();
        validateStock();
        validateImages();
        validateDescription()
        validateAditionalInfo()

        if(Object.keys(errors).length){
            event.preventDefault();
        }

    });

});