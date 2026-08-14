const CATS={
  musica:['🎵','Música'],dj_ball:['💃','DJ / ball'],cultura_popular:['🔥','Cultura popular'],infantil:['🧒','Infantil'],tallers:['🛠️','Tallers / activitats'],gastronomia:['🍴','Gastronomia'],espectacles:['🎭','Espectacles'],altres:['✨','Altres']
};
const DAYS=['2026-08-14','2026-08-15','2026-08-16','2026-08-17','2026-08-18','2026-08-19','2026-08-20','2026-08-21'];
const WEEK=['dg','dl','dt','dc','dj','dv','ds'];
const WEEK_SHORT=['DG','DL','DT','DC','DJ','DV','DS'];
const SUPABASE_URL='https://girfbvvetgpisigzvvsy.supabase.co';
const SUPABASE_KEY='sb_publishable_vYvy1hWUDtc0ltmYvCbcqA_ohekPQSn';
const GROUP_ID='gracia26-x7k9';
const FAVORITES_API=`${SUPABASE_URL}/rest/v1/favorites`;
const STATE_MIGRATION_KEY=`festigracia-cloud-state-migrated-${GROUP_ID}-v5`;
const PENDING_KEY=`festigracia-pending-${GROUP_ID}`;
const DONE_PREFIX='done:';
const YELLOW_SEED_VERSION='yellow-docx-v1';
const YELLOW_SEED_MARKER=`__seed:${YELLOW_SEED_VERSION}`;
const YELLOW_LOCAL_KEY=`festigracia-${YELLOW_SEED_VERSION}`;
const DONE_REPAIR_VERSION='repair-done-v1';
const DONE_REPAIR_MARKER=`__repair:${DONE_REPAIR_VERSION}`;
const YELLOW_DEFAULTS=[{"date":"2026-08-15","start":"10:30","end":"13:30","location":"Plaça de les Dones del 36","title":"Activitats sostenibles (EcoJuga, Cursa de cavalls, ceràmica, bijuteria, cosmètica natural, titelles)"},{"date":"2026-08-15","start":"12:00","end":"","location":"Carrer La Perla","title":"Vermut rumbero amb Los Pelos del Gato"},{"date":"2026-08-15","start":"13:00","end":"","location":"Carrer Puigmartí","title":"Vermut musical amb Blue Chiefs"},{"date":"2026-08-15","start":"13:00","end":"","location":"Plaça del Nord","title":"Show Drag amb Klamy GoSy i Lucía Massalta"},{"date":"2026-08-15","start":"13:00","end":"","location":"Joan Blanques de Baix de Tot","title":"Vermut musical amb Alma de Boquerón"},{"date":"2026-08-15","start":"18:00","end":"","location":"Plaça Rovira i Trias","title":"Tardeig amb DJ Jade Rolt"},{"date":"2026-08-15","start":"18:30","end":"","location":"Gran de Gràcia → Plaça de la Vila","title":"Cercavila de cultura popular"},{"date":"2026-08-15","start":"20:00","end":"","location":"Carrer Ciudad Real","title":"Coral Iaioflautes"},{"date":"2026-08-15","start":"22:00","end":"","location":"Carrer Sant Pere Màrtir","title":"Drag Show amb Astra Bomb"},{"date":"2026-08-15","start":"23:00","end":"","location":"Plaça del Nord","title":"Arlanda + Set d'Índie + DJ"},{"date":"2026-08-15","start":"23:00","end":"","location":"Plaça John Lennon","title":"Concert Baby Jane"},{"date":"2026-08-16","start":"11:00","end":"","location":"Carrer Llibertat","title":"Taller de xapes (Societat Tolkien Barcelona)"},{"date":"2026-08-16","start":"12:00","end":"","location":"Carrer Mozart","title":"Ioga amb Xana Dahdal"},{"date":"2026-08-16","start":"12:00","end":"","location":"Joan Blanques de Baix","title":"Concert amb The Barroom Buddies Band"},{"date":"2026-08-16","start":"13:00","end":"","location":"Carrer Puigmartí","title":"Vermut i paella valenciana"},{"date":"2026-08-16","start":"13:00","end":"","location":"Plaça del Poble Gitano","title":"Vermut rumbero amb Peret Reyes, Yumitus del Pichón i Ezequiel"},{"date":"2026-08-16","start":"14:00","end":"","location":"Carrer Llibertat","title":"Botifarrada popular"},{"date":"2026-08-16","start":"14:00","end":"","location":"Joan Blanques de Baix de Tot","title":"Botifarrada popular"},{"date":"2026-08-16","start":"16:00","end":"","location":"Plaça del Raspall","title":"Rondalles amb Baül Creatiu"},{"date":"2026-08-16","start":"18:00","end":"","location":"Carrer Puigmartí","title":"Bingo musical"},{"date":"2026-08-16","start":"18:00","end":"","location":"Carrer Perill","title":"Taller de penjoll brodat"},{"date":"2026-08-16","start":"18:00","end":"","location":"Plaça Vila de Gràcia","title":"Quinto musical"},{"date":"2026-08-16","start":"18:00","end":"","location":"Carrer Mozart","title":"Activitat de ioga"},{"date":"2026-08-16","start":"18:00","end":"","location":"Fraternitat de Dalt","title":"Quinto musical"},{"date":"2026-08-16","start":"19:00","end":"","location":"Travessia Sant Antoni","title":"Miqui Puig (DJ)"},{"date":"2026-08-16","start":"19:00","end":"","location":"Joan Blanques de Baix","title":"Taller de ball en línia amb Xavi"},{"date":"2026-08-16","start":"21:00","end":"","location":"Plaça de les Dones del 36","title":"Taller de Lindy Hop"},{"date":"2026-08-16","start":"22:30","end":"","location":"Plaça de les Dones del 36","title":"Concert The A Swing Band"},{"date":"2026-08-16","start":"23:00","end":"","location":"Plaça Vila de Gràcia","title":"Préssecs, Pascuals i els Desnatats"},{"date":"2026-08-16","start":"23:00","end":"","location":"Fraternitat de Dalt","title":"Astra Bomb Drag Show + DJ Set"},{"date":"2026-08-16","start":"00:30","end":"","location":"La Torna","title":"PD Les 3 Maries"},{"date":"2026-08-17","start":"10:00","end":"","location":"Plaça de la Vila","title":"Visita guiada audiodescrita als carrers guarnits"},{"date":"2026-08-17","start":"11:00","end":"","location":"Joan Blanques de Baix","title":"Taller de pastisseria amb Forn Dismon"},{"date":"2026-08-17","start":"11:00","end":"","location":"Plaça del Raspall","title":"Vermut amb Cor Popular 4 Galls"},{"date":"2026-08-17","start":"12:00","end":"","location":"Placeta Sant Miquel","title":"Taller d'escriptura de cartes"},{"date":"2026-08-17","start":"12:30","end":"","location":"Plaça Vila de Gràcia","title":"Tast de vermuts de Reus amb David Bagés"},{"date":"2026-08-17","start":"12:30","end":"","location":"Plaça del Nord","title":"Vermut amb Los Swingin' Calaveras"},{"date":"2026-08-17","start":"12:30","end":"","location":"Carrer La Perla","title":"Concurs de truites"},{"date":"2026-08-17","start":"13:00","end":"","location":"Joan Blanques de Baix de Tot","title":"Vermut musical amb Stereo Daysis"},{"date":"2026-08-17","start":"14:00","end":"","location":"Plaça del Raspall","title":"Dinar popular"},{"date":"2026-08-17","start":"16:00","end":"","location":"Carrer Lluís Vives","title":"Campionat de dòmino Bar Vulcano"},{"date":"2026-08-17","start":"17:00","end":"","location":"Travessia Sant Antoni","title":"Citrina (R&B acústic)"},{"date":"2026-08-17","start":"17:30","end":"","location":"Plaça de les Dones del 36","title":"Taller de tote bags"},{"date":"2026-08-17","start":"18:00","end":"","location":"Carrer Tordera","title":"Xocolatada"},{"date":"2026-08-17","start":"18:00","end":"21:00","location":"La Torna","title":"Taller de serigrafia"},{"date":"2026-08-17","start":"19:30","end":"21:30","location":"Plaça de les Dones del 36","title":"Trivial col·lectiu per conèixer gent del barri"},{"date":"2026-08-17","start":"20:00","end":"","location":"Plaça del Raspall","title":"Sopar de carmanyola"},{"date":"2026-08-17","start":"21:00","end":"","location":"Carrer Mozart","title":"Cinema: The Rocky Horror Picture Show"},{"date":"2026-08-17","start":"21:00","end":"","location":"Plaça del Poble Gitano","title":"Xerrada \"Dona gitana i antigitanisme de gènere\""},{"date":"2026-08-17","start":"22:30","end":"","location":"Carrer Llibertat","title":"Nit de jocs de taula"},{"date":"2026-08-17","start":"23:00","end":"","location":"Carrer Verdi del Mig","title":"Open Mic \"L'Open de Verdi\""},{"date":"2026-08-17","start":"23:00","end":"","location":"Plaça del Nord","title":"Ukeoke acústic"},{"date":"2026-08-18","start":"10:00","end":"","location":"Plaça de les Dones del 36","title":"Tast d'instruments a càrrec de l'EMOG"},{"date":"2026-08-18","start":"10:00","end":"","location":"Plaça del Sol","title":"Passejada de gegantons pels carrers guarnits"},{"date":"2026-08-18","start":"10:30","end":"13:30","location":"Ateneu de Fabricació","title":"Disseny i fabricació amb tall làser"},{"date":"2026-08-18","start":"11:00","end":"","location":"Carrer Tordera","title":"Gimcana dels Anells"},{"date":"2026-08-18","start":"11:00","end":"","location":"Carrer Progrés","title":"Gimcana dels Anells"},{"date":"2026-08-18","start":"11:00","end":"","location":"Fraternitat de Dalt","title":"Gimcana dels Anells"},{"date":"2026-08-18","start":"11:00","end":"","location":"Fraternitat de Baix","title":"Gimcana dels Anells"},{"date":"2026-08-18","start":"11:30","end":"","location":"Fraternitat de Dalt","title":"Campionat de puzle per parelles"},{"date":"2026-08-18","start":"12:30","end":"","location":"Carrer Providència","title":"Vermut musical amb Banda La Porteña y Los Piratas"},{"date":"2026-08-18","start":"13:00","end":"","location":"Carrer Progrés","title":"Vermut musical amb Extramadors"},{"date":"2026-08-18","start":"13:00","end":"","location":"Carrer Berga","title":"Vermut musical"},{"date":"2026-08-18","start":"14:00","end":"","location":"Fraternitat de Baix","title":"Dinar amb Tordera"},{"date":"2026-08-18","start":"17:00","end":"","location":"Carrer Berga","title":"Taller de ceràmica de fang"},{"date":"2026-08-18","start":"18:00","end":"","location":"Carrer Ciudad Real","title":"Taller de ceràmica amb Felipe Rivera"},{"date":"2026-08-18","start":"18:00","end":"","location":"Carrer Sant Pere Màrtir","title":"Taller de balls tropicals i caribenys"},{"date":"2026-08-18","start":"18:00","end":"","location":"Carrer La Perla","title":"Justa Medieval"},{"date":"2026-08-18","start":"18:00","end":"","location":"Joan Blanques de Baix de Tot","title":"Taller de pastissos"},{"date":"2026-08-18","start":"19:30","end":"","location":"Plaça del Folk","title":"Taller de rumba amb Derrumband"},{"date":"2026-08-18","start":"21:00","end":"","location":"Carrer Sant Pere Màrtir","title":"Sopar popular amb rom cremat"},{"date":"2026-08-18","start":"22:00","end":"","location":"Carrer Tordera","title":"Karaoke"},{"date":"2026-08-18","start":"22:00","end":"","location":"Joan Blanques de Baix","title":"Concert amb Operación Disco"},{"date":"2026-08-18","start":"22:00","end":"","location":"Joan Blanques de Baix de Tot","title":"Nit de ball swing amb Swing Maniacs i Swing Shot Band"},{"date":"2026-08-18","start":"22:30","end":"","location":"Plaça de les Dones del 36","title":"Nit de rumba catalana amb Els Tets"},{"date":"2026-08-18","start":"23:00","end":"","location":"Carrer Providència","title":"Banda Malditos Temazos"},{"date":"2026-08-18","start":"00:00","end":"","location":"Carrer La Perla","title":"Espectacle Drag amb Allo-li Olé"},{"date":"2026-08-19","start":"10:00","end":"","location":"Parròquia Santa Maria de Gràcia","title":"Ruta \"La meva Barcelona: La Gràcia rumbera i industrial\""},{"date":"2026-08-19","start":"10:30","end":"13:30","location":"Ateneu de Fabricació","title":"Electrònica i programació per a la creació sonora"},{"date":"2026-08-19","start":"11:00","end":"","location":"Plaça del Raspall","title":"Vermut amb Cami Tal"},{"date":"2026-08-19","start":"11:30","end":"","location":"Carrer Lluís Vives","title":"Jocs de taula per a tothom"},{"date":"2026-08-19","start":"12:00","end":"","location":"Carrer Tordera","title":"Tertúlia amb Los Manolos"},{"date":"2026-08-19","start":"12:00","end":"","location":"Carrer Tordera","title":"Especial monòlegs \"Tinc idees\" amb Martí Sanante"},{"date":"2026-08-19","start":"12:30","end":"","location":"Carrer Providència","title":"Vermut musical Son de Gràcia"},{"date":"2026-08-19","start":"13:00","end":"","location":"Carrer Verdi del Mig","title":"Tast de vins amb HumanVins"},{"date":"2026-08-19","start":"14:00","end":"","location":"Carrer Sant Pere Màrtir","title":"Dinar popular (asado)"},{"date":"2026-08-19","start":"14:00","end":"","location":"Fraternitat de Dalt","title":"Dinar de veïnat"},{"date":"2026-08-19","start":"17:00","end":"","location":"Carrer Progrés","title":"Xaranga Mambo cap als premis"},{"date":"2026-08-19","start":"18:30","end":"","location":"Plaça de les Dones del 36","title":"Concert Todo sobre mi Gata"},{"date":"2026-08-19","start":"19:00","end":"","location":"Carrer Llibertat","title":"Havaneres amb Pirats pel Mar"},{"date":"2026-08-19","start":"20:00","end":"","location":"Placeta Sant Miquel","title":"Un Altre Mamma Mia (Encantando)"},{"date":"2026-08-19","start":"21:00","end":"","location":"Carrer Providència","title":"Botifarrada popular"},{"date":"2026-08-19","start":"21:00","end":"","location":"Plaça del Nord","title":"Homenatge a la gent gran i sopar de veïns"},{"date":"2026-08-19","start":"22:00","end":"","location":"Carrer Berga","title":"Concert amb Cobre Show"},{"date":"2026-08-19","start":"23:00","end":"","location":"Fraternitat de Dalt","title":"Nit de Karaoke"},{"date":"2026-08-20","start":"10:30","end":"13:30","location":"Ateneu de Fabricació","title":"Jam Session i experimentació sonora"},{"date":"2026-08-20","start":"12:30","end":"","location":"Plaça del Raspall","title":"Vermut amb Dal Yah"},{"date":"2026-08-20","start":"13:00","end":"","location":"Joan Blanques de Baix de Tot","title":"Vermut musical amb Books & Roses"},{"date":"2026-08-20","start":"18:00","end":"","location":"Plaça del Folk","title":"Taller de música gallega amb Namorala Pandereteiras"},{"date":"2026-08-20","start":"19:00","end":"","location":"Plaça del Raspall","title":"Ball de bot (continuació)"},{"date":"2026-08-20","start":"21:00","end":"","location":"Carrer La Perla","title":"Trivial eròtic amb l'Amantis"},{"date":"2026-08-20","start":"22:00","end":"","location":"Fraternitat de Baix","title":"Sopar de gala"},{"date":"2026-08-20","start":"22:00","end":"","location":"Plaça del Raspall","title":"Bum Titis (folk)"},{"date":"2026-08-20","start":"22:00","end":"","location":"Plaça de les Dones del 36","title":"Concert Big Mama Montse & Captain's Brotherhood"},{"date":"2026-08-20","start":"23:00","end":"","location":"Fraternitat de Dalt","title":"Nit rumbera amb Malas Lenguas"},{"date":"2026-08-21","start":"12:00","end":"14:00","location":"Carrer Mozart","title":"Literatura amb Chris Homet i llibreries Obaga, Nocturama i Finestres"},{"date":"2026-08-21","start":"12:00","end":"","location":"Plaça del Raspall","title":"Vermut, música i ambient"},{"date":"2026-08-21","start":"15:45","end":"","location":"Plaça d'en Joanic","title":"Gimcana Festa Major. Homenatge al centenari de Gaudí"},{"date":"2026-08-21","start":"21:30","end":"","location":"Plaça de la Vila","title":"Correfoc adult"},{"date":"2026-08-21","start":"23:00","end":"","location":"Joan Blanques de Baix de Tot","title":"Nit de rock blues amb Blusnet"}];

let activities=[];
let selectedDate=defaultDate();
let view='now';
let category='all';
let tab='program';
let query='';
let saved=new Set(JSON.parse(localStorage.getItem('festigracia-saved')||'[]'));
let done=new Set(JSON.parse(localStorage.getItem('festigracia-done')||'[]'));
let nearMode=false;
let userCoords=null;
let deferredPrompt=null;
let cloudReady=false;
let lastFestivalDay=festivalDayISO();

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

function isoLocal(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function festivalDayISO(){const d=new Date();if(d.getHours()<5)d.setDate(d.getDate()-1);return isoLocal(d)}
function defaultDate(){const d=festivalDayISO();if(d<DAYS[0])return DAYS[0];if(d>DAYS.at(-1))return 'all';return d}
function availableDays(){const today=festivalDayISO();if(today<DAYS[0])return [...DAYS];if(today>DAYS.at(-1))return [];return DAYS.filter(d=>d>=today)}
function minutes(t){if(!t)return 0;const [h,m]=t.split(':').map(Number);return h*60+m}
function niceDate(iso){const d=new Date(`${iso}T12:00:00`);return `${WEEK[d.getDay()]} ${d.getDate()}`}
function shortCardDate(iso){const d=new Date(`${iso}T12:00:00`);return `${WEEK_SHORT[d.getDay()]} ${d.getDate()}`}
function normalize(s=''){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function seedMatchScore(e,x){
  if(e.date!==x.date||e.start!==x.start)return -1;
  const et=normalize(e.title),xt=normalize(x.title),el=normalize(e.location||''),xl=normalize(x.location||'');
  let score=0;
  if(et===xt)score+=10;else if(et.includes(xt)||xt.includes(et))score+=6;else return -1;
  if(el===xl)score+=5;else if(el.includes(xl)||xl.includes(el))score+=2;
  if((e.end||'')===(x.end||''))score+=1;
  return score;
}
function resolveYellowSeedIds(){
  const ids=[];
  for(const x of YELLOW_DEFAULTS){
    let best=null,bestScore=-1;
    for(const e of activities){const sc=seedMatchScore(e,x);if(sc>bestScore){best=e;bestScore=sc}}
    if(best&&bestScore>=10)ids.push(best.id);
  }
  return [...new Set(ids)];
}
function applyYellowSeedLocal(){
  const ids=resolveYellowSeedIds();
  ids.forEach(id=>{if(!done.has(id))saved.add(id)});
  persistState();
  return ids;
}
function catLabel(k){const c=CATS[k]||CATS.altres;return `${c[0]} ${c[1]}`}
function effectiveWindow(e){let s=minutes(e.start)+(e.lateNight?1440:0);let en=e.end?minutes(e.end):s+45;if(e.end){if(e.lateNight&&en<300)en+=1440;else if(en<s)en+=1440}return [s,en]}
function eventDateTime(e,which='end'){const [s,en]=effectiveWindow(e);const mins=which==='start'?s:en;const d=new Date(`${e.date}T00:00:00`);d.setMinutes(mins);return d}
function isPastEvent(e){return new Date()>eventDateTime(e,'end')}
function isEventNow(e){const n=new Date();return n>=eventDateTime(e,'start')&&n<=eventDateTime(e,'end')}
function isNextTwoHours(e){const n=new Date(),s=eventDateTime(e,'start');return s>=n&&s<=new Date(n.getTime()+120*60000)}
function isUpcomingToday(e){return e.date===festivalDayISO()&&!isPastEvent(e)}
function persistState(){localStorage.setItem('festigracia-saved',JSON.stringify([...saved]));localStorage.setItem('festigracia-done',JSON.stringify([...done]))}

function renderDays(){
  const nav=$('#dateNav');nav.innerHTML='';
  const days=tab==='done'?DAYS:availableDays();
  const all=document.createElement('button');all.className='day-btn all-days'+(selectedDate==='all'?' active':'');all.innerHTML='<strong>TOT</strong><span>dies</span>';all.onclick=()=>{selectedDate='all';render()};nav.append(all);
  days.forEach(iso=>{const d=new Date(`${iso}T12:00:00`);const b=document.createElement('button');b.className='day-btn'+(selectedDate===iso?' active':'');b.innerHTML=`<strong>${d.getDate()}</strong><span>${WEEK[d.getDay()]}</span>`;b.onclick=()=>{selectedDate=iso;render()};nav.append(b)});
}
function renderFilters(){const el=$('#filters');el.innerHTML='';[['all',['','Totes']],...Object.entries(CATS)].forEach(([k,v])=>{const b=document.createElement('button');b.className='filter-btn'+(category===k?' active':'');b.textContent=k==='all'?'Totes':`${v[0]} ${v[1]}`;b.onclick=()=>{category=k;render()};el.append(b)})}

function baseFiltered(){
  let arr=[...activities];
  if(tab==='done'){
    arr=arr.filter(e=>done.has(e.id));
  }else if(tab==='saved'){
    arr=arr.filter(e=>saved.has(e.id)&&!done.has(e.id)&&!isPastEvent(e));
  }else{
    arr=arr.filter(e=>!done.has(e.id)&&!isPastEvent(e));
  }
  if(selectedDate!=='all')arr=arr.filter(e=>e.date===selectedDate);
  if(category!=='all')arr=arr.filter(e=>e.category===category);
  if(query){const q=normalize(query);arr=arr.filter(e=>normalize(`${e.title} ${e.location} ${catLabel(e.category)}`).includes(q))}
  return sortEvents(arr)
}
function sortEvents(arr){return arr.sort((a,b)=>a.date.localeCompare(b.date)||effectiveWindow(a)[0]-effectiveWindow(b)[0]||a.title.localeCompare(b.title))}
function grouped(arr){return arr.reduce((m,e)=>((m[e.date]??=[]).push(e),m),{})}
function conflictIds(arr){
  const out=new Set();
  Object.values(grouped(arr)).forEach(day=>{
    const s=sortEvents([...day]);
    for(let i=0;i<s.length;i++)for(let j=i+1;j<s.length;j++){
      const [as,ae]=effectiveWindow(s[i]),[bs,be]=effectiveWindow(s[j]);
      if(bs>=ae)break;
      if(as<be&&bs<ae){out.add(s[i].id);out.add(s[j].id)}
    }
  });
  return out
}
function section(label){const h=document.createElement('div');h.className='section-label';h.textContent=label;return h}
function empty(title,text){const d=document.createElement('div');d.className='empty';d.innerHTML=`<strong>${title}</strong>${text}`;return d}

function eventCard(e,conflicts=new Set()){
  const node=$('#eventTemplate').content.firstElementChild.cloneNode(true);
  $('.event-time',node).textContent=e.start||'—';
  $('.event-end',node).textContent=e.end?`— ${e.end}`:'';
  $('.event-date',node).textContent=shortCardDate(e.date);
  $('.event-title',node).textContent=e.title;
  $('.event-location',node).textContent=e.location||'Ubicació per confirmar';
  $('.category-pill',node).textContent=catLabel(e.category);
  $('.recurring-mark',node).hidden=!e.recurring;
  $('.now-mark',node).hidden=!isEventNow(e);
  $('.conflict-mark',node).hidden=!conflicts.has(e.id);
  const map=$('.map-link',node);map.href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${e.location||''}, Gràcia, Barcelona`)}`;
  const save=$('.save-btn',node),doneBtn=$('.done-btn',node),actions=$('.card-actions',node);
  save.classList.toggle('saved',saved.has(e.id));save.textContent=saved.has(e.id)?'♥':'♡';
  doneBtn.classList.toggle('done',done.has(e.id));
  save.onclick=()=>toggleFavorite(e.id);doneBtn.onclick=()=>toggleDone(e.id);
  if(tab==='done')actions.classList.add('done-only');
  if(userCoords&&e.lat&&e.lon){const km=haversine(userCoords.lat,userCoords.lon,e.lat,e.lon);$('.distance',node).textContent=`${km<1?Math.round(km*1000)+' m':km.toFixed(1)+' km'}`}
  return node
}
function renderGrouped(list,arr,conflicts){Object.entries(grouped(arr)).forEach(([d,items])=>{list.append(section(niceDate(d)));items.forEach(e=>list.append(eventCard(e,conflicts)))})}

function render(){
  document.body.classList.toggle('mode-list',tab!=='program');
  if(tab==='done'&&selectedDate!=='all'&&!DAYS.includes(selectedDate))selectedDate='all';
  if(tab!=='done'&&selectedDate!=='all'&&!availableDays().includes(selectedDate))selectedDate=defaultDate();
  renderDays();renderFilters();updateCounters();
  $$('.bottom').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  $$('.seg').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  $('#nearBtn').classList.toggle('active',nearMode);
  const list=$('#eventList');list.innerHTML='';let arr=baseFiltered();

  if(tab==='saved'){
    $('#heroTitle').textContent='La vostra agenda compartida.';
    const conflicts=conflictIds(arr);
    if(conflicts.size){const w=document.createElement('div');w.className='agenda-warning';w.textContent='⚠ Tens activitats guardades que se solapen.';list.append(w)}
    $('#status').textContent=`${arr.length} activitat${arr.length===1?'':'s'} al vostre pla`;
    if(!arr.length)return list.append(empty('Encara no hi ha plans','Marca activitats amb el cor i apareixeran aquí, ordenades cronològicament.'));
    return renderGrouped(list,arr,conflicts)
  }

  if(tab==='done'){
    $('#heroTitle').textContent='Tot el que ja heu fet.';
    $('#status').textContent=`${arr.length} activitat${arr.length===1?'':'s'} feta${arr.length===1?'':'es'}`;
    if(!arr.length)return list.append(empty('Encara no n’heu marcat cap','Prem ✓ en qualsevol activitat per guardar-la aquí, encara que després quedi en el passat.'));
    return renderGrouped(list,arr,new Set())
  }

  $('#heroTitle').textContent='Troba el teu pla en tres segons.';
  if(view==='now')arr=arr.filter(e=>isEventNow(e)||isNextTwoHours(e));
  $('#status').textContent=view==='now'?`${arr.length} activitat${arr.length===1?'':'s'} ara o en les pròximes 2 h`:`${arr.length} activitat${arr.length===1?'':'s'}`;
  if(!arr.length)return list.append(empty('No hi ha res per mostrar',view==='now'?'Prova “Tot el dia” o un altre dia.':'Canvia els filtres o la cerca.'));
  return renderGrouped(list,arr,new Set())
}

function updateCounters(){
  const plan=activities.filter(e=>saved.has(e.id)&&!done.has(e.id)&&!isPastEvent(e)).length;
  $('#savedCount').textContent=plan||'';$('#doneCount').textContent=done.size||''
}

function pendingOps(){try{return JSON.parse(localStorage.getItem(PENDING_KEY)||'{}')}catch{return {}}}
function queueOp(remoteKey,op){const p=pendingOps();p[remoteKey]=op;localStorage.setItem(PENDING_KEY,JSON.stringify(p))}
function authHeaders(extra={}){return {'apikey':SUPABASE_KEY,'Authorization':`Bearer ${SUPABASE_KEY}`,...extra}}
async function cloudAdd(remoteKey){const r=await fetch(FAVORITES_API,{method:'POST',headers:authHeaders({'Content-Type':'application/json','Prefer':'resolution=merge-duplicates'}),body:JSON.stringify({group_id:GROUP_ID,activity_id:remoteKey})});if(!r.ok)throw new Error('cloud add')}
async function cloudDelete(remoteKey){const url=`${FAVORITES_API}?group_id=eq.${encodeURIComponent(GROUP_ID)}&activity_id=eq.${encodeURIComponent(remoteKey)}`;const r=await fetch(url,{method:'DELETE',headers:authHeaders()});if(!r.ok)throw new Error('cloud delete')}
async function flushPending(){if(!navigator.onLine)return;const p=pendingOps();for(const [k,op] of Object.entries(p)){try{op==='add'?await cloudAdd(k):await cloudDelete(k);const fresh=pendingOps();delete fresh[k];localStorage.setItem(PENDING_KEY,JSON.stringify(fresh))}catch{break}}}
async function fetchCloudState(){
  const url=`${FAVORITES_API}?select=activity_id&group_id=eq.${encodeURIComponent(GROUP_ID)}`;
  const r=await fetch(url,{headers:authHeaders()});if(!r.ok)throw new Error('cloud fetch');
  const rows=await r.json();
  const cloudSaved=new Set(),cloudDone=new Set();
  let seedApplied=false,doneRepairApplied=false;

  rows.forEach(x=>{
    const k=x.activity_id||'';
    if(k===YELLOW_SEED_MARKER){seedApplied=true;return}
    if(k===DONE_REPAIR_MARKER){doneRepairApplied=true;return}
    if(k.startsWith(DONE_PREFIX))cloudDone.add(k.slice(DONE_PREFIX.length));
    else if(!k.startsWith('__'))cloudSaved.add(k);
  });

  // v6 repair: the previous release could leave the shared DONE state polluted.
  // On the first v6 load, clear all shared/local DONE entries, preserve favorites,
  // and restore the yellow-highlighted activities as favorites.
  if(!doneRepairApplied){
    rows.forEach(x=>{const k=x.activity_id||'';if(k.startsWith(DONE_PREFIX))queueOp(k,'delete')});
    cloudDone.clear();
    done.clear();
    resolveYellowSeedIds().forEach(id=>{cloudSaved.add(id);queueOp(id,'add')});
    queueOp(DONE_REPAIR_MARKER,'add');
    seedApplied=true;
  }

  if(!localStorage.getItem(STATE_MIGRATION_KEY)){
    [...saved].forEach(id=>{cloudSaved.add(id);queueOp(id,'add')});
    // Do not migrate legacy local DONE data after the v6 repair.
    localStorage.setItem(STATE_MIGRATION_KEY,'1');
  }

  if(!seedApplied){
    resolveYellowSeedIds().forEach(id=>{if(!cloudDone.has(id)){cloudSaved.add(id);queueOp(id,'add')}});
    queueOp(YELLOW_SEED_MARKER,'add');
  }

  saved=cloudSaved;done=cloudDone;
  done.forEach(id=>saved.delete(id));
  persistState();cloudReady=true;render();await flushPending()
}
async function refreshCloud(){if(!navigator.onLine)return;try{await fetchCloudState()}catch{cloudReady=false}}
function toggleFavorite(id){
  if(done.has(id))return;
  const add=!saved.has(id);add?saved.add(id):saved.delete(id);persistState();queueOp(id,add?'add':'delete');render();flushPending()
}
function toggleDone(id){
  const add=!done.has(id);
  if(add){done.add(id);queueOp(DONE_PREFIX+id,'add');if(saved.delete(id))queueOp(id,'delete')}
  else{done.delete(id);queueOp(DONE_PREFIX+id,'delete')}
  persistState();render();flushPending()
}

function haversine(lat1,lon1,lat2,lon2){const R=6371,toRad=x=>x*Math.PI/180,dLat=toRad(lat2-lat1),dLon=toRad(lon2-lon1);const a=Math.sin(dLat/2)**2+Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(a))}
async function geocodeMissing(){const missing=[...new Set(activities.filter(e=>!e.lat&&!e.lon&&e.location).map(e=>e.location))].slice(0,18);for(const loc of missing){try{const r=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(loc+', Gràcia, Barcelona')}`,{headers:{'Accept-Language':'ca'}});const x=(await r.json())[0];if(x)activities.filter(e=>e.location===loc).forEach(e=>{e.lat=+x.lat;e.lon=+x.lon});await new Promise(res=>setTimeout(res,950))}catch{break}}}
async function toggleNear(){if(nearMode){nearMode=false;userCoords=null;render();return}if(!navigator.geolocation){alert('El navegador no permet obtenir la ubicació.');return}navigator.geolocation.getCurrentPosition(async p=>{userCoords={lat:p.coords.latitude,lon:p.coords.longitude};nearMode=true;$('#status').textContent='Calculant distàncies…';await geocodeMissing();activities.sort((a,b)=>{const da=a.lat?haversine(userCoords.lat,userCoords.lon,a.lat,a.lon):999,db=b.lat?haversine(userCoords.lat,userCoords.lon,b.lat,b.lon):999;return da-db});render()},()=>alert('No s’ha pogut obtenir la ubicació.'))}

async function boot(){
  try{activities=await (await fetch('activities.json',{cache:'no-store'})).json()}catch(e){$('#eventList').append(empty('No s’han pogut carregar les activitats','Comprova que activities.json continua al mateix directori.'));return}
  if(!localStorage.getItem(YELLOW_LOCAL_KEY)){applyYellowSeedLocal();localStorage.setItem(YELLOW_LOCAL_KEY,'1')}
  render();
  $('#searchInput').addEventListener('input',e=>{query=e.target.value;render()});
  $$('.seg').forEach(b=>b.onclick=()=>{view=b.dataset.view;render()});
  $('#nearBtn').onclick=toggleNear;
  $$('.bottom').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;selectedDate=tab==='program'?defaultDate():'all';if(tab==='program')view='now';render()});
  window.addEventListener('online',refreshCloud);
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').hidden=false});
  $('#installBtn').onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('#installBtn').hidden=true};
  refreshCloud();setInterval(refreshCloud,5000);
  setInterval(()=>{const d=festivalDayISO();if(d!==lastFestivalDay){lastFestivalDay=d;if(tab==='program')selectedDate=defaultDate();render()}else render()},60000);
  if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js')
}
boot();
