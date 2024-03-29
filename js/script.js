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

/*Back to Top button  */

(function() {
  'use strict';

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('up-show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('up-show');
    }
  }

  function backToTop() {
    var scrolled = window.pageYOffset;
    if (scrolled > 0) {
      window.scrollBy(0, -scrolled);
    }
  }

  var goTopBtn = document.querySelector('.up');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
})();
    


// СЛАЙДЕР

const WRAPPER_SELECTOR=".slider__wrapper",ITEMS_SELECTOR=".slider__items",ITEM_SELECTOR=".slider__item",CONTROL_CLASS="slider__control",SELECTOR_PREV='.slider__control[data-slide="prev"]',SELECTOR_NEXT='.slider__control[data-slide="next"]',SELECTOR_INDICATOR=".slider__indicators>li",SLIDER_TRANSITION_OFF="slider_disable-transition",CLASS_CONTROL_HIDE="slider__control_hide",CLASS_ITEM_ACTIVE="slider__item_active",CLASS_INDICATOR_ACTIVE="active";class ChiefSlider{constructor(t,e){const s="string"==typeof t?document.querySelector(t):t;this._$root=s,this._$wrapper=s.querySelector(WRAPPER_SELECTOR),this._$items=s.querySelector(ITEMS_SELECTOR),this._$itemList=s.querySelectorAll(ITEM_SELECTOR),this._$controlPrev=s.querySelector(SELECTOR_PREV),this._$controlNext=s.querySelector(SELECTOR_NEXT),this._$indicatorList=s.querySelectorAll(SELECTOR_INDICATOR),this._minOrder=0,this._maxOrder=0,this._$itemWithMinOrder=null,this._$itemWithMaxOrder=null,this._minTranslate=0,this._maxTranslate=0,this._direction="next",this._balancingItemsFlag=!1,this._activeItems=[],this._transform=0,this._hasSwipeState=!1,this.__swipeStartPos=0,this._transform=0,this._intervalId=null,this._config={loop:!0,autoplay:!1,interval:5e3,refresh:!0,swipe:!0},this._config=Object.assign(this._config,e);const i=this._$itemList,n=i[0].offsetWidth,a=this._$wrapper.offsetWidth,r=Math.round(a/n);this._widthItem=n,this._widthWrapper=a,this._itemsInVisibleArea=r,this._transformStep=100/r;for(let t=0,e=i.length;t<e;t++)i[t].dataset.index=t,i[t].dataset.order=t,i[t].dataset.translate=0,t<r&&this._activeItems.push(t);if(this._config.loop){const t=i.length-1,e=100*-i.length;i[t].dataset.order=-1,i[t].dataset.translate=100*-i.length,i[t].style.transform=`translateX(${e}%)`,this.__refreshExtremeValues()}else this._$controlPrev&&this._$controlPrev.classList.add(CLASS_CONTROL_HIDE);this._setActiveClass(),this._addEventListener(),this._updateIndicators(),this._autoplay()}_addEventListener(){const t=this._$root,e=this._$items,s=this._config;function i(t){this._autoplay("stop");const e=0===t.type.search("touch")?t.touches[0]:t;this._swipeStartPos=e.clientX,this._hasSwipeState=!0}function n(t){if(!this._hasSwipeState)return;const e=0===t.type.search("touch")?t.changedTouches[0]:t,s=this._swipeStartPos-e.clientX;s>50?(this._direction="next",this._move()):s<-50&&(this._direction="prev",this._move()),this._hasSwipeState=!1,this._config.loop&&this._autoplay()}t.addEventListener("click",function(t){const e=t.target;if(this._autoplay("stop"),e.classList.contains(CONTROL_CLASS))t.preventDefault(),this._direction=e.dataset.slide,this._move();else if(e.dataset.slideTo){const t=parseInt(e.dataset.slideTo,10);this._moveTo(t)}this._config.loop&&this._autoplay()}.bind(this)),t.addEventListener("mouseenter",function(){this._autoplay("stop")}.bind(this)),t.addEventListener("mouseleave",function(){this._autoplay()}.bind(this)),s.refresh&&window.addEventListener("resize",function(){window.requestAnimationFrame(this._refresh.bind(this))}.bind(this)),s.loop&&(e.addEventListener("transition-start",function(){this._balancingItemsFlag||(this._balancingItemsFlag=!0,window.requestAnimationFrame(this._balancingItems.bind(this)))}.bind(this)),e.addEventListener("transitionend",function(){this._balancingItemsFlag=!1}.bind(this))),s.swipe&&(t.addEventListener("touchstart",i.bind(this)),t.addEventListener("mousedown",i.bind(this)),document.addEventListener("touchend",n.bind(this)),document.addEventListener("mouseup",n.bind(this))),t.addEventListener("dragstart",function(t){t.preventDefault()}.bind(this)),document.addEventListener("visibilitychange",function(){"hidden"===document.visibilityState?this._autoplay("stop"):"visible"===document.visibilityState&&this._config.loop&&this._autoplay()}.bind(this))}__refreshExtremeValues(){const t=this._$itemList;this._minOrder=+t[0].dataset.order,this._maxOrder=this._minOrder,this._$itemByMinOrder=t[0],this._$itemByMaxOrder=t[0],this._minTranslate=+t[0].dataset.translate,this._maxTranslate=this._minTranslate;for(let e=0,s=t.length;e<s;e++){const s=t[e],i=+s.dataset.order;i<this._minOrder?(this._minOrder=i,this._$itemByMinOrder=s,this._minTranslate=+s.dataset.translate):i>this._maxOrder&&(this._maxOrder=i,this._$itemByMaxOrder=s,this._maxTranslate=+s.dataset.translate)}}_balancingItems(){if(!this._balancingItemsFlag)return;const t=this._$wrapper.getBoundingClientRect(),e=t.width/this._itemsInVisibleArea/2,s=this._$itemList.length;let i,n;if("next"===this._direction){const a=t.left,r=this._$itemByMinOrder;i=this._minTranslate,n=r.getBoundingClientRect(),n.right<a-e&&(r.dataset.order=this._minOrder+s,i+=100*s,r.dataset.translate=i,r.style.transform=`translateX(${i}%)`,this.__refreshExtremeValues())}else{const a=t.right,r=this._$itemByMaxOrder;i=this._maxTranslate,n=r.getBoundingClientRect(),n.left>a+e&&(r.dataset.order=this._maxOrder-s,i-=100*s,r.dataset.translate=i,r.style.transform=`translateX(${i}%)`,this.__refreshExtremeValues())}requestAnimationFrame(this._balancingItems.bind(this))}_setActiveClass(){const t=this._activeItems,e=this._$itemList;for(let s=0,i=e.length;s<i;s++){const i=e[s],n=+i.dataset.index;t.indexOf(n)>-1?i.classList.add(CLASS_ITEM_ACTIVE):i.classList.remove(CLASS_ITEM_ACTIVE)}}_updateIndicators(){const t=this._$indicatorList,e=this._$itemList;if(t.length)for(let s=0,i=e.length;s<i;s++){e[s].classList.contains(CLASS_ITEM_ACTIVE)?t[s].classList.add("active"):t[s].classList.remove("active")}}_move(){const t="next"===this._direction?-this._transformStep:this._transformStep;let e=this._transform+t;if(!this._config.loop){const t=this._transformStep*(this._$itemList.length-this._itemsInVisibleArea);if(e=Math.round(10*e)/10,e<-t||e>0)return;this._$controlPrev&&(this._$controlPrev.classList.remove(CLASS_CONTROL_HIDE),this._$controlNext.classList.remove(CLASS_CONTROL_HIDE),e===-t?this._$controlNext.classList.add(CLASS_CONTROL_HIDE):0===e&&this._$controlPrev.classList.add(CLASS_CONTROL_HIDE))}const s=[];let i,n,a,r=0;if("next"===this._direction)for(r=0,i=this._activeItems.length;r<i;r++)n=this._activeItems[r],n+=1,a=n,a>this._$itemList.length-1&&(a-=this._$itemList.length),s.push(a);else for(r=0,i=this._activeItems.length;r<i;r++)n=this._activeItems[r],n-=1,a=n,a<0&&(a+=this._$itemList.length),s.push(a);this._activeItems=s,this._setActiveClass(),this._updateIndicators(),this._transform=e,this._$items.style.transform=`translateX(${e}%)`,this._$items.dispatchEvent(new CustomEvent("transition-start",{bubbles:!0}))}_moveToNext(){this._direction="next",this._move()}_moveToPrev(){this._direction="prev",this._move()}_moveTo(t){const e=this._$indicatorList;let s,i,n=null,a=null;for(s=0,i=e.length;s<i;s++){const i=e[s];if(i.classList.contains("active")){const e=+i.dataset.slideTo;(null===a||Math.abs(t-e)<a)&&(n=e,a=Math.abs(t-n))}}if(a=t-n,0!==a)for(this._direction=a>0?"next":"prev",s=1;s<=Math.abs(a);s++)this._move()}_autoplay(t){if(this._config.autoplay)return"stop"===t?(clearInterval(this._intervalId),void(this._intervalId=null)):void(null===this._intervalId&&(this._intervalId=setInterval((()=>{this._direction="next",this._move()}),this._config.interval)))}_refresh(){const t=this._$itemList,e=t[0].offsetWidth,s=this._$wrapper.offsetWidth,i=Math.round(s/e);if(i===this._itemsInVisibleArea)return;this._autoplay("stop"),this._$items.classList.add(SLIDER_TRANSITION_OFF),this._$items.style.transform="translateX(0)",this._widthItem=e,this._widthWrapper=s,this._itemsInVisibleArea=i,this._transform=0,this._transformStep=100/i,this._balancingItemsFlag=!1,this._activeItems=[];for(let e=0,s=t.length;e<s;e++){const s=t[e],n=e;s.dataset.index=n,s.dataset.order=n,s.dataset.translate=0,s.style.transform="translateX(0)",n<i&&this._activeItems.push(n)}if(this._setActiveClass(),this._updateIndicators(),window.requestAnimationFrame((()=>{this._$items.classList.remove(SLIDER_TRANSITION_OFF)})),!this._config.loop)return void(this._$controlPrev&&this._$controlPrev.classList.add(CLASS_CONTROL_HIDE));const n=t.length-1,a=100*-t.length;t[n].dataset.order=-1,t[n].dataset.translate=100*-t.length,t[n].style.transform="translateX(".concat(a,"%)"),this.__refreshExtremeValues(),this._autoplay()}next(){this._moveToNext()}prev(){this._moveToPrev()}moveTo(t){this._moveTo(t)}refresh(){this._refresh()}}
document.addEventListener('DOMContentLoaded', function () {
        const slider = new ChiefSlider('.slider', {
          loop: false
        });
      });



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
  

