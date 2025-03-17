import React from 'react';
import { Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useTriviaStore } from '../store/triviaStore';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const fetchQuestions = useTriviaStore(state => state.fetchQuestions);

  const handleStart = async () => {
    await fetchQuestions();
    navigate('/quiz');
  };

  return (
    <div className="landing-container">
      <div className="landing-card">
        <div className="icon-wrapper">
          <Brain className="brain-icon" />
        </div>
        
        <h1 className="landing-title">Welcome to Trivia Challenge!</h1>
        
        <div className="landing-description">
          <p>You will be presented with 10 True or False questions.</p>
          <p>Can you score 100%?</p>
        </div>

        <div className="button-container">
          <Button onClick={handleStart}>Begin Challenge</Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
