<script>
// === OTPE UTIL JS ===
// Drop <script src="otpe.js"></script> before </body> on each crypto page.
// Optional init call is below.

(function(){
  // ---- Config: order of your onion pages
  const ORDER = ["crypto.html","crypto2.html","crypto3.html","crypto4.html","crypto5.html"];
  const LAST_CONFETTI_PAGE = "crypto4.html"; // pop confetti here

  // ---- Helpers
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  function pageName(){ return location.pathname.split('/').pop() || "index.html"; }
  function pct(i){ return Math.round(((i+1)/ORDER.length)*100); }
  function clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }

  // ---- Progress bar
  function injectProgress(){
    const i = Math.max(0, ORDER.indexOf(pageName()));
    if (i === -1) return;
    const bar = document.createElement('div');
    bar.className = 'otpe-progress'; bar.innerHTML = '<div></div>';
    const target = document.body.querySelector('main, .wrap, .otpe-wrap') || document.body;
    target.insertBefore(bar, target.firstChild);
    requestAnimationFrame(()=>{ bar.firstElementChild.style.width = pct(i)+'%'; });
    // Remember furthest progress
    const k='otpe_progress_idx';
    const prev = parseInt(localStorage.getItem(k)||'-1',10);
    if (i>prev) localStorage.setItem(k,String(i));
  }

  // ---- Footer nav (Home + layers)
  function injectFooter(){
    const foot = document.createElement('footer');
    foot.className = 'otpe-footer';
    const links = ORDER.map((fn,idx)=>{
      const label = `Layer ${idx+1}`;
      return `<a href="${fn}">${label}</a>`;
    }).join(' | ');
    foot.innerHTML = `
      <hr>
      <nav>
        <a href="index.html">🏠 Home</a> | ${links}
      </nav>
      <div style="font-size:.9em;color:var(--ink2)">Keep peeling, Tata. Each layer is progress 🌟</div>
    `;
    document.body.appendChild(foot);
  }

  // ---- Next / Back buttons & keyboard
  function wireNextBack(){
    const i = ORDER.indexOf(pageName());
    if (i === -1) return;
    const prev = ORDER[clamp(i-1,0,ORDER.length-1)];
    const next = ORDER[clamp(i+1,0,ORDER.length-1)];
    // Keyboard nav
    window.addEventListener('keydown', (e)=>{
      if (e.altKey||e.ctrlKey||e.metaKey) return;
      if (e.key === 'ArrowLeft') location.href = prev;
      if (e.key === 'ArrowRight') location.href = next;
    });
    // Add "Next" helper if none exists
    if (!$('.otpe-next')){
      const holder = document.createElement('div');
      holder.style.textAlign='center'; holder.style.marginTop='12px';
      const btn = document.createElement('a');
      btn.className='otpe-btn otpe-next primary'; btn.textContent = (i<ORDER.length-1)?'Peel to Next Layer →':'Open Gift Layer →';
      btn.href = (i<ORDER.length-1)? next : ORDER[ORDER.length-1];
      holder.appendChild(btn); document.body.appendChild(holder);
    }
  }

  // ---- Button ripple
  function enableRipples(){
    document.addEventListener('click', function(e){
      const b = e.target.closest('.otpe-btn, .btn, button, a');
      if (!b) return;
      const r = document.createElement('span');
      const rect = b.getBoundingClientRect();
      const d = Math.max(rect.width, rect.height);
      r.className='ripple';
      r.style.width = r.style.height = d+'px';
      r.style.left = (e.clientX - rect.left - d/2)+'px';
      r.style.top  = (e.clientY - rect.top  - d/2)+'px';
      b.appendChild(r);
      setTimeout(()=>r.remove(), 600);
    });
  }

  // ---- Confetti (minimal, no dependency)
  function confetti(){
    const N=80; const frag=document.createDocumentFragment();
    for(let i=0;i<N;i++){
      const s=document.createElement('i');
      const size = 4+Math.random()*6;
      s.style.position='fixed';
      s.style.left=(Math.random()*100)+'vw';
      s.style.top='-10px';
      s.style.width=size+'px';
      s.style.height=size+'px';
      s.style.background = ['#40e0d0','#f39c12','#0a84ff','#27ae60'][i%4];
      s.style.opacity = .9;
      s.style.transform = `rotate(${Math.random()*360}deg)`;
      s.style.pointerEvents='none';
      s.animate([
        { transform:`translateY(0) rotate(0deg)`, opacity:.9 },
        { transform:`translateY(${110+Math.random()*20}vh) rotate(${360+Math.random()*360}deg)`, opacity:0.9 }
      ], { duration: 2000+Math.random()*1200, easing:'ease-out', fill:'forwards' });
      setTimeout(()=>s.remove(), 3400);
      frag.appendChild(s);
    }
    document.body.appendChild(frag);
  }

  // ---- Dark mode toggle (optional)
  function injectThemeToggle(){
    const t = document.createElement('button');
    t.textContent='🌓'; t.title='Toggle theme';
    t.className='otpe-btn'; t.style.position='fixed'; t.style.right='12px'; t.style.bottom='12px'; t.style.zIndex='9999';
    t.addEventListener('click', ()=>{
      const dark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('otpe_dark', dark?'1':'0');
    });
    document.body.appendChild(t);
    if (localStorage.getItem('otpe_dark')==='1'){ document.documentElement.classList.add('dark'); }
  }

  // ---- Init on load
  window.addEventListener('DOMContentLoaded', ()=>{
    injectProgress();
    injectFooter();
    wireNextBack();
    enableRipples();
    injectThemeToggle();
    if (pageName() === LAST_CONFETTI_PAGE) confetti();
  });

})();
</script>
