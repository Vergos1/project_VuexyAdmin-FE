export enum AiPromtsType {
  TAG = 'tag',
  TEXT = 'text'
}

export type AiPromptType = keyof typeof AiPromtsType

export interface BaseAiPrompt {
  id: string
  prompt: string
}

export interface AiPrompt extends BaseAiPrompt {
  type: AiPromptType
}

export interface CreateAiPromptRequest extends Omit<AiPrompt, 'id'> {}

export interface UpdateAiPromptRequest extends Partial<AiPrompt> {
  prompt: string
}
