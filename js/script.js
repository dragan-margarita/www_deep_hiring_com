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

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('html');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
    for(let index = 0; index < popupLinks.length; index++){
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click",function(e){ 
          const popupName = popupLink.getAttribute('href').replace('#','');
          const curentPopup = document.getElementById(popupName);
          popupOpen(curentPopup);
          e.preventDefault();

        }); 
      }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length> 0) {
      for(let index = 0; index <  popupCloseIcon.length; index++){
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e){
          popupClose(el.closest('.popup'));
          e.preventDefault();
        });
      }
}
function popupOpen(curentPopup){
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    }else{
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e){
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnLock = true){
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnLock) {
      bodyUnLock();
    }
  }
}

function bodyLock(){
  const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
  if (lockPadding.length>0) {

  for (let index = 0; index < lockPadding.length; index++){
        const el = lockPadding[index];
        el.style.right = lockPaddingValue;
        }
    }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function(){
          unlock = true;          
        },timeout);
}

function bodyUnLock(){
  setTimeout(function(){
    if(lockPadding.length > 0){
      for(let index = 0; index < lockPadding.length; index++){
          const el = lockPadding[index];
          el.style.right = '0px';
        }
    }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
  },timeout);
  unlock = false;
        setTimeout(function(){
          unlock = true;          
        },timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});







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
  

