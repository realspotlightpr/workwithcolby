(() => {
  const bar = document.querySelector('.progress span');
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = `${max > 0 ? Math.min(100, scrollY / max * 100) : 0}%`;
  };
  addEventListener('scroll', update, {passive:true}); update();

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
  }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const buttons = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('[data-category]')];
  const categoryContext = document.querySelector('.category-context');
  const categoryCopy = {
    all: ['All client work', 'Explore complete client ecosystems or choose a service above to see only the projects where that work was delivered.'],
    web: ['Website Development', 'Custom websites, conversion paths, responsive experiences and full web applications.'],
    social: ['Social Media Management', 'See the brands receiving ongoing strategy, post concepts, scripts and multi-platform content production.'],
    seo: ['SEO & Local Visibility', 'Websites supported by search-friendly structure, local optimization and ongoing SEO management.'],
    ads: ['Paid Advertising', 'Client work where ad management is connected directly to the website and lead-capture journey.'],
    automation: ['AI & Automation', 'CRM workflows, AI characters, booking systems and connected operational tools.'],
    design: ['Design & Creative Production', 'Brand systems, responsive interfaces, campaign assets and content concepts designed to ship.'],
    technical: ['On-Demand Technical Support', 'Multi-disciplinary work spanning websites, integrations, lead systems and technical operations.']
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    projects.forEach(project => project.hidden = filter !== 'all' && !project.dataset.category.split(' ').includes(filter));
    const [title, description] = categoryCopy[filter];
    categoryContext.querySelector('h3').textContent = title;
    categoryContext.querySelector('p').textContent = description;
    categoryContext.animate([{opacity:.25,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:280,easing:'ease-out'});
  }));
})();
