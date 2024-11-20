'use client';

import { useState } from 'react';
import { GradioService } from '@/services/gradio-service';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Images } from 'lucide-react';
import { toast } from 'sonner';

interface GradioClientProps {
  onEnhance: (enhancedImage: string) => void;
  onVariation: (variations: string[]) => void;
  currentImage: string;
}

export function GradioClient({
  onEnhance,
  onVariation,
  currentImage,
}: GradioClientProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const gradioService = GradioService.getInstance();

  const handleEnhance = async () => {
    if (!currentImage) return;

    setIsProcessing(true);
    try {
      const enhanced = await gradioService.enhanceImage(currentImage);
      onEnhance(enhanced);
      toast.success('Image enhanced successfully');
    } catch (error) {
      toast.error('Failed to enhance image');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVariations = async () => {
    if (!currentImage) return;

    setIsProcessing(true);
    try {
      const variations = await gradioService.generateVariations(currentImage);
      onVariation(variations);
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
