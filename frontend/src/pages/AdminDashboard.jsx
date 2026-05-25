import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [exams, setExams] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Forms state
  const [newExam, setNewExam] = useState({ name: '', description: '', category: 'engineering' });
  const [newPaper, setNewPaper] = useState({ examId: '', title: '', year: new Date().getFullYear(), file: null, isFree: true });
  const [message, setMessage] = useState({ text: '', type: '' });

  const categories = [
    'engineering', 'medical', 'civil_services', 'defense', 'law', 
    'management', 'science', 'teaching', 'banking_finance', 'design', 
    'architecture', 'pharmacy', 'nursing', 'agriculture', 
    'hotel_management', 'mass_communication', 'railway', 'ssc', 'state_level'
  ];

  const fetchExams = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/exams');
      setExams(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exams', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/exams', newExam, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage('Exam created successfully!');
      setNewExam({ name: '', description: '', category: 'engineering' });
      fetchExams();
    } catch (error) {
      showMessage(error.response?.data?.message || 'Error creating exam', 'error');
    }
  };

  const handleDeleteExam = async (examId) => {
    if (!window.confirm('Are you sure? This will also delete all question papers for this exam!')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/exams/${examId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage('Exam deleted successfully!');
      fetchExams();
    } catch (error) {
      showMessage(error.response?.data?.message || 'Error deleting exam', 'error');
    }
  };

  const handleAddPaper = async (e) => {
    e.preventDefault();
    if (!newPaper.file) {
      showMessage('Please select a PDF file', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('examId', newPaper.examId);
    formData.append('title', newPaper.title);
    formData.append('year', newPaper.year);
    formData.append('isFree', newPaper.isFree);
    formData.append('pdfFile', newPaper.file);

    try {
      showMessage('Uploading paper... This might take a few seconds.', 'success');
      await axios.post('http://localhost:5000/api/admin/papers', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      showMessage('Question paper added successfully!');
      setNewPaper({ examId: '', title: '', year: new Date().getFullYear(), file: null, isFree: true });
      // Reset the file input manually
      document.getElementById('pdfFileInput').value = '';
    } catch (error) {
      showMessage(error.response?.data?.message || 'Error adding paper', 'error');
    }
  };

  // Flatten exams for the dropdown
  const allExamsFlat = Object.values(exams).flat();

  if (user?.role !== 'admin') {
    return <div className="text-center py-20 text-red-500 font-bold text-xl">Access Denied. Admins Only.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-[#008080] mb-8 flex items-center">
        <span className="mr-3">⚙️</span> Admin Dashboard
      </h1>

      {message.text && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ADD EXAM FORM */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Add New Exam Category</h2>
          <form onSubmit={handleCreateExam} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name (e.g. JEE Main)</label>
              <input 
                type="text" required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#008080] focus:border-[#008080]"
                value={newExam.name} onChange={e => setNewExam({...newExam, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                required rows="2"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#008080] focus:border-[#008080]"
                value={newExam.description} onChange={e => setNewExam({...newExam, description: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#008080] focus:border-[#008080]"
                value={newExam.category} onChange={e => setNewExam({...newExam, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.replace('_', ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full bg-[#008080] text-white py-2 rounded-md hover:bg-[#006666] transition">
              Create Exam
            </button>
          </form>
        </div>

        {/* ADD QUESTION PAPER FORM */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Add Question Paper</h2>
          <form onSubmit={handleAddPaper} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Exam</label>
              <select 
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#008080] focus:border-[#008080]"
                value={newPaper.examId} onChange={e => setNewPaper({...newPaper, examId: e.target.value})}
              >
                <option value="" disabled>Select an exam...</option>
                {allExamsFlat.map(exam => (
                  <option key={exam._id} value={exam._id}>{exam.name} ({exam.category})</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paper Title</label>
                <input 
                  type="text" required placeholder="e.g. 2023 Shift 1"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#008080] focus:border-[#008080]"
                  value={newPaper.title} onChange={e => setNewPaper({...newPaper, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input 
                  type="number" required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#008080] focus:border-[#008080]"
                  value={newPaper.year} onChange={e => setNewPaper({...newPaper, year: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Access Type</label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#008080] focus:border-[#008080]"
                  value={newPaper.isFree ? 'true' : 'false'} 
                  onChange={e => setNewPaper({...newPaper, isFree: e.target.value === 'true'})}
                >
                  <option value="true">Free (No Login Required)</option>
                  <option value="false">Paid (Login Required)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF File</label>
              <input 
                id="pdfFileInput"
                type="file" accept="application/pdf" required 
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#008080] focus:border-[#008080]"
                onChange={e => setNewPaper({...newPaper, file: e.target.files[0]})}
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
              Upload PDF
            </button>
          </form>
        </div>

      </div>

      {/* MANAGE EXISTING EXAMS */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Manage Existing Exams</h2>
        {loading ? (
          <p className="text-gray-500">Loading exams...</p>
        ) : allExamsFlat.length === 0 ? (
          <p className="text-gray-500 italic">No exams found in the database. Create one above!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allExamsFlat.map(exam => (
                  <tr key={exam._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{exam.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{exam.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleDeleteExam(exam._id)}
                        className="text-red-600 hover:text-red-900 font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
