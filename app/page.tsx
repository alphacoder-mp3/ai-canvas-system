import { GradioCanvas } from '@/components/canvas/gradio-canvas';
import { AITools } from '@/components/canvas/ai-tools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
            <Card>
              <CardHeader>
                <CardTitle>Canvas</CardTitle>
              </CardHeader>
              <CardContent>
                <GradioCanvas />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <AITools />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
