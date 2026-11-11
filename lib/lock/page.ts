// OWNED BY: shared — page 404 « site verrouillé » servie par middleware.ts.
// HTML autonome (CSS + JS inline) : aucune ressource du site n'est chargée,
// donc rien ne fuit (pas de Nav, pas d'images, pas de Supabase).

export const LOCK_PAGE_HTML = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>404 — Page not found</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Montserrat:wght@500;600&family=Lato:wght@400;700&display=swap" rel="stylesheet">
<style>
  :root{
    --cream:#FBF7F0; --beige:#E8DCC8; --brown:#573425; --brown-dark:#642F19;
    --gold:#C9962C; --gold-text:#8a6d1f; --pink:#F6828F; --crimson:#B84C65; --blush:#E9C8C9;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%}
  body{
    background:
      radial-gradient(1200px 600px at 85% -10%, rgba(246,130,143,.16), transparent 60%),
      radial-gradient(900px 500px at -10% 110%, rgba(201,150,44,.14), transparent 60%),
      var(--cream);
    color:var(--brown); font-family:Lato,system-ui,sans-serif;
    overflow:hidden; -webkit-font-smoothing:antialiased;
  }
  body::after{ /* grain */
    content:""; position:fixed; inset:0; pointer-events:none; opacity:.35; mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.34 0 0 0 0 0.2 0 0 0 0 0.14 0 0 0 .08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  }
  main{position:relative; min-height:100svh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:48px 16px 120px; text-align:center}
  .eyebrow{font-family:Montserrat,sans-serif; font-weight:600; font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold-text)}
  .eyebrow .rule{display:inline-block; width:28px; height:1px; background:var(--gold); vertical-align:middle; margin:0 12px}
  .code{font-family:"Playfair Display",Georgia,serif; font-weight:500; font-size:clamp(108px,24vw,240px); line-height:1; display:flex; align-items:center; gap:.04em; margin:12px 0 clamp(20px,4vw,40px); user-select:none; cursor:default; color:var(--brown-dark)}
  .ring{width:.7em; height:.86em; position:relative; display:inline-block}
  .ring svg{width:100%; height:100%; overflow:visible}
  .ring .orbit{transform-origin:50% 50%; animation:spin 9s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  h1{font-family:"Playfair Display",Georgia,serif; font-weight:500; font-size:clamp(28px,4.6vw,46px); line-height:1.15; max-width:20ch}
  h1 em{color:var(--crimson)}
  .lede{margin-top:16px; max-width:40ch; font-size:17px; line-height:1.6; color:rgba(87,52,37,.75)}
  .stage{position:relative; margin-top:40px; height:64px; width:100%; display:flex; justify-content:center}
  #flee{
    position:relative; z-index:5; border:0; cursor:pointer; white-space:nowrap;
    font:600 13px/1 Montserrat,sans-serif; letter-spacing:.14em; text-transform:uppercase;
    color:var(--cream); background:var(--brown); padding:20px 34px; border-radius:999px;
    box-shadow:0 10px 30px -12px rgba(87,52,37,.55);
    transition:transform .45s cubic-bezier(.22,1.4,.36,1), background .3s, box-shadow .3s;
  }
  #flee:hover{background:var(--brown-dark)}
  #flee:focus-visible{outline:2px solid var(--gold); outline-offset:4px}
  #flee.loose{position:fixed; left:0; top:0}
  #flee.tired{background:var(--crimson)}
  .quip{margin-top:20px; min-height:24px; font-family:"Playfair Display",Georgia,serif; font-style:italic; font-size:17px; color:var(--crimson); transition:opacity .25s}
  /* chargement infini */
  #loader{display:none; flex-direction:column; align-items:center; margin-top:48px; width:min(420px,100%)}
  #loader.on{display:flex}
  .bar{position:relative; width:100%; height:6px; border-radius:999px; background:var(--beige); overflow:hidden}
  .bar i{position:absolute; inset:0 auto 0 0; width:0; border-radius:inherit; background:linear-gradient(90deg,var(--gold),var(--pink),var(--crimson)); transition:width .3s linear}
  .bar i::after{content:""; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent); animation:sheen 1.6s ease-in-out infinite}
  @keyframes sheen{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
  .pct{margin-top:14px; font:600 12px/1 Montserrat,sans-serif; letter-spacing:.2em; color:var(--gold-text); font-variant-numeric:tabular-nums}
  .msg{margin-top:12px; min-height:26px; font-size:16px; color:rgba(87,52,37,.8); transition:opacity .3s}
  #cancel{margin-top:22px; background:none; border:0; font:600 11px Montserrat,sans-serif; letter-spacing:.2em; text-transform:uppercase; color:var(--gold-text); text-decoration:underline; text-underline-offset:4px; cursor:pointer}
  #cancel:focus-visible{outline:2px solid var(--gold); outline-offset:4px}
  /* accès privé */
  #key{display:none; margin-top:28px; gap:8px}
  #key.on{display:flex}
  #key input{width:180px; padding:12px 16px; border:1px solid var(--beige); border-radius:999px; background:#fff; font:15px Lato,sans-serif; color:var(--brown); text-align:center; letter-spacing:.2em}
  #key input:focus{outline:2px solid var(--gold); outline-offset:2px}
  #key button{padding:12px 18px; border:0; border-radius:999px; background:var(--brown); color:var(--cream); font:600 11px Montserrat,sans-serif; letter-spacing:.18em; text-transform:uppercase; cursor:pointer}
  .shake{animation:shake .4s}
  @keyframes shake{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
  footer{position:fixed; bottom:20px; left:0; right:0; text-align:center; font:500 10px Montserrat,sans-serif; letter-spacing:.24em; text-transform:uppercase; color:rgba(87,52,37,.4)}
  .sr{position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0)}
  @media (prefers-reduced-motion:reduce){
    .ring .orbit,.bar i::after{animation:none}
    #flee{transition:none}
  }
</style>
</head>
<body>
<main>
  <p class="eyebrow"><span class="rule"></span>Error<span class="rule"></span></p>
  <div class="code" id="code" aria-label="404">
    <span aria-hidden="true">4</span>
    <span class="ring" aria-hidden="true">
      <svg viewBox="0 0 70 86">
        <ellipse cx="35" cy="43" rx="27" ry="35" fill="none" stroke="currentColor" stroke-width="7"/>
        <g class="orbit"><circle cx="35" cy="5" r="5.5" fill="#C9962C"/></g>
      </svg>
    </span>
    <span aria-hidden="true">4</span>
  </div>
  <h1>This page <em>wandered off.</em></h1>
  <p class="lede">We looked everywhere. Under the couch, behind the server, in the other tab. Nothing.</p>

  <div class="stage" id="stage"><button id="flee" type="button">Take me home</button></div>
  <p class="quip" id="quip" aria-live="polite"></p>

  <div id="loader" role="status" aria-live="polite">
    <div class="bar"><i id="fill"></i></div>
    <p class="pct" id="pct">0%</p>
    <p class="msg" id="msg">Finding your way home…</p>
    <button id="cancel" type="button">Cancel</button>
  </div>

  <form id="key" method="post" action="/__unlock" autocomplete="off">
    <label class="sr" for="k">Access code</label>
    <input id="k" name="code" type="password" inputmode="text" autocomplete="off" spellcheck="false">
    <button type="submit">Enter</button>
  </form>
</main>
<footer>Error 404 · Not found</footer>

<script>
(function(){
  var btn=document.getElementById('flee'), quip=document.getElementById('quip');
  var loader=document.getElementById('loader'), fill=document.getElementById('fill');
  var pct=document.getElementById('pct'), msg=document.getElementById('msg');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dodges=0, MAX=9, tired=false, busy=false;
  var quips=['Nope.','Too slow.','Almost!','Not today.','I\\'m very fast.','Have you tried the other side?','Okay that one was close.','I\\'m getting tired…','Fine. You win.'];

  function say(t){ quip.style.opacity=0; setTimeout(function(){quip.textContent=t; quip.style.opacity=1},120) }

  function dodge(px,py){
    if(tired||busy) return;
    busy=true; setTimeout(function(){busy=false}, reduce?60:220);
    var r=btn.getBoundingClientRect(), W=innerWidth, H=innerHeight, m=24;
    if(!btn.classList.contains('loose')){
      btn.classList.add('loose');
      btn.style.transition='none';
      btn.style.transform='translate('+r.left+'px,'+r.top+'px)';
      btn.offsetWidth; btn.style.transition='';
    }
    var best=null, bestD=-1;
    for(var i=0;i<14;i++){
      var x=m+Math.random()*(W-r.width-2*m), y=m+Math.random()*(H-r.height-2*m);
      var d=Math.hypot(x+r.width/2-px, y+r.height/2-py);
      if(d>bestD){bestD=d; best=[x,y]}
    }
    btn.style.transform='translate('+best[0]+'px,'+best[1]+'px) rotate('+(Math.random()*16-8)+'deg)';
    dodges++; say(quips[Math.min(dodges-1,quips.length-1)]);
    if(dodges>=MAX){ tired=true; btn.classList.add('tired'); btn.textContent='Okay, take me home';
      var t=btn.style.transform.replace(/rotate\\([^)]*\\)/,'rotate(0deg)'); btn.style.transform=t; }
  }

  document.addEventListener('pointermove',function(e){
    if(tired||e.pointerType==='touch') return;
    var r=btn.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2;
    var dx=Math.max(Math.abs(e.clientX-cx)-r.width/2,0), dy=Math.max(Math.abs(e.clientY-cy)-r.height/2,0);
    if(Math.hypot(dx,dy)<70) dodge(e.clientX,e.clientY);
  });
  btn.addEventListener('pointerdown',function(e){ if(!tired){ e.preventDefault(); dodge(e.clientX,e.clientY) } });
  btn.addEventListener('keydown',function(e){ if(!tired && (e.key==='Enter'||e.key===' ')){ e.preventDefault(); var r=btn.getBoundingClientRect(); dodge(r.left+r.width/2,r.top+r.height/2) } });
  btn.addEventListener('click',function(e){ if(!tired){ e.preventDefault(); return } start() });

  // Chargement qui ne finit jamais : tend vers 100 % sans jamais l'atteindre.
  var lines=['Finding your way home…','Asking the server nicely…','Checking under the couch…','Reticulating splines…','Following the breadcrumbs…','The breadcrumbs were eaten.','Almost there…','Seriously, almost there.','Just a few more pixels…','Polishing the last percent…','Any second now…','Still any second now.','Have you tried being patient?','We believe in you.','This is fine.'];
  function start(){
    btn.style.display='none'; document.getElementById('stage').style.display='none'; quip.style.display='none';
    loader.classList.add('on'); document.getElementById('cancel').focus();
    var t0=performance.now(), li=0;
    (function tick(){
      var s=(performance.now()-t0)/1000;
      var p=100-100*Math.exp(-s/6);
      var dec=s<20?0:s<45?1:s<90?2:s<180?3:4;
      var shown=Math.min(p,100-Math.pow(10,-dec));
      fill.style.width=shown+'%';
      pct.textContent=shown.toFixed(dec)+'%';
      requestAnimationFrame(tick);
    })();
    setInterval(function(){ li=(li+1)%lines.length; msg.style.opacity=0; setTimeout(function(){msg.textContent=lines[li]; msg.style.opacity=1},300) },3200);
  }
  var cancels=['Can\\'t cancel. We\\'re so close.','Cancelling… (just kidding)','No.','Cancel is also loading.'], ci=0;
  document.getElementById('cancel').addEventListener('click',function(){ this.textContent=cancels[ci++%cancels.length] });

  // Accès privé : touche le « 404 » cinq fois, ou tape « open sesame ».
  var key=document.getElementById('key'), taps=0, tt;
  function reveal(){ key.classList.add('on'); document.getElementById('k').focus() }
  document.getElementById('code').addEventListener('click',function(){ clearTimeout(tt); if(++taps>=5){reveal(); taps=0} tt=setTimeout(function(){taps=0},1500) });
  var buf='';
  document.addEventListener('keydown',function(e){ if(e.target.tagName==='INPUT'||e.key.length!==1) return; buf=(buf+e.key.toLowerCase()).slice(-11); if(buf==='open sesame') reveal() });
  if(location.search.indexOf('denied')>-1){ reveal(); key.classList.add('shake'); history.replaceState(null,'',location.pathname) }
})();
</script>
</body>
</html>`;
