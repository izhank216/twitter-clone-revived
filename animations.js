import $ from 'jquery';
import 'jquery-migrate';
import { gsap } from 'gsap';

// jQuery animations
export const fadeInElement = (selector, duration = 400) => {
  if (typeof window !== 'undefined') {
    $(selector).fadeIn(duration);
  }
};

export const fadeOutElement = (selector, duration = 400) => {
  if (typeof window !== 'undefined') {
    $(selector).fadeOut(duration);
  }
};

export const animateTweets = (selector) => {
  if (typeof window !== 'undefined') {
    $(selector).hide().slideDown(600);
  }
};

// GSAP animations
export const gsapFadeIn = (selector, duration = 1) => {
  if (typeof window !== 'undefined') {
    gsap.from(selector, { opacity: 0, duration });
  }
};

export const gsapSlideUp = (selector, y = 50, duration = 1) => {
  if (typeof window !== 'undefined') {
    gsap.from(selector, { y, opacity: 0, duration });
  }
};
