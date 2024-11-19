'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wand2 } from 'lucide-react';
import { toast } from 'sonner';

export function AITools() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      toast('Error', {
        description: 'Please enter a prompt',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      await response.json();
      // Handle the generated image URL
      toast('Success', {
        description: 'Image generated successfully',
      });
    } catch (error) {
      console.error({ error });
      toast('Error', {
        description: 'Failed to generate image',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          placeholder="Describe what you want to generate..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <Button onClick={handleGenerate} disabled={isGenerating}>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate
        </Button>
      </div>
    </div>
  );
}
