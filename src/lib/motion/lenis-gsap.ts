import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;
let refreshFn: (() => void) | null = null;

export function initLenisGsap(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    lerp: 0.1,
    wheelMultiplier: 1,
    touchMultiplier: 1.8,
  });

  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (!lenis) return 0;
      if (arguments.length && typeof value === "number") {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.documentElement.style.transform ? "transform" : "fixed",
  });

  refreshFn = () => lenis?.resize();
  ScrollTrigger.addEventListener("refresh", refreshFn);

  tickerFn = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.defaults({ markers: false });
  ScrollTrigger.refresh();

  return lenis;
}

export function destroyLenisGsap() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  if (refreshFn) {
    ScrollTrigger.removeEventListener("refresh", refreshFn);
    refreshFn = null;
  }
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  lenis?.destroy();
  lenis = null;
}

export function getLenis() {
  return lenis;
}

export { gsap, ScrollTrigger };
