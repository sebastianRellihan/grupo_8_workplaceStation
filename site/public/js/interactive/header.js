window.addEventListener("load", () => {
    let openButton = document.getElementById("side-bar-open-button");
    let sideBar = document.getElementById("mobile-nav-side-bar");
    let closeButton = document.getElementById("side-bar-close-button");
    let navbar = document.getElementById("nav-bar");
    let siteCart = document.getElementById("site-cart");
    let sticky = navbar.offsetTop;
    let w = window.innerWidth;
    let products = document.getElementById("nav-bar-products");
    let productsList = products.children[1];
    let productsAnchor = products.children[0];
    let body = document.body;

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
    
        productsAnchor.addEventListener("click", (e) => {
            e.preventDefault();
        })

        products.addEventListener("mouseout", () => {
            productsList.style.display = "none";
        })
    } else {
        // Para la vista Mobile o Tablet

        products.addEventListener("click", (e) => {
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

})