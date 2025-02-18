import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Clock, CheckCircle, XCircle, ChevronRight, PenTool, ListOrdered, Sparkles, Star, Brain } from 'lucide-react';

const Question = ({ question, options, correctAnswer, onAnswerSelected, onNext, timerDuration = 30 }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [typedAnswer, setTypedAnswer] = useState("");
    const [timeLeft, setTimeLeft] = useState(timerDuration);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    useEffect(() => {
        setSelectedOption(null);
        setTypedAnswer("");
        setIsAnswered(false);
        setTimeLeft(timerDuration);
        setFeedbackMessage("");
        setIsTimerRunning(true);
    }, [question]);

    useEffect(() => {
        if (isTimerRunning && timeLeft > 0 && !isAnswered) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !isAnswered) {
            handleAnswer(null);
        }
    }, [timeLeft, isAnswered, isTimerRunning]);

    const handleAnswer = (option) => {
        if (!isAnswered) {
            const isCorrect = option === correctAnswer;
            setSelectedOption(option);
            setFeedbackMessage(isCorrect ? "Correct!" : "Incorrect");
            onAnswerSelected({ question, selectedOption: option, isCorrect });
            setIsAnswered(true);
            setIsTimerRunning(false);
        }
    };

    const handleInputAnswer = () => {
        if (!isAnswered && typedAnswer.trim()) {
            const isCorrect = typedAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
            setFeedbackMessage(isCorrect ? "Correct!" : "Incorrect");
            onAnswerSelected({ question, selectedOption: typedAnswer, isCorrect });
            setIsAnswered(true);
            setIsTimerRunning(false);
        }
    };

    const getButtonClass = (option) => {
        if (!isAnswered) {
            return "bg-white hover:bg-gray-50 hover:shadow-md transform hover:-translate-y-1";
        }
        if (option === correctAnswer) {
            return "bg-green-100 border-green-500 text-green-700";
        }
        if (option === selectedOption) {
            return "bg-red-100 border-red-500 text-red-700";
        }
        return "bg-gray-50";
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                            transform: `scale(${0.5 + Math.random() * 0.5})`,
                        }}
                    >
                        {i % 3 === 0 ? (
                            <Sparkles
                                className="text-blue-400 opacity-60"
                                size={15 + Math.random() * 20}
                            />
                        ) : i % 3 === 1 ? (
                            <Star
                                className="text-purple-400 opacity-60"
                                size={15 + Math.random() * 20}
                            />
                        ) : (
                            <Brain
                                className="text-indigo-400 opacity-60"
                                size={15 + Math.random() * 20}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative w-full max-w-3xl mx-auto">
                <div className="bg-white/85 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
                    {/* Question Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                            {options.length === 0 ? (
                                <PenTool className="w-6 h-6 text-purple-600" />
                            ) : (
                                <ListOrdered className="w-6 h-6 text-blue-600" />
                            )}
                            <h3 className="text-lg font-medium text-gray-700">
                                {options.length === 0 ? "Integer Type Question" : "MCQ-Based Question"}
                            </h3>
                        </div>
                        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full">
                            <Clock className={`w-5 h-5 ${timeLeft < 10 ? 'text-red-600 animate-pulse' : 'text-gray-600'}`} />
                            <span className={`font-semibold ${timeLeft < 10 ? 'text-red-600' : 'text-gray-600'}`}>
                                {timeLeft}s
                            </span>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">{question}</h2>
                    </div>

                    {/* Answer Section */}
                    <div className="space-y-4">
                        {options.length === 0 ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={typedAnswer}
                                    onChange={(e) => setTypedAnswer(e.target.value)}
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Type your answer here"
                                    disabled={isAnswered}
                                />
                                <button
                                    onClick={handleInputAnswer}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50"
                                    disabled={isAnswered || !typedAnswer.trim()}
                                >
                                    Submit Answer
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                {options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(option)}
                                        disabled={isAnswered}
                                        className={`w-full p-4 text-left border rounded-xl transition-all duration-300 ${getButtonClass(option)}`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-medium">
                                                {String.fromCharCode(65 + index)}
                                            </span>
                                            <span className="text-lg">{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Feedback Message */}
                    {isAnswered && (
                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                {feedbackMessage === "Correct!" ? (
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-red-600" />
                                )}
                                <p className={`text-lg font-semibold ${feedbackMessage === "Correct!" ? "text-green-600" : "text-red-600"}`}>
                                    {feedbackMessage}
                                </p>
                            </div>
                            <button
                                onClick={onNext}
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                            >
                                <span>Next Question</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0% { 
                        transform: translate(0, 0) rotate(0deg) scale(1); 
                        opacity: 0.4;
                    }
                    25% {
                        opacity: 0.6;
                    }
                    50% { 
                        transform: translate(20px, 20px) rotate(180deg) scale(1.2);
                        opacity: 0.4;
                    }
                    75% {
                        opacity: 0.6;
                    }
                    100% { 
                        transform: translate(0, 0) rotate(360deg) scale(1);
                        opacity: 0.4;
                    }
                }
            `}</style>
        </div>
    );
};

Question.propTypes = {
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.string.isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    timerDuration: PropTypes.number,
    questionType: PropTypes.oneOf(["MCQ", "Integer"]).isRequired,
};

export default Question;