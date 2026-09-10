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
    waymaker: {
      lbl: "Case Study — Web Build, Custom Application & Automation",
      cat: "Web Build, Custom Application & Automation",
      title: "WayMaker Ink",
      link: { href: "https://www.waymakerink.com", label: "Visit waymakerink.com" },
      media: { type: "browser", addr: "waymakerink.com", src: "assets/WayMakerInk/waymaker_ink_home.jpg", alt: "WayMaker Ink — tattoo studio home page" },
      sections: [
        ["Overview", "WayMaker Ink is a tattoo and piercing studio in Grundy Center, Iowa. We built the studio a seven-page site and, behind it, a <strong>custom request queue</strong> that keeps the artist in control of the calendar, takes the deposit at the point of booking, and files the signed waiver on its own — without anyone touching a spreadsheet or a paper form."],
        ["The Challenge", "Bookings were running out of Facebook Messenger. Every consultation started as a DM, every date got negotiated by hand, and every waiver was a piece of paper that had to be scanned and filed after the client walked out.<br><br>Tattoo work isn't a haircut. Session length depends on the piece, the placement and the detail, and none of that is knowable from a dropdown. A conventional click-a-time system would have let a walk-in book a two-hour slot for a full sleeve, and the artist would find out on the day. The studio needed the convenience of online booking without giving up the judgment call that has to come first."],
        ["The Approach", "We inverted the usual flow. <strong>Nothing reaches the calendar until the artist approves it.</strong><br><br>The client doesn't pick a time — they describe the work and send reference photos. That request lands in a queue. The artist reviews it, sets the session tier, and writes back in their own words. Only then does a booking link get issued, and only then does the calendar open up.<br><br>The result feels like online booking to the client and like a triaged worklist to the artist. The studio kept every bit of control it had over Messenger, and lost all of the admin.",
          { src: "assets/WayMakerInk/waymaker_ink_get_started.png", alt: "WayMaker Ink appointment request hub — begin a request", caption: "Every path through the site funnels to one action: Get Started." }],
        ["Intake: Three Ways In", "One form on a dedicated subdomain, with three paths through it — <strong>tattoo, piercing and touch-up</strong> — switched at the top and routed to the artist the client picked. The client describes the piece, the placement, the size and the style, and attaches up to five reference photos. Touch-up requests require at least one, because a faded line is something you have to see.<br><br>The form does the studio's screening for it: an age gate on tattoo work, a confirmation the client has to tick, and a closing line that says plainly this is a request and not a confirmed booking. No calendar in sight. This is the gate.",
          { src: "assets/WayMakerInk/waymaker_ink_request_form.png", alt: "The WayMaker Ink appointment request form — a Tattoo / Piercing / Touch Up switch, client details, a description of the piece, and a reference upload", caption: "One form, three paths. The tattoo route shown: the brief, the age gate, and a five-photo reference upload — with no calendar anywhere on it.", tall: true }],
        ["The Artist Portal", "Every request lives in a <strong>custom web application</strong> at the studio's own subdomain until it's handled. Each artist signs in and sees their own queue; the owner can switch between artists or see both at once. Live counters break the new work down by type — tattoo, piercing, touch-up — and one row of filters covers the rest: <strong>needs a response, link sent, declined</strong>. “What still needs me” is one tap rather than a scroll through an inbox, and a single search box finds any request by name, email, phone or request ID.<br><br>Open a request and the artist gets the reference photos at a size worth judging, the client's own description, the placement, the size and the style, how they heard about the studio, and whether this is their first tattoo.<br><br>The response panel is the whole job on one screen: pick the session tier from a priced list, edit the estimate the client will actually see, and write a message in your own words — or decline, which sends the note without a price or a booking link. It's built mobile-first, because the artist is standing in the shop holding a phone, not sitting at a desk.<br><br>Once answered, the request keeps its own record: what was quoted, when it went out, the message that was sent, a timestamped history, and a one-click resend of the booking link if the client loses the email.",
          [{ src: "assets/WayMakerInk/waymaker_ink_portal_dashboard.png", alt: "The WayMaker Ink request queue — counters by request type, status filters, and a list of incoming requests", caption: "The queue. Counters by type, filters by status, and every request in one place. Test data throughout." },
           { src: "assets/WayMakerInk/waymaker_ink_request_profile.png", alt: "A single request open in the portal, with the client's brief and references on the left and the response panel on the right", caption: "One request, one screen: the brief and the references on the left, the priced tiers and the artist's message on the right.", tall: true }]],
        ["Booking and Deposit", "An approved client receives a branded email carrying the artist's message, the estimated session length, the price and a booking link that opens Acuity with the session length already set. Acuity handles the calendar and takes the deposit through Square at the point of booking, and reminders at 48 and 24 hours restate the cancellation policy — so the terms are in front of the client several times before the chair is ever warmed.<br><br>That email is composed and dispatched by an <strong>n8n workflow</strong> running on Fifth Stone Dev's own infrastructure — the same layer that alerts the artist when a request arrives and writes the outcome back to the request record once the client has been answered.",
          [{ src: "assets/WayMakerInk/waymaker_ink_request_profile_sent.png", alt: "A request marked Link sent, showing the estimate that was quoted, the message, a timestamped history and a resend option", caption: "After the response goes out: what was quoted, what was said, when it happened — and a resend if the client loses the email.", tall: true },
           { src: "assets/WayMakerInk/waymakerink_booking_email.png", alt: "The client-facing estimate email — the artist's message, the estimated session and price, and a Book Your Appointment button", caption: "What the client receives. The artist's own words, the estimate, and one button into a calendar that already knows how long to block.", tall: true }]],
        ["Waivers and Automatic Filing", "Separate branded waivers for tattoo and piercing are signed on screen in-shop on arrival. No printing, no clipboard, no “we'll get that from you at the end.”<br><br>What happens next is the part nobody sees. A signed waiver fires a webhook that looks up the client's folder in the studio's Google Drive, creates one if this is their first visit, renders the completed waiver to a PDF and files it. Records accumulate correctly with <strong>zero manual handling</strong>, which matters most in exactly the moment you'd least want to go looking for a paper file.",
          { src: "assets/WayMakerInk/waymaker_ink_workflow.png", alt: "The waiver filing automation — a branching workflow from webhook through folder lookup, PDF rendering and upload to Google Drive", caption: "The filing pipeline behind a signed waiver: look up the client folder, create it if it's their first visit, render the PDF, file it." }]
      ],
      outcomes: [
        ["Approval before the calendar", "no session reaches the schedule until the artist has read the request and set the tier."],
        ["One queue instead of an inbox", "status filters and per-type counters make “what still needs me” one tap, on a phone, in the shop."],
        ["Every quote on the record", "what was estimated, what was said and when it went out is kept against the request, with a one-click resend."],
        ["Deposits collected at booking", "Square takes the deposit at the point of booking rather than the studio chasing it afterward."],
        ["The policy states itself", "cancellation terms appear at booking, in the approval email, and in both the 48- and 24-hour reminders."],
        ["Waivers file themselves", "signed on screen, rendered to PDF, and filed into Google Drive with no manual handling."],
        ["Messenger retired as an intake channel", "every request now arrives structured, attributed and in one place."]
      ],
      tags: ["Squarespace", "Custom Web App", "n8n", "Acuity Scheduling", "Square", "Google Drive"]
    },

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
      html += '<div class="r-section"><h3>' + s[0] + "</h3><p>" + s[1] + "</p>";
      // Optional third element: one inline figure, or an array of them.
      if (s[2]) {
        var figs = Array.isArray(s[2]) ? s[2] : [s[2]];
        figs.forEach(function (f) {
          html += '<figure class="r-figure' + (f.tall ? " tall" : "") + '">' +
            '<img src="' + f.src + '" alt="' + f.alt + '" loading="lazy" />' +
            (f.caption ? "<figcaption>" + f.caption + "</figcaption>" : "") +
            "</figure>";
        });
      }
      html += "</div>";
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
    // Drop a deep-link hash so a refresh doesn't reopen the case.
    if (CASES[location.hash.slice(1)]) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  // Deep links from the home page (portfolio#waymaker) open that case directly.
  function openFromHash() {
    var key = location.hash.slice(1);
    if (CASES[key]) openReader(key);
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);

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
