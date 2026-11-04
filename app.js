'use strict';
document.documentElement.classList.add('js');
const $ = selector => document.querySelector(selector);
let motionPaused = matchMedia('(prefers-reduced-motion: reduce)').matches;
function setMotion(paused) {
  motionPaused = paused; document.documentElement.classList.toggle('motion-paused',paused);
  $('#motion-toggle').textContent = paused ? 'Resume motion' : 'Pause motion';
  $('#motion-toggle').setAttribute('aria-pressed',String(paused));
  window.dispatchEvent(new CustomEvent('portfolio-motion',{detail:{paused}}));
}
setMotion(motionPaused);
$('#motion-toggle').addEventListener('click',()=>setMotion(!motionPaused));
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>setMotion(e.matches));
const reveal = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target);}}),{threshold:.07});
document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
const toggle = $('#menu-toggle'), mobileNav = $('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');toggle.textContent='☰';}
toggle.addEventListener('click',()=>{const open=mobileNav.hidden;mobileNav.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');toggle.textContent=open?'✕':'☰';});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
let ticking=false;
function progress(){const max=document.documentElement.scrollHeight-innerHeight;$('.reading-progress').style.width=`${max>0?scrollY/max*100:0}%`;ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(progress);}},{passive:true});progress();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;let count=0;
  document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('.project').forEach(p=>{p.hidden=filter!=='all'&&p.dataset.category!==filter;if(!p.hidden){count++;p.classList.add('visible');}});
  $('#filter-status').textContent=`Showing ${count} ${count===1?'project':'projects'}.`;
}));
const projects={
  achtari:{kind:'MOBILE / COMMUNITY APP',title:'AchTari',description:'A Morocco-first neighborhood community app, previously named Hayna. I worked on its mobile experience using React Native, Expo and Firebase.',features:['Neighborhood feed and post interactions','Profile and neighborhood setup','Comments, alerts and reporting','English, French and Arabic content'],images:[['assets/achtari-language.png','Language selection: Arabic, French and English'],['assets/achtari-services.png','Local-services locked preview and invite screen']],tags:['React Native','Expo','TypeScript','Firebase'],disclosure:'Screenshots supplied by the developer show language selection and the local-services preview. The services screen is marked as a locked preview, not a fully released marketplace. No AchTari source code is included in this portfolio.',url:null},
  masari:{kind:'MOBILE / IN DEVELOPMENT',title:'Masari',description:'A mobile job-search companion, with onboarding and job-preference flows. These screenshots show the app in development.',features:['French onboarding introducing application tracking','Job-category selection and a multi-step preferences flow','Mobile interfaces built with React Native and Expo'],tags:['React Native','Expo','TypeScript','Mobile UI'],disclosure:'Screenshots show development and onboarding UI, including illustrative application statuses. The app is in development; its source code is not included in this portfolio repository.',url:null,images:[['assets/masari-onboarding.png','Application-tracking onboarding'],['assets/masari-preferences.png','Job-category preferences']]},
  neon:{kind:'INTERACTIVE / PUBLIC REPOSITORY',title:'Neon Runner',description:'A neon-lit browser runner. Jump over barriers, find a rhythm, and try to beat your last score.',features:['Keyboard and touch-friendly controls','Increasing difficulty, collisions, pause and restart','A personal best saved in the browser','Eight automated gameplay tests and GitHub checks'],tags:['HTML','CSS','JavaScript','Canvas','Node test runner'],disclosure:'Started as my interface prototype. The playable version, visual design, documentation and tests were completed with AI assistance. The repository preserves both stages with their actual commit dates.',url:'https://github.com/germansparrow097-tech/Neon-runner'},
  chat:{kind:'FULL STACK / LOCAL PROTOTYPE',title:'Real-time Chat',description:'A chat application exploring connected interfaces with an Express server and Socket.IO real-time events.',features:['Registration and login flows using JWT and bcrypt','Private messages, typing indicators and online presence','Image upload handling with Multer','A three-column conversation interface'],tags:['Node.js','Express','Socket.IO','JavaScript','HTML','CSS'],disclosure:'The current version uses temporary in-memory mock data. This is a local prototype, not a deployed production service. Source publication is pending; the card artwork is an illustrative presentation.',url:null},
  products:{kind:'WEB APPLICATION / LOCAL PROJECT',title:'Product Management',description:'A browser-based CRUD project for creating, finding, updating and deleting product records.',features:['Product title, category and pricing inputs','Totals calculated from price, taxes, advertising and discounts','Search by title or category','Product records kept in browser local storage'],images:[['assets/product-management-real.png','Actual product-management interface with demo data']],tags:['HTML','CSS','JavaScript','Local storage'],disclosure:'A local learning project. It does not have a shared database or production authentication. The screenshot shows the actual interface populated with a clearly labelled demo product. Source publication is pending.',url:null},
  python:{kind:'PYTHON / LEARNING PROJECTS',title:'Python Playground',description:'A collection of small Python experiments, including a Tkinter calculator, Turtle graphics and object-oriented programming exercises.',features:['Desktop interface exploration with Tkinter','Drawing and graphics with Turtle','Classes, methods and object-oriented exercises','Practice with program flow and standard-library tools'],tags:['Python','Tkinter','Turtle','OOP'],disclosure:'These are learning exercises, not production tools. The calculator still needs input-validation and error-handling improvements before release. The code artwork on the project card is illustrative. Source publication is pending.',url:null}
};
const dialog=$('#project-dialog');let projectTrigger=null;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  const p=projects[button.dataset.project];projectTrigger=button;
  $('#project-kind').textContent=p.kind;$('#project-title').textContent=p.title;$('#project-description').textContent=p.description;$('#project-disclosure').textContent=p.disclosure;
  const gallery=$('#project-gallery');gallery.replaceChildren();(p.images||[]).forEach(([src,alt])=>{const a=document.createElement('a');a.href=src;a.target='_blank';a.rel='noopener noreferrer';const img=document.createElement('img');img.src=src;img.alt=alt;a.append(img);gallery.append(a);});
  const list=$('#project-features');list.replaceChildren();p.features.forEach(text=>{const li=document.createElement('li');li.textContent=text;list.append(li);});
  const tags=$('#project-tags');tags.replaceChildren();p.tags.forEach(text=>{const tag=document.createElement('span');tag.textContent=text;tags.append(tag);});
  const link=$('#project-link');link.hidden=!p.url;if(p.url)link.href=p.url;else link.removeAttribute('href');
  dialog.showModal();document.body.style.overflow='hidden';
}));
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';projectTrigger?.focus({preventScroll:true});});
let ignited=false;
$('#ignite').addEventListener('click',()=>{ignited=!ignited;$('#ignite').setAttribute('aria-pressed',String(ignited));$('#ignite').innerHTML=ignited?'RETURN TO BLUE <span aria-hidden="true">&lt;/&gt;</span>':'IGNITE THE BACKGROUND <span aria-hidden="true">&lt;/&gt;</span>';window.dispatchEvent(new CustomEvent('portfolio-ignite',{detail:{ignited}}));});
