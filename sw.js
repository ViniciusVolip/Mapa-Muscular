// funciona offline; mude a versão a cada atualização
const CACHE='mapa-muscular-4';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('mapa-muscular-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(CACHE).then(c=>c.put('index.html',y))}return x}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const y=x.clone();caches.open(CACHE).then(c=>c.put(r,y))}return x})))});
