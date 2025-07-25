import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="bg-gray-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 md:text-4xl">
            Contact Us
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 md:text-xl">
            We'd love to hear from you! Reach out for any questions or feedback.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Form - Left Column */}
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-md md:shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 sm:py-3 sm:px-6 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Contact Information Card */}
            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-md md:shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Contact Information</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-0.5 sm:mt-1 mr-3 sm:mr-4" />
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-900">Our Address</h4>
                    <p className="text-sm sm:text-base text-gray-600">123 Education Street, Knowledge City</p>
                    <p className="text-sm sm:text-base text-gray-600">Bangalore, Karnataka 560001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-0.5 sm:mt-1 mr-3 sm:mr-4" />
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-900">Phone Number</h4>
                    <p className="text-sm sm:text-base text-gray-600">+91 98765 43210</p>
                    <p className="text-sm sm:text-base text-gray-600">+91 12345 67890 (Toll Free)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-0.5 sm:mt-1 mr-3 sm:mr-4" />
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-900">Email Address</h4>
                    <p className="text-sm sm:text-base text-gray-600">contact@examplus.com</p>
                    <p className="text-sm sm:text-base text-gray-600">support@examplus.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-0.5 sm:mt-1 mr-3 sm:mr-4" />
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-900">Working Hours</h4>
                    <p className="text-sm sm:text-base text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-sm sm:text-base text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md md:shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Follow Us</h3>
              <div className="flex space-x-3 sm:space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                  <FaLinkedin className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors">
                  <FaTwitter className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">
                  <FaInstagram className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </a>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md md:shadow-lg">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.007168164709!2d77.59727631482193!3d12.971962990857227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf5df53a7e7975fe0!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Map"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;