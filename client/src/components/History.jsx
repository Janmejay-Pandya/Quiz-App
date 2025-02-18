import { useEffect, useState } from "react";
import { getHistory } from "../utils/indexedDB"
import { Link } from "react-router-dom";
import { Clock, ChevronDown, ChevronUp, Home, Check, X, Calendar, Award, BookOpen } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [visibleAttemptIndex, setVisibleAttemptIndex] = useState(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            const attempts = await getHistory();
            setHistory(attempts);
            setAnimate(true);
        };
        fetchHistory();
    }, []);

    const handleToggleVisibility = (index) => {
        setVisibleAttemptIndex(visibleAttemptIndex === index ? null : index);
    };

    const getPercentageScore = (score, total) => {
        return Math.round((score / total) * 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 mb-8 
                    transform transition-all duration-500 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <BookOpen className="w-8 h-8 text-blue-500" />
                        <h1 className="text-4xl font-bold text-gray-800">Quiz History</h1>
                    </div>
                    <p className="text-center text-gray-600">Track your progress and review past attempts</p>
                </div>

                {/* History List */}
                {history.length === 0 ? (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                        <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-500">No past attempts found.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {history.map((attempt, index) => (
                            <div
                                key={index}
                                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 
                                    transform transition-all duration-500 hover:shadow-xl
                                    ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="p-6">
                                    {/* Attempt Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <Award className="w-6 h-6 text-purple-500" />
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                Attempt {history.length - index}
                                            </h2>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2 text-gray-600">
                                                <Calendar className="w-5 h-5" />
                                                <span>{attempt.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Score Section */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-600">Score</span>
                                            <span className="font-semibold text-blue-600">
                                                {attempt.score}/{attempt.total}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000"
                                                style={{ width: `${getPercentageScore(attempt.score, attempt.total)}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Toggle Button */}
                                    <button
                                        onClick={() => handleToggleVisibility(index)}
                                        className="w-full mt-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 
                                            transition-all duration-300 flex items-center justify-center space-x-2"
                                    >
                                        <span>{visibleAttemptIndex === index ? "Hide Details" : "View Details"}</span>
                                        {visibleAttemptIndex === index ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Details Section */}
                                {visibleAttemptIndex === index && (
                                    <div className="border-t border-gray-100 p-6">
                                        <div className="space-y-4">
                                            {attempt.attempts.map((questionAttempt, qIndex) => (
                                                <div
                                                    key={qIndex}
                                                    className={`p-4 rounded-xl transition-all duration-300 transform
                                                        ${questionAttempt.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        {questionAttempt.isCorrect ? (
                                                            <Check className="w-5 h-5 text-green-500 mt-1" />
                                                        ) : (
                                                            <X className="w-5 h-5 text-red-500 mt-1" />
                                                        )}
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-800 mb-2">
                                                                {questionAttempt.question}
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Your answer: {questionAttempt.selectedOption}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Home Button */}
                <div className="flex justify-center mt-8">
                    <Link to="/">
                        <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl 
                            font-semibold flex items-center space-x-2 transform hover:-translate-y-1 transition-all duration-300
                            hover:shadow-lg">
                            <Home className="w-5 h-5" />
                            <span>Back to Home</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default History;