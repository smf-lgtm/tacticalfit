const workoutLibrary={
hypertrophy:[
{name:"Upper Hypertrophy",goal:"Muscle and strength base",exercises:["Bench Press 4x8","Incline DB Press 3x10","Weighted Pull-Up 4x6-8","Seated Row 3x12","DB Shoulder Press 3x10","Lateral Raise 3x15","Face Pull 3x15"]},
{name:"Lower Hypertrophy",goal:"Leg size, posterior chain, running resilience",exercises:["Back Squat 4x8","Romanian Deadlift 4x10","Walking Lunge 3x12 each","Leg Press 3x15","Hamstring Curl 3x12","Calf Raise 4x20"]},
{name:"Full Body Hypertrophy",goal:"Efficient muscle session",exercises:["Trap Bar Deadlift 4x6","DB Bench Press 3x10","Lat Pulldown 3x12","Goblet Squat 3x12","DB Shoulder Press 3x10","Farmer Carry 4x40m"]}
],
tactical:[
{name:"Tactical Conditioning",goal:"Work capacity, grip, core",exercises:["Farmer Carry 4x40m","Sandbag Carry 4x30m","Sled Push 4x20m","Kettlebell Swing 4x15","Push-Up 4x15","Plank 3x60 sec"]},
{name:"Loaded Carry Session",goal:"Grip, trunk, tactical robustness",exercises:["Farmer Carry 5x40m","Suitcase Carry 4x30m each","Sandbag Bear Hug Carry 4x30m","Walking Lunge 3x20m","Dead Bug 3x10 each"]},
{name:"Tactical Full Body",goal:"Strength under fatigue",exercises:["Deadlift 5x5","Pull-Up 5xMax","DB Bench 4x10","Sandbag Clean 5x5","Row 500m x4","Burpees 4x10"]}
],
police:[
{name:"Police Tactical Unit Prep",goal:"Bodyweight, running, repeat effort",exercises:["Push-Up 5xMax","Pull-Up 5xMax","Sit-Up 4x25","Shuttle Run 6x20m","Burpee 5x10","Plank 3x90 sec"]},
{name:"Operational Fitness Test Prep",goal:"Test readiness",exercises:["Push-Up 2 min test","Sit-Up 2 min test","Pull-Up Max Test","1km Run Time Trial","Farmer Carry 4x40m","Mobility Reset 10 min"]},
{name:"Foot Chase Conditioning",goal:"Short burst conditioning",exercises:["200m Run x6","Push-Up 6x12","Kettlebell Swing 6x15","Walking Lunge 4x20m","Bear Crawl 4x20m"]}
],
selection:[
{name:"Selection Grinder",goal:"High-volume mental and physical resilience",exercises:["Run 1km","Push-Up 50 total","Pull-Up 30 total","Sandbag Carry 800m total","Walking Lunge 100 total","Plank 5 min total"]},
{name:"Ruck / Pack Walk",goal:"Aerobic base and load tolerance",exercises:["Pack Walk 30-60 min","Step-Up 4x20 each","Calf Raise 4x25","Hip Flexor Stretch 2 min each","Foot/Ankle Mobility 5 min"]},
{name:"Sandbag Selection Circuit",goal:"Awkward load conditioning",exercises:["Sandbag Clean 5x5","Sandbag Squat 5x10","Sandbag Carry 5x50m","Burpee 5x10","Bear Crawl 5x20m"]}
],
travel:[
{name:"Caravan Bodyweight Session",goal:"No gym, no excuses",exercises:["Push-Up 5x15","Bodyweight Squat 5x20","Walking Lunge 4x20","Band Row 4x20","Plank 3x60 sec","Deep Squat Hold 2 min"]},
{name:"Campground Kettlebell",goal:"Travel strength and conditioning",exercises:["KB Swing 5x20","Goblet Squat 4x15","Single Arm Row 4x12 each","Push-Up 4x15","Farmer Carry 4x40m"]},
{name:"Hotel Room Reset",goal:"Low equipment maintenance",exercises:["Air Squat 4x25","Push-Up 4xMax","Reverse Lunge 4x15 each","Dead Bug 3x10 each","Couch Stretch 90 sec each"]}
],
mobility:[
{name:"Legs and Back Mobility",goal:"Ankles, hips, back",exercises:["Knee to Wall 3x10 each","Calf Stretch 60 sec each","Couch Stretch 90 sec each","90/90 Hip Stretch 60 sec each","Pigeon Stretch 60 sec each","Child's Pose 60 sec","Open Book 10 each","Deep Squat Hold 2 min"]},
{name:"Ankle and Run Prep",goal:"Run mechanics and ankle resilience",exercises:["Knee to Wall 3x10 each","Bent Knee Calf Stretch 60 sec each","Tibialis Raise 3x15","Single Leg Balance 3x30 sec","Glute Bridge 3x15","Easy Walk 10 min"]},
{name:"Recovery Reset",goal:"Downshift and recover",exercises:["Box Breathing 3 min","Child's Pose 90 sec","Thread the Needle 10 each","Couch Stretch 90 sec each","Hamstring Stretch 60 sec each","Deep Breathing 3 min"]}
]
};
let selectedReady="green";
let activeWorkout=null;
let activeIndex=0;
const runTargets={green:"5km",amber:"3km easy",red:"Walk / Mobility"};

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
  document.getElementById("logType").innerHTML=Object.keys(workoutLibrary).map(k=>`<option value="${k}">${labelType(k)}</option>`).join("");
}
function labelType(k){return {hypertrophy:"Hypertrophy",tactical:"Tactical Fitness",police:"Police Tactical Unit Prep",selection:"Special Forces / Selection Style",travel:"Caravan / Travel Mode",mobility:"Mobility / Recovery"}[k]||k}
function show(id){document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));[...document.querySelectorAll(".tab")].find(b=>b.textContent.toLowerCase().includes(id==="prs"?"prs":id))?.classList.add("active");renderAll()}
function selectReady(r){selectedReady=r;document.querySelectorAll(".choice").forEach(c=>c.classList.toggle("active",c.dataset.ready===r));previewMission()}
function adjustedWorkout(type){
  let list=workoutLibrary[type]||workoutLibrary.hypertrophy;
  let w=list[0];
  if(selectedReady==="amber"){
    return {...w,name:w.name+" - Amber Version",goal:w.goal+" with reduced volume",exercises:w.exercises.slice(0,5)};
  }
  if(selectedReady==="red"){
    return workoutLibrary.mobility[2];
  }
  return w;
}
function previewMission(){
  const type=document.getElementById("missionType").value;
  const w=adjustedWorkout(type);
  document.getElementById("missionPreview").innerHTML=`<div class="bigtitle">${w.name}</div><div class="small">${w.goal}</div><br>${w.exercises.slice(0,6).map(x=>`<div class="exercise">${x}</div>`).join("")}`;
  renderDashboard();
}
function startMission(){
  activeWorkout=adjustedWorkout(document.getElementById("missionType").value);
  activeIndex=0;
  set("activeWorkout",activeWorkout);
  set("activeIndex",activeIndex);
  renderActiveSession();
  show("session");
}
function startLibraryWorkout(type,idx){
  activeWorkout=workoutLibrary[type][idx];
  activeIndex=0;
  set("activeWorkout",activeWorkout); set("activeIndex",0);
  renderActiveSession(); show("session");
}
function renderActiveSession(){
  activeWorkout=activeWorkout || get("activeWorkout");
  activeIndex=parseInt(localStorage.getItem("activeIndex")||"0");
  if(!activeWorkout || !activeWorkout.exercises){document.getElementById("activeSession").innerHTML="<div class='small'>No active workout. Start one from Mission or Library.</div>"; return;}
  const total=activeWorkout.exercises.length;
  if(activeIndex>=total){document.getElementById("activeSession").innerHTML=`<h3>Session Complete</h3><div class="small">${activeWorkout.name}</div><button onclick="finishWorkout()">Finish Workout</button>`; return;}
  const ex=activeWorkout.exercises[activeIndex];
  const history=lastForExercise(ex);
  document.getElementById("activeSession").innerHTML=`<div class="small">Exercise ${activeIndex+1} of ${total}</div><div class="bigtitle">${cleanName(ex)}</div><div class="small">Programmed: ${ex}</div>${history?`<div class="prtarget"><b>Last time:</b> ${history.weight} | ${history.sets} | RPE ${history.rpe}</div>`:""}
  <div class="grid3"><div><label>Sets</label><select id="aSets">${document.getElementById("sets").innerHTML}</select></div><div><label>Reps</label><select id="aReps">${document.getElementById("reps").innerHTML}</select></div><div><label>Weight</label><select id="aWeight">${document.getElementById("weight").innerHTML}</select></div></div>
  <label>RPE</label><select id="aRpe">${document.getElementById("rpe").innerHTML}</select>
  <label>Notes</label><textarea id="aNotes" placeholder="Optional"></textarea>
  <button onclick="saveActiveExercise()">Save + Next</button> <button class="secondary" onclick="skipExercise()">Skip</button>`;
}
function saveActiveExercise(){
  const ex=activeWorkout.exercises[activeIndex];
  const weightValue=parseFloat(aWeight.value.replace("kg",""));
  const repsValue=parseInt(aReps.value);
  const setsValue=parseInt(aSets.value);
  const e1rm=calcE1RM(weightValue,repsValue);
  let a=get("logs");
  a.push({date:today(),category:"active",workout:activeWorkout.name,ex:ex,sets:`${setsValue} x ${repsValue}`,setsNum:setsValue,repsNum:repsValue,weight:aWeight.value,weightNum:weightValue,e1rm:e1rm,rpe:aRpe.value,notes:aNotes.value});
  set("logs",a);
  activeIndex++;
  localStorage.setItem("activeIndex",String(activeIndex));
  renderAll(); renderActiveSession();
}
function skipExercise(){activeIndex++;localStorage.setItem("activeIndex",String(activeIndex));renderActiveSession()}
function finishWorkout(){let s=get("sessions");s.push({date:today(),name:activeWorkout.name});set("sessions",s);localStorage.removeItem("activeWorkout");localStorage.removeItem("activeIndex");activeWorkout=null;activeIndex=0;renderAll();show("mission")}
function renderLibrary(){
  const type=document.getElementById("libraryType").value;
  document.getElementById("libraryList").innerHTML=workoutLibrary[type].map((w,i)=>`<div class="card"><h3>${w.name}</h3><div class="small">${w.goal}</div>${w.exercises.map(x=>`<div class="exercise">${x}</div>`).join("")}<button onclick="startLibraryWorkout('${type}',${i})">Start Workout</button></div>`).join("");
}
function updateLogWorkout(){const type=document.getElementById("logType").value;document.getElementById("logWorkout").innerHTML=workoutLibrary[type].map((w,i)=>`<option value="${i}">${w.name}</option>`).join("")}
function updateExerciseDropdown(){const type=document.getElementById("logType").value;const idx=document.getElementById("logWorkout").value||0;document.getElementById("exName").innerHTML=workoutLibrary[type][idx].exercises.map(x=>`<option value="${x.replaceAll('"','&quot;')}">${x}</option>`).join("")}
function saveLog(){
  let a=get("logs");
  const custom=document.getElementById("customEx").value.trim();
  const selected=document.getElementById("exName").value;
  const exercise=custom||selected;
  const weightValue=parseFloat(weight.value.replace("kg",""));
  const repsValue=parseInt(reps.value);
  const setsValue=parseInt(sets.value);
  const e1rm=calcE1RM(weightValue,repsValue);
  a.push({date:today(),category:logType.value,workout:document.getElementById("logWorkout").selectedOptions[0].text,ex:exercise,sets:`${setsValue} x ${repsValue}`,setsNum:setsValue,repsNum:repsValue,weight:weight.value,weightNum:weightValue,e1rm:e1rm,rpe:rpe.value,notes:notes.value});
  set("logs",a);
  ["customEx","notes"].forEach(id=>document.getElementById(id).value="");
  renderAll();
}
function renderLogs(){document.getElementById("logs").innerHTML=get("logs").slice(-12).reverse().map(l=>`<div class="logitem"><b>${l.ex}</b> — ${l.weight}<br>${l.workout||""} | ${l.sets} | RPE ${l.rpe}<br><span class="small">${l.notes||""}</span></div>`).join("")||"<div class='small'>No logs yet.</div>"}
function saveRun(){let a=get("runs");a.push({date:runDate.value,dist:runDist.value,time:runTime.value,notes:runNotes.value});set("runs",a);["runDist","runTime","runNotes"].forEach(id=>document.getElementById(id).value="");renderAll()}
function renderRuns(){document.getElementById("runs").innerHTML=get("runs").slice(-10).reverse().map(r=>`<div class="logitem"><b>${r.dist}</b> — ${r.time}<br>${r.date}<br><span class="small">${r.notes}</span></div>`).join("")||"<div class='small'>No runs yet.</div>"}
function saveBody(){let a=get("body");a.push({date:bodyDate.value,weight:bodyWeight.value,notes:bodyNotes.value});set("body",a);["bodyWeight","bodyNotes"].forEach(id=>document.getElementById(id).value="");renderAll()}
function renderBody(){document.getElementById("bodyLogs").innerHTML=get("body").slice(-10).reverse().map(b=>`<div class="logitem"><b>${b.weight}</b><br>${b.date}<br><span class="small">${b.notes}</span></div>`).join("")||"<div class='small'>No body logs yet.</div>"}
function cleanName(name){return name.replace(/ - .*/,"").replace(/\s+\d+x.*/i,"").trim()}
function normaliseExerciseName(name){return cleanName(name).replace(/\s+\d+km.*$/i,"").trim()}
function calcE1RM(weight,reps){if(!weight || !reps || isNaN(weight) || isNaN(reps)) return 0;return weight*(1+reps/30)}
function lastForExercise(name){const ex=normaliseExerciseName(name);return get("logs").slice().reverse().find(l=>normaliseExerciseName(l.ex)===ex)}
function targetForNewPR(pr){
  const targetE1RM=pr.e1rm+0.1;
  const sameRepsWeight=Math.ceil(((targetE1RM/(1+pr.reps/30))*2)/5)*2.5;
  const nextWeightSameReps=Math.max(sameRepsWeight,pr.weight+2.5);
  const repsNeeded=Math.floor(((targetE1RM/pr.weight)-1)*30)+1;
  return {optionA:`${nextWeightSameReps.toFixed(nextWeightSameReps%1?1:0)}kg x ${pr.reps} reps`,optionB:`${pr.weight.toFixed(pr.weight%1?1:0)}kg x ${Math.max(repsNeeded,pr.reps+1)} reps`};
}
function buildPRs(){
  const prs={};
  get("logs").forEach(l=>{
    const weight=parseFloat(l.weightNum||String(l.weight).replace("kg",""));
    const reps=parseInt(l.repsNum||String(l.sets).split("x")[1]);
    if(!weight||!reps)return;
    const ex=normaliseExerciseName(l.ex);
    const e1rm=l.e1rm||calcE1RM(weight,reps);
    if(!prs[ex]||e1rm>prs[ex].e1rm)prs[ex]={exercise:ex,weight,reps,sets:l.sets,date:l.date,e1rm};
  });
  return Object.values(prs).sort((a,b)=>b.e1rm-a.e1rm);
}
function renderPRs(){
  const prs=buildPRs();
  if(!prs.length){document.getElementById("prList").innerHTML="<div class='small'>No automatic PRs yet. Save a weighted workout log to generate your PR board.</div>";return;}
  document.getElementById("prList").innerHTML=prs.map(p=>{const t=targetForNewPR(p);return `<div class="pritem"><h3>${p.exercise}</h3><b>Current PB:</b> ${p.weight.toFixed(p.weight%1?1:0)}kg x ${p.reps} reps<br><span class="small">Estimated 1RM: ${p.e1rm.toFixed(1)}kg | ${p.date||""}</span><div class="prtarget"><b>To beat this PB:</b><br>Option 1: ${t.optionA}<br>Option 2: ${t.optionB}</div></div>`}).join("");
}
function renderDashboard(){
  document.getElementById("mSessions").textContent=get("sessions").length;
  document.getElementById("mRun").textContent=runTargets[selectedReady];
  const bw=get("body");document.getElementById("mWeight").textContent=bw.length?bw[bw.length-1].weight:"—";
  document.getElementById("mPRs").textContent=buildPRs().length;
}
function exportData(){const data={logs:get("logs"),runs:get("runs"),body:get("body"),sessions:get("sessions")};const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="tacticalfit-backup.json";a.click()}
function renderAll(){renderDashboard();renderLogs();renderRuns();renderBody();renderPRs();renderLibrary();renderActiveSession()}
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"))}
populateSelects();updateLogWorkout();updateExerciseDropdown();previewMission();renderAll();