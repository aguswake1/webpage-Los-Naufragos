const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider-section");
let lastImage = sliderSection[sliderSection.length - 1];

console.log(sliderSection);
slider.insertAdjacentElement("afterbegin",lastImage);

function Next(){
    let sliderSection = document.querySelectorAll(".slider-section");
    let firstImage = sliderSection[0];

    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement("beforeend",firstImage);
        slider.style.marginLeft = "-100%";
    },500);
}

setInterval(() => {
    Next();
}, 2800);