window.addEventListener("load", function(){

    // Interactividad y ajustes para las versiones de menor tamaño

    if(document.body.offsetWidth < 768){
        document.querySelector(".views").style.display = "none"
    }

    if (document.body.offsetWidth < 1024) {
        let filterButton = document.getElementById("filter-button");
        let categoryButton = document.getElementById("category-button");
        let orderButton = document.getElementById("order-button");
        let orderOptions = document.getElementById("order-products");
        let categoriesOptions = document.getElementById("categories-products");
        let filterOptions = document.getElementById("filter-products");

        filterButton.addEventListener("click", () => {
            if (filterOptions.style.display == "none") {
                filterOptions.style.display = "block";
                categoriesOptions.style.display = "none";
                orderOptions.style.display = "none";
            } else {
                filterOptions.style.display = "none";
            }
        })

        categoryButton.addEventListener("click", () => {
            if (categoriesOptions.style.display == "none") {
                categoriesOptions.style.display = "block";
                filterOptions.style.display = "none";
                orderOptions.style.display = "none";
            } else {
                categoriesOptions.style.display = "none";
            }
        })

        orderButton.addEventListener("click", () => {
            if (orderOptions.style.display == "none") {
                orderOptions.style.display = "block";
                filterOptions.style.display = "none";
                categoriesOptions.style.display = "none";
            } else {
                orderOptions.style.display = "none";
            }
        })
    }

    /**
     * Plantilla para la adición de productos.
     * @param {Number} id El ID del producto a mostrar.
     * @param {String} image La ruta de la imagen representativa del producto relativa a la carpeta PUBLIC
     * @param {Number} price Precio sin aplicar descuentos.
     * @param {Number} discount Porcentaje de descuento.
     * @param {String} name Nombre del producto.
     * @returns {string} Un string que contiene la estructura HTML para ser insertada dentro del nodo 
     *                   contenedor de productos (productsSection).
     */
    function productTemplate(id, image, price, discount, name){
        return `<article>
                    <a href="/products/${id}">
                        <img src="${image}" alt="${name}">
                        <div class="products-section-info">
                            <span class="products-section-info-price">$${price}</span>
                            ${(discount > 0) ? 
                                `<span class="products-section-info-discount">${discount}% off</span>` : ""
                            }  
                        </div>
                        <h2>${name}</h2>
                    </a>
                </article>`;
    }

    /**
     * Método de llamada a la API. Formula una consulta a través de una URL que contiene un
     * query string representando el "estado" del sistema de consultas, para luego renderizar
     * los productos dentro del nodo contenedor (productsSection) con los datos obtenidos.
     * Este método debe ser llamado por cualquier nodo capaz de interactuar con el sistema
     * de filtrado, para renderizar los resultados de los nuevos filtros.
     */
    function apiCall(){

        let query = `/api/products/filter?order=${queryState.order}`;
        if(queryState.search) query += `&search=${queryState.search}`;
        if(queryState.min) query += `&min=${queryState.min}`;
        if(queryState.max) query += `&max=${queryState.max}`;
        if(queryState.discount) query += `&discount=${queryState.discount}`;
        if(queryState.categories.length != 0){
            query += `&categories=${queryState.categories.join()}`;
        }

        fetch(query)
            .then(response => response.json())
            .then(results => {
                
                productsSection.innerHTML = "";

                if(results.data.length > 0){
                    results.data.forEach(element => {
                        productsSection.innerHTML += productTemplate(element.id, element.image, element.price,
                                                                     element.discount, element.name);
                    });
                } else {
                    // TODO: Mostrar algo más elaborado..
                    productsSection.innerHTML = "<h2> UPS! No hubo coincidencias... :( </h2>"
                }


            });
    }
    
    // *********** Recursos ***********
    
    let productsSection = document.getElementById("productsSection");
    let order = document.getElementById("order");
    let minPrice = document.getElementById("min-price");
    let maxPrice = document.getElementById("max-price");
    let withDiscount = document.getElementById("with-discount");
    let withoutDiscount = document.getElementById("without-discount");
    let indiscDiscount = document.getElementById("indisc-discount");
    let categoryContainer = document.getElementById("category-container");
    let searchBar = document.getElementById("search-bar");
    
    let queryState = { // Objeto que representa el "estado" del sistema de filtrado 
        order : order.value,
        categories : []
    }

    // *********** Suscripción a eventos ***********
    order.addEventListener("change", function(){        
        queryState.order = this.value;
        apiCall();
    });

    // Por límite de precio
    minPrice.addEventListener("blur", function(){
        if(this.value == "" && queryState.min){
            delete queryState.min;
        } else {
            queryState.min = this.value;
        }
        apiCall();
    });

    maxPrice.addEventListener("blur", function(){
        if(this.value == "" && queryState.max){
            delete queryState.max;
        } else {
            queryState.max = this.value;
        }
        apiCall();
    });
    
    // Por descuento
    withDiscount.addEventListener("click",function(){
        if(queryState.discount != this.value){
            queryState.discount = this.value;
            apiCall();
        }
    });

    withoutDiscount.addEventListener("click",function(){
        if(queryState.discount != this.value){
            queryState.discount = this.value;
            apiCall();
        }
    });

    indiscDiscount.addEventListener("click",function(){
        if(queryState.discount){
            delete queryState.discount;
            apiCall();
        }
    });
    
    // Por categoría
    for(category of categoryContainer.children){
        // Suscripción a eventos de cambio des estado del queryString por cada checkbox
        category.firstElementChild.addEventListener("click", function(){
            
            if(this.checked) queryState.categories.push(this.value)
            else {
                queryState.categories = queryState.categories.filter(element => {
                    return element != this.value;
                });
            }

            apiCall();

        });
    }

    // Interacción con la barra de búsquedas
     searchBar.addEventListener("blur", function(){
        if(this.value == "" && queryState.search){
            delete queryState.search;
        } else {
            queryState.search = this.value;
        }

        apiCall();
     });

    // Inicialización de la vista y parseo del query string
    let searchParams = new URLSearchParams(window.location.search);
    
    if(searchParams.get("search")) // Filtra por la barra de búsqueda
        queryState.search = searchParams.get("search");

    if(searchParams.get("categories")){
        queryState.categories.push(searchParams.get("categories"));
        // Se ha cambia el estado del check que ya venga filtrado
        document.getElementById(searchParams.get("categories")).checked = true;
    }

    apiCall();

});