(function(){
  if(!document.querySelector('link[href="assets/scroll-progress.css"]')){var styles=document.createElement('link');styles.rel='stylesheet';styles.href='assets/scroll-progress.css';document.head.appendChild(styles)}
  var track=document.createElement('div');
  track.className='site-scroll-progress';
  track.setAttribute('role','progressbar');
  track.setAttribute('aria-label','Page scroll progress');
  track.setAttribute('aria-valuemin','0');
  track.setAttribute('aria-valuemax','100');
  var bar=document.createElement('span');
  bar.className='site-scroll-progress-bar';
  track.appendChild(bar);
  document.body.appendChild(track);
  var frame=0,lastValue=-1;
  function update(){frame=0;var available=Math.max(document.documentElement.scrollHeight-window.innerHeight,1);var progress=Math.max(0,Math.min(1,window.scrollY/available));bar.style.transform='scaleX('+progress.toFixed(4)+')';var value=Math.round(progress*100);if(value!==lastValue){track.setAttribute('aria-valuenow',String(value));lastValue=value}}
  function requestUpdate(){if(!frame)frame=requestAnimationFrame(update)}
  window.addEventListener('scroll',requestUpdate,{passive:true});
  window.addEventListener('resize',requestUpdate);
  window.addEventListener('load',update);
  update();
})();
