import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

let initialized = false;

export function initGSAP() {
  if (typeof window === 'undefined' || initialized) return;
  
  gsap.registerPlugin(ScrollTrigger, Draggable);
  
  // Set default easing for Pandur brand experience
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8
  });

  initialized = true;
}

export { gsap, ScrollTrigger, Draggable };
