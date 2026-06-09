"use client";

import "lenis/dist/lenis.css";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  destroyLenisGsap,
  initLenisGsap,
} from "@/lib/motion/lenis-gsap";
import type Lenis from "lenis";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
  ready: boolean;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  ready: false,
});

export function useLenis() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [ctx, setCtx] = useState<SmoothScrollContextValue>({
    lenis: null,
    ready: false,
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCtx({ lenis: null, ready: true });
      return;
    }

    document.documentElement.classList.add("lenis", "lenis-smooth");
    const instance = initLenisGsap();
    setCtx({ lenis: instance, ready: true });

    return () => {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      destroyLenisGsap();
      setCtx({ lenis: null, ready: false });
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={ctx}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
