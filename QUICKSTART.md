# Quick Start Guide - Wedding Website

Welcome! Your complete wedding registration website is ready to deploy. Follow these steps to get it live.

---

## What You Have

✅ **A complete, production-ready wedding website with:**
- Beautiful responsive home page with countdown timer
- RSVP form with meal preferences and guest management
- Wedding details page with venue info, timeline, and FAQs
- Google Sheets integration for automatic RSVP collection
- Mobile-first design that works on all devices
- Professional styling with elegant color scheme

---

## 3-Step Launch Process

### Step 1: Push to GitHub (5 minutes)

Your code is ready and committed locally. Push it to GitHub:

```bash
cd /home/ian/Documents/GitHub/2026_02_12_WeddingWebsite
git push origin main
```

If you need to authenticate:
- Use a GitHub Personal Access Token (create at: https://github.com/settings/tokens)
- Or set up SSH authentication

**Repository URL:** https://github.com/codingcane/2026_02_12_WeddingWebsite

---

### Step 2: Enable GitHub Pages (2 minutes)

1. Go to: https://github.com/codingcane/2026_02_12_WeddingWebsite/settings/pages
2. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
3. Click **Save**
4. Wait 1-2 minutes for deployment

**Your website will be live at:**
```
https://codingcane.github.io/2026_02_12_WeddingWebsite/
```

---

### Step 3: Set Up Google Sheets Backend (15 minutes)

For the RSVP form to work, follow the detailed setup guide:

**Read: `docs/SETUP.md`**

Quick summary:
1. Create a Google Sheet for responses
2. Add the Apps Script code (copy/paste provided)
3. Deploy as Web App
4. Copy the URL to `js/config.js`
5. Push the update to GitHub

---

## Customize Your Website

### Essential: Update Wedding Details

Edit `js/config.js` with your actual information:

```javascript
WEDDING_DATE: '2026-08-15T16:00:00',  // ← Change this
COUPLE_NAMES: 'Jane & John',          // ← Change this
BRIDE_NAME: 'Jane',                   // ← Change this
GROOM_NAME: 'John',                   // ← Change this

CEREMONY_VENUE: 'Beautiful Garden Chapel',      // ← Change this
CEREMONY_ADDRESS: '123 Wedding Lane...',        // ← Change this
CEREMONY_TIME: '4:00 PM',                       // ← Change this

RECEPTION_VENUE: 'Grand Ballroom',              // ← Change this
RECEPTION_ADDRESS: '456 Celebration Ave...',    // ← Change this
RECEPTION_TIME: '6:00 PM',                      // ← Change this

CONTACT_EMAIL: 'wedding@example.com',           // ← Change this
CONTACT_PHONE: '(555) 123-4567',                // ← Change this
```

After editing:
```bash
git add js/config.js
git commit -m "Update wedding details"
git push origin main
```

---

### Optional: Add Your Photos

1. Add photos to `images/` folder
2. Update image references in HTML files
3. See `images/README.md` for details

Currently using beautiful stock photos - your site looks great as-is!

---

### Optional: Customize Content

Edit the HTML files to match your style:

- `index.html` - Welcome message, hero section
- `rsvp.html` - RSVP deadline message
- `details.html` - Timeline, FAQs, accommodation recommendations

---

## File Structure

```
2026_02_12_WeddingWebsite/
├── index.html              # Home page
├── rsvp.html              # RSVP form
├── details.html           # Wedding details
├── css/                   # All stylesheets
│   ├── main.css          # Design system, variables
│   ├── layout.css        # Navigation, hero, footer
│   ├── components.css    # Buttons, forms, cards
│   └── pages.css         # Page-specific styles
├── js/                    # All JavaScript
│   ├── config.js         # ⚠️ UPDATE THIS FIRST!
│   ├── main.js          # Navigation, countdown, utilities
│   └── rsvp-form.js     # Form validation and submission
├── images/                # Your wedding photos
├── docs/
│   ├── SETUP.md          # 📖 Google Apps Script guide
│   └── DEPLOYMENT.md     # 📖 Deployment guide
└── README.md             # Project overview
```

---

## Testing Your Website

### Test Locally (Optional)

If you have VS Code with Live Server:
1. Right-click `index.html`
2. Select "Open with Live Server"
3. Test all pages and features

### Test Live Site

After deployment:
1. Visit your GitHub Pages URL
2. Test all pages on desktop and mobile
3. Submit a test RSVP
4. Verify it appears in your Google Sheet

---

## Documentation

| Document | Purpose |
|----------|---------|
| **QUICKSTART.md** (this file) | Get started in 3 steps |
| **README.md** | Project overview and tech stack |
| **docs/SETUP.md** | Google Apps Script backend setup |
| **docs/DEPLOYMENT.md** | Detailed deployment and customization |
| **images/README.md** | Image optimization and guidelines |

---

## Common Questions

### Do I need to know how to code?

**No!** Everything is ready to use. Just:
1. Push to GitHub
2. Enable Pages
3. Update `config.js` with your details

### How much does this cost?

**$0** - Completely free with:
- GitHub Pages (free hosting)
- Google Sheets (free data storage)
- Google Apps Script (free backend)

Optional: Custom domain (~$12/year)

### Can I customize the colors?

**Yes!** Edit the CSS variables in `css/main.css`:
```css
:root {
  --color-primary: #8B7355;    /* Change these */
  --color-accent: #D4AF37;     /* to your colors */
  --color-cream: #FAF7F2;
}
```

### How do I view RSVP responses?

Open your Google Sheet - all responses appear automatically with timestamps!

### Can guests edit their RSVP?

They can submit a new one. You'll see both submissions and can use the most recent.

### What if I need help?

1. Check the documentation files
2. Review browser console for errors (F12)
3. See troubleshooting sections in guides
4. Check that Google Apps Script is properly configured

---

## Next Actions

- [ ] **Immediate:** Push code to GitHub (`git push origin main`)
- [ ] **Immediate:** Enable GitHub Pages in repository settings
- [ ] **Important:** Follow `docs/SETUP.md` to configure Google Sheets
- [ ] **Important:** Update wedding details in `js/config.js`
- [ ] **Soon:** Add your wedding photos to `images/`
- [ ] **Soon:** Customize HTML content to match your style
- [ ] **Before launch:** Test RSVP form end-to-end
- [ ] **When ready:** Share your website URL with guests!

---

## Support & Resources

- **GitHub Pages:** https://pages.github.com
- **Google Sheets API:** https://developers.google.com/sheets/api
- **Web Accessibility:** https://www.w3.org/WAI/

---

## Success Checklist

When you can check all these boxes, you're ready to share with guests:

- [ ] Website is live on GitHub Pages
- [ ] Google Apps Script is configured and deployed
- [ ] `config.js` has your actual wedding details
- [ ] Test RSVP successfully saved to Google Sheet
- [ ] All pages load correctly on mobile and desktop
- [ ] Countdown timer shows correct wedding date
- [ ] Contact information is accurate
- [ ] You've removed any test RSVPs from Google Sheet

---

**You're all set!** 🎉

Your wedding website is professional, fully functional, and ready to share with your guests. Enjoy planning your special day!

---

**Quick Commands:**

```bash
# Push to GitHub
git push origin main

# Update config and redeploy
git add js/config.js
git commit -m "Update wedding details"
git push origin main

# Add new images and redeploy
git add images/
git commit -m "Add wedding photos"
git push origin main
```

**Your live site:** https://codingcane.github.io/2026_02_12_WeddingWebsite/
