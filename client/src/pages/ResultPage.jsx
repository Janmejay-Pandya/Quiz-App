import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { Trophy, Home, RefreshCcw, Check, X, ChevronRight, Medal } from 'lucide-react';

const ResultPage = () => {
    const location = useLocation();
    const { score, attempts } = location.state || { score: 0, attempts: [] };
    const [selectedAttempt, setSelectedAttempt] = useState(null);

    const percentage = Math.round((score / attempts.length) * 100);

    const getScoreMessage = () => {
        if (percentage === 100) return "Perfect Score! 🎉";
        if (percentage >= 80) return "Excellent Work! 🌟";
        if (percentage >= 60) return "Good Job! 👍";
        if (percentage >= 40) return "Keep Practicing! 💪";
        return "Don't Give Up! 🎯";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
            {/* Animated score section */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white/90 rounded-2xl p-8 shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex flex-col items-center space-y-4">
                        <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
                        <h1 className="text-4xl font-bold text-gray-800">{getScoreMessage()}</h1>
                        <div className="flex items-center space-x-2">
                            <Medal className="w-6 h-6 text-blue-500" />
                            <p className="text-2xl font-semibold">
                                Score: <span className="text-blue-600">{score}</span>/{attempts.length}
                            </p>
                        </div>
                        <div className="w-full max-w-md bg-gray-200 rounded-full h-4 mt-4">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <p className="text-gray-600 font-medium">{percentage}% Correct</p>
                    </div>
                </div>
            </div>

            {/* Attempts list */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <ChevronRight className="w-6 h-6 text-blue-500 mr-2" />
                        Attempt Summary
                    </h2>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
                        {attempts.map((attempt, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer
                                    ${selectedAttempt === index ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-300'}
                                    ${attempt.isCorrect ? 'bg-green-50' : 'bg-red-50'}
                                    transform hover:-translate-y-1`}
                                onClick={() => setSelectedAttempt(selectedAttempt === index ? null : index)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800 mb-2">
                                            Question {index + 1}
                                        </p>
                                        <p className="text-gray-600 mb-2">{attempt.question}</p>
                                        <div className={`flex items-center space-x-2 ${attempt.isCorrect ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {attempt.isCorrect ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                <X className="w-5 h-5" />
                                            )}
                                            <p className="font-medium">
                                                {attempt.isCorrect ? 'Correct' : 'Incorrect'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full ${attempt.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        Your Answer: {attempt.selectedOption}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
                        <Link to="/quiz">
                            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 transform hover:-translate-y-1 transition-all duration-300">
                                <RefreshCcw className="w-5 h-5" />
                                <span>Try Again</span>
                            </button>
                        </Link>
                        <Link to="/">
                            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 transform hover:-translate-y-1 transition-all duration-300">
                                <Home className="w-5 h-5" />
                                <span>Home</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;