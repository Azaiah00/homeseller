# Follow Up Boss CRM Integration Setup

This guide will help you connect your contact form to Follow Up Boss CRM so that all form submissions are automatically sent to your CRM.

## Overview

The contact form on your website is now integrated with Follow Up Boss. When someone submits the contact form, the lead will automatically be:
1. Saved to Netlify Forms (as a backup)
2. Sent to your Follow Up Boss CRM as a new contact/event

## Step 1: Get Your Follow Up Boss API Key

1. Log in to your Follow Up Boss account
2. Navigate to **Admin > API** in the top menu
3. Click on **Create API Key**
4. Name it something descriptive like "Website Form Integration"
5. Copy the generated API key (you won't be able to see it again, so save it securely)

**Important:** Keep this API key private and secure. Never share it publicly or commit it to version control.

## Step 2: Add API Key to Netlify Environment Variables

1. Log in to your Netlify account
2. Go to your site's dashboard
3. Navigate to **Site settings** > **Environment variables**
4. Click **Add a variable**
5. Add the following:
   - **Key:** `FOLLOW_UP_BOSS_API_KEY`
   - **Value:** (paste your API key from Step 1)
6. Click **Save**

## Step 3: Redeploy Your Site

After adding the environment variable, you need to redeploy your site:

1. Go to your site's **Deploys** tab in Netlify
2. Click **Trigger deploy** > **Deploy site**
3. Wait for the deployment to complete

Alternatively, you can push a new commit to your repository, which will trigger an automatic deployment.

## Step 4: Test the Integration

1. Fill out the contact form on your website
2. Submit the form
3. Check your Follow Up Boss CRM to verify the contact was created
4. Look for:
   - A new contact with the form submitter's information
   - An event/activity showing the form submission
   - Tags: "Home Seller" and "Website Lead"
   - Property address in the notes/message

## What Data Is Sent to Follow Up Boss?

The following information from your contact form is sent to Follow Up Boss:

- **Name** → Split into First Name and Last Name
- **Email** → Added as primary email
- **Phone** → Added as primary phone (formatted)
- **Property Address** → Added to the message/notes
- **Timeline** → Added to the message/notes
- **Tags:** "Home Seller" and "Website Lead"
- **Source:** "Website Form"
- **Event Type:** "Inquiry"

## Troubleshooting

### The form submits but contacts don't appear in Follow Up Boss

1. **Check the API key:**
   - Verify the API key is correct in Netlify environment variables
   - Make sure there are no extra spaces or characters

2. **Check Netlify Function logs:**
   - Go to Netlify dashboard > Your site > Functions
   - Click on `followupboss` function
   - Check the logs for any error messages

3. **Verify API key permissions:**
   - In Follow Up Boss, go to Admin > API
   - Make sure your API key has the necessary permissions
   - Try regenerating the API key if needed

### Error: "CRM integration not configured"

This means the `FOLLOW_UP_BOSS_API_KEY` environment variable is not set in Netlify. Follow Step 2 above to add it.

### Error: "Failed to send to CRM"

1. Check the Follow Up Boss API status (they rarely have outages)
2. Verify your API key hasn't been revoked or expired
3. Check Netlify function logs for detailed error messages
4. Try regenerating the API key in Follow Up Boss

### The form still works but CRM integration doesn't

The form submission is designed to work even if the CRM integration fails. This ensures a good user experience. Check:
- Netlify function logs for errors
- API key configuration
- Network connectivity from Netlify to Follow Up Boss API

## API Documentation Reference

For more details about the Follow Up Boss API, visit:
- [Follow Up Boss Open API Documentation](https://help.followupboss.com/hc/en-us/articles/7787906777751-Follow-Up-Boss-Open-API)
- [API Key Setup Guide](https://help.followupboss.com/hc/en-us/articles/360014289393-API-Key)

## Security Notes

- API keys are stored securely as environment variables in Netlify
- API keys are never exposed to the frontend/client-side code
- The integration happens server-side via Netlify Functions
- All API communication uses HTTPS

## Support

If you continue to have issues:
1. Check the Netlify function logs for specific error messages
2. Verify your Follow Up Boss account is active and in good standing
3. Contact Follow Up Boss support if API-related issues persist
4. Review the Follow Up Boss API documentation for any recent changes

---

**Last Updated:** This integration uses the Follow Up Boss Events API endpoint (`/v1/events`) to create contacts and events in your CRM.


