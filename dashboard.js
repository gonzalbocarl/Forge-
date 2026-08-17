const history=JSON.parse(localStorage.getItem('forgeHistory')||'[]');
const totalMinutes=history.reduce((sum,item)=>sum+(item.minutes||0),0);
document.querySelector('#sessions').textContent=history.length;
document.querySelector('#minutes').textContent=totalMinutes;
document.querySelector('#completion').textContent=history.length?Math.min(100,Math.round(history.length/7*100))+'%':'0%';
const dates=[...new Set(history.map(item=>item.date))].sort().reverse();let streak=0;if(dates.length){let cursor=new Date();cursor.setHours(0,0,0,0);for(const value of dates){const date=new Date(value);date.setHours(0,0,0,0);const diff=Math.round((cursor-date)/86400000);if(diff===0||diff===1){streak++;cursor=date}else break}}document.querySelector('#streak').textContent=`${streak} DAY${streak===1?'':'S'}`;
const list=document.querySelector('#history');if(history.length){list.innerHTML=history.slice(0,10).map(item=>`<article class="history-item"><div><strong>${item.name}</strong><p>${item.date} · ${item.minutes} min · ${item.exercises} exercises</p></div><span>COMPLETED ✓</span></article>`).join('')}
