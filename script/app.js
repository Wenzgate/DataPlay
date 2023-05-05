
 
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



// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
   
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')
        event.target.style.transform = 'translate(0px, 0px)';

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    },

    

    
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener