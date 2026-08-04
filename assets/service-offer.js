(function(){
  var bar=document.querySelector('[data-service-offer-bar]');
  if(!bar)return;
  var storageKey='wwc-18-hour-rate-hold-v1',deadline;
  try{var saved=Number(localStorage.getItem(storageKey));if(saved&&saved>Date.now())deadline=saved;else{deadline=Date.now()+18*60*60*1000;localStorage.setItem(storageKey,String(deadline))}}catch(error){deadline=Date.now()+18*60*60*1000}
  var clocks=document.querySelectorAll('[data-service-countdown]'),timer;
  function updateClock(){var remaining=Math.max(0,deadline-Date.now()),hours=Math.floor(remaining/3600000),minutes=Math.floor(remaining%3600000/60000),seconds=Math.floor(remaining%60000/1000),values=[['Hrs',hours],['Min',minutes],['Sec',seconds]];clocks.forEach(function(clock){clock.innerHTML=values.map(function(item){return '<span class="service-count-unit"><b>'+String(item[1]).padStart(2,'0')+'</b><small>'+item[0]+'</small></span>'}).join('')});if(!remaining){clearInterval(timer);bar.hidden=true}}
  updateClock();timer=setInterval(updateClock,1000);
  var dismissed=false,footerVisible=false;
  function syncBar(){bar.classList.toggle('show',!dismissed&&!footerVisible&&!bar.hidden&&window.scrollY>420)}
  window.addEventListener('scroll',syncBar,{passive:true});
  var footer=document.querySelector('footer');if(footer&&'IntersectionObserver'in window){new IntersectionObserver(function(entries){footerVisible=entries[0].isIntersecting;syncBar()},{threshold:.05}).observe(footer)}
  var close=bar.querySelector('[data-service-offer-close]');if(close)close.addEventListener('click',function(){dismissed=true;bar.classList.remove('show')});syncBar();
})();
