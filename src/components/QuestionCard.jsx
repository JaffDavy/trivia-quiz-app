import React from 'react';
import Button from './Button';

const QuestionCard = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mx-4">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4">
          <span className="text-xs sm:text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm">
            {question.category}
          </span>
        </div>
        <h2 className="text-base sm:text-xl font-semibold mb-2" 
            dangerouslySetInnerHTML={{ __html: question.question }} />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <Button
          variant="success"
          onClick={() => onAnswer(true)}
        >
          True
        </Button>
        <Button
          variant="danger"
          onClick={() => onAnswer(false)}
        >
          False
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;