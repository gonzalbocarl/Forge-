const exercises = [
  { name: 'Bodyweight Squats', sets: 3, reps: 12, rest: 60 },
  { name: 'Push-Ups', sets: 3, reps: 10, rest: 60 },
  { name: 'Dumbbell Row', sets: 3, reps: 10, rest: 75 },
  { name: 'Reverse Lunges', sets: 3, reps: 10, rest: 60 },
  { name: 'Plank', sets: 3, reps: 30, rest: 45 }
];

const list = document.querySelector('#exercise-list');
const progressLabel = document.querySelector('#progress-label');
const progressBar = document.querySelector('#progress-bar');
let completed = new Set();
let timerId = null;
let seconds = 0;

function render() {
  list.innerHTML = exercises.map((exercise, index) => {
    const done = completed.has(index);
    return `<article class="exercise-card ${done ? 'completed' : ''}">
      <div class="exercise-number">0${index + 1}</div>
      <div class="exercise-info"><h2>${exercise.name}</h2><p>${exercise.sets} sets × ${exercise.reps} ${exercise.name === 'Plank' ? 'sec' : 'reps'} · ${exercise.rest}s rest</p></div>
      <button class="complete-btn" data-index="${index}" type="button">${done ? 'Completed ✓' : 'Complete'}</button>
    </article>`;
  }).join('');
  progressLabel.textContent = `${completed.size} / ${exercises.length}`;
  progressBar.style.width = `${(completed.size / exercises.length) * 100}%`;
}

list.addEventListener('click', (event) => {
  const button = event.target.closest('.complete-btn');
  if (!button) return;
  const index = Number(button.dataset.index);
  completed.has(index) ? completed.delete(index) : completed.add(index);
  render();
  if (completed.size < exercises.length) startRestTimer(exercises[index].rest);
});

function startRestTimer(duration) {
  clearInterval(timerId);
  seconds = duration;
  const notice = document.querySelector('#rest-notice') || document.createElement('div');
  notice.id = 'rest-notice'; notice.className = 'rest-notice';
  document.querySelector('.session-panel').prepend(notice);
  const tick = () => {
    notice.textContent = seconds > 0 ? `REST · ${seconds}s` : 'REST COMPLETE · GET READY';
    if (seconds <= 0) clearInterval(timerId); else seconds--;
  };
  tick(); timerId = setInterval(tick, 1000);
}

document.querySelector('#reset-session').addEventListener('click', () => { completed.clear(); clearInterval(timerId); document.querySelector('#rest-notice')?.remove(); render(); });
document.querySelector('#finish-session').addEventListener('click', () => {
  if (completed.size < exercises.length) { alert(`Complete all ${exercises.length} exercises before finishing.`); return; }
  alert('Workout complete. Great work — session forged.');
});
render();
