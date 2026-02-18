// Wedding Website Configuration
// Update these values with your wedding details and Google Apps Script URL

const CONFIG = {
  // Google Apps Script Web App URL
  // Follow instructions in docs/SETUP.md to get this URL
  APPS_SCRIPT_URL: 'YOUR_APPS_SCRIPT_URL_HERE',

  // Wedding Information
  WEDDING_DATE: '2027-09-18T16:00:00', // Format: YYYY-MM-DDTHH:MM:SS
  COUPLE_NAMES: 'Ian & Elva',
  BRIDE_NAME: 'Elva',
  GROOM_NAME: 'Ian',

  // Venue Information
  CEREMONY_VENUE: 'The Outdoor Art Club',
  CEREMONY_ADDRESS: '1 W Blithedale Ave, Mill Valley, CA 94941',
  CEREMONY_TIME: '4:00 PM',

  RECEPTION_VENUE: 'The Outdoor Art Club',
  RECEPTION_ADDRESS: '1 W Blithedale Ave, Mill Valley, CA 94941',
  RECEPTION_TIME: '6:00 PM',

  // Contact Information
  CONTACT_EMAIL: 'wedding@example.com',
  CONTACT_PHONE: '(555) 123-4567',

  // Form Configuration
  MAX_GUESTS: 10,
  MEAL_OPTIONS: ['Beef', 'Chicken', 'Fish', 'Vegetarian', 'Vegan'],

  // Feature Flags
  ENABLE_REGISTRY: false,  // Set to true to show registry page link
  ENABLE_GALLERY: false,   // Set to true to show photo gallery link

  // Social Media (optional)
  INSTAGRAM_HANDLE: '',    // Leave empty to hide
  FACEBOOK_URL: '',        // Leave empty to hide
  WEDDING_HASHTAG: '',     // Leave empty to hide
};
