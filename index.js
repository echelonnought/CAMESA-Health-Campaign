const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");

navbarToggler.addEventListener("click", navbarTogglerClicked);

function navbarTogglerClicked() {
  navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
}

navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinksClicked));
 
function navbarLinksClicked(event) {
  smoothScroll(event); // smooth scrolling effect
  if (navbarMenu.classList.contains("open")) {
    navbarToggler.click();
  }
}

 function smoothScroll(event) {
   event.preventDefault();
   const targetId = event.currentTarget.getAttribute("href");
   console.log(targetId);
   window.scrollTo({
     top: targetId === '#' ? 0 : document.querySelector(targetId).offsetTop,
     behavior: "smooth"
    }
   )
 }

// for (let i = 0; i < navbarLinks.length; i++) {
//      counter[i] = navbarLinks[i];
//     counter[i].addEventListener('click', navbarLinksClicked)
// }

// Registering Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(responseReg => console.log("Registered!", responseReg.scope))
      .catch(err => console.log("Nada mi Amigo!: ", err));
  });
}



const sliderChild = document.querySelector(".sliderchild");

let initialPosition = null;
let moving = false;
let transform = 0;

const gestureStart = e => {
  initialPosition = e.pageX;
  moving = true;
  const transformMatrix = window
    .getComputedStyle(sliderChild)
    .getPropertyValue("transform");
   
  if (transformMatrix !== "none") {
    transform = parseInt(transformMatrix.split(",")[4].trim());
  }
  console.log(transform)
};
const gestureMove = e => {
  if (moving) {
    const currentPosition = e.pageX;
    const diff = currentPosition - initialPosition;
    sliderChild.style.transform = `translatex(${diff}px)`;
  }
};
const gestureEnd = e => {
  moving = false;
};

if (window.PointerEvent) {
  window.addEventListener("pointerdown", gestureStart, true);
  window.addEventListener("pointermove", gestureMove, true);
  window.addEventListener("pointerup", gestureEnd, true);
} else {
  window.addEventListener("touchdown", gestureStart, true);
  window.addEventListener("touchmove", gestureMove, true);
  window.addEventListener("touchup", gestureEnd, true);
}
