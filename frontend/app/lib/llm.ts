// LLM Provider Interface
export interface LLMProvider {
  name: string;
  generateResponse: (prompt: string, context?: string) => Promise<string>;
}

// Free LLM using Hugging Face Inference API (no API key required for some models)
export class HuggingFaceProvider implements LLMProvider {
  name = 'Hugging Face (Free)';
  
  async generateResponse(prompt: string, context?: string): Promise<string> {
    try {
      // Using a free model that doesn't require authentication
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: context ? `${context}\n\nUser: ${prompt}` : prompt,
          parameters: {
            max_length: 150,
            temperature: 0.7,
            do_sample: true,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data) && data[0] && data[0].generated_text) {
        return data[0].generated_text;
      } else if (data.generated_text) {
        return data.generated_text;
      } else {
        // Fallback response
        return this.generateFallbackResponse(prompt);
      }
    } catch (error) {
      console.error('LLM API error:', error);
      return this.generateFallbackResponse(prompt);
    }
  }

  private generateFallbackResponse(prompt: string): string {
    // Smart fallback responses based on common estate management queries
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('asset') || lowerPrompt.includes('property')) {
      return "I can help you manage your assets. You can add new assets using the form above, or ask me specific questions about asset valuation, insurance, or maintenance.";
    } else if (lowerPrompt.includes('value') || lowerPrompt.includes('worth')) {
      return "Asset valuation depends on many factors including market conditions, location, and condition. I recommend consulting with a professional appraiser for accurate valuations.";
    } else if (lowerPrompt.includes('insurance') || lowerPrompt.includes('protect')) {
      return "For asset protection, consider comprehensive insurance coverage, secure storage, and regular maintenance. I can help you track insurance policies and renewal dates.";
    } else if (lowerPrompt.includes('family') || lowerPrompt.includes('inherit')) {
      return "Estate planning and family asset management are important considerations. I can help you organize documentation and track family assets across generations.";
    } else {
      return "I'm your estate management assistant. I can help you track assets, manage documents, and provide guidance on estate planning. How can I assist you today?";
    }
  }
}

// OpenAI Provider (for future use)
export class OpenAIProvider implements LLMProvider {
  name = 'OpenAI GPT';
  
  async generateResponse(): Promise<string> {
    // This would use OpenAI API when you're ready to upgrade
    throw new Error('OpenAI provider not configured yet. Please add your API key.');
  }
}

// LLM Service Manager
export class LLMService {
  private providers: Map<string, LLMProvider> = new Map();
  private currentProvider: string = 'huggingface';

  constructor() {
    // Register providers
    this.providers.set('huggingface', new HuggingFaceProvider());
    this.providers.set('openai', new OpenAIProvider());
  }

  async generateResponse(prompt: string, context?: string): Promise<string> {
    const provider = this.providers.get(this.currentProvider);
    if (!provider) {
      throw new Error(`Provider '${this.currentProvider}' not found`);
    }
    
    return await provider.generateResponse(prompt, context);
  }

  setProvider(providerName: string): void {
    if (!this.providers.has(providerName)) {
      throw new Error(`Provider '${providerName}' not available`);
    }
    this.currentProvider = providerName;
  }

  getCurrentProvider(): string {
    return this.currentProvider;
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  getProviderInfo(providerName: string): { name: string } | null {
    const provider = this.providers.get(providerName);
    return provider ? { name: provider.name } : null;
  }
}

// Export singleton instance
export const llmService = new LLMService();
