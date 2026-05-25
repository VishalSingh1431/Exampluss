import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import InternalPdfViewer from '../components/InternalPdfViewer';

const ExamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [exam, setExam] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  
  // State for the PDF Viewer
  const [viewingPdfUrl, setViewingPdfUrl] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/exams/${id}`);
        setExam(res.data.exam);
        setPapers(res.data.papers);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load exam details.');
        setLoading(false);
      }
    };
    
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Store just the IDs of bookmarked papers
        setBookmarkedIds(res.data.bookmarks.map(b => b._id || b));
      } catch (err) {
        console.error(err);
      }
    };

    fetchExamDetails();
    fetchUserData();
  }, [id, token]);

  const handleViewPaper = async (paper) => {
    if (!paper.isFree && !user) {
      alert("This is a Premium paper. Please login to view it.");
      navigate('/login');
      return;
    }
    setViewingPdfUrl(paper.paperUrl);
    
    // Log History
    if (token) {
      try {
        await axios.post('http://localhost:5000/api/users/history', { paperId: paper._id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error('Failed to log history', err);
      }
    }
  };

  const handleToggleBookmark = async (paperId) => {
    if (!token) {
      alert("Please login to save papers.");
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/users/bookmark', { paperId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookmarkedIds(res.data.bookmarks);
    } catch (err) {
      console.error('Failed to bookmark', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#008080]"></div>
      </div>
    );
  }

  if (error || !exam) {
    return <div className="text-center py-20 text-red-500 font-bold">{error || 'Exam not found'}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/exams" className="text-[#008080] hover:underline mb-6 inline-block">
        &larr; Back to all exams
      </Link>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold uppercase">
            {exam.category.replace('_', ' ')}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{exam.name}</h1>
        <p className="text-lg text-gray-600">{exam.description}</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Question Papers</h2>

      {papers.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-100">
          <p className="text-gray-500">No question papers have been uploaded for this exam yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <div key={paper._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-300 p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-gray-800">{paper.title}</h3>
                    <button onClick={() => handleToggleBookmark(paper._id)} className="text-gray-400 hover:text-yellow-500 transition focus:outline-none">
                      <svg className={`w-6 h-6 ${bookmarkedIds.includes(paper._id) ? 'text-yellow-500 fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    </button>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="bg-gray-100 text-gray-700 font-bold px-2 py-1 rounded text-sm">
                      {paper.year}
                    </span>
                    {paper.isFree ? (
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Free</span>
                    ) : (
                      <span className="text-xs font-bold text-orange-500 uppercase tracking-wider flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                        Premium
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleViewPaper(paper)}
                className={`mt-6 w-full inline-flex justify-center items-center px-4 py-2 text-white font-medium rounded-md transition duration-300 ${!paper.isFree && !user ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#008080] hover:bg-[#006666]'}`}
              >
                {!paper.isFree && !user ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    Login to View
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    Read Online
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Render the internal PDF viewer if a URL is selected */}
      {viewingPdfUrl && (
        <InternalPdfViewer 
          url={viewingPdfUrl} 
          onClose={() => setViewingPdfUrl(null)} 
          canDownload={user?.role === 'admin'} 
        />
      )}
    </div>
  );
};

export default ExamDetail;
