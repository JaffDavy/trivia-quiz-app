import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, RefreshCw } from 'lucide-react';
import { useTriviaStore } from '../store/triviaStore';
import Button from '../components/Button';
import './ResultPage.css';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { questions, userAnswers, resetTrivia, fetchQuestions } = useTriviaStore();

  useEffect(() => {
    if (questions.length === 0 || userAnswers.length !== questions.length) {
      navigate('/');
    }
  }, [questions, userAnswers, navigate]);

  if (questions.length === 0 || userAnswers.length !== questions.length) {
    return null;
  }

  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  const score = (correctAnswers / questions.length) * 100;

  const handlePlayAgain = async () => {
    resetTrivia();
    await fetchQuestions();
    navigate('/quiz');
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <div className="results-header">
          <div className="trophy-icon">
            <Trophy className="trophy" />
          </div>
          <h1 className="results-title">Quiz Complete!</h1>
          <p className="results-score">
            You scored {correctAnswers} out of {questions.length} ({Math.round(score)}%)
          </p>
        </div>

        <div className="results-details">
          {questions.map((question, index) => (
            <div key={index} className="question-card">
              <p className="question-text"
                 dangerouslySetInnerHTML={{ __html: question.question }} />
              <div className="answer-info">
                <span className={`user-answer ${userAnswers[index].isCorrect ? 'correct' : 'incorrect'}`}>
                  Your answer: {userAnswers[index].answer ? 'True' : 'False'}
                </span>
                <span className="correct-answer">
                  Correct answer: {question.correct_answer}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="play-again-btn">
          <Button onClick={handlePlayAgain}>
            <div className="play-again-content">
              <RefreshCw className="refresh-icon" />
              Play Again
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
