!function(){var t={start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]")},e=t.start,n=t.stop,a=null,o=0,c=function(t,e){return e.setAttribute(t,"")},s=function(t,e){return e.removeAttribute(t,"")},d=function(t,e,n){e.classList.toggle(t),n.classList.toggle(t)},l=function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));document.body.style.backgroundColor=t,o+=1,console.log("successful color change, hex: ".concat(t,", number of changes: ").concat(o))};c("disabled",n),n.classList.add("disabled"),e.addEventListener("click",(function(t){d("disabled",e,n),c("disabled",e),s("disabled",n),l(),a=setInterval(l,1e3)})),n.addEventListener("click",(function(){d("disabled",e,n),s("disabled",e),c("disabled",n),clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.dcfe32e4.js.map
