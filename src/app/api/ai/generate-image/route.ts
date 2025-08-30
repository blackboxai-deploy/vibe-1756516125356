import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, style = 'product-photography' } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Enhance the prompt based on style
    let enhancedPrompt = '';
    switch (style) {
      case 'product-photography':
        enhancedPrompt = `Professional product photography: ${prompt}. High quality, clean white background, professional lighting, commercial photography style, high resolution, sharp focus.`;
        break;
      case 'lifestyle':
        enhancedPrompt = `Lifestyle photography: ${prompt}. Natural lighting, real-world setting, authentic feel, high quality.`;
        break;
      case 'minimalist':
        enhancedPrompt = `Minimalist style: ${prompt}. Clean, simple, elegant composition, minimal elements, modern aesthetic.`;
        break;
      default:
        enhancedPrompt = prompt;
    }

    // AI Image Generation Configuration
    const aiEndpoint = 'https://oi-server.onrender.com/chat/completions';
    const customerId = 'cus_SmVJ1Az2ex8rb0';
    const model = 'replicate/black-forest-labs/flux-1.1-pro';

    console.log('Generating image with prompt:', enhancedPrompt);

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
            content: enhancedPrompt
          }
        ]
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API Error Response:', errorText);
      throw new Error(`AI API request failed: ${aiResponse.status} - ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log('AI Response:', aiData);

    // Extract image URL from response
    let imageUrl = '';
    if (aiData.choices && aiData.choices[0] && aiData.choices[0].message) {
      const content = aiData.choices[0].message.content;
      
      // Try to extract URL from content
      const urlMatch = content.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i);
      if (urlMatch) {
        imageUrl = urlMatch[0];
      } else {
        // If no direct URL, the content might be the URL itself
        if (content.startsWith('http')) {
          imageUrl = content.trim();
        } else {
          throw new Error('No image URL found in response');
        }
      }
    } else {
      throw new Error('Invalid response format from AI service');
    }

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      prompt: enhancedPrompt,
      style: style,
      timestamp: new Date().toISOString(),
      model: model
    });

  } catch (error) {
    console.error('AI Image Generation Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}