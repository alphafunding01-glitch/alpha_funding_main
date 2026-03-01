
import { streamText, convertToModelMessages } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { tools } from '@/ai/tools';

export async function POST(request: Request) {
    const { messages, company_context } = await request.json();

    // Use the provided key or fallback to simulated for demo
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({
            id: 'msg_' + Date.now(),
            role: 'assistant',
            content: 'AI analysis requires ANTHROPIC_API_KEY to be configured. Add your key to enable real-time business intelligence.',
            parts: [
                { type: 'text', text: 'Configure ANTHROPIC_API_KEY to unlock AI-powered company analysis.' }
            ]
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const result = streamText({
        model: anthropic('claude-3-5-sonnet-latest'),
        system: `You are AlphaBot, the intelligent funding consultant. 
    Analyze the company data provided and confirm its eligibility. 
    Do NOT chat. Just provide a single sentence summary of the business status and then stop.`,
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}
