(()=>{'use strict';const config=window.MENSCENTS_CONFIG||{};
window.menscentsTrack=(name,props={})=>{if(typeof window.plausible==='function')window.plausible(name,{props});};
if(config.analyticsDomain){const s=document.createElement('script');s.defer=true;s.dataset.domain=config.analyticsDomain;s.src='https://plausible.io/js/script.js';document.head.appendChild(s);}
document.addEventListener('click',e=>{const link=e.target.closest('a[href]');if(!link)return;try{const u=new URL(link.href,location.href);if(u.hostname.includes('amazon.'))window.menscentsTrack('affiliate_click',{merchant:'amazon'});else if(u.origin!==location.origin)window.menscentsTrack('outbound_click',{host:u.hostname});}catch{}});
})();