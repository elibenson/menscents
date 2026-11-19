(()=>{'use strict';
const data=window.MENSCENTS_CATALOG||[];
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=$('find-button');if(!button)return;
const tierRank={value:0,premium:1,luxury:2};
const occasionFit=(p,o)=>o==='any'||p.occasion===o||(o==='office'&&p.occasion==='everyday'&&p.family!=='bold')||(o==='summer'&&p.occasion==='everyday'&&(p.family==='fresh'||p.family==='woody'));
const preferences=()=>({family:$('family').value,occasion:$('occasion').value,tier:$('tier').value});
function render(){
 const {family:f,occasion:o,tier:t}=preferences();
 const eligible=data.filter(p=>t==='any'||tierRank[p.tier]<=tierRank[t]);
 const ranked=eligible.map((p,i)=>{let score=0;const reasons=[];
 if(f!=='any'&&p.family===f){score+=7;reasons.push('Matches your '+f+' scent direction');}
 if(o!=='any'&&occasionFit(p,o)){score+=5;reasons.push(o==='office'?'Suitable for a restrained office shortlist':o==='summer'?'A direction to consider in warm weather':'Aligned with '+o+' wear');}
 if(t!=='any'&&p.tier===t){score+=2;reasons.push('In your chosen price tier');}
 if(o==='any'&&p.occasion==='everyday')score++;
 return {...p,score,reasons,i};}).sort((a,b)=>b.score-a.score||a.i-b.i);
 const best=ranked[0];const selected=[];
 if(best)selected.push({p:best,label:'BEST MATCH'});
 const value=ranked.find(p=>p.slug!==best?.slug&&p.tier==='value');
 if(value)selected.push({p:value,label:'BEST VALUE'});
 const different=ranked.find(p=>!selected.some(x=>x.p.slug===p.slug)&&p.family!==best?.family);
 if(different)selected.push({p:different,label:'SOMETHING DIFFERENT'});
 for(const p of ranked){if(selected.length>=3)break;if(!selected.some(x=>x.p.slug===p.slug))selected.push({p,label:'ALSO CONSIDER'});}
 if(share){share.disabled=false;share.setAttribute('aria-label','Copy a link to these fragrance results');} $('finder-heading').textContent='Your considered shortlist.';
 $('finder-intro').textContent=ranked.length?'Matched against '+eligible.length+' published profiles. These are editorial suggestions, not wear-test guarantees.':'No matches in that tier.';
 $('finder-results').innerHTML=selected.map(({p,label})=>{
 const reason=p.reasons.length?p.reasons.join(' · '):'A useful alternative worth sampling';
 const query=encodeURIComponent(p.name);
 return `<article class="result-card"><span class="eyebrow">${label}</span><h3>${esc(p.name)}</h3><p>${esc(p.angle)}</p><small>${esc(reason)}. Notes: ${esc(p.notes)}.</small><div class="result-links"><a href="${esc(p.profileUrl)}">Read profile ↗</a><a class="amazon-result-link" target="_blank" rel="sponsored nofollow noopener noreferrer" href="https://www.amazon.com/s?k=${query}&amp;tag=bnsn-20">Amazon search ↗</a></div></article>`;
 }).join('');
 const params=new URLSearchParams({family:f,occasion:o,tier:t});
 history.replaceState(null,'',location.pathname+'?'+params.toString());
 if(window.menscentsTrack)window.menscentsTrack('finder_completed',{family:f,occasion:o,tier:t});
 }
 button.addEventListener('click',render);
 const share=$('finder-share');if(share){share.disabled=true;share.setAttribute('aria-label','Generate results before copying a link');}if(share)share.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);share.textContent='Link copied ✓';}catch{share.textContent='Copy the URL from your address bar';}});
 const q=new URLSearchParams(location.search);let valid=false;
 for(const id of ['family','occasion','tier']){const el=$(id),v=q.get(id);if(v&&[...el.options].some(x=>x.value===v)){el.value=v;valid=true;}}
 if(valid)render();
})();