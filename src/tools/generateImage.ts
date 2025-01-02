import type { ToolFn } from '../../types'
import { z } from 'zod'
import { openai } from '../ai'

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        `prompt for the image. Be sure to consider the user's original message when making the prompt. If you're unsure, ask the user for more details`
      ),
  }),
  description: 'generate an image from text',
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  const res = await openai.images.generate({
    prompt: toolArgs.prompt,
    model: 'dall-e-3',
    n: 1,
    size: '1024x1024',
  })
  return res.data[0].url!
}
