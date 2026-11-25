const C='warfleets-v7',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','maskable-512.png','icons/cruiser.svg','icons/destroyer.svg','icons/corvette.svg','icons/gunship.svg','icons/fighter.svg','icons/bomber.svg','icons/cruiser.png','icons/destroyer.png','icons/corvette.png','icons/gunship.png','icons/fighter.png','icons/bomber.png'];
/* install: fetch each file fresh (skipping the browser HTTP cache); one missing file no longer blocks the whole update */
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>fetch(u,{cache:'reload'}).then(r=>r.ok?c.put(u,r):0).catch(()=>0)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* fetch: network first (always the newest file when online), cache only as the offline fallback */
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||new URL(q.url).origin!==location.origin)return;
 e.respondWith(fetch(q.mode==='navigate'?q.url:q,{cache:'no-cache'}).then(n=>{if(n.ok){const cp=n.clone();caches.open(C).then(c=>c.put(q,cp))}return n}).catch(()=>caches.match(q).then(r=>r||caches.match('index.html'))))});
