# Wedding Website

A beautiful, responsive wedding registration website with RSVP functionality.

## Features

- Elegant, mobile-responsive design
- RSVP form with meal preferences and guest count
- Automatic data collection to Google Sheets
- Wedding details and venue information
- Hosted for free on GitHub Pages

## Tech Stack

- HTML5, CSS3, JavaScript (ES6+)
- Google Apps Script for backend
- Google Sheets for data storage
- GitHub Pages for hosting

## Setup Instructions

1. **Configure Google Sheets Integration**
   - Follow the instructions in `docs/SETUP.md` to set up Google Apps Script
   - Add your Apps Script URL to `js/config.js`

2. **Customize Content**
   - Update wedding details in `js/config.js`
   - Replace placeholder images in the `images/` folder
   - Edit content in HTML files as needed

3. **Deploy to GitHub Pages**
   - Push all files to GitHub
   - Go to repository Settings → Pages
   - Set source to "main" branch, root folder
   - Your site will be live at `https://[username].github.io/[repo-name]/`

## Project Structure

```
├── index.html          # Home page
├── rsvp.html          # RSVP form
├── details.html       # Wedding details
├── css/               # Stylesheets
├── js/                # JavaScript files
├── images/            # Images and photos
└── docs/              # Documentation
```

## Cost

Completely free to host and operate using:
- GitHub Pages (free hosting)
- Google Sheets (free data storage)
- Google Apps Script (free backend)

## License

Personal use for your wedding. Feel free to customize as needed!
