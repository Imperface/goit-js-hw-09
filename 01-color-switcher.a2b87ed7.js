const t={start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]")},{start:e,stop:d}=t;let s=null;const a=(t,e)=>e.setAttribute(t,""),l=(t,e)=>e.removeAttribute(t,""),o=(t,e,d)=>{e.classList.toggle(t),d.classList.toggle(t)},r=()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=t};a("disabled",d),d.classList.add("disabled"),e.addEventListener("click",(t=>{o("disabled",e,d),a("disabled",e),l("disabled",d),r(),s=setInterval(r,1e3)})),d.addEventListener("click",(()=>{o("disabled",e,d),l("disabled",e),a("disabled",d),clearInterval(s)}));
//# sourceMappingURL=01-color-switcher.a2b87ed7.js.map
