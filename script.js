(() => {
 const views=[...document.querySelectorAll('.view')], links=[...document.querySelectorAll('[data-page]')], nav=document.getElementById('mainNav'), toggle=document.getElementById('navToggle');
 function render(){
  const id=(location.hash||'#home').slice(1);
  const view=views.find(v=>v.id===id)||views[0];
  views.forEach(v=>v.classList.toggle('active',v===view));
  links.forEach(a=>{const active=a.dataset.page===view.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  document.title=view.dataset.title+' | Chizurum Amaugo';
  nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'smooth'});
 }
 toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
 window.addEventListener('hashchange',render);
 document.getElementById('year').textContent=new Date().getFullYear();
 render();
})();