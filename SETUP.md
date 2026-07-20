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
| `assets/hero-bg.mp4` | **Header background video** (muted, loops). Keep it short & compressed — aim under ~8 MB. |
| `assets/hero-poster.jpg` | Still frame shown while the header video loads |
| `assets/intro-video.mp4` | **Featured "Watch" video** in the Watch section |
| `assets/intro-poster.jpg` | Thumbnail shown before the Watch video plays |

### Videos
- **Header background video:** drop `assets/hero-bg.mp4` in and it autoplays behind the hero (muted + looping). A light overlay keeps your text readable — if you want the video more visible, lower the opacity of `.hero-video-tint` in `assets/site.css`.
- **Featured video ("Watch" section):** by default it plays your own `assets/intro-video.mp4`. Prefer YouTube? In `index.html`, delete the `<video>` tag in the Watch section and uncomment the `<iframe>` right below it, swapping `YOUR_VIDEO_ID`.
- Both show a clean placeholder until you add the files, so the live site never looks broken.

### Pricing
The homepage pricing now **defaults to yearly** (your best-value option). Visitors can still flip to monthly with the toggle.

## 2) One thing left to wire up
- **HighLevel booking link** — in `index.html`, find `YOUR-HIGHLEVEL-BOOKING-LINK` and paste your High