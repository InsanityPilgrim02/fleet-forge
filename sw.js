const C='warfleets-app',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','maskable-512.png'];
/* install: only fetch files that are not cached yet. Updating an installed copy is done by the "Look for updates" button, never automatically. */
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.match(u).then(h=>h||fetch(u,{cache:'reload'}).then(r=>r.ok?c.put(u,r):0)).catch(()=>0)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* fetch: cache first (the installed copy), network only for files that are not cached */
self.addEventListener('fetch',e=>{const q=e.request,u=new URL(q.url);if(q.method!=='GET'||u.origin!==location.origin||u.searchParams.has('cf'))return;
 e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q).then(n=>{if(n.ok){const cp=n.clone();caches.open(C).then(c=>c.put(q,cp))}return n}).catch(()=>caches.match('index.html'))))});
