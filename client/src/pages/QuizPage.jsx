import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import { saveAttempt } from "../utils/indexdb";
import { quizData } from "../utils/quizData"; // Import quiz questions

const QuizPage = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [attemptHistory, setAttemptHistory] = useState([]);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const handleAnswerSelected = ({ question, selectedOption, isCorrect }) => {
        // Store attempt data
        const newAttempt = { question, selectedOption, isCorrect };
        setAttemptHistory([...attemptHistory, newAttempt]);

        // Update score if answer is correct
        if (isCorrect) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleQuizCompletion();
        }
    };

    const handleQuizCompletion = () => {
        // Save quiz attempt to IndexedDB
        const quizAttempt = {
            date: new Date().toLocaleString(),
            score,
            total: quizData.length,
            attempts: attemptHistory,
        };
        saveAttempt(quizAttempt);

        // Navigate to Results page
        navigate("/results", { state: { score, attempts: attemptHistory } });
    };

    return (
        <div className="flex flex-col items-center p-6">
            {currentQuestionIndex < quizData.length ? (
                <Question
                    question={quizData[currentQuestionIndex].question}
                    options={quizData[currentQuestionIndex].options || []} // Handle missing options
                    correctAnswer={quizData[currentQuestionIndex].answer}
                    onAnswerSelected={handleAnswerSelected}
                    onNext={handleNextQuestion} // Pass onNext handler to move to the next question
                />
            ) : (
                <p>Loading Results...</p>
            )}
        </div>
    );
};

export default QuizPage;
