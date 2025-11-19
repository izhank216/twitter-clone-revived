import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import 'jquery-migrate';
import { gsap } from 'gsap';
import anime from 'animejs/lib/anime.es.js';

export const fadeInElement = (s,d=400)=>$(s).fadeIn(d);
export const fadeOutElement = (s,d=400)=>$(s).fadeOut(d);
export const draggableElement = s=>$(s).draggable();
export const animateTweets = s=>$(s).hide().slideDown(600);

export const gsapFadeIn = (s,d=1)=>gsap.from(s,{opacity:0,duration:d});
export const gsapSlideUp = (s,y=50,d=1)=>gsap.from(s,{y,opacity:0,duration:d});

export const animeBounce = (s,d=800)=>anime({targets:s,translateY:[-10,0],easing:'easeOutBounce',duration:d});
export const animeRotate = (s,d=1000)=>anime({targets:s,rotate:'1turn',duration:d,easing:'easeInOutSine'});
