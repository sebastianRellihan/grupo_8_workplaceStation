window.addEventListener("load", () => {
    if (document.body.offsetWidth < 1024) {
        let filterButton = document.getElementById("filter-button");
        let categoryButton = document.getElementById("category-button");
        let orderButton = document.getElementById("order-button");
        let orderOptions = document.getElementById("order-products");
        let categoriesOptions = document.getElementById("categories-products");
        let filterOptions = document.getElementById("filter-products");
        let formButton = document.getElementById("filter-form-sub-btn");
    
        filterButton.addEventListener("click", () => {
            if (filterOptions.style.display == "none") {
                filterOptions.style.display = "block";
                formButton.style.display = "block";
            } else {
                filterOptions.style.display = "none";
                formButton.style.display = "none";
            }
        })
    
        categoryButton.addEventListener("click", () => {
            if (categoriesOptions.style.display == "none") {
                categoriesOptions.style.display = "block";
            } else {
                categoriesOptions.style.display = "none";
            }
        })
    
        orderButton.addEventListener("click", () => {
            if (orderOptions.style.display == "none") {
                orderOptions.style.display = "block";
            } else {
                orderOptions.style.display = "none";
            }
        })
    }
})