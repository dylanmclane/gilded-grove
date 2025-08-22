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
      console.log('HuggingFace API: Making request to external LLM');
      
      // Using a free model that doesn't require authentication
      const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: context ? `${context}\n\nUser: ${prompt}` : prompt,
          parameters: {
            max_length: 100,
            temperature: 0.8,
            do_sample: true,
            return_full_text: false,
          }
        }),
      });

      console.log('HuggingFace API: Response status:', response.status);
      console.log('HuggingFace API: Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HuggingFace API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();
      console.log('HuggingFace API: Response data:', data);
      
      // Handle different response formats
      if (Array.isArray(data) && data[0] && data[0].generated_text) {
        return data[0].generated_text;
      } else if (data.generated_text) {
        return data.generated_text;
      } else {
        console.log('HuggingFace API: Using fallback response due to unexpected data format');
        return this.generateFallbackResponse(prompt, context);
      }
    } catch (error) {
      console.error('HuggingFace API error:', error);
      console.log('HuggingFace API: Falling back to local responses');
      return this.generateFallbackResponse(prompt, context);
    }
  }

  private generateFallbackResponse(prompt: string, context?: string): string {
    const lowerPrompt = prompt.toLowerCase();
    const responses = this.getResponseVariations(lowerPrompt, context);
    
    // Pick a random response from the appropriate category
    const category = this.getResponseCategory(lowerPrompt);
    const categoryResponses = responses[category] || responses.general;
    
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  }

  private getResponseCategory(prompt: string): string {
    if (prompt.includes('where') || prompt.includes('location')) return 'location';
    if (prompt.includes('how much') || prompt.includes('value') || prompt.includes('worth') || prompt.includes('price')) return 'value';
    if (prompt.includes('asset') || prompt.includes('property')) return 'assets';
    if (prompt.includes('insurance') || prompt.includes('protect') || prompt.includes('secure')) return 'insurance';
    if (prompt.includes('family') || prompt.includes('inherit') || prompt.includes('succession')) return 'family';
    if (prompt.includes('hello') || prompt.includes('hi') || prompt.includes('hey')) return 'greeting';
    if (prompt.includes('help') || prompt.includes('what') || prompt.includes('how')) return 'help';
    if (prompt.includes('doc') || prompt.includes('paper') || prompt.includes('record')) return 'documents';
    if (prompt.includes('tax') || prompt.includes('financial') || prompt.includes('money')) return 'financial';
    return 'general';
  }

  private getResponseVariations(prompt: string, context?: string) {
    const hasAssets = context && context.includes('Current assets:');
    const assetCount = hasAssets ? (context.match(/Current assets:/g) || []).length : 0;
    
    // Extract asset details for more specific responses
    let assetDetails = '';
    if (hasAssets && context) {
      const assetsMatch = context.match(/Current assets: (.+)/);
      if (assetsMatch) {
        assetDetails = assetsMatch[1];
      }
    }

    return {
      greeting: [
        "Hello! I'm your estate management assistant. How can I help you today?",
        "Hi there! I'm here to help you manage your estate. What would you like to know?",
        "Greetings! I'm your personal estate advisor. How may I assist you?",
        "Welcome! I'm ready to help you with estate management. What's on your mind?",
        "Good day! I'm your estate planning assistant. How can I be of service?"
      ],
      assets: hasAssets ? [
        `I can see your current assets: ${assetDetails}. I can help you manage, value, or insure these items. What would you like to focus on?`,
        `Your portfolio includes: ${assetDetails}. Let me help you optimize their management and protection.`,
        `I notice you have: ${assetDetails}. I can assist with valuation, insurance, or adding more assets to your collection.`,
        `Great portfolio! You have: ${assetDetails}. How can I help you manage these assets more effectively?`
      ] : [
        "I can help you manage your assets effectively. Would you like to add new assets or get advice on existing ones?",
        "Asset management is crucial for estate planning. I can help you track, value, and protect your investments.",
        "Let's work on your asset portfolio! I can guide you through valuation, insurance, and maintenance strategies.",
        "Your assets are the foundation of your estate. I'm here to help you manage them wisely."
      ],
      location: hasAssets ? [
        this.getLocationResponse(assetDetails, prompt),
        this.getLocationResponse(assetDetails, prompt),
        this.getLocationResponse(assetDetails, prompt),
        this.getLocationResponse(assetDetails, prompt)
      ] : [
        "I don't see any assets in your inventory yet. Add some assets first, then I can tell you where they're located.",
        "No assets found. Please add assets to your portfolio so I can help you locate them.",
        "Your asset inventory is empty. Add some items and I'll help you track their locations."
      ],
      value: hasAssets ? [
        this.getValueResponse(assetDetails, prompt),
        this.getValueResponse(assetDetails, prompt),
        this.getValueResponse(assetDetails, prompt),
        this.getValueResponse(assetDetails, prompt)
      ] : [
        "I don't see any assets in your inventory yet. Add some assets first, then I can tell you their values.",
        "No assets found. Please add assets to your portfolio so I can help you with valuations.",
        "Your asset inventory is empty. Add some items and I'll help you track their values."
      ],
      insurance: [
        "Comprehensive insurance is essential for protecting valuable assets. Consider coverage for theft, damage, and natural disasters.",
        "Asset protection through insurance provides peace of mind. Look into policies that cover replacement value, not just market value.",
        "Insurance strategies should match your asset portfolio. High-value items may need specialized coverage.",
        "Protecting your assets with proper insurance is smart estate planning. Consider umbrella policies for additional coverage."
      ],
      family: [
        "Family estate planning ensures your assets benefit future generations. Consider trusts, wills, and succession planning.",
        "Estate planning for families involves balancing current needs with legacy goals. I can help you explore options.",
        "Succession planning protects family wealth across generations. Consider family trusts and clear documentation.",
        "Family asset management requires careful planning. Think about education, healthcare, and legacy preservation."
      ],
      help: [
        "I'm here to help with estate management! I can assist with asset tracking, valuation, insurance, and family planning.",
        "Need estate management guidance? I can help with asset protection, valuation, documentation, and family planning.",
        "I'm your estate management expert! Ask me about assets, insurance, family planning, or any estate-related topics.",
        "Let me help you manage your estate effectively. I can guide you through asset management, protection, and planning."
      ],
      documents: [
        "Proper documentation is crucial for estate management. Keep records of all assets, valuations, and legal documents.",
        "Document management helps protect your estate. Maintain organized records of ownership, insurance, and appraisals.",
        "Good record-keeping is essential for estate planning. Document everything from asset purchases to maintenance schedules.",
        "Estate documentation provides legal protection and clarity. Keep detailed records of all transactions and valuations."
      ],
      financial: [
        "Financial planning is integral to estate management. Consider tax implications, investment strategies, and wealth preservation.",
        "Estate financial planning involves tax optimization, investment management, and wealth transfer strategies.",
        "Financial aspects of estate management include tax planning, investment diversification, and wealth preservation.",
        "Smart financial planning protects and grows your estate. Consider tax-efficient strategies and investment diversification."
      ],
      general: [
        "I'm your estate management assistant. I can help with asset tracking, valuation, insurance, family planning, and more.",
        "Welcome to your estate management dashboard! I'm here to help you protect and grow your wealth.",
        "I'm ready to assist with all aspects of estate management. What would you like to know about your assets?",
        "Your estate management journey starts here! I can guide you through asset protection, valuation, and planning."
      ]
    };
  }

  private getLocationResponse(assetDetails: string, prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    // Extract asset name from question
    const assetName = this.extractAssetName(lowerPrompt);
    
    if (!assetName) {
      // No specific asset mentioned, list all locations
      const assets = this.parseAssets(assetDetails);
      if (assets.length === 0) {
        return "I don't see any assets in your inventory.";
      }
      
      const locationList = assets.map(asset => `${asset.name} is located at ${asset.location}`).join(', ');
      return `Here are the locations of your assets: ${locationList}`;
    }
    
    // Find specific asset
    const assets = this.parseAssets(assetDetails);
    const asset = assets.find(a => a.name.toLowerCase().includes(assetName) || assetName.includes(a.name.toLowerCase()));
    
    if (asset) {
      return `${asset.name} is located at ${asset.location}`;
    } else {
      return `I couldn't find an asset named "${assetName}" in your inventory. Your assets are: ${assets.map(a => a.name).join(', ')}`;
    }
  }

  private getValueResponse(assetDetails: string, prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    // Extract asset name from question
    const assetName = this.extractAssetName(lowerPrompt);
    
    if (!assetName) {
      // No specific asset mentioned, list all values
      const assets = this.parseAssets(assetDetails);
      if (assets.length === 0) {
        return "I don't see any assets in your inventory.";
      }
      
      const valueList = assets.map(asset => `${asset.name} is valued at ${asset.value}`).join(', ');
      return `Here are the values of your assets: ${valueList}`;
    }
    
    // Find specific asset
    const assets = this.parseAssets(assetDetails);
    const asset = assets.find(a => a.name.toLowerCase().includes(assetName) || assetName.includes(a.name.toLowerCase()));
    
    if (asset) {
      return `${asset.name} is valued at ${asset.value}`;
    } else {
      return `I couldn't find an asset named "${assetName}" in your inventory. Your assets are: ${assets.map(a => a.name).join(', ')}`;
    }
  }

  private extractAssetName(prompt: string): string {
    // Common patterns for asking about specific assets
    const patterns = [
      /where is (the )?([^?]+)/i,
      /where is ([^?]+) located/i,
      /how much is (the )?([^?]+)/i,
      /what is (the )?value of ([^?]+)/i,
      /how much does ([^?]+) cost/i,
      /what's (the )?value of ([^?]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = prompt.match(pattern);
      if (match) {
        return match[2] || match[1];
      }
    }
    
    return '';
  }

  private parseAssets(assetDetails: string): Array<{name: string, type: string, value: string, location: string}> {
    const assets: Array<{name: string, type: string, value: string, location: string}> = [];
    
    // Parse the asset string format: "Name (Type) - Value - Location: Location"
    const assetStrings = assetDetails.split(', ');
    
    for (const assetString of assetStrings) {
      const match = assetString.match(/^(.+?) \((.+?)\) - (.+?) - Location: (.+)$/);
      if (match) {
        assets.push({
          name: match[1].trim(),
          type: match[2].trim(),
          value: match[3].trim(),
          location: match[4].trim()
        });
      }
    }
    
    return assets;
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
