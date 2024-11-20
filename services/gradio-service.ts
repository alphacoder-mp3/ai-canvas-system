import { client } from '@gradio/client';

export class GradioService {
  private static instance: GradioService;
  private client: unknown;

  private constructor() {
    this.initializeClient();
  }

  public static getInstance(): GradioService {
    if (!GradioService.instance) {
      GradioService.instance = new GradioService();
    }
    return GradioService.instance;
  }

  private async initializeClient() {
    try {
      this.client = await client('https://your-gradio-endpoint');
    } catch (error) {
      console.error('Failed to initialize Gradio client:', error);
    }
  }

  public async enhanceImage(imageData: string): Promise<string> {
    try {
      const result = await this.client.predict('/enhance', [imageData]);
      return result.data[0];
    } catch (error) {
      console.error('Failed to enhance image:', error);
      throw error;
    }
  }

  public async generateVariations(imageData: string): Promise<string[]> {
    try {
      const result = await this.client.predict('/variations', [imageData]);
      return result.data;
    } catch (error) {
      console.error('Failed to generate variations:', error);
      throw error;
    }
  }
}
