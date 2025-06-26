 
import { customProvider } from "ai";
import { google } from '@ai-sdk/google'; 

const languageModels = {  
  "Gemini": google("gemini-2.0-flash"),  
};

export const model = customProvider({
  languageModels,
});

export type modelID = keyof typeof languageModels;

export const MODELS = Object.keys(languageModels);

export const defaultModel: modelID = "Gemini";