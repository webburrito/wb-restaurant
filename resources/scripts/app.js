import domReady from '@roots/sage/client/dom-ready';
import "./blocks/home-hero";
import "./blocks/ticker";

import { gsap } from 'gsap';

import { Flip } from 'gsap/Flip';
import { GSDevTools } from 'gsap/GSDevTools';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(
  Flip,
  GSDevTools,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  TextPlugin
);

/**
 * Application entrypoint
 */
domReady(async () => {
  // navigation animationg
  let navigationTL = gsap.timeline({
    name: "navigation",
    defaults: { ease: "power2.out", duration: 0.5 },
  });
  navigationTL.from('.nav-primary li a', {
    y: -20,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out',
    duration: 0.5,
  }, );

  // smooth scrolling
if (window.innerWidth > 768) {
  const wrapper = document.querySelector('.smooth-wrapper');
  const content = document.querySelector('.smooth-content');
  if (wrapper && content) {
    ScrollSmoother.create({
      wrapper: '.smooth-wrapper',
      content: '.smooth-content',
      smooth: 1.5,
      effects: true,
      ignoreMobileResize: true,
    });
  }
}

  // hero animation
  let heroTL = gsap.timeline({
    name: "hero",
    defaults: { ease: "power2.out", duration: 0.5 },
  });
  heroTL.from('.home-hero__motif', { // screen swipe
    y: 20,
    opacity: 0,
    ease: 'power2.out',
    duration: 0.5,
  });

  heroTL.from('.home-hero__heading', { // heading
    y: 20,
    opacity: 0,
    ease: 'power2.out',
    duration: 0.5,
  }, "-=0.3");

  heroTL.from('.home-hero__subheading', { // subheading
    y: 20,
    opacity: 0,
    ease: 'power2.out',
    duration: 0.5,
  }, "-=0.3");

// if scrolled down then animate the header background in
  ScrollTrigger.create({
    start: "top -50",
    end: 99999,
    toggleClass: { targets: "header", className: "site-header--scrolled" },
  });
});

/**
 * @see {@link https://webpack.js.org/api/hot-module-replacement/}
 */
if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error);
