const workouts = [
  { name: 'Full Body Foundation', level: 'Beginner', duration: '35 min', focus: 'Full Body' },
  { name: 'Upper Strength', level: 'Intermediate', duration: '45 min', focus: 'Upper Body' },
  { name: 'Lower Power', level: 'Intermediate', duration: '45 min', focus: 'Lower Body' },
  { name: 'Quick Conditioning', level: 'Beginner', duration: '20 min', focus: 'Conditioning' },
  { name: 'Push Hypertrophy', level: 'Advanced', duration: '50 min', focus: 'Upper Body' },
  { name: 'Leg Builder', level: 'Advanced', duration: '55 min', focus: 'Lower Body' }
];

const grid = document.querySelector('#workout-grid');
const search = document.querySelector('#workout-search');
const filters = document.querySelectorAll('[data-filter]');
const count = document.querySelector('#workout-count');
let activeFilter = 'All';

function render() {
  const query = search.value.trim().toLowerCase();
  const visible = workouts.filter((workout) => {
    const matchesFilter = activeFilter === 'All' || workout.focus === activeFilter;
    const matchesSearch = `${workout.name} ${workout.focus} ${workout.level}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  count.textContent = `${visible.length} workout${visible.length === 1 ? '' : 's'}`;
  grid.innerHTML = visible.map((workout, index) => `
    <article class="workout-card">
      <div class="workout-top"><span>0${index + 1}</span><span>${workout.level}</span></div>
      <h3>${workout.name}</h3>
      <p>${workout.focus} · ${workout.duration}</p>
      <button class="start-workout" type="button" data-workout="${workout.name}">Start Workout →</button>
    </article>
  `).join('') || '<p class="empty-state">No workouts match your search.</p>';
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle('active', item === button));
    render();
  });
});

search.addEventListener('input', render);

grid.addEventListener('click', (event) => {
  const button = event.target.closest('.start-workout');
  if (!button) return;
  alert(`${button.dataset.workout} selected. Your workout session is ready.`);
});

render();
