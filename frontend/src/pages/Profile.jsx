import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState('history');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfileData(res.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderPapers = (papers) => {
    if (!papers || papers.length === 0) {
      return <p className="text-gray-500 italic py-4">No papers found here yet.</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {papers.map(paper => (
          <Link key={paper._id} to={`/exams/${paper.exam?._id || paper.exam}`} className="block bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 transition">
            <h3 className="font-bold text-[#008080]">{paper.title}</h3>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{paper.exam?.name || 'Unknown Exam'}</span>
              <span className="font-bold">{paper.year}</span>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 rounded-full bg-[#008080] text-white flex items-center justify-center text-4xl font-bold uppercase shadow-inner">
              {user?.email?.[0] || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-500 mt-1">{user?.email}</p>
              {user?.role === 'admin' ? (
                <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full border border-purple-200">
                  ⭐ Administrator
                </span>
              ) : (
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-200">
                  Verified Student
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-6 rounded-lg transition duration-300 border border-red-200 hidden sm:block"
          >
            Log Out
          </button>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b">
            <button 
              className={`flex-1 py-4 text-center font-semibold ${activeTab === 'history' ? 'border-b-2 border-[#008080] text-[#008080]' : 'text-gray-500 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('history')}
            >
              🕒 Recently Viewed
            </button>
            <button 
              className={`flex-1 py-4 text-center font-semibold ${activeTab === 'bookmarks' ? 'border-b-2 border-[#008080] text-[#008080]' : 'text-gray-500 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('bookmarks')}
            >
              🔖 Saved Papers
            </button>
          </div>
          
          <div className="p-8">
            {activeTab === 'history' && renderPapers(profileData?.history)}
            {activeTab === 'bookmarks' && renderPapers(profileData?.bookmarks)}
          </div>
          
          {/* Mobile Logout */}
          <div className="p-4 bg-gray-50 sm:hidden border-t">
            <button
              onClick={handleLogout}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-6 rounded-lg transition duration-300 border border-red-200"
            >
              Log Out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
