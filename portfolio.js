/* =========================================================================
   Fifth Stone Development — Portfolio interactions
   Vanilla JS to match the existing site stack (no framework / build step).
   ========================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Case-study content (carried from the live site's case-study modals,
     re-typeset into the editorial reader).
     --------------------------------------------------------------------- */
  var CASES = {
    aiblog: {
      lbl: "Case Study — Full-Stack Web Application",
      cat: "Full-Stack Web Application",
      title: "AI Blog Daily",
      link: { href: "https://www.aiblogdaily.com", label: "Visit aiblogdaily.com" },
      media: { type: "browser", addr: "aiblogdaily.com", src: "assets/ai_blog_daily_app.png", alt: "AI Blog Daily platform" },
      sections: [
        ["Overview", "AI Blog Daily aggregates and compares AI-generated content from multiple leading models — ChatGPT, Claude, Gemini, Grok, with Llama on the way — in a single, unified platform. It automatically publishes fresh posts daily across 15+ categories and runs a <strong>blind, head-to-head voting system</strong> so readers can judge how different models approach identical topics, without bias."],
        ["The Challenge", "As AI models multiplied, their output scattered across platforms with no honest way to compare them on the same prompt — and accessing several meant juggling several subscriptions. The goal was one centralized place with meaningful comparison tools and a monetization model that could actually sustain it."],
        ["The Solution", "A comprehensive platform built on <strong>Python / Flask</strong> with a <strong>PostgreSQL</strong> database, integrating five AI APIs. The core is a blind voting flow: readers compare paired posts without knowing the author, vote across five dimensions, and only then see who wrote what. Position randomization removes positional bias and a short edit window locks votes. <strong>Stripe</strong>-powered tiers, a premium analytics dashboard, follows, bookmarks and threaded comments round it out — about 64 routes in all."]
      ],
      outcomes: [
        ["100% automated", "zero manual intervention for daily generation across five providers, on a fault-tolerant architecture."],
        ["Bias-free comparisons", "blind voting with position randomization produces authentic, crowdsourced insight into model strengths."],
        ["Sustainable monetization", "a freemium model with bootstrap free voting and premium subscriptions ($4.99/mo, $49.99/yr)."],
        ["Production-grade security", "CSRF protection, rate limiting, parameterized queries and verified webhooks throughout."]
      ],
      tags: ["Python", "Flask", "PostgreSQL", "OpenAI API", "Anthropic API", "Stripe"]
    },

    candeo: {
      lbl: "Case Study — Custom Web Build",
      cat: "Custom Web Build & UX",
      title: "Candeo Counseling Center",
      link: { href: "https://www.candeocounseling.com/", label: "Visit candeocounseling.com" },
      media: { type: "browser", addr: "candeocounseling.com", src: "assets/candeo_counseling_home.png", alt: "Candeo Counseling Center home page" },
      sections: [
        ["Overview", "Candeo wanted to expand beyond Iowa while keeping a strong local presence. Their existing site was largely static, with limited engagement, awkward navigation, and a contact process that lacked efficiency and compliance considerations."],
        ["The Challenge", "We needed to lift engagement, make critical resources like the client portal easy to find, and restructure the site to support multi-state growth — all while streamlining intake and protecting patient health information (PHI)."],
        ["The Solution", "Key areas were redesigned for usability, scalability and compliance. The <strong>Our Team</strong> page was rebuilt to give each clinician a concise summary and dedicated profile, so clients quickly find the right provider. <strong>Locations</strong> gained individual tabs with maps, facility photos and the clinicians at each site. The <strong>Contact</strong> page moved to a PHI-compliant Google Form for secure intake."]
      ],
      outcomes: [
        ["Faster navigation", "reduced the path to clinician profiles and the client portal to one or two clicks."],
        ["Deeper engagement", "dynamic clinician profiles replaced static bios, encouraging longer visits."],
        ["Scalable structure", "new locations and providers can be added without a redesign."],
        ["Compliant intake", "secure, PHI-compliant submissions cut manual handling and built client trust."]
      ],
      tags: ["JavaScript", "Squarespace", "UI/UX Design", "Google Workspace"]
    },

    isles: {
      lbl: "Case Study — Web Development",
      cat: "Web Development & Mission Content",
      title: "Isles of Hope International",
      link: { href: "https://www.islesofhopeintl.com", label: "Visit islesofhopeintl.com" },
      media: { type: "browser", addr: "islesofhopeintl.com", src: "assets/isles_of_hope_Page.png", alt: "Isles of Hope International website" },
      sections: [
        ["Overview", "Isles of Hope International is a Christian nonprofit supporting women in need across several countries. The new site was built from the ground up to make ministries easy to navigate, strengthen the storytelling of global outreach, and make supporting the work simple — highlighting partners in Zimbabwe, Uganda, Nepal and the DRC."],
        ["The Challenge", "The organization needed a modern, mobile-friendly site that could carry layered content — region pages, mission, statement of faith, donation calls to action — while staying clear and navigable for diverse audiences."],
        ["The Solution", "A fully custom site with a clear top-level structure: ministry by country, mission and faith, and multiple ways to give. Each country page presents local leadership, the scope of services, and opportunities to support — designed for readability, mobile responsiveness, and easy ongoing updates."]
      ],
      outcomes: [
        ["Clear engagement", "country-by-country calls to action make regional work easy to explore."],
        ["Donation visibility", "prominent \u201cSend Support\u201d and \u201cGive\u201d links guide visitors toward giving."],
        ["Structured story", "mission, faith and leadership organized for clarity and depth."],
        ["Built to grow", "a flexible architecture ready for events, newsletters and new stories."]
      ],
      tags: ["Web Development", "Squarespace", "Nonprofit", "International Outreach"]
    },

    gov: {
      lbl: "Case Study — Process Automation",
      cat: "Process Automation",
      title: "Government Agency Data Processing & Analysis Tool",
      link: null,
      media: { type: "app", title: "Disaster Recovery — Data Toolkit", src: "assets/gov_agency_app.png", alt: "Government data processing tool", portrait: false },
      sections: [
        ["Overview", "A purpose-built automation tool supporting government disaster-recovery operations. It streamlines how large volumes of spreadsheets, PDFs and invoices are processed, reconciled and turned into standardized, audit-ready reports for field teams and analysts."],
        ["The Challenge", "Disaster-recovery projects generate extensive documentation — load-ticket spreadsheets, debris-tracking records, waterway-assessment PDFs, multi-sheet invoices. Analysts reconciled data across files by hand, extracted information from unstructured documents, and standardized outputs — often days per project, with real risk of human error."],
        ["The Solution", "A standalone application that performs intelligent Excel reconciliation, PDF extraction and invoice aggregation. It detects duplicate records across files, parses structured data from complex PDF reports, and consolidates invoice data with full traceability. Delivered as a single Windows executable — no installation, no technical expertise required."]
      ],
      outcomes: [
        ["90%+ less reconciliation time", "automated duplicate detection replaced manual spreadsheet comparison."],
        ["Higher accuracy", "transcription and comparison errors were effectively eliminated."],
        ["Broader access", "non-technical users could run advanced data processing themselves."],
        ["Same-day cycles", "multi-week document workflows compressed to same-day completion."]
      ],
      tags: ["Python", "Data Automation", "Excel Processing", "PDF Parsing"]
    },

    inovalon: {
      lbl: "Case Study — Internal Tooling",
      cat: "Internal Tooling & Data Enablement",
      title: "Internal Data Query Tool",
      link: null,
      media: { type: "app", title: "Internal Data Query Tool", src: "assets/Inovalon_Query_Tool.png", alt: "Internal data query tool", portrait: true },
      sections: [
        ["Overview", "On a specialty-pharmacy support team, an opportunity surfaced: make enterprise data more accessible so analysts could triage and resolve customer issues with less friction — and more confidence."],
        ["The Challenge", "Analysts rely on SQL to investigate customer-reported issues, but enterprise databases hold hundreds of tables, making it hard to know where to start. The cost fell hardest on newer team members still learning the architecture, slowing triage and creating inconsistent workflows."],
        ["The Solution", "An internal querying app built in <strong>Python</strong> with a Tkinter interface. It connects to pre-configured databases and offers a curated library of vetted SQL queries — contributed by experienced analysts and engineers. Each dataset carries a plain-language description, and the app shows only the input fields relevant to the selection, so analysts retrieve targeted data without navigating the schema."]
      ],
      outcomes: [
        ["Faster triage", "less time spent identifying the right tables and queries during investigations."],
        ["More analyst confidence", "newer members worked effectively without deep schema knowledge."],
        ["Standardized insight", "vetted queries were centralized and reused for consistent results."],
        ["Shared knowledge", "experienced analysts had a place to contribute high-value queries."]
      ],
      tags: ["Python", "Tkinter", "SQL", "Internal Tools", "Enterprise Systems"]
    }
  };

  /* ---------------------------------------------------------------------
     Masthead scroll state
     --------------------------------------------------------------------- */
  var masthead = document.getElementById("masthead");
  var onScroll = function () {
    if (window.scrollY > 12) masthead.classList.add("scrolled");
    else masthead.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     Scroll reveals
     --------------------------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  function revealInView() {
    reveals.forEach(function (r) {
      if (r.classList.contains("in")) return;
      var rect = r.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) r.classList.add("in");
    });
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (r) { io.observe(r); });
    revealInView();
    window.addEventListener("scroll", revealInView, { passive: true });
    window.addEventListener("load", revealInView);
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
  }

  /* ---------------------------------------------------------------------
     Case-study reader overlay
     --------------------------------------------------------------------- */
  var reader = document.getElementById("reader");
  var readerBody = document.getElementById("readerBody");
  var readerLbl = document.getElementById("readerLbl");
  var lastFocus = null;

  function mediaHTML(m) {
    if (m.type === "browser") {
      return '<div class="r-media"><div class="frame browser">' +
        '<div class="chrome"><div class="dots"><i></i><i></i><i></i></div>' +
        '<div class="addr">' + m.addr + '</div></div>' +
        '<img class="shot" src="' + m.src + '" alt="' + m.alt + '" /></div></div>';
    }
    return '<div class="r-media"><div class="frame app' + (m.portrait ? " portrait" : "") + '">' +
      '<div class="chrome"><div class="titlebar"><span class="badge"></span>' + m.title + '</div>' +
      '<div class="winbtns"><span>&mdash;</span><span>&#9634;</span><span>&#10005;</span></div></div>' +
      '<div class="pad"><img src="' + m.src + '" alt="' + m.alt + '" /></div></div></div>';
  }

  function render(key) {
    var c = CASES[key];
    if (!c) return;
    readerLbl.textContent = c.lbl;
    var html = "";
    html += '<span class="r-cat">' + c.cat + "</span>";
    html += "<h2 id=\"readerTitle\">" + c.title + "</h2>";
    if (c.link) {
      html += '<a class="r-link" href="' + c.link.href + '" target="_blank" rel="noopener noreferrer">' +
        c.link.label +
        ' <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg></a>';
    }
    html += mediaHTML(c.media);
    c.sections.forEach(function (s) {
      html += '<div class="r-section"><h3>' + s[0] + "</h3><p>" + s[1] + "</p></div>";
    });
    html += '<div class="r-section"><h3>Measurable Outcomes</h3><ul class="r-outcomes">';
    c.outcomes.forEach(function (o) {
      html += "<li><span><strong>" + o[0] + ":</strong> " + o[1] + "</span></li>";
    });
    html += "</ul></div>";
    html += '<div class="r-tags"><div class="tags">';
    c.tags.forEach(function (t) { html += '<span class="tag">' + t + "</span>"; });
    html += "</div></div>";
    readerBody.innerHTML = html;
    readerBody.parentElement.scrollTop = 0;
  }

  function openReader(key) {
    lastFocus = document.activeElement;
    render(key);
    reader.classList.add("open");
    reader.setAttribute("aria-hidden", "false");
    document.body.classList.add("reader-open");
  }
  function closeReader() {
    reader.classList.remove("open");
    reader.setAttribute("aria-hidden", "true");
    document.body.classList.remove("reader-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll("[data-open]").forEach(function (btn) {
    btn.addEventListener("click", function () { openReader(btn.dataset.open); });
  });
  reader.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeReader);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && reader.classList.contains("open")) closeReader();
  });

  /* ---------------------------------------------------------------------
     Tweaks panel hook — apply CSS variable changes posted from the panel
     --------------------------------------------------------------------- */
  var TYPE = {
    "Editorial serif accents": { serif: '"Newsreader", Georgia, serif' },
    "All Archivo (brand sans)": { serif: '"Archivo", sans-serif' },
    "Warm slab editorial": { serif: '"Newsreader", Georgia, serif' }
  };
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!d || d.type !== "tweak") return;
    var root = document.documentElement.style;
    if (d.key === "accent") root.setProperty("--accent", d.value);
    if (d.key === "ground") root.setProperty("--ground", d.value);
    if (d.key === "serif") root.setProperty("--serif", d.value);
  });
})();
