let errors = {}; // Contenedor global de errores

// ************* Elementos *************
let name = document.getElementById("name");
let briefDescription = document.getElementById("briefDescription");
let price = document.getElementById("price");
let discount = document.getElementById("discount");
let stock = document.getElementById("stock");
let description = document.getElementById("description");
let aditionalInfo = document.getElementById("aditionalInfo");

let form = document.getElementById("product-create-form");

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
    else if(price.value < 0 || price.value > 9999999.99 ) feedback = "El precio no puede ser negativo ni mayor a 9999999.99";

    handleFeedback(price, feedback);
}

function validateDiscount(){
    discount.value = discount.value.trim();
    let feedback;

    if(discount.value == "") feedback = "Campo obligatorio";
    else if(discount.value < 0 || discount.value > 100 ) feedback = "El descuento no puede ser negativo ni mayor a 100";

    handleFeedback(discount, feedback);
}

function validateStock(){
    stock.value = stock.value.trim();
    let feedback;

    if(stock.value == "") feedback = "Campo obligatorio";
    else if(stock.value < 0 || stock.value > 4294967295 ) feedback = "El stock no puede ser negativo ni mayor a 4294967295";

    handleFeedback(stock, feedback);
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
description.addEventListener("blur", validateDescription);
aditionalInfo.addEventListener("blur", validateAditionalInfo);

console.log(form);
form.addEventListener("submit", function(event){
    // Ataja el caso en que se intente enviar el formulario sin haber interactuado con los campos
    validateName();
    validateBriefDescription();
    validatePrice();
    validateDiscount();
    validateStock();
    validateDescription()
    validateAditionalInfo()

    if(Object.keys(errors).length){
        event.preventDefault();
    }

});