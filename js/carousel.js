const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);

const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');

const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const trackText = document.querySelector('.jobSpecs');
const texts = Array.from(trackText.children);

const slideWidth = slides[0].getBoundingClientRect().width;
const textWidth = texts[0].getBoundingClientRect().width;
//console.log(textWidth);





//de afbeeldingen naast elkaar krijgen
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

//text naast elkaar krijgen
const setTextPosition = (text, index) => {
    text.style.left = textWidth * index + 'px';
}
texts.forEach(setTextPosition);









const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

/*const moveToText = (trackText, currentText, targetSlide) => {
    trackText.style.transform = 'translateX(-' + targetText.style.left; + ')';
    currentText.classList.remove('current-text');
    targetText.classList.add('current-text');
}*/



const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}


const updateText = (currentText, targetText) => {
    currentText.classList.remove('current-text');
    targetText.classList.add('current-text');
}




const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//wanneer ik klik op links, beweeg slides naar links
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
 
     const currentText = trackText.querySelector('.current-text');
    const prevText = currentText.previousElementSibling;
    
    const amountToMove = prevText.style.left;
    //move to the next text
    trackText.style.transform = 'translateX(-' + amountToMove + ')';
    currentText.classList.remove('current-text');
    prevText.classList.add('current-text');
    
    
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);


})


//wanneer ik klik op rechts, beweeg slides naar rechts
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;

    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    const currentText = trackText.querySelector('.current-text');
    const nextText = currentText.nextElementSibling;


    const amountToMove = nextText.style.left;
    //move to the next text
    trackText.style.transform = 'translateX(-' + amountToMove + ')';
    currentText.classList.remove('current-text');
    nextText.classList.add('current-text');


    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);


})





//wanneer ik klik op nav indicators, ga naar die slide
dotsNav.addEventListener('click', e => {
    //op welke indicator is er geklikt
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);

    hideShowArrows(slides, prevButton, nextButton, targetIndex);

})
