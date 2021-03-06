window.addEventListener("load", () => {
    let body = document.body;
    let openButton = document.getElementById("side-bar-open-button");
    let sideBar = document.getElementById("mobile-nav-side-bar");
    let closeButton = document.getElementById("side-bar-close-button");
    let navbar = document.getElementById("nav-bar");
    let siteCart = document.getElementById("site-cart");
    let sticky = navbar.offsetTop;
    let w = window.innerWidth;
    let products = document.getElementById("nav-bar-products");
    let productsList = products.children[1];
    let productsAnchor = document.getElementById("nav-bar-products-a");
    let aboutAnchor = document.getElementById("nav-bar-about-a");
    let contactAnchor = document.getElementById("nav-bar-contact-a");
    let createAnchor = document.getElementById("nav-bar-create-a");
    let homeAnchor = document.getElementById("nav-bar-home-a");
    let productsNav = document.getElementById("products-nav");
    

    // Para la vista Desktop
    if (w >= 768) {
        window.addEventListener("scroll", function() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky");
                if (w > 1500) {
                    sideBar.style.marginLeft = "5vw";
                    siteCart.style.marginRight = "5vw";
                }
            } else if(window.pageYOffset <= sticky) {
                sideBar.style.marginLeft = "0px";
                siteCart.style.marginRight = "0px";
                navbar.classList.remove("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        })

        products.addEventListener("mouseover", () => {
            productsList.style.display = "flex";
        })

        products.addEventListener("mouseout", () => {
            productsList.style.display = "none";
        })

        if (document.URL.includes("create")) {
            createAnchor.classList.add("active-nav");
        } else if (document.URL.includes("about")) {
            aboutAnchor.classList.add("active-nav");
        } else if (document.URL.includes("contact")) {
            contactAnchor.classList.add("active-nav");
        } else if (document.URL.includes("products")) {
            productsAnchor.classList.add("active-nav");
        } else {
            homeAnchor.classList.add("active-nav");
        }
    } else {
        // Para la vista Mobile o Tablet

        productsAnchor.addEventListener("click", (e) => {
            e.preventDefault();
            if (productsList.style.display == "none") {
                productsList.style.display = "block";
            } else {
                productsList.style.display = "none";
            }
        })

        openButton.addEventListener("click", () => {
            sideBar.style.left = "0vw";
            closeButton.style.left = "80vw";
            body.classList.add("prevent-scroll");
        })
    
        closeButton.addEventListener("click", () => {
            sideBar.style.left = "-80vw";
            closeButton.style.left = "-20vw";
            body.classList.remove("prevent-scroll");
        })

    }

    // *********** Armado de la barra de categorías de productos ***********

    fetch("/api/products/categories")
        .then(response => {
            return response.json();
        })
        .then(results => {

            results.data.forEach(element => {
                productsNav.innerHTML += `<li><a href="/products?categories=${element.id}">${element.name}</a></li>`;
            });

        });

})