// File#: _1_anim-card
// Usage: codyhouse.co/license
(function () {
  var AnimCards = function (element) {
    this.element = element;
    this.list = this.element.getElementsByTagName("ul")[0];
    this.cards = this.list.children;
    this.reverseDirection = Util.hasClass(this.element, "anim-cards--reverse");
    this.translate = 0; // store container translate value
    this.animationId = false;
    this.animating = false;
    // change speed of animation
    this.animationSpeed = 1; // > 1 to increse speed, < 1 to reduce; always > 0
    initAnimCardsEvents(this);
  };

  function initAnimCardsEvents(cards) {
    // init observer
    var observer = new IntersectionObserver(animCardsObserve.bind(cards));
    observer.observe(cards.element);

    cards.element.addEventListener("update-card-width", function (event) {
      // reset animation on resize
      if (this.animating) {
        cancelPrevAnimation(this);
        initAnimCards(cards);
      }
    });
  }

  function animCardsObserve(entries) {
    if (entries[0].isIntersecting) {
      this.animating = true;
      initAnimCards(this); // init animation
    } else {
      this.animating = false;
      cancelPrevAnimation(this);
    }
  }

  function initAnimCards(cards) {
    cards.cardWidth = getAnimCardsWidth(cards);
    cards.animationId = window.requestAnimationFrame(triggerAnimCards.bind(cards));
  }

  function triggerAnimCards(timestamp) {
    cancelPrevAnimation(this);
    if (!this.timestamp) this.timestamp = timestamp;
    var translateIncrease = (this.timestamp - timestamp) * 0.06 * this.animationSpeed;
    this.timestamp = timestamp;
    updateAnimCardsTranslate(this, translateIncrease);
    updateAnimCardsList(this);
    setTranslate(this);
    this.animationId = window.requestAnimationFrame(triggerAnimCards.bind(this));
  }

  function updateAnimCardsTranslate(cards, translate) {
    cards.translate = cards.reverseDirection ? cards.translate - translate : cards.translate + translate;
    cards.translate = Math.round(Math.abs(cards.translate));
    if (!cards.reverseDirection) cards.translate = cards.translate * -1;
  }

  function updateAnimCardsList(cards) {
    if (Math.abs(cards.translate) <= cards.cardWidth) return;
    // need to remove first item from the list and append it to the end of list
    cards.translate = Math.abs(cards.translate) - cards.cardWidth;
    if (!cards.reverseDirection) cards.translate = cards.translate * -1;
    var clone = cards.cards[0].cloneNode(true);
    cards.list.removeChild(cards.cards[0]);
    cards.list.appendChild(clone);
  }

  function setTranslate(cards) {
    cards.list.style.transform = "translateX(" + cards.translate + "px)";
    cards.list.style.msTransform = "translateX(" + cards.translate + "px)";
  }

  function getAnimCardsWidth(cards) {
    return parseFloat(window.getComputedStyle(cards.cards[0]).marginRight) + cards.cards[0].offsetWidth;
  }

  function cancelPrevAnimation(cards) {
    if (cards.animationId) {
      window.cancelAnimationFrame(cards.animationId);
      cards.animationId = false;
    }
  }

  //initialize the AnimCards objects
  var animCards = document.getElementsByClassName("js-anim-cards"),
    requestAnimationFrameSupported = window.requestAnimationFrame,
    reducedMotion = Util.osHasReducedMotion(),
    intersectionObserverSupported = "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype;

  if (animCards.length > 0) {
    var animCardsArray = [];
    for (var i = 0; i < animCards.length; i++) {
      if (!requestAnimationFrameSupported || reducedMotion || !intersectionObserverSupported) {
        // animation is off if requestAnimationFrame/IntersectionObserver is not supported or reduced motion is on
        Util.addClass(animCards[i], "anim-cards--anim-off");
      } else {
        (function (i) {
          animCardsArray.push(new AnimCards(animCards[i]));
        })(i);
      }
    }

    if (animCardsArray.length > 0) {
      var resizingId = false,
        customEvent = new CustomEvent("update-card-width");

      window.addEventListener("resize", function () {
        clearTimeout(resizingId);
        resizingId = setTimeout(doneResizing, 500);
      });

      function doneResizing() {
        for (var i = 0; i < animCardsArray.length; i++) {
          (function (i) {
            animCardsArray[i].element.dispatchEvent(customEvent);
          })(i);
        }
      }
    }
  }
})();
