export class GradioWebSocket {
  private static instance: GradioWebSocket;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;

  private constructor() {}

  public static getInstance(): GradioWebSocket {
    if (!GradioWebSocket.instance) {
      GradioWebSocket.instance = new GradioWebSocket();
    }
    return GradioWebSocket.instance;
  }

  public connect(url: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('Connected to Gradio WebSocket');
      this.reconnectAttempts = 0;
    };

    this.ws.onclose = () => {
      console.log('Disconnected from Gradio WebSocket');
      this.handleReconnect(url);
    };

    this.ws.onerror = error => {
      console.error('WebSocket error:', error);
    };

    this.ws.onmessage = event => {
      this.handleMessage(event.data);
    };
  }

  private handleReconnect(url: string): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(
          `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
        );
        this.connect(url);
      }, this.reconnectTimeout * this.reconnectAttempts);
    }
  }

  private handleMessage(data: any): void {
    try {
      const message = JSON.parse(data);
      // Handle different message types
      switch (message.type) {
        case 'progress':
          this.handleProgress(message);
          break;
        case 'result':
          this.handleResult(message);
          break;
        case 'error':
          this.handleError(message);
          break;
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }

  private handleProgress(message: any): void {
    // Emit progress event
    const event = new CustomEvent('gradio-progress', { detail: message });
    window.dispatchEvent(event);
  }

  private handleResult(message: any): void {
    // Emit result event
    const event = new CustomEvent('gradio-result', { detail: message });
    window.dispatchEvent(event);
  }

  private handleError(message: any): void {
    // Emit error event
    const event = new CustomEvent('gradio-error', { detail: message });
    window.dispatchEvent(event);
  }

  public send(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  public disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
