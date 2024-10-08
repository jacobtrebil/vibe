import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai-edge';
 
export const runtime = 'edge';

export const dynamic = 'force-dynamic';
 
export async function POST(req: Request) {
  const prompt = await req.json();
  const notes = prompt.prompt.notes;

  const newPrompt2 = `You are an AI that gives health suggestions. Keep them short, 1-2 sentences.
  Use context on my health data, like my recent diet choices, hydration frequency, and exercise habits to make personalized suggestions. 
  My day today: I had a KIND bar that is 150 calories and 3g protein. I had a salad with chicken for lunch. I've been snacking a lot! I've drank 6 glasses of water so far. It's 7pm. I worked out this morning. 
  Do not say that I should drink 8 glasses of water today. If you suggest drinking more water, say how much more.
  example: You've been snacking a lot! Reducing your eating frequency to 3 meals / day will reduce the aging damage of food
  suggestion:`;

  console.log("notes = ", notes);

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(config)

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4-1106-vision-preview',
      stream: true,
      messages: [
        {
            role: 'user',
            // @ts-ignore
            content: [
                { type: "text", text: newPrompt2},
            ]
        }
    ],
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error creating chat completion:', error);
  }
}