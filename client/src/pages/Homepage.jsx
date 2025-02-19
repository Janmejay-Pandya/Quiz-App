import { useState } from 'react';
import { Brain, History, Sparkles, Timer, ListOrdered, PenTool, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Homepage = ({ onViewHistory }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);

    const handleStartQuiz = () => {
        setShowInstructions(true);
    };

    const startQuiz = () => {
        setShowInstructions(false);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-purple-200 to-blue-200 overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s linear infinite`,
                            animationDelay: `${Math.random() * 10}s`
                        }}
                    >
                        <Sparkles
                            className="text-blue-500 opacity-100 animate-spin"
                            size={10 + Math.random() * 10}
                        />
                    </div>
                ))}
            </div>

            {/* Main content */}
            <div className="relative flex flex-col items-center justify-center min-h-screen space-y-8 px-4">
                <div
                    className="text-center space-y-4 transform transition-transform duration-500"
                    style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome to the Quiz
                    </h1>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                        Test your knowledge and track your progress with our interactive quizzes
                    </p>
                </div>

                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                    <button
                        onClick={handleStartQuiz}
                        className="group relative px-8 py-4 bg-blue-500 text-white rounded-xl transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div className="flex items-center space-x-3">
                            <Brain className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                            <span className="font-semibold">Start Quiz</span>
                        </div>
                        <div className="absolute inset-0 rounded-xl border-2 border-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </button>

                    <Link to="/history">
                        <button
                            onClick={onViewHistory}
                            className="group relative px-8 py-4 bg-gray-500 text-white rounded-xl transition-all duration-300 hover:bg-gray-600 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="flex items-center space-x-3">
                                <History className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                                <span className="font-semibold">View History</span>
                            </div>
                            <div className="absolute inset-0 rounded-xl border-2 border-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Instructions Modal */}
            {showInstructions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-4 max-w-xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800">Quiz Instructions</h2>
                                <button
                                    onClick={() => setShowInstructions(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-2 text-gray-700 text-sm">
                                    <Timer className="w-5 h-5 text-blue-500" />
                                    <p>Each question has a 30-second time limit</p>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700 text-sm">
                                    <ListOrdered className="w-5 h-5 text-blue-500" />
                                    <p>5 Multiple Choice Questions (MCQ)</p>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700 text-sm">
                                    <PenTool className="w-5 h-5 text-blue-500" />
                                    <p>5 Integer-based Questions</p>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700 text-sm">
                                    <Award className="w-5 h-5 text-blue-500" />
                                    <p>Your score and performance will be tracked</p>
                                </div>
                            </div>

                            <div className="bg-purple-50 p-3 rounded-lg text-sm">
                                <p className="text-purple-700 font-medium">Power-ups Available:</p>
                                <ul className="list-disc list-inside text-purple-600 space-y-1 mt-1">
                                    <li>50-50: Eliminates two incorrect options in MCQ questions</li>
                                    <li>Skip: Allows you to skip any question without penalty</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg text-sm">
                                <p className="text-blue-700">Tips:</p>
                                <ul className="list-disc list-inside text-blue-600 space-y-1 mt-1">
                                    <li>Read each question carefully</li>
                                    <li>Keep an eye on the timer</li>
                                    <li>For integer questions, enter only numbers</li>
                                    <li>You can't return to previous questions</li>
                                    <li>Use power-ups strategically - you have limited attempts!</li>
                                </ul>
                            </div>

                            <div className="flex justify-end mt-4">
                                <Link to="/quiz">
                                    <button
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2"
                                    >
                                        <span>Start Quiz</span>
                                        <Brain className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(20px, 20px) rotate(180deg); }
                    100% { transform: translate(0, 0) rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Homepage;