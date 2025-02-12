
document.addEventListener("DOMContentLoaded", () => {
  // Scroll smoother
  let smoother = ScrollSmoother.create({
    smooth: 1.2,
    effects: true,
    smoothTouch: 0.2,
  });

  const isMobile = () => window.matchMedia("(max-width: 700px)").matches;

  let cardWidth;
  let cardLeft;
  let colsHeight;
  if(isMobile()){
    cardWidth = "calc(100vw - 20px)";
    cardLeft = 15;
    colsHeight = 12;
  } else{
    cardWidth = "40rem";
    cardLeft = 0;
    colsHeight = 8;
  }




  // load animation
  const animationOnLoad = gsap.timeline();      
  animationOnLoad.to("h1 span", {yPercent: -100, duration: 1, ease: "expo.out", delay: .5})
    .to("#hookPhrase .mask", { width: "100%", duration: 0.4}, "<.7") 
    .set("#hookPhrase .txt", {opacity: 1})
    .to("#hookPhrase .mask", { width: 0, duration: 0.4}) 




  // Card presentation animation 
  const tlCard = gsap.timeline();      
  tlCard.to(".presentation_box", {height: '19rem', top: 0, padding: "7.3rem 2.5rem 2.5rem 2.5rem", y: "-1.8rem", duration: 0.4})
    .to(".card_presentation", { y: 30, duration: 0.4}, "<") 
    .to(".presentation_box", {width: cardWidth, left: cardLeft, x: "-2.5rem", duration: 0.36}, "<") 
    .to(".cardName", {color: "#fff"}, "<") 
    .from(".presentation_box > span", {width: 0, duration: 0.6}) 
    .from(".presentation_box > div", {opacity: 0}, "<") 
    .reversed(true); 

  const card_presentation = document.querySelector(".card_presentation");
  const cardBtn = document.querySelector(".card_presentation > div:first-child");
  const closeCard = document.querySelectorAll("#closeOverlay, .presentation_box a");

  card_presentation.addEventListener("mouseenter", () => tlCard.play());
  card_presentation.addEventListener("mouseleave", () => tlCard.reverse());
  cardBtn.addEventListener("click", () => tlCard.play());
  closeCard.forEach(close => close.addEventListener("click", () => tlCard.reverse()));




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



  // ScrollSpy animation
  let navLinks = document.querySelectorAll('nav p');
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



  // ScrollTo transition
  navLinks.forEach(link =>{
    magneticElement(link);
    link.addEventListener("click", ()=>{
      element = "#" + link.dataset.selector
      smoother.scrollTo(element , true, "top 100px")
    })
  })



  // intro background transition
  let transitionColorTl = gsap.timeline()
  transitionColorTl.from("body", { background: "#000" })
                .from("#introSec h1, #introSec p, #loopContainer p,  header nav p", { color: "#fff" }, "<")
                .to(".lookBox svg path", { stroke: "#000" }, "<")

  ScrollTrigger.create({
      trigger: "#introSec",
      start: "80% 25%",
      end: "100% 25%",
      scrub: 1,
      animation: transitionColorTl,
  })




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





  // elevate cols animation
  const upCols = document.querySelectorAll('.speedCols > div');
  upCols.forEach((box, index) => {
      gsap.to(box, {
          height: `${(index + 1) * colsHeight + 5}vw`,
          scrollTrigger:{
            trigger: "#about-section",
            start: "center 100%",
            end: "center 40%",
            scrub: 1.5,
            // markers: { startColor: "orange", endColor: "purple", fontSize: "12px" },
          }
      });
  });





  // Project cols animation
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
          // markers: { startColor: "orange", endColor: "purple", fontSize: "12px" },
          animation: tl
      });
  });




  gsap.from("footer", {y: 100, duration: .4, ease: "power1.out",
    scrollTrigger: {
      trigger: "#projects-section",
      start: "bottom 90%",
      toggleActions: "restart none none reverse",
    }
  });
});