import Replicate from 'replicate';

export class AIService {
  private static instance: AIService;
  private replicate: Replicate;

  private constructor() {
    this.replicate = new Replicate({
      auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
    });
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public async enhanceImage(imageData: string): Promise<string> {
    try {
      const output = await this.replicate.run(
        'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
        {
          input: {
            image: imageData,
            prompt:
              'enhance this image, make it more professional and high quality',
            negative_prompt: 'low quality, blurry, distorted',
          },
        }
      );
      return output.toString();
    } catch (error) {
      console.error('Failed to enhance image:', error);
      throw error;
    }
  }

  public async generateVariations(imageData: string): Promise<string[]> {
    try {
      const outputs = await this.replicate.run(
        'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
        {
          input: {
            image: imageData,
            prompt: 'create variations of this image',
            negative_prompt: 'low quality, blurry, distorted',
            num_outputs: 4,
          },
        }
      );
      return outputs as string[];
    } catch (error) {
      console.error('Failed to generate variations:', error);
      throw error;
    }
  }
}
