const firstTextLoop = document.getElementById("firstTextLoop");
const secondTextLoop = document.getElementById("secondTextLoop");
const slider = document.getElementById("loopContainer");
let xPercent = 0;
let direction = 1;


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

const animation = () => {
  if (xPercent <= -100) xPercent = 0;
  if (xPercent > 0) xPercent = -100;

  gsap.set(firstTextLoop, { xPercent: xPercent });
  gsap.set(secondTextLoop, { xPercent: xPercent });

  xPercent += 0.05 * direction;
  requestAnimationFrame(animation);
};