"use strict"

// Loading Bar //

function startProgressBar() {
  let percent = 0;
  const sectionLoading = document.querySelector('.section_loading')
  const progress = document.querySelector(".progress__bar");
  const percentText = document.querySelector(".progress__percent");

  const intervalId = setInterval(function() {
     // Randomize progress
    percent += Math.floor(Math.random() * 35);
    percent = percent > 98 ? 98 : percent;
     // Update progress bar
    progress.style.width = percent + "%";
    percentText.textContent = percent + "%";
     // Finish if progress is 100%
    if (percent >= 98) {
      clearInterval(intervalId);
      gsap.to(sectionLoading, {
        x: "-100%",
        duration: 1,
        delay: .5,
        ease:"power4.inOut"
      });
    }
  }, 500);
}

startProgressBar();

// Loading Bar //


// Sliders //

const sliders = document.querySelectorAll('input[type="range"]');
const values = document.querySelectorAll('label[class$="--value"]');

sliders.forEach((slider, index) => {
  slider.addEventListener('input', () => {
    const currentText = values[index].textContent.split(':')[0]; // on récupère le texte de base jusqu'au symbole ':'

    const sliderValue = event.target.value;

    values[index].textContent = `${currentText}: ${sliderValue}`;
  });
});


// Sliders //


// Avatar Selection //


const gridItems = document.querySelectorAll('.gridSelection__item');
const body = document.querySelector('body');
const containerCustomize = document.querySelector('.container__customize')
const sectionSelection = document.querySelector('.section__selection')
const drag_item = document.querySelector('.draggable')
const gridSelection = document.querySelectorAll('.gridSelection')
const customizeButton = document.querySelector('.container__customize__button')
const containerDrugs = document.querySelector('.container__drugs')

const centerX = body.clientWidth / 2 - 75;
const centerY = body.clientHeight / 2 - 300;

gridItems.forEach(item => {
  item.addEventListener('click', () => {

    item.classList.add('dropzone')

    gsap.to(item, {
      left: centerX,
      top: centerY,
      scale: 2,
      duration: .5,
      pointerEvents :'none',
      ease : "power4.inOut",

    });

    gridItems.forEach(otherItem => {

      if (otherItem !== item) {
        gsap.to(otherItem, {
          opacity:0,
          display:'none',
          ease : "power4.inOut",
          onComplete : showSlider
        });
      }

    });

    function showSlider(){
      sectionSelection.insertBefore(item, sectionSelection.firstElementChild);
      sectionSelection.style.alignItems = "flex-end"

      gsap.set(gridSelection, {
        display:"none"
      });
      gsap.set(containerCustomize,{
        display:"flex"
      })
    }
  });
});


// Avatar Selection //

 customizeButton.addEventListener('click', () => {
   gsap.set(containerCustomize, {
     display:"none"
   });
   containerDrugs.style.display = "flex";
   
 })


// Dragging //


let initialX, initialY;

interact('.draggable').draggable({
  autoScroll: true,
  restrict: {
    restriction: document.querySelector('.container'),
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
    endOnly: true
  },

  onmove: function (event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  },

  onstart: function (event) {
    initialX = 0
    initialY = 0;
  },

  onend: function (event) {
    const target = event.target;

    if (target.hasAttribute('data-dropped')) {
      // Make the element disappear
      gsap.to(target, {
        opacity: 0,
        duration: 0.3,
        onComplete: function () {
          // Reset the element's position and make it reappear
          target.style.transform = `translate(${initialX}px, ${initialY}px)`;
          target.setAttribute('data-x', initialX);
          target.setAttribute('data-y', initialY);
          gsap.set(target,{
            width : targetWidth / 1.5,
            height : targetHeight / 1.5,
            onComplete : function () {
              gsap.to(target, { opacity: 1 });
            }
          })



          // Remove the data-dropped attribute
          target.removeAttribute('data-dropped');
        },
      });
    } else {
      // Return the element to its original position
      target.classList.add('return-animation');
      target.style.transform = `translate(${initialX}px, ${initialY}px)`;
    }

    event.target.addEventListener('transitionend', () => {

      event.target.classList.remove('return-animation');
      event.target.setAttribute('data-x', initialX);
      event.target.setAttribute('data-y', initialY);
    })

  },

});



const targetWidth = $('.draggable').width() * 1.5;
const targetHeight = $('.draggable').height() * 1.5;


// Dragging //


// Dropping //

interact('.dropzone').dropzone({

  accept: '#yes-drop',
  overlap: 0.75,

  ondropactivate: function (event) {
    event.target.classList.add('drop-active')
  },

  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')

    gsap.to(draggableElement,{
      width : targetWidth,
      height : targetHeight,
      duration : .1,
      ease : "power1.in"
    })
  },

  ondragleave: function (event) {
    var draggableElement = event.relatedTarget
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')

    gsap.to(draggableElement,{
      width : targetWidth / 1.5,
      height : targetHeight / 1.5,
      duration : .1,
      ease : "power1.in"
    })
  },

  ondrop: function (event) {
    var draggableElement = event.relatedTarget;

    // Add a custom attribute to indicate that the element has been dropped
    draggableElement.setAttribute('data-dropped', 'true');
  },

  ondropdeactivate: function (event) {
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})


// Dropping //


