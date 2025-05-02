import { streamText } from 'ai'
import { openRouter } from '../lib/ai'
export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openRouter('google/gemma-3-1b-it:free'),
            prompt
        })
        return result.textStream
    }
}