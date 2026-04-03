
const SLUG="DIAGNOSIS_CODE_5";
function fmtInt(x){return(x==null||Number.isNaN(x))?"—":String(Math.round(x))}
function fmtPct(x){return(x==null||Number.isNaN(x))?"—":Number(x).toFixed(1)+"%"}
async function loadJ(p,g){if(location.protocol==="file:"&&window[g])return window[g];try{const r=await fetch(p);if(!r.ok)throw 0;return await r.json()}catch(e){return window[g]||{}}}
document.addEventListener("DOMContentLoaded",async()=>{
const KL={all:"All",sex:"Sex",race:"Race",center:"Center",race_sex:"Sex + Race",sex_center:"Sex + Center",race_center:"Race + Center",race_sex_center:"Sex + Race + Center"};
const C=await loadJ("data/"+SLUG+".json","__"+SLUG+"_CONCEPT");
const chips=document.querySelector(".chips");
(C.chips||[]).forEach(t=>{const a=document.createElement("a");a.className="chip";a.textContent=t;a.href="index.html?chip="+encodeURIComponent(t);chips.appendChild(a)});
const mtb=document.querySelector("#members-table tbody");
(C.members||[]).forEach(m=>{const tr=document.createElement("tr");tr.innerHTML=`<td>${m.exam||""}</td><td>${m.dataset||m.dataset_stub||""}</td><td>${m.varname||""}</td><td>${m.instrument||""}</td><td>${m.notes||""}</td>`;mtb.appendChild(tr)});
const TC={},BC={};
async function load(el){if(!TC[el])TC[el]=await loadJ(`data/${SLUG}_${el}.json`,`__${SLUG}_EXAM_${el}`)||{};if(!BC[el]){const w=await loadJ(`data/${SLUG}_${el}_freq.json`,`__${SLUG}_${el}_FREQ`);BC[el]=(w&&w.by)?w.by:{}}}
function tiles(el){const t=TC[el]||{};document.querySelector("#t-n").textContent=fmtInt(t.n);document.querySelector("#t-miss").textContent=fmtInt(t.missing);document.querySelector("#t-levels").textContent=fmtInt(t.n_levels);document.querySelector("#t-mode").textContent=t.mode_level||"—"}
function freqTbl(el,k){const gs=(BC[el]||{})[k]||[];const tb=document.querySelector("#freq-table tbody");tb.innerHTML="";
if(k==="all"&&gs.length===1){const fr=gs[0].freq||[];fr.forEach(r=>{const tr=document.createElement("tr");tr.innerHTML=`<td>${r.level??""}</td><td>${fmtInt(r.count)}</td><td>${fmtPct(r.pct)}</td>`;tb.appendChild(tr)});document.querySelector("#freq-table thead").innerHTML="<tr><th>Level</th><th>Count</th><th>Percent</th></tr>"}
else{document.querySelector("#freq-table thead").innerHTML="<tr><th>Group</th><th>N</th><th>Missing</th><th>Levels</th><th>Mode</th></tr>";gs.forEach(r=>{const tr=document.createElement("tr");tr.innerHTML=`<td>${r.label??""}</td><td>${fmtInt(r.n)}</td><td>${fmtInt(r.missing)}</td><td>${fmtInt(r.n_levels)}</td><td>${r.mode_level??"—"}</td>`;tb.appendChild(tr)})}
document.getElementById("freq-title-key").textContent=KL[k]||k}
const eB=Array.from(document.querySelectorAll(".exam-pills .pill"));let cE=eB.length?eB[0].dataset.exam:"A",cG="all";
function sGB(k){for(const b of document.querySelectorAll(".group-pills .pill"))b.setAttribute("aria-pressed",String(b.dataset.key===k))}
function sEB(el){for(const b of document.querySelectorAll(".exam-pills .pill"))b.setAttribute("aria-pressed",String(b.dataset.exam===el))}
function sI(el,k){document.getElementById("bar-img").src=`img/${SLUG}_${el}_bar_${k}.svg`;document.getElementById("bar-title-key").textContent=KL[k]||k;document.getElementById("exam-title-bar").textContent=el;document.getElementById("exam-title-freq").textContent=el}
async function setE(el){cE=el;sEB(el);await load(el);tiles(el);sI(el,cG);freqTbl(el,cG)}
function setG(k){cG=k;sGB(k);sI(cE,k);freqTbl(cE,k)}
for(const b of eB)b.addEventListener("click",()=>setE(b.dataset.exam));
for(const b of document.querySelectorAll(".group-pills .pill"))b.addEventListener("click",()=>setG(b.dataset.key));
await load(cE);tiles(cE);setG("all")});
