const CATS={
  musica:['🎵','Música'],
  dj_ball:['💃','DJ / ball'],
  cultura_popular:['🔥','Cultura popular'],
  infantil:['🧒','Infantil'],
  tallers:['🛠️','Tallers / activitats'],
  gastronomia:['🍴','Gastronomia'],
  espectacles:['🎭','Espectacles'],
  altres:['✨','Altres']
};

const DAYS=['2026-08-14','2026-08-15','2026-08-16','2026-08-17','2026-08-18','2026-08-19','2026-08-20','2026-08-21'];
const WEEK=['dg','dl','dt','dc','dj','dv','ds'];
const MONTH='ag.';

// ─────────────────────────────────────────────
// FAVORITS COMPARTITS · SUPABASE
// ─────────────────────────────────────────────
const SUPABASE_URL='https://girfbvvetgpisigzvvsy.supabase.co';
const SUPABASE_KEY='sb_publishable_vYvy1hWUDtc0ltmYvCbcqA_ohekPQSn';
const GROUP_ID='gracia26-x7k9';
const FAVORITES_API=`${SUPABASE_URL}/rest/v1/favorites`;
const CLOUD_MIGRATION_KEY=`festigracia-cloud-migrated-${GROUP_ID}`;
const PENDING_KEY=`festigracia-pending-${GROUP_ID}`;
const VISITS_API=`${SUPABASE_URL}/rest/v1/visits`;
const HIGHLIGHTS_SEED_MARKER='__seed_highlights_v1__';
const PRESELECTED_IDS=["e0046", "e0056", "e0063", "e0064", "e0065", "e0080", "e0083", "e0088", "e0102", "e0115", "e0126", "e0147", "e0157", "e0158", "e0164", "e0168", "e0173", "e0174", "e0180", "e0195", "e0198", "e0199", "e0200", "e0202", "e0206", "e0211", "e0220", "e0239", "e0249", "e0252", "e0263", "e0265", "e0274", "e0275", "e0286", "e0291", "e0293", "e0294", "e0300", "e0301", "e0305", "e0309", "e0313", "e0317", "e0324", "e0334", "e0339", "e0348", "e0350", "e0360", "e0362", "e0364", "e0370", "e0371", "e0374", "e0379", "e0380", "e0383", "e0384", "e0391", "e0402", "e0409", "e0407", "e0413", "e0415", "e0421", "e0425", "e0428", "e0430", "e0438", "e0446", "e0450", "e0455", "e0456", "e0457", "e0462", "e0471", "e0474", "e0475", "e0486", "e0489", "e0491", "e0492", "e0498", "e0501", "e0506", "e0510", "e0516", "e0527", "e0530", "e0533", "e0543", "e0546", "e0551", "e0566", "e0572", "e0584", "e0587", "e0591", "e0596", "e0599", "e0603", "e0604", "e0605", "e0608", "e0618", "e0621", "e0623", "e0631", "e0632"];

let activities=[];
let selectedDate=defaultDate();
let view='now';
let category='all';
let tab='today';
let query='';
let saved=new Set(JSON.parse(localStorage.getItem('festigracia-saved')||'[]'));
let nearMode=false;
let deferredPrompt=null;
let cloudReady=false;
let lastFestivalDay=festivalDayISO();

const $=s=>document.querySelector(s);
const list=$('#eventList');
const status=$('#status');

function isoLocal(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// La jornada de Festa Major canvia a les 05:00.
// Això fa que les activitats de matinada continuïn pertanyent al dia anterior.
function festivalDayISO(){
  const d=new Date();
  if(d.getHours()<5)d.setDate(d.getDate()-1);
  return isoLocal(d);
}

function availableDays(){
  const today=festivalDayISO();
  if(today<DAYS[0])return [...DAYS];
  if(today>DAYS[DAYS.length-1])return [];
  return DAYS.filter(d=>d>=today);
}

function defaultDate(){
  const available=availableDays();
  const today=festivalDayISO();
  if(available.includes(today))return today;
  return available[0]||DAYS[DAYS.length-1];
}

function minutes(t){
  const [h,m]=t.split(':').map(Number);
  return h*60+m;
}

function nowMins(){
  const d=new Date();
  return d.getHours()*60+d.getMinutes();
}

function niceDate(iso){
  const d=new Date(iso+'T12:00:00');
  return `${WEEK[d.getDay()]}. ${d.getDate()}`;
}

function cardDate(iso){
  const d=new Date(iso+'T12:00:00');
  const wd=WEEK[d.getDay()];
  return `${wd}. ${d.getDate()} ${MONTH}`;
}

function normalizeSelectedDate(){
  const available=availableDays();
  if(selectedDate==='all')return;
  if(!available.includes(selectedDate)){
    selectedDate=available[0]||'all';
  }
}

function renderDays(){
  normalizeSelectedDate();
  const nav=$('#dateNav');
  nav.innerHTML='';

  const available=availableDays();

  const all=document.createElement('button');
  all.className='day-btn all-days'+(selectedDate==='all'?' active':'');
  all.innerHTML='<strong>∞</strong><span>Totes</span>';
  all.onclick=()=>{
    selectedDate='all';
    view='all';
    document.querySelectorAll('.seg').forEach(x=>x.classList.toggle('active',x.dataset.view==='all'));
    nearMode=false;
    $('#nearBtn').classList.remove('active');
    renderDays();
    render();
  };
  nav.appendChild(all);

  available.forEach(d=>{
    const dt=new Date(d+'T12:00:00');
    const b=document.createElement('button');
    b.className='day-btn'+(d===selectedDate?' active':'');
    b.innerHTML=`<strong>${dt.getDate()}</strong><span>${WEEK[dt.getDay()]}</span>`;
    b.onclick=()=>{
      selectedDate=d;
      nearMode=false;
      $('#nearBtn').classList.remove('active');
      renderDays();
      render();
    };
    nav.appendChild(b);
  });

  nav.querySelector('.active')?.scrollIntoView({inline:'center',block:'nearest'});
}

function renderFilters(){
  const box=$('#filters');
  box.innerHTML='';
  [['all',['','Totes']],...Object.entries(CATS)].forEach(([key,v])=>{
    const b=document.createElement('button');
    b.className='filter-btn'+(category===key?' active':'');
    b.textContent=(v[0]?v[0]+' ':'')+v[1];
    b.onclick=()=>{
      category=key;
      renderFilters();
      render();
    };
    box.appendChild(b);
  });
}

function displayName(c){
  const v=CATS[c]||CATS.altres;
  return `${v[0]} ${v[1]}`;
}

function mapUrl(loc){
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc+', Gràcia, Barcelona')}`;
}

function effectiveWindow(e){
  let s=minutes(e.start),en=e.end?minutes(e.end):s+45;
  if(e.end&&en<s)en+=1440;
  return [s,en];
}

function currentMatch(e){
  let n=nowMins();
  if(e.lateNight&&n<300)n+=1440;
  let [s,en]=effectiveWindow(e);
  if(e.lateNight)s+=1440;
  return n>=s-15&&n<=en;
}

function upcomingMatch(e){
  let n=nowMins();
  if(e.lateNight&&n<300)n+=1440;
  let s=minutes(e.start)+(e.lateNight?1440:0);
  return s>n&&s<=n+120;
}

function baseFiltered(){
  const available=new Set(availableDays());

  // Els dies passats desapareixen de totes les vistes, inclòs El nostre pla.
  let a=activities.filter(e=>available.has(e.date));

  if(selectedDate!=='all')a=a.filter(e=>e.date===selectedDate);
  if(category!=='all')a=a.filter(e=>e.category===category);

  if(query){
    const q=query.toLowerCase();
    a=a.filter(e=>(`${e.title} ${e.location} ${cardDate(e.date)} ${displayName(e.category)}`).toLowerCase().includes(q));
  }

  if(tab==='saved')a=a.filter(e=>saved.has(e.id));
  return a;
}

function sortEvents(a){
  return [...a].sort((x,y)=>{
    if(nearMode&&x._distance!=null&&y._distance!=null)return x._distance-y._distance;
    if(x.date!==y.date)return x.date.localeCompare(y.date);
    return (minutes(x.start)+(x.lateNight?1440:0))-(minutes(y.start)+(y.lateNight?1440:0));
  });
}

function eventCard(e){
  const n=$('#eventTemplate').content.firstElementChild.cloneNode(true);
  n.querySelector('.event-time').textContent=e.start;
  n.querySelector('.event-end').textContent=e.end?`— ${e.end}`:'';
  n.querySelector('.event-title').textContent=e.title;
  n.querySelector('.event-location').textContent=e.location;
  n.querySelector('.category-pill').textContent=displayName(e.category);
  n.querySelector('.recurring-mark').hidden=!e.recurring;

  // Data visible a totes les targetes
  const meta=n.querySelector('.event-meta');
  const date=document.createElement('span');
  date.className='date-pill';
  date.textContent=cardDate(e.date);
  meta.prepend(date);

  const m=n.querySelector('.map-link');
  m.href=mapUrl(e.location);

  if(e._distance!=null){
    n.querySelector('.distance').textContent=e._distance<1000
      ?`${Math.round(e._distance/10)*10} m`
      :`${(e._distance/1000).toFixed(1)} km`;
  }

  const s=n.querySelector('.save-btn');
  s.textContent=saved.has(e.id)?'♥':'♡';
  s.classList.toggle('saved',saved.has(e.id));
  s.onclick=()=>toggleFavorite(e.id);
  return n;
}

function addSection(title,a){
  if(!a.length)return;
  const h=document.createElement('div');
  h.className='section-label';
  h.textContent=title;
  list.appendChild(h);
  sortEvents(a).forEach(e=>list.appendChild(eventCard(e)));
}

function addAllDaysSections(a){
  const grouped={};
  sortEvents(a).forEach(e=>{
    (grouped[e.date]??=[]).push(e);
  });
  Object.entries(grouped).forEach(([date,items])=>{
    addSection(cardDate(date),items);
  });
}

function render(){
  normalizeSelectedDate();
  list.innerHTML='';

  const a=baseFiltered();
  const festivalToday=festivalDayISO();
  const isToday=selectedDate===festivalToday;

  if(tab==='saved'){
    $('#heroTitle').textContent='El vostre programa compartit.';
  }else if(selectedDate==='all'){
    $('#heroTitle').textContent='Tota la Festa Major, en una sola vista.';
  }else if(isToday){
    $('#heroTitle').textContent='Què pots fer ara mateix?';
  }else{
    $('#heroTitle').textContent=`Plans per ${niceDate(selectedDate)}.`;
  }

  if(tab==='saved'){
    if(selectedDate==='all')addAllDaysSections(a);
    else addSection('El nostre pla',a);
  }else if(view==='now'){
    // "Ara" només pot correspondre a la jornada vigent, encara que estiguem a Totes.
    const todayPool=a.filter(e=>e.date===festivalToday);
    const cur=todayPool.filter(currentMatch);
    const up=todayPool.filter(e=>!cur.includes(e)&&upcomingMatch(e));

    addSection('Ara',cur);
    addSection('A continuació · 2 h',up);

    if(!cur.length&&!up.length){
      list.innerHTML='<div class="empty"><strong>Cap activitat en aquesta franja.</strong>Prova “Tot el dia” o canvia de categoria.</div>';
    }
  }else{
    if(selectedDate==='all'&&!nearMode)addAllDaysSections(a);
    else addSection(nearMode?'Més a prop':'Programa',a);

    if(!a.length){
      list.innerHTML='<div class="empty"><strong>No hi ha coincidències.</strong>Canvia els filtres o la cerca.</div>';
    }
  }

  if(!status.textContent){
    const scope=selectedDate==='all'?'els dies disponibles':'aquesta selecció';
    status.textContent=`${a.length} activitats a ${scope}`;
  }

  updateSaved();
}

function updateSaved(){
  // El comptador també exclou favorits de dies passats.
  const available=new Set(availableDays());
  const visibleSaved=activities.filter(e=>available.has(e.date)&&saved.has(e.id)).length;
  $('#savedCount').textContent=visibleSaved||'';
}

function persistLocal(){
  localStorage.setItem('festigracia-saved',JSON.stringify([...saved]));
}

function cloudHeaders(extra={}){
  return {
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    ...extra
  };
}

function getPending(){
  try{return JSON.parse(localStorage.getItem(PENDING_KEY)||'{}')}
  catch{return {}}
}

function setPending(p){
  localStorage.setItem(PENDING_KEY,JSON.stringify(p));
}

function queueOp(activityId,op){
  const p=getPending();
  p[activityId]=op;
  setPending(p);
}

async function cloudAdd(activityId){
  const r=await fetch(FAVORITES_API,{
    method:'POST',
    headers:cloudHeaders({'Content-Type':'application/json','Prefer':'return=minimal'}),
    body:JSON.stringify({group_id:GROUP_ID,activity_id:activityId})
  });
  if(!r.ok)throw new Error(`Supabase POST ${r.status}`);
}

async function cloudAddMany(activityIds){
  if(!activityIds.length)return;
  const rows=activityIds.map(activity_id=>({group_id:GROUP_ID,activity_id}));
  const r=await fetch(FAVORITES_API,{
    method:'POST',
    headers:cloudHeaders({'Content-Type':'application/json','Prefer':'return=minimal'}),
    body:JSON.stringify(rows)
  });
  if(!r.ok)throw new Error(`Supabase bulk POST ${r.status}`);
}

async function cloudDelete(activityId){
  const u=`${FAVORITES_API}?group_id=eq.${encodeURIComponent(GROUP_ID)}&activity_id=eq.${encodeURIComponent(activityId)}`;
  const r=await fetch(u,{
    method:'DELETE',
    headers:cloudHeaders({'Prefer':'return=minimal'})
  });
  if(!r.ok)throw new Error(`Supabase DELETE ${r.status}`);
}

async function fetchCloudRows(){
  const u=`${FAVORITES_API}?group_id=eq.${encodeURIComponent(GROUP_ID)}&select=activity_id`;
  const r=await fetch(u,{headers:cloudHeaders()});
  if(!r.ok)throw new Error(`Supabase GET ${r.status}`);
  const rows=await r.json();
  return new Set(rows.map(x=>x.activity_id));
}

async function fetchCloudFavorites(){
  const rows=await fetchCloudRows();
  return new Set([...rows].filter(id=>!id.startsWith('__')));
}

async function flushPending(){
  if(!navigator.onLine)return false;
  const p=getPending();
  const entries=Object.entries(p);
  if(!entries.length)return true;

  for(const [id,op] of entries){
    try{
      if(op==='add')await cloudAdd(id);
      else await cloudDelete(id);

      const latest=getPending();
      if(latest[id]===op){
        delete latest[id];
        setPending(latest);
      }
    }catch(e){
      console.warn('No s’ha pogut sincronitzar',id,e);
      return false;
    }
  }
  return true;
}


async function seedHighlightedFavoritesOnce(){
  if(!navigator.onLine)return;

  try{
    const remote=await fetchCloudRows();
    if(remote.has(HIGHLIGHTS_SEED_MARKER))return;

    const missing=PRESELECTED_IDS.filter(id=>!remote.has(id));
    await cloudAddMany([...missing,HIGHLIGHTS_SEED_MARKER]);
  }catch(e){
    console.warn('No s’han pogut inicialitzar els favorits del document',e);
  }
}

function getVisitorId(){
  const key='festigracia-visitor-id';
  let id=localStorage.getItem(key);
  if(!id){
    id=(globalThis.crypto?.randomUUID?.()||`fg-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    localStorage.setItem(key,id);
  }
  return id;
}

function getDeviceLabel(){
  const ua=navigator.userAgent||'';
  let device='Altres';
  if(/iPhone/i.test(ua))device='iPhone';
  else if(/iPad/i.test(ua))device='iPad';
  else if(/Android/i.test(ua))device='Android';
  else if(/Macintosh|Mac OS X/i.test(ua))device='Mac';
  else if(/Windows/i.test(ua))device='Windows';
  else if(/Linux/i.test(ua))device='Linux';

  let browser='Navegador';
  if(/Edg\//.test(ua))browser='Edge';
  else if(/Firefox\//.test(ua))browser='Firefox';
  else if(/Chrome\//.test(ua)&&!/Edg\//.test(ua))browser='Chrome';
  else if(/Safari\//.test(ua)&&!/Chrome\//.test(ua))browser='Safari';

  return `${device} · ${browser}`;
}

async function logVisit(){
  const sessionKey='festigracia-visit-logged-v1';
  if(sessionStorage.getItem(sessionKey)==='1')return;
  if(!navigator.onLine)return;

  try{
    const r=await fetch(VISITS_API,{
      method:'POST',
      headers:cloudHeaders({'Content-Type':'application/json','Prefer':'return=minimal'}),
      body:JSON.stringify({
        visitor_id:getVisitorId(),
        device:getDeviceLabel(),
        page_url:location.href.split('#')[0]
      })
    });

    if(!r.ok)throw new Error(`Supabase visits POST ${r.status}`);
    sessionStorage.setItem(sessionKey,'1');
  }catch(e){
    console.warn('Analítica de visites no disponible',e);
  }
}

async function migrateLocalFavoritesOnce(){
  if(localStorage.getItem(CLOUD_MIGRATION_KEY)==='1')return;
  try{
    const remote=await fetchCloudFavorites();
    const localIds=[...saved];
    for(const id of localIds){
      if(!remote.has(id)){
        try{await cloudAdd(id)}
        catch(e){queueOp(id,'add')}
      }
    }
    localStorage.setItem(CLOUD_MIGRATION_KEY,'1');
  }catch(e){
    console.warn('Migració pendent',e);
  }
}

async function pullFavorites({silent=true}={}){
  if(!navigator.onLine)return;
  try{
    await flushPending();
    const remote=await fetchCloudFavorites();
    const before=JSON.stringify([...saved].sort());
    saved=remote;
    persistLocal();
    const after=JSON.stringify([...saved].sort());
    cloudReady=true;

    if(before!==after)render();

    if(!silent){
      status.textContent='Favorits compartits sincronitzats ✓';
      setTimeout(()=>{
        if(status.textContent.includes('sincronitzats'))status.textContent='';
      },1800);
    }
  }catch(e){
    cloudReady=false;
    console.warn('Supabase no disponible',e);
    if(!silent){
      status.textContent='Treballant amb la còpia local. Se sincronitzarà quan torni la connexió.';
    }
  }
}

async function toggleFavorite(activityId){
  const adding=!saved.has(activityId);

  if(adding)saved.add(activityId);
  else saved.delete(activityId);

  persistLocal();
  queueOp(activityId,adding?'add':'delete');
  render();

  const ok=await flushPending();
  if(ok){
    status.textContent=adding?'Afegit al pla compartit ✓':'Eliminat del pla compartit ✓';
    setTimeout(()=>{
      if(status.textContent.includes('pla compartit'))status.textContent='';
    },1200);
  }else{
    status.textContent='Canvi desat al dispositiu. Se sincronitzarà quan hi hagi connexió.';
  }
}

function hav(a,b,c,d){
  const R=6371000,r=x=>x*Math.PI/180;
  const dp=r(c-a),dl=r(d-b);
  const q=Math.sin(dp/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dl/2)**2;
  return 2*R*Math.asin(Math.sqrt(q));
}

async function geocode(loc){
  const k='fg-geo-'+loc;
  const c=localStorage.getItem(k);
  if(c)return JSON.parse(c);

  const u='https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=es&q='
    +encodeURIComponent(loc+', Gràcia, Barcelona');

  const r=await fetch(u,{headers:{'Accept-Language':'ca'}});
  if(!r.ok)throw 0;

  const j=await r.json();
  const v=j[0]?{lat:+j[0].lat,lon:+j[0].lon}:null;
  if(v)localStorage.setItem(k,JSON.stringify(v));
  return v;
}

const sleep=ms=>new Promise(r=>setTimeout(r,ms));

function nearMe(){
  if(!navigator.geolocation){
    status.textContent='Aquest navegador no permet geolocalització.';
    return;
  }

  status.textContent='Demanant la teva ubicació…';

  navigator.geolocation.getCurrentPosition(async p=>{
    nearMode=true;
    $('#nearBtn').classList.add('active');
    view='all';
    document.querySelectorAll('.seg').forEach(x=>x.classList.toggle('active',x.dataset.view==='all'));

    const visible=baseFiltered().filter(e=>![
      'Itinerante','Tota la Vila','Diversos carrers','Activitats diverses','Espais veïnals'
    ].includes(e.location));

    const locs=[...new Set(visible.map(e=>e.location))];
    status.textContent=`Calculant proximitat per ${locs.length} ubicacions…`;

    for(let i=0;i<locs.length;i++){
      try{
        const g=await geocode(locs[i]);
        if(g){
          activities
            .filter(e=>e.location===locs[i])
            .forEach(e=>e._distance=hav(p.coords.latitude,p.coords.longitude,g.lat,g.lon));
        }
      }catch{}
      if(i<locs.length-1)await sleep(1050);
    }

    render();
  },()=>{
    status.textContent='No s’ha pogut obtenir la ubicació. Revisa els permisos del navegador.';
  },{timeout:10000,maximumAge:300000});
}

async function boot(){
  activities=await fetch('activities.json').then(r=>r.json());

  renderDays();
  renderFilters();
  updateSaved();
  render();

  $('#searchInput').oninput=e=>{
    query=e.target.value.trim();
    render();
  };

  document.querySelectorAll('.seg').forEach(b=>b.onclick=()=>{
    view=b.dataset.view;
    document.querySelectorAll('.seg').forEach(x=>x.classList.toggle('active',x===b));
    render();
  });

  $('#nearBtn').onclick=nearMe;

  document.querySelectorAll('.bottom').forEach(b=>b.onclick=()=>{
    tab=b.dataset.tab;
    document.querySelectorAll('.bottom').forEach(x=>x.classList.toggle('active',x===b));

    if(tab==='today'){
      selectedDate=defaultDate();
      view='now';
      query='';
      $('#searchInput').value='';
      document.querySelectorAll('.seg').forEach(x=>x.classList.toggle('active',x.dataset.view==='now'));
      renderDays();
    }else if(tab==='explore'){
      // Explora entra directament a la cerca global de tots els dies disponibles.
      selectedDate='all';
      view='all';
      document.querySelectorAll('.seg').forEach(x=>x.classList.toggle('active',x.dataset.view==='all'));
      renderDays();
      $('#searchInput').focus();
    }else if(tab==='saved'){
      selectedDate='all';
      view='all';
      document.querySelectorAll('.seg').forEach(x=>x.classList.toggle('active',x.dataset.view==='all'));
      renderDays();
    }

    render();
  });

  // Registra una visita anònima per sessió.
  logVisit();

  // Inicialitza una sola vegada, a nivell de grup, les activitats ressaltades
  // al document com a favorits compartits. El marcador evita reintroduir-les
  // si després les desmarqueu manualment.
  await seedHighlightedFavoritesOnce();

  await migrateLocalFavoritesOnce();
  await pullFavorites({silent:false});

  // Favorits compartits entre dispositius.
  setInterval(()=>pullFavorites({silent:true}),5000);
  window.addEventListener('online',()=>pullFavorites({silent:false}));

  // Si l'app queda oberta mentre canvia el dia de Festa Major,
  // actualitza automàticament la navegació i elimina el dia passat.
  setInterval(()=>{
    const current=festivalDayISO();
    if(current!==lastFestivalDay){
      lastFestivalDay=current;
      normalizeSelectedDate();
      renderDays();
      render();
    }
  },60000);

  if('serviceWorker'in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
}

window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();
  deferredPrompt=e;
  $('#installBtn').hidden=false;
});

$('#installBtn').onclick=async()=>{
  if(deferredPrompt){
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt=null;
    $('#installBtn').hidden=true;
  }
};

boot().catch(()=>{
  list.innerHTML='<div class="empty"><strong>No s’han pogut carregar les dades.</strong>Recarrega la pàgina.</div>';
});
