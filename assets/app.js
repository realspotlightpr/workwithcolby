/* ColbyFifer.com — shared interactions & motion */
(function () {
  'use strict';

  /* year */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* sticky nav shrink + mobile toggle */
  var nav = document.querySelector('header.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    var mb = nav.querySelector('.menu-btn');
    if (mb) mb.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('.mobile-menu a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* scroll reveal */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* count-up */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var dur = 1500, start = null;
    function fmt(n) {
      return prefix + n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
    }
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target);
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = (el.getAttribute('data-prefix') || '') + el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); });
  }

  /* billing toggle */
  window.setBilling = function (mode) {
    var yearly = mode === 'yearly';
    var mBtn = document.getElementById('monthlyBtn'), yBtn = document.getElementById('yearlyBtn');
    if (mBtn) mBtn.classList.toggle('active', !yearly);
    if (yBtn) yBtn.classList.toggle('active', yearly);
    document.querySelectorAll('.price[data-monthly]').forEach(function (el) {
      el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
    });
    var per1 = document.getElementById('per1'), per2 = document.getElementById('per2');
    if (per1) per1.textContent = yearly ? '/mo billed yearly' : '/month';
    if (per2) per2.textContent = yearly ? '/mo billed yearly' : '/month';
    var y1 = document.getElementById('year1'), y2 = document.getElementById('year2');
    if (y1) y1.textContent = yearly ? '$12,000/yr — 2 months free' : 'or $12,000/year';
    if (y2) y2.textContent = yearly ? '$20,000/yr — 2 months free' : 'or $20,000/year';
    var note = document.getElementById('saveNote');
    if (note) note.textContent = yearly ? '🎉 Nice — that\'s 2 months free, locked in.' : '💸 Switch to yearly and get 2 months free';
  };

  /* content tabs */
  window.showContent = function (type, btn) {
    document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.c-card').forEach(function (c) {
      var t = c.getAttribute('data-type');
      c.classList.toggle('hidden', !(type === 'all' || t === type));
    });
  };

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      item.classList.toggle('open', !wasOpen);
    });
  });

  /* subtle parallax on blobs */
  var blobs = document.querySelectorAll('.blob');
  if (blobs.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      blobs.forEach(function (b, i) {
        b.style.transform = 'translateY(' + (y * (0.04 + i * 0.02)) + 'px)';
      });
    }, { passive: true });
  }
})();
