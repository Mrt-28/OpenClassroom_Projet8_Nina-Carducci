const gallery = document.getElementsByClassName("gallery")[0]
const tagsBar = document.getElementsByClassName("tags-bar")
console.log(gallery.children)
var tagIndex = ["Tout"]
var activeTag = "Tout"

Array.from(gallery.children).forEach(img => {
    const tag = img.dataset.galleryTag
    console.log(tag)
    if (!tagIndex.includes(tag)) {
        tagIndex.push(tag)
    }
})

tagIndex.forEach(tag => {
    console.log(tagIndex)
    const li = document.createElement("li")
    li.classList.add("nav-item")
    const span = document.createElement("span")
    span.classList.add("nav-link")
    if (tag === "Tout") {
        span.classList.add("active", "active-tag")
        
    }
    span.setAttribute("data-images-toggle", tag)
    span.innerText = tag
    li.appendChild(span)
    tagsBar[0].appendChild(li)
})

function updateActiveTag(newActive) {
    const currentActive = document.querySelector(".tags-bar span.active-tag")
    if (currentActive) {
        currentActive.classList.remove("active-tag")
        currentActive.classList.remove("active")
    }
    newActive.classList.add("active-tag")
    newActive.classList.add("active")
}

tagsBar[0].addEventListener("click", function(e) {
    if (e.target && e.target.nodeName === "SPAN") {
        updateActiveTag(e.target)
        const selectedTag = e.target.getAttribute("data-images-toggle")
        console.log(selectedTag)
        Array.from(gallery.children).forEach(img => {
            const imgTag = img.getAttribute("data-gallery-tag")
            if (selectedTag === "Tout" || selectedTag === imgTag) {
                activeTag = selectedTag
                img.style.display = "block"
            } else {
                img.style.display = "none"
            }
        })
    }
})


const lightBox = document.getElementById("lightbox")

const modalBackdrop = document.querySelector(".modal-backdrop")

const lightBoxImage = document.querySelector(".lightboxImage")
const prevBtn = document.querySelector(".mg-prev")
const nextBtn = document.querySelector(".mg-next")
console.log(prevBtn)
console.log(nextBtn)
gallery.addEventListener("click", function(e) {
    if (e.target && e.target.nodeName === "IMG") {
        const selectedTag = e.target.getAttribute("data-gallery-tag")
        console.log(selectedTag)
        lightBoxImage.src = e.target.src
        lightBox.style.display = "block"
        lightBox.classList.add("show")
        modalBackdrop.style.display = "block"
        modalBackdrop.classList.add("show")
    }
})

lightBox.addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains("modal")) {
        lightBox.style.display = "none"
        lightBox.classList.remove("show")
        modalBackdrop.style.display = "none"
        modalBackdrop.classList.remove("show")
    }
})

prevBtn.addEventListener("click", function() {
    var tabImg = []
    var indexImg = 0
    Array.from(gallery.children).forEach(img => {
        const imgTag = img.getAttribute("data-gallery-tag")
        if (activeTag === "Tout" || activeTag === imgTag) {
            tabImg.push(img)
        }
        if (img.src === lightBoxImage.src) {
            indexImg = tabImg.indexOf(img)
            console.log(indexImg)
        }
    })
    if (indexImg === 0) {
        indexImg = tabImg.length - 1
    } else {
        indexImg -= 1
    }
    lightBoxImage.src = tabImg[indexImg].src
})

nextBtn.addEventListener("click", function() {
    var tabImg = []
    var indexImg = 0
    Array.from(gallery.children).forEach(img => {
        const imgTag = img.getAttribute("data-gallery-tag")
        if (activeTag === "Tout" || activeTag === imgTag) {
            tabImg.push(img)
        }
        if (img.src === lightBoxImage.src) {
            indexImg = tabImg.indexOf(img)
            console.log(indexImg)
        }
    })
    if (indexImg === tabImg.length - 1) {
        indexImg = 0
    } else {
        indexImg += 1
    }
    lightBoxImage.src = tabImg[indexImg].src
})