/* =========================================================
   ANOVA-psy.github.io — 全站脚本（原生 JS，无依赖）
   1. 中英切换（记忆在 localStorage）
   2. 移动端导航
   3. 滚动渐显
   4. 图片查看器（键盘可操作）
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');   /* 供 CSS 判断：无 JS 时不做渐显，内容直接可见 */

  /* ---------- 1. 语言切换 ---------- */
  function applyLang(lang, btn) {
    root.dataset.lang = lang;
    root.lang = lang === 'en' ? 'en' : 'zh-CN';
    if (btn) btn.textContent = lang === 'en' ? '中' : 'EN';
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.setAttribute('aria-label',
        lang === 'en' ? '切换为中文' : 'Switch to English');
      b.textContent = lang === 'en' ? '中' : 'EN';
    });
  }

  /* 允许用 ?lang=zh|en 指定语言（分享链接时有用），否则读本地记忆 */
  var forced = null;
  try { forced = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  if (forced === 'zh' || forced === 'en') {
    applyLang(forced);
  } else {
    try {
      if (localStorage.getItem('anova-lang') === 'en') applyLang('en');
    } catch (e) { /* 隐私模式忽略 */ }
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = root.dataset.lang === 'en' ? 'zh' : 'en';
      applyLang(next, btn);
      try { localStorage.setItem('anova-lang', next); } catch (e) {}
    });
  });

  /* ---------- 2. 移动端导航 ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.dataset.open === 'true';
      navLinks.dataset.open = open ? 'false' : 'true';
      navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.dataset.open = 'false';
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 3. 滚动渐显 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- 4. 图片查看器 ---------- */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-caption');
    var lbCount = lb.querySelector('.lb-count');
    var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
    var index = 0;
    var lastFocus = null;

    function srcOf(el) {
      var img = el.querySelector('img');
      return img ? img.currentSrc || img.src : el.getAttribute('href');
    }
    function capOf(el) {
      return el.getAttribute('data-caption') || (el.querySelector('img') || {}).alt || '';
    }
    function show(i) {
      if (!triggers.length) return;
      index = (i + triggers.length) % triggers.length;
      var el = triggers[index];
      lbImg.src = srcOf(el);
      lbImg.alt = (el.querySelector('img') || {}).alt || capOf(el);
      lbCap.textContent = capOf(el);
      lbCount.textContent = (index + 1) + ' / ' + triggers.length;
    }
    function open(el) {
      lastFocus = el;
      show(triggers.indexOf(el));
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-close').focus();
    }
    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    triggers.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        open(el);
      });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }
})();
