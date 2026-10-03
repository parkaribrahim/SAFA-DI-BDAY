const app=document.getElementById('app');
const toastEl=document.getElementById('toast');
let state={page:'password',entered:'',menuReturn:'menu'};

function stars(n=28){
  let s='<div class="stars">';
  for(let i=0;i<n;i++){
    const x=4+Math.random()*92,y=5+Math.random()*88,d=(Math.random()*2.5).toFixed(2);
    s+=`<span class="star ${i%3===0?'gold':''}" style="left:${x}%;top:${y}%;animation-delay:${d}s">${i%2?'✦':'★'}</span>`;
  }
  return s+'</div>';
}
function shell(content){return `<main class="stage"><div class="topline">IMAGINE someone sent you this on your birthday at 12am 😭🎂💌</div><div class="corner tl"></div><div class="corner tr"></div><div class="corner bl"></div><div class="corner br"></div>${stars()}<div class="content">${content}</div></main>`}
function render(){
  const p=pages[state.page]||pages.password;
  app.innerHTML=shell(p());
  bind();
}
function nav(go,extra=''){return `<button class="btn ${extra}" data-go="${go}">${go==='back'?'← Back':'Next →'}</button>`}
const pages={
  password(){return `<section class="page"><div class="pass-layout"><div class="illustration"><div class="frame-art"><div class="cute-scene">🧸🌼<br>🐶</div></div></div><div class="key-panel"><div class="pass-label">Enter a passcode</div><div class="dots">${[0,1,2,3].map(i=>`<div class="dot">${state.entered[i]?'●':''}</div>`).join('')}</div><div class="keypad">${['1','2','3','4','5','6','7','8','9','•','0','#'].map(k=>`<button class="key" data-key="${k}">${k}</button>`).join('')}</div></div></div></section>`},
  question(){return `<section class="page"><div class="question-wrap"><div class="dog">🐶💐</div><h1 class="title hand">Hey! I made something for you<br>do you wanna see it?</h1><div class="btnrow"><button class="btn" data-go="reveal">Yes</button><button class="btn light" data-go="nope">No</button></div></div></section>`},
  nope(){return `<section class="page"><div class="question-wrap"><div class="dog">🐶😤</div><h1 class="title hand">SURPRISE!!<br>How dare you hmph</h1><div class="btnrow"><button class="btn" data-go="reveal">Okay okay... I'll look ♡</button></div></div></section>`},
  reveal(){return `<section class="page"><div class="reveal-card"><div class="bday-letters"><span>H</span><span>A</span><span>P</span><span>P</span><span>Y</span></div><div class="bday-letters"><span>B</span><span>I</span><span>R</span><span>T</span><span>H</span><span>D</span><span>A</span><span>Y</span></div><div class="card-photo photo-placeholder">📷<span style="font-size:11px;position:absolute;bottom:6px">replace with your photo</span></div><div class="sub" style="margin:0 auto 12px">for ${escapeHtml(SITE.name)}</div><button class="btn" data-go="memories">Open ♡</button></div></section>`},
  memories(){return `<section class="page"><div class="memory-shell"><div class="memory-head"><div class="memory-title hand">Memories</div><div class="memory-nav"><span class="active">Moments of us ♡</span><span>Images</span><span>Videos</span><span>Music</span><span>Letter</span><span>Memories</span></div></div><div class="photo-grid">${SITE.photos.map((p,i)=>`<div class="tile">${p.src?`<img src="${escapeAttr(p.src)}" alt="${escapeAttr(p.label)}">`:`<div class="fake-photo">${['🌷','📸','✨','🫶','🎀','🌙'][i]}</div>`}<small>${escapeHtml(p.label)}</small></div>`).join('')}</div></div><div class="nav-bottom"><button class="btn light" data-go="menu">Surprises</button><button class="btn" data-go="menu">Next →</button></div></section>`},
  menu(){return `<section class="page"><h1 class="title hand menu-title">click on each item to open</h1><div class="objects"><button class="object" data-go="memories"><span class="camera"></span><span class="object-label">photos</span></button><button class="object" data-go="letter"><span class="envelope"></span><span class="object-label">letter</span></button><button class="object" data-go="media"><span class="cassette"></span><span class="object-label">music</span></button></div><div class="btnrow"><button class="btn light" data-go="wishes">Skip to wishes →</button></div></section>`},
  letter(){return `<section class="page"><h1 class="title hand" style="font-size:48px;margin-bottom:10px">${escapeHtml(SITE.letterTitle)}</h1><div class="letter-page">${SITE.letter.split('\n').map(x=>`<p>${x?escapeHtml(x):'&nbsp;'}</p>`).join('')}</div><div class="nav-bottom"><button class="btn light" data-go="menu">← Back</button><button class="btn" data-go="media">Next →</button></div></section>`},
  media(){return `<section class="page"><div class="media-card"><div class="cassette-big"><span class="reel left"></span><span class="reel right"></span></div>${SITE.musicUrl?`<div class="audio-wrap"><audio controls src="${escapeAttr(SITE.musicUrl)}"></audio></div>`:`<h2 class="hand" style="margin:0;color:#6f5a9f;font-size:30px">your little birthday mixtape ♡</h2><p class="sub" style="font-size:15px">Add your music URL in <b>config.js</b> to make this player real.</p>`}</div><div class="nav-bottom"><button class="btn light" data-go="menu">← Back</button><button class="btn" data-go="video">Video →</button></div></section>`},
  video(){return `<section class="page"><h1 class="title hand" style="font-size:52px;margin-bottom:15px">a little something for you ♡</h1>${SITE.videoUrl?`<div class="video-box"><iframe src="${escapeAttr(SITE.videoUrl)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`:`<div class="video-box"><div class="video-placeholder"><div class="play">▶</div><strong>YOUR BIRTHDAY VIDEO</strong><br><small>Add a YouTube/Vimeo embed URL in config.js</small></div></div>`}<div class="nav-bottom"><button class="btn light" data-go="menu">← Back</button><button class="btn" data-go="wishes">Next →</button></div></section>`},
  wishes(){return `<section class="page"><div class="wishes"><div class="wishes-dog">🐶</div><h1 class="title hand">May all the good<br>things you've</h1><div class="arrow" data-go="final">›</div><p class="sub">${escapeHtml(SITE.wishes)}</p></div></section>`},
  final(){return `<section class="page"><div class="hug">🧑🏻‍🤝‍🧑🏻</div><h1 class="title hand final-title">Virtual hug loading...</h1><p class="sub">here, have the biggest birthday hug ♡</p><div class="btnrow"><button class="btn" data-go="password">Replay ♡</button></div></section>`}
};
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function escapeAttr(s){return escapeHtml(s)}
function bind(){
 document.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>{state.page=el.dataset.go;state.entered='';render();}));
 document.querySelectorAll('[data-key]').forEach(el=>el.addEventListener('click',()=>{
   const k=el.dataset.key;
   if(k==='•'){state.entered='';render();return}
   if(k==='#'){
     if(state.entered===SITE.password){state.page='question';state.entered='';render();}
     else {showToast('Not quite ♡ Demo password: 1234');}
     return;
   }
   if(state.entered.length<4){state.entered+=k;render();}
 }));
}
function showToast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toastEl.classList.remove('show'),2200)}
render();
