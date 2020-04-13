const accordions = document.getElementsByClassName("accordion");

for (let i = 0; i < accordions.length; i++) {
     accordions[i].addEventListener('click', function () {
          this.classList.toggle('is-open');
          // this looks for the next element to the button element
        var content = this.nextElementSibling;        
        if(content.style.maxHeight) {
        // looks at the height of the accordion: if it is open, it closes it
            content.style.maxHeight = null;
           // console.log("Accordion closes");
        }
        else {
        // looks at the height of the accordion if it is closed and then opens it  
            content.style.maxHeight = content.scrollHeight + 'px';
            // console.log("Accordion opens");
        }
    
     }) 
}


// navigating back to home page
const redirectingBack = () => {
    window.location = "index.html";
}