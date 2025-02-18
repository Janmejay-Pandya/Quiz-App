import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, History, Sparkles } from 'lucide-react';

const Homepage = () => {
    const [isHovered, setIsHovered] = useState(false);

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
                    <Link to="/quiz">
                        <button className="group relative px-8 py-4 bg-blue-500 text-white rounded-xl transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1">
                            <div className="flex items-center space-x-3">
                                <Brain className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                                <span className="font-semibold">Start Quiz</span>
                            </div>
                            <div className="absolute inset-0 rounded-xl border-2 border-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </button>
                    </Link>

                    <Link to="/history">
                        <button className="group relative px-8 py-4 bg-gray-500 text-white rounded-xl transition-all duration-300 hover:bg-gray-600 hover:shadow-lg hover:-translate-y-1">
                            <div className="flex items-center space-x-3">
                                <History className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                                <span className="font-semibold">View History</span>
                            </div>
                            <div className="absolute inset-0 rounded-xl border-2 border-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </button>
                    </Link>
                </div>
            </div>

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