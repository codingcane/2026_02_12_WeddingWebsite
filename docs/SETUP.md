## Google Apps Script Setup Guide

This guide will help you set up the Google Apps Script backend for your wedding RSVP form. Follow these steps carefully to enable form submissions to Google Sheets.

---

## Overview

The RSVP form on your website will submit data to a Google Apps Script Web App, which then stores the responses in a Google Sheet. This is completely free and doesn't require any third-party services.

**What you'll need:**
- A Google account
- About 15 minutes

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it **"Wedding RSVP Responses"**
4. Set up the column headers in the first row:

| Column | Header Name |
|--------|------------|
| A | Timestamp |
| B | Guest Name |
| C | Email |
| D | Phone |
| E | Attending |
| F | Guest Count |
| G | Guest Names |
| H | Meal Preferences |
| I | Dietary Restrictions |
| J | Special Requests |

5. **Optional:** Format the sheet
   - Make the header row bold
   - Freeze the header row (View → Freeze → 1 row)
   - Add background color to headers
   - Set column widths as needed

---

## Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. This opens the Apps Script editor in a new tab
3. You'll see a default `function myFunction() {}` - delete this

---

## Step 3: Add the Apps Script Code

Copy and paste the following code into the editor:

```javascript
/**
 * Wedding RSVP Form Backend
 * Receives form submissions and saves them to Google Sheets
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Validate required fields
    if (!data.guestName || !data.email || !data.attending) {
      return createResponse(false, 'Missing required fields');
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      return createResponse(false, 'Invalid email format');
    }

    // Prepare the row data
    const rowData = [
      new Date(),                           // Timestamp
      sanitize(data.guestName),            // Guest Name
      sanitize(data.email),                // Email
      sanitize(data.phone) || '',          // Phone
      data.attending,                       // Attending (yes/no)
      data.guestCount || 0,                // Guest Count
      sanitize(data.guestNames) || '',     // Guest Names
      sanitize(data.mealPreferences) || '', // Meal Preferences
      sanitize(data.dietaryRestrictions) || '', // Dietary Restrictions
      sanitize(data.specialRequests) || ''  // Special Requests
    ];

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Optional: Send confirmation email
    sendConfirmationEmail(data);

    // Return success response
    return createResponse(true, 'RSVP submitted successfully');

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse(false, 'An error occurred: ' + error.toString());
  }
}

/**
 * Health check endpoint
 */
function doGet(e) {
  return ContentService.createTextOutput('Wedding RSVP API is running ✓');
}

/**
 * Create a JSON response
 */
function createResponse(success, message) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Sanitize input to prevent injection attacks
 */
function sanitize(input) {
  if (!input) return '';
  return String(input).trim().replace(/[<>]/g, '');
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Send confirmation email to guest
 * Optional: Remove this function if you don't want to send emails
 */
function sendConfirmationEmail(data) {
  try {
    const subject = 'Wedding RSVP Confirmation';

    let body = `Dear ${data.guestName},\n\n`;

    if (data.attending === 'yes') {
      body += `Thank you for your RSVP! We're thrilled that you'll be joining us for our wedding celebration.\n\n`;
      body += `Details:\n`;
      body += `- Number of Guests: ${data.guestCount}\n`;
      if (data.mealPreferences) {
        body += `- Meal Preferences: ${data.mealPreferences}\n`;
      }
      body += `\nWe look forward to celebrating with you!\n\n`;
    } else {
      body += `Thank you for letting us know. While we'll miss you on our special day, we appreciate you taking the time to respond.\n\n`;
    }

    body += `If you need to make any changes to your RSVP, please contact us directly.\n\n`;
    body += `With love,\nJane & John`; // Update with your names

    // Send the email
    MailApp.sendEmail(data.email, subject, body);

  } catch (error) {
    Logger.log('Email error: ' + error.toString());
    // Don't throw error - we don't want email failures to break the form submission
  }
}
```

---

## Step 4: Save and Deploy

1. **Save the script:**
   - Click the disk icon or press `Ctrl+S` (or `Cmd+S` on Mac)
   - Give your project a name: **"Wedding RSVP API"**

2. **Deploy as Web App:**
   - Click **Deploy** → **New deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Choose **Web app**

3. **Configure the deployment:**
   - **Description:** "Wedding RSVP Form Backend" (optional)
   - **Execute as:** Me (your email address)
   - **Who has access:** Anyone

   ⚠️ **Important:** Select "Anyone" for "Who has access" - this allows your public website to send data to the script.

4. **Click Deploy**

5. **Authorize access:**
   - You'll see a popup asking for permissions
   - Click **Review Permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to [project name] (unsafe)**
   - Click **Allow**

6. **Copy the Web App URL:**
   - After deployment, you'll see a **Web app URL** like:
     ```
     https://script.google.com/macros/s/AKfycbw.../exec
     ```
   - **Copy this entire URL** - you'll need it in the next step

---

## Step 5: Update Your Website Configuration

1. Open the file `js/config.js` in your wedding website project

2. Find this line:
   ```javascript
   APPS_SCRIPT_URL: 'YOUR_APPS_SCRIPT_URL_HERE',
   ```

3. Replace `YOUR_APPS_SCRIPT_URL_HERE` with the Web App URL you copied in Step 4:
   ```javascript
   APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbw.../exec',
   ```

4. Save the file

5. Update your wedding details in the same file (couple names, dates, venues, etc.)

---

## Step 6: Test Your Setup

### Test 1: Check the API endpoint

1. Open a new browser tab
2. Paste your Web App URL
3. You should see: **"Wedding RSVP API is running ✓"**

If you see this message, your API is working!

### Test 2: Submit a test RSVP

1. Open your wedding website (locally or after deployment)
2. Go to the RSVP page
3. Fill out the form with test data
4. Submit the form
5. Check your Google Sheet - you should see a new row with your test data

**If it works:** 🎉 Success! Your RSVP system is fully functional!

**If it doesn't work:** See the Troubleshooting section below.

---

## Optional: Disable Email Confirmations

By default, the script sends confirmation emails to guests. If you don't want this:

1. In your Apps Script, find the `sendConfirmationEmail` function
2. Comment out the call to this function in the `doPost` function:
   ```javascript
   // sendConfirmationEmail(data);  // Commented out
   ```
3. Save and redeploy (Deploy → Manage deployments → Edit → Version: New version → Deploy)

---

## Troubleshooting

### Problem: "RSVP form is not configured yet" message

**Solution:** You haven't updated the `APPS_SCRIPT_URL` in `js/config.js`. Follow Step 5 above.

### Problem: Form submits but no data appears in Google Sheet

**Possible causes:**
1. **Wrong sheet selected:** Make sure the Apps Script is attached to the correct Google Sheet
2. **Permissions issue:** Redeploy the script and ensure "Anyone" has access
3. **Column headers missing:** Verify your sheet has all the column headers from Step 1

**How to debug:**
1. In Apps Script, click **Executions** in the left sidebar
2. Look for recent executions and any error messages
3. Check the error details and fix accordingly

### Problem: "Authorization required" or permission errors

**Solution:**
1. In Apps Script, click **Deploy** → **Manage deployments**
2. Click Edit (pencil icon)
3. Change version to **New version**
4. Click **Deploy**
5. Go through the authorization process again

### Problem: Emails not sending

**Possible causes:**
1. You've hit Gmail's daily sending limit (100 emails/day for free accounts)
2. Email address is invalid

**Solution:**
- Check Apps Script Executions for specific error messages
- Consider disabling email confirmations (see Optional section above)
- For high volume, consider using a third-party email service

### Problem: "Script error" when submitting

**Solution:**
1. Open Apps Script
2. Click **Executions** to see the error details
3. Common issues:
   - Data format mismatch: Ensure form data matches expected format
   - Permission issue: Redeploy with "Anyone" access
   - Code syntax error: Check the code was copied correctly

---

## Viewing and Managing Responses

### View Responses

Simply open your Google Sheet to see all RSVP responses in real-time.

### Filter Responses

Use Google Sheets' built-in filters:
1. Select the header row
2. Click **Data** → **Create a filter**
3. Click the filter icon on any column to filter responses

### Export Responses

1. In Google Sheets, click **File** → **Download**
2. Choose format (Excel, CSV, PDF, etc.)

### Create Reports

Use Google Sheets features:
- **Pivot tables** for meal count summaries
- **Charts** to visualize attendance
- **Conditional formatting** to highlight special requests

---

## Security Considerations

### Data Privacy

- Your Google Sheet is private by default - only you can access it
- The Apps Script URL is public but can only append data, not read it
- Guest emails are only used for confirmation and wedding planning

### Preventing Spam

The current setup has basic validation. For additional protection:

1. **Add a honeypot field** (hidden field that bots will fill):
   ```javascript
   if (data.honeypot) {
     return createResponse(false, 'Invalid submission');
   }
   ```

2. **Add rate limiting** (track submissions by timestamp):
   ```javascript
   // Check for duplicate submissions within 1 minute
   // Implementation left as an exercise
   ```

3. **Require CAPTCHA** (more complex, requires third-party service)

---

## Updating the Script

If you need to make changes to the Apps Script:

1. Edit the code in Apps Script editor
2. Save your changes
3. Click **Deploy** → **Manage deployments**
4. Click Edit (pencil icon) on your deployment
5. Change **Version** to **New version**
6. Click **Deploy**

**Important:** The Web App URL stays the same, so you don't need to update your website config.

---

## Advanced: Data Validation in Sheet

Add data validation to your Google Sheet columns:

1. **Attending column (E):**
   - Select column E (below header)
   - Data → Data validation
   - Criteria: List of items: `yes,no`

2. **Guest Count column (F):**
   - Select column F
   - Data → Data validation
   - Criteria: Number → Between → 0 and 10

3. **Email column (C):**
   - Select column C
   - Data → Data validation
   - Criteria: Text → Is valid email

---

## Need Help?

If you're still having issues:

1. **Check Apps Script Executions:** Detailed error logs are available
2. **Review the code:** Look for typos or missing elements
3. **Test incrementally:** Use the Apps Script Logger to debug
4. **Google it:** Search for specific error messages

---

## Summary Checklist

- [ ] Created Google Sheet with correct column headers
- [ ] Added Apps Script code
- [ ] Deployed as Web App with "Anyone" access
- [ ] Authorized the script with your Google account
- [ ] Copied the Web App URL
- [ ] Updated `js/config.js` with the Web App URL
- [ ] Tested the API endpoint (shows "API is running" message)
- [ ] Submitted a test RSVP
- [ ] Verified test data appears in Google Sheet
- [ ] Customized email confirmation message (optional)

---

**Congratulations!** Your wedding RSVP system is now fully operational. Guests can submit their RSVPs, and you'll see all responses automatically organized in your Google Sheet. 🎉
