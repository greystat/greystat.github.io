
const SLUG="EXAM1_AGE";
function fmtNum(x,d=1){return(x==null||Number.isNaN(x))?"—":Number(x).toFixed(d)}
function fmtInt(x){return(x==null||Number.isNaN(x))?"—":String(Math.round(x))}
async function loadJ(p,g){if(location.protocol==="file:"&&window[g])return window[g];try{const r=await fetch(p);if(!r.ok)throw 0;return await r.json()}catch(e){return window[g]||{}}}
document.addEventListener("DOMContentLoaded",async()=>{
const KL={all:"All",sex:"Sex",race:"Race",center:"Center",race_sex:"Sex + Race",sex_center:"Sex + Center",race_center:"Race + Center",race_sex_center:"Sex + Race + Center"};
const C=await loadJ("data/"+SLUG+".json","__"+SLUG+"_CONCEPT");
const chips=document.querySelector(".chips");
(C.chips||[]).forEach(t=>{const a=document.createElement("a");a.className="chip";a.textContent=t;a.href="index.html?chip="+encodeURIComponent(t);chips.appendChild(a)});
const mtb=document.querySelector("#members-table tbody");
(C.members||[]).forEach(m=>{const tr=document.createElement("tr");tr.innerHTML=`<td>${m.exam||""}</td><td>${m.dataset||m.dataset_stub||""}</td><td>${m.varname||""}</td><td>${m.instrument||""}</td><td>${m.notes||""}</td>`;mtb.appendChild(tr)});
const TC={},BC={};
async function load(el){if(!TC[el])TC[el]=await loadJ(`data/${SLUG}_${el}.json`,`__${SLUG}_EXAM_${el}`)||{};if(!BC[el]){const w=await loadJ(`data/${SLUG}_${el}_summaries.json`,`__${SLUG}_${el}_SUMMARIES`);BC[el]=(w&&w.by)?w.by:{}}}
function tiles(el){const t=TC[el]||{};document.querySelector("#t-n").textContent=fmtInt(t.n);document.querySelector("#t-miss").textContent=fmtInt(t.missing);document.querySelector("#t-mean").textContent=fmtNum(t.mean,1);document.querySelector("#t-sd").textContent=fmtNum(t.sd,1)}
function sumTbl(el,k){const rows=(BC[el]||{})[k]||[];const tb=document.querySelector("#sum-table tbody");tb.innerHTML="";rows.forEach(r=>{const tr=document.createElement("tr");tr.innerHTML=`<td>${r.label??""}</td><td>${fmtInt(r.n)}</td><td>${fmtInt(r.missing)}</td><td>${fmtNum(r.mean,1)}</td><td>${fmtNum(r.sd,1)}</td><td>${fmtNum(r.p05,1)}</td><td>${fmtNum(r.q1,1)}</td><td>${fmtNum(r.median,1)}</td><td>${fmtNum(r.q3,1)}</td><td>${fmtNum(r.p95,1)}</td><td>${fmtNum(r.iqr,1)}</td>`;tb.appendChild(tr)});document.getElementById("sum-title-key").textContent=KL[k]||k}
const eB=Array.from(document.querySelectorAll(".exam-pills .pill"));let cE=eB.length?eB[0].dataset.exam:"A",cG="all";
function sGB(k){for(const b of document.querySelectorAll(".group-pills .pill"))b.setAttribute("aria-pressed",String(b.dataset.key===k))}
function sEB(el){for(const b of document.querySelectorAll(".exam-pills .pill"))b.setAttribute("aria-pressed",String(b.dataset.exam===el))}
function sI(el,k){const b=`img/${SLUG}_${el}_`;document.getElementById("hist-img").src=`${b}hist_${k}.svg`;document.getElementById("box-img").src=`${b}box_${k}.svg`;document.getElementById("hist-title-key").textContent=KL[k]||k;document.getElementById("box-title-key").textContent=KL[k]||k;document.getElementById("exam-title-hist").textContent=el;document.getElementById("exam-title-box").textContent=el;document.getElementById("exam-title-sum").textContent=el}
async function setE(el){cE=el;sEB(el);await load(el);tiles(el);sI(el,cG);sumTbl(el,cG)}
function setG(k){cG=k;sGB(k);sI(cE,k);sumTbl(cE,k)}
for(const b of eB)b.addEventListener("click",()=>setE(b.dataset.exam));
for(const b of document.querySelectorAll(".group-pills .pill"))b.addEventListener("click",()=>setG(b.dataset.key));
await load(cE);tiles(cE);setG("all")});
