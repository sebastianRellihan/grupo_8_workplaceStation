window.addEventListener("load", () => {
    let openButton = document.getElementById("side-bar-open-button");
    let sideBar = document.getElementById("mobile-nav-side-bar");
    let closeButton = document.getElementById("side-bar-close-button");

    openButton.addEventListener("click", () => {
        sideBar.style.left = "0vw";
        closeButton.style.left = "80vw";
    })

    closeButton.addEventListener("click", () => {
        sideBar.style.left = "-80vw";
        closeButton.style.left = "-20vw";
    })

    body.addEventListener("click", () => {
        if (sideBar.style.left == "0vw") {
            sideBar.style.left = "-80vw"
        }
    })
})