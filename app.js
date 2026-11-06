const $=s=>document.querySelector(s),pg=document.body.dataset.p,j=u=>fetch(u).then(r=>r.json()).catch(()=>({})),qs=k=>new URLSearchParams(location.search).get(k);
const u=s=>s?s.replace(/^\/+/,''):'',set=(i,h)=>{const e=$(i);if(e)e.innerHTML=h},sg=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-'),num=s=>+String(s||'').replace(/\D/g,'');
const im=(s,c='')=>s?`<img class="${c}" src="${u(s)}" alt="" loading="lazy">`:`<div class="ph ${c}">Photo</div>`;
const nav=s=>s.length>1?'<button class="pv" aria-label="Previous">&lsaquo;</button><button class="nx" aria-label="Next">&rsaquo;</button>':'';
const dots=s=>`<div class="dt">${s.map(()=>'<i></i>').join('')}</div>`;
const sl=(el,auto)=>{if(!el)return;const s=[...el.querySelectorAll('.sl')],d=[...el.querySelectorAll('.dt i,.tb>*')];let i=0;const g=n=>{i=(n+s.length)%s.length;s.forEach((x,k)=>x.classList.toggle('on',k===i));d.forEach((x,k)=>x.classList.toggle('on',k===i))};d.forEach((x,k)=>x.onclick=()=>g(k));const p=el.querySelector('.pv'),n=el.querySelector('.nx');if(p)p.onclick=()=>g(i-1);if(n)n.onclick=()=>g(i+1);g(0);if(auto&&s.length>1)setInterval(()=>g(i+1),5500)};
const lb=(L,i)=>{const d=document.createElement('div');d.className='lb';let x0=0;const r=()=>d.innerHTML=`<button class="x" aria-label="Close">&times;</button><button class="pv">&lsaquo;</button><img src="${u(L[i])}" alt=""><button class="nx">&rsaquo;</button>`,go=n=>{i=(i+n+L.length)%L.length;r()},k=e=>{if(e.key==='Escape')q();if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)},q=()=>{d.remove();removeEventListener('keydown',k)};
d.onclick=e=>{const c=e.target.classList;if(c.contains('pv'))go(-1);else if(c.contains('nx'))go(1);else if(e.target===d||c.contains('x'))q()};d.ontouchstart=e=>x0=e.touches[0].clientX;d.ontouchend=e=>{const m=e.changedTouches[0].clientX-x0;if(Math.abs(m)>50)go(m>0?-1:1)};addEventListener('keydown',k);r();document.body.appendChild(d)};
(async()=>{
const [s,h,p,rm,b]=await Promise.all(['settings','home','pages','rooms','builder'].map(n=>j(`data/${n}.json`)));
const R=rm.items||[],c=s.currency||'',rs=document.documentElement.style,H=document.head,st=s.site_title||s.name||'';
[['bg','--bg'],['ink','--ink'],['accent','--ac']].forEach(([k,v])=>s[k]&&rs.setProperty(v,s[k]));
document.title=(document.body.dataset.t?document.body.dataset.t+' | ':'')+st;
if(s.site_desc){const m=document.createElement('meta');m.name='description';m.content=s.site_desc;H.appendChild(m)}
if(s.favicon){const l=document.createElement('link');l.rel='icon';l.href=u(s.favicon);H.appendChild(l)}
const lg=s.logo_image?`<img class="lgi" src="${u(s.logo_image)}" alt="${s.logo_text||''}">`:(s.logo_text||s.name||'');
const L=[['index.html','Home','home'],['rooms.html','Rooms','rooms'],['amenities.html','Amenities','amen'],['gallery.html','Gallery','gal'],['events.html','Events','ev'],['contact.html','Contact','con']];
const hd=$('#h');hd.className=pg==='home'?'tr':'sd';if(pg==='home'){const f=()=>hd.classList.toggle('sd',scrollY>50);f();addEventListener('scroll',f)}
hd.innerHTML=`<div class="w bar"><a class="logo" href="index.html">${lg}</a><nav>${L.map(l=>`<a href="${l[0]}"${pg===l[2]||(pg==='room'&&l[2]==='rooms')?' class="on"':''}>${l[1]}</a>`).join('')}<a class="bt" href="booking.html">Book now</a></nav><button class="mb" aria-label="Menu" onclick="document.querySelector('header').classList.toggle('open')"><i></i><i></i><i></i></button></div>`;
const so=[['instagram','Instagram'],['facebook','Facebook'],['tiktok','TikTok'],['x','X']].filter(x=>s[x[0]]).map(x=>`<a href="${s[x[0]]}" target="_blank" rel="noopener">${x[1]}</a>`).join('<br>');
$('#f').innerHTML=`<div class="w"><div class="fg"><div><div class="logo">${lg}</div><p style="margin-top:12px;max-width:22em">${s.tagline||''}</p></div><div><h4>Visit</h4><p>${s.address||''}<br>${s.city||''}</p><p style="margin-top:8px">${s.hours||''}</p></div><div><h4>Contact</h4><p><a href="tel:${s.phone}">${s.phone||''}</a><br><a href="mailto:${s.email}">${s.email||''}</a></p></div><div><h4>Explore</h4><p><a href="about.html">About</a><br><a href="booking.html">Booking</a><br>${so}</p></div></div><div class="cr">&copy; ${new Date().getFullYear()} ${s.name||''}. <a href="built-by.html">Designed by Allan Aminu</a></div></div>`;
document.body.insertAdjacentHTML('beforeend',`<div class="fab"><a class="bt" href="booking.html">Book now</a><a class="bt o" href="https://wa.me/${s.whatsapp}">WhatsApp</a></div>`);
const rc=x=>`<a class="cd" href="room.html?r=${sg(x.name)}"><div class="ci">${im((x.gallery||[])[0])}</div><p class="cl">${x.class||''}</p><h3>${x.name}</h3><p class="pr">${c}${x.price||''} <small>${x.price_note||''}</small></p><p class="mt">${[x.guests&&x.guests+' guests',x.beds,x.size].filter(Boolean).join(' \u00b7 ')}</p></a>`;
const am=a=>(a||[]).map(x=>`<div><h3>${x.title}</h3><p>${x.text||''}</p></div>`).join('');
const T={rooms:[p.rooms_title,p.rooms_text],amen:[p.amen_title,p.amen_text],gal:[p.gallery_title,p.gallery_text],ev:[p.events_title,p.events_text],bk:[p.booking_title,p.booking_text],ab:[p.about_title,p.about_text],con:[p.contact_title,p.contact_text]};
if(T[pg]){set('#t1',T[pg][0]||'');set('#t2',T[pg][1]||'')}
if(pg==='home'){const S=h.slides||[];
set('#hero',S.map(x=>`<div class="sl">${x.image?im(x.image):''}<div class="tx"><div class="h1">${x.title||''}</div><p>${x.text||''}</p><a class="bt" href="${x.link||'rooms.html'}">${x.button||'View rooms'}</a></div></div>`).join('')+nav(S)+dots(S)+`<div class="bkw"><form class="w bk" id="bk"><label>Check in<input type="date" name="i"></label><label>Check out<input type="date" name="o"></label><label>Guests<select name="g">${[1,2,3,4,5,6].map(n=>`<option>${n}</option>`).join('')}</select></label><button class="bt">Check availability</button></form></div>`);sl($('#hero'),1);
const f=$('#bk');f.i.min=new Date().toISOString().slice(0,10);f.onsubmit=e=>{e.preventDefault();location.href=`booking.html?i=${f.i.value}&o=${f.o.value}&g=${f.g.value}`};
set('#intro',`<h2>${h.intro_title||''}</h2><p>${h.intro_text||''}</p>`);set('#rt',h.rooms_title||'');set('#rl',R.slice(0,3).map(rc).join(''));
set('#at',h.amenities_title||'');set('#al',am((p.amenities||[]).slice(0,6)));
set('#ot',h.offers_title||'');set('#ol',(h.offers||[]).map(x=>`<div><h3>${x.title}</h3><p>${x.text||''}</p><a class="lk" href="booking.html">Book this offer</a></div>`).join(''));
const yt=String(h.video_url||'').match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);$('#vdw').hidden=!yt;if(yt)set('#vdw',`<h2>${h.video_title||''}</h2><div class="vid"><iframe src="https://www.youtube.com/embed/${yt[1]}" allowfullscreen loading="lazy"></iframe></div>`);
set('#tt',h.tm_title||'');set('#ts',(h.testimonials||[]).map(x=>`<div class="sl"><blockquote>${x.quote}</blockquote><cite>${x.name}</cite></div>`).join('')+dots(h.testimonials||[]));sl($('#ts'),1);
set('#ft',h.faq_title||'');set('#fq',(h.faq||[]).map(x=>`<details><summary>${x.q}</summary><p>${x.a}</p></details>`).join(''));
$('#mp').src='https://maps.google.com/maps?q='+encodeURIComponent(s.map_query||((s.address||'')+' '+(s.city||'')))+'&output=embed';
set('#cta',`<h2>${h.cta_title||''}</h2><p>${h.cta_text||''}</p><a class="bt" href="booking.html">${h.cta_button||'Book now'}</a>`)}
if(pg==='rooms')set('#rl',R.map(rc).join(''));
if(pg==='amen')set('#al',am(p.amenities));
if(pg==='room'){const x=R.find(r=>sg(r.name)===qs('r'))||R[0];if(x){const g=x.gallery||[];
set('#g',`<div class="gal">${(g.length?g:['']).map(y=>`<div class="sl">${im(y)}</div>`).join('')+nav(g)}</div>${g.length>1?`<div class="tb">${g.map(y=>im(y)).join('')}</div>`:''}`);sl($('#g'));
set('#pi',`<p class="cl">${x.class||''}</p><h1 style="font-size:2.3rem">${x.name}</h1><p class="pr big">${c}${x.price||''} <small>${x.price_note||''}</small></p><p class="mt">${[x.guests&&x.guests+' guests',x.beds,x.size].filter(Boolean).join(' \u00b7 ')}</p><p class="ds">${x.description||''}</p>${(x.amenities||[]).length?`<ul class="ft">${x.amenities.map(a=>`<li>${a}</li>`).join('')}</ul>`:''}<div class="row"><a class="bt" href="booking.html?room=${sg(x.name)}">Book this room</a><a class="bt o" href="https://wa.me/${s.whatsapp}?text=${encodeURIComponent('Enquiry about '+x.name)}">WhatsApp</a></div>`);document.title=x.name+' | '+st}}
if(pg==='gal'){const G=p.gallery||[];set('#gt',['All',...new Set(G.map(x=>x.category).filter(Boolean))].map((x,k)=>`<button data-c="${x}"${k?'':' class="on"'}>${x}</button>`).join(''));
const r=k=>{const a=G.filter(x=>k==='All'||x.category===k),w=a.filter(x=>x.image).map(x=>x.image);set('#gg',a.map(x=>`<div class="gi" data-k="${x.image||''}">${im(x.image)}</div>`).join(''));$('#gg').onclick=e=>{const t=e.target.closest('.gi');if(t&&t.dataset.k)lb(w,w.indexOf(t.dataset.k))}};
$('#gt').onclick=e=>{if(e.target.dataset.c){[...$('#gt').children].forEach(b=>b.classList.toggle('on',b===e.target));r(e.target.dataset.c)}};r('All')}
if(pg==='ev')set('#hl',(p.halls||[]).map(x=>`<div class="cd">${'<div class="ci">'+im(x.image)+'</div>'}<h3>${x.name}</h3><p class="cl">${x.capacity||''}</p><p class="mu">${x.description||''}</p><a class="lk" href="https://wa.me/${s.whatsapp}?text=${encodeURIComponent('Event enquiry: '+x.name)}">Enquire on WhatsApp</a></div>`).join(''));
if(pg==='bk'){const f=$('#fm');f.room.innerHTML=R.map(x=>`<option value="${sg(x.name)}">${x.name} (${c}${x.price} ${x.price_note||''})</option>`).join('');
['room','i','o','g'].forEach(k=>qs(k)&&(f[k].value=qs(k)));
const calc=()=>{const x=R.find(r=>sg(r.name)===f.room.value),n=Math.round((new Date(f.o.value)-new Date(f.i.value))/864e5);let t='';if(n>0){t=n+' night'+(n>1?'s':'');if(x&&/night/i.test(x.price_note||''))t+=', estimated total '+c+(n*num(x.price)).toLocaleString()}set('#est',t);return t};
const m=()=>['Booking request','Room: '+f.room.selectedOptions[0].text,'Dates: '+f.i.value+' to '+f.o.value,calc(),'Guests: '+f.g.value,'Name: '+f.nm.value,'Phone: '+f.ph.value,f.msg.value].filter(Boolean).join('\n');
f.oninput=calc;calc();f.onsubmit=e=>{e.preventDefault();location.href=`mailto:${s.email}?subject=${encodeURIComponent('Booking request')}&body=${encodeURIComponent(m())}`};$('#wa').onclick=()=>open(`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(m())}`)}
if(pg==='ab')set('#ab',`<div>${im(p.about_image)}</div><div>${(p.values||[]).map(x=>`<div class="val"><h3>${x.title}</h3><p>${x.text||''}</p></div>`).join('')}</div>`);
if(pg==='con'){const f=$('#fm'),t=()=>['Enquiry','Name: '+f.nm.value,'Phone: '+f.ph.value,f.msg.value].join('\n');
f.onsubmit=e=>{e.preventDefault();location.href=`mailto:${s.email}?subject=${encodeURIComponent('Enquiry')}&body=${encodeURIComponent(t())}`};$('#wa').onclick=()=>open(`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(t())}`);
set('#ci',`<p><b>Phone</b><a href="tel:${s.phone}">${s.phone||''}</a></p><p><b>Email</b>${s.email||''}</p><p><b>Address</b>${s.address||''}, ${s.city||''}</p><p><b>Hours</b>${s.hours||''}</p>`)}
if(pg==='by'){set('#bh',b.headline||'');set('#ba',b.about||'');set('#bs',(b.services||[]).map(x=>`<div class="val"><h3>${x.title}</h3><p>${x.description||''}</p></div>`).join(''));set('#bc',`<a class="bt" href="mailto:${b.email}">Email Allan</a><a class="bt o" href="tel:${b.phone}">Call ${b.phone}</a><a class="bt o" href="https://wa.me/${b.whatsapp}">WhatsApp</a>`)}
})();
