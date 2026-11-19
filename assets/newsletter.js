(()=>{'use strict';const f=document.getElementById('newsletter-form');if(!f)return;
const config=window.MENSCENTS_CONFIG||{},msg=document.getElementById('newsletter-status');
if(!config.newsletterEndpoint){msg.textContent='Newsletter registration is being prepared. No email is collected yet.';f.hidden=true;return;}
f.action=config.newsletterEndpoint;f.method='post';f.addEventListener('submit',()=>{if(window.menscentsTrack)window.menscentsTrack('newsletter_submit',{location:'site'});});
})();