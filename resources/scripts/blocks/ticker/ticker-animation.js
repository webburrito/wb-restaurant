import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class TickerAnimation {
  constructor(element) {
    this.ticker = element;
    this.container = element.querySelector('.ticker__container');
    this.tracks = element.querySelectorAll('.ticker__track');
    this.speed = parseFloat(element.dataset.tickerSpeed) || 50;
    this.scrollBased = element.dataset.scrollBased === 'true';
    this.animations = [];
    this.scrollVelocity = 0;
    this.lastScrollY = 0;
    this.isPaused = false;

    // Prevent ScrollSmoother from applying transforms
    element.setAttribute('data-speed', '0');
    element.style.willChange = 'auto';

    this.init();
  }

  init() {
    // Clone content for seamless loop
    this.tracks.forEach((track) => {
      const text = track.querySelector('.ticker__text');
      if (!text) return;

      // Create multiple clones for seamless looping
      const clones = 3;
      for (let i = 0; i < clones; i++) {
        const clone = text.cloneNode(true);
        track.appendChild(clone);
      }
    });

    // Initialize animations
    this.tracks.forEach((track, index) => {
      this.animateTrack(track, index);
    });

    // Set up scroll-based velocity if enabled
    if (this.scrollBased) {
      this.setupScrollVelocity();
    }
  }

  animateTrack(track, index) {
    const direction = track.dataset.direction || 'left';
    const texts = track.querySelectorAll('.ticker__text');
    const firstText = texts[0];
    const textWidth = firstText.offsetWidth + 60; // Include gap
    
    // Calculate duration based on speed (pixels per second)
    const duration = textWidth / this.speed;
    
    // Create seamless looping animation
    const animation = gsap.timeline({ repeat: -1 });
    
    if (direction === 'left') {
      gsap.set(track, { x: 0, y: 0, force3D: true });
      animation.to(track, {
        x: -textWidth,
        y: 0,
        duration: duration,
        ease: 'none',
        force3D: true,
        onComplete: () => {
          gsap.set(track, { x: 0, y: 0 });
        }
      });
    } else {
      gsap.set(track, { x: -textWidth, y: 0, force3D: true });
      animation.to(track, {
        x: 0,
        y: 0,
        duration: duration,
        ease: 'none',
        force3D: true,
        onComplete: () => {
          gsap.set(track, { x: -textWidth, y: 0 });
        }
      });
    }

    this.animations.push({ animation, track, direction, baseSpeed: this.speed });
  }

  setupScrollVelocity() {
    let ticking = false;
    let scrollTimeout;

    const updateVelocity = () => {
      if (this.isPaused) {
        ticking = false;
        return;
      }

      const currentScrollY = window.scrollY;
      this.scrollVelocity = Math.abs(currentScrollY - this.lastScrollY);
      this.lastScrollY = currentScrollY;

      // Update animation speed based on scroll velocity
      if (this.scrollVelocity > 0) {
        this.animations.forEach(({ animation }) => {
          const velocityMultiplier = 1 + (this.scrollVelocity / 50);
          const newTimeScale = Math.min(velocityMultiplier, 3); // Cap at 3x speed
          animation.timeScale(newTimeScale);
        });

        // Reset to normal speed when scrolling stops
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (!this.isPaused) {
            this.animations.forEach(({ animation }) => {
              gsap.to(animation, { timeScale: 1, duration: 0.5 });
            });
          }
        }, 150);
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVelocity);
        ticking = true;
      }
    });
  }

  pause() {
    this.isPaused = true;
    this.animations.forEach(({ animation }) => {
      animation.pause();
    });
  }

  play() {
    this.isPaused = false;
    this.animations.forEach(({ animation }) => {
      animation.play();
    });
  }

  destroy() {
    this.animations.forEach(({ animation }) => {
      animation.kill();
    });
    ScrollTrigger.getAll().forEach(st => st.kill());
  }
}

// Initialize all tickers on page load
document.addEventListener('DOMContentLoaded', () => {
  const tickers = document.querySelectorAll('.ticker');
  tickers.forEach(ticker => new TickerAnimation(ticker));
});

export default TickerAnimation;
