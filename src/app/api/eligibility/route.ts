import { streamText, convertToModelMessages, UIMessage, stepCountIs } from 'ai';
import { tools } from '@/ai/tools';

// Mock model for use if no API key is provided
const mockModel = {
    specificationVersion: 'v1' as const,
    defaultObjectGenerationMode: 'json' as const,
    modelId: 'mock-model',
    provider: 'mock-provider',
    doStream: async () => {
        // This is a minimal mock to satisfy streamText if keys are missing
        // But since we want "logic based magic", we can just handle the POST manually 
        // or provide a simple echo model.
        return {} as any;
    }
};

export const maxDuration = 30;

export async function POST(request: Request) {
    const { messages }: { messages: UIMessage[] } = await request.json();

    // If we have an API key, we use the real SDK. 
    // Otherwise, we can return a manual "Magic" response.
    if (!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
        // Return a manual response that looks like a tool call for the frontend
        // This allows the "Smart GenUI" to work purely on logic as requested.
        const lastMsg = messages[messages.length - 1] as any;
        const text = lastMsg.content;

        // Simple parser for the prompt we send in eligibility-widget.tsx
        const company = text.match(/Company:\s*(.*)/)?.[1] || "Business";
        const revenue = text.match(/Monthly Revenue:\s*(.*)/)?.[1]?.toLowerCase() || "50k-100k";
        const funding = text.match(/Funding Required:\s*(.*)/)?.[1]?.toLowerCase() || "50k-100k";

        // Call the tool logic directly
        const result = await (tools as any).checkEligibility.execute({
            companyName: company,
            monthlyRevenue: revenue as any,
            fundingAmount: funding as any
        }, { toolCallId: 'mock-call', messages: [] });

        // Return a JSON response that the useChat hook can understand 
        // as a tool result part.
        // We wrap it in a format that useChat can parse as multiple parts if needed,
        // but for a plain JSON response, we ensure it's a valid message.
        return new Response(JSON.stringify({
            id: "mock-" + Date.now(),
            role: "assistant",
            content: "Analysis complete. View your results below.",
            toolInvocations: [{
                toolCallId: "mock-call",
                toolName: "checkEligibility",
                args: { companyName: company, monthlyRevenue: revenue, fundingAmount: funding },
                state: "result",
                result: result
            }]
        }), { headers: { 'Content-Type': 'application/json' } });
    }

    // Real LLM path (not used based on user instructions, but here for completeness)
    /*
    const result = streamText({
      model: openai('gpt-4o-mini'), 
      system: `You are Alpha Funding's eligibility assistant...`,
      messages: await convertToModelMessages(messages),
      tools,
      stopWhen: stepCountIs(3),
    });
    return result.toUIMessageStreamResponse();
    */

    return new Response("Not configured", { status: 500 });
}
