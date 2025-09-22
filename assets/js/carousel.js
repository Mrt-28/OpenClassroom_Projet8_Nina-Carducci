const nextBtnCaroussel = document.querySelector(".carousel-control-next")
const prevBtnCaroussel = document.querySelector(".carousel-control-prev")

const tabImg = document.querySelector(".carousel-inner").children
const tabIndicators = document.querySelector(".carousel-indicators").children
const indicators = document.getElementsByClassName("carousel-indicators")
let indexImg = 0
let prevImg = tabImg.length - 1
let nextImg = indexImg + 1
let animeFinished = true

async function setIndex(index){
    indexImg = index
    if(indexImg ===0 ){ prevImg = tabImg.length - 1 } else { prevImg = indexImg - 1 }
    if(indexImg === tabImg.length - 1 ){ nextImg = 0 } else { nextImg = indexImg + 1 }  
}

async function addActiveClass(){
    animeFinished = false

    tabImg[indexImg].classList.add("active")
    tabIndicators[indexImg].classList.add("active")
    tabIndicators[prevImg].classList.remove("active")
    tabIndicators[nextImg].classList.remove("active")
    tabImg[nextImg].style.transform = "translateX(100%)"
    tabImg[indexImg].offsetHeight // trigger reflow for translateX(0%)
    tabImg[indexImg].style.transform = "translateX(0%)"
    tabImg[indexImg].style.opacity = "1"
    tabImg[prevImg].style.transform = "translateX(-100%)"
    tabImg[prevImg].style.opacity = "0"

  await new Promise(resolve => {
    setTimeout(() => {
        tabImg[nextImg].classList.remove("active");
        tabImg[prevImg].classList.remove("active");
        animeFinished = true;
        resolve();
    }, 600);
  });
}
addActiveClass()

nextBtnCaroussel.addEventListener("click", function(){      
    if(!animeFinished) return
    async function slideNext() {
        await setIndex(nextImg)
        addActiveClass()
    }
    slideNext()
})

prevBtnCaroussel.addEventListener("click", function(){
    if(!animeFinished) return
    async function slidePrev() {
        await setIndex(prevImg)
        addActiveClass()
    }
    slidePrev()
})

indicators[0].addEventListener("click", function(e) {
    if (e.target && e.target.nodeName === "BUTTON") {
        if(!animeFinished) return

        Array.from(indicators[0].children).forEach(indicator => {
            indicator.classList.remove("active")
            indicator.setAttribute("aria-current", "false")
        })

        e.target.classList.add("active")
        e.target.setAttribute("aria-current", "true")

        const selectedTag = e.target.getAttribute("data-bs-slide-to")
        setIndex(parseInt(selectedTag))
        addActiveClass()
    }

})

// Auto slide
let autoSlide = setInterval(function(){   
    if(!animeFinished) return
    async function slideNext() {
        await setIndex(nextImg)
        addActiveClass()
    }      
    slideNext()
}, 5000)

// Stop auto slide on hover
const carousel = document.querySelector(".carousel")
carousel.addEventListener("mouseover", function(){
    clearInterval(autoSlide)
})
carousel.addEventListener("mouseout", function(){
    autoSlide = setInterval(function(){      
        async function slideNext() {
            await setIndex(nextImg)
            addActiveClass()
        }     
        slideNext()
        
    }, 5000)
})