// ANIM SCROLL

const animItems = document.querySelectorAll('._anim-items');
if(animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll() {
    for( let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 2000;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if(animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
        animItem.classList.add('_active');
      }else{
        if(!animItem.classList.contains('_anim-no-hide')){
          animItem.classList.remove('_active');}        
      }
    }
  }
  function offset(el){
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }
  animOnScroll();  
}



// BURGER-MENU


const burger = document.querySelector("#nav-icon1");
burger.addEventListener("click", morph);

function morph() {
  burger.classList.toggle("open");
  const items = document.querySelector(".menu");
  items.classList.toggle("active");
  const body = document.querySelector('html');
  body.classList.toggle('lock');

  items.addEventListener("click",function(){
     burger.classList.remove("open");
      items.classList.remove('active'); 
      body.classList.remove('lock');     
    }); 
} 






// СЛАЙДЕР НА ТАЧСКРИНЕ


let slider = document.querySelector('.slider'),
  sliderList = slider.querySelector('.slider-list'),
  sliderTrack = slider.querySelector('.slider-track'),
  slides = slider.querySelectorAll('.slide'),  
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

   
  },
  swipeStart = function() {
    let evt = getEvent();

    if (allowSwipe) {

      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  },
  swipeAction = function() {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    // определение действия свайп или скролл
    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      // запрет ухода влево на первом слайде
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет протаскивания дальше одного слайда
      // if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
      //   reachEdge();
      //   return;
      // }

      // двигаем слайд
      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);









// ТАБИ

$(function() {
  var tab = $('#tabs .tabs-items > div'); 
  tab.hide().filter(':first').show(); 
  
  // Клики по вкладкам.
  $('#tabs .tabs-nav a').click(function(){
    tab.hide(); 
    tab.filter(this.hash).show(); 
    $('#tabs .tabs-nav a').removeClass('active');
    $(this).addClass('active');
    return false;
  }).filter(':first').click();
 
  
});






// Присвоение класса для видимости сожержимого аккордеона

$(document).ready(function() {
  $(function(){     
    $('.accordeon-header').click(function(){
      $(this).toggleClass('in').next().slideToggle(500);
    });
});
})




// / Присвоение класса для видимости сожержимого аккордеона
// ДЛЯ ФОРМ ОБРАТНОЙ СВЯЗИ

$(document).ready(function() {
  $(function(){     
    $('.accordeon-header-button').click(function(){
      $(this).slideToggle();
      $('.content').slideToggle();
    });
});
  $(function(){     
    $('.button-cancel').click(function(){
      $('.content').slideToggle();
      $('.accordeon-header-button').slideToggle();
    });
});
})
$(document).ready(function() {
  $(function(){     
    $('.accordeon2-header-button').click(function(){
      $(this).slideToggle();
      $('.content2').slideToggle();
    });
});
  $(function(){     
    $('.button-cancel2').click(function(){
      $('.content2').slideToggle();
      $('.accordeon2-header-button').slideToggle();
    });
});
})





// POPUP OPEN

// const popupLinks = document.querySelectorAll('.popup-link');
// const body = document.querySelector('html');
// const lockPadding = document.querySelectorAll('.lock-padding');
// let unlock = true;
// const timeout = 800;

// if (popupLinks.length > 0) {
//     for(let index = 0; index < popupLinks.length; index++){
//         const popupLink = popupLinks[index];
//         popupLink.addEventListener("click",function(e){ 
//           const popupName = popupLink.getAttribute('href').replace('#','');
//           const curentPopup = document.getElementById(popupName);
//           popupOpen(curentPopup);
//           e.preventDefault();

//         }); 
//       }
// }
// const popupCloseIcon = document.querySelectorAll('.close-popup');
// if (popupCloseIcon.length> 0) {
//       for(let index = 0; index <  popupCloseIcon.length; index++){
//         const el = popupCloseIcon[index];
//         el.addEventListener('click', function (e){
//           popupClose(el.closest('.popup'));
//           e.preventDefault();
//         });
//       }
// }
// function popupOpen(curentPopup){
//   if (curentPopup && unlock) {
//     const popupActive = document.querySelector('.popup.open');
//     if (popupActive) {
//       popupClose(popupActive, false);
//     }else{
//       bodyLock();
//     }
//     curentPopup.classList.add('open');
//     curentPopup.addEventListener("click", function (e){
//       if (!e.target.closest('.popup__content')) {
//         popupClose(e.target.closest('.popup'));
//       }
//     });
//   }
// }
// function popupClose(popupActive, doUnLock = true){
//   if (unlock) {
//     popupActive.classList.remove('open');
//     if (doUnLock) {
//       bodyUnLock();
//     }
//   }
// }

// function bodyLock(){
//   const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
//   if (lockPadding.length>0) {

//   for (let index = 0; index < lockPadding.length; index++){
//         const el = lockPadding[index];
//         el.style.right = lockPaddingValue;
//         }
//     }
//         body.style.paddingRight = lockPaddingValue;
//         body.classList.add('lock');

//         unlock = false;
//         setTimeout(function(){
//           unlock = true;          
//         },timeout);
// }

// function bodyUnLock(){
//   setTimeout(function(){
//     if(lockPadding.length > 0){
//       for(let index = 0; index < lockPadding.length; index++){
//           const el = lockPadding[index];
//           el.style.right = '0px';
//         }
//     }
//       body.style.paddingRight = '0px';
//       body.classList.remove('lock');
//   },timeout);
//   unlock = false;
//         setTimeout(function(){
//           unlock = true;          
//         },timeout);
// }

// document.addEventListener('keydown', function (e) {
//   if (e.which === 27) {
//     const popupActive = document.querySelector('.popup.open');
//     popupClose(popupActive);
//   }
// });







// БЕГУЩАЯ СТРОКА


  $(window).load(function () {  
    $("#content3").endlessScroll({ 
      width: "100vw", // Ширина строки
      height: "20px", // Высота строки
      steps: -2, // Шаг анимации в пикселях. Если число отрицательное - движение влево, положительное - вправо
      speed: 30, // Скорость анимации (0 - максимальная)
      mousestop: true // Останавливать ли полосу при наведении мыши (да - true, нет - false)
    });    
  });
  $(window).load(function () {  
    $("#content4").endlessScroll2({ 
      width: "100vw", // Ширина строки
      height: "40px", // Высота строки
      steps: -2, // Шаг анимации в пикселях. Если число отрицательное - движение влево, положительное - вправо
      speed: 30, // Скорость анимации (0 - максимальная)
      mousestop: true // Останавливать ли полосу при наведении мыши (да - true, нет - false)
    });    
  });
  (function ($) {
    $.fn.endlessScroll = function (options) {

        var options = $.extend({ width: "400px", height: "100px", steps : -2, speed : 40, mousestop : true }, options);

        var elem = $(this);
        var elemId = $(this).attr("id");
        var istep = options.steps;

        elem.css({ "overflow": "hidden", "width": options.width, "height": options.height, "position": "relative", "left": "0px", "top": "0px" })
        elem.wrapInner("<nobr />");

        elem.mouseover(function () {
            if (options.mousestop) { istep = 0; }
        })
        elem.mouseout(function () {
            istep = options.steps;
        });
        
        elem.wrapInner("<div id='" + elemId + "1' />");
        var e1 = $('#' + elemId + "1");
        e1.css({ "position": "absolute" }).clone().attr('id', elemId + "2").insertAfter(e1);
        var e2 = $('#' + elemId + "2");
        Repos(e1, e2, options.steps > 0);

        var refreshId = setInterval(function () {
            e1.css({ "left": (parseInt(e1.css("left")) + istep) + "px" });
            e2.css({ "left": (parseInt(e2.css("left")) + istep) + "px" });
            if ((parseInt(e1.css("left")) < 0) || (parseInt(e1.css("left")) > e1.width())) {
                Repos(e1, e2, options.steps > 0);
            }
        }, options.speed);


        function Repos(e1, e2, fwd) {
            e1.css({ "left": (fwd) ? "0px" : e1.width() + "px" });
            e2.css({ "left": (fwd) ? (-1 * e1.width()) + "px" : "0px" });
        }

        return elem;
    }
})(jQuery);
(function ($) {
    $.fn.endlessScroll2 = function (options) {

        var options = $.extend({ width: "400px", height: "100px", steps : -2, speed : 40, mousestop : true }, options);

        var elem = $(this);
        var elemId = $(this).attr("id");
        var istep = options.steps;

        elem.css({ "overflow": "hidden", "width": options.width, "height": options.height, "position": "relative", "left": "0px", "top": "0px" })
        elem.wrapInner("<nobr />");

        elem.mouseover(function () {
            if (options.mousestop) { istep = 0; }
        })
        elem.mouseout(function () {
            istep = options.steps;
        });
        
        elem.wrapInner("<div id='" + elemId + "1' />");
        var e1 = $('#' + elemId + "1");
        e1.css({ "position": "absolute" }).clone().attr('id', elemId + "2").insertAfter(e1);
        var e2 = $('#' + elemId + "2");
        Repos(e1, e2, options.steps > 0);

        var refreshId = setInterval(function () {
            e1.css({ "left": (parseInt(e1.css("left")) + istep) + "px" });
            e2.css({ "left": (parseInt(e2.css("left")) + istep) + "px" });
            if ((parseInt(e1.css("left")) < 0) || (parseInt(e1.css("left")) > e1.width())) {
                Repos(e1, e2, options.steps > 0);
            }
        }, options.speed);


        function Repos(e1, e2, fwd) {
            e1.css({ "left": (fwd) ? "0px" : e1.width() + "px" });
            e2.css({ "left": (fwd) ? (-1 * e1.width()) + "px" : "0px" });
        }

        return elem;
    }
})(jQuery);
  

