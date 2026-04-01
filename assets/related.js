
(async function(){
  var slug=document.body.dataset.slug; if(!slug)return;
  var family=document.body.dataset.family||"";
  var el=document.getElementById("related"); if(!el)return;
  var cat;
  try{var r=await fetch("catalog.json");if(r.ok)cat=await r.json()}catch(e){}
  if(!cat&&window.__CATALOG)cat=window.__CATALOG;
  if(!cat||!family)return;
  var MD=String.fromCodePoint(183);
  var related=cat.filter(function(c){
    if(c.concept_id.replace(/[^A-Za-z0-9]+/g,"_")===slug)return false;
    var chips=Array.isArray(c.chips)?c.chips:c.chips?[c.chips]:[];
    return chips.some(function(ch){return ch.indexOf(family)===0 && ch.indexOf(MD)>0});
  }).slice(0,5);
  if(!related.length)return;
  var h=`<h2>Related Concepts</h2><div class="related-row">`;
  related.forEach(function(c){
    var sl=c.concept_id.replace(/[^A-Za-z0-9]+/g,"_");
    var exams=Array.isArray(c.exams)?c.exams:c.exams?[c.exams]:[];
    var dots=exams.map(function(e){return `<span class="rc-dot">${e}</span>`}).join("");
    h+=`<div class="related-card"><h4><a href="${sl}.html">${c.title}</a></h4>`+
       `<div class="rc-id">${c.concept_id}</div><div class="rc-dots">${dots}</div></div>`;
  });
  h+=`</div>`;el.innerHTML=h;
})();
