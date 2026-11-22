(() => {
  const pages = [...document.querySelectorAll('.page')];
  const navLinks = [...document.querySelectorAll('[data-route]')];
  const pageName = document.getElementById('pageName');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileOverlay');
  const menuToggle = document.getElementById('menuToggle');

  function showPage(route) {
    const target = pages.find(page => page.id === route) || pages[0];
    pages.forEach(page => page.classList.toggle('active', page === target));
    navLinks.forEach(link => {
      const active = link.dataset.route === target.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    pageName.textContent = target.dataset.title || 'Home';
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${target.dataset.title || 'Home'} | Chizurum Amaugo`;
  }

  function closeMenu() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function routeFromHash() {
    showPage((window.location.hash || '#home').slice(1));
  }

  window.addEventListener('hashchange', routeFromHash);
  menuToggle.addEventListener('click', () => sidebar.classList.contains('open') ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', () => {
    if (window.location.hash === link.getAttribute('href')) showPage(link.dataset.route);
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
  routeFromHash();
})();