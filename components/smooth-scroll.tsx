"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { cn } from "@/lib/utils";

/** How close (px) the cursor must be to the right edge to reveal the scrollbar */
const EDGE_ZONE = 24;
/** How long (ms) the scrollbar stays visible after scrolling stops */
const HIDE_DELAY = 900;
const MIN_THUMB = 40;
const INSET = 4;

/**
 * Site-wide smooth scrolling (Lenis) + a slim auto-hiding scrollbar.
 * The native scrollbar is hidden in globals.css.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 1,
        anchors: { offset: -80 },
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
      <ScrollIndicator />
    </ReactLenis>
  );
}

function ScrollIndicator() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | null>(null);
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);

  const [scrolling, setScrolling] = useState(false);
  const [nearEdge, setNearEdge] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  // Compute thumb size/position straight on the DOM node (no re-render per frame)
  const update = useCallback((scroll: number, limit: number) => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    const track = window.innerHeight - INSET * 2;
    const docHeight = limit + window.innerHeight;
    const size = Math.max(MIN_THUMB, (window.innerHeight / docHeight) * track);
    const progress = limit > 0 ? scroll / limit : 0;
    thumb.style.height = `${size}px`;
    thumb.style.transform = `translateY(${progress * (track - size)}px)`;
    setScrollable(limit > 1);
  }, []);

  const lenis = useLenis((l) => {
    update(l.scroll, l.limit);
    setScrolling(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setScrolling(false), HIDE_DELAY);
  });

  // Initial measurement + keep in sync with resizes / content changes
  useEffect(() => {
    if (!lenis) return;
    const sync = () => update(lenis.scroll, lenis.limit);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(document.body);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [lenis, update]);

  // Reveal when the cursor approaches the right edge
  useEffect(() => {
    const onMove = (e: MouseEvent) => setNearEdge(e.clientX >= window.innerWidth - EDGE_ZONE);
    const onLeave = () => setNearEdge(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(
    () => () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    },
    []
  );

  // Drag the thumb to scroll
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!lenis) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, startScroll: lenis.scroll };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !lenis || !thumbRef.current) return;
    const track = window.innerHeight - INSET * 2;
    const free = track - thumbRef.current.offsetHeight;
    if (free <= 0) return;
    const delta = ((e.clientY - drag.current.startY) / free) * lenis.limit;
    lenis.scrollTo(drag.current.startScroll + delta, { immediate: true });
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    drag.current = null;
    setDragging(false);
  };

  const visible = scrollable && (scrolling || nearEdge || dragging);
  const expanded = nearEdge || dragging;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 bottom-0 z-[90] w-3"
    >
      <div
        ref={thumbRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "absolute top-1 right-[3px] rounded-full bg-[#0B1739]/35 transition-[opacity,width,background-color] duration-300 ease-out will-change-transform",
          expanded ? "w-[7px] bg-[#0B1739]/55" : "w-[4px]",
          dragging && "bg-[#0B1739]/70",
          visible ? "pointer-events-auto cursor-grab opacity-100" : "opacity-0",
          dragging && "cursor-grabbing"
        )}
      />
    </div>
  );
}
