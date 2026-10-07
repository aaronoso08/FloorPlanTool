(()=>{
  const title=document.querySelector('.topbar-title');const sub=document.querySelector('.topbar-sub');const icon=document.querySelector('.topbar-icon');
  if(title)title.textContent='Floor Plan Tool';if(sub)sub.textContent='Latino Built · Pro Source';if(icon){icon.textContent='LB';icon.setAttribute('aria-label','Latino Built');}
  const right=document.querySelector('.topbar-right');
  if(right&&!document.getElementById('lb-save-state')){const s=document.createElement('span');s.id='lb-save-state';s.className='lb-save-state';s.textContent='Saved on this device';right.prepend(s);}
  const search=document.getElementById('feature-search');
  if(search)search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();let matches=0;document.querySelectorAll('.left-bar details').forEach(group=>{const buttons=[...group.querySelectorAll('.lb-btn')];let count=0;buttons.forEach(button=>{const visible=!q||button.textContent.toLowerCase().includes(q);button.hidden=!visible;if(visible)count++});group.hidden=count===0;if(q&&count)group.open=true;matches+=count});document.getElementById('feature-empty').hidden=matches>0;});
  document.querySelectorAll('.zoom-btn').forEach((button,i)=>button.setAttribute('aria-label',['Zoom in','Zoom out','Fit plan to screen'][i]));
  const KEY='latino-built-floor-plan-v2';let saveTimer;
  function save(){try{const project=document.getElementById('proj-input')?.value||'';localStorage.setItem(KEY,JSON.stringify({floors,curFloor,view,project,savedAt:Date.now()}));const s=document.getElementById('lb-save-state');if(s){s.textContent='Saved';setTimeout(()=>s.textContent='Saved on this device',1200)}}catch(e){const s=document.getElementById('lb-save-state');if(s)s.textContent='Unable to save on this device';}}
  function restore(){try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(!saved||!Array.isArray(saved.floors)||!saved.floors.length)return;floors=saved.floors;curFloor=Math.max(0,Math.min(saved.curFloor||0,floors.length-1));if(saved.view)view=saved.view;const p=document.getElementById('proj-input');if(p)p.value=saved.project||'';selected=null;render();updateRoomList();}catch(e){}}
  restore();
  const queue=()=>{clearTimeout(saveTimer);saveTimer=setTimeout(save,250)};
  ['pointerup','mouseup','touchend','change','input','click','keyup'].forEach(ev=>document.addEventListener(ev,queue,true));window.addEventListener('beforeunload',save);
})();
