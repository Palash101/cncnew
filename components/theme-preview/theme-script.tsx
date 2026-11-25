/* TEMPORARY: colour-combination testing. Delete this folder once a combination is chosen. */
"use client";

import { ENABLED_KEY, STORAGE_KEY } from "./palettes";

const DEV = process.env.NODE_ENV === "development";

/*
 * Restores the saved combination before first paint. In production the preview only
 * switches on for visitors who open the site with ?colors (and off with ?colors=off).
 */
const SCRIPT = `(function(){try{var q=new URLSearchParams(location.search).get("colors");if(q!==null){q==="off"?(localStorage.removeItem("${ENABLED_KEY}"),localStorage.removeItem("${STORAGE_KEY}")):localStorage.setItem("${ENABLED_KEY}","1")}if(${DEV}||localStorage.getItem("${ENABLED_KEY}")==="1"){var s=JSON.parse(localStorage.getItem("${STORAGE_KEY}")||"null");if(s&&s.palette.id!=="original"){var d=document.documentElement;for(var k in s.vars)d.style.setProperty(k,s.vars[k]);d.dataset.palette=s.palette.id}}}catch(e){}})()`;

export default function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: SCRIPT }}
    />
  );
}
