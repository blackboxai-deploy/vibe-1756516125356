import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // AI API Configuration
    const aiEndpoint = 'https://oi-server.onrender.com/chat/completions';
    const customerId = 'cus_SmVJ1Az2ex8rb0';
    const model = 'openrouter/anthropic/claude-sonnet-4';

    const aiResponse = await fetch(aiEndpoint, {
      method: 'POST',
      headers: {
        'customerId': customerId,
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xxx'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API request failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiMessage = aiData.choices[0].message.content;

    return NextResponse.json({
      success: true,
      response: aiMessage,
      timestamp: new Date().toISOString(),
      model: model,
      tokenUsage: aiData.usage
    });

  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process AI request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}