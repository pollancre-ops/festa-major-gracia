const CACHE='festigracia-v13';
const ASSETS=['./','index.html','style.css?v=13.0.0','app.js?v=13.0.0','activities.json?v=13.0.0','manifest.json','manifest-private.json','icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.url.includes('supabase.co')||e.request.url.includes('nominatim.openstreetmap.org'))return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match(new URL(e.request.url).pathname.split('/').pop()))));});
