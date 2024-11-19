'use client';

import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useCanvasStore } from '@/store/canvas-store';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2, Square, Circle, Pencil, Eraser } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GradioCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const { history, currentStep, addToHistory, undo, redo } = useCanvasStore();
  const [activeButton, setActiveButton] = useState<string>('pencil');

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
      });

      canvas.on('object:added', () => {
        addToHistory(canvas.toJSON());
      });

      canvas.on('object:modified', () => {
        addToHistory(canvas.toJSON());
      });

      setFabricCanvas(canvas);
    }
  }, [canvasRef, fabricCanvas, addToHistory]);

  const handleUndo = () => {
    if (fabricCanvas && currentStep > 0) {
      undo();
      fabricCanvas.loadFromJSON(history[currentStep - 1], () => {
        fabricCanvas.renderAll();
      });
    }
  };

  const handleRedo = () => {
    if (fabricCanvas && currentStep < history.length - 1) {
      redo();
      fabricCanvas.loadFromJSON(history[currentStep + 1], () => {
        fabricCanvas.renderAll();
      });
    }
  };

  const setTool = (tool: string) => {
    if (!fabricCanvas) return;

    setActiveButton(tool);
    fabricCanvas.isDrawingMode = tool === 'pencil';

    switch (tool) {
      case 'rectangle':
        fabricCanvas.on('mouse:down', options => {
          const pointer = fabricCanvas.getPointer(options.e);
          const rect = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 50,
            height: 50,
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: 2,
          });
          fabricCanvas.add(rect);
        });
        break;

      case 'circle':
        fabricCanvas.on('mouse:down', options => {
          const pointer = fabricCanvas.getPointer(options.e);
          const circle = new fabric.Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 25,
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: 2,
          });
          fabricCanvas.add(circle);
        });
        break;

      case 'eraser':
        if (fabricCanvas.isDrawingMode) {
          fabricCanvas.freeDrawingBrush.color = '#ffffff';
          fabricCanvas.freeDrawingBrush.width = 20;
        }
        break;

      default:
        if (fabricCanvas.isDrawingMode) {
          fabricCanvas.freeDrawingBrush.color = '#000000';
          fabricCanvas.freeDrawingBrush.width = 2;
        }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleUndo}
          disabled={currentStep === 0}
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRedo}
          disabled={currentStep === history.length - 1}
        >
          <Redo2 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-2 my-auto" />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTool('pencil')}
          className={cn(activeButton === 'pencil' && 'bg-accent')}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTool('rectangle')}
          className={cn(activeButton === 'rectangle' && 'bg-accent')}
        >
          <Square className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTool('circle')}
          className={cn(activeButton === 'circle' && 'bg-accent')}
        >
          <Circle className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTool('eraser')}
          className={cn(activeButton === 'eraser' && 'bg-accent')}
        >
          <Eraser className="h-4 w-4" />
        </Button>
      </div>
      <div className="border rounded-lg p-4">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
