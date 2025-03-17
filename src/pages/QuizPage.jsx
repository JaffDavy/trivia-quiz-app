import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTriviaStore } from '../store/triviaStore';
import QuestionCard from '../components/QuestionCard';
import './QuizPage.css';

const QuizPage = () => {
  const navigate = useNavigate();
  const { 
    questions,
    currentQuestionIndex,
    addUserAnswer,
    isLoading,
    error
  } = useTriviaStore();

  useEffect(() => {
    if (questions.length === 0 && !isLoading && !error) {
      navigate('/');
    }
  }, [questions, navigate, isLoading, error]);

  useEffect(() => {
    if (currentQuestionIndex === questions.length && questions.length > 0) {
      navigate('/results');
    }
  }, [currentQuestionIndex, questions.length, navigate]);

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="message loading">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="message error">{error}</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return null;
  }

  const handleAnswer = (answer) => {
    const isCorrect = answer.toString() === currentQuestion.correct_answer.toLowerCase();
    addUserAnswer({
      questionIndex: currentQuestionIndex,
      answer,
      isCorrect
    });
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h1 className="quiz-title">Trivia Quiz</h1>
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      </div>
    </div>
  );
};

export default QuizPage;
