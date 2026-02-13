# Deployment Guide - GitHub Pages

This guide will help you deploy your wedding website to GitHub Pages for free hosting.

---

## Prerequisites

- Git installed on your computer
- GitHub account
- Your repository: `https://github.com/codingcane/2026_02_12_WeddingWebsite`

---

## Step 1: Push Your Code to GitHub

All your website files are already committed locally. Now push them to GitHub:

```bash
# Navigate to your project directory
cd /home/ian/Documents/GitHub/2026_02_12_WeddingWebsite

# Push to GitHub
git push origin main
```

**Note:** You may need to authenticate with GitHub. If prompted:
- Enter your GitHub username
- For password, use a **Personal Access Token** (not your GitHub password)
  - Create one at: https://github.com/settings/tokens
  - Select scopes: `repo` (full control of private repositories)
  - Copy the token and use it as your password

**Alternative:** If you have SSH set up, you can use SSH instead:
```bash
git remote set-url origin git@github.com:codingcane/2026_02_12_WeddingWebsite.git
git push origin main
```

---

## Step 2: Enable GitHub Pages

1. **Go to your repository:**
   - Visit: https://github.com/codingcane/2026_02_12_WeddingWebsite

2. **Navigate to Settings:**
   - Click the **Settings** tab at the top of your repository

3. **Find Pages section:**
   - In the left sidebar, click **Pages** (under "Code and automation")

4. **Configure Source:**
   - Under "Build and deployment"
   - **Source:** Deploy from a branch
   - **Branch:** Select `main`
   - **Folder:** Select `/ (root)`
   - Click **Save**

5. **Wait for deployment:**
   - GitHub will build and deploy your site (takes 1-2 minutes)
   - Refresh the page to see the deployment status

6. **Get your site URL:**
   - Your site will be live at:
     ```
     https://codingcane.github.io/2026_02_12_WeddingWebsite/
     ```
   - This URL will be shown at the top of the Pages settings

---

## Step 3: Configure Google Apps Script

Before your RSVP form will work, you need to set up the Google Sheets backend:

1. **Follow the setup guide:**
   - Open `docs/SETUP.md` in your project
   - Follow all steps to create the Google Sheet and Apps Script
   - Copy your Apps Script Web App URL

2. **Update the configuration:**
   - Edit `js/config.js`
   - Replace `YOUR_APPS_SCRIPT_URL_HERE` with your actual URL
   - Update all wedding details (names, dates, venues, etc.)

3. **Commit and push changes:**
   ```bash
   git add js/config.js
   git commit -m "Configure Google Apps Script and wedding details"
   git push origin main
   ```

4. **Wait for redeployment:**
   - GitHub Pages will automatically redeploy (1-2 minutes)
   - Your changes will be live

---

## Step 4: Test Your Website

1. **Visit your live site:**
   - Go to: https://codingcane.github.io/2026_02_12_WeddingWebsite/

2. **Test navigation:**
   - Click through Home, RSVP, and Details pages
   - Test on mobile (use browser dev tools or actual phone)

3. **Test RSVP form:**
   - Fill out the form completely
   - Submit
   - Check your Google Sheet for the submission

4. **Verify countdown timer:**
   - Check that the countdown on the home page is working

---

## Step 5: Customize Your Content

Now personalize the website with your actual wedding information:

### Update Wedding Details

Edit `js/config.js`:
```javascript
WEDDING_DATE: '2026-08-15T16:00:00',  // Your actual date
COUPLE_NAMES: 'Your Names',
CEREMONY_VENUE: 'Your Venue Name',
// ... and all other details
```

### Replace Images

1. **Add your photos** to the `images/` folder:
   - Wedding photos
   - Venue photos
   - Couple photos

2. **Update image references** in HTML files:
   - `index.html` - Hero background and welcome section
   - `details.html` - Update if you have specific venue photos

3. **Create a favicon:**
   - Use https://favicon.io to create one
   - Save as `images/favicon.ico`

### Update Content

Edit the HTML files to match your wedding:

- `index.html` - Welcome message
- `details.html` - Timeline, FAQ, accommodations
- `rsvp.html` - RSVP deadline date

### Commit Your Changes

```bash
git add .
git commit -m "Personalize wedding website content"
git push origin main
```

---

## Optional: Custom Domain

Want to use your own domain (e.g., `ourwedding.com`) instead of GitHub's URL?

### Purchase a Domain

Buy a domain from:
- Namecheap (https://www.namecheap.com)
- Google Domains (https://domains.google.com)
- GoDaddy (https://www.godaddy.com)

Cost: ~$10-15 per year

### Configure DNS

1. **In your domain registrar:**
   - Add DNS records:
     ```
     Type: CNAME
     Host: www
     Value: codingcane.github.io

     Type: A
     Host: @
     Values:
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
     ```

2. **In your GitHub repository:**
   - Create a file named `CNAME` in the root directory
   - Add your domain (e.g., `ourwedding.com`)
   - Commit and push

3. **In GitHub Pages settings:**
   - Enter your custom domain
   - Check "Enforce HTTPS"

4. **Wait for DNS propagation:**
   - Can take up to 24-48 hours
   - Usually works within a few hours

---

## Updating Your Website

Any time you want to make changes:

1. **Edit files locally** in your project directory
2. **Test locally** (optional: use Live Server in VS Code)
3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. **Wait 1-2 minutes** for GitHub Pages to redeploy
5. **Clear browser cache** and refresh to see changes

---

## Monitoring RSVPs

### View Responses

- Open your Google Sheet
- See all RSVP responses in real-time
- Responses are automatically timestamped

### Export Data

```
File → Download → Choose format
```

Options:
- Excel (.xlsx) - For Excel or Numbers
- CSV (.csv) - For any spreadsheet app
- PDF - For printing

### Get Notifications

Set up email notifications for new RSVPs:

1. In Google Sheets: **Tools → Notification rules**
2. Choose: "Any changes are made"
3. Select: "Notify me with... Email - immediately"
4. Click **Save**

You'll get an email every time someone RSVPs!

---

## Troubleshooting

### Website not showing latest changes?

**Solution:** Clear your browser cache or use incognito/private browsing

### 404 Error on GitHub Pages?

**Solutions:**
1. Verify Pages is enabled in repository settings
2. Ensure `index.html` exists in root directory
3. Wait a few minutes for initial deployment
4. Check GitHub Actions tab for build errors

### RSVP form not working?

**Solutions:**
1. Check `js/config.js` has correct Apps Script URL
2. Verify Apps Script is deployed with "Anyone" access
3. Test the Apps Script URL directly (should show "API is running")
4. Check browser console for JavaScript errors (F12)

### Images not loading?

**Solutions:**
1. Check image paths are correct (case-sensitive!)
2. Verify images are committed to repository
3. Use relative paths (e.g., `images/photo.jpg`, not `/images/photo.jpg`)

### Countdown timer not working?

**Solution:**
- Verify the date format in `config.js` is correct: `YYYY-MM-DDTHH:MM:SS`
- Check browser console for JavaScript errors

---

## Performance Tips

### Optimize Images

Before uploading images:
1. Resize to appropriate dimensions (max 1920px width)
2. Compress using TinyPNG or ImageOptim
3. Keep file sizes under 500KB each

### Test Performance

Use Google Lighthouse:
1. Open your site in Chrome
2. Press F12 (DevTools)
3. Click "Lighthouse" tab
4. Run audit
5. Aim for scores > 90

---

## Security & Privacy

### RSVP Data Privacy

- Google Sheet is private (only you can access)
- Apps Script URL is public but only accepts POST requests
- No guest data is exposed to the public
- SSL/HTTPS is enforced by GitHub Pages

### Best Practices

1. **Don't commit sensitive data:**
   - No passwords or API keys in code
   - Google Apps Script URL is safe to commit (it's public anyway)

2. **Review submissions:**
   - Check for spam submissions
   - Delete test RSVPs before your actual wedding

3. **Backup your data:**
   - Download Google Sheet periodically
   - Keep a local backup of RSVP responses

---

## Cost Summary

| Service | Cost |
|---------|------|
| GitHub Pages Hosting | FREE |
| Google Sheets | FREE |
| Google Apps Script | FREE |
| Domain (optional) | $10-15/year |
| **Total** | **$0** (or $10-15 with custom domain) |

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Enable GitHub Pages
3. ⏳ Set up Google Apps Script (see `SETUP.md`)
4. ⏳ Customize content in `config.js` and HTML files
5. ⏳ Add your wedding photos
6. ⏳ Test RSVP form end-to-end
7. ⏳ Share your website URL with guests!

---

## Need Help?

- **GitHub Pages Documentation:** https://docs.github.com/pages
- **Google Apps Script Docs:** https://developers.google.com/apps-script
- **Check the browser console** (F12) for JavaScript errors
- **Review `docs/SETUP.md`** for Apps Script troubleshooting

---

**Congratulations!** Your wedding website is ready to go live. Once you push to GitHub and enable Pages, you'll have a beautiful, functional website at zero cost! 🎉
