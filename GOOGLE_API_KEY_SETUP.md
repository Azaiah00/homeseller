# Google Places API Key Setup Instructions

## Step 1: Get Your Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Create a new project or select an existing one
4. Click on "APIs & Services" > "Library" in the left sidebar
5. Search for "Places API" and click on it
6. Click "Enable" to enable the Places API for your project

## Step 2: Create API Key

1. Go to "APIs & Services" > "Credentials" in the left sidebar
2. Click "Create Credentials" > "API Key"
3. Your API key will be generated. **Copy this key** - you'll need it in the next step.

## Step 3: Restrict Your API Key (Recommended for Security)

1. Click on your newly created API key to edit it
2. Under "API restrictions", select "Restrict key"
3. Choose "Places API" from the list
4. Under "Application restrictions", you can:
   - Select "HTTP referrers (web sites)" 
   - Add your website domains (e.g., `homesellerinformation.netlify.app`, `*.netlify.app`)
5. Click "Save"

## Step 4: Add API Key to Your Project

1. Open `index.html` in your project
2. Find this line (around line 220):
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_PLACES_API_KEY&libraries=places" async defer></script>
   ```
3. Replace `YOUR_GOOGLE_PLACES_API_KEY` with your actual API key
4. Save the file

## Step 5: Test the Autocomplete

1. Start your development server: `npm run dev`
2. Navigate to the contact form
3. Click on the "Property Address" field
4. Start typing an address - you should see Google Places autocomplete suggestions appear

## Important Notes - Pricing Information

### Is it Free?

**Yes, for most use cases!** Google Places API is not completely free, but Google provides a **$200 monthly credit** to all users. This credit typically covers:

- **~70,000 Autocomplete requests per month** (which is what we're using)
- For a typical real estate website, this is usually more than enough

### Pricing Details

- **Free Tier**: $200/month credit (covers ~70,000 Autocomplete requests)
- **After Free Tier**: $2.83 per 1,000 Autocomplete requests
- **Billing Required**: You must enable billing in Google Cloud Console, but you won't be charged unless you exceed the $200 credit

### For Your Use Case

If you get 100 form submissions per month, and each user types an average of 5 autocomplete requests, that's only 500 requests/month - well within the free tier!

### Security

- Always restrict your API key to prevent unauthorized use
- Set up API key restrictions (see Step 3)
- Monitor your usage in Google Cloud Console to stay within the free tier

## Troubleshooting

- If autocomplete doesn't work, check the browser console for errors
- Make sure the Places API is enabled in your Google Cloud project
- Verify your API key restrictions allow your domain
- Check that billing is enabled if you've exceeded the free tier

## Alternative: Using Environment Variables (More Secure)

If you want to use environment variables instead:

1. Create a `.env` file in your project root:
   ```
   VITE_GOOGLE_PLACES_API_KEY=your_actual_api_key_here
   ```

2. Update `index.html` to use the environment variable:
   ```html
   <script src={`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&libraries=places`} async defer></script>
   ```

   Note: For this to work, you'll need to load the script dynamically in your React component instead of in the HTML file.

