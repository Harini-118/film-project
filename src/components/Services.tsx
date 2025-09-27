import React from 'react';
import { Newspaper, Briefcase, Scale, Building2, Film, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Newspaper,
      title: 'Film Industry News',
      description: 'Stay updated on industry events, celebrity interviews, and film launches.'
    },
    {
      icon: Briefcase,
      title: 'Job Opportunities',
      description: 'Connect with professionals and find the right opportunities.'
    },
    {
      icon: Scale,
      title: 'Legal Assistance',
      description: 'Get help with unpaid wages and workplace disputes.'
    },
    {
      icon: Building2,
      title: 'Government Benefits',
      description: 'Assistance in accessing official grants and support.'
    },
    {
      icon: Film,
      title: 'Production Support',
      description: 'Help with script registration, censorship, and movie release processes.'
    },
    {
      icon: Shield,
      title: 'Security & Identification',
      description: 'Membership ID cards for film professionals to ensure industry recognition.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">
            We provide a range of supportive and professional services to film industry members
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-50"
            >
              <service.icon className="h-12 w-12 text-yellow-500 mb-4 transform transition-all duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;