import { create } from 'zustand';

interface CanvasState {
  history: unknown[];
  currentStep: number;
  addToHistory: (state: unknown) => void;
  undo: () => void;
  redo: () => void;
}

export const useCanvasStore = create<CanvasState>(set => ({
  history: [],
  currentStep: -1,
  addToHistory: state =>
    set(prev => ({
      history: [...prev.history.slice(0, prev.currentStep + 1), state],
      currentStep: prev.currentStep + 1,
    })),
  undo: () =>
    set(state => ({
      currentStep: Math.max(0, state.currentStep - 1),
    })),
  redo: () =>
    set(state => ({
      currentStep: Math.min(state.history.length - 1, state.currentStep + 1),
    })),
}));
