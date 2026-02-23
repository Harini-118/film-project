import React from 'react';
import { Film, Newspaper, Briefcase, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gray-900 text-white py-20">
      <div className="absolute inset-0 z-0">
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Film className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to South Indian Film Workers Welfare Union
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            A dedicated platform for South Indian film industry professionals! Our mission is to support, 
            protect, and uplift all those working in the film industry, from producers to technicians.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Newspaper className="mx-auto h-8 w-8 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Latest Updates</h3>
              <p className="text-gray-400">Stay updated with film news, celebrity interviews, and industry insights</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Briefcase className="mx-auto h-8 w-8 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Job Opportunities</h3>
              <p className="text-gray-400">Explore job opportunities and professional networking</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Shield className="mx-auto h-8 w-8 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Union Benefits</h3>
              <p className="text-gray-400">Access financial aid, legal assistance, and exclusive benefits</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;