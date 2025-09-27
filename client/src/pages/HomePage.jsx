// client/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';
import Slider from 'react-slick';

// Import carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const [members, setMembers] = useState([]);

  // --- THIS IS THE CRUCIAL PART #1 ---
  // This gets the server's base URL, e.g., 'http://localhost:5000'
  const SERVER_BASE_URL = API_URL.replace('/api', '');
  // ------------------------------------

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/public/members`);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members for homepage:", error);
      }
    };
    fetchMembers();
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: members.length > 2,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: members.length > 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          infinite: members.length > 0,
        }
      }
    ]
  };


  return (
    <div className="bg-[#1a202c] text-white min-h-screen font-sans">
      {/* Header */}
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold">SIFWWU</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-lg">
          <a href="#" className="hover:text-yellow-400">Home</a>
          <a href="#" className="hover:text-yellow-400">About</a>
          <a href="#" className="hover:text-yellow-400">Services</a>
          <a href="#" className="hover:text-yellow-400">Leadership</a>
          <a href="#" className="hover:text-yellow-400">OTT Platform</a>
          <a href="#" className="hover:text-yellow-400">Contact</a>
          <Link
            to="/admin"
            className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition-colors"
          >
            Admin Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 text-center py-24 md:py-32">
        <div className="flex justify-center mb-8">
          <svg className="w-16 h-16 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1-1H3a1 1 0 01-1-1V3zm2 2v2h2V5H4zm4 0v2h2V5H8zm4 0v2h2V5h-2zM4 9v2h2V9H4zm4 0v2h2V9H8zm4 0v2h2V9h-2zm-4 4v2h2v-2H8z"/>
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Welcome to South Indian Film Workers Welfare Union
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
          A dedicated platform for South Indian film industry professionals! Our mission is to support, protect, and uplift all those working in the film industry, from producers to technicians.
        </p>
      </main>

      {/* Leadership / Members Section */}
      {members.length > 0 && (
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Leadership</h2>
          <Slider {...carouselSettings}>
            {members.map((member) => (
              <div key={member._id} className="px-4">
                <div className="bg-[#2d3748] rounded-lg p-6 text-center h-full">
                  {/* --- THIS IS THE CRUCIAL PART #2 --- */}
                  <img
                    src={`${SERVER_BASE_URL}/${member.imageUrl.replace(/\\/g, '/')}`}
                    alt={member.name}
                    className="w-40 h-40 rounded-full object-cover mx-auto mb-6 border-4 border-gray-500"
                  />
                  {/* ------------------------------------ */}
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-yellow-400 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-400 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      )}

      {/* Features Section */}
      <section className="container mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Card 1 */}
        <div className="bg-[#2d3748] p-8 rounded-lg">
          <div className="flex justify-center mb-4">
            <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Latest Updates</h3>
          <p className="text-gray-400">Stay updated with film news, celebrity interviews, and industry insights</p>
        </div>
        {/* Card 2 */}
        <div className="bg-[#2d3748] p-8 rounded-lg">
          <div className="flex justify-center mb-4">
            <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Job Opportunities</h3>
          <p className="text-gray-400">Explore job opportunities and professional networking</p>
        </div>
        {/* Card 3 */}
        <div className="bg-[#2d3748] p-8 rounded-lg">
          <div className="flex justify-center mb-4">
            <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04A12.02 12.02 0 0021 8.944c0-2.311-.837-4.44-2.382-6.048z"></path></svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Union Benefits</h3>
          <p className="text-gray-400">Access financial aid, legal assistance, and exclusive benefits</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;