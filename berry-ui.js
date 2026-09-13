/* Berry Haven HD interface layer. Keeps controls as real HTML/CSS while giving them the new glossy visual language. */
(function(){
const css=`
:root{--bh-glass:rgba(36,16,37,.72);--bh-glass-2:rgba(70,27,58,.58);--bh-line:rgba(255,194,220,.18);--bh-pink:#f06f9e;--bh-rose:#d84e7b;--bh-cream:#fff4ed;--bh-deep:#25101f;--bh-shadow:0 18px 44px rgba(25,6,19,.28);--bh-softshadow:0 8px 24px rgba(25,6,19,.2)}
body:not(.safe-mode){background-attachment:fixed}
.panel,.card,.store-shell,.gamepane,.profile-panel,.modal-card{border:1px solid var(--bh-line)!important;box-shadow:var(--bh-softshadow)!important;backdrop-filter:blur(18px) saturate(1.12);-webkit-backdrop-filter:blur(18px) saturate(1.12)}
button,.button,.primary,.soft{transition:transform .16s ease,box-shadow .16s ease,filter .16s ease,border-color .16s ease}
button:active,.button:active{transform:scale(.975)}
button.primary,.primary:not(input),button:not(.soft):not(.round):not(.home-orb):not([class*="tab"]){box-shadow:0 8px 20px rgba(190,54,104,.16)}
button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid rgba(247,126,170,.32)!important;outline-offset:2px}
.bh-svg-icon{width:1.25em;height:1.25em;display:block;overflow:visible;filter:drop-shadow(0 2px 5px rgba(127,25,77,.18))}
.auth-logo{width:76px!important;height:76px!important;margin:0 auto 8px!important;border-radius:24px!important;overflow:hidden!important;box-shadow:0 14px 32px rgba(182,42,99,.32)!important}.auth-logo img{width:100%;height:100%;object-fit:cover;display:block}
.bottomnav button b{display:grid!important;place-items:center;width:28px;height:28px;margin:auto;color:currentColor}
.bottomnav .bh-svg-icon{width:24px;height:24px}
.bottomnav .home-orb b{width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 34% 26%,#ffb3ce,#ef618e 46%,#a63063 100%);color:#fff;box-shadow:0 10px 25px rgba(185,42,99,.38),inset 0 1px 0 rgba(255,255,255,.52)}
.bottomnav .home-orb .bh-svg-icon{width:27px;height:27px;filter:drop-shadow(0 2px 4px rgba(87,11,47,.34))}
[data-berry-safe-toggle],.berry-safe-toggle{box-shadow:0 10px 28px rgba(199,55,111,.3)!important;border:1px solid rgba(255,255,255,.28)!important;background:radial-gradient(circle at 35% 25%,#ffb8d0,#f16698 50%,#ac2d65)!important}
.game-selector button{min-width:116px;overflow:hidden;position:relative;padding-top:10px!important}
.game-selector button .bh-game-tab-art{width:54px;height:54px;border-radius:17px;display:block;margin:0 auto 5px;box-shadow:0 7px 17px rgba(29,8,25,.22)}
.game-mode-art{width:62px!important;height:62px!important;display:grid!important;place-items:center!important;border-radius:20px!important;overflow:hidden!important;background:transparent!important}
.game-mode-art img{width:100%;height:100%;object-fit:cover}
.mp-game-icon-hd{width:58px;height:58px;border-radius:18px;object-fit:cover;box-shadow:0 9px 22px rgba(29,8,25,.22);flex:0 0 auto}
.profile-avatar img,.profile-avatar-art img,.profile-art-img{width:100%;height:100%;object-fit:cover;display:block}
.profile-avatar,.profile-art{overflow:hidden}
.berrymoji-art.hd-image{background:none!important;border:0!important;box-shadow:none!important}
.berrymoji-art.hd-image img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 7px 12px rgba(65,13,43,.18))}
.berrymoji-btn:has(.hd-image){background:linear-gradient(145deg,rgba(255,255,255,.72),rgba(255,222,235,.46))!important;border:1px solid rgba(227,116,157,.22)!important}
/* Talks becomes a true fixed workspace; only the thread itself scrolls. */
.page.active.talks-page{position:fixed!important;inset:0 0 calc(var(--nav-h,74px) + env(safe-area-inset-bottom,0px)) 0!important;padding:10px 10px 8px!important;overflow:hidden!important;z-index:8}
.talks-static-shell{height:100%!important;min-height:0!important;grid-template-rows:auto minmax(0,1fr) auto!important;gap:7px!important;max-width:900px!important;margin:0 auto!important}
.talks-static-head{padding:9px 11px!important;border-radius:18px!important}
.talks-title-row h2{font-size:1.02rem!important;margin:0!important}.talks-title-row p{display:none!important}.talks-title-row{min-height:34px!important}
.talks-partner-row{margin-top:4px!important}.talks-checkin-grid{margin-top:5px!important;grid-template-columns:1fr 1fr!important;gap:6px!important}.talks-checkin-card{padding:7px 8px!important;min-height:0!important}.talks-checkin-card small{font-size:.67rem!important}.talks-checkin-card button{padding:7px 8px!important}
.talks-thread{min-height:0!important;height:auto!important;overflow-y:auto!important;overscroll-behavior:contain;padding:9px!important;border-radius:19px!important}
.talks-composer{position:relative!important;bottom:auto!important;padding:7px!important;margin:0!important}.composer-v3{margin:0!important}.composer-v3 input{min-width:0!important}
/* Store uses the viewport like a native full-screen browser. */
#prizeGarden.page.active{position:fixed!important;inset:0 0 calc(var(--nav-h,74px) + env(safe-area-inset-bottom,0px)) 0!important;padding:7px!important;overflow:hidden!important;z-index:9}
#prizeGarden .store-shell{height:100%!important;max-width:980px!important;margin:auto!important;border-radius:24px!important;display:grid!important;grid-template-rows:auto auto auto minmax(0,1fr)!important;overflow:hidden!important;padding:10px!important}
#prizeGarden .store-hero{padding:5px 6px 8px!important}#prizeGarden .store-hero p{display:none!important}#prizeGarden .store-hero h2{font-size:1.15rem!important;margin:2px 0!important}
#prizeGarden .store-wallet-row{gap:7px!important}.store-wallet{padding:8px 10px!important}.store-wallet strong{font-size:1.12rem!important}.currency-tabs{margin:7px 0!important}
#prizeGarden .store-viewport{min-height:0!important;height:100%!important;overflow:hidden!important}.store-pane{height:100%!important;min-height:0!important;display:grid!important;grid-template-rows:auto auto minmax(0,1fr)!important}.store-scroll-area{min-height:0!important;overflow-y:auto!important;overscroll-behavior:contain;padding-bottom:18px!important}.store-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}.store-grid>button,.store-grid>.store-card{min-height:156px!important;padding:12px!important;border-radius:20px!important}
@media(min-width:650px){.store-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}.talks-checkin-grid{grid-template-columns:1fr 1fr!important}}
/* Auth and modals */
.auth-card,.store-detail-card{box-shadow:0 30px 80px rgba(22,5,18,.42)!important;border:1px solid rgba(255,190,218,.23)!important;backdrop-filter:blur(24px) saturate(1.18)}
`;
const s=document.createElement('style');s.id='berryHdUiStyle';s.textContent=css;document.head.appendChild(s);
function setIcon(el,name){if(el&&window.BerryIcons)el.innerHTML=window.BerryIcons.svg(name)}
function apply(){
 const ai=window.getBerryBrandAsset?.('appIcon');const al=document.querySelector('.auth-logo');if(ai&&al)al.innerHTML=`<img src="${ai}" alt="Berry Haven">`;
 const nav={talk:'talks',middle:'boundaries',home:'home',fourth:'planner',spicy:'adult',more:'more'};
 Object.entries(nav).forEach(([k,v])=>setIcon(document.querySelector(`[data-v3nav="${k}"] b`),v));
 document.querySelectorAll('[data-open-store]').forEach(b=>{if(!b.dataset.hdIcon){b.dataset.hdIcon='1';b.insertAdjacentHTML('afterbegin',window.BerryIcons?window.BerryIcons.svg('store','inline'):'' )}});
 const tabs={pairs:'pairs',words:'words',four:'four',colour:'colour',farm:'farm'};
 Object.entries(tabs).forEach(([k,id])=>{const b=document.querySelector(`[data-game="${k}"]`);const a=window.getBerryGameArt?.(id);if(b&&a){const span=b.querySelector('span');if(span){span.innerHTML=`<img class="bh-game-tab-art" src="${a.src}" alt="">`}}});
 const banners=[['gamePairs','pairs'],['gameWords','words'],['gameFour','four'],['gameColour','colour'],['gameFarm','farm']];
 banners.forEach(([pid,id])=>{const p=document.getElementById(pid),a=window.getBerryGameArt?.(id);const art=p?.querySelector('.game-mode-art');if(art&&a)art.innerHTML=`<img src="${a.src}" alt="">`});
 const mp=[['ttt','ttt'],['connect','connect'],['rps','rps'],['rescue','rescue'],['signal','signal'],['trails','trails']];
 mp.forEach(([mode,id])=>{const b=document.querySelector(`[data-mp-start="${mode}"]`);const a=window.getBerryGameArt?.(id);if(b&&a&&!b.querySelector('.mp-game-icon-hd')){const old=b.querySelector('.mp-card-art,.mp-game-art,span');if(old)old.outerHTML=`<img class="mp-game-icon-hd" src="${a.src}" alt="">`;else b.insertAdjacentHTML('afterbegin',`<img class="mp-game-icon-hd" src="${a.src}" alt="">`)}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
window.applyBerryHdAssets=apply;
})();


/* Revision 43.6 game visual integration: make each game screen inherit its icon artwork and palette. */
(function(){
 const css=String.raw`
.polished-game,.together-pane{position:relative;overflow:hidden!important;isolation:isolate}
.polished-game::before,.together-pane::before{content:"";position:absolute;inset:0;z-index:-2;background:linear-gradient(145deg,rgba(255,251,253,.93),rgba(247,233,242,.92));}
.polished-game::after,.together-pane::after{content:"";position:absolute;width:min(52vw,280px);aspect-ratio:1;right:-56px;top:-46px;z-index:-1;background-image:var(--game-art);background-size:cover;background-position:center;border-radius:38px;opacity:.12;filter:saturate(1.1) blur(.2px);transform:rotate(7deg);box-shadow:0 20px 50px rgba(66,24,58,.2)}
#gamePairs{--game-accent:#e75f98;--game-accent2:#f7bfd4}#gameWords{--game-accent:#5e9d74;--game-accent2:#d7ecd8}#gameFour{--game-accent:#5269bd;--game-accent2:#e682a7}#gameColour{--game-accent:#b67ad7;--game-accent2:#ffe0ae}#gameFarm{--game-accent:#6e9e62;--game-accent2:#e3ba72}#gameTogether{--game-accent:#7b5fc4;--game-accent2:#e56f9a}
.polished-game .game-mode-banner{border:1px solid color-mix(in srgb,var(--game-accent) 24%,transparent)!important;background:linear-gradient(145deg,color-mix(in srgb,var(--game-accent2) 24%,#fff),rgba(255,255,255,.8))!important;box-shadow:0 12px 28px color-mix(in srgb,var(--game-accent) 15%,transparent)!important}
.polished-game .game-progress{background:color-mix(in srgb,var(--game-accent2) 36%,#fff)!important}.polished-game .game-progress i{background:linear-gradient(90deg,var(--game-accent),color-mix(in srgb,var(--game-accent2) 78%,var(--game-accent)))!important}
/* Pairs: premium memory cards matching the icon. */
#gamePairs .memory-v3{gap:8px!important;padding:10px;border-radius:24px;background:linear-gradient(145deg,rgba(104,43,82,.08),rgba(236,122,170,.12));box-shadow:inset 0 1px 0 rgba(255,255,255,.55)}
#gamePairs .mcard-v3{border:2px solid rgba(255,255,255,.52)!important;background:radial-gradient(circle at 30% 22%,rgba(255,255,255,.55),transparent 18%),linear-gradient(145deg,#f49bbd,#bd5f9c)!important;box-shadow:0 8px 14px rgba(94,34,76,.15),inset 0 -5px 10px rgba(105,32,76,.12)!important;position:relative;overflow:hidden}
#gamePairs .mcard-v3:not(.flipped):not(.matched)::after{content:"🍓";display:grid;place-items:center;position:absolute;inset:0;font-size:clamp(18px,6vw,28px);filter:drop-shadow(0 3px 4px rgba(84,25,58,.18));opacity:.88}
#gamePairs .mcard-v3.flipped,#gamePairs .mcard-v3.matched{background:linear-gradient(145deg,#fffafd,#fff0f6)!important;border-color:#f1bfd1!important;box-shadow:0 8px 18px rgba(85,33,63,.12)!important}
/* Word Garden: garden board, leafy tiles, stronger found state. */
#gameWords .word-grid{padding:9px;border-radius:20px;background:linear-gradient(145deg,#365e49,#63856c);gap:4px!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 12px 25px rgba(45,77,58,.16)}
#gameWords .word-cell{border:1px solid rgba(69,105,76,.24)!important;background:linear-gradient(145deg,#fffdf7,#edf6ea)!important;color:#345842!important;box-shadow:inset 0 2px 5px rgba(74,102,75,.08)}
#gameWords .word-cell.preview{background:#ffe0ea!important;color:#733c57!important}#gameWords .word-cell.found{background:linear-gradient(145deg,#9bd7a9,#d7f2dc)!important;color:#21583a!important;transform:scale(.96)}
#gameWords .word-pill{border:1px solid rgba(72,122,87,.18)!important;background:#f4fbf3!important}.word-pill.found{background:#caebd2!important}
/* Solo Four and multiplayer Four now share the glossy board language. */
.connect-board,.mp-connect{background:linear-gradient(150deg,#142552,#2e4d95 55%,#17264d)!important;border:2px solid rgba(143,178,255,.5)!important;border-radius:25px!important;box-shadow:inset 0 3px 0 rgba(255,255,255,.14),inset 0 -10px 24px rgba(3,12,39,.28),0 15px 32px rgba(23,38,84,.22)!important;padding:12px!important;gap:6px!important}
.connect-cell,.mp-connect button{aspect-ratio:1!important;border-radius:50%!important;border:2px solid rgba(8,22,60,.3)!important;background:radial-gradient(circle at 40% 30%,#f7f8ff,#c8d6f1 70%,#aebedc)!important;box-shadow:inset 0 5px 10px rgba(17,38,84,.22),0 1px 0 rgba(255,255,255,.45)!important;display:grid!important;place-items:center!important;overflow:visible!important;padding:0!important}
.connect-token,.mp-connect .mp-connect-token{display:block;width:78%;height:78%;border-radius:50%;position:relative;font-size:0!important;box-shadow:inset 0 4px 8px rgba(255,255,255,.36),inset 0 -7px 12px rgba(79,20,53,.18),0 5px 9px rgba(10,18,44,.24);transform-origin:center}
.connect-token.berry,.mp-connect-token.berry{background:radial-gradient(circle at 32% 25%,#ffb2c4 0 10%,#f34f78 26%,#c52354 72%,#831e45 100%)}
.connect-token.berry::after,.mp-connect-token.berry::after{content:"";position:absolute;width:42%;height:25%;left:29%;top:-7%;background:linear-gradient(145deg,#9bd570,#3f8750);clip-path:polygon(50% 0,62% 32%,100% 18%,75% 53%,97% 79%,62% 70%,50% 100%,38% 70%,3% 79%,25% 53%,0 18%,38% 32%);filter:drop-shadow(0 2px 2px rgba(35,83,42,.25))}
.connect-token.star,.mp-connect-token.star{background:radial-gradient(circle at 32% 24%,#fff7be 0 10%,#ffd365 28%,#e1a52c 70%,#ae7420 100%)}
.connect-token.star::after,.mp-connect-token.star::after{content:"★";position:absolute;inset:0;display:grid;place-items:center;font-size:clamp(13px,5vw,25px);color:#fff6bf;text-shadow:0 2px 3px rgba(117,75,12,.32)}
.connect-token.dropping,.mp-connect-token.dropping{animation:bhConnectDrop .50s cubic-bezier(.18,.74,.28,1.14) both!important}
.connect-board.win .connect-token,.mp-connect.win .mp-connect-token{animation:bhConnectWin .7s ease-in-out infinite alternate}
@keyframes bhConnectDrop{0%{transform:translateY(calc(-1 * var(--drop-distance,280px))) scale(.86);filter:brightness(1.15)}72%{transform:translateY(5px) scale(1.05)}100%{transform:none}}
@keyframes bhConnectWin{from{transform:scale(.92);filter:brightness(1)}to{transform:scale(1.08);filter:brightness(1.24) drop-shadow(0 0 9px rgba(255,225,132,.6))}}
/* Colour Studio: art desk framing and paint-chip palette. */
#gameColour .colour-wrap{border:1px solid rgba(183,117,212,.22)!important;background:linear-gradient(145deg,#fffafd,#f7efff)!important;border-radius:25px!important;box-shadow:0 14px 30px rgba(104,62,134,.12)!important;padding:14px!important}
#gameColour .colour-grid{padding:8px!important;border-radius:20px!important;background:linear-gradient(145deg,#fff,#f3e9fa)!important;box-shadow:inset 0 1px 0 #fff,0 9px 20px rgba(95,53,122,.1)!important}
#gameColour .colour-palette button{border:3px solid rgba(255,255,255,.75)!important;box-shadow:0 5px 10px rgba(69,32,81,.16)!important}
/* Farm: cozy green/soil board and toy-like controls. */
#gameFarm .farm-shell{background:linear-gradient(160deg,#eef4df,#f6e4bd)!important;border:1px solid rgba(104,126,72,.22)!important;border-radius:27px!important;box-shadow:0 15px 34px rgba(80,91,47,.15)!important}
#gameFarm .farm-map{background:linear-gradient(145deg,#a8c582,#769d69)!important;border:4px solid #6f814c!important;border-radius:22px!important;box-shadow:inset 0 5px 14px rgba(53,76,43,.18),0 10px 22px rgba(62,75,40,.16)!important}
#gameFarm .farm-dpad button,#gameFarm .farm-action-card{background:linear-gradient(145deg,#fffaf0,#f1ddb4)!important;border-color:rgba(132,102,54,.18)!important;box-shadow:0 7px 15px rgba(90,70,36,.13)!important}
/* Together lobby uses game art as actual card atmosphere. */
.mp-game-card{position:relative;overflow:hidden!important;isolation:isolate;background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(248,235,244,.88))!important;border:1px solid rgba(196,111,153,.2)!important;box-shadow:0 10px 24px rgba(75,30,62,.11)!important}
.mp-game-card::before{content:"";position:absolute;inset:0;z-index:-2;background-image:var(--mp-game-art);background-size:cover;background-position:center;opacity:.08;filter:saturate(1.15)}
.mp-game-card::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(255,250,253,.96) 0 58%,rgba(255,248,252,.7) 100%)}
.mp-game-icon-hd{width:70px!important;height:70px!important;border-radius:20px!important}
.mp-active-head{padding:12px!important;border-radius:20px!important;background:linear-gradient(145deg,rgba(255,255,255,.86),rgba(239,228,249,.8));border:1px solid rgba(125,95,196,.16)}
@media(max-width:430px){.connect-board,.mp-connect{padding:9px!important;gap:4px!important}.mp-game-icon-hd{width:61px!important;height:61px!important}.polished-game::after{width:190px;right:-58px;top:-34px}}
@media(prefers-reduced-motion:reduce){.connect-token.dropping,.mp-connect-token.dropping,.connect-board.win .connect-token,.mp-connect.win .mp-connect-token{animation:none!important}}
`;
 const s=document.createElement('style');s.id='berry436GameStyle';s.textContent=css;document.head.appendChild(s);
 function applyGameAtmosphere(){
   const solo={gamePairs:'pairs',gameWords:'words',gameFour:'four',gameColour:'colour',gameFarm:'farm',gameTogether:'connect'};
   Object.entries(solo).forEach(([pid,id])=>{const el=document.getElementById(pid),a=window.getBerryGameArt?.(id);if(el&&a)el.style.setProperty('--game-art',`url("${a.src}")`)});
   const mp={ttt:'ttt',connect:'connect',rps:'rps',rescue:'rescue',signal:'signal',trails:'trails'};
   Object.entries(mp).forEach(([mode,id])=>{const el=document.querySelector(`[data-mp-start="${mode}"]`),a=window.getBerryGameArt?.(id);if(el&&a)el.style.setProperty('--mp-game-art',`url("${a.src}")`)});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyGameAtmosphere);else applyGameAtmosphere();
 window.applyBerryGameAtmosphere=applyGameAtmosphere;
})();
