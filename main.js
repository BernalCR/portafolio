

// Scroll smoother
let smoother = ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
  smoothTouch: 0.2,
});



// Card presentation animation 
const tlCard = gsap.timeline();      
tlCard.to(".presentation_box", {height: '19rem', top: 0, padding: "7.3rem 2.5rem 2.5rem 2.5rem", y: "-1.8rem", duration: 0.4})
   .to(".card_presentation", { y: 30, duration: 0.4}, "<") 
   .to(".presentation_box", {width: '40rem', left: 0, x: "-2.5rem", duration: 0.36}, "<") 
  //  .to(".presentation_box p, .presentation_box a", {color: "#000"}, "<") 
   .to(".cardName", {color: "#fff"}, "<") 
   .from(".presentation_box > span", {width: 0, duration: 0.6}) 
   .from(".presentation_box > div", {opacity: 0}, "<") 
   .reversed(true); 

const card_presentation = document.querySelector(".card_presentation");
card_presentation.addEventListener("mouseenter", () => tlCard.play() );
card_presentation.addEventListener("mouseleave", () => tlCard.reverse());




// intro background transition
let introAnimation = gsap.timeline()
introAnimation.from("body", { background: "#000" })
    // .from("#introSec h1, #introSec p, #loopContainer p, header nav a, .cardName", { color: "#fff" }, "<")
    .from("#introSec h1, #introSec p, #loopContainer p,  header nav a", { color: "#fff" }, "<")
    // .to(".presentation_box a, .presentation_box p", { color: "#000" }, "<")


ScrollTrigger.create({
    trigger: "#introSec",
    start: "70% 25%",
    end: "100% 25%",
    scrub: 1,
    // markers: { startColor: "orange", endColor: "purple", fontSize: "12px" },
    animation: introAnimation,
})




// Seleccionar todos los boxes
const boxes = document.querySelectorAll('.speedCols > div');

// Crear la animación para cada box
boxes.forEach((box, index) => {
    gsap.to(box, {
        height: `${(index + 1) * 8 + 5}vw`,
        scrollTrigger:{
          trigger: "#about-section",
          start: "center 100%",
          end: "center 40%",
          scrub: 1.5,
          // markers: { startColor: "orange", endColor: "purple", fontSize: "12px" },
        }
    });
});

// Loop text animation
const firstTextLoop = document.getElementById("firstTextLoop");
const secondTextLoop = document.getElementById("secondTextLoop");
const slider = document.getElementById("loopContainer");
let xPercent = 0;
let direction = 1;

const animation = () => {
  if (xPercent <= -100) xPercent = 0;
  if (xPercent > 0) xPercent = -100;

  gsap.set(firstTextLoop, { xPercent: xPercent });
  gsap.set(secondTextLoop, { xPercent: xPercent });

  xPercent += 0.09 * direction;
  requestAnimationFrame(animation);
};

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);
  
    gsap.to(loopContainer, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 1,
        onUpdate: e => direction = e.direction * -1,
      },
      x: "-200px",
    });
});




// Magnetic animation
const magneticElement = (element) =>{
  const xTo = gsap.quickTo(element, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
  const yTo = gsap.quickTo(element, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})
  
  element.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const {height, width, left, top} = element.getBoundingClientRect();
      const x = (clientX - (left + width/2)) * 0.3;
      const y = (clientY - (top + height/2)) * .92;
      xTo(x);
      yTo(y)
  })
  element.addEventListener("mouseleave", (e) => {
      xTo(0);
      yTo(0)
  })
}
const magneticBtn = document.querySelector('.magneticBtn');
magneticElement(magneticBtn)




// Funcion que evalua en que seccion estamos
let navLinks = document.querySelectorAll('nav a');
let section = document.querySelectorAll('.nav_section');
const scrollspy = () =>{
    section.forEach((sec, i) =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id")
        if(top >= offset && top < offset + height){
            navLinks.forEach(link =>{ link.classList.remove("active") });
            document.querySelector('[data-selector="'+ id +'"]').classList.add("active");
        }
    });
}

window.addEventListener("scroll", scrollspy);
window.addEventListener("load", scrollspy);




// Funcion para que los anchors de la navegacion funcionen con scroll smoother
navLinks.forEach(link =>{
  magneticElement(link)
  link.addEventListener("click", ()=>{
    element = "#" + link.dataset.selector
    smoother.scrollTo(element , true, "top 100px")
  })
})




const projects = document.querySelectorAll('.projectBox');
projects.forEach((project, index) => {
    let tl = gsap.timeline(); 
    tl.from(project, { y: 120, opacity: 0, duration: 1})
    tl.from(project.querySelector('img'), { scale: 1.08, duration: 0.7}, "<")
    tl.from(project.querySelector('span'), { yPercent: 100, duration: 1}, "<0.3")

    ScrollTrigger.create({
        trigger: project,
        start: "center 90%",
        end: "center 45%",
        toggleActions: "restart none none reverse",
        markers: { startColor: "orange", endColor: "purple", fontSize: "12px" },
        animation: tl
    });
});