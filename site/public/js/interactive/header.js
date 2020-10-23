window.addEventListener("load", () => {
    let openButton = document.getElementById("side-bar-open-button");
    let sideBar = document.getElementById("mobile-nav-side-bar");
    let closeButton = document.getElementById("side-bar-close-button");
    let navbar = document.getElementById("nav-bar");
    let siteCart = document.getElementById("site-cart");
    let sticky = navbar.offsetTop;
    let w = window.innerWidth;

    if (w >= 768) {
        window.addEventListener("scroll", function() {
            console.log(w);
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
    }

    openButton.addEventListener("click", () => {
        sideBar.style.left = "0vw";
        closeButton.style.left = "80vw";
    })

    closeButton.addEventListener("click", () => {
        sideBar.style.left = "-80vw";
        closeButton.style.left = "-20vw";
    })

    // body.addEventListener("click", () => {
    //     if (sideBar.style.left == "0vw") {
    //         sideBar.style.left = "-80vw"
    //     }
    // })

})