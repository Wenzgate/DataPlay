
 
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

// const elements = document.querySelectorAll('.gridSelection__item')
// let currentElement = null;

// elements.forEach(element => {
//   element.addEventListener('click', () => {

//     var sourceStyle = window.getComputedStyle(element);
//     var sourceBackground = sourceStyle.getPropertyValue('background-image');
//     var target = document.querySelector('.section__customize__avatar');

//     target.style.backgroundImage = sourceBackground;
//     // si un élément est déjà agrandi, le redimensionne à sa taille initiale
//     if (currentElement) {
//       gsap.to(currentElement, { scale: 1,duration:0.1, ease:"power1.in" });
//     }

//     // si l'élément actuel n'est pas celui qui vient d'être cliqué, l'agrandit
//     if (currentElement !== element) {
//         gsap.timeline()
//         .to(element, {scale:.9, duration:0.1, ease:"power1.in"})
//         .to(element, {scale:1.1,duration: 0.2, ease:"power4.inOut" }) // déplacement de l'avatar au centre de l'écran
//         .play(); // lancement de l'animation
//       currentElement = element;
//     } else {
//       currentElement = null;
//     }
//   });
// });


const sliders = document.querySelectorAll('input[type="range"]');
const values = document.querySelectorAll('label[class$="--value"]');

sliders.forEach((slider, index) => {
  slider.addEventListener('input', () => {
    const currentText = values[index].textContent.split(':')[0]; // on récupère le texte de base jusqu'au symbole ':'

    const sliderValue = event.target.value;

    values[index].textContent = `${currentText}: ${sliderValue}`;
  });
});


// var next = document.querySelector('.section__selection__btn')
// var sectionSelection = document.querySelector('.section_selection')

// next.addEventListener('click', () =>{
//   gsap.to(sectionSelection, { 
//     x: "-100%", 
//     duration: 1, 
//     delay: .5, 
//     ease:"power4.inOut"  
// })
// })

const gridItems = document.querySelectorAll('.gridSelection__item');
const body = document.querySelector('body');
const containerCustomize = document.querySelector('.container__customize')
const sectionSelection = document.querySelector('.section__selection')



const centerX = body.clientWidth / 2 - 75;
const centerY = body.clientHeight / 2 - 300;

gridItems.forEach(item => {
  item.addEventListener('click', () => {
    gsap.to(item, {
      left: centerX,
      top: centerY,
      scale: 2,
      duration: .5,
      position : "absolute",
      ease : "power4.inOut",
      
    });

    gridItems.forEach(otherItem => {

      if (otherItem !== item) {
        gsap.to(otherItem, {
          opacity:0,
          ease : "power4.inOut",
          onComplete : showSlider
        });
      }

    });

        function showSlider(){
          gsap.set(containerCustomize, {
            display:"flex"
          });
        }

    
  });
});



// Sélectionnez l'élément à glisser
const draggableElement = document.querySelector('.draggable');

// Enregistrer la position initiale de l'élément
let initialX, initialY;
interact(draggableElement)
  .draggable({
    // activer la détection des collisions avec d'autres éléments
    autoScroll: true,
    // définir une fonction pour restreindre le déplacement dans un parent
    restrict: {
      restriction: document.querySelector('.container'),
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
      endOnly: true
    },
    // appelé lorsqu'un élément est déplacé
    onmove: function (event) {
      // calculer la nouvelle position en ajoutant le mouvement à la position initiale
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // déplacer l'élément à la nouvelle position
      target.style.transform = `translate(${x}px, ${y}px)`;

      // mettre à jour les attributs de position de l'élément
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },
    // appelé lorsqu'un élément est activé pour le glissement
    onstart: function (event) {
      // enregistrer la position initiale de l'élément
      initialX = parseFloat(event.target.getAttribute('data-x')) || 0;
      initialY = parseFloat(event.target.getAttribute('data-y')) || 0;
    },
    // appelé lorsqu'un élément est relâché après un glissement
    onend: function (event) {
      // réinitialiser la position de l'élément à la position initiale
      //event.target.style.transform = `translate(${initialX}px, ${initialY}px)`;
      gsap.to(event.target, {
        x: initialX ,
        y: initialY ,
        ease: "power4.inOut",
        duration:.5
      });
      event.target.setAttribute('data-x', initialX);
      event.target.setAttribute('data-y', initialY);
    }
  });
