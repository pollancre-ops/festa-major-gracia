const CATS={
  musica:['🎵','Música'],dj_ball:['💃','DJ / ball'],cultura_popular:['🔥','Cultura popular'],
  infantil:['🧒','Infantil'],tallers:['🛠️','Tallers / activitats'],gastronomia:['🍴','Gastronomia'],
  espectacles:['🎭','Espectacles'],altres:['✨','Altres']
};
const DAYS=['2026-08-14','2026-08-15','2026-08-16','2026-08-17','2026-08-18','2026-08-19','2026-08-20','2026-08-21'];
const WEEK=['DG','DL','DT','DC','DJ','DV','DS'];
const INITIAL_FAVORITES=new Set(["e0046","e0056","e0063","e0064","e0065","e0080","e0083","e0088","e0102","e0115","e0126","e0147","e0157","e0158","e0164","e0168","e0173","e0174","e0180","e0195","e0198","e0199","e0200","e0202","e0206","e0211","e0220","e0239","e0249","e0252","e0263","e0265","e0274","e0275","e0286","e0291","e0293","e0294","e0300","e0301","e0305","e0309","e0313","e0317","e0324","e0334","e0339","e0348","e0350","e0360","e0362","e0364","e0370","e0371","e0374","e0379","e0380","e0383","e0384","e0391","e0402","e0407","e0409","e0413","e0415","e0421","e0425","e0428","e0430","e0438","e0446","e0450","e0455","e0456","e0457","e0462","e0471","e0474","e0475","e0486","e0489","e0491","e0492","e0498","e0501","e0506","e0510","e0516","e0527","e0530","e0533","e0543","e0546","e0551","e0566","e0572","e0584","e0587","e0591","e0596","e0599","e0603","e0604","e0605","e0608","e0618","e0621","e0623","e0631","e0632"]);

// Espai compartit nou i net: no hereta els estats corruptes de les versions de prova.
const SUPABASE_URL='https://girfbvvetgpisigzvvsy.supabase.co';
const SUPABASE_KEY='sb_publishable_vYvy1hWUDtc0ltmYvCbcqA_ohekPQSn';
const PRIVATE_GROUP_ID='gracia26-clean-v10';
const UPDATE_NOTICE_KEY='festigracia-update-notice-v14';
const PRIVATE_LAUNCH_KEY='festigracia-private-launch-v13';
const requestedGroup=new URLSearchParams(location.search).get('group');
// Només l'enllaç privat exacte activa la sincronització compartida.
// Qualsevol altre enllaç (inclòs el públic sense paràmetres) treballa només en local.
const IS_PRIVATE=requestedGroup===PRIVATE_GROUP_ID;
const GROUP_ID=IS_PRIVATE?PRIVATE_GROUP_ID:null;

// Recorda que aquest navegador és el nostre quan s'obre expressament l'enllaç privat.
// Això ajuda a recuperar el mode privat des d'una icona de pantalla d'inici antiga.
if(IS_PRIVATE){
  try{localStorage.setItem(PRIVATE_LAUNCH_KEY,'1');document.cookie=`fg_private_launch_v13=1;path=/;max-age=31536000;SameSite=Lax`;}catch{}
}else if(!requestedGroup && window.matchMedia?.('(display-mode: standalone)').matches){
  try{
    const cookiePrivate=document.cookie.split(';').some(x=>x.trim()==='fg_private_launch_v13=1');
    if(localStorage.getItem(PRIVATE_LAUNCH_KEY)==='1'||cookiePrivate){
      location.replace(`./?group=${encodeURIComponent(PRIVATE_GROUP_ID)}`);
    }
  }catch{}
}
const API=`${SUPABASE_URL}/rest/v1/favorites`;
const VISITS_API=`${SUPABASE_URL}/rest/v1/visits`;
const VISITOR_KEY='festigracia-visitor-id';
const VISIT_SESSION_KEY='festigracia-visit-logged-v13';
// El privat conserva exactament les claus locals de v10/v11 per no perdre cap còpia pendent.
// El públic usa un espai local nou i net, independent a cada navegador.
const LOCAL_KEY=IS_PRIVATE?`festigracia-v10-state-${PRIVATE_GROUP_ID}`:'festigracia-v12-public-state';
const PENDING_KEY=IS_PRIVATE?`festigracia-v10-pending-${PRIVATE_GROUP_ID}`:null;
const SEEDED_MARKER='meta:seeded-v10';
const STREET_VISITED_KEY='festigracia-street-visits-v14';

let activities=[];
let streets=[];
let selectedDate=defaultDate();
let view='all';
let category='all';
let tab='program';
let query='';
let nearMode=false;
let deferredPrompt=null;
let lastFestivalDay=festivalDayISO();
let saved=new Set();
let done=new Set();
let streetVisited=new Set();
let streetView='all';

const $=s=>document.querySelector(s);
const list=$('#eventList');
const status=$('#status');

function isoLocal(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function festivalDayISO(){const d=new Date();if(d.getHours()<5)d.setDate(d.getDate()-1);return isoLocal(d);}
function availableDays(){const today=festivalDayISO();if(today<DAYS[0])return [...DAYS];if(today>DAYS[DAYS.length-1])return [];return DAYS.filter(d=>d>=today);}
function defaultDate(){const av=availableDays(),today=festivalDayISO();return av.includes(today)?today:(av[0]||DAYS[DAYS.length-1]);}
function minutes(t){const [h,m]=t.split(':').map(Number);return h*60+m;}
function nowMins(){const d=new Date();return d.getHours()*60+d.getMinutes();}
function compactDate(iso){const d=new Date(iso+'T12:00:00');return `${WEEK[d.getDay()]} ${d.getDate()}`;}
function sectionDate(iso){const d=new Date(iso+'T12:00:00');return `${WEEK[d.getDay()]} ${d.getDate()} D’AGOST`;}
function displayName(c){const v=CATS[c]||CATS.altres;return `${v[0]} ${v[1]}`;}
function mapUrl(loc){return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc+', Gràcia, Barcelona')}`;}

function streetMapUrl(name){return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name+', Gràcia, Barcelona')}`;}
function restoreStreetVisits(){try{streetVisited=new Set(JSON.parse(localStorage.getItem(STREET_VISITED_KEY)||'[]'));}catch{streetVisited=new Set();}}
function persistStreetVisits(){localStorage.setItem(STREET_VISITED_KEY,JSON.stringify([...streetVisited]));}
function toggleStreetVisited(id){
  if(streetVisited.has(id))streetVisited.delete(id);else streetVisited.add(id);
  persistStreetVisits();render();
}
function filteredStreets(){
  let a=[...streets];
  if(streetView==='pending')a=a.filter(s=>!streetVisited.has(s.id));
  if(streetView==='visited')a=a.filter(s=>streetVisited.has(s.id));
  if(query){
    const q=query.toLowerCase();
    a=a.filter(s=>`${s.name} ${s.theme} ${s.description}`.toLowerCase().includes(q));
  }
  return a;
}
function streetCard(s){
  const n=$('#streetTemplate').content.firstElementChild.cloneNode(true);
  const visited=streetVisited.has(s.id);
  n.classList.toggle('visited',visited);
  n.querySelector('.street-name').textContent=s.name;
  n.querySelector('.street-theme').textContent=s.theme;
  n.querySelector('.street-description').textContent=s.description;
  const map=n.querySelector('.street-map-link');map.href=streetMapUrl(s.name);
  const b=n.querySelector('.street-visit-btn');
  b.classList.toggle('visited',visited);
  b.setAttribute('aria-pressed',visited?'true':'false');
  b.setAttribute('aria-label',visited?'Marca com a pendent':'Marca com a visitat');
  b.querySelector('.street-visit-label').textContent=visited?'Visitat':'Marca visitat';
  b.onclick=()=>toggleStreetVisited(s.id);
  return n;
}
function renderStreets(){
  list.innerHTML='';
  const a=filteredStreets();
  const visited=streets.filter(s=>streetVisited.has(s.id)).length;
  $('#streetProgress').textContent=`${visited} de ${streets.length} visitats`;
  if(a.length){
    const h=document.createElement('div');h.className='section-label';
    h.textContent=streetView==='visited'?'Visitats':streetView==='pending'?'Pendents':'Carrers guarnits';
    list.appendChild(h);
    a.forEach(s=>list.appendChild(streetCard(s)));
  }else{
    list.innerHTML='<div class="empty"><strong>No hi ha carrers aquí.</strong>Canvia el filtre o la cerca.</div>';
  }
  status.textContent=`${a.length} carrers`;
  updateCounts();
}

function normalizeSelectedDate(){const av=tab==='done'?DAYS:availableDays();if(selectedDate==='all')return;if(!av.includes(selectedDate))selectedDate=av[0]||'all';}
function renderDays(){
  normalizeSelectedDate();const nav=$('#dateNav');nav.innerHTML='';const av=tab==='done'?DAYS:availableDays();
  const all=document.createElement('button');all.className='day-btn all-days'+(selectedDate==='all'?' active':'');all.innerHTML='<strong>∞</strong><span>Totes</span>';
  all.onclick=()=>{selectedDate='all';nearMode=false;$('#nearBtn').classList.remove('active');renderDays();render();};nav.appendChild(all);
  av.forEach(d=>{const dt=new Date(d+'T12:00:00');const b=document.createElement('button');b.className='day-btn'+(d===selectedDate?' active':'');b.innerHTML=`<strong>${dt.getDate()}</strong><span>${WEEK[dt.getDay()]}</span>`;b.onclick=()=>{selectedDate=d;nearMode=false;$('#nearBtn').classList.remove('active');renderDays();render();};nav.appendChild(b);});
  nav.querySelector('.active')?.scrollIntoView({inline:'center',block:'nearest'});
}
function renderFilters(){const box=$('#filters');box.innerHTML='';[['all',['','Totes']],...Object.entries(CATS)].forEach(([key,v])=>{const b=document.createElement('button');b.className='filter-btn'+(category===key?' active':'');b.textContent=(v[0]?v[0]+' ':'')+v[1];b.onclick=()=>{category=key;renderFilters();render();};box.appendChild(b);});}

function effectiveWindow(e){let s=minutes(e.start),en=e.end?minutes(e.end):s+45;if(e.end&&en<s)en+=1440;if(e.lateNight)s+=1440,en+=1440;return [s,en];}
function currentMatch(e){if(e.date!==festivalDayISO())return false;let n=nowMins();if(n<300)n+=1440;const [s,en]=effectiveWindow(e);return n>=s&&n<=en;}
function upcomingMatch(e){if(e.date!==festivalDayISO())return false;let n=nowMins();if(n<300)n+=1440;const [s]=effectiveWindow(e);return s>n&&s<=n+120;}
function sortEvents(a){return [...a].sort((x,y)=>{if(nearMode&&x._distance!=null&&y._distance!=null)return x._distance-y._distance;if(x.date!==y.date)return x.date.localeCompare(y.date);return effectiveWindow(x)[0]-effectiveWindow(y)[0];});}

function matchesCommon(e){
  if(selectedDate!=='all'&&e.date!==selectedDate)return false;
  if(category!=='all'&&e.category!==category)return false;
  if(query){const q=query.toLowerCase();if(!(`${e.title} ${e.location} ${compactDate(e.date)} ${displayName(e.category)}`).toLowerCase().includes(q))return false;}
  return true;
}
function baseFiltered(){
  const available=new Set(availableDays());
  let a=activities.filter(matchesCommon);
  if(tab==='program')a=a.filter(e=>available.has(e.date)&&!done.has(e.id));
  if(tab==='saved')a=a.filter(e=>available.has(e.date)&&saved.has(e.id)&&!done.has(e.id));
  if(tab==='done')a=a.filter(e=>done.has(e.id));
  return a;
}

function conflictIds(plan){
  const ids=new Set();const byDate={};
  plan.forEach(e=>(byDate[e.date]??=[]).push(e));
  Object.values(byDate).forEach(items=>{const s=sortEvents(items);for(let i=0;i<s.length;i++){for(let j=i+1;j<s.length;j++){const [a1,a2]=effectiveWindow(s[i]),[b1,b2]=effectiveWindow(s[j]);if(b1>=a2)break;if(a1<b2&&b1<a2){ids.add(s[i].id);ids.add(s[j].id);}}}});
  return ids;
}

function eventCard(e,conflicts=new Set()){
  const n=$('#eventTemplate').content.firstElementChild.cloneNode(true);
  n.querySelector('.event-time').textContent=e.start;
  n.querySelector('.event-end').textContent=e.end?`— ${e.end}`:'';
  n.querySelector('.event-date').textContent=compactDate(e.date);
  n.querySelector('.event-title').textContent=e.title;
  n.querySelector('.event-location').textContent=e.location;
  n.querySelector('.category-pill').textContent=displayName(e.category);
  n.querySelector('.recurring-mark').hidden=!e.recurring;
  n.querySelector('.now-pill').hidden=!currentMatch(e);
  n.querySelector('.conflict-warning').hidden=!(tab==='saved'&&conflicts.has(e.id));
  const m=n.querySelector('.map-link');m.href=mapUrl(e.location);
  if(e._distance!=null)n.querySelector('.distance').textContent=e._distance<1000?`${Math.round(e._distance/10)*10} m`:`${(e._distance/1000).toFixed(1)} km`;
  const s=n.querySelector('.save-btn');s.textContent=saved.has(e.id)?'♥':'♡';s.classList.toggle('saved',saved.has(e.id));s.onclick=()=>toggleFavorite(e.id);
  const d=n.querySelector('.done-btn');d.classList.toggle('done',done.has(e.id));d.onclick=()=>toggleDone(e.id);
  return n;
}
function addSection(title,a,conflicts){if(!a.length)return;const h=document.createElement('div');h.className='section-label';h.textContent=title;list.appendChild(h);sortEvents(a).forEach(e=>list.appendChild(eventCard(e,conflicts)));}
function addAllDaysSections(a,conflicts){const grouped={};sortEvents(a).forEach(e=>(grouped[e.date]??=[]).push(e));Object.entries(grouped).forEach(([date,items])=>addSection(sectionDate(date),items,conflicts));}

function render(){
  normalizeSelectedDate();list.innerHTML='';status.textContent='';
  const isStreets=tab==='streets';
  $('#heroSection').hidden=false;
  $('#programToolbar').hidden=tab!=='program';
  $('#streetToolbar').hidden=!isStreets;
  $('#dateNav').hidden=isStreets;
  $('#filters').hidden=isStreets;

  const search=$('#searchInput');
  if(search)search.placeholder='Cerca activitat, artista o carrer…';

  if(isStreets){
    $('#heroEyebrow').textContent='CARRERS';
    $('#heroTitle').textContent='Porta el compte dels carrers que ja has visitat.';
    renderStreets();
    return;
  }

  const a=baseFiltered();const conflicts=tab==='saved'?conflictIds(a):new Set();
  if(tab==='program'){$('#heroEyebrow').textContent='PROGRAMA';$('#heroTitle').textContent=selectedDate==='all'?'Tota la Festa Major, en una sola vista.':'Tot el que passa aquest dia.';}
  if(tab==='saved'){$('#heroEyebrow').textContent='EL MEU PLA';$('#heroTitle').textContent='La teva agenda de les festes de Gràcia.';}
  if(tab==='done'){$('#heroEyebrow').textContent='JA HE FET';$('#heroTitle').textContent='Els plans que ja has viscut.';}

  if(tab==='program'&&view==='now'){
    const cur=a.filter(currentMatch),up=a.filter(e=>!cur.includes(e)&&upcomingMatch(e));addSection('Ara',cur,conflicts);addSection('A continuació · 2 h',up,conflicts);
    if(!cur.length&&!up.length)list.innerHTML='<div class="empty"><strong>Cap activitat en aquesta franja.</strong>Prova “Tot el dia”.</div>';
  }else if(selectedDate==='all'&&!nearMode){addAllDaysSections(a,conflicts);}
  else addSection(nearMode?'Més a prop':tab==='saved'?'El meu pla':tab==='done'?'Ja he fet':'Programa',a,conflicts);

  if(!a.length&&!(tab==='program'&&view==='now'))list.innerHTML='<div class="empty"><strong>No hi ha activitats aquí.</strong>Canvia el dia, els filtres o la cerca.</div>';
  status.textContent=`${a.length} activitats`;
  updateCounts();
}
function updateCounts(){
  const av=new Set(availableDays());
  const plan=activities.filter(e=>av.has(e.date)&&saved.has(e.id)&&!done.has(e.id)).length;
  const finished=activities.filter(e=>done.has(e.id)).length;
  const visited=streets.filter(s=>streetVisited.has(s.id)).length;
  $('#savedCount').textContent=plan||'';
  $('#doneCount').textContent=finished||'';
  $('#streetCount').textContent=visited||'';
}

// ── Avís d'actualització ───────────────────────────────────────────────
function showUpdateNotice(){
  try{
    if(localStorage.getItem(UPDATE_NOTICE_KEY)==='1')return;
    const modal=$('#updateModal');
    if(!modal)return;
    modal.hidden=false;
    document.body.classList.add('modal-open');
    $('#updateDismiss').onclick=()=>{
      localStorage.setItem(UPDATE_NOTICE_KEY,'1');
      modal.hidden=true;
      document.body.classList.remove('modal-open');
    };
  }catch{}
}

// ── Analítica anònima de visites ────────────────────────────────────────
function getVisitorId(){
  let id=localStorage.getItem(VISITOR_KEY);
  if(!id){
    id=(crypto?.randomUUID?.()||`v-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    localStorage.setItem(VISITOR_KEY,id);
  }
  return id;
}
function deviceLabel(){
  const ua=navigator.userAgent||'';
  let device=/iPad/i.test(ua)?'iPad':/iPhone/i.test(ua)?'iPhone':/Android/i.test(ua)?'Android':/Macintosh|Mac OS X/i.test(ua)?'Mac':/Windows/i.test(ua)?'Windows':'Altres';
  let browser=/Edg\//i.test(ua)?'Edge':/CriOS|Chrome\//i.test(ua)?'Chrome':/FxiOS|Firefox\//i.test(ua)?'Firefox':/Safari\//i.test(ua)?'Safari':'Navegador';
  return `${device} · ${browser}`;
}
async function logVisit(){
  // Una fila per sessió de pestanya, no una fila per cada recàrrega/renderitzat.
  if(sessionStorage.getItem(VISIT_SESSION_KEY)==='1'||!navigator.onLine)return;
  try{
    const r=await fetch(VISITS_API,{
      method:'POST',
      headers:cloudHeaders({'Content-Type':'application/json','Prefer':'return=minimal'}),
      body:JSON.stringify({
        visitor_id:getVisitorId(),
        device:deviceLabel(),
        page_url:location.href.split('#')[0]
      })
    });
    if(!r.ok)throw new Error(`VISIT ${r.status}`);
    sessionStorage.setItem(VISIT_SESSION_KEY,'1');
  }catch(e){console.warn('No s’ha pogut registrar la visita',e);}
}

// ── Sincronització segura ─────────────────────────────────────────────
function cloudHeaders(extra={}){return {'apikey':SUPABASE_KEY,'Authorization':`Bearer ${SUPABASE_KEY}`,...extra};}
function encodeFav(id){return `fav:${id}`;}function encodeDone(id){return `done:${id}`;}
function readPending(){try{return JSON.parse(localStorage.getItem(PENDING_KEY)||'{}')}catch{return {}}}
function writePending(p){localStorage.setItem(PENDING_KEY,JSON.stringify(p));}
function queueCloud(key,op){const p=readPending();p[key]=op;writePending(p);}
function persistLocal(){localStorage.setItem(LOCAL_KEY,JSON.stringify({saved:[...saved],done:[...done]}));}
function restoreLocal(){try{const x=JSON.parse(localStorage.getItem(LOCAL_KEY)||'{}');saved=new Set(x.saved||[]);done=new Set(x.done||[]);}catch{saved=new Set();done=new Set();}}
async function cloudRows(){if(!IS_PRIVATE)return [];const u=`${API}?group_id=eq.${encodeURIComponent(GROUP_ID)}&select=activity_id`;const r=await fetch(u,{headers:cloudHeaders(),cache:'no-store'});if(!r.ok)throw new Error(`GET ${r.status}`);return r.json();}
async function cloudAdd(key){if(!IS_PRIVATE)return;const r=await fetch(API,{method:'POST',headers:cloudHeaders({'Content-Type':'application/json','Prefer':'return=minimal'}),body:JSON.stringify({group_id:GROUP_ID,activity_id:key})});if(!r.ok&&r.status!==409)throw new Error(`POST ${r.status}`);}
async function cloudDelete(key){if(!IS_PRIVATE)return;const u=`${API}?group_id=eq.${encodeURIComponent(GROUP_ID)}&activity_id=eq.${encodeURIComponent(key)}`;const r=await fetch(u,{method:'DELETE',headers:cloudHeaders({'Prefer':'return=minimal'})});if(!r.ok)throw new Error(`DELETE ${r.status}`);}
async function bulkSeed(){if(!IS_PRIVATE)return;const rows=await cloudRows();if(rows.some(x=>x.activity_id===SEEDED_MARKER))return;const payload=[{group_id:GROUP_ID,activity_id:SEEDED_MARKER},...[...INITIAL_FAVORITES].map(id=>({group_id:GROUP_ID,activity_id:encodeFav(id)}))];const r=await fetch(API,{method:'POST',headers:cloudHeaders({'Content-Type':'application/json','Prefer':'return=minimal'}),body:JSON.stringify(payload)});if(!r.ok&&r.status!==409)throw new Error(`SEED ${r.status}`);}
async function flushPending(){if(!IS_PRIVATE)return true;if(!navigator.onLine)return false;const entries=Object.entries(readPending());for(const [key,op] of entries){try{if(op==='add')await cloudAdd(key);else await cloudDelete(key);const latest=readPending();if(latest[key]===op){delete latest[key];writePending(latest);}}catch(e){console.warn('Sync pendent',key,e);return false;}}return true;}
function applyPending(remoteSaved,remoteDone){const p=readPending();for(const [key,op] of Object.entries(p)){const fav=key.startsWith('fav:'),id=key.slice(key.indexOf(':')+1);const set=fav?remoteSaved:remoteDone;if(op==='add')set.add(id);else set.delete(id);}return [remoteSaved,remoteDone];}
async function pullCloud({silent=true}={}){
  if(!IS_PRIVATE||!navigator.onLine)return;
  try{await flushPending();const rows=await cloudRows();const valid=new Set(activities.map(e=>e.id));let rs=new Set(),rd=new Set();for(const x of rows){const k=x.activity_id;if(k.startsWith('fav:')&&valid.has(k.slice(4)))rs.add(k.slice(4));if(k.startsWith('done:')&&valid.has(k.slice(5)))rd.add(k.slice(5));}[rs,rd]=applyPending(rs,rd);saved=rs;done=rd;persistLocal();render();if(!silent){status.textContent='Pla compartit sincronitzat ✓';setTimeout(()=>{if(status.textContent.includes('sincronitzat'))status.textContent='';},1200);}}
  catch(e){console.warn('Supabase no disponible',e);if(!silent)status.textContent='Treballant amb la còpia local. Se sincronitzarà automàticament.';}
}
async function toggleFavorite(id){const adding=!saved.has(id);if(adding)saved.add(id);else saved.delete(id);persistLocal();if(IS_PRIVATE){queueCloud(encodeFav(id),adding?'add':'delete');await flushPending();}render();}
async function toggleDone(id){const adding=!done.has(id);if(adding){done.add(id);if(saved.has(id)){saved.delete(id);if(IS_PRIVATE)queueCloud(encodeFav(id),'delete');}}else done.delete(id);persistLocal();if(IS_PRIVATE){queueCloud(encodeDone(id),adding?'add':'delete');await flushPending();}render();}

function hav(a,b,c,d){const R=6371000,r=x=>x*Math.PI/180;const dp=r(c-a),dl=r(d-b),q=Math.sin(dp/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dl/2)**2;return 2*R*Math.asin(Math.sqrt(q));}
async function geocode(loc){const k='fg-geo-'+loc,c=localStorage.getItem(k);if(c)return JSON.parse(c);const u='https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=es&q='+encodeURIComponent(loc+', Gràcia, Barcelona');const r=await fetch(u,{headers:{'Accept-Language':'ca'}});if(!r.ok)throw 0;const j=await r.json(),v=j[0]?{lat:+j[0].lat,lon:+j[0].lon}:null;if(v)localStorage.setItem(k,JSON.stringify(v));return v;}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function nearMe(){if(!navigator.geolocation){status.textContent='Aquest navegador no permet geolocalització.';return;}status.textContent='Demanant la teva ubicació…';navigator.geolocation.getCurrentPosition(async p=>{nearMode=true;$('#nearBtn').classList.add('active');view='all';document.querySelectorAll('.seg').forEach(x=>x.classList.toggle('active',x.dataset.view==='all'));const visible=baseFiltered().filter(e=>!['Itinerante','Tota la Vila','Diversos carrers','Activitats diverses','Espais veïnals'].includes(e.location));const locs=[...new Set(visible.map(e=>e.location))];status.textContent=`Calculant proximitat per ${locs.length} ubicacions…`;for(let i=0;i<locs.length;i++){try{const g=await geocode(locs[i]);if(g)activities.filter(e=>e.location===locs[i]).forEach(e=>e._distance=hav(p.coords.latitude,p.coords.longitude,g.lat,g.lon));}catch{}if(i<locs.length-1)await sleep(1050);}render();},()=>status.textContent='No s’ha pogut obtenir la ubicació. Revisa els permisos del navegador.',{timeout:10000,maximumAge:300000});}

async function boot(){
  restoreLocal();
  restoreStreetVisits();
  const r=await fetch('activities.json?v=14.3.0',{cache:'no-store'});if(!r.ok)throw new Error(`activities.json ${r.status}`);activities=await r.json();if(!Array.isArray(activities)||!activities.length)throw new Error('activities.json buit');
  const sr=await fetch('streets.json?v=14.3.0',{cache:'no-store'});if(!sr.ok)throw new Error(`streets.json ${sr.status}`);streets=await sr.json();if(!Array.isArray(streets)||!streets.length)throw new Error('streets.json buit');
  renderDays();renderFilters();render();
  showUpdateNotice();
  logVisit();
  $('#searchInput').oninput=e=>{
    query=e.target.value.trim();
    if(tab==='streets' && query){
      // La cerca és transversal però només cerca activitats.
      list.innerHTML='';
      const prevTab=tab;
      tab='program';
      render();
      tab=prevTab;
      $('#heroSection').hidden=true;
      $('#programToolbar').hidden=true;
      $('#streetToolbar').hidden=true;
      $('#dateNav').hidden=true;
      $('#filters').hidden=true;
      status.textContent = `${baseFiltered().length} activitats`;
    }else{
      render();
    }
  };
  document.querySelectorAll('.seg').forEach(b=>b.onclick=()=>{view=b.dataset.view;document.querySelectorAll('.seg').forEach(x=>x.classList.toggle('active',x===b));render();});
  document.querySelectorAll('.street-filter').forEach(b=>b.onclick=()=>{streetView=b.dataset.streetView;document.querySelectorAll('.street-filter').forEach(x=>x.classList.toggle('active',x===b));render();});
  $('#nearBtn').onclick=nearMe;
  document.querySelectorAll('.bottom').forEach(b=>b.onclick=()=>{
    const previous=tab;tab=b.dataset.tab;
    document.querySelectorAll('.bottom').forEach(x=>x.classList.toggle('active',x===b));
    selectedDate=tab==='program'?defaultDate():'all';view='all';nearMode=false;
    $('#nearBtn').classList.remove('active');
    document.querySelectorAll('.seg').forEach(x=>x.classList.toggle('active',x.dataset.view==='all'));
    if(previous==='streets'||tab==='streets'){query='';$('#searchInput').value='';}
    renderDays();render();
  });

  if(IS_PRIVATE){
    try{await bulkSeed();await pullCloud({silent:false});}
    catch(e){console.warn('Inici privat amb còpia local',e);if(!saved.size&&!done.size){saved=new Set(INITIAL_FAVORITES);persistLocal();render();}}
    setInterval(()=>pullCloud({silent:true}),15000);
  }
  window.addEventListener('online',()=>{if(IS_PRIVATE)pullCloud({silent:false});logVisit();});
  setInterval(()=>{const current=festivalDayISO();if(current!==lastFestivalDay){lastFestivalDay=current;normalizeSelectedDate();renderDays();render();}},60000);
  if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js?v=14.3.0').catch(()=>{});
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').hidden=false;});
$('#installBtn').onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('#installBtn').hidden=true;}};
boot().catch(e=>{console.error(e);list.innerHTML='<div class="empty"><strong>No s’han pogut carregar les activitats.</strong>Recarrega la pàgina. Si continua passant, revisa que activities.json sigui al mateix directori.</div>';status.textContent='Error carregant les dades.';});
