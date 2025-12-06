// Netlify Function to send form submissions to Follow Up Boss CRM
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Parse the form data
    const data = JSON.parse(event.body)
    const { name, email, phone, propertyAddress, timeline } = data

    // Validate required fields
    if (!name || !email || !phone || !propertyAddress) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      }
    }

    // Get API key from environment variable
    const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY

    if (!apiKey) {
      console.error('Follow Up Boss API key not configured')
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'CRM integration not configured' })
      }
    }

    // Parse name into first and last name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Format phone number (remove non-digits)
    const cleanedPhone = phone.replace(/\D/g, '')

    // Prepare the event data for Follow Up Boss API
    // Follow Up Boss uses events to create/update contacts
    const eventData = {
      source: 'Website Form',
      system: 'Seller Consultation Website',
      type: 'General Inquiry',
      message: `New seller consultation request from website.

Property Address: ${propertyAddress}
Timeline: ${timeline || 'Not specified'}

Submitted via contact form.`,
      person: {
        firstName: firstName,
        lastName: lastName,
        emails: [
          {
            value: email.trim()
          }
        ],
        phones: [
          {
            value: cleanedPhone
          }
        ],
        tags: ['Home Seller', 'Website Lead']
      }
    }

    // Send to Follow Up Boss API
    // Using /v1/events endpoint as recommended in their documentation
    const response = await fetch('https://api.followupboss.com/v1/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(eventData)
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('Follow Up Boss API error:', response.status, responseData)
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'Failed to send to CRM',
          details: responseData
        })
      }
    }

    // Success!
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Contact submitted to CRM successfully'
      })
    }

  } catch (error) {
    console.error('Error in Follow Up Boss function:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      })
    }
  }
}

