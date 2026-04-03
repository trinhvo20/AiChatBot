import fs from 'fs';
import path from 'path';
import { conversationRepository } from "../repositories/conversation.repository";
import template from '../prompts/chatbot.txt';
import { llmClient } from '../llm/client';

// Get the instruction prompt for that chatbot from chatbot.txt
const parkInfo = fs.readFileSync(path.join(__dirname, '..', 'prompts', 'WonderWorld.md'), 'utf-8')
const instructions = template.replace('{{parkInfo}}', parkInfo);

type ChatResponse = {
    id: string;
    message: string;
}


// Export public interface
export const chatService = {
    async sendMessage(prompt: string, conversationId: string): Promise<ChatResponse> {
        // Send the user's message to OpenAI
        const response = await llmClient.generateText({
            model: 'gpt-4o-mini',
            instructions,
            prompt,
            temperature: 0.2, // decide how logic/creative the answer is (0.2=logic, 1.0=creative)
            max_tokens: 200, // tokens
            previous_response_id: conversationRepository.getLastResponseId(conversationId)
        })
        
        // update the chatbox's memory
        conversationRepository.setLastResponseId(conversationId, response.id);

        return {
            id: response.id,
            message: response.output_text
        };
    }
}