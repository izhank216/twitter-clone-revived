import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import 'jquery-migrate';
import { gsap } from 'gsap';

// jQuery animations
export const fadeInElement = (s, d = 400) => $(s).fadeIn(d);
export const fadeOutElement = (s, d = 400) => $(s).fadeOut(d);
export const draggableElement = (s) => $(s).draggable();
export const animateTweets = (s) => $(s).hide().slideDown(600);

// GSAP animations
export const gsapFadeIn = (s, d = 1) => gsap.from(s, { opacity: 0, duration: d });
export const gsapSlideUp = (s, y = 50, d = 1) =>
  gsap.from(s, { y, opacity: 0, duration: d });
