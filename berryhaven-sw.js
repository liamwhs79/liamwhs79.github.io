const CACHE='berryhaven-notifications-v1';

self.addEventListener('install',event=>{
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(self.clients.claim());
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
    if(target){
      setTimeout(()=>target.postMessage({type:'berry-notification-click',data}),500);
    }
  })());
});
