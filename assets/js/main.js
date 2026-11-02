/**
* Template Name: Scout
* Template URL: https://bootstrapmade.com/scout-bootstrap-multipurpose-template/
* Updated: May 05 2025 with Bootstrap v5.3.5
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

(function () {
  "use strict";

  // ===== DATA KONTAK (GANTI dengan data asli) =====
  // Hanya email yang tersambung (tautan dan tujuan formulir). WhatsApp dan Instagram hanya ditampilkan sebagai teks.
  const K = { nama: "Nama Kontak Person", email: "medarikaryamulia87@gmail.com", whatsapp: "+62 812-3456-7890", instagram: "@medarikarya_mulia" };

  // Endpoint Formspree untuk formulir pesan
  const FORMSPREE_URL = "https://formspree.io/f/mdeepdkd";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const setHref = (id, href) => { const el = $(id); if (el) el.href = href; };
  const setText = (id, txt) => { const el = $(id); if (el) el.textContent = txt; };

  setText("#k-nama", K.nama);
    const gmailTo = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(K.email);
  ["#k-mail", "#sd-mail"].forEach(i => { setHref(i, gmailTo); setText(i, K.email); const el = $(i); if (el) { el.target = "_blank"; el.rel = "noopener"; } });
  ["#k-wa", "#sd-wa", "#f-wa"].forEach(i => setText(i, K.whatsapp));
    setText("#k-ig", K.instagram);
  setHref("#k-ig", "https://www.instagram.com/" + K.instagram.replace("@", "") + "/");
  const igLink = $("#k-ig"); if (igLink) { igLink.target = "_blank"; igLink.rel = "noopener"; }
    setHref("#f-mail", gmailTo); const fm = $("#f-mail"); if (fm) { fm.target = "_blank"; fm.rel = "noopener"; }
  setText("#f-em", K.email);

    // ----- Formulir -----
  $$(".mk-form").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    const fields = $$("input,textarea", f);
    let ok = true;
    fields.forEach(i => {
      const bad = !i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value));
      i.classList.toggle("bad", bad);
      if (bad) ok = false;
    });
    const msg = $(".msg", f);
    if (!ok) { msg.textContent = en ? "Please complete the highlighted fields and check the email format." : "Lengkapi kolom yang ditandai dan periksa format email."; return; }

    // Formulir pesan (data-direct): langsung terkirim ke email lewat Formspree
    if (f.dataset.direct !== undefined) {
      const btn = $(".btn-send", f);
      btn.disabled = true;
      msg.textContent = en ? "Sending..." : "Mengirim...";
      const data = { _subject: f.dataset.sub };
      fields.forEach(i => { data[i.name] = i.value; });
      // Agar tombol "Balas" di email Formspree langsung menuju pengirim
      const emailField = $('input[type="email"]', f);
      if (emailField) data._replyto = emailField.value;

      fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      })
        .then(r => {
          if (r.ok) {
            msg.textContent = en ? "Message sent. Thank you, we will contact you shortly." : "Pesan terkirim. Terima kasih, kami akan segera menghubungi Anda.";
            f.reset();
          } else {
            throw new Error("gagal");
          }
        })
        .catch(() => { msg.textContent = en ? "Message not sent. Please try again or contact us by email." : "Pesan belum terkirim. Silakan coba lagi atau hubungi kami lewat email."; })
        .finally(() => { btn.disabled = false; });
      return;
    }

    // Formulir lamaran: buka Gmail dengan draf terisi (CV dilampirkan sendiri oleh pelamar)
    const body = fields.map(i => i.name + ": " + i.value).join("\n") + (f.dataset.note ? "\n\n" + f.dataset.note : "");
    const subject = encodeURIComponent(f.dataset.sub), text = encodeURIComponent(body);
    const gmail = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(K.email) + "&su=" + subject + "&body=" + text;
    const mailto = "mailto:" + K.email + "?subject=" + subject + "&body=" + text;
    msg.innerHTML = en
      ? 'Gmail opened in a new tab. If it did not open, <a href="' + gmail + '" target="_blank" rel="noopener">click here</a> or <a href="' + mailto + '">use another email app</a>.'
      : 'Gmail terbuka di tab baru. Jika tidak terbuka, <a href="' + gmail + '" target="_blank" rel="noopener">klik di sini</a> atau <a href="' + mailto + '">pakai aplikasi email lain</a>.';
    window.open(gmail, "_blank", "noopener");
    f.reset();
  }));

  // ----- Penyaring berita -----
    // ----- Berita: filter + nomor halaman -----
  (function () {
    const PER_PAGE = 6;                        // jumlah kartu per halaman
    const cards = $$("#news .news-col");
    const pager = document.getElementById("newsPager");
    if (!cards.length || !pager) return;
    let cat = "all", page = 1;

    function render(scroll) {
      const list = cards.filter(c => cat === "all" || c.dataset.cat === cat);
      const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
      page = Math.min(page, pages);
      cards.forEach(c => { c.style.display = "none"; });
      list.slice((page - 1) * PER_PAGE, page * PER_PAGE).forEach(c => { c.style.display = ""; });

      pager.innerHTML = "";
      if (pages > 1) {
        const add = (label, p, cls, aria) => {
          const b = document.createElement("button");
          b.type = "button"; b.innerHTML = label; b.className = cls || "";
          if (aria) b.setAttribute("aria-label", aria);
          if (p < 1 || p > pages) b.disabled = true;
          b.addEventListener("click", () => { page = p; render(true); });
          pager.appendChild(b);
        };
        add('<i class="bi bi-chevron-left"></i> Prev', page - 1, "", "Halaman sebelumnya");
        for (let i = 1; i <= pages; i++) add(i, i, i === page ? "on" : "", "Halaman " + i);
        add('Next <i class="bi bi-chevron-right"></i>', page + 1, "", "Halaman berikutnya");
      }
      if (scroll) document.getElementById("media").scrollIntoView({ behavior: "smooth" });
    }

    $$('input[name="nf"]').forEach(r => r.addEventListener("change", () => { cat = r.value; page = 1; render(); }));
    render();
  })();

  // ----- Bahasa ID / EN -----
  let en = false;
  const lang = $("#lang");
  if (lang) lang.addEventListener("click", () => {
    en = !en;
    document.documentElement.lang = en ? "en" : "id";
    $$("[data-en]").forEach(el => {
      if (el.dataset.id === undefined) el.dataset.id = el.innerHTML;
      el.innerHTML = en ? el.dataset.en : el.dataset.id;
    });
    $$("[data-ph-en]").forEach(el => {
      if (el.dataset.phId === undefined) el.dataset.phId = el.placeholder;
      el.placeholder = en ? el.dataset.phEn : el.dataset.phId;
    });
  });

   // ----- Halaman berita: bagikan (salin tautan / email) -----
  $$(".js-copy").forEach(b => b.addEventListener("click", () => {
    const done = () => { b.classList.add("done"); b.title = "Tautan disalin"; setTimeout(() => { b.classList.remove("done"); b.title = "Salin tautan"; }, 2000); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(location.href).then(done, () => prompt("Salin tautan:", location.href));
    else prompt("Salin tautan:", location.href);
  }));
  $$(".js-mail").forEach(a => { a.href = "mailto:?subject=" + encodeURIComponent(document.title) + "&body=" + encodeURIComponent(location.href); });
})();