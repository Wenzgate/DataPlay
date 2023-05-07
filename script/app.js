"use strict"

// Randomize Color & Logo

function colorLogoRandomize () {
  const logo = document.querySelector('.logo');
  const sectionLoading = document.querySelector('.section__loading')
  const sectionSelection = document.querySelector('.section__selection');
  const colors = ['#A275CF', '#75A9CF', '#7CCF75', '#7579CF', '#75CFA9', '#CF75AB'];
  let ColorIndex = Math.floor(Math.random() * colors.length);
  let bgColor = colors[ColorIndex];
  let logos = ['assets/img/logo1.svg', 'assets/img/logo2.svg', 'assets/img/logo3.svg', 'assets/img/logo4.svg', 'assets/img/logo5.svg', 'assets/img/logo6.svg'];
  let logoIndex = ColorIndex;
  let logoSrc = logos[logoIndex]; 
  // Application des couleurs et logo
  sectionLoading.style.backgroundColor = bgColor;
  sectionSelection.style.backgroundColor = bgColor;
  logo.src = logoSrc;
}

window.onload = colorLogoRandomize;


// Randomize Color & Logo


// Creating div transition

function createDivTransition () {
  const yellowDiv = document.createElement('div');
  const targetChild = document.querySelector('.section__selection');
  // Ajouter une classe à l'élément div
  yellowDiv.classList.add('yellow__div');
  // Ajouter l'élément div au corps de la page
  document.body.insertBefore(yellowDiv, targetChild);
  // Animation de l'élément div
  gsap.to(yellowDiv, {
    x: "-100%",
    delay : .2,
    duration:1,
    ease:"power4.inOut",
     onComplete : () =>{
       yellowDiv.remove();
     }
  })
}


// Creating div transition



// Loading Bar //

function startProgressBar() {
  let percent = 0;
  const sectionLoading = document.querySelector('.section__loading');
  const progress = document.querySelector(".progress__bar");

  const intervalId = setInterval(function() {
     // Randomize progress
    percent += Math.floor(Math.random() * 35);
    percent = percent > 90 ? 99 : percent;
     // Update progress bar
    progress.style.width = percent + "%";
    
     // Finish if progress is 100%
    if (percent >= 99) {
      clearInterval(intervalId);

      gsap.to(sectionLoading, {
        x: "-100%",
        duration: 1,
        
        ease:"power4.inOut"
      });

      createDivTransition ();
    }
  }, 500);
}

startProgressBar();

// Loading Bar //


// Sliders //

const sliders = document.querySelectorAll('input[type="range"]');
const values = document.querySelectorAll('.containerSlider span');

sliders.forEach((slider, index) => {
  slider.addEventListener('input', () => {
    const currentValue = values[index].textContent.trim(); // on récupère le texte de base jusqu'au symbole ':'

    const sliderValue = event.target.value;

    const firstSpaceIndex = currentValue.indexOf(' '); // on cherche l'indice du premier espace dans la chaîne de caractères
    const textBeforeValue = currentValue.substring(0, firstSpaceIndex); // on extrait le texte qui précède la valeur
    const textAfterValue = currentValue.substring(firstSpaceIndex); // on extrait le texte qui suit la valeur

    values[index].textContent = `${sliderValue} ${textAfterValue}`;
  });
});


// Sliders //


// Avatar Selection //



  const avatars = document.querySelectorAll('.gridSelection__item');
  const sectionSelection = document.querySelector('.section__selection')


  avatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
      sectionSelection.style.zIndex = 500;
      gsap.to(avatar,{
        scale : .9,
        duration : .1,
        ease : "power1.inOut",
        onComplete : () => {
          gsap.to(avatar,{
            scale : 1,
            duration : .1,
            ease : "power1.inOut",
            onComplete : () => {
              gsap.to(sectionSelection, {
                x: "-100%",
                duration: 1,
                ease:"power4.inOut"
              });
        
              createDivTransition ();
              avatarPop ();
              
            }
          })
        }
      })
    })
  });

  function avatarPop () {
    const avatar = document.querySelector('.mask img');
    gsap.from(avatar,{
      duration : 1.2,
      delay: .7,
      y : "250px",
      ease: CustomEase.create("custom", "M0,0 C0.14,0 0.454,0.448 0.51,0.561 0.586,0.715 0.672,0.963 0.68,1 0.688,0.985 0.732,0.873 0.773,0.811 0.828,0.726 0.888,0.8 0.904,0.82 0.919,0.839 1,1 1,1 ")    
    })
  }






const gridItems = document.querySelectorAll('.gridSelection__item');
const body = document.querySelector('body');
const containerCustomize = document.querySelector('.container__customize')
const drag_item = document.querySelector('.draggable')
const gridSelection = document.querySelectorAll('.gridSelection')
const customizeButton = document.querySelector('.container__customize__button')
const containerDrugs = document.querySelector('.container__drugs')
const digit = document.querySelector('.wrapper__digit')



// Avatar Selection //

 customizeButton.addEventListener('click', () => {
   gsap.to(containerCustomize, {
    x: "-100%",
    duration: 1,
    ease:"power4.inOut"
   });

   gsap.set(containerDrugs,{
    display:'flex !important'
   })

   gsap.from(containerDrugs,{
    duration : 1,
    delay: .2,
    x : "100%",
    ease:"power4.inOut",
   })
   
 })


// Dragging //


let initialX, initialY;

interact('.draggable').draggable({
  autoScroll: true,
  

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
  overlap: 0.50,

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
    
    let texte = parseInt(digit.textContent);
    texte++;
    digit.textContent = texte;

    // Add a custom attribute to indicate that the element has been dropped
    draggableElement.setAttribute('data-dropped', 'true');
  },

  ondropdeactivate: function (event) {
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})


// Dropping //


