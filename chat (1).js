exports.handler = async function(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    let messages = body.messages || [];

    // Clean: remove invalid messages, ensure strings
    const cleaned = [];
    for (const msg of messages) {
      if (!msg || !msg.role || !msg.content) continue;
      const role = msg.role;
      const content = String(msg.content).trim();
      if (!content) continue;
      // Avoid consecutive same-role messages
      if (cleaned.length > 0 && cleaned[cleaned.length - 1].role === role) continue;
      cleaned.push({ role, content });
    }

    // Must start with user
    while (cleaned.length > 0 && cleaned[0].role !== 'user') cleaned.shift();

    // Trim to last 20 messages to avoid size limits
    const trimmed = cleaned.slice(-20);

    if (trimmed.length === 0) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'No valid messages' })
      };
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        system: body.system || '',
        messages: trimmed
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
