import { create } from 'zustand';

export const useTriviaStore = create((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  isLoading: false,
  error: null,

  fetchQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&type=boolean');
      const data = await response.json();
      set({ questions: data.results, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch questions', isLoading: false });
    }
  },

  setCurrentQuestionIndex: (index) => {
    set({ currentQuestionIndex: index });
  },

  addUserAnswer: (answer) => {
    const { userAnswers, questions } = get();
    set({ 
      userAnswers: [...userAnswers, answer],
      currentQuestionIndex: Math.min(get().currentQuestionIndex + 1, questions.length)
    });
  },

  resetTrivia: () => {
    set({
      currentQuestionIndex: 0,
      userAnswers: [],
      error: null
    });
  }
}));