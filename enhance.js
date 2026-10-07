(()=>{
  const title=document.querySelector('.topbar-title');const sub=document.querySelector('.topbar-sub');const icon=document.querySelector('.topbar-icon');
  if(title)title.textContent='Floor Plan Tool';if(sub)sub.textContent='Latino Built · Pro Source';if(icon){icon.textContent='LB';icon.setAttribute('aria-label','Latino Built');}
  const right=document.querySelector('.topbar-right');
  if(right&&!document.getElementById('lb-save-state')){const s=document.createElement('span');s.id='lb-save-state';s.className='lb-save-state';s.textContent='Saved on this device';right.prepend(s);}
  const area=document.getElementById('canvasArea');
  if(area&&!document.getElementById('lb-start-tip')){const tip=document.createElement('div');tip.id='lb-start-tip';tip.className='lb-start-tip';tip.innerHTML='<button aria-label="Dismiss">×</button><strong>Start with the room</strong>Tap <b>+ Room</b>, enter the dimensions, place doors or equipment, then Export when you are done.';tip.querySelector('button').onclick=()=>{tip.remove();try{localStorage.setItem('lb-floor-tip','1')}catch(e){}};let dismissed=false;try{dismissed=!!localStorage.getItem('lb-floor-tip')}catch(e){}if(!dismissed)area.appendChild(tip);}
  const KEY='latino-built-floor-plan-v2';let saveTimer;
  function save(){try{const project=document.getElementById('proj-input')?.value||'';localStorage.setItem(KEY,JSON.stringify({floors,curFloor,view,project,savedAt:Date.now()}));const s=document.getElementById('lb-save-state');if(s){s.textContent='Saved';setTimeout(()=>s.textContent='Saved on this device',1200)}}catch(e){const s=document.getElementById('lb-save-state');if(s)s.textContent='Unable to save on this device';}}
  function restore(){try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(!saved||!Array.isArray(saved.floors)||!saved.floors.length)return;floors=saved.floors;curFloor=Math.max(0,Math.min(saved.curFloor||0,floors.length-1));if(saved.view)view=saved.view;const p=document.getElementById('proj-input');if(p)p.value=saved.project||'';selected=null;render();updateRoomList();}catch(e){}}
  restore();
  const queue=()=>{clearTimeout(saveTimer);saveTimer=setTimeout(save,250)};
  ['pointerup','mouseup','touchend','change','input','click','keyup'].forEach(ev=>document.addEventListener(ev,queue,true));window.addEventListener('beforeunload',save);
})();
