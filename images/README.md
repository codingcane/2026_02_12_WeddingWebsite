# Images Folder

This folder should contain your wedding photos and images.

## Required Images

1. **favicon.ico** - Website icon that appears in browser tabs
   - Size: 16x16 or 32x32 pixels
   - Format: .ico file
   - You can create one at: https://favicon.io

2. **hero-image.jpg** - Main background image for homepage
   - Recommended size: 1920x1080 pixels
   - Should be a beautiful photo of the wedding venue, couple, or celebration theme
   - Optimize for web (compress to reduce load time)

## Optional Images

3. **couple.jpg** - Photo of the couple for welcome section
   - Recommended size: 800x800 pixels

4. **venue.jpg** - Venue photo for details page
   - Recommended size: 800x600 pixels

## Current Status

Currently, the website uses placeholder images from Unsplash. Replace the URLs in the HTML files with your own images:

- `index.html` - Update the hero background image and welcome section image
- `details.html` - Update accommodation photos if you have better ones

## Image Optimization Tips

1. **Compress images** before uploading:
   - Use tools like TinyPNG (https://tinypng.com)
   - Or ImageOptim (https://imageoptim.com)
   - Target: Keep images under 500KB each

2. **Use appropriate formats:**
   - JPG for photos
   - PNG for graphics with transparency
   - WebP for best compression (modern browsers)

3. **Responsive images:**
   - Consider creating multiple sizes (mobile, tablet, desktop)
   - Use srcset attribute in HTML for optimal loading

## Adding Your Images

1. Place your images in this folder
2. Update the image paths in HTML files:
   ```html
   <!-- Example in index.html -->
   <img src="images/hero-image.jpg" alt="Our wedding venue">
   ```

3. Commit and push to GitHub
4. Your live site will automatically update

---

**Note:** The website will work perfectly without adding custom images - it currently uses professional stock photos. Add your own photos when you're ready to personalize!
