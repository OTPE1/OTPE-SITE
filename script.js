// Button ripple effect
document.addEventListener('click', (e)=>{
  const b = e.target.closest('.btn');
  if(!b) return;
  const r = document.createElement('span');
  const rect = b.getBoundingClientRect();
  const d = Math.max(rect.width, rect.height);
  r.className = 'rip';
  r.style.width = r.style.height = d + 'px';
  r.style.left = (e.clientX - rect.left - d/2) + 'px';
  r.style.top  = (e.clientY - rect.top  - d/2) + 'px';
  b.appendChild(r);
  setTimeout(()=>r.remove(), 600);
});

// Hard-refresh helper hint if CSS didn’t load (cache)
window.addEventListener('load', ()=>{
  const hero = document.querySelector('.hero');
  if (!hero || getComputedStyle(hero).backgroundImage === 'none') {
    console.log('If styles look plain, do a hard refresh: iPhone Safari → tap reload (⟳) then long-press → "Reload Without Content Blockers".');
  }
});
