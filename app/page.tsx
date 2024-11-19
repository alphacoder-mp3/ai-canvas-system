import { GradioCanvas } from '@/components/canvas/gradio-canvas';
import { AITools } from '@/components/canvas/ai-tools';

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">AI-Enhanced Canvas System</h1>
          <p className="text-muted-foreground">
            Create and edit images with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GradioCanvas />
          </div>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">AI Tools</h2>
              <AITools />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
