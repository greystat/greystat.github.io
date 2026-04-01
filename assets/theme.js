
(function(){
  var S=String.fromCodePoint(9728),M=String.fromCodePoint(9790);
  var t=localStorage.getItem("cardia-theme")||(window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");
  document.body.classList.add(t);
  var btn=document.getElementById("theme-toggle");
  if(btn){btn.textContent=t==="dark"?S:M;
    btn.addEventListener("click",function(){
      t=t==="dark"?"light":"dark";document.body.classList.remove("light","dark");
      document.body.classList.add(t);localStorage.setItem("cardia-theme",t);
      btn.textContent=t==="dark"?S:M;})}
})();
