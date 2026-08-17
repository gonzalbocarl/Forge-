const workouts = [
  { name: 'Full Body Foundation', level: 'Beginner', duration: '35 min', focus: 'Full Body' },
  { name: 'Upper Strength', level: 'Intermediate', duration: '45 min', focus: 'Upper Body' },
  { name: 'Lower Power', level: 'Intermediate', duration: '45 min', focus: 'Lower Body' },
  { name: 'Quick Conditioning', level: 'Beginner', duration: '20 min', focus: 'Conditioning' },
  { name: 'Push Hypertrophy', level: 'Advanced', duration: '50 min', focus: 'Upper Body' },
  { name: 'Leg Builder', level: 'Advanced', duration: '55 min', focus: 'Lower Body' }
];
const grid=document.querySelector('#workout-grid'),search=document.querySelector('#workout-search'),filters=document.querySelectorAll('[data-filter]'),count=document.querySelector('#workout-count');let activeFilter='All';
function render(){const query=search.value.trim().toLowerCase();const visible=workouts.filter(w=>(activeFilter==='All'||w.focus===activeFilter)&&`${w.name} ${w.focus} ${w.level}`.toLowerCase().includes(query));count.textContent=`${visible.length} workout${visible.length===1?'':'s'}`;grid.innerHTML=visible.map((w,i)=>`<article class="workout-card"><div class="workout-top"><span>0${i+1}</span><span>${w.level}</span></div><h3>${w.name}</h3><p>${w.focus} · ${w.duration}</p><a class="start-workout" href="workout.html?workout=${encodeURIComponent(w.name)}">Start Workout →</a></article>`).join('')||'<p class="empty-state">No workouts match your search.</p>'}
filters.forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;filters.forEach(item=>item.classList.toggle('active',item===button));render()}));search.addEventListener('input',render);render();
