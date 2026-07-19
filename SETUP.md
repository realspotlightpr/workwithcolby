# ColbyFifer.com — Setup & Deploy Guide

A 4-page static site. Everything shares one stylesheet and one script, so edits stay consistent.

```
index.html            → homepage
operator.html         → The Operator service page
growth-partner.html   → The Growth Partner service page
websites.html         → Website Builds service page
assets/site.css       → all styling + animations
assets/app.js         → motion, counters, toggle, tabs, FAQ
assets/  (add images) → your photos + logos go here
```

## 1) Drop in your images (exact filenames)
Save these into the `assets/` folder. Until you do, the site shows clean gradient placeholders — nothing looks broken.

| Filename | Which image |
|---|---|
| `assets/colby-1.jpg` | Beach selfie with the dog (homepage hero) |
| `assets/colby-2.jpg` | Sunset cliff photo (About section) |
| `assets/spotlight-pr.png` | Spotlight Puerto Rico logo |
| `assets/booked-bison.png` | Booked Bison logo |
| `assets/day1.png` | Day 1 banner/logo |
| `assets/vlog-1.jpg`, `vlog-2.jpg` | Vlog thumbnails (optional) |
| `assets/reel-1.jpg`, `reel-2.jpg` | Reel thumbnails (optional) |
| `assets/blog-1.jpg`, `blog-2.jpg` | Blog cover images (optional) |

## 2) One thing left to wire up
- **HighLevel booking link** — in `index.html`, find `YOUR-HIGHLEVEL-BOOKING-LINK` and paste your HighLevel calendar booking URL. That powers the "Book a Call" button.
  - *Tip:* to embed the calendar directly on the page instead of linking out, replace the whole `<div class="text-cta" ...>Book a Call...</div>` block with your HighLevel iframe embed code.

Already done for you: your **phone number (787-549-3076)** powers every "Text Me Now" button, and your **Skool link** is wired throughout. There is **no email contact form** — just Text and Book a Call, as requested.

## 3) Update your live numbers
In `index.html`, the "EDIT YOUR LIVE NUMBERS HERE" block controls the animated stats. Change the `data-count` / `data-suffix` values and the reach-ticker text.

## 4) Publish
- **Fastest:** drag the whole folder into **Netlify Drop** (app.netlify.com/drop) — deploys in seconds.
- **GitHub Pages / Vercel:** connect the repo (see GITHUB-PUSH.md) and enable Pages or import to Vercel.
Then point ColbyFifer.com at it.

> Note: Your Day 1 banner art says **$19/mo founding**, but you told me **$17/mo** — the site currently uses $17. Tell me which is correct and I'll make it consistent.
