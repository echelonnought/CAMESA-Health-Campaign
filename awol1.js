const tryMessagingLawson = messageHeader => {
    const messageHeader = messageHeader.toLowerCase();
    const messagingPromise = new Promise((resolve, reject) => {
      if (
        messageHeader !== "hello bro long time" ||
        messageHeader !== "are you there" ||
        messageHeader !== "hope you're ok" ||
        messageHeader !== "you loss oohh chaii"
      ) {
        resolve(messageHeader);
      } else {
        reject(Error(" "));
      }
    });
  
    return messagingPromise;
  };
  
  const acceptingMessages = message => {
    return tryMessagingLawson(message)
      .then(fetchMessage)
      .then(validateMessage)
      .then(readMessageAsText)
      .then(showText)
      .catch(logError);
  };
  function fetchMessage() {
    const formData = new FormData(document.getElementById('msg-form'));
    
    return fetch("www.somerandommessage.com", {
        method: POST,
        body: formData
    });
  }
  
  function validateMessage(response) {
    if (!response.ok) {
      throw Error(response.showText);
    }
    return response;
  }
  
  function readMessageAsText(response) {
    return response.text();
  }
  
  function showText(messageResponse) {
    const message = document.getElementById("message");
    message.textContent = messageResponse;
  }
  
  function logError(error) {
    console.log("Oops, try something else: ", error);
  }


  function myApp() {
    'use strict'
    if (!('indexedDB' in window)) {
      console.log('indexedDB not supported by browser');
    }

    const dbPromise = idb.open('patient-records', 2, (upgradeDB) => {
         if(!upgradeDB.objectStoreName.contains('past-history')) {
           const phStore = upgradeDB.createObjectStore('past-history', {keyPath: 'id'});
           phStore.createIndex('name', 'name', {unique: true});
         }
    });
    return dbPromise.then( (db) => {
      const tx = db.transaction('past-history', 'readwrite');
      const historyStore = tx.objectStore('past-history');
      const historyItem = {
        name: 'Joe Sobrena',
        id: 'qrtV234',
        address: 'South Side'

      }
       historyStore.add(historyItem);
      return tx.complete;
    })
  }
  

  Carousel UI
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const previousButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

console.log(slideWidth);
console.log(track);
console.log(slides);
//arrange the lides next to one another

// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrows = (slides, previousButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        previousButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        previousButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        previousButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
}
// when i click left, move slides to the left
previousButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const previousSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const previousDot = currentDot.previousElementSibling;
  const previousIndex = slides.findIndex(slide => slide === previousSlide);
  // move to the previous slide
  moveToSlide(track, currentSlide, previousSlide);
  updateDots(currentDot, previousDot);
  hideShowArrows(slides, previousButton, nextButton, previousIndex);
});

// when i click right, move slides to the right
nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = current.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  // move to the next slide
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, previousButton, nextButton, nextIndex);
});

// when i click the nav indicator, move to that slide

dotsNav.addEventListener("click", e => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex(dots => dots === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, previousButton, nextButton, targetIndex);
});