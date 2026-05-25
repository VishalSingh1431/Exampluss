import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Exam = () => {
  const [examCategories, setExamCategories] = useState({});
  const [activeTab, setActiveTab] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search and Sort State
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  // Update URL and state when search changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    // Keep internal state synced if URL changes externally
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/exams');
        setExamCategories(response.data);
        if (Object.keys(response.data).length > 0) {
          setActiveTab(Object.keys(response.data)[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch exams');
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  const handleExamClick = (examId) => {
    navigate(`/exams/${examId}`);
  };

  // Get exams for current tab or ALL exams if searching
  const currentCategoryExams = searchTerm.trim() !== '' 
    ? Object.values(examCategories).flat()
    : (examCategories[activeTab] || []);

  const filteredAndSortedExams = currentCategoryExams
    .filter((exam, index, self) => index === self.findIndex(t => t._id === exam._id)) // Remove duplicates
    .filter(exam => 
      exam.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (exam.description && exam.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'a-z') return a.name.localeCompare(b.name);
      if (sortBy === 'z-a') return b.name.localeCompare(a.name);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#008080]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 font-bold">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#008080] mb-4 md:mb-0">Browse Exams</h1>
        
        {/* Search and Sort UI */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search exams..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#008080] focus:border-[#008080]"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#008080] focus:border-[#008080] bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      
      {/* Responsive Tabs Navigation */}
      {searchTerm.trim() === '' ? (
        <div className="border-b border-gray-200 mb-6 overflow-x-auto">
          <nav className="flex space-x-4 sm:space-x-8 min-w-max">
            {Object.keys(examCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`whitespace-nowrap py-3 sm:py-4 px-1 font-medium text-xs sm:text-sm border-b-2 transition-colors duration-300 ${
                  activeTab === category
                    ? 'border-[#008080] text-[#008080]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </nav>
        </div>
      ) : (
        <div className="mb-6 pb-2 border-b border-gray-200">
          <p className="text-gray-600 font-medium text-lg">
            Showing results for <span className="text-[#008080] font-bold">"{searchTerm}"</span> 
            <span className="text-sm text-gray-400 ml-2">({filteredAndSortedExams.length} found)</span>
          </p>
        </div>
      )}
      
      {/* Responsive Exams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredAndSortedExams.map((exam) => (
          <div 
            key={exam._id}
            onClick={() => handleExamClick(exam._id)}
            className="bg-white rounded-lg shadow-sm sm:shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
          >
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-[#008080] mb-1 sm:mb-2 line-clamp-2">{exam.name}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">{exam.description}</p>
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#008080]/10 text-[#008080]">
                  View Papers
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredAndSortedExams.length === 0 && (
        <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl border border-gray-200 mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-2 text-base sm:text-lg font-medium text-[#008080]">No exams found</h3>
          <p className="mt-1 text-sm sm:text-base text-gray-500">Try adjusting your search terms or checking a different category.</p>
        </div>
      )}
    </div>
  );
};

export default Exam;