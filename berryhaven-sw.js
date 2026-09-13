const CACHE='berryhaven-hd-v43-6';
const CORE=[
  './','./index.html','./berry-brand.js','./berry-emojis.js','./berry-adult-emojis.js',
  './berry-profiles.js','./berry-animated-profiles.js','./berry-feelings.js','./berry-animated-themes.js','./berry-icons.js','./berry-games.js','./berry-ui.js'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('berryhaven-')&&k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  event.respondWith((async()=>{
    const cached=await caches.match(req);
    const network=fetch(req).then(async res=>{
      if(res&&res.ok){const cache=await caches.open(CACHE);cache.put(req,res.clone()).catch(()=>{});}
      return res;
    }).catch(()=>null);
    return cached || await network || new Response('Offline',{status:503,statusText:'Offline'});
  })());
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const data=event.notification.data||{};
  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    let target=windows.find(c=>c.visibilityState==='visible')||windows[0];
    if(target){
      await target.focus();
      target.postMessage({type:'berry-notification-click',data});
      return;
    }
    target=await self.clients.openWindow('./');
    if(target)setTimeout(()=>target.postMessage({type:'berry-notification-click',data}),500);
  })());
});
