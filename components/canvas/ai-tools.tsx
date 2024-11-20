'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Images } from 'lucide-react';
import { toast } from 'sonner';
import { AIService } from '@/services/ai-service';

interface AIToolsProps {
  currentImage?: string;
  onEnhanced?: (enhancedImage: string) => void;
  onVariations?: (variations: string[]) => void;
}

export function AITools({
  currentImage,
  onEnhanced,
  onVariations,
}: AIToolsProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const aiService = AIService.getInstance();

  const handleEnhance = async () => {
    if (!currentImage) {
      toast.error('No image to enhance');
      return;
    }

    setIsProcessing(true);
    try {
      const enhanced = await aiService.enhanceImage(currentImage);
      onEnhanced?.(enhanced);
      toast.success('Image enhanced successfully');
    } catch (error) {
      toast.error('Failed to enhance image');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVariations = async () => {
    if (!currentImage) {
      toast.error('No image to generate variations from');
      return;
    }

    setIsProcessing(true);
    try {
      const variations = await aiService.generateVariations(currentImage);
      onVariations?.(variations);
      toast.success('Variations generated successfully');
    } catch (error) {
      toast.error('Failed to generate variations');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Tabs defaultValue="enhance" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="enhance">Enhance</TabsTrigger>
        <TabsTrigger value="variations">Variations</TabsTrigger>
      </TabsList>
      <TabsContent value="enhance">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enhance your image with AI-powered improvements
          </p>
          <Button
            onClick={handleEnhance}
            disabled={isProcessing || !currentImage}
            className="w-full"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Enhance Image
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="variations">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Generate creative variations of your image
          </p>
          <Button
            onClick={handleVariations}
            disabled={isProcessing || !currentImage}
            className="w-full"
          >
            <Images className="mr-2 h-4 w-4" />
            Generate Variations
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
