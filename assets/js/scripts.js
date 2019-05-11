/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}


function getWindowSize() {
  if (typeof (window.innerWidth) == 'number') {
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else {
    if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
      myWidth = document.documentElement.clientWidth;
      myHeight = document.documentElement.clientHeight;
    } else {
      if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
      }
    }
  }
  setAspectRatio();
}

function setAspectRatio() {
  var body = document.querySelector("body");
  var skillsDiv = document.querySelector(".skills");
  var aspectRatio = myWidth / myHeight
  // console.log("width " + myWidth);
  // console.log("height " + myHeight);
  // console.log("aspect ratio is " + aspectRatio);

  if( aspectRatio >= 2 ) {
    //Very Wide Screen
    body.classList = "aspect-very-wide";
  } else if ( aspectRatio < 2 && aspectRatio >= 1.5  ) {
    //Wide Screen
    body.classList = "aspect-wide";
  } else if ( aspectRatio < 1.5 && aspectRatio >= 1 ) {
    body.classList = "aspect-tall";
  } else if ( aspectRatio < 1 ) {
    body.classList = "aspect-very-tall";
  }

}

getWindowSize();
window.addEventListener('resize', getWindowSize);





//Start: arrow click functionality

var bioSection = document.querySelector("#bio");
var arrow = document.querySelector("#arrow")

arrow.addEventListener("click", scrollToIntroSection );

function scrollToIntroSection () {
    window.scrollTo({
      top: bioSection.offsetTop,
      behavior: 'smooth'
    });
}

// End: arrow click functionality




// Start: Timeline section JS

function nextDetailModal (activeDetailItemNode) {
    var parent = activeDetailItemNode
    var parentIndex = parseInt(parent.getAttribute("data-details-item"))

    parent.classList.remove("show");
    // console.log(parentIndex)
    // console.log(parentIndex + 1)


    if( parentIndex === 5 ) {
      var nextDetailItem =  document.querySelector("[data-details-item='1']");
    } else {
      var nextDetailItem =  document.querySelector("[data-details-item='" + (parentIndex + 1) + "']");
    }
    nextDetailItem.classList.add("show")
}


function prevDetailModal (activeDetailItemNode) {
    var parent = activeDetailItemNode
    var parentIndex = parent.getAttribute("data-details-item")
    parent.classList.remove("show");
    if( parentIndex == 1 ) {
      var prevDetailItem =  document.querySelector("[data-details-item='5']");
    } else {
      var prevDetailItem =  document.querySelector("[data-details-item='" + (parentIndex - 1) + "']");
    }
    prevDetailItem.classList.add("show")
}


function closeDetailModal(activeDetailItemNode) {
    var parent =activeDetailItemNode
    parent.classList.remove("show")
}


document.addEventListener('click', function (event) {

    if (event.target.matches('.timelineItem__expand')) {
        console.log("expand button clicked");
        var itemIndex = event.target.parentNode.getAttribute("data-timeline-item")
        var detailsElem = "[data-details-item='" + itemIndex + "']";
        var detailsElem = document.querySelector(detailsElem);
        detailsElem.classList.toggle("show");
    }

    if (event.target.matches('.timelineDetails__close')) {
       closeDetailModal(event.target.parentNode.parentNode)
    }

  if (event.target.matches('.timelineDetails__prev')) {
      prevDetailModal(event.target.parentNode)
   }


  if (event.target.matches('.timelineDetails__next')) {
    nextDetailModal(event.target.parentNode)
   }

   if(event.target.matches('.timelineDetails')) {
        document.querySelector(".timelineDetails.show").classList.remove("show");
   }

});


document.addEventListener('keydown', function(e) {

   var openModal = document.querySelector(".show[data-details-item]")
   if( openModal != null ) {
     //there is an open modal
     if(e.keyCode == 37) { // left
        prevDetailModal(openModal)
      }
      else if(e.keyCode == 39) { // right
        nextDetailModal(openModal)
      }
    else if(e.keyCode == 27) { // esc
      closeDetailModal(openModal)
      }
   }
}, false);



(function() {
  'use strict';

  // define variables
  var timelineItem = document.querySelectorAll(".timelineItem");
  var circle = document.querySelectorAll(".circle");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= ( (window.innerHeight + 100) || (document.documentElement.clientHeight + 100) ) &&
      rect.right <= ( (window.innerWidth + 100) || (document.documentElement.clientWidth + 100) )
    );
  }

  function isTopPortionOfElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top <= ( (window.innerHeight - 100) || (document.documentElement.clientHeight - 100))
    );
  }

  function callbackFunc() {
    for (var i = 0; i < timelineItem.length; i++) {
      if (isElementInViewport(timelineItem[i])) {
        timelineItem[i].classList.add("in-view");
      }
    }

    for (var i = 0; i < circle.length; i++) {
      if (isTopPortionOfElementInViewport(circle[i])) {
        circle[i].classList.add("in-view");
      }
    }

  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();

// End: Timeline section JS
