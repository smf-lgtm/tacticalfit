const program={1:[["Monday","Upper Hypertrophy + Core",["Bench Press 4x8","Incline DB Press 3x10","Weighted Pull-Up 4x6-8","Seated Row 3x12","DB Shoulder Press 3x10","Lateral Raise 3x15","Face Pull 3x15","Plank 3x60 sec","Hanging Leg Raise 3x12"]],["Tuesday","Run Intervals",["Run 2 min / Walk 1 min x 8","Total 24 minutes"]],["Wednesday","Lower Hypertrophy + Tactical",["Back Squat 4x8","Romanian Deadlift 4x10","Walking Lunge 3x12 each","Leg Press 3x15","Hamstring Curl 3x12","Calf Raise 4x20","Farmer Carry 4x40m","Sandbag Carry 4x30m"]],["Thursday","Zone 2",["Easy conversational pace 25 minutes"]],["Friday","Upper + Tactical Finisher",["Weighted Dips 4x8","Pull-Ups 4x max","DB Bench 3x12","Chest Supported Row 3x12","Rear Delt Fly 3x15","Curl 3x12","Tricep Pushdown 3x12","5 rounds: 250m row, 10 push-ups, 10 KB swings, 10 sit-ups"]],["Saturday","Long Run",["3km easy pace"]],["Sunday","Recovery",["30 min walk","Ankle mobility","Hip mobility","Foam rolling"]]],2:[["Monday","Upper Hypertrophy + Core",["Bench Press 4x8 - add 2.5-5kg if possible","Incline DB Press 3x10","Weighted Pull-Up 4x6-8","Seated Row 3x12","DB Shoulder Press 3x10","Lateral Raise 3x15","Face Pull 3x15","Plank 3x60 sec","Hanging Leg Raise 3x12"]],["Tuesday","Run Intervals",["Run 3 min / Walk 1 min x 7","Total 28 minutes"]],["Wednesday","Lower Hypertrophy + Tactical",["Back Squat 4x8 - add 2.5-5kg if possible","Romanian Deadlift 4x10","Walking Lunge 3x12 each","Leg Press 3x15","Hamstring Curl 3x12","Calf Raise 4x20","Farmer Carry 4x40m","Sandbag Carry 4x30m"]],["Thursday","Zone 2",["Easy conversational pace 30 minutes"]],["Friday","Upper + Tactical Finisher",["Weighted Dips 4x8","Pull-Ups 4x max","DB Bench 3x12","Chest Supported Row 3x12","Rear Delt Fly 3x15","Curl 3x12","Tricep Pushdown 3x12","5 rounds: 250m row, 10 push-ups, 10 KB swings, 10 sit-ups"]],["Saturday","Long Run",["3.5km easy pace"]],["Sunday","Recovery",["Walk","Mobility","Soft tissue"]]],3:[["Monday","Upper Hypertrophy + Core",["Bench Press 4x8 - progress if form is strong","Incline DB Press 3x10","Weighted Pull-Up 4x6-8","Seated Row 3x12","DB Shoulder Press 3x10","Lateral Raise 3x15","Face Pull 3x15","Plank 3x60 sec","Hanging Leg Raise 3x12"]],["Tuesday","Run Intervals",["Run 5 min / Walk 1 min x 5","Total 30 minutes"]],["Wednesday","Lower Hypertrophy + Tactical",["Back Squat 4x8","Romanian Deadlift 4x10","Walking Lunge 3x12 each","Leg Press 3x15","Hamstring Curl 3x12","Calf Raise 4x20","Farmer Carry 4x40m","Sandbag Carry 4x30m"]],["Thursday","Zone 2",["Easy conversational pace 35 minutes"]],["Friday","Upper + Tactical Finisher",["Weighted Dips 4x8","Pull-Ups 4x max","DB Bench 3x12","Chest Supported Row 3x12","Rear Delt Fly 3x15","Curl 3x12","Tricep Pushdown 3x12","5 rounds: 250m row, 10 push-ups, 10 KB swings, 10 sit-ups"]],["Saturday","Long Run",["4km easy pace"]],["Sunday","Recovery",["Mobility","Walking","Ankle care"]]],4:[["Monday","Upper Hypertrophy + Core",["Bench Press 4x8 - maintain weight and push reps","Incline DB Press 3x10","Weighted Pull-Up 4x6-8","Seated Row 3x12","DB Shoulder Press 3x10","Lateral Raise 3x15","Face Pull 3x15","Plank 3x60 sec","Hanging Leg Raise 3x12"]],["Tuesday","Run Intervals",["Run 10 min / Walk 1 min x 3","Total 33 minutes"]],["Wednesday","Lower Hypertrophy + Tactical",["Back Squat 4x8 - maintain weight and push reps","Romanian Deadlift 4x10","Walking Lunge 3x12 each","Leg Press 3x15","Hamstring Curl 3x12","Calf Raise 4x20","Farmer Carry 4x40m","Sandbag Carry 4x30m"]],["Thursday","Zone 2",["Easy conversational pace 40 minutes"]],["Friday","Upper + Tactical Finisher",["Weighted Dips 4x8","Pull-Ups 4x max","DB Bench 3x12","Chest Supported Row 3x12","Rear Delt Fly 3x15","Curl 3x12","Tricep Pushdown 3x12","5 rounds: 250m row, 10 push-ups, 10 KB swings, 10 sit-ups"]],["Saturday","5km Attempt",["Complete 5km. Pace does not matter."]],["Sunday","Recovery",["Walk","Mobility","Review progress"]]]};
const runTargets={1:"3km",2:"3.5km",3:"4km",4:"5km"};
function get(k){return JSON.parse(localStorage.getItem(k)||"[]")}
function set(k,v){localStorage.setItem(k,JSON.stringify(v))}
function today(){return new Date().toISOString().slice(0,10)}
["runDate","bodyDate"].forEach(id=>setTimeout(()=>{let e=document.getElementById(id);if(e)e.value=today()},0));

function populateSelects(){
  document.getElementById("sets").innerHTML=Array.from({length:12},(_,i)=>i+1).map(n=>`<option ${n===3?"selected":""}>${n}</option>`).join("");
  document.getElementById("reps").innerHTML=Array.from({length:30},(_,i)=>i+1).map(n=>`<option ${n===8?"selected":""}>${n}</option>`).join("");
  let weights=[]; for(let w=0; w<=250; w+=2.5){weights.push(w);}
  document.getElementById("weight").innerHTML=weights.map(w=>`<option ${w===20?"selected":""}>${w % 1 === 0 ? w.toFixed(0) : w.toFixed(1)}kg</option>`).join("");
  document.getElementById("rpe").innerHTML=Array.from({length:10},(_,i)=>i+1).map(n=>`<option ${n===8?"selected":""}>${n}/10</option>`).join("");
}
function show(id){document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));[...document.querySelectorAll(".tab")].find(b=>b.textContent.toLowerCase().includes(id==="prs"?"prs":id))?.classList.add("active");renderAll()}
function renderPlan(){const week=document.getElementById("planWeek").value;const done=get("done");let out="";program[week].forEach((d,i)=>{const key=`w${week}d${i}`;const checked=done.includes(key)?"checked":"";out+=`<div class="card"><div class="row"><div><h3>${d[0]} — ${d[1]}</h3></div><input class="check" type="checkbox" ${checked} onchange="toggleDone('${key}')"></div>${d[2].map(x=>`<div class="exercise">${x}</div>`).join("")}</div>`});document.getElementById("planCards").innerHTML=out}
function toggleDone(key){let d=get("done");d=d.includes(key)?d.filter(x=>x!==key):[...d,key];set("done",d);renderAll()}
function renderDashboard(){const week=document.getElementById("dashWeek").value;const done=get("done").filter(x=>x.startsWith(`w${week}d`)&&!x.endsWith("6")).length;const pct=Math.round(done/6*100);document.getElementById("mDone").textContent=`${done}/6`;document.getElementById("mPct").textContent=pct+"%";document.getElementById("bar").style.width=pct+"%";document.getElementById("mRun").textContent=runTargets[week];const bw=get("body");document.getElementById("mWeight").textContent=bw.length?bw[bw.length-1].weight:"—";const day=(new Date().getDay()+6)%7;const focus=program[week][day]||program[week][0];document.getElementById("todayFocus").innerHTML=`<b>${focus[0]} — ${focus[1]}</b><br>${focus[2].slice(0,3).join("<br>")}`}
function updateLogDays(){const week=document.getElementById("logWeek").value;document.getElementById("logDay").innerHTML=program[week].map((d,i)=>`<option value="${i}">${d[0]} — ${d[1]}</option>`).join("")}
function updateExerciseDropdown(){const week=document.getElementById("logWeek").value;const dayIndex=document.getElementById("logDay").value||0;const exercises=program[week][dayIndex][2];document.getElementById("exName").innerHTML=exercises.map(x=>`<option value="${x.replaceAll('"','&quot;')}">${x}</option>`).join("")}
function saveLog(){
  let a=get("logs");
  const custom=document.getElementById("customEx").value.trim();
  const selected=document.getElementById("exName").value;
  const exercise=custom||selected;
  const setRep=`${sets.value} x ${reps.value}`;
  const weightValue=parseFloat(weight.value.replace("kg",""));
  const repsValue=parseInt(reps.value);
  const setsValue=parseInt(sets.value);
  const e1rm=calcE1RM(weightValue,repsValue);
  a.push({date:today(),week:logWeek.value,day:document.getElementById("logDay").selectedOptions[0].text,ex:exercise,sets:setRep,setsNum:setsValue,repsNum:repsValue,weight:weight.value,weightNum:weightValue,e1rm:e1rm,rpe:rpe.value,notes:notes.value});
  set("logs",a);
  ["customEx","notes"].forEach(id=>document.getElementById(id).value="");
  renderAll();
}
function renderLogs(){document.getElementById("logs").innerHTML=get("logs").slice(-12).reverse().map(l=>`<div class="logitem"><b>${l.ex}</b> — ${l.weight}<br>Week ${l.week}, ${l.day} | ${l.sets} | RPE ${l.rpe}<br><span class="small">${l.notes||""}</span></div>`).join("")||"<div class='small'>No logs yet.</div>"}
function renderRunPlan(){let out="";[1,2,3,4].forEach(w=>out+=`<div class="exercise"><b>Week ${w}:</b> ${program[w].find(x=>x[1].includes("Run")||x[1].includes("5km"))?.[2].join(" / ")} | Long run: ${runTargets[w]}</div>`);document.getElementById("runPlan").innerHTML=out}
function saveRun(){let a=get("runs");a.push({date:runDate.value,dist:runDist.value,time:runTime.value,notes:runNotes.value});set("runs",a);["runDist","runTime","runNotes"].forEach(id=>document.getElementById(id).value="");renderAll()}
function renderRuns(){document.getElementById("runs").innerHTML=get("runs").slice(-10).reverse().map(r=>`<div class="logitem"><b>${r.dist}</b> — ${r.time}<br>${r.date}<br><span class="small">${r.notes}</span></div>`).join("")||"<div class='small'>No runs yet.</div>"}
function saveBody(){let a=get("body");a.push({date:bodyDate.value,weight:bodyWeight.value,notes:bodyNotes.value});set("body",a);["bodyWeight","bodyNotes"].forEach(id=>document.getElementById(id).value="");renderAll()}
function renderBody(){document.getElementById("bodyLogs").innerHTML=get("body").slice(-10).reverse().map(b=>`<div class="logitem"><b>${b.weight}</b><br>${b.date}<br><span class="small">${b.notes}</span></div>`).join("")||"<div class='small'>No body logs yet.</div>"}

function normaliseExerciseName(name){
  return name
    .replace(/ - .*/,"")
    .replace(/\\s+\\d+x\\d+.*/i,"")
    .replace(/\\s+\\d+\\s*x\\s*\\d+.*/i,"")
    .replace(/\\s+\\d+x\\s*max.*/i,"")
    .replace(/\\s+\\d+x\\d+.*$/i,"")
    .replace(/\\s+\\d+km.*$/i,"")
    .trim();
}
function calcE1RM(weight,reps){
  if(!weight || !reps || isNaN(weight) || isNaN(reps)) return 0;
  return weight * (1 + reps/30);
}
function targetForNewPR(pr){
  const targetE1RM = pr.e1rm + 0.1;
  const sameRepsWeight = Math.ceil(((targetE1RM / (1 + pr.reps/30)) * 2) / 5) * 2.5;
  const nextWeightSameReps = Math.max(sameRepsWeight, pr.weight + 2.5);
  const moreRepsNeeded = Math.floor(((targetE1RM / pr.weight) - 1) * 30) + 1;
  const repsTarget = Math.max(moreRepsNeeded, pr.reps + 1);
  return {
    optionA:`${nextWeightSameReps.toFixed(nextWeightSameReps % 1 ? 1 : 0)}kg x ${pr.reps} reps`,
    optionB:`${pr.weight.toFixed(pr.weight % 1 ? 1 : 0)}kg x ${repsTarget} reps`
  };
}
function buildPRs(){
  const logs=get("logs").filter(l=>parseFloat(l.weightNum || String(l.weight).replace("kg",""))>0 && parseInt(l.repsNum || String(l.sets).split("x")[1])>0);
  const prs={};
  logs.forEach(l=>{
    const ex=normaliseExerciseName(l.ex);
    const weight=parseFloat(l.weightNum || String(l.weight).replace("kg",""));
    const reps=parseInt(l.repsNum || String(l.sets).split("x")[1]);
    const e1rm= l.e1rm || calcE1RM(weight,reps);
    if(!prs[ex] || e1rm > prs[ex].e1rm){
      prs[ex]={exercise:ex,weight,reps,sets:l.sets,day:l.day,date:l.date,e1rm};
    }
  });
  return Object.values(prs).sort((a,b)=>b.e1rm-a.e1rm);
}
function renderPRs(){
  const prs=buildPRs();
  if(!prs.length){document.getElementById("prList").innerHTML="<div class='small'>No automatic PRs yet. Save a workout log with weight and reps to generate your PR board.</div>"; return;}
  document.getElementById("prList").innerHTML=prs.map(p=>{
    const t=targetForNewPR(p);
    return `<div class="pritem">
      <h3>${p.exercise}</h3>
      <b>Current PB:</b> ${p.weight.toFixed(p.weight % 1 ? 1 : 0)}kg x ${p.reps} reps<br>
      <span class="small">Estimated 1RM: ${p.e1rm.toFixed(1)}kg | ${p.date || ""}</span>
      <div class="prtarget"><b>To beat this PB:</b><br>Option 1: ${t.optionA}<br>Option 2: ${t.optionB}</div>
    </div>`;
  }).join("");
}
function exportData(){const data={done:get("done"),logs:get("logs"),runs:get("runs"),body:get("body")};const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="tactical-fitness-backup.json";a.click()}
function renderAll(){renderDashboard();renderPlan();renderLogs();renderRunPlan();renderRuns();renderBody();renderPRs()}
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"))}
populateSelects();updateLogDays();updateExerciseDropdown();renderAll();