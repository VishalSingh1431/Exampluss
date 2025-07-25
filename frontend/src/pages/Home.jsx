import React, { useState } from 'react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Featured exams data
  const featuredExams = [
    { name: 'JEE Main', icon: '📊', subjects: ['Physics', 'Chemistry', 'Mathematics'] },
    { name: 'NEET', icon: '🧪', subjects: ['Biology', 'Chemistry', 'Physics'] },
    { name: 'UPSC', icon: '🏛️', subjects: ['GS Paper I', 'GS Paper II', 'Optional'] },
    { name: 'BPSC', icon: '📝', subjects: ['General Studies', 'Optional Papers'] },
    { name: 'SSC CGL', icon: '📚', subjects: ['Quantitative Aptitude', 'English', 'Reasoning'] },
    { name: 'GATE', icon: '⚙️', subjects: ['Technical Subjects', 'Engineering Maths'] },
  ];

  // All available exams for search
  const allExams = [
    'JEE Main', 'JEE Advanced', 'NEET', 'UPSC Civil Services', 
    'BPSC', 'SSC CGL', 'GATE', 'CAT', 'CLAT', 'NDA'
  ];

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 1) {
      const filtered = allExams.filter(exam => 
        exam.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Key features
  const features = [
    { 
      icon: '🔍', 
      title: 'Instant Access', 
      description: 'View any paper immediately with our seamless browser-based viewer' 
    },
    { 
      icon: '📈', 
      title: 'Performance Analytics', 
      description: 'Track your progress with our smart analysis tools' 
    },
    { 
      icon: '💡', 
      title: 'Expert Solutions', 
      description: 'Access model answers crafted by top educators' 
    },
    { 
      icon: '🔄', 
      title: 'Always Updated', 
      description: 'New papers added immediately after each exam cycle' 
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-16 px-4 border-b border-gray-100">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">
            Master Competitive Exams with <span className="text-blue-600">Real Previous Papers</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600">
            The largest collection of authentic exam papers - view online, practice smart, and outperform the competition
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for exams (JEE, NEET, UPSC...)"
                className="w-full py-4 px-6 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                {suggestions.map((exam, index) => (
                  <div 
                    key={index}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      setSearchQuery(exam);
                      setSuggestions([]);
                    }}
                  >
                    {exam}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
              Start Practicing Now
            </button>
            <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300">
              Browse All Exams
            </button>
          </div>
        </div>
      </section>

      {/* Featured Exams Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-3">Explore Popular Exams</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Access complete sets of previous years' papers for all major competitive exams
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExams.map((exam, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
                <div className="flex items-start">
                  <div className="text-4xl mr-4 text-blue-600">{exam.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-2">{exam.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exam.subjects.map((subject, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {subject}
                        </span>
                      ))}
                    </div>
                    <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      View Papers <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Value Proposition */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-3">Why Practice with Actual Exam Papers?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Research shows students who practice with real previous papers score 28% higher on average
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Our Advanced Paper Viewer</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Zoom, highlight, and bookmark questions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Side-by-side comparison with model answers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Time yourself with built-in exam simulator</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Smart Analysis Tools</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Identify your weak areas automatically</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Track progress across multiple attempts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Get personalized improvement suggestions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why ExamPluss */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-3">Why ExamPluss</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Everything you need for effective exam preparation in one place
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition duration-300">
                <div className="text-3xl mb-4 text-blue-600">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Preparation?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join 150,000+ students who improved their ranks using ExamPluss
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md">
              Get Started - It's Free
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-blue-700 font-bold py-3 px-8 rounded-lg transition duration-300">
              See Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;