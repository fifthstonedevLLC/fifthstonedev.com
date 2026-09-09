# Case Study: WayMaker Ink

**Fifth Stone Dev LLC — portfolio piece**
September 2026. Copy is paste-ready; anything in `[brackets]` needs a real number or a
decision before publishing.

---

## PART 1 — THE CASE STUDY COPY

### Page title

# From Messenger to a booking pipeline

### Deck / subhead

A custom request queue that keeps the artist in control of the calendar, takes the deposit,
and files the signed waiver — without anyone touching a spreadsheet or a paper form.

---

### Snapshot

| | |
|---|---|
| **Client** | WayMaker Ink — tattoo and piercing studio, Grundy Center, Iowa |
| **Engagement** | June 2026 – September 2026 |
| **Scope** | Website build, custom request forms, artist portal, online booking, digital waivers, automated filing |
| **Stack** | Squarespace · custom web application · n8n · Acuity Scheduling · Square · Google Drive |
| **Ongoing** | Monthly hosting and automation retainer |

---

### The problem

WayMaker Ink was running bookings out of Facebook Messenger. Every consultation started as a
DM, every date got negotiated by hand, and every waiver was a piece of paper that had to be
scanned and filed by hand after the client walked out.

Tattoo work isn't a haircut. Session length depends on the piece, the placement, and the
detail, and none of that is knowable from a dropdown. A conventional click-a-time system would
have let a walk-in book a two-hour slot for a full sleeve, and the artist would find out on
the day. The studio needed the convenience of online booking without giving up the judgment
call that has to come first.

### The approach

We inverted the usual flow. **Nothing reaches the calendar until the artist approves it.**

The client doesn't pick a time — they describe the work and send reference photos. That
request lands in a queue. The artist reviews it, sets the session tier, and writes back. Only
then does a booking link get issued, and only then does the calendar open up.

The result is a system that feels like online booking to the client and like a triaged worklist
to the artist. The studio kept every bit of control it had over Messenger, and lost all of the
admin.

### What we built

**1. The website**
A seven-page Squarespace build. Every path through the site funnels to one action — **Get
Started**.

**2. The request form**
One form on a dedicated subdomain, with three paths through it — tattoo, piercing, and touch-up
— switched at the top and routed to the artist the client picked. The client describes the
piece, the placement, the size and the style, and attaches up to five reference photos. Touch-up
requests require at least one, because a faded line is something you have to see.

The form does the studio's screening for it: an age gate on tattoo work, a confirmation the
client has to tick, and a closing line that says plainly this is a request and not a confirmed
booking. No calendar in sight. This is the gate.

**3. The artist portal**
A custom web application at the studio's own subdomain, where every request lives until it's
handled. Each artist signs in and sees their own queue; the owner can switch between artists or
see both at once. Live counters break the new work down by type — tattoo, piercing, touch-up —
and one row of filters covers the rest: **needs a response, link sent, declined**, plus an all
view. "What still needs me" is one tap, not a scroll through an inbox, and a single search box
finds any request by name, email, phone, or request ID.

Open a request and the artist gets the reference photos at a size worth judging, the client's
own description, the placement, the size and the style, how they heard about the studio, and
whether this is their first tattoo.

The response panel is the whole job on one screen: pick the session tier from a priced list,
edit the estimate the client will actually see, and write a message in your own words — or
decline, which sends the note with no price and no booking link. Everything is built
mobile-first, because the artist is standing in the shop holding a phone, not sitting at a desk.

Once answered, the request keeps its own record: what was quoted, when it went out, the message
that was sent, a timestamped history, and a one-click resend of the booking link if the client
loses the email.

When a request comes in, the artist gets a short notification email carrying a single link
straight to that request in the portal — the alert points to the work, and the work happens in
one place.

**4. Booking and deposit**
An approved client receives a branded email carrying the artist's message, the estimated session
length, the price, and a booking link that opens Acuity with the session length already set.
Acuity handles the calendar and takes the deposit through Square at the point of booking, and
reminders at 48 and 24 hours restate the cancellation policy — so the terms are in front of the
client several times before the chair is ever warmed.

The email is careful about what it promises: it states that the estimate covers the time booked
rather than a fixed price, and that a bigger piece may need a second session the artist will
raise before more time is booked. Keep that nuance if you rewrite this section — it's the line
that stops an estimate reading as a quote.

That email is composed and dispatched by an n8n workflow running on Fifth Stone Dev's own
infrastructure — the same layer that alerts the artist when a request arrives and writes the
outcome back to the request record once the client has been answered.

**5. Digital waivers**
Separate branded waivers for tattoo and piercing, signed on screen in-shop on arrival. No
printing, no clipboard, no "we'll get that from you at the end."

**6. Automatic filing**
Completed waivers generate a PDF and file themselves into the studio's Google Drive, one folder
per client. Records accumulate correctly with zero manual handling — which matters most in
exactly the moment you'd least want to go looking for a paper file.

### Results

> **Fill these in before publishing. Do not ship the piece with invented numbers — pull them
> from the portal, from Acuity's reporting, and from Nic directly.**

- **`[X]` requests handled** through the queue in the first `[X]` weeks
- **`[X]` hours a week** of back-and-forth messaging eliminated
- **`[X]`-minute median response time**, down from `[X]`
- **`[X]%` of waivers** now filed automatically
- **Deposits collected at booking**, not chased afterward
- **`[X]` no-shows** since launch, against `[X]` before

*Suggested framing if hard numbers are thin: lead with the qualitative shift — "every booking
now arrives pre-qualified, priced, paid, and documented" — and add metrics in an update once
the retainer period has produced a few months of data. Response time is the easiest real number
to get and the most persuasive to a prospect, since it's the one their own customers feel.*

### In the client's words

> `[Testimonial from Nic — ask for two or three sentences on what changed day to day. Best
> prompt: "What used to take you an hour that doesn't anymore?" Second best: "What can you see
> now that you couldn't before?"]`
>
> **— Nic Sinnwell, Owner & Lead Artist, WayMaker Ink**

### What's next

Fifth Stone Dev continues to host and maintain the portal, the request database, and the
booking-to-waiver-to-Drive pipeline under a monthly retainer.

---

### Closing CTA

**Running your business out of a DM inbox?**
That's not a website problem — it's a workflow problem, and it's fixable. Fifth Stone Dev
builds the site *and* the machinery behind it.

[Start a conversation →]

---

## PART 2 — SCREENSHOTS AND PAGE LAYOUT

### Asset status — September 2026

All WayMaker assets now live in `assets/WayMakerInk/`. Captured so far:

| File | Shot |
|---|---|
| `waymaker_ink_home.jpg` | #1 homepage desktop |
| `waymaker_ink_get_started.png` | #3 Get Started hub |
| `waymaker_ink_request_form.png` | #5 request form |
| `waymaker_ink_portal_dashboard.png` | **#6 the queue** |
| `waymaker_ink_request_profile.png` | **#8 + #9 request detail and response panel, one screen** |
| `waymaker_ink_request_profile_sent.png` | **#9b the answered request — quote, history, resend** |
| `waymakerink_booking_email.png` | #12 the client-facing estimate email |
| `waymaker_ink_workflow.png` | #14 the n8n canvas |

Still to shoot: **#7 the queue on mobile** (the copy claims mobile-first; this is the evidence),
#2 homepage mobile, #4 the before/after booking page, #11 Acuity with the deposit step, and the
waiver and Drive shots (#13 series).

### Read this first: seed a demo request

Portal screenshots contain the most sensitive data in the entire system — client full name,
email, phone, their description of the work, and their reference photographs. Blurring six
fields per shot is error-prone and looks amateur in a portfolio.

**Instead: create demo requests in the portal and screenshot those.** The captured portal shots
above already follow this — `example.test` addresses, 555 numbers, placeholder reference tiles —
so hold that line for anything shot from here on.

The same applies to the Drive folder view and any email screenshots.

### Suggested page order

| Position | Shot | Purpose |
|---|---|---|
| Hero | #1 Homepage desktop | Portfolio thumbnail |
| After "The problem" | #4 Before/after booking page | Sets up the pain |
| After "The approach" | #14 Pipeline diagram | Makes the inversion concrete |
| **After "What we built" §3** | **#6, #7, #8+9 portal block** | **The centerpiece — give this the most space** |
| After §4 | #9b answered request, then #12 the estimate email | The reply, and what the client gets |
| After §4 | #11 Acuity + deposit | Client-side proof |
| After §6 | #13 Drive filing | The unglamorous win |
| Inline with the portal block | #10 Notification email | Shows how a request reaches the artist |

### ★ The portal — your best assets

**6. ★ The queue, desktop, "Needs a response" filter active** — *captured*
Counters by request type across the top, the status filter row beneath, and several rows with
type badges, ages, artist attribution and request IDs. This is the single most important image
on the page. It shows a *system*, not a form.

**7. ★ The queue on mobile** — *still needed*
Pair with #6 side by side. Mobile-first is a claim in the copy; this is the evidence. If you
only publish one portal shot, publish this one — the prospect is also holding a phone.

**8 + 9. ★ Request detail with the response panel** — *captured, one image*
The shipped shot carries both halves at once: contact, the brief, placement, size, style and
the reference tiles on the left; the priced tier list, the editable estimate, the message box
and Send / Decline on the right. It runs tall — let it.

**9b. ★ The answered request** — *captured*
The same screen after the response has gone: what was quoted, the message that was sent, a
timestamped history, and the resend-booking-link action. Good evidence that the record outlives
the reply.

**9c. The status filter row**
Tight crop of *Needs a response / Link sent / Declined / All*. Optional, but useful as a small
inline graphic if the page needs a break between larger images.

**9d. Touch-up request showing prior history**
The returning-client marker. Only worth including if you write a caption explaining it,
otherwise it reads as a normal detail screen.

**9e. Login screen**
Low information value, but establishes that this is a real application with real accounts. Use
it small, or skip it.

### The site

**1. ★ Homepage hero — desktop**
Above the fold, browser chrome cropped. This is the portfolio grid thumbnail.

**2. Homepage — mobile**
Side by side with #1.

**3. Get Started CTA in context**
Tight crop. Visual anchor for "every path funnels to one action."

**4. Before / after of the booking page**
If you have a screenshot or an archive.org capture of the old Messenger-only page, this is one
of the most persuasive images available to you. Check `web.archive.org` for waymakerink.com
before giving up on it.

### Intake and client-side

**5. ★ The request form** — *captured*
The shipped shot is the empty tattoo path, which works: the Tattoo / Piercing / Touch Up switch
reads clearly at the top, and the age gate and reference upload are both visible. If you ever
reshoot it, a partially-filled version with demo content would sell the brief harder — an empty
form shows the structure, a filled one shows the conversation.

**10. ★ The notification email**
The alert the artist receives when a request lands. Crop tight so the single portal link is
clearly the one thing in it. Caption it — "every request arrives as one link into the queue" —
so the reader connects it to the portal shots beside it.

**11. ★ Acuity booking page with the deposit step**
Calendar plus the Square deposit field in one frame if possible.

**12. Client response and reminder emails**
Stack the branded approval email, the 48-hour, and the 24-hour reminder as three phone frames
in a row. Highlight the cancellation line.

### Waivers and filing

**13. ★ Waiver on a tablet, in the shop**
An actual photo beats a screenshot. Signature step on screen, shop out of focus behind it. A
tablet mockup with the waiver dropped in works if a real photo isn't possible.

**13b. Google Drive folder view**
Demo names only. The point is the tidy timestamped structure, not the contents.

**13c. A generated waiver PDF**
Single page, branded header, demo data.

### The machinery

**14. The n8n workflow canvas**
The alert workflow and the client-response workflow, zoomed so the shape of the branching reads
but no individual node is legible. This is the one asset that makes "we build the machinery"
concrete rather than rhetorical, and it's the shot that separates you from a Squarespace
reseller.

⚠️ **Crop the browser chrome, the URL bar, the tab title, and the n8n sidebar before you
publish.** Your instance hostname must not appear anywhere in the image. Check the corners and
any breadcrumb or workspace label — a self-hosted automation endpoint is not something to hand
out with a portfolio piece. Same rule for the webhook URLs inside any node panel: don't open a
node.

### Custom graphic

**15. Pipeline diagram**
Worth building rather than screenshotting: **Request → Queue → Review → Approve → Book →
Waiver → File**. Seven steps, one line, Fifth Stone brand colours (navy `#1a252f`, slate
`#2c3e50`, tan `#b8956a` accent — note that red is *not* a brand colour). This graphic is
reusable in every proposal you send from here on, so it earns the hour it takes to make.

---

## PART 3 — BEFORE YOU PUBLISH

**Verify the live site.** As of the August handover the public site listed **Friday as closed**
— it's actually 10am–5pm. Any screenshot of the hours block bakes that error into your
portfolio permanently. Check the site, Acuity availability, and the Google Business Profile
before you shoot anything.

**Don't overclaim the booking loop.** The portal can't confirm whether an approved client
actually booked, because Acuity's API sits behind a plan the studio isn't on. The copy above is
written carefully around this — it says the client *receives a booking link*, never that the
system *tracks the booking through to confirmation*. Keep it that way if you rewrite anything.

**The storage / photo-privacy copy was cut, September 2026.** An earlier version carried a
"request database" section describing reference photos as never publicly addressable, served by
short-lived links — and then repeated the same claim as an outcome bullet. Both were removed
from the published case study at the client's request. Don't reintroduce either without asking:
it was cut deliberately, not lost in an edit.

**There is no archive and no undo.** An earlier draft of this document claimed a fourth
"archived" state and a sixty-second undo after sending. Neither exists: the queue has three
status filters (needs a response, link sent, declined) plus an all view, and the delete panel
says in as many words that removing a request is permanent. Both claims are now corrected here
and in the portfolio draft. Don't reintroduce them — the screenshots contradict them on the
same page.

**Get Nic's written OK.** Naming the client, using the logo, quoting him, screenshotting the
portal, and photographing the shop are five separate permissions. One email covering all five
is fine, but get it in writing — this is a public commercial page.

**Three things to decide:**

- **Naming the platforms — settled for now.** n8n is named, in the stack row and once in the
  body copy. The database is not named, and as of September 2026 the published copy no longer
  describes the storage layer at all — the "request database" section was cut (see below), so
  the only remaining mention is the hosting line in "What's next". If you ever reinstate a
  storage section, decide the naming question then and keep the image captions consistent with
  whichever way you go.
- **Never publish the n8n host.** The copy says "Fifth Stone Dev's own infrastructure" and names
  no URL. Hold that line in the captions too, and see the crop warning on shot #14 — the
  hostname is far more likely to leak through a screenshot than through prose.
- **Second artist — rule lifted, September 2026.** She is named on WayMaker's own public site,
  so screenshots that show her are fine: the Get Started hub lists both artists as cards, and
  the queue shows a Both / Nic / Laynie switch plus per-artist attribution on the rows. Neither
  needs cropping. The body copy still says "the artist" and "each artist" throughout, which
  reads better than naming either of them in prose — keep it that way, but the images no longer
  have to be scrubbed.