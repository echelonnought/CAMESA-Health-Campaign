const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");

navbarToggler.addEventListener("click", navbarTogglerClicked);

function navbarTogglerClicked() {
  navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
}

navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinksClicked));
 
function navbarLinksClicked() {
  smoothScroll(); // smooth scrolling effect
  if (navbarMenu.classList.contains("open")) {
    navbarToggler.click();
  }
}

//  function smoothScroll(event) {
//    event.preventDefault();
//    const targetId = event.currentTarget.getAttribute("href");
//    console.log(targetId);
//    document.querySelector(targetId).scrollIntoView({
//      behavior: "smooth",
//      block: "start"
//     }
//    )
//  }

function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href') ==="#" ? "main" : e.currentTarget.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });
}


// for (let i = 0; i < navbarLinks.length; i++) {
//      counter[i] = navbarLinks[i];
//     counter[i].addEventListener('click', navbarLinksClicked)
// }






const sliderChild = document.querySelector(".sliderchild");

let initialPosition = null;
let moving = false;
let transform = 0;
let lastPageX = 0;
const gestureStart = e => {
  initialPosition = e.pageX;
  moving = true;
  const transformMatrix = window
    .getComputedStyle(sliderChild)
    .getPropertyValue("transform");
   
  if (transformMatrix !== "none") {
    transform = parseInt(transformMatrix.split(",")[4].trim());
  }
  console.log(transformMatrix)
};
const gestureMove = e => {
  if (moving) {
    const currentPosition = e.pageX;
   
    const diff = currentPosition - initialPosition;
    transfromedValue = transform + diff;
    sliderChild.style.transform = `translatex(${diff}px)`;
  }
  lastPageX = e.pageX;
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
