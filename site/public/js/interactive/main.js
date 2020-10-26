window.addEventListener("load", () => {
    let imgSlider = document.getElementById("img-slider");
    let imgSliderTitle = document.getElementById("img-slider-title");
    let imgSliderCaption = document.getElementById("img-slider-caption");
    let slides = [
        {
            img: "../img/slider-1.jpg",
            title: "Workplace Station",
            caption: "Marca líder en ergonomía y armado de estaciones de trabajo"
        },
        {
            img: "../img/slider-3.jpg",
            title: "Armá tu estación de trabajo",
            caption: "Te ofrecemos una amplia cantidad de productos para un armado flexible y personalizado"
        },
        {
            img: "../img/carousel-3.png",
            title: "Modelos prearmados",
            caption: "¿No sabés por dónde empezar? Te ofrecemos modelos prearmados y completamente personalizables"
        },
        {
            img: "../img/carousel-5.jpg",
            title: "Transformá tu hogar en tu oficina",
            caption: "Conocemos las necesidades del ambiente de trabajo moderno"
        },
        {
            img: "../img/carousel-2.jpg",
            title: "Amplia selección de asientos",
            caption: "Sabemos que tu postura y salud son importantes, por eso ofrecemos una amplia selección de asientos ergonómicos"
        }
    ];

    function slide() {
        slides.forEach((slide, i) => { 
            setTimeout(() => {
                imgSlider.style.backgroundImage = `url(${slide.img})`;
                imgSlider.style.transition = "2s";
                imgSliderTitle.innerText = slide.title;
                imgSliderCaption.innerText = slide.caption;
            }, i * 5000);
        });
        setTimeout(slide, 5000 * slides.length)
    }
    slide();
})