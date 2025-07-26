import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Exam = () => {
  const [activeTab, setActiveTab] = useState('engineering');
  const navigate = useNavigate();

  // Exam data categorized by tabs
  const examCategories = {
  engineering: [
    { id: 1, name: 'JEE Main', description: 'Joint Entrance Examination - Main for engineering colleges' },
    { id: 2, name: 'JEE Advanced', description: 'Joint Entrance Examination - Advanced for IITs' },
    { id: 3, name: 'GATE', description: 'Graduate Aptitude Test in Engineering for postgraduate admissions' },
    { id: 4, name: 'BITSAT', description: 'Birla Institute of Technology and Science Admission Test' },
    { id: 5, name: 'VITEEE', description: 'VIT Engineering Entrance Examination' },
    { id: 6, name: 'SRMJEEE', description: 'SRM Joint Engineering Entrance Exam' },
    { id: 7, name: 'KIITEE', description: 'Kalinga Institute of Industrial Technology Entrance Exam' },
    { id: 8, name: 'MHT CET', description: 'Maharashtra Common Entrance Test for engineering' },
    { id: 9, name: 'KCET', description: 'Karnataka Common Entrance Test' },
    { id: 10, name: 'WBJEE', description: 'West Bengal Joint Entrance Examination' }
  ],
  medical: [
    { id: 11, name: 'NEET', description: 'National Eligibility cum Entrance Test for medical courses' },
    { id: 12, name: 'NEET PG', description: 'National Eligibility cum Entrance Test for Postgraduate' },
    { id: 13, name: 'AIIMS MBBS', description: 'All India Institute of Medical Sciences entrance' },
    { id: 14, name: 'JIPMER MBBS', description: 'Jawaharlal Institute of Postgraduate Medical Education and Research' },
    { id: 15, name: 'FMGE', description: 'Foreign Medical Graduates Examination' },
    { id: 16, name: 'INI CET', description: 'Institute of National Importance Combined Entrance Test' }
  ],
  civil_services: [
    { id: 17, name: 'UPSC CSE', description: 'Civil Services Examination for IAS, IPS etc.' },
    { id: 18, name: 'UPSC IFS', description: 'Indian Forest Service Examination' },
    { id: 19, name: 'UPSC CDS', description: 'Combined Defence Services Examination' },
    { id: 20, name: 'UPSC CAPF', description: 'Central Armed Police Forces Examination' },
    { id: 21, name: 'BPSC', description: 'Bihar Public Service Commission' },
    { id: 22, name: 'MPSC', description: 'Maharashtra Public Service Commission' },
    { id: 23, name: 'UPPSC', description: 'Uttar Pradesh Public Service Commission' },
    { id: 24, name: 'TNPSC', description: 'Tamil Nadu Public Service Commission' }
  ],
  defense: [
    { id: 25, name: 'NDA', description: 'National Defence Academy Examination' },
    { id: 26, name: 'NA', description: 'Indian Navy Entrance Test' },
    { id: 27, name: 'AFCAT', description: 'Air Force Common Admission Test' },
    { id: 28, name: 'INET', description: 'Indian Navy Entrance Test' },
    { id: 29, name: 'TES', description: 'Technical Entry Scheme for Indian Army' }
  ],
  law: [
    { id: 30, name: 'CLAT', description: 'Common Law Admission Test for NLUs' },
    { id: 31, name: 'AILET', description: 'All India Law Entrance Test for NLU Delhi' },
    { id: 32, name: 'LSAT India', description: 'Law School Admission Test' },
    { id: 33, name: 'MH CET Law', description: 'Maharashtra Common Entrance Test for Law' }
  ],
  management: [
    { id: 34, name: 'CAT', description: 'Common Admission Test for IIMs' },
    { id: 35, name: 'XAT', description: 'Xavier Aptitude Test' },
    { id: 36, name: 'MAT', description: 'Management Aptitude Test' },
    { id: 37, name: 'CMAT', description: 'Common Management Admission Test' },
    { id: 38, name: 'SNAP', description: 'Symbiosis National Aptitude Test' },
    { id: 39, name: 'NMAT', description: 'NMIMS Management Aptitude Test' }
  ],
  science: [
    { id: 40, name: 'IIT JAM', description: 'Joint Admission Test for MSc programs' },
    { id: 41, name: 'CSIR NET', description: 'Council of Scientific & Industrial Research National Eligibility Test' },
    { id: 42, name: 'UGC NET', description: 'University Grants Commission National Eligibility Test' },
    { id: 43, name: 'ICAR AIEEA', description: 'Indian Council of Agricultural Research All India Entrance Examination' }
  ],
  teaching: [
    { id: 44, name: 'CTET', description: 'Central Teacher Eligibility Test' },
    { id: 45, name: 'UPTET', description: 'Uttar Pradesh Teacher Eligibility Test' },
    { id: 46, name: 'HTET', description: 'Haryana Teacher Eligibility Test' },
    { id: 47, name: 'REET', description: 'Rajasthan Eligibility Examination for Teachers' }
  ],
  banking_finance: [
    { id: 48, name: 'IBPS PO', description: 'Institute of Banking Personnel Selection Probationary Officer' },
    { id: 49, name: 'IBPS Clerk', description: 'Institute of Banking Personnel Selection Clerk' },
    { id: 50, name: 'SBI PO', description: 'State Bank of India Probationary Officer' },
    { id: 51, name: 'SBI Clerk', description: 'State Bank of India Clerk' },
    { id: 52, name: 'RBI Grade B', description: 'Reserve Bank of India Grade B Officer' },
    { id: 53, name: 'SEBI Grade A', description: 'Securities and Exchange Board of India Grade A Officer' }
  ],
  design: [
    { id: 54, name: 'NID DAT', description: 'National Institute of Design Design Aptitude Test' },
    { id: 55, name: 'NIFT', description: 'National Institute of Fashion Technology Entrance Exam' },
    { id: 56, name: 'CEED', description: 'Common Entrance Examination for Design' },
    { id: 57, name: 'UCEED', description: 'Undergraduate Common Entrance Examination for Design' }
  ],
  architecture: [
    { id: 58, name: 'NATA', description: 'National Aptitude Test in Architecture' },
    { id: 59, name: 'JEE B.Arch', description: 'Joint Entrance Examination for Architecture' }
  ],
  pharmacy: [
    { id: 60, name: 'GPAT', description: 'Graduate Pharmacy Aptitude Test' },
    { id: 61, name: 'NIPER JEE', description: 'National Institute of Pharmaceutical Education and Research Joint Entrance Exam' }
  ],
  nursing: [
    { id: 62, name: 'AIIMS Nursing', description: 'All India Institute of Medical Sciences Nursing Exam' },
    { id: 63, name: 'PGIMER Nursing', description: 'Postgraduate Institute of Medical Education and Research Nursing Exam' }
  ],
  agriculture: [
    { id: 64, name: 'ICAR AIEEA', description: 'Indian Council of Agricultural Research All India Entrance Examination' },
    { id: 65, name: 'OUAT', description: 'Orissa University of Agriculture and Technology Entrance Exam' }
  ],
  hotel_management: [
    { id: 66, name: 'NCHMCT JEE', description: 'National Council for Hotel Management Joint Entrance Examination' }
  ],
  mass_communication: [
    { id: 67, name: 'IIMC', description: 'Indian Institute of Mass Communication Entrance Exam' },
    { id: 68, name: 'XIC OET', description: 'Xavier Institute of Communications Online Entrance Test' }
  ],
  railway: [
    { id: 69, name: 'RRB NTPC', description: 'Railway Recruitment Board Non-Technical Popular Categories' },
    { id: 70, name: 'RRB ALP', description: 'Railway Recruitment Board Assistant Loco Pilot' },
    { id: 71, name: 'RRB JE', description: 'Railway Recruitment Board Junior Engineer' }
  ],
  ssc: [
    { id: 72, name: 'SSC CGL', description: 'Staff Selection Commission Combined Graduate Level' },
    { id: 73, name: 'SSC CHSL', description: 'Staff Selection Commission Combined Higher Secondary Level' },
    { id: 74, name: 'SSC GD', description: 'Staff Selection Commission General Duty Constable' },
    { id: 75, name: 'SSC JE', description: 'Staff Selection Commission Junior Engineer' }
  ],
  state_level: [
    { id: 76, name: 'TSPSC', description: 'Telangana State Public Service Commission' },
    { id: 77, name: 'APPSC', description: 'Andhra Pradesh Public Service Commission' },
    { id: 78, name: 'KPSC', description: 'Karnataka Public Service Commission' },
    { id: 79, name: 'MPPSC', description: 'Madhya Pradesh Public Service Commission' },
    { id: 80, name: 'RPSC', description: 'Rajasthan Public Service Commission' }
  ]
};

   const handleExamClick = (examId) => {
    navigate(`/exams/${examId}`);
  };

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#008080] mb-6 sm:mb-8">Browse Exams</h1>
      
      {/* Responsive Tabs Navigation */}
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
      
      {/* Responsive Exams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {examCategories[activeTab].map((exam) => (
          <div 
            key={exam.id}
            onClick={() => handleExamClick(exam.id)}
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
      {examCategories[activeTab].length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-base sm:text-lg font-medium text-[#008080]">No exams found</h3>
          <p className="mt-1 text-sm sm:text-base text-gray-500">We couldn't find any exams in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Exam;