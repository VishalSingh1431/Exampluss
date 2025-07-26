import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#008080] mb-4">About ExamPluss</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering students with the best resources for competitive exam preparation.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-[#008080] mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At ExamPluss, we're committed to democratizing access to quality exam preparation materials. 
            We believe every student deserves the opportunity to excel in competitive exams, regardless 
            of their background or location.
          </p>
          <p className="text-gray-600">
            Our platform provides comprehensive, up-to-date resources that help students practice 
            effectively and gain confidence before their exams.
          </p>
        </div>
        <div className="bg-gray-100 rounded-xl p-8 h-full flex items-center justify-center">
          <img 
            src="/images/about-mission.jpg" 
            alt="Students studying together" 
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-[#008080] mb-12">Why Choose ExamPluss</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '📚',
              title: 'Comprehensive Resources',
              description: 'Access to thousands of previous year papers from all major exams'
            },
            {
              icon: '🔍',
              title: 'Detailed Solutions',
              description: 'Step-by-step solutions verified by subject matter experts'
            },
            {
              icon: '📱',
              title: 'Mobile Friendly',
              description: 'Study on the go with our fully responsive platform'
            },
            {
              icon: '🆓',
              title: 'Free Access',
              description: 'Premium quality resources available at no cost'
            },
            {
              icon: '📈',
              title: 'Performance Tracking',
              description: 'Analyze your progress with our smart analytics'
            },
            {
              icon: '🔄',
              title: 'Regular Updates',
              description: 'New content added after every exam cycle'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#008080] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-[#008080] mb-12">Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: 'Dr. Ananya Sharma',
              role: 'Academic Director',
              bio: 'Former IIT professor with 15+ years of teaching experience',
              image: '/images/team1.jpg'
            },
            {
              name: 'Rahul Verma',
              role: 'Technology Lead',
              bio: 'Expert in educational technology and platform development',
              image: '/images/team2.jpg'
            },
            {
              name: 'Priya Patel',
              role: 'Content Head',
              bio: 'Specializes in curating and verifying exam materials',
              image: '/images/team3.jpg'
            },
            {
              name: 'Amit Joshi',
              role: 'Student Success',
              bio: 'Dedicated to ensuring students get the most from our platform',
              image: '/images/team4.jpg'
            }
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#008080]">{member.name}</h3>
                <p className="text-[#008080] mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#008080]/10 rounded-xl p-8 sm:p-12 mb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            {
              number: '50,000+',
              label: 'Active Users'
            },
            {
              number: '100+',
              label: 'Exam Categories'
            },
            {
              number: '10,000+',
              label: 'Practice Papers'
            },
            {
              number: '99%',
              label: 'Student Satisfaction'
            }
          ].map((stat, index) => (
            <div key={index}>
              <p className="text-4xl font-bold text-[#008080] mb-2">{stat.number}</p>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;