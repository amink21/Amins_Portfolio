function scrollToOutro() {
  document.querySelector('.intro').scrollIntoView({ behavior: 'smooth' });
}

function openResume() {
  const resumeUrl = 'assets/Amin-Kadawala_Resume.pdf';  
  const link = document.createElement('a');
  link.href = resumeUrl;
  link.download = 'My_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".ws",
  start: "top bottom",
  end: "bottom bottom",
  scrub: 1,
  onUpdate: (self) => {
    const galleryWrapper = document.querySelector(".gallery-wrapper");
    const sideCols = document.querySelectorAll(".col:not(.main)");
    const mainImg = document.querySelector(".img.main img");
    const textOverlay = document.querySelector(".text-overlay");

    const screenWidth = window.innerWidth;
    const maxScale = screenWidth < 900 ? 4 : 3.25;

    // Reverse the scale to shrink instead of grow
    const scale = maxScale - self.progress * (maxScale - 0.75);
    const yTranslate = 300 - self.progress * 300; // Reverse translate upwards to downwards
    const mainImgScale = 1.15 + self.progress * 0.85; // Grow the main image slightly

    // Reverse opacity to fade in instead of fade out
    const opacity = self.progress;
    const textOpacity = 1 - self.progress;

    galleryWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
    galleryWrapper.style.opacity = opacity; // Increase opacity dynamically

    sideCols.forEach((col) => {
      col.style.transform = `translateY(${yTranslate}px)`;
      col.style.opacity = opacity; // Adjust opacity for side columns as well
    });

    mainImg.style.transform = `scale(${mainImgScale})`;
    mainImg.style.opacity = opacity; // Adjust opacity for the main image

    textOverlay.style.opacity = textOpacity; // Fade out the text
    textOverlay.style.transform = `translate(-50%, calc(-50% + ${
      self.progress * 50
    }px))`; // Optional: slide down slightly
  },
});

function startLoader(){
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  document.body.style.overflow = "hidden";  

  function updateCounter(){
      if (currentValue === 100){
          setTimeout(() => {
              preloader.style.display = "none";  // Completely remove preloader
              counterElement.style.display = "none"; // Hide counter after loading is complete
              document.body.style.overflow = "auto";  // Enable scrolling after load
          }, 1500);  // Delay for fade effect
          return;
      }
      currentValue += Math.floor(Math.random() * 5) + 5;

      if (currentValue > 100){
          currentValue = 100;
      }

      counterElement.textContent = currentValue;

      let delay = Math.floor(Math.random() * 100) + 30;
      setTimeout(updateCounter, delay);

  }
  updateCounter();
  }

  startLoader();

  gsap.to(".counter", {
  duration: 0.25,
  delay: 1.5,
  opacity: 0,
  });

  gsap.to(".bar", {
  duration: 1.5,
  delay: 1.5,
  height: 0,
  stagger: {
      amount: 0.5,
  },
  ease: "power4.inOut",
  });

  gsap.from(".h1", {
  duration: 1.5,
  delay: 2,
  y: 400,
  stagger: {
      amount: 0.5,
  },
  ease: "power4.inOut",
  });

  gsap.from(".h2", {
  duration: 1.5,
  delay: 2.5,
  y: 400,
  stagger: {
      amount: 0.5,
  },
  ease: "power4.inOut",
  });

  gsap.from(".bottom-nav", {
  duration: 2,
  delay: 3,
  y: 400,
  ease: "power4.inOut",
  });

  gsap.from(".resumebtn", {
  duration: 1.5,
  delay: 2.8,
  y: 400,
  ease: "power4.inOut",
  });

const phrase = "I’m a Computer Science student with a passion for blending design and technology. With a strong foundation in web development and digital design, I strive to create innovative solutions that are both functional and visually appealing. I believe that readable content and streamlined design aren't just for pages—they're essential to building effective and user-friendly tech. My goal is to combine my technical skills with my design sensibility to craft beautiful, impactful solutions.";
const container = document.getElementById('body2');
const letters = []; // Array to store all letter elements for GSAP animations

// Split the phrase into words and letters
function createText(phrase) {
phrase.split(" ").forEach((word) => {
const wordElement = document.createElement('p'); // Word wrapper
word.split("").forEach((letter) => {
  const letterElement = document.createElement('span');
  letterElement.textContent = letter;
  letters.push(letterElement); // Save reference for animation
  wordElement.appendChild(letterElement);
});
container.appendChild(wordElement); // Add word to the text container
});
}

// Initialize GSAP animations
function animateText() {

gsap.to(letters, {
scrollTrigger: {
  trigger: container,
  start: 'top 60%', 
  end: 'center 100%',
  scrub: 2,         
},
opacity: 1,            // Fade in
y: 0,                  // Move into position
stagger: 0.4,         // Animate letters sequentially
ease: 'power3.out'     // Smooth easing
});
}

// Create and animate text on page load
createText(phrase);
animateText();

// Mouse and touch movement variables
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
let touchStartX = 0;
let touchStartY = 0;

// Event listeners for mouse or touch input
if (isTouchDevice) {
  document.addEventListener("touchstart", (event) => {
    if (event.touches.length === 1) {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }
  });

  document.addEventListener("touchmove", (event) => {
    if (event.touches.length === 1) {
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;

      mouseX = (touchX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (touchY - window.innerHeight / 2) / (window.innerHeight / 2);

      headerRotationX = -mouseY * 30;
      headerRotationY = mouseX * 30;
      headerTranslateZ = Math.abs(mouseX * mouseY) * 50;
    }
  });
} else {
  document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

    headerRotationX = -mouseY * 30;
    headerRotationY = mouseX * 30;
    headerTranslateZ = Math.abs(mouseX * mouseY) * 50;
  });
}


// configuration parameters
const params = {
  rows: 1, // No longer needed as we are removing image grid
  columns: 1, // No longer needed
  curvature: 5,
  spacing: 10,
  depth: 7.5,
  elevation: 0,
  lookAtRange: 20,
  verticalCurvature: 0.5,
};

// scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee); // Set a solid light gray background color (can change to any color)
document.body.appendChild(renderer.domElement);

// debug mode setup
const DEBUG_MODE = false;
let gui;
if (DEBUG_MODE) {
  gui = new dat.GUI();
  gui.add(params, "rows", 1, 8);
  gui.add(params, "columns", 1, 10);
  gui.add(params, "imageWidth", 1, 9);
  gui.add(params, "imageHeight", 1, 10);
  gui.add(params, "spacing", 2, 10);
  gui.add(params, "curvature", 0, 10);
  gui.add(params, "verticalCurvature", 0, 2);
  gui.add(params, "depth", 5, 50);
  gui.add(params, "elevation", -10, 10);
  gui.add(params, "lookAtRange", 5, 50).name("Look Range");
}

// header animation setup
const header = document.querySelector(".header");
let headerRotationX = 0;
let headerRotationY = 0;
let headerTranslateZ = 0;

// mouse movement variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const lookAtTarget = new THREE.Vector3(0, 0, 0);

// event listeners
document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
  mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

  headerRotationX = -mouseY * 30;
  headerRotationY = mouseX * 30;
  headerTranslateZ = Math.abs(mouseX * mouseY) * 30;
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// animation loop
function animate() {
  requestAnimationFrame(animate);

  // update header transform
  const targetTransform = `
     translate(-50%, -50%)
     perspective(1000px)
     rotateX(${headerRotationX}deg)
     rotateY(${headerRotationY}deg)
     translateZ(${headerTranslateZ}px)
   `;

  header.style.transform = targetTransform;
  header.style.transition =
    "transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)";

  // update camera target
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  lookAtTarget.x = targetX * params.lookAtRange;
  lookAtTarget.y = -targetY * params.lookAtRange;
  lookAtTarget.z =
    (lookAtTarget.x * lookAtTarget.x) / (params.depth * params.curvature);

  camera.lookAt(lookAtTarget);
  renderer.render(scene, camera);
}

// start animation
animate();

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
