import OpenAI from "openai";

// Get OpenAI through API key
const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

type GenerateTextOptions = {
    model?: string;
    prompt: string;
    instructions?: string;
    temperature?: number;
    max_tokens?: number;
    previous_response_id?: string;
}

type GenerateTextResult = {
    id: string;
    output_text: string;
}

export const llmClient = { 
    async generateText({
        model = 'gpt-4.1', 
        prompt, 
        instructions,
        temperature = 0.2, 
        max_tokens = 300,
        previous_response_id
    }: GenerateTextOptions) : Promise<GenerateTextResult>
    {
        const response = await openAIClient.responses.create({
            model,
            input: prompt,
            instructions,
            temperature,
            max_output_tokens: max_tokens,
            previous_response_id
        });

        return {
            id: response.id,
            output_text: response.output_text
        };
    }
};