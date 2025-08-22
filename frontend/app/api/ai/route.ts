import { NextRequest, NextResponse } from 'next/server';
import { llmService } from '../../lib/llm';

export async function POST(request: NextRequest) {
  try {
    const { prompt, context, provider } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Set provider if specified
    if (provider) {
      try {
        llmService.setProvider(provider);
      } catch {
        return NextResponse.json(
          { error: 'Invalid provider specified' },
          { status: 400 }
        );
      }
    }

    // Generate response
    const response = await llmService.generateResponse(prompt, context);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
